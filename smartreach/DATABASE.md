# Database setup (Supabase)

SmartReach uses **Supabase** (PostgreSQL + Auth) when configured. Without it, the app runs in demo mode (localStorage auth + mock data).

## 1. Create a Supabase project

1. Go to [supabase.com](https://supabase.com) and sign in.
2. Create a new project and note the **Project URL** and **anon public** key (Settings → API).

## 2. Environment variables

Copy `.env.example` to `.env` and set:

- `VITE_SUPABASE_URL` – your project URL (e.g. `https://xxxx.supabase.co`)
- `VITE_SUPABASE_ANON_KEY` – your anon public key

## 3. Run the schema

In the Supabase dashboard, open **SQL Editor** → **New query**, then run the contents of `supabase/schema.sql`. This creates the `campaigns`, `workflows`, and `segments` tables and Row Level Security (RLS) so each user only sees their own data.

## 4. Auth (optional)

Supabase Auth is used for login/register when the env vars are set. In the Supabase dashboard you can:

- Turn email confirmations on/off under **Authentication → Providers → Email**.
- Add OAuth providers under **Authentication → Providers**.

After setup, sign up and sign in will use the database; campaigns, workflows, and segments will load from and save to Supabase.
