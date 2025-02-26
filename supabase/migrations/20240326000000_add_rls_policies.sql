
-- Employers table policies
CREATE POLICY "Employers can view their own data"
ON employers FOR SELECT
TO authenticated
USING (auth.uid() = auth_id);

CREATE POLICY "Employers can update their own data"
ON employers FOR UPDATE
TO authenticated
USING (auth.uid() = auth_id)
WITH CHECK (auth.uid() = auth_id);

-- Candidates table policies
CREATE POLICY "Candidates can view their own data"
ON candidates FOR SELECT
TO authenticated
USING (auth.uid() = auth_id);

CREATE POLICY "Candidates can update their own data"
ON candidates FOR UPDATE
TO authenticated
USING (auth.uid() = auth_id)
WITH CHECK (auth.uid() = auth_id);

-- Jobs table policies
CREATE POLICY "Anyone can view active jobs"
ON jobs FOR SELECT
USING (status = 'Open');

CREATE POLICY "Employers can manage their own jobs"
ON jobs FOR ALL
TO authenticated
USING (employer_id IN (
    SELECT id FROM employers WHERE auth_id = auth.uid()
));

-- Job applications policies
CREATE POLICY "Candidates can view their own applications"
ON job_applications FOR SELECT
TO authenticated
USING (candidate_id IN (
    SELECT id FROM candidates WHERE auth_id = auth.uid()
));

CREATE POLICY "Employers can view applications for their jobs"
ON job_applications FOR SELECT
TO authenticated
USING (job_id IN (
    SELECT id FROM jobs WHERE employer_id IN (
        SELECT id FROM employers WHERE auth_id = auth.uid()
    )
));

CREATE POLICY "Candidates can create applications"
ON job_applications FOR INSERT
TO authenticated
WITH CHECK (candidate_id IN (
    SELECT id FROM candidates WHERE auth_id = auth.uid()
));

-- Saved jobs policies
CREATE POLICY "Candidates can manage their saved jobs"
ON saved_jobs FOR ALL
TO authenticated
USING (candidate_id IN (
    SELECT id FROM candidates WHERE auth_id = auth.uid()
));

-- Employer reviews policies
CREATE POLICY "Anyone can view approved reviews"
ON employer_reviews FOR SELECT
USING (status = 'Approved');

CREATE POLICY "Candidates can create reviews"
ON employer_reviews FOR INSERT
TO authenticated
WITH CHECK (candidate_id IN (
    SELECT id FROM candidates WHERE auth_id = auth.uid()
));

-- Interviews policies
CREATE POLICY "Relevant users can view interviews"
ON interviews FOR SELECT
TO authenticated
USING (
    candidate_id IN (SELECT id FROM candidates WHERE auth_id = auth.uid())
    OR
    employer_id IN (SELECT id FROM employers WHERE auth_id = auth.uid())
);

CREATE POLICY "Employers can manage interviews"
ON interviews FOR ALL
TO authenticated
USING (employer_id IN (
    SELECT id FROM employers WHERE auth_id = auth.uid()
));

-- Job alerts policies
CREATE POLICY "Candidates can manage their job alerts"
ON job_alerts FOR ALL
TO authenticated
USING (candidate_id IN (
    SELECT id FROM candidates WHERE auth_id = auth.uid()
));

-- Notifications policies
CREATE POLICY "Users can view their own notifications"
ON notifications FOR SELECT
TO authenticated
USING (user_id = auth.uid());

-- Employer subscriptions policies
CREATE POLICY "Employers can view their subscriptions"
ON employer_subscriptions FOR SELECT
TO authenticated
USING (employer_id IN (
    SELECT id FROM employers WHERE auth_id = auth.uid()
));

-- Referrals policies
CREATE POLICY "Users can manage their referrals"
ON referrals FOR ALL
TO authenticated
USING (referrer_id IN (
    SELECT id FROM candidates WHERE auth_id = auth.uid()
));
