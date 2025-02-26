
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Building2 } from "lucide-react";

interface JobSearchProps {
  searchQuery: string;
  selectedIndustries: string[];
  onSearchChange: (value: string) => void;
  onFilterClick: () => void;
  onRemoveIndustry: (industry: string) => void;
}

export const JobSearch = ({
  searchQuery,
  selectedIndustries,
  onSearchChange,
  onFilterClick,
  onRemoveIndustry
}: JobSearchProps) => {
  return (
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
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        </div>
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={onFilterClick}
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
              onClick={() => onRemoveIndustry(industry)}
              className="ml-1 hover:text-accent/80"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
