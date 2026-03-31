import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { Link } from "react-router";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Phone,
  MessageCircle,
  Video,
  Settings,
  ChevronRight,
} from "lucide-react";
import { CHAT_FEATURES } from "../../../constants/chatFeaturesData";

gsap.registerPlugin(ScrollTrigger);

const featureIcons = {
  "voice-call": Phone,
  "live-chat": MessageCircle,
  "video-call": Video,
  settings: Settings,
};

const STATS = [
  { label: "Active Users", target: 240, suffix: "K+", decimals: 0 },
  { label: "Messages Daily", target: 3.6, suffix: "M+", decimals: 1 },
  { label: "Uptime Guarantee", target: 98.8, suffix: "%", decimals: 1 },
];

const formatStatValue = (value, stat) => {
  const safeValue = Math.max(1, value);

  if (stat.decimals > 0) {
    return `${safeValue.toFixed(stat.decimals)}${stat.suffix}`;
  }

  return `${Math.round(safeValue)}${stat.suffix}`;
};

const ChatFeatures = () => {
  const sectionRef = useRef(null);
  const statNumberRefs = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 72%",
          toggleActions: "play none none none",
          once: true,
        },
      });

      tl.fromTo(
        "[data-feature-header]",
        { autoAlpha: 0, y: 28 },
        { autoAlpha: 1, y: 0, duration: 0.7 },
      )
        .fromTo(
          "[data-feature-card]",
          { autoAlpha: 0, y: 48, scale: 0.96 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.55,
            stagger: 0.12,
          },
          "-=0.35",
        )
        .fromTo(
          "[data-feature-stat]",
          { autoAlpha: 0, y: 20 },
          { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.08 },
          "-=0.2",
        )
        .add(() => {
          STATS.forEach((stat, index) => {
            const el = statNumberRefs.current[index];
            if (!el) return;

            const counter = { value: 1 };
            gsap.to(counter, {
              value: stat.target,
              duration: 1.25,
              ease: "power2.out",
              delay: index * 0.1,
              onUpdate: () => {
                el.textContent = formatStatValue(counter.value, stat);
              },
              onComplete: () => {
                el.textContent = formatStatValue(stat.target, stat);
              },
            });
          });
        });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="pointer-events-none absolute -top-20 -left-16 h-52 w-52 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-16 -right-16 h-56 w-56 rounded-full bg-info/20 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <div data-feature-header className="text-center mt-4 mb-10">
          <span className="inline-flex items-center rounded-full border border-primary/30 bg-base-100/70 px-4 py-1 text-xs font-semibold tracking-[0.18em] text-primary uppercase">
            Everything you need
          </span>
          <h2 className="mt-4 text-4xl md:text-5xl font-bold text-primary mb-3">
            Chat Features
          </h2>
          <p className="mx-auto max-w-2xl text-sm md:text-base text-base-content/70">
            Call, chat, and stay in control with a fast, clean communication
            experience built for everyday conversations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {CHAT_FEATURES.map((feature) => {
            const FeatureIcon = featureIcons[feature.slug] || MessageCircle;

            return (
              <div
                key={feature.name}
                data-feature-card
                className="group relative overflow-hidden rounded-2xl border border-base-300/70 bg-base-200/70 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="relative p-8 flex flex-col items-center text-center">
                  <div className="absolute top-4 right-4">
                    <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-100 group-hover:bg-white transition-colors duration-300">
                      <FeatureIcon className="w-6 h-6 text-primary" />
                    </span>
                  </div>

                  <div className="relative mb-6">
                    <div
                      className={`w-28 h-28 rounded-2xl bg-linear-to-br ${feature.color} bg-opacity-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
                    >
                      <div className="w-20 h-20 sm:w-24 sm:h-24 bg-base-100 rounded-xl shadow-sm hover:shadow-md flex items-center justify-center overflow-hidden transition-shadow duration-300">
                        <img
                          src={feature.img}
                          alt={feature.name}
                          className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = `https://via.placeholder.com/64x64?text=${feature.name}`;
                          }}
                        />
                      </div>
                    </div>

                    <div
                      className={`absolute -bottom-2 -right-2 w-6 h-6 rounded-full bg-linear-to-br ${feature.color} border-4 border-white`}
                    />
                  </div>

                  <h3 className="text-xl font-bold text-base-content mb-2">
                    {feature.name}
                  </h3>

                  <p className="text-sm text-base-content/70 mb-4">
                    {feature.description}
                  </p>

                  <Link
                    to={`/features/${feature.slug}`}
                    className="inline-flex items-center text-sm font-medium text-base-content duration-300 hover:text-primary"
                  >
                    <span>Learn more</span>
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                  </Link>
                </div>

                <div className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </div>
            );
          })}
        </div>

        <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {STATS.map((stat, index) => (
            <div
              key={stat.label}
              data-feature-stat
              className="rounded-2xl border border-base-300 bg-base-100/70 p-6 text-center"
            >
              <div
                ref={(el) => {
                  statNumberRefs.current[index] = el;
                }}
                className="text-4xl font-bold text-base-content mb-2"
              >
                {formatStatValue(1, stat)}
              </div>
              <div className="text-base-content/70">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ChatFeatures;
