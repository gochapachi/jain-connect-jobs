
-- CANDIDATE ASSESSMENTS TABLE
create table public.assessments (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamptz default now(),
  candidate_id uuid references public.candidates(id) on delete cascade not null,
  job_id uuid references public.jobs(id) on delete cascade,
  test_name text not null,
  score numeric(5,2),
  max_score numeric(5,2) not null,
  result_status text default 'pending' check (result_status in ('passed', 'failed', 'pending'))
);

-- INTERVIEWS TABLE
create table public.interviews (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  job_id uuid references public.jobs(id) on delete cascade not null,
  candidate_id uuid references public.candidates(id) on delete cascade not null,
  employer_id uuid references public.employers(id) on delete cascade not null,
  interview_date timestamptz not null,
  mode text not null check (mode in ('online', 'offline')),
  location text,
  meeting_link text,
  status text default 'scheduled' check (status in ('scheduled', 'completed', 'canceled')),
  feedback text
);
