
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { MapPin, Building2, CheckCircle2 } from "lucide-react";
import { FeaturedJob } from "@/types/job";

interface JobCardProps {
  job: FeaturedJob;
  onSelect: (job: FeaturedJob) => void;
  index: number;
}

export const JobCard = ({ job, onSelect, index }: JobCardProps) => {
  return (
    <Card 
      className="p-6 animate-slide-in hover:shadow-md transition-all cursor-pointer"
      style={{ animationDelay: `${index * 100}ms` }}
      onClick={() => onSelect(job)}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-primary mb-2">{job.title}</h3>
          <div className="space-y-2">
            <p className="text-gray-600">{job.company}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4" />
                {job.location}
              </span>
              <span className="flex items-center gap-1">
                <Building2 className="w-4 h-4" />
                {job.industry}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              {job.jainFriendlyPolicies.slice(0, 2).map((policy, idx) => (
                <span key={idx} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/10 text-accent">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  {policy}
                </span>
              ))}
            </div>
          </div>
        </div>
        <Button className="bg-accent hover:bg-accent/90">
          Apply Now
        </Button>
      </div>
    </Card>
  );
};
