
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-muted to-white">
      <Header />
      
      <main className="container mx-auto px-4 pt-32 pb-16 animate-fade-in">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-6 leading-tight">
            Connect with Opportunities in the Jain Community
          </h1>
          
          <p className="text-lg text-gray-600 mb-8">
            Find meaningful work opportunities or share job openings with our community. Together, we can create positive impact.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 w-full sm:w-auto">
              <Link to="/jobs">Browse Jobs</Link>
            </Button>
            
            <Button asChild size="lg" variant="outline" className="w-full sm:w-auto">
              <Link to="/post-job">Post a Job</Link>
            </Button>
          </div>
        </div>
        
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Find Opportunities",
              description: "Browse through job listings posted by members of the Jain community.",
            },
            {
              title: "Post Jobs",
              description: "Share job opportunities with qualified candidates from our community.",
            },
            {
              title: "Support the Community",
              description: "Contribute to our initiatives through donations and create positive impact.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 animate-slide-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h3 className="text-xl font-semibold text-primary mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Index;
