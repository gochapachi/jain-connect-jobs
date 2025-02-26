
import { useState } from "react";
import { Header } from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Search, Filter, Heart, Mail, Phone, MessageSquare, Star, Download, Save } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Candidate {
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

const mockCandidates: Candidate[] = [
  {
    id: "1",
    name: "Rahul Jain",
    title: "Senior Software Engineer",
    experience: "5 years",
    location: "Mumbai, India",
    skills: ["React", "Node.js", "TypeScript"],
    education: "B.Tech in Computer Science",
    lastActive: "2 days ago",
    email: "rahul.j@example.com",
    phone: "+91 98765 43210",
    expectedSalary: "20-25 LPA",
    currentCompany: "Tech Solutions Inc",
    isShortlisted: false
  },
  // Add more mock candidates here
];

const SearchCandidates = () => {
  const { toast } = useToast();
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);
  const [searchQuery, setSearchQuery] = useState("");
  const [savedFilters, setSavedFilters] = useState<Array<{ name: string; filters: any }>>([]);
  const [filters, setFilters] = useState({
    experienceMin: "",
    experienceMax: "",
    locations: [] as string[],
    skills: [] as string[],
    education: [] as string[],
    salary: {
      min: "",
      max: ""
    },
    lastActive: "" // "1day", "1week", "1month"
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
    // In a real application, this would integrate with email/SMS/WhatsApp APIs
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
          {/* Search and Filter Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
            <div className="flex gap-4 flex-wrap mb-4">
              <div className="flex-1 min-w-[300px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search candidates by skills, designation, location..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <Button variant="outline" className="flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={handleSaveFilter}
              >
                <Save className="w-4 h-4" />
                Save Filter
              </Button>
            </div>

            {/* Saved Filters */}
            {savedFilters.length > 0 && (
              <div className="flex gap-2 flex-wrap">
                {savedFilters.map((filter, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    onClick={() => setFilters(filter.filters)}
                  >
                    {filter.name}
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* Candidates List */}
          <div className="space-y-4">
            {candidates.map((candidate) => (
              <Card key={candidate.id} className="p-6">
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
                      onClick={() => handleShortlist(candidate.id)}
                      className={candidate.isShortlisted ? "text-red-500" : ""}
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleContact('email', candidate)}
                    >
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleContact('sms', candidate)}
                    >
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleContact('whatsapp', candidate)}
                    >
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleDownloadResume(candidate)}
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SearchCandidates;
