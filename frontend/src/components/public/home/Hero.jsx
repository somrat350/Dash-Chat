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

      tl.from(".hero-badge", { y: 22, autoAlpha: 0, duration: 0.55 })
        .from(".hero-title", { y: 36, autoAlpha: 0, duration: 0.75 }, "-=0.15")
        .from(".hero-description", { y: 24, autoAlpha: 0, duration: 0.55 }, "-=0.35")
        .from(".hero-cta > *", { y: 16, autoAlpha: 0, duration: 0.45, stagger: 0.08 }, "-=0.3")
        .from(".hero-panel", { x: 28, autoAlpha: 0, duration: 0.65 }, "-=0.5");
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative w-full min-h-[500px] sm:h-[560px] md:h-[620px] lg:h-[720px] overflow-hidden rounded-2xl sm:rounded-3xl bg-[#05140f]"
    >
      {/* Background Image - Object Cover makes it responsive */}
      <div className="absolute inset-0">
        <img
          src={BannerImg}
          alt="DashChat Hero"
          className="w-full h-full object-cover block"
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#05140f] via-[#05140f]/80 to-transparent lg:to-[#153a2f]/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05140f] via-transparent to-transparent lg:hidden" />
      </div>

      {/* Content Container */}
      <div className="relative h-full flex items-center px-6 sm:px-10 lg:px-16 py-12">
        <div className="grid lg:grid-cols-2 gap-10 items-center w-full max-w-7xl mx-auto">
          
          {/* Text Content */}
          <div className="flex flex-col items-start text-left">
            <div className="hero-badge inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md">
              <ShieldCheck size={14} className="text-primary" /> End-to-end privacy first
            </div>

            <h1 className="hero-title mt-6 text-white font-black leading-[1.1] text-3xl xs:text-4xl sm:text-5xl lg:text-6xl xl:text-7xl">
              Chat that feels
              <span className="block text-primary">Fast, Private, Alive</span>
            </h1>

            <p className="hero-description mt-5 text-white/80 text-sm sm:text-base lg:text-lg max-w-xl leading-relaxed">
              Message, call, and stay close with your people. One clean inbox,
              realtime delivery, and secure conversations from mobile to desktop.
            </p>

            <div className="hero-cta mt-8 flex flex-wrap items-center gap-3 sm:gap-4">
              <Link
                to="/auth/register"
                className="btn btn-primary rounded-xl px-6 sm:px-8 h-12 text-white shadow-lg shadow-primary/20 border-0 normal-case"
              >
                Get Started <ArrowRight size={18} />
              </Link>

              <Link
                to="/auth/login"
                className="btn bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-xl h-12 px-6 text-white border-white/10 normal-case"
              >
                <MessageCircle size={18} /> Log In
              </Link>
            </div>
            
            <div className="mt-6 flex items-center gap-2 text-xs text-white/60">
              <PhoneCall size={14} /> Free voice and video calling available
            </div>
          </div>

          {/* Right Side Panel (Visible only on LG screens) */}
          <div className="hidden lg:flex justify-end">
            <div className="hero-panel w-full max-w-sm rounded-[2.5rem] border border-white/10 bg-white/5 backdrop-blur-2xl p-8 text-white shadow-2xl">
              <div className="flex items-center justify-between mb-6">
                <p className="text-xs uppercase tracking-widest text-primary font-bold">Live activity</p>
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              </div>
              
              <div className="space-y-4">
                {[
                  { label: "Message delivery", value: "Realtime sync" },
                  { label: "Security", value: "Private by design" },
                  { label: "Connected users", value: "Always online" }
                ].map((item, i) => (
                  <div key={i} className="rounded-2xl bg-white/5 p-4 border border-white/5 hover:bg-white/10 transition-colors">
                    <p className="text-[10px] uppercase text-white/50 mb-1">{item.label}</p>
                    <p className="text-lg font-medium">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Hero;