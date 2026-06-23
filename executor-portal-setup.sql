-- Run in Supabase SQL Editor

create table if not exists executor_access (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  executor_id uuid references executors(id) on delete cascade,
  created_at timestamptz default now()
);

alter table executor_access enable row level security;
create policy "Users manage their own executor access tokens" on executor_access
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
