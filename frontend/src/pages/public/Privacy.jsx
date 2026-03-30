import {
  ArrowRight,
  Lock,
  MessageCircle,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Privacy = () => {
  const pageRef = useRef(null);
  const securitySectionRef = useRef(null);
  const faqSectionRef = useRef(null);
  const featuresPanelRef = useRef(null);
  const faqPanelRef = useRef(null);
  const [showFeatureGuide, setShowFeatureGuide] = useState(false);
  const [showAllFaqs, setShowAllFaqs] = useState(false);

  const privacyPillars = [
    {
      title: "End-to-end encryption",
      desc: "Personal messages, calls, photos, and videos are protected with end-to-end encryption. Only you and your recipient can read or hear them.",
    },
    {
      title: "Additional layers of privacy",
      desc: "Beyond encryption, DashChat includes extra privacy controls to keep your conversations safer in day-to-day use.",
    },
    {
      title: "Control the privacy you need",
      desc: "You decide what to share, how you appear online, and who can contact you, with flexible account privacy settings.",
    },
  ];

  const trustStats = [
    { value: "1M+", label: "Active Users" },
    { value: "50M+", label: "Messages Daily" },
    { value: "50+", label: "Countries Connected" },
  ];

  const securityTips = [
    {
      title: "Enable Two-Step Verification",
      desc: "Add an extra protection layer to your account by turning on two-step verification from settings.",
    },
    {
      title: "Check Encryption",
      desc: "Always verify that chats are end-to-end encrypted so only intended participants can read messages.",
    },
    {
      title: "Be Careful with Links & Codes",
      desc: "Avoid suspicious links and never share OTP or verification codes with anyone.",
    },
  ];

  const faqs = [
    {
      question: "What is end-to-end encryption?",
      answer:
        "End-to-end encryption means only you and the intended recipient can read your messages. No third party, including DashChat, can access the message content.",
    },
    {
      question: "What is two-step verification?",
      answer:
        "Two-step verification adds a PIN to your account so unauthorized users cannot access it even if they have your SIM or OTP.",
    },
    {
      question: "Is DashChat private and secure?",
      answer:
        "Yes. DashChat combines encryption, account protection options, and privacy controls to keep communication secure.",
    },
    {
      question: "How to change your privacy settings on DashChat?",
      answer:
        "Go to Settings > Privacy to manage profile visibility, who can contact you, read receipts, and additional safety options.",
    },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray("[data-privacy-section]").forEach((section) => {
        const revealItems = section.querySelectorAll("[data-privacy-reveal]");
        const cards = section.querySelectorAll("[data-privacy-card]");
        const stats = section.querySelectorAll("[data-privacy-stat]");
        const faqsItems = section.querySelectorAll("[data-privacy-faq]");

        if (revealItems.length) {
          gsap.fromTo(
            revealItems,
            { opacity: 0, y: 34 },
            {
              opacity: 1,
              y: 0,
              duration: 0.72,
              stagger: 0.12,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 72%",
                once: true,
              },
            },
          );
        }

        if (cards.length) {
          gsap.fromTo(
            cards,
            { opacity: 0, y: 44, scale: 0.97 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.65,
              stagger: 0.14,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 70%",
                once: true,
              },
            },
          );
        }

        if (stats.length) {
          gsap.fromTo(
            stats,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.58,
              stagger: 0.1,
              ease: "power2.out",
              scrollTrigger: {
                trigger: section,
                start: "top 72%",
                once: true,
              },
            },
          );
        }

        if (faqsItems.length) {
          gsap.fromTo(
            faqsItems,
            { opacity: 0, x: -24 },
            {
              opacity: 1,
              x: 0,
              duration: 0.55,
              stagger: 0.09,
              ease: "power2.out",
              scrollTrigger: {
                trigger: section,
                start: "top 72%",
                once: true,
              },
            },
          );
        }
      });
    }, pageRef);

    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    if (showFeatureGuide && featuresPanelRef.current) {
      gsap.fromTo(
        featuresPanelRef.current,
        { opacity: 0, y: 20, scale: 0.98 },
        { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: "power2.out" },
      );
    }
  }, [showFeatureGuide]);

  useLayoutEffect(() => {
    if (showAllFaqs && faqPanelRef.current) {
      gsap.fromTo(
        faqPanelRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" },
      );
    }
  }, [showAllFaqs]);

  const handleExploreClick = () => {
    setShowFeatureGuide(true);
    securitySectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleSeeAllFaqs = () => {
    setShowAllFaqs((prev) => !prev);
    faqSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div ref={pageRef} className="bg-base-100 overflow-hidden">
      <section data-privacy-section className="relative py-16">
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl pointer-events-none"></div>
        <div className="absolute top-10 right-0 h-60 w-60 rounded-full bg-secondary/10 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <h1
                data-privacy-reveal
                className="text-4xl sm:text-5xl lg:text-7xl font-black text-base-content leading-tight"
              >
                Message <br />
                <span className="text-primary">Privately</span>
              </h1>

              <p
                data-privacy-reveal
                className="mt-6 text-lg sm:text-xl text-base-content/70 leading-relaxed max-w-2xl"
              >
                Your privacy is our priority. With end-to-end encryption, your
                messages, calls, and shared media stay only between you and the
                people you choose.
              </p>

              <button
                data-privacy-reveal
                onClick={handleExploreClick}
                className="relative overflow-hidden mt-8 flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-2xl group cursor-pointer"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <ShieldCheck size={20} /> Explore Privacy Features
                </span>
                <span className="absolute inset-0 bg-secondary -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out rounded-2xl"></span>
              </button>
            </div>

            <div data-privacy-reveal className="grid sm:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-base-200 to-base-300 rounded-3xl p-6 border border-base-300 shadow-xl min-h-44 flex flex-col justify-between">
                <Lock className="w-8 h-8 text-primary" />
                <div>
                  <h3 className="text-xl font-bold text-base-content">
                    Chat Lock
                  </h3>
                  <p className="text-sm text-base-content/70 mt-1">
                    Keep sensitive conversations hidden behind extra access
                    control.
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-br from-base-200 to-base-300 rounded-3xl p-6 border border-base-300 shadow-xl min-h-44 flex flex-col justify-between">
                <Sparkles className="w-8 h-8 text-secondary" />
                <div>
                  <h3 className="text-xl font-bold text-base-content">
                    Disappearing Messages
                  </h3>
                  <p className="text-sm text-base-content/70 mt-1">
                    Set messages to auto-delete for better conversation hygiene.
                  </p>
                </div>
              </div>

              <div className="sm:col-span-2 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-6 border border-base-300 shadow-lg">
                <h3 className="text-2xl font-bold text-base-content">
                  Built with Privacy at the Core
                </h3>
                <p className="text-base-content/70 mt-2 text-base">
                  We design every privacy feature to keep your communication
                  secure without making the app harder to use.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section data-privacy-section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10 text-center">
          <h2
            data-privacy-reveal
            className="text-3xl sm:text-4xl font-bold text-base-content leading-snug"
          >
            Whether it is serious conversations or everyday fun, privacy keeps
            your chats protected.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 mt-12 gap-6">
            {privacyPillars.map((item) => (
              <article
                key={item.title}
                data-privacy-card
                className="p-7 bg-base-200 rounded-2xl border border-transparent shadow-md hover:border-primary hover:shadow-xl hover:-translate-y-2 transition-all duration-300 text-left"
              >
                <h3 className="text-2xl font-bold text-primary mb-4">
                  {item.title}
                </h3>
                <p className="text-base-content/70 leading-relaxed">
                  {item.desc}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section data-privacy-section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2
                data-privacy-reveal
                className="text-4xl md:text-5xl text-base-content font-bold leading-tight mb-5"
              >
                Trusted by{" "}
                <span className="text-primary">Millions Worldwide</span>
              </h2>
              <p
                data-privacy-reveal
                className="text-base-content/70 text-lg leading-relaxed"
              >
                DashChat keeps conversations private, secure, and reliable.
                These numbers reflect the trust of our global community.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {trustStats.map((stat) => (
                <div
                  key={stat.label}
                  data-privacy-stat
                  className="p-5 bg-base-200 rounded-2xl shadow-md border border-transparent hover:border-primary transition-all duration-300 text-center"
                >
                  <h3 className="text-3xl sm:text-4xl font-black text-primary mb-1">
                    {stat.value}
                  </h3>
                  <p className="text-base-content/70 text-sm sm:text-base">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section ref={securitySectionRef} data-privacy-section className="py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-10">
          <h2
            data-privacy-reveal
            className="text-4xl md:text-5xl font-bold text-base-content mb-4"
          >
            Top <span className="text-primary">Security Tips</span>
          </h2>
          <p
            data-privacy-reveal
            className="text-base-content/70 text-lg mb-8 leading-relaxed"
          >
            Follow these recommended steps to keep your DashChat account safer.
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            {securityTips.map((tip) => (
              <article
                key={tip.title}
                data-privacy-card
                className="p-6 bg-base-200 rounded-2xl shadow-md border border-transparent hover:shadow-xl hover:border-primary transition-all duration-300 hover:-translate-y-2"
              >
                <h3 className="text-xl font-bold text-base-content mb-3">
                  {tip.title}
                </h3>
                <p className="text-base-content/70 leading-relaxed">
                  {tip.desc}
                </p>
              </article>
            ))}
          </div>

          {showFeatureGuide && (
            <div
              ref={featuresPanelRef}
              className="mt-8 rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/30"
            >
              <h3 className="text-2xl font-bold text-base-content mb-3">
                Privacy Features Overview
              </h3>
              <p className="text-base-content/70 leading-relaxed">
                DashChat privacy includes end-to-end encryption, two-step
                verification, account protection alerts, chat lock, and custom
                visibility controls. Start from Settings &gt; Privacy to
                configure everything in one place.
              </p>
            </div>
          )}
        </div>
      </section>

      <section ref={faqSectionRef} data-privacy-section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-10">
          <div data-privacy-reveal className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-base-content mb-4">
              Need more <span className="text-primary">help?</span>
            </h2>
            <p className="text-lg text-base-content/70">
              Answers to common privacy questions on DashChat.
            </p>
          </div>

          <div className="space-y-5">
            {faqs.map((item) => (
              <div
                key={item.question}
                data-privacy-faq
                className="p-7 bg-base-200 rounded-2xl shadow-md border border-transparent hover:shadow-lg hover:border-primary transition-all duration-300 cursor-pointer"
              >
                <h3 className="text-xl sm:text-2xl font-semibold text-base-content">
                  {item.question}
                </h3>
                {showAllFaqs && (
                  <p className="mt-3 text-base-content/70 leading-relaxed">
                    {item.answer}
                  </p>
                )}
              </div>
            ))}
          </div>

          {showAllFaqs && (
            <div
              ref={faqPanelRef}
              className="mt-7 rounded-2xl border border-base-300 bg-base-200 px-6 py-5"
            >
              <p className="text-base-content/70 leading-relaxed">
                For more help, visit DashChat Support or contact our security
                team at support@dashchat.com.
              </p>
            </div>
          )}

          <div data-privacy-reveal className="text-center mt-12">
            <button
              onClick={handleSeeAllFaqs}
              className="relative overflow-hidden px-6 py-3 rounded-2xl text-white bg-primary group cursor-pointer"
            >
              <span className="relative z-10 flex items-center gap-2 justify-center">
                <ArrowRight size={20} />
                {showAllFaqs ? "Hide FAQs" : "See all FAQs"}
              </span>
              <span className="absolute inset-0 bg-secondary -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out rounded-2xl"></span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Privacy;
