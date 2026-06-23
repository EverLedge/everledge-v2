-- EverLedge — run once in Supabase SQL Editor

-- Gifts
create table if not exists gifts (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  recipient text not null,
  relationship text,
  value numeric not null,
  gift_date date not null,
  from_surplus_income boolean default false,
  notes text,
  created_at timestamptz default now()
);
alter table gifts enable row level security;
create policy "Users own their gifts" on gifts
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Executors
create table if not exists executors (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  relationship text,
  role text not null default 'Executor',
  email text,
  phone text,
  notes text,
  is_primary boolean default false,
  created_at timestamptz default now()
);
alter table executors enable row level security;
create policy "Users own their executors" on executors
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Assets
create table if not exists assets (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  category text not null,
  value numeric not null,
  notes text,
  created_at timestamptz default now()
);
alter table assets enable row level security;
create policy "Users own their assets" on assets
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Documents
create table if not exists documents (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  tag text,
  storage_path text,
  file_size bigint,
  mime_type text,
  created_at timestamptz default now()
);
alter table documents enable row level security;
create policy "Users own their documents" on documents
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Storage bucket policies (after creating 'documents' bucket in Storage UI)
create policy "Users upload to own folder" on storage.objects
  for insert with check (bucket_id = 'documents' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "Users read own folder" on storage.objects
  for select using (bucket_id = 'documents' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "Users delete from own folder" on storage.objects
  for delete using (bucket_id = 'documents' and auth.uid()::text = (storage.foldername(name))[1]);
