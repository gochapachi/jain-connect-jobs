
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { HandHeart } from "lucide-react";

export const SupportSection = () => {
  return (
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
  );
};
