
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { JobFilters } from "@/types/filters";

interface JobFiltersDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  filters: JobFilters;
  onFiltersChange: (key: keyof JobFilters, value: string[]) => void;
  onReset: () => void;
}

export const INDUSTRIES = [
  "Technology",
  "Healthcare",
  "Education",
  "Non-profit",
  "Finance",
  "Consulting"
];

export const LOCATIONS = [
  "Mumbai, India",
  "Delhi, India",
  "Bangalore, India",
  "Pune, India",
  "Chennai, India"
];

export const JAIN_POLICIES = [
  "Vegetarian Workplace",
  "Meditation Room",
  "Festival Holidays",
  "Flexible Hours",
  "Community Service Days"
];

export const EXPERIENCE_LEVELS = [
  "Entry Level",
  "Mid Level",
  "Senior Level",
  "Executive"
];

export const JobFiltersDialog = ({
  open,
  onOpenChange,
  filters,
  onFiltersChange,
  onReset
}: JobFiltersDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] max-h-[90vh] overflow-y-auto">
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
                    checked={filters.industries.includes(industry)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        onFiltersChange('industries', [...filters.industries, industry]);
                      } else {
                        onFiltersChange('industries', filters.industries.filter(i => i !== industry));
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
                    checked={filters.locations.includes(location)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        onFiltersChange('locations', [...filters.locations, location]);
                      } else {
                        onFiltersChange('locations', filters.locations.filter(l => l !== location));
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
                    checked={filters.policies.includes(policy)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        onFiltersChange('policies', [...filters.policies, policy]);
                      } else {
                        onFiltersChange('policies', filters.policies.filter(p => p !== policy));
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
              {EXPERIENCE_LEVELS.map(level => (
                <div key={level} className="flex items-center space-x-2">
                  <Checkbox
                    checked={filters.experienceLevels.includes(level)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        onFiltersChange('experienceLevels', [...filters.experienceLevels, level]);
                      } else {
                        onFiltersChange('experienceLevels', filters.experienceLevels.filter(l => l !== level));
                      }
                    }}
                  />
                  <label className="text-sm">{level}</label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
            <Button variant="outline" onClick={onReset}>
              Reset
            </Button>
            <Button 
              className="bg-accent hover:bg-accent/90"
              onClick={() => onOpenChange(false)}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
