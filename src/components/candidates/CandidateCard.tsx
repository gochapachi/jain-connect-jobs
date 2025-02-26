
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Mail, Phone, MessageSquare, Download, Users, Calendar } from "lucide-react";
import { Candidate } from "@/types/candidate";

interface CandidateCardProps {
  candidate: Candidate;
  onShortlist: (id: string) => void;
  onContact: (type: 'email' | 'sms' | 'whatsapp', candidate: Candidate) => void;
  onDownload: (candidate: Candidate) => void;
  onCompare: () => void;
  onSchedule: () => void;
  isSelected: boolean;
}

export const CandidateCard = ({
  candidate,
  onShortlist,
  onContact,
  onDownload,
  onCompare,
  onSchedule,
  isSelected
}: CandidateCardProps) => {
  return (
    <Card className="p-6">
      <div className="flex justify-between items-start">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-primary">{candidate.name}</h3>
          <p className="text-gray-600">{candidate.title}</p>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span>{candidate.experience} experience</span>
            <span>{candidate.location}</span>
            <span>{candidate.expectedSalary}</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {candidate.skills.map((skill, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-accent/10 text-accent rounded-full text-xs"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => onCompare()}
            className={isSelected ? "bg-accent text-white hover:bg-accent/90" : ""}
          >
            <Users className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onShortlist(candidate.id)}
            className={candidate.isShortlisted ? "text-red-500" : ""}
          >
            <Heart className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={onSchedule}
          >
            <Calendar className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onContact('email', candidate)}
          >
            <Mail className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onContact('sms', candidate)}
          >
            <Phone className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onContact('whatsapp', candidate)}
          >
            <MessageSquare className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => onDownload(candidate)}
          >
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};
