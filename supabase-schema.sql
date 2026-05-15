-- Run this in your Supabase SQL editor for free cloud sync support

create table if not exists public.plasma_users (
  username text primary key,
  created_at timestamptz not null default now()
);

create table if not exists public.plasma_user_state (
  username text primary key,
  desktop_shortcuts jsonb not null default '[]'::jsonb,
  taskbar_pins jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);

-- Optional (recommended): allow anonymous web app access for this prototype.
-- Tighten security before production.
alter table public.plasma_users disable row level security;
alter table public.plasma_user_state disable row level security;
