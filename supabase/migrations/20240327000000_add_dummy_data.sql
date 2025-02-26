
-- Create test users using Supabase's admin functions
SELECT supabase_admin.create_user(
  'employer@test.com',
  'test123456',
  TRUE, -- email_confirmed
  jsonb_build_object('user_type', 'employer'),
  NOW()
);

INSERT INTO employers (
  auth_id,
  company_name,
  industry,
  contact_person,
  email,
  phone,
  status
) VALUES (
  (SELECT id FROM auth.users WHERE email = 'employer@test.com'),
  'Test Company',
  'Technology',
  'John Doe',
  'employer@test.com',
  '1234567890',
  'Active'
);

-- Create candidate test user
SELECT supabase_admin.create_user(
  'candidate@test.com',
  'test123456',
  TRUE, -- email_confirmed
  jsonb_build_object('user_type', 'candidate'),
  NOW()
);

INSERT INTO candidates (
  auth_id,
  first_name,
  last_name,
  email,
  phone,
  status,
  experience_years,
  current_job_title,
  skills
) VALUES (
  (SELECT id FROM auth.users WHERE email = 'candidate@test.com'),
  'Test',
  'Candidate',
  'candidate@test.com',
  '1234567890',
  'Active',
  5,
  'Software Developer',
  ARRAY['JavaScript', 'React', 'Node.js']
);
