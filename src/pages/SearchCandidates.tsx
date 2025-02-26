
import { useState } from "react";
import { Header } from "@/components/Header";
import { CandidateCard } from "@/components/candidates/CandidateCard";
import { SearchFilters } from "@/components/candidates/SearchFilters";
import { useToast } from "@/components/ui/use-toast";
import { mockCandidates } from "@/data/mockCandidates";
import { Candidate, CandidateFilters, SavedFilter } from "@/types/candidate";

const SearchCandidates = () => {
  const { toast } = useToast();
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);
  const [searchQuery, setSearchQuery] = useState("");
  const [savedFilters, setSavedFilters] = useState<SavedFilter[]>([]);
  const [filters, setFilters] = useState<CandidateFilters>({
    experienceMin: "",
    experienceMax: "",
    locations: [],
    skills: [],
    education: [],
    salary: {
      min: "",
      max: ""
    },
    lastActive: ""
  });

  const handleShortlist = (candidateId: string) => {
    setCandidates(prev => 
      prev.map(candidate => 
        candidate.id === candidateId 
          ? { ...candidate, isShortlisted: !candidate.isShortlisted }
          : candidate
      )
    );
    toast({
      title: "Candidate Status Updated",
      description: "The candidate has been added to your shortlist.",
    });
  };

  const handleSaveFilter = () => {
    const filterName = prompt("Enter a name for this filter:");
    if (filterName) {
      setSavedFilters(prev => [...prev, { name: filterName, filters: { ...filters } }]);
      toast({
        title: "Filter Saved",
        description: `Your filter "${filterName}" has been saved successfully.`,
      });
    }
  };

  const handleContact = (type: 'email' | 'sms' | 'whatsapp', candidate: Candidate) => {
    toast({
      title: "Contact Initiative",
      description: `Initiating ${type} contact with ${candidate.name}...`,
    });
  };

  const handleDownloadResume = (candidate: Candidate) => {
    toast({
      title: "Downloading Resume",
      description: `Downloading resume for ${candidate.name}...`,
    });
  };

  return (
    <div className="min-h-screen bg-muted">
      <Header />
      
      <main className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-7xl mx-auto">
          <SearchFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onFilterClick={() => {/* TODO: Implement filter dialog */}}
            onSaveFilter={handleSaveFilter}
            savedFilters={savedFilters}
            onFilterSelect={setFilters}
          />

          <div className="space-y-4">
            {candidates.map((candidate) => (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                onShortlist={handleShortlist}
                onContact={handleContact}
                onDownload={handleDownloadResume}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SearchCandidates;
