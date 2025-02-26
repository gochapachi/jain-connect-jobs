
import { useState, useMemo } from "react";
import { Header } from "@/components/Header";
import { CandidateCard } from "@/components/candidates/CandidateCard";
import { SearchFilters } from "@/components/candidates/SearchFilters";
import { FilterDialog } from "@/components/candidates/FilterDialog";
import { useToast } from "@/components/ui/use-toast";
import { mockCandidates } from "@/data/mockCandidates";
import { Candidate, CandidateFilters, SavedFilter } from "@/types/candidate";

const SearchCandidates = () => {
  const { toast } = useToast();
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates); // Fixed: Added setCandidates
  const [searchQuery, setSearchQuery] = useState("");
  const [savedFilters, setSavedFilters] = useState<SavedFilter[]>([]);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
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

  const processSearchQuery = (query: string) => {
    const terms = query.match(/(?:[^\s"]+|"[^"]*")+/g) || [];
    return terms.map(term => {
      if (term.startsWith('"') && term.endsWith('"')) {
        return { type: 'exact', value: term.slice(1, -1) };
      }
      if (term.startsWith('-')) {
        return { type: 'exclude', value: term.slice(1) };
      }
      if (term.toUpperCase() === 'OR' || term.toUpperCase() === 'AND') {
        return { type: 'operator', value: term.toUpperCase() };
      }
      return { type: 'include', value: term };
    });
  };

  const filteredCandidates = useMemo(() => {
    return candidates.filter(candidate => {
      if (filters.experienceMin && parseInt(candidate.experience) < parseInt(filters.experienceMin)) {
        return false;
      }
      if (filters.experienceMax && parseInt(candidate.experience) > parseInt(filters.experienceMax)) {
        return false;
      }
      if (filters.locations.length && !filters.locations.includes(candidate.location)) {
        return false;
      }
      if (filters.skills.length && !filters.skills.some(skill => candidate.skills.includes(skill))) {
        return false;
      }
      if (filters.education.length && !filters.education.includes(candidate.education)) {
        return false;
      }

      if (searchQuery) {
        const searchTerms = processSearchQuery(searchQuery);
        let matches = true;
        let currentOperator = 'AND';

        for (let i = 0; i < searchTerms.length; i++) {
          const term = searchTerms[i];
          const nextTerm = searchTerms[i + 1];

          if (term.type === 'operator') {
            currentOperator = term.value;
            continue;
          }

          const searchableText = `
            ${candidate.name.toLowerCase()} 
            ${candidate.title.toLowerCase()} 
            ${candidate.skills.join(' ').toLowerCase()}
            ${candidate.location.toLowerCase()}
          `;

          let termMatches = false;

          switch (term.type) {
            case 'exact':
              termMatches = searchableText.includes(term.value.toLowerCase());
              break;
            case 'exclude':
              termMatches = !searchableText.includes(term.value.toLowerCase());
              break;
            case 'include':
              termMatches = searchableText.includes(term.value.toLowerCase());
              break;
          }

          if (currentOperator === 'AND') {
            matches = matches && termMatches;
          } else if (currentOperator === 'OR') {
            matches = matches || termMatches;
          }
        }

        return matches;
      }

      return true;
    });
  }, [candidates, filters, searchQuery]);

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
            onFilterClick={() => setFilterDialogOpen(true)}
            onSaveFilter={handleSaveFilter}
            savedFilters={savedFilters}
            onFilterSelect={setFilters}
          />

          <FilterDialog
            open={filterDialogOpen}
            onOpenChange={setFilterDialogOpen}
            initialFilters={filters}
            onApplyFilters={setFilters}
          />

          <div className="space-y-4">
            {filteredCandidates.map((candidate) => (
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
