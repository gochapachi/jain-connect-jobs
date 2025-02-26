import { useNavigate, useParams } from "react-router-dom";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { FEATURED_JOBS } from "@/components/home/JobListingSection";
import { 
  ArrowLeft, Building2, MapPin, Calendar, CheckCircle2, Clock, 
  GraduationCap, Briefcase, HandHeart, Globe, Users, Star,
  Mail, Phone, BookOpen, Trophy, Heart
} from "lucide-react";
import { Card } from "@/components/ui/card";

const JobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const job = {
    ...FEATURED_JOBS.find(job => job.id === Number(id)),
    companyProfile: {
      founded: "2010",
      size: "1000-5000 employees",
      website: "www.company.com",
      about: "A leading technology company committed to sustainable practices and ethical business conduct. We embrace Jain principles in our workplace culture.",
      benefits: [
        "Comprehensive health insurance",
        "Professional development budget",
        "Flexible work arrangements",
        "Meditation and wellness programs",
        "Annual spiritual retreat allowance"
      ],
      culture: "Our workplace culture is built on the principles of non-violence, truth, and respect for all living beings.",
      values: [
        "Ethical Business Practices",
        "Environmental Sustainability",
        "Inclusive Workplace",
        "Continuous Learning"
      ]
    },
    hrContact: {
      name: "Priya Jain",
      position: "Senior HR Manager",
      email: "careers@company.com",
      phone: "+91 98765 43210"
    },
    reviews: {
      rating: 4.5,
      total: 128,
      highlights: [
        {
          aspect: "Work-Life Balance",
          score: 4.8,
          description: "Excellent respect for personal and spiritual time"
        },
        {
          aspect: "Culture & Values",
          score: 4.7,
          description: "Strong alignment with Jain principles"
        },
        {
          aspect: "Career Growth",
          score: 4.4,
          description: "Good opportunities for advancement"
        }
      ],
      testimonials: [
        {
          rating: 5,
          comment: "The company truly respects and accommodates Jain practices. The vegetarian cafeteria and meditation rooms are great additions.",
          author: "Amit Shah",
          position: "Senior Developer",
          date: "February 2024"
        },
        {
          rating: 4,
          comment: "Great work environment with strong ethical values. The company actively supports community service initiatives.",
          author: "Meera Mehta",
          position: "Project Manager",
          date: "January 2024"
        }
      ]
    }
  };

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
              {/* Company Profile */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">About {job.company}</h2>
                <div className="space-y-4">
                  <p className="text-gray-600">{job.companyProfile?.about}</p>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>Founded: {job.companyProfile?.founded}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-400" />
                      <span>Size: {job.companyProfile?.size}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-gray-400" />
                      <a href={`https://${job.companyProfile?.website}`} className="text-accent hover:underline">
                        {job.companyProfile?.website}
                      </a>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Description and Requirements */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">About the Role</h2>
                <p className="text-gray-600 whitespace-pre-line">{job.description}</p>
              </Card>

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

              {/* Company Culture & Values */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Company Culture & Values</h2>
                <div className="space-y-6">
                  <p className="text-gray-600">{job.companyProfile?.culture}</p>
                  <div className="grid gap-4">
                    {job.companyProfile?.values.map((value, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <Trophy className="w-5 h-5 text-accent" />
                        <span className="text-gray-700">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Benefits */}
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Benefits & Perks</h2>
                <div className="grid gap-4">
                  {job.companyProfile?.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <Heart className="w-5 h-5 text-accent mt-0.5" />
                      <span className="text-gray-600">{benefit}</span>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Employee Reviews */}
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Employee Reviews</h2>
                  <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-400 fill-current" />
                    <span className="font-semibold">{job.reviews?.rating}</span>
                    <span className="text-gray-500">({job.reviews?.total} reviews)</span>
                  </div>
                </div>

                {/* Review Highlights */}
                <div className="grid gap-6 mb-8">
                  {job.reviews?.highlights.map((highlight, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-medium">{highlight.aspect}</span>
                        <span className="text-accent">{highlight.score}/5</span>
                      </div>
                      <p className="text-sm text-gray-600">{highlight.description}</p>
                    </div>
                  ))}
                </div>

                {/* Testimonials */}
                <div className="space-y-6">
                  <h3 className="font-semibold">Recent Reviews</h3>
                  {job.reviews?.testimonials.map((testimonial, index) => (
                    <div key={index} className="border-t pt-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">by {testimonial.author}</span>
                      </div>
                      <p className="text-gray-600 mb-2">{testimonial.comment}</p>
                      <div className="text-sm text-gray-500">
                        {testimonial.position} • {testimonial.date}
                      </div>
                    </div>
                  ))}
                </div>
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
              {/* Quick Info */}
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

              {/* HR Contact */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4">HR Contact</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <BookOpen className="w-5 h-5 text-accent" />
                    <div>
                      <p className="text-sm font-medium">{job.hrContact?.name}</p>
                      <p className="text-sm text-gray-600">{job.hrContact?.position}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-accent" />
                    <div>
                      <p className="text-sm text-gray-600">{job.hrContact?.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-accent" />
                    <div>
                      <p className="text-sm text-gray-600">{job.hrContact?.phone}</p>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Apply Button */}
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
