-- Run in Supabase SQL Editor after supabase-setup.sql

create table if not exists profiles (
  id uuid references auth.users(id) on delete cascade primary key,
  plan text not null default 'free',
  stripe_customer_id text unique,
  stripe_subscription_id text,
  updated_at timestamptz default now()
);

alter table profiles enable row level security;
create policy "Users read own profile" on profiles
  for select using (auth.uid() = id);
create policy "Users update own profile" on profiles
  for update using (auth.uid() = id);

-- Auto-create a free profile row when a new user signs up
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id) values (new.id)
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer set search_path = public;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();

-- Back-fill profiles for any existing users
insert into profiles (id)
select id from auth.users
on conflict (id) do nothing;
