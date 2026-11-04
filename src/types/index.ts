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

export interface AdmissionEnquiryData {
  id?: string;
  student_name: string;
  dob: string;
  gender: 'male' | 'female';
  grade_applying: string;
  guardian_name: string;
  guardian_relation: string;
  phone: string;
  email: string;
  previous_school: string;
  previous_marks_percentage: string;
  stream_interest?: string;
  address: string;
  notes?: string;
  tracking_id?: string;
  status?: 'pending' | 'reviewed' | 'interview_scheduled' | 'admitted';
  created_at?: string;
}

export interface ContactMessageData {
  id?: string;
  full_name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  created_at?: string;
}
