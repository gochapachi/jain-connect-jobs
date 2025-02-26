
import { FeaturedJob } from "@/types/job";
import { Button } from "@/components/ui/button";

const FEATURED_JOBS: FeaturedJob[] = [
  {
    id: 1,
    title: "Business Analyst",
    company: "Jain Tech Solutions",
    location: "Mumbai, India",
    description: "Join our growing team to help analyze and improve business processes while working in an environment that respects and supports Jain values.",
    requirements: ["3+ years experience", "Strong analytical skills", "Knowledge of Jain business ethics"],
    jainFriendlyPolicies: ["Flexible hours during Paryushan", "100% vegetarian workplace", "Meditation room"],
    industry: "Technology"
  },
  {
    id: 2,
    title: "Community Manager",
    company: "Ahimsa Foundation",
    location: "Delhi, India",
    description: "Help build and nurture our growing Jain professional network with focus on ethical community engagement.",
    requirements: ["2+ years in community management", "Strong communication skills", "Understanding of Jain values"],
    jainFriendlyPolicies: ["Work from home during festivals", "Vegan catering", "Community service days"],
    industry: "Non-profit"
  },
  {
    id: 3,
    title: "Financial Advisor",
    company: "Dharma Investments",
    location: "Bangalore, India",
    description: "Guide clients in making ethical investment decisions aligned with Jain principles of non-violence and sustainability.",
    requirements: ["5+ years in financial planning", "CFA certification", "Knowledge of ethical investing"],
    jainFriendlyPolicies: ["Ethical investment focus", "Festival holidays", "Flexible working hours"],
    industry: "Finance"
  }
];

interface JobListingSectionProps {
  onJobSelect: (job: FeaturedJob) => void;
}

export const JobListingSection = ({ onJobSelect }: JobListingSectionProps) => {
  return (
    <section className="mt-32">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-primary mb-4">Featured Opportunities</h2>
        <p className="text-gray-600">Discover roles aligned with Jain principles and values</p>
      </div>

      <div className="grid gap-6">
        {FEATURED_JOBS.map((job, index) => (
          <div
            key={job.id}
            onClick={() => onJobSelect(job)}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer animate-slide-in group"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-semibold text-primary mb-2 group-hover:text-accent transition-colors">{job.title}</h3>
                <p className="text-gray-600">{job.company}</p>
                <p className="text-gray-500 text-sm mt-2">{job.location}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {job.jainFriendlyPolicies.slice(0, 2).map((policy, idx) => (
                    <span key={idx} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/10 text-accent">
                      {policy}
                    </span>
                  ))}
                </div>
              </div>
              <Button variant="outline" className="group-hover:bg-accent group-hover:text-white transition-colors">
                View Details
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export { FEATURED_JOBS };
