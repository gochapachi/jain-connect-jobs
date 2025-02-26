
import { CommunityEvent } from "@/types/job";
import { Calendar } from "lucide-react";

const EVENTS: CommunityEvent[] = [
  {
    title: "Career Workshop",
    date: "March 15, 2024",
    description: "Join us for a special career development workshop during Paryushan.",
    type: "Workshop"
  },
  {
    title: "Networking Mixer",
    date: "March 20, 2024",
    description: "Connect with Jain professionals in your industry.",
    type: "Networking"
  },
  {
    title: "Mentorship Program",
    date: "Ongoing",
    description: "Get guidance from experienced Jain business leaders.",
    type: "Mentorship"
  }
];

export const CommunityEventsSection = () => {
  return (
    <section className="mt-32">
      <div className="text-center mb-12">
        <Calendar className="w-12 h-12 mx-auto text-accent mb-6" />
        <h2 className="text-3xl font-bold text-primary mb-4">Community Events</h2>
        <p className="text-gray-600 mb-8">Connect, learn, and grow with the Jain professional community</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {EVENTS.map((event, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 animate-slide-in hover:-translate-y-1 cursor-pointer"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent mb-4">
              {event.type}
            </span>
            <h3 className="text-lg font-semibold text-primary mb-2">{event.title}</h3>
            <p className="text-accent font-medium text-sm mb-2">{event.date}</p>
            <p className="text-gray-600 text-sm">{event.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
