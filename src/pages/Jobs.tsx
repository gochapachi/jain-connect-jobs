
import { useState } from "react";
import { Header } from "@/components/Header";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Search } from "lucide-react";

const MOCK_JOBS = [
  {
    id: 1,
    title: "Software Engineer",
    company: "TechCorp Solutions",
    location: "Mumbai, India",
    type: "Full-time",
    posted: "2 days ago",
  },
  {
    id: 2,
    title: "Business Analyst",
    company: "Global Consulting",
    location: "Delhi, India",
    type: "Full-time",
    posted: "1 week ago",
  },
  {
    id: 3,
    title: "Marketing Manager",
    company: "Creative Industries",
    location: "Bangalore, India",
    type: "Full-time",
    posted: "3 days ago",
  },
];

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen bg-muted">
      <Header />
      
      <main className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-6 rounded-lg shadow-sm mb-8 animate-fade-in">
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

          <div className="space-y-4">
            {MOCK_JOBS.filter(job => 
              job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              job.company.toLowerCase().includes(searchQuery.toLowerCase())
            ).map((job, index) => (
              <Card 
                key={job.id}
                className="p-6 animate-slide-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-primary mb-2">{job.title}</h3>
                    <div className="space-y-2">
                      <p className="text-gray-600">{job.company}</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <span>{job.location}</span>
                        <span>•</span>
                        <span>{job.type}</span>
                        <span>•</span>
                        <span>{job.posted}</span>
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
      </main>
    </div>
  );
};

export default Jobs;
