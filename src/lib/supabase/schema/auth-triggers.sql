
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
