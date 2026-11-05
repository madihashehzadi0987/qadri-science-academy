export type AcademicWing = 'junior' | 'middle' | 'matric-bio' | 'matric-cs';

export interface AcademicProgram {
  id: string;
  wing: AcademicWing;
  title: string;
  classes: string;
  tagline: string;
  description: string;
  subjects: string[];
  features: string[];
  ageGroup: string;
  timing: string;
  badge?: string;
}

export interface BoardTopper {
  id: string;
  name: string;
  rollNumber: string;
  marks: string;
  totalMarks: string;
  percentage: string;
  group: 'Science (Pre-Medical)' | 'Science (Pre-Engineering)' | 'Computer Science';
  board: string;
  year: string;
  quote: string;
  photoUrl: string;
  currentInstitution?: string;
}

export interface AcademyEvent {
  id: string;
  title: string;
  category: 'Science & Tech' | 'Sports' | 'Academic' | 'Competitions' | 'Cultural';
  date: string;
  time: string;
  location: string;
  description: string;
  imageUrl: string;
  isUpcoming: boolean;
  highlights: string[];
}

export interface Notice {
  id: string;
  title: string;
  category: 'Admission' | 'Examination' | 'Notice' | 'Holiday' | 'Result';
  date: string;
  isPinned?: boolean;
  isNew?: boolean;
  description: string;
  circularNo?: string;
  attachmentName?: string;
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'Science Labs' | 'Matric Toppers' | 'Science Exhibition' | 'Sports & Activities' | 'Campus Life';
  imageUrl: string;
  caption: string;
}

export interface FacultyMember {
  id: string;
  name: string;
  role: string;
  qualifications: string;
  experience: string;
  subject: string;
  bio: string;
  avatar: string;
}

// Exactly 5 fields for the Admission Form
export interface AdmissionEnquiryData {
  id?: string;
  student_name: string;      // Field 1: Student Full Name
  guardian_name: string;     // Field 2: Father / Guardian Name
  grade_applying: string;    // Field 3: Class / Grade Applying For (Classes 1–10 & Matric)
  phone: string;             // Field 4: Contact / WhatsApp Number
  address: string;           // Field 5: City / Residential Address
  tracking_id?: string;
  status?: string;
  created_at?: string;
}
