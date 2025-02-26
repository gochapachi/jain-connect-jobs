-- Insert dummy employer data
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token
) VALUES (
  '00000000-0000-0000-0000-000000000001',
  'employer@test.com',
  '$2a$10$piIrFvbRKyMBRtiRNe3y2OvRDXgkY9BowLMXXuj6qxoeoiQJXTFAK', -- password: test123456
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"user_type":"employer"}',
  NOW(),
  NOW(),
  ''
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
  '00000000-0000-0000-0000-000000000001',
  'Test Company',
  'Technology',
  'John Doe',
  'employer@test.com',
  '1234567890',
  'Active'
);

-- Insert dummy candidate data
INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token
) VALUES (
  '00000000-0000-0000-0000-000000000002',
  'candidate@test.com',
  '$2a$10$piIrFvbRKyMBRtiRNe3y2OvRDXgkY9BowLMXXuj6qxoeoiQJXTFAK', -- password: test123456
  NOW(),
  '{"provider":"email","providers":["email"]}',
  '{"user_type":"candidate"}',
  NOW(),
  NOW(),
  ''
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
  '00000000-0000-0000-0000-000000000002',
  'Test',
  'Candidate',
  'candidate@test.com',
  '1234567890',
  'Active',
  5,
  'Software Developer',
  ARRAY['JavaScript', 'React', 'Node.js']
);