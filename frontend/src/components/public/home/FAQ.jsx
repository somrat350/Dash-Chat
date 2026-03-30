import { useLayoutEffect, useState, useRef } from "react";
import gsap from "gsap";
import { ChevronDown } from "lucide-react";

const FAQ = () => {
  const sectionRef = useRef(null);
  const [expanded, setExpanded] = useState(0);

  const faqs = [
    {
      id: 0,
      q: "Is Dash-Chat secure and encrypted?",
      a: "Yes, all messages are end-to-end encrypted. Only you and the recipient can read conversations. We never store unencrypted message content on our servers.",
    },
    {
      id: 1,
      q: "Can I use Dash-Chat on multiple devices?",
      a: "Absolutely! Sync across mobile, tablet, and desktop. Your messages, calls, and settings stay in perfect sync in realtime across all devices.",
    },
    {
      id: 2,
      q: "How do I set up voice and video calls?",
      a: "It's one tap! Go to any contact, tap the call icon (audio or video), and the call begins instantly. No extra setup needed. Calls work over WiFi or mobile data.",
    },
    {
      id: 3,
      q: "Is there a free plan?",
      a: "Yes! Dash-Chat is free for individuals. Unlimited messages, calls, and storage. Premium plans add advanced team features like admin controls and priority support.",
    },
    {
      id: 4,
      q: "How reliable is the message delivery?",
      a: "We guarantee 99.9% uptime and realtime delivery. Messages sync in milliseconds thanks to our distributed infrastructure. Read receipts show exact delivery status.",
    },
    {
      id: 5,
      q: "Can I export my chat history?",
      a: "Yes. Your chats are fully under your control. You can download, backup, or export conversations anytime from Settings > Privacy > Data Export.",
    },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        "[data-faq-header]",
        { opacity: 0, y: 26 },
        { opacity: 1, y: 0, duration: 0.65 },
      ).fromTo(
        "[data-faq-item]",
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.45,
          stagger: 0.07,
        },
        "-=0.3",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleFAQ = (id) => {
    setExpanded(expanded === id ? -1 : id);
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden rounded-3xl bg-base-100 py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="pointer-events-none absolute -left-16 top-10 h-56 w-56 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-12 bottom-0 h-56 w-56 rounded-full bg-info/15 blur-3xl" />

      <div className="relative mx-auto max-w-3xl">
        <div data-faq-header className="text-center mb-10 opacity-0">
          <span className="inline-flex items-center rounded-full border border-primary/30 bg-base-200 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            Quick answers
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-black text-primary">
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-sm md:text-base text-base-content/70">
            Find answers to common questions about Dash-Chat features, security,
            and account management.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <article
              key={faq.id}
              data-faq-item
              className="opacity-0 rounded-2xl border border-base-300/70 bg-base-200/70 backdrop-blur-sm shadow-md transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full px-6 py-4 flex items-center justify-between gap-4 hover:bg-base-300/30 transition-colors rounded-2xl group"
              >
                <h3 className="text-left text-base font-bold text-base-content group-hover:text-primary transition-colors">
                  {faq.q}
                </h3>
                <ChevronDown
                  size={20}
                  className={`shrink-0 text-primary transition-transform duration-300 ${
                    expanded === faq.id ? "rotate-180" : ""
                  }`}
                />
              </button>

              {expanded === faq.id && (
                <div className="px-6 pb-4 border-t border-base-300/50 opacity-90">
                  <p className="text-sm text-base-content/75 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
