
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Save } from "lucide-react";

interface SearchFiltersProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onFilterClick: () => void;
  onSaveFilter: () => void;
  savedFilters: Array<{ name: string; filters: any }>;
  onFilterSelect: (filters: any) => void;
}

export const SearchFilters = ({
  searchQuery,
  onSearchChange,
  onFilterClick,
  onSaveFilter,
  savedFilters,
  onFilterSelect,
}: SearchFiltersProps) => {
  return (
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
        <Button 
          variant="outline" 
          className="flex items-center gap-2"
          onClick={onSaveFilter}
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
              onClick={() => onFilterSelect(filter.filters)}
            >
              {filter.name}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};
