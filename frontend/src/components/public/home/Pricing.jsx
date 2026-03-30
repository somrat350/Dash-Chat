import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Check, ArrowRight, X } from "lucide-react";
import { Link } from "react-router";

const Pricing = () => {
  const sectionRef = useRef(null);
  const [showModal, setShowModal] = useState(false);
  const [modalPlan, setModalPlan] = useState(null);

  const plans = [
    {
      name: "Personal",
      price: "Free",
      description: "Perfect for individuals and small groups",
      features: [
        "Unlimited messages and calls",
        "1-on-1 and group chats",
        "Voice and video calling",
        "Message search and history",
        "Theme customization",
        "Mobile & desktop apps",
      ],
      cta: "Get Started",
      highlighted: false,
      isFree: true,
    },
    {
      name: "Professional",
      price: "$4.99",
      period: "/month",
      description: "For teams and power users",
      features: [
        "Everything in Personal",
        "Team admin controls",
        "Advanced privacy settings",
        "Message reactions & replies",
        "File storage (10GB)",
        "Priority support",
        "Custom team branding",
      ],
      cta: "Start Free Trial",
      highlighted: true,
      isFree: false,
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For large organizations",
      features: [
        "Everything in Professional",
        "Unlimited storage",
        "API access & webhooks",
        "Enterprise integrations",
        "Dedicated account manager",
        "Custom SLA & support",
        "On-premise deployment option",
      ],
      cta: "Contact Sales",
      highlighted: false,
      isFree: false,
    },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        "[data-pricing-header]",
        { opacity: 0, y: 26 },
        { opacity: 1, y: 0, duration: 0.65 },
      ).fromTo(
        "[data-pricing-card]",
        { opacity: 0, y: 34, scale: 0.97 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          stagger: 0.1,
        },
        "-=0.3",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handlePremiumClick = (planName) => {
    setModalPlan(planName);
    setShowModal(true);
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden rounded-3xl bg-base-100 py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="pointer-events-none absolute -left-16 top-10 h-56 w-56 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-12 bottom-0 h-56 w-56 rounded-full bg-info/15 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <div
          data-pricing-header
          className="mx-auto max-w-3xl text-center mb-12 opacity-0"
        >
          <span className="inline-flex items-center rounded-full border border-primary/30 bg-base-200 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            Transparent pricing
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-black text-primary">
            Plans for Everyone
          </h2>
          <p className="mt-3 text-sm md:text-base text-base-content/70">
            Start free and upgrade whenever you need advanced features. No
            hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7">
          {plans.map((plan) => (
            <article
              key={plan.name}
              data-pricing-card
              className={`relative rounded-2xl shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl opacity-0 ${
                plan.highlighted
                  ? "border-2 border-primary bg-base-100 ring-2 ring-primary/30 md:scale-105"
                  : "border border-base-300/70 bg-base-200/70"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-primary/50 bg-primary/20 px-4 py-1 text-xs font-bold text-primary">
                  Most Popular
                </div>
              )}

              {plan.isFree && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-info/50 bg-info/20 px-4 py-1 text-xs font-bold text-info">
                  Always Free
                </div>
              )}

              <div className="p-7">
                <h3 className="text-2xl font-bold text-base-content">
                  {plan.name}
                </h3>
                <p className="mt-2 text-sm text-base-content/70">
                  {plan.description}
                </p>

                <div className="mt-6">
                  <span className="text-4xl font-black text-base-content">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-base-content/60">{plan.period}</span>
                  )}
                </div>

                {plan.isFree ? (
                  <Link
                    to="/auth/register"
                    className="mt-6 btn btn-outline border-base-300 rounded-xl w-full"
                  >
                    {plan.cta}
                    <ArrowRight size={16} />
                  </Link>
                ) : (
                  <button
                    onClick={() => handlePremiumClick(plan.name)}
                    className={`mt-6 btn rounded-xl w-full ${
                      plan.highlighted ? "btn-primary" : "btn-outline"
                    }`}
                  >
                    {plan.cta}
                    <ArrowRight size={16} />
                  </button>
                )}

                <div className="mt-8 space-y-3 border-t border-base-300/50 pt-8">
                  {plan.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-3 text-sm text-base-content/80"
                    >
                      <Check
                        size={18}
                        className="shrink-0 text-primary mt-0.5"
                      />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-base-300 bg-base-200/60 px-5 py-4 text-center text-sm text-base-content/70">
          All plans include a 7-day free trial. No credit card required to get
          started.
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="relative rounded-3xl border border-base-300 bg-base-200 shadow-2xl max-w-md w-full animate-pulse">
            <button
              onClick={() => setShowModal(false)}
              className="absolute right-4 top-4 p-2 hover:bg-base-300 rounded-xl transition-colors"
            >
              <X size={20} />
            </button>

            <div className="p-8">
              <div className="h-12 w-12 rounded-full bg-primary/20 mx-auto flex items-center justify-center mb-4">
                <div className="h-6 w-6 rounded-full bg-primary animate-bounce" />
              </div>

              <h3 className="text-2xl font-black text-center text-base-content mb-2">
                Coming Soon
              </h3>

              <p className="text-center text-base-content/70 mb-4">
                {modalPlan} plan features are currently under development.
              </p>

              <p className="text-center text-sm text-base-content/60 mb-6">
                Our team is working hard to bring advanced features to
                Dash-Chat. We're committed to providing a premium experience
                when it launches.
              </p>

              <button
                onClick={() => setShowModal(false)}
                className="w-full btn btn-primary rounded-xl"
              >
                Got It
              </button>

              <p className="text-center text-xs text-base-content/50 mt-4">
                In the meantime, enjoy all features in the free plan!
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Pricing;
