import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Bell, MessageSquare, Smile, UserPlus } from "lucide-react";

const HowItWorks = () => {
  const sectionRef = useRef(null);

  const steps = [
    {
      id: "01",
      title: "Create Account",
      description: "Sign up easily with your email and set up your profile.",
      icon: <UserPlus className="w-8 h-8 text-blue-600" />,
    },
    {
      id: "02",
      title: "Start Chatting",
      description: "Connect with friends and send messages instantly.",
      icon: <MessageSquare className="w-8 h-8 text-green-600" />,
    },
    {
      id: "03",
      title: "Enjoy Features",
      description: "Use voice, video calls and customize your settings.",
      icon: <Smile className="w-8 h-8 text-purple-600" />,
    },

    {
      id: "04",
      title: "Stay Connected",
      description:
        "Receive notifications and stay in touch with your community.",
      icon: <Bell className="w-8 h-8 text-red-600" />,
    },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        "[data-hiw-header]",
        { opacity: 0, y: 26 },
        { opacity: 1, y: 0, duration: 0.65 },
      ).fromTo(
        "[data-hiw-step]",
        { opacity: 0, y: 34, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.52,
          stagger: 0.1,
        },
        "-=0.3",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden rounded-3xl bg-base-100 py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="pointer-events-none absolute -left-16 top-8 h-56 w-56 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-12 bottom-0 h-56 w-56 rounded-full bg-info/15 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <div
          data-hiw-header
          className="mx-auto max-w-3xl text-center opacity-0"
        >
          <span className="inline-flex items-center rounded-full border border-primary/30 bg-base-200 px-4 py-1 text-xs font-semibold tracking-[0.16em] uppercase text-primary">
            Onboarding flow
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl text-primary font-black">
            How It Works
          </h2>
          <p className="mt-3 text-sm md:text-base text-base-content/70 leading-relaxed">
            Start fast with a simple 4-step path, from account setup to daily
            conversations and realtime updates.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {steps.map((step) => (
            <article
              key={step.id}
              data-hiw-step
              className="group relative rounded-2xl border border-base-300/70 bg-base-200/70 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl opacity-0"
            >
              <div className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="flex items-center justify-between">
                <span className="text-xs font-bold tracking-[0.16em] text-base-content/45">
                  STEP {step.id}
                </span>
                <div className="h-px w-14 bg-base-300" />
              </div>

              <div className="mt-5 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-base-100 shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3">
                {step.icon}
              </div>

              <h3 className="mt-5 text-xl font-bold text-base-content">
                {step.title}
              </h3>

              <p className="mt-3 text-sm text-base-content/70 leading-relaxed">
                {step.description}
              </p>

              <div className="mt-5 h-1.5 w-full overflow-hidden rounded-full bg-base-300/70">
                <div className="h-full w-0 rounded-full bg-primary transition-all duration-500 group-hover:w-full" />
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-base-300 bg-base-200/60 px-4 py-3 text-center text-sm text-base-content/70">
          Pro tip: You can begin with text chat first, then switch to voice or
          video when conversations need more context.
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
