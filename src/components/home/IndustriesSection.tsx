
import { Industry } from "@/types/job";
import { Leaf, GraduationCap, HeartPulse, Building2 } from "lucide-react";

const INDUSTRIES: Industry[] = [
  { icon: <Leaf className="w-6 h-6" />, name: "Vegan/Vegetarian", description: "Food and lifestyle businesses" },
  { icon: <GraduationCap className="w-6 h-6" />, name: "Education", description: "Teaching and learning" },
  { icon: <HeartPulse className="w-6 h-6" />, name: "Healthcare", description: "Medical and wellness" },
  { icon: <Building2 className="w-6 h-6" />, name: "Ethical Business", description: "Sustainable enterprises" }
];

export const IndustriesSection = () => {
  return (
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
  );
};
