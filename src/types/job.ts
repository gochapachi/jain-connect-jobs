
export interface FeaturedJob {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  jainFriendlyPolicies: string[];
  industry: string;
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
