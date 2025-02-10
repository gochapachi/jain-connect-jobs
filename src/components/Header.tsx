
import { Button } from "@/components/ui/button";
import { Heart, Briefcase } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const Header = () => {
  const location = useLocation();
  
  return (
    <header className="w-full bg-white border-b border-gray-100 fixed top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <Link to="/" className="text-xl font-semibold text-primary hover:opacity-80 transition-opacity">
            JainConnect Jobs
          </Link>
          
          <div className="flex items-center space-x-6">
            <Link 
              to="/jobs"
              className={`flex items-center space-x-2 text-sm font-medium ${
                location.pathname === "/jobs" ? "text-accent" : "text-primary hover:text-accent"
              } transition-colors`}
            >
              <Briefcase className="w-4 h-4" />
              <span>Jobs</span>
            </Link>
            
            <Link 
              to="/donate"
              className={`flex items-center space-x-2 text-sm font-medium ${
                location.pathname === "/donate" ? "text-accent" : "text-primary hover:text-accent"
              } transition-colors`}
            >
              <Heart className="w-4 h-4" />
              <span>Donate</span>
            </Link>
            
            <Button asChild variant="default" className="bg-accent hover:bg-accent/90">
              <Link to="/post-job">Post a Job</Link>
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};
