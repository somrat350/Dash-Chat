import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ArrowRight, Zap } from "lucide-react";
import { Link } from "react-router";

const CTABanner = () => {
  const sectionRef = useRef(null);
  const buttonRefs = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Header animations
      tl.fromTo(
        "[data-cta-content] h2",
        { opacity: 0, y: 32, rotateX: -10 },
        { opacity: 1, y: 0, rotateX: 0, duration: 0.75, perspective: 1200 },
      )
        .fromTo(
          "[data-cta-content] p",
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4",
        )
        // Button animations with stagger
        .fromTo(
          "[data-cta-button]",
          { opacity: 0, y: 20, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.55,
            stagger: 0.15,
          },
          "-=0.3",
        )
        // Footer text
        .fromTo(
          "[data-cta-footer]",
          { opacity: 0 },
          { opacity: 1, duration: 0.5 },
          "-=0.2",
        );

      // Glow animations - dual layer pulse
      gsap.to("[data-cta-glow]:first-of-type", {
        opacity: gsap.utils.unitize(0.8),
        duration: 3,
        repeat: -1,
        yoyo: true,
      });

      gsap.to("[data-cta-glow]:last-of-type", {
        opacity: gsap.utils.unitize(0.7),
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        delay: 0.5,
      });

      // Button hover effects
      buttonRefs.current.forEach((btn) => {
        if (!btn) return;

        btn.addEventListener("mouseenter", () => {
          gsap.to(btn, {
            scale: 1.05,
            duration: 0.3,
            overwrite: "auto",
          });
        });

        btn.addEventListener("mouseleave", () => {
          gsap.to(btn, {
            scale: 1,
            duration: 0.3,
            overwrite: "auto",
          });
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/30 via-info/20 to-primary/30 py-20 px-4 sm:px-6 lg:px-8"
    >
      {/* Animated glow elements */}
      <div
        data-cta-glow
        className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-primary/40 blur-3xl opacity-60"
      />
      <div
        data-cta-glow
        className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-info/40 blur-3xl opacity-60"
      />

      {/* Floating accent elements */}
      <div className="pointer-events-none absolute top-16 right-12 animate-float">
        <div className="h-3 w-3 rounded-full bg-primary/60" />
      </div>
      <div className="pointer-events-none absolute bottom-20 left-10 animate-float-delayed">
        <div className="h-2 w-2 rounded-full bg-info/50" />
      </div>

      <div className="relative mx-auto max-w-4xl">
        <div data-cta-content className="text-center">
          <h2 className="text-3xl md:text-5xl font-black text-base-content leading-tight">
            Ready to Transform <br />
            <span className="text-primary inline-flex items-center gap-2">
              <Zap size={32} className="animate-pulse" />
              Your Communication?
            </span>
          </h2>
          <p className="mt-4 text-lg text-base-content/80 max-w-2xl mx-auto leading-relaxed">
            Join thousands of teams and individuals using Dash-Chat for fast,
            secure, and enjoyable conversations. Start free today—no credit card
            required.
          </p>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            ref={(el) => (buttonRefs.current[0] = el)}
            to="/auth/register"
            data-cta-button
            className="btn btn-primary btn-lg rounded-2xl px-8 shadow-lg hover:shadow-primary/50 transition-shadow group"
          >
            <span className="group-hover:scale-110 transition-transform inline-block">
              ✨
            </span>
            Start Now (Free)
          </Link>
          <Link
            ref={(el) => (buttonRefs.current[1] = el)}
            to="/features"
            data-cta-button
            className="btn btn-outline btn-lg rounded-2xl px-8 hover:border-primary transition-colors group"
          >
            Explore Features
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </div>

        <p
          data-cta-footer
          className="mt-6 text-center text-sm text-base-content/70"
        >
          7-day free trial. Upgrade anytime. Cancel anytime.
        </p>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        @keyframes float-delayed {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(8px);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float-delayed 4s ease-in-out infinite;
          animation-delay: 1s;
        }
      `}</style>
    </section>
  );
};

export default CTABanner;
