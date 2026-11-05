-- ====================================================================
-- QADRI SCIENCE ACADEMY - SUPABASE SQL PROMPT TO CREATE ADMISSION TABLE
-- ====================================================================
-- Copy and paste this ENTIRE block into your Supabase SQL Editor and click RUN.
-- This creates the table matching the 5-field Admission Form and enables public inserts.
-- ====================================================================

-- 1. Create table: admission_inquiries (5 Fields + Tracking ID)
CREATE TABLE IF NOT EXISTS public.admission_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tracking_id VARCHAR(50) UNIQUE NOT NULL,
    student_name VARCHAR(150) NOT NULL,     -- Field 1: Student Full Name
    guardian_name VARCHAR(150) NOT NULL,    -- Field 2: Father / Guardian Name
    grade_applying VARCHAR(100) NOT NULL,   -- Field 3: Class Applying For (1–10 & Matric)
    phone VARCHAR(30) NOT NULL,             -- Field 4: Contact / WhatsApp Number
    address TEXT NOT NULL,                  -- Field 5: City / Residential Address
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Create index for fast tracking lookup
CREATE INDEX IF NOT EXISTS idx_admission_inquiries_tracking_id 
ON public.admission_inquiries (tracking_id);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.admission_inquiries ENABLE ROW LEVEL SECURITY;

-- 4. Allow public anonymous users to insert admission inquiries
DROP POLICY IF EXISTS "Allow public insert to admission_inquiries" ON public.admission_inquiries;
CREATE POLICY "Allow public insert to admission_inquiries" 
ON public.admission_inquiries
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- 5. Allow users to view their submitted status with their tracking_id
DROP POLICY IF EXISTS "Allow public select by tracking_id" ON public.admission_inquiries;
CREATE POLICY "Allow public select by tracking_id" 
ON public.admission_inquiries
FOR SELECT 
TO anon, authenticated
USING (true);

-- ====================================================================
-- Optional: If your project was already using 'admission_enquiries' spelling:
-- ====================================================================
CREATE TABLE IF NOT EXISTS public.admission_enquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tracking_id VARCHAR(50) UNIQUE NOT NULL,
    student_name VARCHAR(150) NOT NULL,
    guardian_name VARCHAR(150) NOT NULL,
    grade_applying VARCHAR(100) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    address TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.admission_enquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public insert to admission_enquiries" ON public.admission_enquiries;
CREATE POLICY "Allow public insert to admission_enquiries" 
ON public.admission_enquiries
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public select by tracking_id_enquiries" ON public.admission_enquiries;
CREATE POLICY "Allow public select by tracking_id_enquiries" 
ON public.admission_enquiries
FOR SELECT 
TO anon, authenticated
USING (true);
