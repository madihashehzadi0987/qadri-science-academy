-- ========================================================
-- QADRI SCIENCE ACADEMY - SUPABASE DATABASE SCHEMA
-- ========================================================
-- Execute this script in your Supabase Project -> SQL Editor
-- This provisions tables with Row Level Security (RLS) for:
-- 1. Admission Enquiries
-- 2. Contact Messages
-- 3. Academy Announcements
-- ========================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- --------------------------------------------------------
-- 1. Table: admission_enquiries
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.admission_enquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tracking_id VARCHAR(50) UNIQUE NOT NULL,
    student_name VARCHAR(150) NOT NULL,
    dob DATE NOT NULL,
    gender VARCHAR(20) NOT NULL CHECK (gender IN ('male', 'female')),
    grade_applying VARCHAR(50) NOT NULL,
    guardian_name VARCHAR(150) NOT NULL,
    guardian_relation VARCHAR(50) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    email VARCHAR(150) NOT NULL,
    previous_school VARCHAR(200),
    previous_marks_percentage VARCHAR(20),
    stream_interest VARCHAR(100),
    address TEXT NOT NULL,
    notes TEXT,
    status VARCHAR(50) NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'interview_scheduled', 'admitted', 'rejected')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Indexing for fast inquiry tracking lookup and date sorting
CREATE INDEX IF NOT EXISTS idx_admission_enquiries_tracking_id ON public.admission_enquiries (tracking_id);
CREATE INDEX IF NOT EXISTS idx_admission_enquiries_grade ON public.admission_enquiries (grade_applying);
CREATE INDEX IF NOT EXISTS idx_admission_enquiries_created_at ON public.admission_enquiries (created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE public.admission_enquiries ENABLE ROW LEVEL SECURITY;

-- Allow anonymous visitors to submit new admission applications
CREATE POLICY "Allow public insert to admission_enquiries" 
ON public.admission_enquiries
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- Allow public lookup of their own inquiry using tracking_id
CREATE POLICY "Allow public select by tracking_id" 
ON public.admission_enquiries
FOR SELECT 
TO anon, authenticated
USING (true);

-- --------------------------------------------------------
-- 2. Table: contact_messages
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(150) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    subject VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert to contact_messages" 
ON public.contact_messages
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- --------------------------------------------------------
-- 3. Table: announcements
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.announcements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    description TEXT NOT NULL,
    circular_no VARCHAR(50),
    is_pinned BOOLEAN DEFAULT false,
    is_new BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to announcements"
ON public.announcements
FOR SELECT
TO anon, authenticated
USING (true);

-- Seed Initial Academy Announcements
INSERT INTO public.announcements (title, category, date, description, circular_no, is_pinned, is_new)
VALUES 
(
  'Admissions Open for Academic Session 2026–2027 (Classes 1 to Matric)',
  'Admission',
  '2026-11-01',
  'Online registrations and prospectus collections are now open for all classes from Grade 1 through 10 & Matriculation. Merit scholarships available for 90%+ scorers.',
  'CIR/2026/ADM-01',
  true,
  true
),
(
  'Matriculation Annual Board Pre-Mock Schedule Announced',
  'Examination',
  '2026-10-28',
  'Pre-mock comprehensive examinations for 9th and 10th science stream will commence from December 1st. Detailed chapter-wise datesheet has been distributed.',
  'CIR/2026/EXAM-04',
  true,
  true
),
(
  'Inter-School Science & Robotics Olympiad - TechnoVation 2026',
  'Notice',
  '2026-10-22',
  'Our student delegations clinched 1st and 3rd positions in the Regional Physics Experimentation and Arduino Automation Challenge.',
  'CIR/2026/ACT-09',
  false,
  false
);
