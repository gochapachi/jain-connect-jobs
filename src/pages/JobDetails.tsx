
import { useNavigate, useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { FEATURED_JOBS } from "@/components/home/JobListingSection";
import { ArrowLeft, Building2, MapPin, Calendar, CheckCircle2, Clock, GraduationCap, Briefcase, HandHeart } from "lucide-react";
import { Card } from "@/components/ui/card";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const job = FEATURED_JOBS.find(job => job.id === Number(id));

  if (!job) {
    return (
      <div className="min-h-screen bg-muted">
        <Header />
        <main className="container mx-auto px-4 pt-32 pb-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-primary">Job not found</h1>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => navigate('/jobs')}
            >
              Back to Jobs
            </Button>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted">
      <Header />
      <main className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="outline" 
            className="mb-6 gap-2"
            onClick={() => navigate('/jobs')}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Jobs
          </Button>

          {/* Job Header */}
          <div className="bg-white rounded-lg p-8 shadow-sm mb-8">
            <h1 className="text-3xl font-bold text-primary mb-4">{job.title}</h1>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-gray-600">
                <span className="flex items-center gap-2">
                  <Building2 className="w-5 h-5" />
                  {job.company}
                </span>
                <span className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  {job.location}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm">
                  {job.industry}
                </span>
                <span className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm">
                  Full-time
                </span>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2 space-y-8">
              {/* Description */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">About the Role</h2>
                <p className="text-gray-600 whitespace-pre-line">{job.description}</p>
              </Card>

              {/* Requirements */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Requirements</h2>
                <ul className="space-y-3">
                  {job.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-0.5" />
                      <span className="text-gray-600">{req}</span>
                    </li>
                  ))}
                </ul>
              </Card>

              {/* Jain-Specific Policies */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Jain-Friendly Workplace Policies</h2>
                <div className="grid gap-4">
                  {job.jainFriendlyPolicies.map((policy, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-accent mt-0.5" />
                      <div>
                        <p className="font-medium text-primary">{policy}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          {getJainPolicyDescription(policy)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Company Values */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Alignment with Jain Values</h2>
                <div className="grid gap-6">
                  <div className="flex items-start gap-3">
                    <HandHeart className="w-5 h-5 text-accent mt-1" />
                    <div>
                      <p className="font-medium text-primary">Ahimsa (Non-violence)</p>
                      <p className="text-gray-600 mt-1">
                        Our workplace promotes non-violence in all forms, including sustainable and ethical business practices.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <GraduationCap className="w-5 h-5 text-accent mt-1" />
                    <div>
                      <p className="font-medium text-primary">Continuous Learning</p>
                      <p className="text-gray-600 mt-1">
                        We support personal and professional growth while respecting Jain principles.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card className="p-6">
                <h3 className="font-semibold mb-4">Quick Info</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-accent" />
                    <div>
                      <p className="text-sm font-medium">Posted Date</p>
                      <p className="text-sm text-gray-600">March 15, 2024</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-accent" />
                    <div>
                      <p className="text-sm font-medium">Job Type</p>
                      <p className="text-sm text-gray-600">Full-time</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Briefcase className="w-5 h-5 text-accent" />
                    <div>
                      <p className="text-sm font-medium">Experience</p>
                      <p className="text-sm text-gray-600">3+ years</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <Button className="w-full bg-accent hover:bg-accent/90">
                  Apply Now
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

// Helper function to get detailed descriptions for Jain policies
const getJainPolicyDescription = (policy: string): string => {
  const descriptions: Record<string, string> = {
    "Vegetarian Workplace": "Our workplace is 100% vegetarian, with dedicated vegetarian dining facilities and catering for all company events.",
    "Meditation Room": "A dedicated quiet space for meditation and spiritual practices during breaks.",
    "Festival Holidays": "Flexible time off for important Jain festivals and religious observances.",
    "Flexible Hours": "Accommodating work hours that respect prayer times and religious practices.",
    "Community Service Days": "Paid time off for participating in Jain community service activities."
  };
  return descriptions[policy] || policy;
};

export default JobDetails;
