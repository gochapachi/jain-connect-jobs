
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const PostJob = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    type: "",
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Job Posted Successfully",
      description: "Your job listing has been submitted and will be reviewed shortly.",
    });
    setFormData({
      title: "",
      company: "",
      location: "",
      type: "",
      description: "",
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-muted">
      <Header />
      
      <main className="container mx-auto px-4 pt-32 pb-16">
        <div className="max-w-2xl mx-auto">
          <Card className="p-6 animate-fade-in">
            <h2 className="text-2xl font-semibold text-primary mb-6">Post a New Job</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700" htmlFor="title">
                    Job Title
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
                    Company
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
                    Location
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
                    Job Type
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
                  <label className="text-sm font-medium text-gray-700" htmlFor="description">
                    Job Description
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
              </div>
              
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
