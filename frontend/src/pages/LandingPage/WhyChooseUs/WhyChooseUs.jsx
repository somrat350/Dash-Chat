import React from "react";
import { ShieldCheck, Clock, Users, Star } from "lucide-react";

const features = [
  {
    icon: <ShieldCheck size={32} />,
    title: "Secure Messaging",
    desc: "All your messages are end-to-end encrypted, keeping your conversations private.",
  },
  {
    icon: <Clock size={32} />,
    title: "Fast & Reliable",
    desc: "Experience lightning-fast messaging and calling without interruptions.",
  },
  {
    icon: <Users size={32} />,
    title: "Global Connectivity",
    desc: "Connect with friends and family across the globe instantly and reliably.",
  },
  {
    icon: <Star size={32} />,
    title: "User-Friendly Interface",
    desc: "Easy to use, clean interface designed for seamless messaging experience.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-14 mt-5 bg-gray-50">
      <h1 className="text-3xl md:text-4xl font-bold text-center mb-10">
        Why Choose Us
      </h1>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map((feature, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center"
          >
            <div className="text-green-500 mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-500 text-sm md:text-[14px]">{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
