
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/*
-- EMPLOYERS TABLE
create table public.employers (
  id uuid references auth.users on delete cascade primary key,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  company_name text not null,
  industry text not null,
  company_size text,
  website text,
  logo_url text,
  contact_person text not null,
  email text not null unique,
  phone text not null,
  address text,
  city text,
  state text,
  country text,
  postal_code text,
  about_company text,
  status text default 'active' check (status in ('active', 'inactive'))
);

-- CANDIDATES TABLE
create table public.candidates (
  id uuid references auth.users on delete cascade primary key,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  first_name text not null,
  last_name text,
  email text not null unique,
  phone text not null,
  dob date,
  gender text check (gender in ('male', 'female', 'other')),
  address text,
  city text,
  state text,
  country text,
  postal_code text,
  resume_url text,
  profile_photo_url text,
  linkedin_url text,
  experience_years integer default 0,
  skills text[],
  education text[],
  current_job_title text,
  current_company text,
  expected_salary numeric(10,2),
  availability text check (availability in ('immediate', '1_month', '2_months', 'negotiable')),
  status text default 'active' check (status in ('active', 'inactive'))
);

-- JOBS TABLE
create table public.jobs (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  employer_id uuid references public.employers(id) on delete cascade not null,
  title text not null,
  description text not null,
  skills_required text[],
  min_experience integer,
  max_experience integer,
  job_type text not null check (job_type in ('full_time', 'part_time', 'contract', 'internship')),
  salary_min numeric(10,2),
  salary_max numeric(10,2),
  location text not null,
  city text,
  state text,
  country text,
  remote_option text default 'no' check (remote_option in ('yes', 'no', 'hybrid')),
  vacancies integer default 1,
  expiry_date date,
  status text default 'open' check (status in ('open', 'closed', 'paused'))
);

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

-- Create updated_at triggers for all tables
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Apply the trigger to all tables with updated_at
create trigger employers_updated_at
  before update on employers
  for each row
  execute function handle_updated_at();

create trigger candidates_updated_at
  before update on candidates
  for each row
  execute function handle_updated_at();

create trigger jobs_updated_at
  before update on jobs
  for each row
  execute function handle_updated_at();

create trigger applications_updated_at
  before update on applications
  for each row
  execute function handle_updated_at();

create trigger interviews_updated_at
  before update on interviews
  for each row
  execute function handle_updated_at();

-- RLS Policies

-- Employers policies
alter table public.employers enable row level security;

create policy "Employers are viewable by everyone"
  on employers for select
  using ( true );

create policy "Users can insert their own employer profile"
  on employers for insert
  with check ( auth.uid() = id );

create policy "Users can update own employer profile"
  on employers for update
  using ( auth.uid() = id );

-- Candidates policies
alter table public.candidates enable row level security;

create policy "Candidates are viewable by everyone"
  on candidates for select
  using ( true );

create policy "Users can insert their own candidate profile"
  on candidates for insert
  with check ( auth.uid() = id );

create policy "Users can update own candidate profile"
  on candidates for update
  using ( auth.uid() = id );

-- Jobs policies
alter table public.jobs enable row level security;

create policy "Jobs are viewable by everyone"
  on jobs for select
  using ( true );

create policy "Employers can insert their own jobs"
  on jobs for insert
  with check ( auth.uid() = employer_id );

create policy "Employers can update their own jobs"
  on jobs for update
  using ( auth.uid() = employer_id );

-- Applications policies
alter table public.applications enable row level security;

create policy "Candidates can view their own applications"
  on applications for select
  using ( auth.uid() = candidate_id );

create policy "Employers can view applications for their jobs"
  on applications for select
  using (
    exists (
      select 1 from jobs
      where jobs.id = applications.job_id
      and jobs.employer_id = auth.uid()
    )
  );

-- Saved jobs policies
alter table public.saved_jobs enable row level security;

create policy "Users can view their saved jobs"
  on saved_jobs for select
  using ( auth.uid() = candidate_id );

create policy "Users can save jobs"
  on saved_jobs for insert
  with check ( auth.uid() = candidate_id );

-- Reviews policies
alter table public.employer_reviews enable row level security;

create policy "Reviews are viewable by everyone"
  on employer_reviews for select
  using ( true );

create policy "Candidates can create reviews"
  on employer_reviews for insert
  with check ( auth.uid() = candidate_id );

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  if (new.raw_user_meta_data->>'user_type' = 'employer') then
    insert into public.employers (
      id,
      company_name,
      industry,
      contact_person,
      email
    ) values (
      new.id,
      new.raw_user_meta_data->>'company_name',
      new.raw_user_meta_data->>'industry',
      new.raw_user_meta_data->>'full_name',
      new.email
    );
  else
    insert into public.candidates (
      id,
      first_name,
      last_name,
      email,
      phone
    ) values (
      new.id,
      new.raw_user_meta_data->>'first_name',
      new.raw_user_meta_data->>'last_name',
      new.email,
      new.raw_user_meta_data->>'phone'
    );
  end if;
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to automatically create profile on signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
*/
