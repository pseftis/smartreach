-- SmartReach: run this in Supabase SQL Editor (Dashboard → SQL Editor → New query)

-- Campaigns
create table if not exists public.campaigns (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  type text not null default 'Email',
  status text not null default 'Draft',
  segment text,
  sent text default '—',
  engagement text default '—',
  created_at timestamptz default now()
);

-- Workflows
create table if not exists public.workflows (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  triggers text not null,
  steps int not null default 0,
  status text not null default 'Draft',
  saved text default '—',
  created_at timestamptz default now()
);

-- Segments
create table if not exists public.segments (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  name text not null,
  type text not null default 'Behavior',
  rules text not null,
  size text default '—',
  conv_lift text default '—',
  created_at timestamptz default now()
);

-- Row Level Security
alter table public.campaigns enable row level security;
alter table public.workflows enable row level security;
alter table public.segments enable row level security;

drop policy if exists "Users can CRUD own campaigns" on public.campaigns;
create policy "Users can CRUD own campaigns" on public.campaigns
  for all using (auth.uid() = user_id);

drop policy if exists "Users can CRUD own workflows" on public.workflows;
create policy "Users can CRUD own workflows" on public.workflows
  for all using (auth.uid() = user_id);

drop policy if exists "Users can CRUD own segments" on public.segments;
create policy "Users can CRUD own segments" on public.segments
  for all using (auth.uid() = user_id);

-- Optional: seed a few rows for the first user (run after first signup, replace USER_ID)
-- insert into public.campaigns (user_id, name, type, status, segment, sent, engagement)
-- values
--   ('USER_ID', 'Welcome series', 'Email', 'Active', 'New signups', '12.4k', '+48%'),
--   ('USER_ID', 'Cart abandonment', 'Email', 'Active', 'Abandoned cart', '8.2k', '+52%');
