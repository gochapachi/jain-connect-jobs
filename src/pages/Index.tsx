
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Link } from "react-router-dom";
import { useState } from "react";
import { ArrowDown, Briefcase, Users, HandHeart, Building2, Sparkles, GraduationCap, Leaf, Calendar, HeartPulse } from "lucide-react";

interface FeaturedJob {
  id: number;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  jainFriendlyPolicies: string[];
  industry: string;
}

const FEATURED_JOBS: FeaturedJob[] = [
  {
    id: 1,
    title: "Business Analyst",
    company: "Jain Tech Solutions",
    location: "Mumbai, India",
    description: "Join our growing team to help analyze and improve business processes while working in an environment that respects and supports Jain values.",
    requirements: ["3+ years experience", "Strong analytical skills", "Knowledge of Jain business ethics"],
    jainFriendlyPolicies: ["Flexible hours during Paryushan", "100% vegetarian workplace", "Meditation room"],
    industry: "Technology"
  },
  {
    id: 2,
    title: "Community Manager",
    company: "Ahimsa Foundation",
    location: "Delhi, India",
    description: "Help build and nurture our growing Jain professional network with focus on ethical community engagement.",
    requirements: ["2+ years in community management", "Strong communication skills", "Understanding of Jain values"],
    jainFriendlyPolicies: ["Work from home during festivals", "Vegan catering", "Community service days"],
    industry: "Non-profit"
  },
  {
    id: 3,
    title: "Financial Advisor",
    company: "Dharma Investments",
    location: "Bangalore, India",
    description: "Guide clients in making ethical investment decisions aligned with Jain principles of non-violence and sustainability.",
    requirements: ["5+ years in financial planning", "CFA certification", "Knowledge of ethical investing"],
    jainFriendlyPolicies: ["Ethical investment focus", "Festival holidays", "Flexible working hours"],
    industry: "Finance"
  }
];

const INDUSTRIES = [
  { icon: <Leaf className="w-6 h-6" />, name: "Vegan/Vegetarian", description: "Food and lifestyle businesses" },
  { icon: <GraduationCap className="w-6 h-6" />, name: "Education", description: "Teaching and learning" },
  { icon: <HeartPulse className="w-6 h-6" />, name: "Healthcare", description: "Medical and wellness" },
  { icon: <Building2 className="w-6 h-6" />, name: "Ethical Business", description: "Sustainable enterprises" }
];

const Index = () => {
  const [selectedJob, setSelectedJob] = useState<FeaturedJob | null>(null);
  const [showJobDialog, setShowJobDialog] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted to-white">
      <Header />
      
      {/* Hero Section */}
      <main className="container mx-auto px-4 pt-32 pb-16 animate-fade-in">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-6 leading-tight animate-slide-in">
            Connect with Opportunities in the Jain Community
          </h1>
          
          <p className="text-lg text-gray-600 mb-8 animate-slide-in" style={{ animationDelay: "100ms" }}>
            Find meaningful work opportunities aligned with Jain values or share job openings with our community. Together, we can create positive impact.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-in" style={{ animationDelay: "200ms" }}>
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 w-full sm:w-auto group transition-all duration-300">
              <Link to="/jobs" className="flex items-center gap-2">
                <Briefcase className="group-hover:rotate-12 transition-transform" />
                Browse Jobs
              </Link>
            </Button>
            
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto group hover:scale-105 transition-all duration-300">
              <Link to="/post-job" className="flex items-center gap-2">
                <Sparkles className="group-hover:rotate-12 transition-transform" />
                Post a Job
              </Link>
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="flex justify-center mt-16 animate-bounce">
          <ArrowDown className="text-accent w-8 h-8" />
        </div>
        
        {/* Industries Section */}
        <section className="mt-24">
          <h2 className="text-3xl font-bold text-primary mb-8 text-center">Industries Aligned with Jain Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {INDUSTRIES.map((industry, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group cursor-pointer animate-slide-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-accent mb-4 group-hover:scale-110 transition-transform">
                  {industry.icon}
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">{industry.name}</h3>
                <p className="text-gray-600 text-sm">{industry.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Featured Jobs Section */}
        <section className="mt-32">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary mb-4">Featured Opportunities</h2>
            <p className="text-gray-600">Discover roles aligned with Jain principles and values</p>
          </div>

          <div className="grid gap-6">
            {FEATURED_JOBS.map((job, index) => (
              <div
                key={job.id}
                onClick={() => {
                  setSelectedJob(job);
                  setShowJobDialog(true);
                }}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 cursor-pointer animate-slide-in group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold text-primary mb-2 group-hover:text-accent transition-colors">{job.title}</h3>
                    <p className="text-gray-600">{job.company}</p>
                    <p className="text-gray-500 text-sm mt-2">{job.location}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {job.jainFriendlyPolicies.slice(0, 2).map((policy, idx) => (
                        <span key={idx} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/10 text-accent">
                          {policy}
                        </span>
                      ))}
                    </div>
                  </div>
                  <Button variant="outline" className="group-hover:bg-accent group-hover:text-white transition-colors">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Community Board Section */}
        <section className="mt-32">
          <div className="text-center mb-12">
            <Calendar className="w-12 h-12 mx-auto text-accent mb-6" />
            <h2 className="text-3xl font-bold text-primary mb-4">Community Events</h2>
            <p className="text-gray-600 mb-8">Connect, learn, and grow with the Jain professional community</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Career Workshop",
                date: "March 15, 2024",
                description: "Join us for a special career development workshop during Paryushan.",
                type: "Workshop"
              },
              {
                title: "Networking Mixer",
                date: "March 20, 2024",
                description: "Connect with Jain professionals in your industry.",
                type: "Networking"
              },
              {
                title: "Mentorship Program",
                date: "Ongoing",
                description: "Get guidance from experienced Jain business leaders.",
                type: "Mentorship"
              }
            ].map((event, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 animate-slide-in hover:-translate-y-1 cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent mb-4">
                  {event.type}
                </span>
                <h3 className="text-lg font-semibold text-primary mb-2">{event.title}</h3>
                <p className="text-accent font-medium text-sm mb-2">{event.date}</p>
                <p className="text-gray-600 text-sm">{event.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Values Section */}
        <section className="mt-32 text-center">
          <div className="max-w-3xl mx-auto">
            <Building2 className="w-12 h-12 mx-auto text-accent mb-6" />
            <h2 className="text-3xl font-bold text-primary mb-6">Our Community Values</h2>
            <div className="grid md:grid-cols-2 gap-8 mt-12">
              {[
                { title: "Ahimsa (Non-violence)", description: "Promoting peaceful and ethical business practices" },
                { title: "Aparigraha (Non-possession)", description: "Encouraging sustainable and mindful growth" },
                { title: "Satya (Truthfulness)", description: "Fostering honest and transparent work relationships" },
                { title: "Seva (Service)", description: "Supporting community growth and development" }
              ].map((value, index) => (
                <div 
                  key={index}
                  className="p-6 rounded-lg bg-white shadow-sm hover:shadow-lg transition-all duration-300 animate-slide-in hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <h3 className="text-xl font-semibold text-primary mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Community Support Section */}
        <section className="mt-32 mb-16">
          <div className="bg-accent/10 rounded-2xl p-8 md:p-12 hover:bg-accent/20 transition-colors">
            <div className="max-w-3xl mx-auto text-center">
              <HandHeart className="w-12 h-12 mx-auto text-accent mb-6" />
              <h2 className="text-3xl font-bold text-primary mb-4">Support Our Community</h2>
              <p className="text-gray-600 mb-8">
                Help us create more opportunities for the Jain professional community through your generous contributions.
              </p>
              <Button asChild size="lg" className="bg-accent hover:bg-accent/90 group transition-all duration-300">
                <Link to="/donate" className="flex items-center gap-2">
                  <HandHeart className="group-hover:rotate-12 transition-transform" />
                  Make a Donation
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      {/* Job Details Dialog */}
      <Dialog open={showJobDialog} onOpenChange={setShowJobDialog}>
        <DialogContent className="sm:max-w-[500px]">
          {selectedJob && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedJob.title}</DialogTitle>
                <DialogDescription>
                  <p className="text-accent font-medium mt-2">{selectedJob.company}</p>
                  <p className="text-gray-500 text-sm">{selectedJob.location}</p>
                  <div className="mt-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/10 text-accent">
                      {selectedJob.industry}
                    </span>
                  </div>
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                <h4 className="font-semibold mb-2">Description</h4>
                <p className="text-gray-600 mb-4">{selectedJob.description}</p>
                
                <h4 className="font-semibold mb-2">Jain-Friendly Policies</h4>
                <ul className="list-disc list-inside text-gray-600 mb-4">
                  {selectedJob.jainFriendlyPolicies.map((policy, index) => (
                    <li key={index}>{policy}</li>
                  ))}
                </ul>

                <h4 className="font-semibold mb-2">Requirements</h4>
                <ul className="list-disc list-inside text-gray-600 mb-6">
                  {selectedJob.requirements.map((req, index) => (
                    <li key={index}>{req}</li>
                  ))}
                </ul>
                
                <div className="flex justify-end gap-4">
                  <Button variant="outline" onClick={() => setShowJobDialog(false)}>
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

export default Index;
