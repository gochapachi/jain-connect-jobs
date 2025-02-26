
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Briefcase, Sparkles, ArrowDown } from "lucide-react";

export const HeroSection = () => {
  return (
    <>
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

      <div className="flex justify-center mt-16 animate-bounce">
        <ArrowDown className="text-accent w-8 h-8" />
      </div>
    </>
  );
};
