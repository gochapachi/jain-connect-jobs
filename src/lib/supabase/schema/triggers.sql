
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
