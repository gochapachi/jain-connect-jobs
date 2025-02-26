
import { CommunityValue } from "@/types/job";
import { Building2 } from "lucide-react";

const VALUES: CommunityValue[] = [
  { title: "Ahimsa (Non-violence)", description: "Promoting peaceful and ethical business practices" },
  { title: "Aparigraha (Non-possession)", description: "Encouraging sustainable and mindful growth" },
  { title: "Satya (Truthfulness)", description: "Fostering honest and transparent work relationships" },
  { title: "Seva (Service)", description: "Supporting community growth and development" }
];

export const ValuesSection = () => {
  return (
    <section className="mt-32 text-center">
      <div className="max-w-3xl mx-auto">
        <Building2 className="w-12 h-12 mx-auto text-accent mb-6" />
        <h2 className="text-3xl font-bold text-primary mb-6">Our Community Values</h2>
        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {VALUES.map((value, index) => (
            <div 
              key={index}
              className="p-6 rounded-lg bg-white shadow-sm hover:shadow-lg transition-all duration-300 animate-slide-in hover:-translate-y-1"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <h3 className="text-xl font-semibold text-primary mb-3">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
