
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/*
-- PROFILES TABLE
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  full_name text not null,
  company_name text,
  title text,
  bio text,
  location text,
  website text,
  user_type text check (user_type in ('employer', 'candidate')) not null,
  email text not null,
  phone text,
  expected_salary text,
  current_company text,
  experience text,
  education text,
  skills text[],
  last_active timestamptz default now()
);

-- JOBS TABLE
create table public.jobs (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  employer_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  company text not null,
  location text not null,
  type text not null,
  department text,
  experience_level text,
  salary_min integer,
  salary_max integer,
  salary_currency text default 'USD',
  description text not null,
  responsibilities text,
  requirements text[],
  preferred_skills text[],
  company_description text,
  company_size text,
  industry text,
  website text,
  benefits text[],
  work_schedule text,
  remote_policy text,
  jain_friendly_policies jsonb default '{"vegetarianCafeteria": false, "meditationRoom": false, "flexibleHolidays": false, "culturalAwareness": false}',
  cultural_initiatives text,
  contact_name text not null,
  contact_email text not null,
  contact_phone text,
  application_deadline date,
  status text default 'active' check (status in ('active', 'closed', 'draft'))
);

-- APPLICATIONS TABLE
create table public.applications (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  job_id uuid references public.jobs(id) on delete cascade not null,
  candidate_id uuid references public.profiles(id) on delete cascade not null,
  status text default 'pending' check (status in ('pending', 'reviewed', 'shortlisted', 'rejected', 'withdrawn')),
  cover_letter text,
  resume_url text,
  unique(job_id, candidate_id)
);

-- SAVED JOBS TABLE
create table public.saved_jobs (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamptz default now(),
  job_id uuid references public.jobs(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  unique(job_id, user_id)
);

-- SAVED CANDIDATES TABLE
create table public.saved_candidates (
  id uuid default uuid_generate_v4() primary key,
  created_at timestamptz default now(),
  employer_id uuid references public.profiles(id) on delete cascade not null,
  candidate_id uuid references public.profiles(id) on delete cascade not null,
  notes text,
  unique(employer_id, candidate_id)
);

-- Create updated_at triggers for all tables
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger on_profiles_updated
  before update on profiles
  for each row
  execute function handle_updated_at();

create trigger on_jobs_updated
  before update on jobs
  for each row
  execute function handle_updated_at();

create trigger on_applications_updated
  before update on applications
  for each row
  execute function handle_updated_at();

-- RLS Policies

-- Profiles policies
alter table public.profiles enable row level security;

create policy "Profiles are viewable by everyone"
  on profiles for select
  using ( true );

create policy "Users can insert their own profile"
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile"
  on profiles for update
  using ( auth.uid() = id );

-- Jobs policies
alter table public.jobs enable row level security;

create policy "Jobs are viewable by everyone"
  on jobs for select
  using ( true );

create policy "Employers can insert their own jobs"
  on jobs for insert
  with check ( 
    auth.uid() = employer_id and 
    exists (
      select 1 from profiles 
      where id = auth.uid() 
      and user_type = 'employer'
    )
  );

create policy "Employers can update their own jobs"
  on jobs for update
  using ( 
    auth.uid() = employer_id and 
    exists (
      select 1 from profiles 
      where id = auth.uid() 
      and user_type = 'employer'
    )
  );

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

create policy "Candidates can insert their own applications"
  on applications for insert
  with check ( 
    auth.uid() = candidate_id and
    exists (
      select 1 from profiles 
      where id = auth.uid() 
      and user_type = 'candidate'
    )
  );

create policy "Candidates can update their own applications"
  on applications for update
  using ( auth.uid() = candidate_id );

-- Saved jobs policies
alter table public.saved_jobs enable row level security;

create policy "Users can view their saved jobs"
  on saved_jobs for select
  using ( auth.uid() = user_id );

create policy "Users can save jobs"
  on saved_jobs for insert
  with check ( auth.uid() = user_id );

create policy "Users can remove saved jobs"
  on saved_jobs for delete
  using ( auth.uid() = user_id );

-- Saved candidates policies
alter table public.saved_candidates enable row level security;

create policy "Employers can view their saved candidates"
  on saved_candidates for select
  using ( 
    auth.uid() = employer_id and
    exists (
      select 1 from profiles 
      where id = auth.uid() 
      and user_type = 'employer'
    )
  );

create policy "Employers can save candidates"
  on saved_candidates for insert
  with check ( 
    auth.uid() = employer_id and
    exists (
      select 1 from profiles 
      where id = auth.uid() 
      and user_type = 'employer'
    )
  );

create policy "Employers can update their saved candidates"
  on saved_candidates for update
  using ( auth.uid() = employer_id );

create policy "Employers can remove saved candidates"
  on saved_candidates for delete
  using ( auth.uid() = employer_id );

-- Function to handle new user signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, user_type, email)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'user_type',
    new.email
  );
  return new;
end;
$$ language plpgsql security definer;

-- Trigger to automatically create profile on signup
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
*/
