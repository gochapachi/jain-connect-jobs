
import { useState } from "react";
import { Header } from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Search, Filter, Clock, MapPin, Building2, CheckCircle2, PanelLeftOpen } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FEATURED_JOBS } from "@/components/home/JobListingSection";

const INDUSTRIES = [
  "Technology",
  "Healthcare",
  "Education",
  "Non-profit",
  "Finance",
  "Consulting"
];

const LOCATIONS = [
  "Mumbai, India",
  "Delhi, India",
  "Bangalore, India",
  "Pune, India",
  "Chennai, India"
];

const JAIN_POLICIES = [
  "Vegetarian Workplace",
  "Meditation Room",
  "Festival Holidays",
  "Flexible Hours",
  "Community Service Days"
];

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedPolicies, setSelectedPolicies] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [experienceLevel, setExperienceLevel] = useState<string[]>([]);
  const [selectedJob, setSelectedJob] = useState<any>(null);
  const [showJobDetails, setShowJobDetails] = useState(false);

  const filteredJobs = FEATURED_JOBS.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIndustry = selectedIndustries.length === 0 || selectedIndustries.includes(job.industry);
    const matchesLocation = selectedLocations.length === 0 || selectedLocations.includes(job.location);
    const matchesPolicies = selectedPolicies.length === 0 || 
                           selectedPolicies.every(policy => job.jainFriendlyPolicies.includes(policy));
    return matchesSearch && matchesIndustry && matchesLocation && matchesPolicies;
  });

  return (
    <div className="min-h-screen bg-muted">
      <Header />
      
      <main className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Search and Filter Section */}
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8 animate-fade-in">
            <div className="flex gap-4 flex-wrap">
              <div className="flex-1 min-w-[300px]">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <Input
                    type="text"
                    placeholder="Search jobs by title or company..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => setShowFilters(true)}
              >
                <Filter className="w-4 h-4" />
                Filters
              </Button>
            </div>

            {/* Quick Filter Chips */}
            <div className="mt-4 flex flex-wrap gap-2">
              {selectedIndustries.map(industry => (
                <div key={industry} className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm flex items-center gap-1">
                  <Building2 className="w-3 h-3" />
                  {industry}
                  <button 
                    onClick={() => setSelectedIndustries(prev => prev.filter(i => i !== industry))}
                    className="ml-1 hover:text-accent/80"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-8">
            {/* Job Listings */}
            <div className="flex-1 space-y-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-primary">
                  {filteredJobs.length} Jobs Found
                </h2>
                <Button variant="ghost" className="text-sm text-gray-500">
                  Sort by: Newest First
                </Button>
              </div>

              {filteredJobs.map((job, index) => (
                <Card 
                  key={job.id}
                  className="p-6 animate-slide-in hover:shadow-md transition-all cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onClick={() => {
                    setSelectedJob(job);
                    setShowJobDetails(true);
                  }}
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
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Filters Dialog */}
      <Dialog open={showFilters} onOpenChange={setShowFilters}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Filter Jobs</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* Industry Filter */}
            <div>
              <h4 className="font-medium mb-3">Industry</h4>
              <div className="space-y-2">
                {INDUSTRIES.map(industry => (
                  <div key={industry} className="flex items-center space-x-2">
                    <Checkbox
                      checked={selectedIndustries.includes(industry)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedIndustries(prev => [...prev, industry]);
                        } else {
                          setSelectedIndustries(prev => prev.filter(i => i !== industry));
                        }
                      }}
                    />
                    <label className="text-sm">{industry}</label>
                  </div>
                ))}
              </div>
            </div>

            {/* Location Filter */}
            <div>
              <h4 className="font-medium mb-3">Location</h4>
              <div className="space-y-2">
                {LOCATIONS.map(location => (
                  <div key={location} className="flex items-center space-x-2">
                    <Checkbox
                      checked={selectedLocations.includes(location)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedLocations(prev => [...prev, location]);
                        } else {
                          setSelectedLocations(prev => prev.filter(l => l !== location));
                        }
                      }}
                    />
                    <label className="text-sm">{location}</label>
                  </div>
                ))}
              </div>
            </div>

            {/* Jain-Friendly Policies */}
            <div>
              <h4 className="font-medium mb-3">Jain-Friendly Policies</h4>
              <div className="space-y-2">
                {JAIN_POLICIES.map(policy => (
                  <div key={policy} className="flex items-center space-x-2">
                    <Checkbox
                      checked={selectedPolicies.includes(policy)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedPolicies(prev => [...prev, policy]);
                        } else {
                          setSelectedPolicies(prev => prev.filter(p => p !== policy));
                        }
                      }}
                    />
                    <label className="text-sm">{policy}</label>
                  </div>
                ))}
              </div>
            </div>

            {/* Experience Level */}
            <div>
              <h4 className="font-medium mb-3">Experience Level</h4>
              <div className="space-y-2">
                {["Entry Level", "Mid Level", "Senior Level", "Executive"].map(level => (
                  <div key={level} className="flex items-center space-x-2">
                    <Checkbox
                      checked={experienceLevel.includes(level)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setExperienceLevel(prev => [...prev, level]);
                        } else {
                          setExperienceLevel(prev => prev.filter(l => l !== level));
                        }
                      }}
                    />
                    <label className="text-sm">{level}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <Button variant="outline" onClick={() => {
                setSelectedIndustries([]);
                setSelectedLocations([]);
                setSelectedPolicies([]);
                setExperienceLevel([]);
              }}>
                Reset
              </Button>
              <Button 
                className="bg-accent hover:bg-accent/90"
                onClick={() => setShowFilters(false)}
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Job Details Dialog */}
      <Dialog open={showJobDetails} onOpenChange={setShowJobDetails}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedJob && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedJob.title}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <h3 className="text-accent font-medium">{selectedJob.company}</h3>
                  <p className="text-gray-500">{selectedJob.location}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Description</h4>
                  <p className="text-gray-600">{selectedJob.description}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Requirements</h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {selectedJob.requirements.map((req: string, index: number) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium mb-2">Jain-Friendly Policies</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.jainFriendlyPolicies.map((policy: string, index: number) => (
                      <span key={index} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/10 text-accent">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        {policy}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end gap-4 mt-6">
                  <Button variant="outline" onClick={() => setShowJobDetails(false)}>
                    Close
                  </Button>
                  <Button className="bg-accent hover:bg-accent/90">
                    Apply Now
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Jobs;
