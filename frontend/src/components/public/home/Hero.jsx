import BannerImg from "../../../assets/Hero-image.jpg";
import {
  ArrowRight,
  MessageCircle,
  PhoneCall,
  ShieldCheck,
} from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router";
import gsap from "gsap";

const Hero = () => {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.from(".hero-badge", {
        y: 22,
        autoAlpha: 0,
        duration: 0.55,
      })
        .from(
          ".hero-title",
          {
            y: 36,
            autoAlpha: 0,
            duration: 0.75,
          },
          "-=0.15",
        )
        .from(
          ".hero-description",
          {
            y: 24,
            autoAlpha: 0,
            duration: 0.55,
          },
          "-=0.35",
        )
        .from(
          ".hero-cta > *",
          {
            y: 16,
            autoAlpha: 0,
            duration: 0.45,
            stagger: 0.08,
          },
          "-=0.3",
        )
        .from(
          ".hero-panel",
          {
            x: 28,
            autoAlpha: 0,
            duration: 0.65,
          },
          "-=0.5",
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative w-full overflow-hidden rounded-3xl"
    >
      <img
        src={BannerImg}
        alt="DashChat Hero"
        className="w-full h-[560px] sm:h-[620px] lg:h-[680px] object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-[#05140f]/90 via-[#0f2f24]/78 to-[#153a2f]/45" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_20%,rgba(255,255,255,0.2),transparent_40%)]" />

      <div className="absolute inset-0 px-4 sm:px-8 lg:px-12 py-8 sm:py-10 flex items-center">
        <div className="w-full grid lg:grid-cols-[1.12fr_0.88fr] gap-6 lg:gap-10 items-end">
          <div className="max-w-2xl mx-auto lg:mx-0 text-center sm:text-left">
            <div className="hero-badge inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-3 py-1.5 text-[11px] sm:text-xs font-semibold uppercase tracking-[0.14em] text-white/90 backdrop-blur-sm">
              <ShieldCheck size={14} /> End-to-end privacy first
            </div>

            <h1 className="hero-title mt-4 text-white font-extrabold leading-[1.04] text-4xl sm:text-5xl lg:text-6xl xl:text-7xl max-w-3xl">
              Chat that feels
              <span className="block text-primary">fast, private, alive</span>
            </h1>

            <p className="hero-description mt-4 sm:mt-5 text-white/90 text-sm sm:text-base lg:text-lg max-w-2xl leading-relaxed">
              Message, call, and stay close with your people. One clean inbox,
              realtime delivery, and secure conversations from mobile to
              desktop.
            </p>

            <div className="hero-cta mt-7 sm:mt-8 flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4">
              <Link
                to="/auth/register"
                className="btn btn-primary rounded-2xl px-6 sm:px-7 h-12 text-white shadow-lg shadow-primary/35 border-0"
              >
                <ArrowRight size={18} /> Get Started
              </Link>

              <Link
                to="/auth/login"
                className="btn rounded-2xl h-12 px-6 bg-white text-secondary border-0 hover:bg-secondary hover:text-white"
              >
                <MessageCircle size={18} /> Log In
              </Link>

              <div className="hidden sm:flex items-center gap-2 text-xs text-white/80">
                <PhoneCall size={14} /> Free voice and video calling
              </div>
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="hero-panel ml-auto max-w-sm rounded-3xl border border-white/20 bg-white/10 backdrop-blur-xl p-5 text-white shadow-2xl">
              <p className="text-xs uppercase tracking-[0.2em] text-white/70">
                Live activity
              </p>
              <div className="mt-4 space-y-3">
                <div className="rounded-2xl bg-black/25 px-4 py-3 border border-white/10">
                  <p className="text-xs text-white/70">Message delivery</p>
                  <p className="text-lg font-semibold">Realtime sync</p>
                </div>
                <div className="rounded-2xl bg-black/25 px-4 py-3 border border-white/10">
                  <p className="text-xs text-white/70">Security</p>
                  <p className="text-lg font-semibold">Private by design</p>
                </div>
                <div className="rounded-2xl bg-black/25 px-4 py-3 border border-white/10">
                  <p className="text-xs text-white/70">Connected users</p>
                  <p className="text-lg font-semibold">Always online</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
