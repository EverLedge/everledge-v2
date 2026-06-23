import { createClient } from 'https://esm.sh/@supabase/supabase-js@2?target=deno'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const url = new URL(req.url)
    const token = url.searchParams.get('token')
    if (!token) return new Response('Missing token', { status: 400, headers: corsHeaders })

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    )

    // Validate token and get owner
    const { data: access, error: accessErr } = await supabase
      .from('executor_access')
      .select('user_id, executor_id, created_at')
      .eq('id', token)
      .single()

    if (accessErr || !access) {
      return new Response('Invalid or expired link', { status: 404, headers: corsHeaders })
    }

    const userId = access.user_id

    // Get owner's plan
    const { data: profile } = await supabase
      .from('profiles')
      .select('plan')
      .eq('id', userId)
      .single()

    const isPro = profile?.plan === 'pro'

    // Get owner's auth record for display name
    const { data: { user: owner } } = await supabase.auth.admin.getUserById(userId)
    const ownerName = owner?.user_metadata?.full_name || owner?.email || 'Estate owner'

    // Always fetch: executors, assets total, gifts summary
    const [
      { data: executors },
      { data: assets },
      { data: gifts },
    ] = await Promise.all([
      supabase.from('executors').select('name, relationship, role, email, phone, is_primary').eq('user_id', userId),
      supabase.from('assets').select('category, value').eq('user_id', userId),
      supabase.from('gifts').select('recipient, relationship, value, gift_date, from_surplus_income').eq('user_id', userId),
    ])

    const grossEstate = (assets || []).reduce((s: number, a: any) => s + Number(a.value), 0)
    const MS7 = 7 * 365.25 * 24 * 3600 * 1000
    const SPOUSE_RELS = ['spouse', 'partner', 'civil partner']
    const isExempt = (g: any) => g.from_surplus_income || SPOUSE_RELS.includes((g.relationship || '').toLowerCase())
    const activePETs = (gifts || []).filter((g: any) => !isExempt(g) && Date.now() - new Date(g.gift_date).getTime() < MS7)
    const lifetimeGifts = activePETs.reduce((s: number, g: any) => s + Number(g.value), 0)
    const NRB = 325000
    const hasProperty = (assets || []).some((a: any) => a.category === 'Property')
    const RNRB = hasProperty ? 175000 : 0
    const nrbUsed = Math.min(NRB, lifetimeGifts)
    const taxable = Math.max(0, grossEstate - (NRB - nrbUsed) - RNRB)
    const ihtEstimate = taxable * 0.4

    // Base response — available to all
    const base = {
      ownerName,
      grossEstate,
      ihtEstimate,
      executors: executors || [],
      generatedAt: new Date().toISOString(),
      isPro,
    }

    if (!isPro) {
      return new Response(JSON.stringify(base), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Pro: add full asset breakdown, gift list, documents list
    const { data: allAssets } = await supabase
      .from('assets').select('name, category, value, notes').eq('user_id', userId)
    const { data: allGifts } = await supabase
      .from('gifts').select('recipient, relationship, value, gift_date, from_surplus_income, notes').eq('user_id', userId).order('gift_date', { ascending: false })
    const { data: allDocs } = await supabase
      .from('documents').select('name, tag, created_at').eq('user_id', userId).order('created_at', { ascending: false })

    return new Response(JSON.stringify({
      ...base,
      assets: allAssets || [],
      gifts: allGifts || [],
      documents: allDocs || [],
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
