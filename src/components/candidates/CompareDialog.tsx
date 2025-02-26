
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X } from "lucide-react";
import { Candidate } from "@/types/candidate";

interface CompareDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  candidates: Candidate[];
  onRemoveCandidate: (id: string) => void;
}

export const CompareDialog = ({
  open,
  onOpenChange,
  candidates,
  onRemoveCandidate,
}: CompareDialogProps) => {
  const criteriaLabels = {
    name: "Name",
    title: "Title",
    experience: "Experience",
    location: "Location",
    skills: "Skills",
    education: "Education",
    expectedSalary: "Expected Salary",
    currentCompany: "Current Company",
    lastActive: "Last Active",
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Compare Candidates</DialogTitle>
        </DialogHeader>
        
        <ScrollArea className="h-full pr-4">
          <div className="grid grid-cols-[150px_repeat(auto-fit,minmax(200px,1fr))] gap-4">
            {/* Headers */}
            <div className="font-medium">Criteria</div>
            {candidates.map((candidate) => (
              <div key={candidate.id} className="relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute -top-2 -right-2"
                  onClick={() => onRemoveCandidate(candidate.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}

            {/* Comparison rows */}
            {Object.entries(criteriaLabels).map(([key, label]) => (
              <div key={key} className="contents">
                <div className="py-2 font-medium">{label}</div>
                {candidates.map((candidate) => (
                  <div key={`${candidate.id}-${key}`} className="py-2">
                    {key === 'skills' ? (
                      <div className="flex flex-wrap gap-1">
                        {candidate[key].map((skill: string) => (
                          <span
                            key={skill}
                            className="px-2 py-1 bg-accent/10 text-accent rounded-full text-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span>{candidate[key as keyof Candidate]}</span>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};
