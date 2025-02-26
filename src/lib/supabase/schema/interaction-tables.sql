
-- JOB APPLICATIONS TABLE
create table public.applications (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  job_id uuid references public.jobs(id) on delete cascade not null,
  candidate_id uuid references public.candidates(id) on delete cascade not null,
  status text default 'applied' check (status in ('applied', 'shortlisted', 'rejected', 'hired')),
  resume_url text,
  cover_letter text,
  unique(job_id, candidate_id)
);

-- SAVED JOBS TABLE
create table public.saved_jobs (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamptz default now(),
  candidate_id uuid references public.candidates(id) on delete cascade not null,
  job_id uuid references public.jobs(id) on delete cascade not null,
  unique(candidate_id, job_id)
);

-- EMPLOYER REVIEWS TABLE
create table public.employer_reviews (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamptz default now(),
  employer_id uuid references public.employers(id) on delete cascade not null,
  candidate_id uuid references public.candidates(id) on delete cascade not null,
  rating numeric(2,1) check (rating >= 1.0 and rating <= 5.0),
  review_text text,
  status text default 'pending' check (status in ('pending', 'approved', 'rejected')),
  unique(employer_id, candidate_id)
);
