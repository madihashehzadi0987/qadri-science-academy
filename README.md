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
  - Curriculum, laboratory schedule, and 4-tier testing system.
- **Board Toppers Hall of Fame**: Top scorers with percentages, roll numbers, board names, and quotes.
- **Activities & Events**: TechnoVation Science Expo, Sports Gala, Naat & Qirat competitions, and study excursions.
- **Notices & Circulars**: Official announcement board with filters, search, and downloadable circular memos.
- **Photo Gallery**: Categorized laboratory & campus moments with a full-screen Lightbox viewer.
- **Admission Enquiry Form**:
  - Live data collection (Student details, Grade applying for, Guardian info, previous percentage).
  - Generates official application reference tracking ID (e.g. `QSA-2026-XXXX`).
  - Printable/downloadable official admission acknowledgment receipt.
- **Application Tracker**: Quick modal to look up status using the reference number.
- **Contact & Location**: Interactive message desk and visual campus map.

---

## Supabase Database Integration

The application is structured with the official `@supabase/supabase-js` SDK.

### 1. Database Schema
Copy and run the contents of [`supabase/schema.sql`](./supabase/schema.sql) in your **Supabase Project &rarr; SQL Editor**.

This automatically sets up:
- `admission_enquiries`: Stores student applications with Row Level Security (RLS).
- `contact_messages`: Stores inquiries sent via the contact form.
- `announcements`: Stores official notices and circulars.

### 2. Environment Variables
Add the following keys to your `.env` file (or Vercel project settings):

```env
VITE_SUPABASE_URL="https://your-project-id.supabase.co"
VITE_SUPABASE_ANON_KEY="your-anon-public-key"
```

*Note: If environment variables are not yet provided, the application automatically uses a resilient local storage queue so that user forms are never lost, and smoothly switches to Supabase once configured.*

---

## Vercel Deployment

This project is fully prepared for 1-click Vercel deployment:
1. Push this repository to GitHub or GitLab.
2. In the Vercel dashboard, click **Add New Project** &rarr; **Import**.
3. Under **Environment Variables**, add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Deploy! The included `vercel.json` ensures client-side SPA routing works seamlessly.
