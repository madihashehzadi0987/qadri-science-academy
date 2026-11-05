# Qadri Science Academy — Official Web Portal

A high-performance, responsive web application for **Qadri Science Academy** built with React, TypeScript, Tailwind CSS, and Motion.

## Features
- **Hero & Academy Showcase**: Academic achievements, 98.6% matric board pass rate, 18+ years legacy, and quick admissions actions.
- **About the Academy**: History, Mission, Vision, 4 Pillars of Science Education, Principal Prof. Muhammad Tariq Qadri's message, and faculty highlights.
- **Academics (Classes 1–10 & Matric)**:
  - *Junior Wing (Classes 1–5)*: Inquiry-based foundation & numeracy.
  - *Middle Wing (Classes 6–8)*: Pre-matriculation scientific reasoning.
  - *Secondary / Matric (Classes 9–10: Bio-Science)*: Medical track preparation.
  - *Secondary / Matric (Classes 9–10: Computer Science)*: Tech & engineering track.
- **Board Toppers Hall of Fame**: Top scorers with percentages, roll numbers, board names, and quotes.
- **Activities & Events**: TechnoVation Science Expo, Sports Gala, Naat & Qirat competitions, and study excursions.
- **Notices & Circulars**: Official announcement board with filters, search, and downloadable circular memos.
- **Photo Gallery**: Categorized laboratory & campus moments with a full-screen Lightbox viewer.
- **Single 5-Field Admission Form**:
  - Exactly 5 fields: Student Name, Father/Guardian Name, Class Applying For (1–10 & Matric), Phone/WhatsApp, and Address/City.
  - Always shows clear status: **"Saved in Supabase Successfully"** or **"Not Saved Yet"**.
  - Generates official application reference tracking ID (e.g. `QSA-2026-XXXX`).
  - Printable/downloadable official admission acknowledgment receipt.
- **Application Tracker**: Quick modal to look up status using the reference number.
- **Contact & Location**: Campus address, phone/WhatsApp helplines, visiting hours, and Google Maps directions.

---

## Supabase Database Integration

The application saves directly to your Supabase table `admission_inquiries`.

### SQL Prompt to Paste in Supabase SQL Editor

Copy and run this in your **Supabase Dashboard &rarr; SQL Editor**:

```sql
CREATE TABLE IF NOT EXISTS public.admission_inquiries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tracking_id VARCHAR(50) UNIQUE NOT NULL,
    student_name VARCHAR(150) NOT NULL,
    guardian_name VARCHAR(150) NOT NULL,
    grade_applying VARCHAR(100) NOT NULL,
    phone VARCHAR(30) NOT NULL,
    address TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

CREATE INDEX IF NOT EXISTS idx_admission_inquiries_tracking_id 
ON public.admission_inquiries (tracking_id);

ALTER TABLE public.admission_inquiries ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public insert to admission_inquiries" ON public.admission_inquiries;
CREATE POLICY "Allow public insert to admission_inquiries" 
ON public.admission_inquiries
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

DROP POLICY IF EXISTS "Allow public select by tracking_id" ON public.admission_inquiries;
CREATE POLICY "Allow public select by tracking_id" 
ON public.admission_inquiries
FOR SELECT 
TO anon, authenticated
USING (true);
```

### Environment Variables (.env / Vercel)

```env
VITE_SUPABASE_URL="https://your-project-id.supabase.co"
VITE_SUPABASE_ANON_KEY="your-anon-public-key"
```

*Note: In Vercel, after setting or updating environment variables, click **Redeploy** on your latest deployment so Vite can bundle them into your website.*
