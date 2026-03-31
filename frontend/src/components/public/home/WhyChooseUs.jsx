import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
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
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        "[data-why-header]",
        { opacity: 0, y: 28 },
        { opacity: 1, y: 0, duration: 0.65 },
      )
        .fromTo(
          "[data-why-card]",
          { opacity: 0, y: 34, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.1,
          },
          "-=0.3",
        )
        .fromTo(
          "[data-why-stat]",
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.42, stagger: 0.08 },
          "-=0.2",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative mt-6 overflow-hidden rounded-3xl bg-base-100 py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="pointer-events-none absolute -left-16 top-10 h-56 w-56 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-12 bottom-0 h-56 w-56 rounded-full bg-info/15 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <div
          data-why-header
          className="mx-auto mb-11 max-w-3xl text-center opacity-0"
        >
          <span className="inline-flex items-center rounded-full border border-primary/30 bg-base-200 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            Trust and performance
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl text-primary font-black">
            Why Choose Dash-Chat
          </h2>
          <p className="mt-3 text-sm md:text-base text-base-content/70 leading-relaxed">
            Built for privacy, speed, and effortless conversations so your team
            and friends stay connected without friction.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <article
              key={idx}
              data-why-card
              className="relative group rounded-2xl border border-base-300/70 bg-base-200/70 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl opacity-0"
            >
              <div className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-base-100 text-primary shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                {feature.icon}
              </div>

              <h3 className="text-lg font-bold text-base-content text-center mb-2">
                {feature.title}
              </h3>
              <p className="text-base-content/70 text-sm text-center leading-relaxed">
                {feature.desc}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div
            data-why-stat
            className="rounded-2xl border border-base-300 bg-base-100/80 px-5 py-4 text-center opacity-0"
          >
            <p className="text-3xl font-black text-base-content">99.9%</p>
            <p className="text-sm text-base-content/70">Service Uptime</p>
          </div>
          <div
            data-why-stat
            className="rounded-2xl border border-base-300 bg-base-100/80 px-5 py-4 text-center opacity-0"
          >
            <p className="text-3xl font-black text-base-content">Realtime</p>
            <p className="text-sm text-base-content/70">Message Delivery</p>
          </div>
          <div
            data-why-stat
            className="rounded-2xl border border-base-300 bg-base-100/80 px-5 py-4 text-center opacity-0"
          >
            <p className="text-3xl font-black text-base-content">24/7</p>
            <p className="text-sm text-base-content/70">Global Reach</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
