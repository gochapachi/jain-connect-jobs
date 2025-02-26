
import { useState } from "react";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { FEATURED_JOBS } from "@/components/home/JobListingSection";
import { JobFilters } from "@/types/filters";
import { JobSearch } from "@/components/jobs/JobSearch";
import { JobFiltersDialog } from "@/components/jobs/JobFiltersDialog";
import { JobCard } from "@/components/jobs/JobCard";
import { FeaturedJob } from "@/types/job";

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<JobFilters>({
    industries: [],
    locations: [],
    policies: [],
    experienceLevels: []
  });
  const [showFilters, setShowFilters] = useState(false);

  const handleFiltersChange = (key: keyof JobFilters, value: string[]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      industries: [],
      locations: [],
      policies: [],
      experienceLevels: []
    });
  };

  const filteredJobs = FEATURED_JOBS.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesIndustry = filters.industries.length === 0 || filters.industries.includes(job.industry);
    const matchesLocation = filters.locations.length === 0 || filters.locations.includes(job.location);
    const matchesPolicies = filters.policies.length === 0 || 
                           filters.policies.every(policy => job.jainFriendlyPolicies.includes(policy));
    return matchesSearch && matchesIndustry && matchesLocation && matchesPolicies;
  });

  return (
    <div className="min-h-screen bg-muted">
      <Header />
      
      <main className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-6xl mx-auto">
          <JobSearch
            searchQuery={searchQuery}
            selectedIndustries={filters.industries}
            onSearchChange={setSearchQuery}
            onFilterClick={() => setShowFilters(true)}
            onRemoveIndustry={(industry) => 
              handleFiltersChange('industries', filters.industries.filter(i => i !== industry))
            }
          />

          <div className="flex gap-8">
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
                <JobCard
                  key={job.id}
                  job={job}
                  index={index}
                />
              ))}
            </div>
          </div>
        </div>
      </main>

      <JobFiltersDialog
        open={showFilters}
        onOpenChange={setShowFilters}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onReset={resetFilters}
      />
    </div>
  );
};

export default Jobs;
