
export interface FeaturedJob {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  jainFriendlyPolicies: string[];
  industry: string;
  companyProfile?: {
    founded: string;
    size: string;
    website: string;
    about: string;
    benefits: string[];
    culture: string;
    values: string[];
  };
  hrContact?: {
    name: string;
    position: string;
    email: string;
  };
  reviews?: {
    rating: number;
    total: number;
    highlights: Array<{
      aspect: string;
      score: number;
      description: string;
    }>;
    testimonials: Array<{
      rating: number;
      comment: string;
      author: string;
      position: string;
      date: string;
    }>;
  };
}

export interface Industry {
  icon: JSX.Element;
  name: string;
  description: string;
}

export interface CommunityEvent {
  title: string;
  date: string;
  description: string;
  type: string;
}

export interface CommunityValue {
  title: string;
  description: string;
}
