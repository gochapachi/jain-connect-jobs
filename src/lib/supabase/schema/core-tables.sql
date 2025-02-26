
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
