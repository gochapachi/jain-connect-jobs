
export interface Candidate {
  id: string;
  name: string;
  title: string;
  experience: string;
  location: string;
  skills: string[];
  education: string;
  lastActive: string;
  email: string;
  phone: string;
  expectedSalary: string;
  currentCompany: string;
  isShortlisted: boolean;
}

export interface SavedFilter {
  name: string;
  filters: CandidateFilters;
}

export interface CandidateFilters {
  experienceMin: string;
  experienceMax: string;
  locations: string[];
  skills: string[];
  education: string[];
  salary: {
    min: string;
    max: string;
  };
  lastActive: string;
}
