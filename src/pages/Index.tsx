
import { Header } from "@/components/Header";
import { useState } from "react";
import { HeroSection } from "@/components/home/HeroSection";
import { IndustriesSection } from "@/components/home/IndustriesSection";
import { JobListingSection } from "@/components/home/JobListingSection";
import { CommunityEventsSection } from "@/components/home/CommunityEventsSection";
import { ValuesSection } from "@/components/home/ValuesSection";
import { SupportSection } from "@/components/home/SupportSection";
import { JobDetailsDialog } from "@/components/home/JobDetailsDialog";
import { FeaturedJob } from "@/types/job";

const Index = () => {
  const [selectedJob, setSelectedJob] = useState<FeaturedJob | null>(null);
  const [showJobDialog, setShowJobDialog] = useState(false);

  const handleJobSelect = (job: FeaturedJob) => {
    setSelectedJob(job);
    setShowJobDialog(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted to-white">
      <Header />
      
      <main className="container mx-auto px-4 pt-32 pb-16 animate-fade-in">
        <HeroSection />
        <IndustriesSection />
        <JobListingSection onJobSelect={handleJobSelect} />
        <CommunityEventsSection />
        <ValuesSection />
        <SupportSection />
      </main>

      <JobDetailsDialog 
        job={selectedJob}
        open={showJobDialog}
        onOpenChange={setShowJobDialog}
      />
    </div>
  );
};

export default Index;
