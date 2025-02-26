
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
