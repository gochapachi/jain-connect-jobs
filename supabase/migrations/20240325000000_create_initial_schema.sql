
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create ENUM types
CREATE TYPE gender_type AS ENUM ('Male', 'Female', 'Other');
CREATE TYPE availability_type AS ENUM ('Immediate', '1 Month', '2 Months', 'Negotiable');
CREATE TYPE job_type AS ENUM ('Full-time', 'Part-time', 'Contract', 'Internship');
CREATE TYPE remote_option_type AS ENUM ('Yes', 'No', 'Hybrid');
CREATE TYPE application_status_type AS ENUM ('Applied', 'Shortlisted', 'Rejected', 'Hired');
CREATE TYPE user_type AS ENUM ('Employer', 'Candidate');
CREATE TYPE review_status_type AS ENUM ('Pending', 'Approved', 'Rejected');
CREATE TYPE assessment_status_type AS ENUM ('Passed', 'Failed', 'Pending');
CREATE TYPE interview_mode_type AS ENUM ('Online', 'Offline');
CREATE TYPE interview_status_type AS ENUM ('Scheduled', 'Completed', 'Canceled');
CREATE TYPE notification_status_type AS ENUM ('Unread', 'Read');
CREATE TYPE subscription_status_type AS ENUM ('Active', 'Expired', 'Canceled');
CREATE TYPE referral_status_type AS ENUM ('Pending', 'Hired', 'Rejected');
CREATE TYPE alert_frequency_type AS ENUM ('Daily', 'Weekly', 'Monthly');

-- Create employers table
CREATE TABLE employers (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    auth_id uuid REFERENCES auth.users(id),
    company_name VARCHAR(255) NOT NULL,
    industry VARCHAR(100) NOT NULL,
    company_size VARCHAR(50),
    website VARCHAR(255),
    logo VARCHAR(255),
    contact_person VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(15) NOT NULL,
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100),
    postal_code VARCHAR(10),
    about_company TEXT,
    registration_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'Active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create candidates table
CREATE TABLE candidates (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    auth_id uuid REFERENCES auth.users(id),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100),
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(15) NOT NULL,
    dob DATE,
    gender gender_type,
    address TEXT,
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100),
    postal_code VARCHAR(10),
    resume VARCHAR(255),
    profile_photo VARCHAR(255),
    linkedin_url VARCHAR(255),
    experience_years INTEGER DEFAULT 0,
    skills TEXT[],
    education TEXT,
    current_job_title VARCHAR(255),
    current_company VARCHAR(255),
    expected_salary DECIMAL(10,2),
    availability availability_type,
    registration_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(20) DEFAULT 'Active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create jobs table
CREATE TABLE jobs (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    employer_id uuid REFERENCES employers(id),
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    skills_required TEXT[],
    min_experience INTEGER,
    max_experience INTEGER,
    job_type job_type NOT NULL,
    salary_min DECIMAL(10,2),
    salary_max DECIMAL(10,2),
    location VARCHAR(255) NOT NULL,
    city VARCHAR(100),
    state VARCHAR(100),
    country VARCHAR(100),
    remote_option remote_option_type DEFAULT 'No',
    vacancies INTEGER DEFAULT 1,
    posted_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    expiry_date DATE,
    status VARCHAR(20) DEFAULT 'Open',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create job applications table
CREATE TABLE job_applications (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id uuid REFERENCES jobs(id),
    candidate_id uuid REFERENCES candidates(id),
    status application_status_type DEFAULT 'Applied',
    resume_url VARCHAR(255),
    cover_letter TEXT,
    applied_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create saved jobs table
CREATE TABLE saved_jobs (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    candidate_id uuid REFERENCES candidates(id),
    job_id uuid REFERENCES jobs(id),
    saved_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(candidate_id, job_id)
);

-- Create employer reviews table
CREATE TABLE employer_reviews (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    employer_id uuid REFERENCES employers(id),
    candidate_id uuid REFERENCES candidates(id),
    rating DECIMAL(2,1) CHECK (rating >= 1.0 AND rating <= 5.0),
    review_text TEXT,
    status review_status_type DEFAULT 'Pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create candidate assessments table
CREATE TABLE candidate_assessments (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    candidate_id uuid REFERENCES candidates(id),
    job_id uuid REFERENCES jobs(id),
    test_name VARCHAR(255) NOT NULL,
    score DECIMAL(5,2),
    max_score DECIMAL(5,2) NOT NULL,
    status assessment_status_type DEFAULT 'Pending',
    test_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create interviews table
CREATE TABLE interviews (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id uuid REFERENCES jobs(id),
    candidate_id uuid REFERENCES candidates(id),
    employer_id uuid REFERENCES employers(id),
    interview_date TIMESTAMP WITH TIME ZONE NOT NULL,
    mode interview_mode_type NOT NULL,
    location VARCHAR(255),
    meeting_link VARCHAR(255),
    status interview_status_type DEFAULT 'Scheduled',
    feedback TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create job alerts table
CREATE TABLE job_alerts (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    candidate_id uuid REFERENCES candidates(id),
    keywords TEXT[],
    location VARCHAR(255),
    industry VARCHAR(100),
    job_type job_type,
    salary_range VARCHAR(50),
    frequency alert_frequency_type DEFAULT 'Weekly',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create notifications table
CREATE TABLE notifications (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id uuid NOT NULL,
    user_type user_type NOT NULL,
    message TEXT NOT NULL,
    status notification_status_type DEFAULT 'Unread',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create employer subscriptions table
CREATE TABLE employer_subscriptions (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    employer_id uuid REFERENCES employers(id),
    plan_name VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    features TEXT[],
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status subscription_status_type DEFAULT 'Active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create referrals table
CREATE TABLE referrals (
    id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
    referrer_id uuid REFERENCES candidates(id),
    referred_email VARCHAR(255) NOT NULL,
    job_id uuid REFERENCES jobs(id),
    status referral_status_type DEFAULT 'Pending',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Add indexes for better query performance
CREATE INDEX idx_jobs_employer_id ON jobs(employer_id);
CREATE INDEX idx_job_applications_job_id ON job_applications(job_id);
CREATE INDEX idx_job_applications_candidate_id ON job_applications(candidate_id);
CREATE INDEX idx_saved_jobs_candidate_id ON saved_jobs(candidate_id);
CREATE INDEX idx_employer_reviews_employer_id ON employer_reviews(employer_id);
CREATE INDEX idx_interviews_job_id ON interviews(job_id);
CREATE INDEX idx_interviews_candidate_id ON interviews(candidate_id);
CREATE INDEX idx_job_alerts_candidate_id ON job_alerts(candidate_id);
CREATE INDEX idx_notifications_user_id ON notifications(user_id);
CREATE INDEX idx_employer_subscriptions_employer_id ON employer_subscriptions(employer_id);
CREATE INDEX idx_referrals_job_id ON referrals(job_id);

-- Add RLS policies
ALTER TABLE employers ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE saved_jobs ENABLE ROW LEVEL SECURITY;
ALTER TABLE employer_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidate_assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE interviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE job_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE employer_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;

-- Create triggers for updated_at timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_employers_updated_at
    BEFORE UPDATE ON employers
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_candidates_updated_at
    BEFORE UPDATE ON candidates
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_jobs_updated_at
    BEFORE UPDATE ON jobs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_job_applications_updated_at
    BEFORE UPDATE ON job_applications
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_employer_reviews_updated_at
    BEFORE UPDATE ON employer_reviews
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_candidate_assessments_updated_at
    BEFORE UPDATE ON candidate_assessments
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_interviews_updated_at
    BEFORE UPDATE ON interviews
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_job_alerts_updated_at
    BEFORE UPDATE ON job_alerts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_employer_subscriptions_updated_at
    BEFORE UPDATE ON employer_subscriptions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
