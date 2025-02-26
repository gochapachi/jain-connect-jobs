
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const PostJob = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    // Basic Job Details
    title: "",
    company: "",
    location: "",
    type: "",
    department: "",
    experienceLevel: "",
    salary: {
      min: "",
      max: "",
      currency: "USD",
    },
    
    // Job Description
    description: "",
    responsibilities: "",
    requirements: "",
    preferredSkills: "",
    
    // Company Details
    companyDescription: "",
    companySize: "",
    industry: "",
    website: "",
    
    // Benefits & Culture
    benefits: "",
    workSchedule: "",
    remotePolicy: "",
    
    // Jain-Specific Details
    jainFriendlyPolicies: {
      vegetarianCafeteria: false,
      meditationRoom: false,
      flexibleHolidays: false,
      culturalAwareness: false,
    },
    culturalInitiatives: "",
    
    // Contact Information
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    applicationDeadline: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Job Posted Successfully",
      description: "Your job listing has been submitted and will be reviewed shortly.",
    });
    // Reset form
    setFormData({
      title: "",
      company: "",
      location: "",
      type: "",
      department: "",
      experienceLevel: "",
      salary: {
        min: "",
        max: "",
        currency: "USD",
      },
      description: "",
      responsibilities: "",
      requirements: "",
      preferredSkills: "",
      companyDescription: "",
      companySize: "",
      industry: "",
      website: "",
      benefits: "",
      workSchedule: "",
      remotePolicy: "",
      jainFriendlyPolicies: {
        vegetarianCafeteria: false,
        meditationRoom: false,
        flexibleHolidays: false,
        culturalAwareness: false,
      },
      culturalInitiatives: "",
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      applicationDeadline: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleCheckboxChange = (name: string) => {
    setFormData(prev => ({
      ...prev,
      jainFriendlyPolicies: {
        ...prev.jainFriendlyPolicies,
        [name]: !prev.jainFriendlyPolicies[name as keyof typeof prev.jainFriendlyPolicies]
      }
    }));
  };

  return (
    <div className="min-h-screen bg-muted">
      <Header />
      
      <main className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-3xl mx-auto">
          <Card className="p-6 animate-fade-in">
            <h2 className="text-2xl font-semibold text-primary mb-6">Post a New Job</h2>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Job Details */}
              <section>
                <h3 className="text-lg font-medium text-primary mb-4">Basic Job Details</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-gray-700" htmlFor="title">
                      Job Title*
                    </label>
                    <Input
                      id="title"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700" htmlFor="company">
                      Company Name*
                    </label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700" htmlFor="location">
                      Location*
                    </label>
                    <Input
                      id="location"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700" htmlFor="type">
                      Employment Type*
                    </label>
                    <Input
                      id="type"
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      placeholder="Full-time, Part-time, Contract"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700" htmlFor="department">
                      Department
                    </label>
                    <Input
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700" htmlFor="experienceLevel">
                      Experience Level
                    </label>
                    <Input
                      id="experienceLevel"
                      name="experienceLevel"
                      value={formData.experienceLevel}
                      onChange={handleChange}
                      placeholder="Entry, Mid-Level, Senior"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700" htmlFor="salary.min">
                      Minimum Salary
                    </label>
                    <Input
                      id="salary.min"
                      name="salary.min"
                      value={formData.salary.min}
                      onChange={handleChange}
                      type="number"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700" htmlFor="salary.max">
                      Maximum Salary
                    </label>
                    <Input
                      id="salary.max"
                      name="salary.max"
                      value={formData.salary.max}
                      onChange={handleChange}
                      type="number"
                    />
                  </div>
                </div>
              </section>
              
              {/* Job Description */}
              <section>
                <h3 className="text-lg font-medium text-primary mb-4">Job Description</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700" htmlFor="description">
                      Job Description*
                    </label>
                    <Textarea
                      id="description"
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows={6}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700" htmlFor="responsibilities">
                      Key Responsibilities
                    </label>
                    <Textarea
                      id="responsibilities"
                      name="responsibilities"
                      value={formData.responsibilities}
                      onChange={handleChange}
                      rows={4}
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700" htmlFor="requirements">
                      Requirements
                    </label>
                    <Textarea
                      id="requirements"
                      name="requirements"
                      value={formData.requirements}
                      onChange={handleChange}
                      rows={4}
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700" htmlFor="preferredSkills">
                      Preferred Skills
                    </label>
                    <Textarea
                      id="preferredSkills"
                      name="preferredSkills"
                      value={formData.preferredSkills}
                      onChange={handleChange}
                      rows={4}
                    />
                  </div>
                </div>
              </section>
              
              {/* Company Details */}
              <section>
                <h3 className="text-lg font-medium text-primary mb-4">Company Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700" htmlFor="companyDescription">
                      Company Description
                    </label>
                    <Textarea
                      id="companyDescription"
                      name="companyDescription"
                      value={formData.companyDescription}
                      onChange={handleChange}
                      rows={4}
                    />
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium text-gray-700" htmlFor="companySize">
                        Company Size
                      </label>
                      <Input
                        id="companySize"
                        name="companySize"
                        value={formData.companySize}
                        onChange={handleChange}
                        placeholder="e.g., 50-100 employees"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-700" htmlFor="industry">
                        Industry
                      </label>
                      <Input
                        id="industry"
                        name="industry"
                        value={formData.industry}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700" htmlFor="website">
                      Company Website
                    </label>
                    <Input
                      id="website"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      type="url"
                      placeholder="https://"
                    />
                  </div>
                </div>
              </section>
              
              {/* Benefits & Culture */}
              <section>
                <h3 className="text-lg font-medium text-primary mb-4">Benefits & Culture</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700" htmlFor="benefits">
                      Benefits & Perks
                    </label>
                    <Textarea
                      id="benefits"
                      name="benefits"
                      value={formData.benefits}
                      onChange={handleChange}
                      rows={4}
                      placeholder="List the benefits and perks offered"
                    />
                  </div>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="text-sm font-medium text-gray-700" htmlFor="workSchedule">
                        Work Schedule
                      </label>
                      <Input
                        id="workSchedule"
                        name="workSchedule"
                        value={formData.workSchedule}
                        onChange={handleChange}
                        placeholder="e.g., Monday-Friday, 9-5"
                      />
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-700" htmlFor="remotePolicy">
                        Remote Work Policy
                      </label>
                      <Input
                        id="remotePolicy"
                        name="remotePolicy"
                        value={formData.remotePolicy}
                        onChange={handleChange}
                        placeholder="e.g., Hybrid, Remote, On-site"
                      />
                    </div>
                  </div>
                </div>
              </section>
              
              {/* Jain-Specific Details */}
              <section>
                <h3 className="text-lg font-medium text-primary mb-4">Jain-Friendly Workplace</h3>
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="vegetarianCafeteria"
                        checked={formData.jainFriendlyPolicies.vegetarianCafeteria}
                        onCheckedChange={() => handleCheckboxChange('vegetarianCafeteria')}
                      />
                      <label
                        htmlFor="vegetarianCafeteria"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Vegetarian Cafeteria
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="meditationRoom"
                        checked={formData.jainFriendlyPolicies.meditationRoom}
                        onCheckedChange={() => handleCheckboxChange('meditationRoom')}
                      />
                      <label
                        htmlFor="meditationRoom"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Meditation Room
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="flexibleHolidays"
                        checked={formData.jainFriendlyPolicies.flexibleHolidays}
                        onCheckedChange={() => handleCheckboxChange('flexibleHolidays')}
                      />
                      <label
                        htmlFor="flexibleHolidays"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Flexible Religious Holidays
                      </label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="culturalAwareness"
                        checked={formData.jainFriendlyPolicies.culturalAwareness}
                        onCheckedChange={() => handleCheckboxChange('culturalAwareness')}
                      />
                      <label
                        htmlFor="culturalAwareness"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Cultural Awareness Training
                      </label>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700" htmlFor="culturalInitiatives">
                      Cultural Initiatives & Support
                    </label>
                    <Textarea
                      id="culturalInitiatives"
                      name="culturalInitiatives"
                      value={formData.culturalInitiatives}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Describe any additional cultural initiatives or support programs"
                    />
                  </div>
                </div>
              </section>
              
              {/* Contact Information */}
              <section>
                <h3 className="text-lg font-medium text-primary mb-4">Contact Information</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="text-sm font-medium text-gray-700" htmlFor="contactName">
                      Contact Person*
                    </label>
                    <Input
                      id="contactName"
                      name="contactName"
                      value={formData.contactName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700" htmlFor="contactEmail">
                      Contact Email*
                    </label>
                    <Input
                      id="contactEmail"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleChange}
                      type="email"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700" htmlFor="contactPhone">
                      Contact Phone
                    </label>
                    <Input
                      id="contactPhone"
                      name="contactPhone"
                      value={formData.contactPhone}
                      onChange={handleChange}
                      type="tel"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-700" htmlFor="applicationDeadline">
                      Application Deadline
                    </label>
                    <Input
                      id="applicationDeadline"
                      name="applicationDeadline"
                      value={formData.applicationDeadline}
                      onChange={handleChange}
                      type="date"
                    />
                  </div>
                </div>
              </section>
              
              <Button type="submit" className="w-full bg-accent hover:bg-accent/90">
                Post Job
              </Button>
            </form>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default PostJob;
