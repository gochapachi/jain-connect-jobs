
import { Button } from "@/components/ui/button";
import { Heart, Briefcase, Search, UserCircle } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export const Header = () => {
  const location = useLocation();
  const { user, signOut } = useAuth();
  
  return (
    <header className="w-full bg-white border-b border-gray-100 fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
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
              to="/search-candidates"
              className={`flex items-center space-x-2 text-sm font-medium ${
                location.pathname === "/search-candidates" ? "text-accent" : "text-primary hover:text-accent"
              } transition-colors`}
            >
              <Search className="w-4 h-4" />
              <span>Search Candidates</span>
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
            
            {user ? (
              <>
                {user && (
                  <Link 
                    to="/profile"
                    className={`flex items-center space-x-2 text-sm font-medium ${
                      location.pathname === "/profile" ? "text-accent" : "text-primary hover:text-accent"
                    } transition-colors`}
                  >
                    <UserCircle className="w-4 h-4" />
                    <span>Profile</span>
                  </Link>
                )}
                <Button asChild variant="default" className="bg-accent hover:bg-accent/90">
                  <Link to="/post-job">Post a Job</Link>
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => signOut()}
                >
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button asChild variant="outline">
                  <Link to="/signin">Sign In</Link>
                </Button>
                <Button asChild variant="default" className="bg-accent hover:bg-accent/90">
                  <Link to="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};
