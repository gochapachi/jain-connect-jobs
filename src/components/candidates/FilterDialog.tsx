
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { CandidateFilters } from "@/types/candidate";
import { useState } from "react";

interface FilterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialFilters: CandidateFilters;
  onApplyFilters: (filters: CandidateFilters) => void;
}

const LOCATIONS = ["Mumbai, India", "Delhi, India", "Bangalore, India", "Pune, India"];
const EDUCATION = ["B.Tech", "M.Tech", "BCA", "MCA", "MBA"];
const SKILLS = ["React", "Node.js", "TypeScript", "Python", "Java", "Angular"];

export const FilterDialog = ({
  open,
  onOpenChange,
  initialFilters,
  onApplyFilters,
}: FilterDialogProps) => {
  const [filters, setFilters] = useState<CandidateFilters>(initialFilters);

  const handleFilterChange = (key: keyof CandidateFilters, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSalaryChange = (type: 'min' | 'max', value: string) => {
    setFilters(prev => ({
      ...prev,
      salary: {
        ...prev.salary,
        [type]: value
      }
    }));
  };

  const handleArrayToggle = (key: keyof CandidateFilters, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: (prev[key] as string[]).includes(value)
        ? (prev[key] as string[]).filter(item => item !== value)
        : [...(prev[key] as string[]), value]
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Advanced Filters</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Experience Range */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Min Experience (years)</Label>
              <Input
                type="number"
                value={filters.experienceMin}
                onChange={(e) => handleFilterChange('experienceMin', e.target.value)}
                min="0"
              />
            </div>
            <div className="space-y-2">
              <Label>Max Experience (years)</Label>
              <Input
                type="number"
                value={filters.experienceMax}
                onChange={(e) => handleFilterChange('experienceMax', e.target.value)}
                min="0"
              />
            </div>
          </div>

          {/* Salary Range */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Min Salary (LPA)</Label>
              <Input
                type="number"
                value={filters.salary.min}
                onChange={(e) => handleSalaryChange('min', e.target.value)}
                min="0"
              />
            </div>
            <div className="space-y-2">
              <Label>Max Salary (LPA)</Label>
              <Input
                type="number"
                value={filters.salary.max}
                onChange={(e) => handleSalaryChange('max', e.target.value)}
                min="0"
              />
            </div>
          </div>

          {/* Locations */}
          <div className="space-y-2">
            <Label>Locations</Label>
            <div className="grid grid-cols-2 gap-2">
              {LOCATIONS.map((location) => (
                <div key={location} className="flex items-center space-x-2">
                  <Checkbox
                    id={location}
                    checked={filters.locations.includes(location)}
                    onCheckedChange={() => handleArrayToggle('locations', location)}
                  />
                  <label htmlFor={location}>{location}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-2">
            <Label>Skills</Label>
            <div className="grid grid-cols-2 gap-2">
              {SKILLS.map((skill) => (
                <div key={skill} className="flex items-center space-x-2">
                  <Checkbox
                    id={skill}
                    checked={filters.skills.includes(skill)}
                    onCheckedChange={() => handleArrayToggle('skills', skill)}
                  />
                  <label htmlFor={skill}>{skill}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-2">
            <Label>Education</Label>
            <div className="grid grid-cols-2 gap-2">
              {EDUCATION.map((edu) => (
                <div key={edu} className="flex items-center space-x-2">
                  <Checkbox
                    id={edu}
                    checked={filters.education.includes(edu)}
                    onCheckedChange={() => handleArrayToggle('education', edu)}
                  />
                  <label htmlFor={edu}>{edu}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Last Active */}
          <div className="space-y-2">
            <Label>Last Active</Label>
            <select
              className="w-full border rounded-md p-2"
              value={filters.lastActive}
              onChange={(e) => handleFilterChange('lastActive', e.target.value)}
            >
              <option value="">Any time</option>
              <option value="today">Today</option>
              <option value="week">This week</option>
              <option value="month">This month</option>
            </select>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button
              variant="outline"
              onClick={() => {
                setFilters(initialFilters);
              }}
            >
              Reset
            </Button>
            <Button
              onClick={() => {
                onApplyFilters(filters);
                onOpenChange(false);
              }}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
