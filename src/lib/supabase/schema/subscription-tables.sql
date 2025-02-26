
-- EMPLOYER SUBSCRIPTIONS TABLE
create table public.employer_subscriptions (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamptz default now(),
  employer_id uuid references public.employers(id) on delete cascade not null,
  plan_name text not null,
  price numeric(10,2) not null,
  features text[],
  start_date date not null,
  end_date date not null,
  status text default 'active' check (status in ('active', 'expired', 'canceled'))
);

-- REFERRALS TABLE
create table public.referrals (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamptz default now(),
  referrer_id uuid references public.candidates(id) on delete cascade not null,
  referred_email text not null,
  job_id uuid references public.jobs(id) on delete cascade not null,
  status text default 'pending' check (status in ('pending', 'hired', 'rejected'))
);
