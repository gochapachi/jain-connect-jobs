
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FeaturedJob } from "@/types/job";

interface JobDetailsDialogProps {
  job: FeaturedJob | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const JobDetailsDialog = ({ job, open, onOpenChange }: JobDetailsDialogProps) => {
  if (!job) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{job.title}</DialogTitle>
          <DialogDescription>
            <p className="text-accent font-medium mt-2">{job.company}</p>
            <p className="text-gray-500 text-sm">{job.location}</p>
            <div className="mt-3">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/10 text-accent">
                {job.industry}
              </span>
            </div>
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <h4 className="font-semibold mb-2">Description</h4>
          <p className="text-gray-600 mb-4">{job.description}</p>
          
          <h4 className="font-semibold mb-2">Jain-Friendly Policies</h4>
          <ul className="list-disc list-inside text-gray-600 mb-4">
            {job.jainFriendlyPolicies.map((policy, index) => (
              <li key={index}>{policy}</li>
            ))}
          </ul>

          <h4 className="font-semibold mb-2">Requirements</h4>
          <ul className="list-disc list-inside text-gray-600 mb-6">
            {job.requirements.map((req, index) => (
              <li key={index}>{req}</li>
            ))}
          </ul>
          
          <div className="flex justify-end gap-4">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button className="bg-accent hover:bg-accent/90">
              Apply Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
