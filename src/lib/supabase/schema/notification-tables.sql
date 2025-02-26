
-- JOB ALERTS TABLE
create table public.job_alerts (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamptz default now(),
  candidate_id uuid references public.candidates(id) on delete cascade not null,
  keywords text[],
  location text,
  industry text,
  job_type text check (job_type in ('full_time', 'part_time', 'contract', 'internship')),
  salary_range text,
  frequency text default 'weekly' check (frequency in ('daily', 'weekly', 'monthly'))
);

-- NOTIFICATIONS TABLE
create table public.notifications (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamptz default now(),
  user_id uuid references auth.users on delete cascade not null,
  user_type text not null check (user_type in ('employer', 'candidate')),
  message text not null,
  status text default 'unread' check (status in ('unread', 'read'))
);
