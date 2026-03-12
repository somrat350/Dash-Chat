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
   <section className="py-20 mt-5 bg-base-100">
  <h1 className="text-3xl md:text-4xl text-primary font-bold text-center mb-10">
    Why Choose Us
  </h1>

  <div className="max-w-7xl mx-auto px-14 sm:px-5 md:px-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
    {features.map((feature, idx) => (
      <div
        key={idx}
        className=" relative group bg-base-200 rounded-2xl p-5 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col items-center text-center "
      >
       
          <div className="absolute inset-0 rounded-2xl border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>


        <div className="text-primary mb-4 transition-transform duration-300 group-hover:scale-110">{feature.icon}</div>
        <h3 className="text-xl font-semibold text-base-content mb-2">{feature.title}</h3>
        <p className="text-base-content/70 text-sm md:text-[14px]">
          {feature.desc}
        </p>
      </div>
    ))}
  </div>
</section>


  );
};

export default WhyChooseUs;
