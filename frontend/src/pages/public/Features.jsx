import React, { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroBG from "../../assets/hero2.png";
import { Link } from "react-router";
import {
  ArrowRight,
  AtSign,
  CheckCheck,
  Database,
  Edit3,
  Eraser,
  MessageSquare,
  Mic,
  MonitorUp,
  Pin,
  Search,
  User,
  Video,
} from "lucide-react";

const Features = () => {
  const heroRef = useRef(null);
  const section2Ref = useRef(null);
  const section3Ref = useRef(null);
  const section4Ref = useRef(null);
  const section5Ref = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      // Hero section animations
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTl
        .fromTo(
          "[data-hero-title]",
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.8 },
        )
        .fromTo(
          "[data-hero-desc]",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.4",
        )
        .fromTo(
          "[data-hero-btn]",
          { opacity: 0, y: 20, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.15 },
          "-=0.3",
        );

      // Section 2 - Team collaboration
      const section2Timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section2Ref.current,
          start: "top 60%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      section2Timeline
        .fromTo(
          "[data-team-badge]",
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 0.5 },
        )
        .fromTo(
          "[data-team-title]",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.2",
        )
        .fromTo(
          "[data-team-desc]",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.3",
        )
        .fromTo(
          "[data-team-img]",
          { opacity: 0, scale: 0.9, rotateX: -10 },
          { opacity: 1, scale: 1, rotateX: 0, duration: 0.7 },
          "-=0.4",
        )
        .fromTo(
          "[data-team-btn]",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
          "-=0.3",
        );

      // Section 3 - Communication cards
      const section3Timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section3Ref.current,
          start: "top 60%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      section3Timeline
        .fromTo(
          "[data-comm-header]",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6 },
        )
        .fromTo(
          "[data-comm-card]",
          { opacity: 0, y: 30, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.12 },
          "-=0.2",
        );

      // Section 4 - Engage cards
      const section4Timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section4Ref.current,
          start: "top 60%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      section4Timeline
        .fromTo(
          "[data-engage-header]",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6 },
        )
        .fromTo(
          "[data-engage-card]",
          { opacity: 0, y: 25, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1 },
          "-=0.2",
        );

      // Section 5 - Experience cards
      const section5Timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section5Ref.current,
          start: "top 60%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      section5Timeline
        .fromTo(
          "[data-exp-header]",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6 },
        )
        .fromTo(
          "[data-exp-card]",
          { opacity: 0, y: 25, scale: 0.92 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1 },
          "-=0.2",
        );
    }, []);

    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-base-100 min-h-screen">
      {/* section 1 hero */}
      <section
        ref={heroRef}
        className="relative h-150 md:h-175 flex items-center overflow-hidden"
      >
        <div className="absolute inset-0 z-0 rounded-3xl overflow-hidden shadow-2xl">
          <img
            src={heroBG}
            className="w-full h-full object-cover"
            alt="Hero Background"
          />

          <div className="absolute inset-0 bg-linear-to-r from-black/80 to-black/40"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-16 w-full">
          <div className="max-w-2xl">
            <h1
              data-hero-title
              className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight"
            >
              Connect your team <br />
              <span className="text-primary">faster than ever</span>
            </h1>
            <p
              data-hero-desc
              className="text-xl md:text-2xl text-gray-200 mb-10 leading-relaxed"
            >
              Desh Chat brings all your communication into one place. Work from
              anywhere with the world's most flexible messaging platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                data-hero-btn
                to="/about"
                className="relative isolate overflow-hidden px-6 py-3 rounded-2xl text-white bg-primary group cursor-pointer"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <ArrowRight size={20} /> Get Started for Free
                </span>
                <span className="absolute inset-0 bg-secondary -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out rounded-2xl"></span>
              </Link>

              <Link
                data-hero-btn
                to="/about"
                className="relative isolate overflow-hidden px-6 py-3 rounded-2xl text-black bg-white group cursor-pointer border border-gray-100 shadow-sm"
              >
                <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-white font-bold">
                  <ArrowRight size={20} /> Watch Demo
                </span>
                <span className="absolute inset-0 bg-secondary -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out -z-10"></span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* section 2 taem */}
      <section ref={section2Ref} className="py-24 bg-base-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            {/* image */}
            <div className="order-2 md:order-1 relative group">
              {/*  background glow */}
              <div className="absolute -inset-10  rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>

              <img
                data-team-img
                src="https://i.ibb.co.com/ShcZKkm/team.jpg"
                alt="Team Collaboration"
                className="relative z-10 rounded-3xl shadow-2xl transform md:-rotate-3 group-hover:rotate-0 transition-all duration-700 ease-out border  hover:border-primary"
              />
            </div>

            {/* Text Side */}
            <div className="order-1 md:order-2">
              <div
                data-team-badge
                className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider text-primary uppercase bg-primary/10 rounded-full"
              >
                Faster Collaboration
              </div>

              <h2
                data-team-title
                className="text-4xl md:text-6xl font-black  mb-6 leading-tight"
              >
                Work together <br />
                <span className="text-primary">from anywhere</span>
              </h2>

              <p
                data-team-desc
                className="text-xl text-gray-400 leading-relaxed mb-8"
              >
                Share photos, videos, or heavy documents instantly. Desh-Chat
                ensures your team stays connected with no file size limits and
                lightning-fast uploads.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  data-team-btn
                  to="/about"
                  className="relative isolate overflow-hidden px-6 py-3 rounded-2xl text-white bg-primary group cursor-pointer"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    <ArrowRight size={20} /> Get Started
                  </span>
                  <span className="absolute inset-0 bg-secondary -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out rounded-2xl"></span>
                </Link>

                <Link
                  data-team-btn
                  to="/about"
                  className="relative isolate overflow-hidden px-6 py-3 rounded-2xl text-black bg-white group cursor-pointer border border-gray-100 shadow-sm"
                >
                  <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-white font-bold">
                    Explore Features →
                  </span>
                  <span className="absolute inset-0 bg-secondary -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out -z-10"></span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* section 3 Communication*/}

      <section ref={section3Ref} className="py-24 bg-base-100">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          {/* Section Header */}
          <div data-comm-header className="mb-16">
            <h2 className="text-4xl md:text-6xl font-black  mb-6 tracking-tight">
              Advanced Communication <br />
              <span className="text-primary">Beyond Just Text</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl leading-relaxed">
              Experience high-quality voice and video interactions. Stay
              connected with your team and friends as if they are right next to
              you.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            <div
              data-comm-card
              className="bg-base-200 p-8 rounded-[32px] border border-transparent hover:border-primary shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-8 group-hover:scale-110 transition-transform">
                <Video size={30} />
              </div>
              <h3 className="text-2xl font-bold text-base-content mb-4 text-left">
                HD Video Calling
              </h3>
              <p className="text-gray-400 leading-relaxed text-left">
                Crystal clear video calls with low latency. Connect face-to-face
                with individuals or groups with a single click.
              </p>
            </div>

            <div
              data-comm-card
              className="bg-base-200 p-8 rounded-[32px] border border-transparent hover:border-primary shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mb-8 group-hover:scale-110 transition-transform">
                <Mic size={30} />
              </div>
              <h3 className="text-2xl font-bold text-base-content mb-4 text-left">
                Voice Messages
              </h3>
              <p className="text-gray-400 leading-relaxed text-left">
                Too busy to type? Send high-quality voice notes instantly.
                Perfect for sharing quick updates on the go.
              </p>
            </div>

            <div
              data-comm-card
              className="bg-base-200 p-8 rounded-[32px] border border-transparent hover:border-primary shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mb-8 group-hover:scale-110 transition-transform">
                <MonitorUp size={30} />
              </div>
              <h3 className="text-2xl font-bold text-base-content mb-4 text-left">
                Screen Sharing
              </h3>
              <p className="text-gray-400 leading-relaxed text-left">
                Collaborate effectively by sharing your screen during calls.
                Great for presentations, debugging, or brainstorming.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/** section 4 Engage  */}
      <section ref={section4Ref} className="py-24 bg-base-100">
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          {/* Section Header */}
          <div
            data-engage-header
            className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 text-left"
          >
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-6xl font-black text-base-content leading-tight">
                Engage more, <br />
                <span className="text-primary">type less</span>
              </h2>
            </div>
            <p className="text-xl text-gray-200 max-w-md leading-relaxed">
              Communication is more than just words. React, reply, and find what
              you need in seconds.
            </p>
          </div>

          {/*  Cards  */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div
              data-engage-card
              className="group bg-base-200 p-8 rounded-[32px] border border-transparent 
                hover:border-primary shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="text-4xl mb-6 group-hover:scale-125 transition-transform duration-300 inline-block">
                😄
              </div>
              <h3 className="text-2xl font-bold text-base-content mb-4">
                Emoji Reactions
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Quickly express your feelings on any message with emojis. It’s
                the fastest way to acknowledge a thought.
              </p>
            </div>

            <div
              data-engage-card
              className="group bg-base-200 p-8 rounded-[32px] border border-transparent 
                hover:border-primary shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div
                className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6
                bg-purple-100 dark:bg-purple-700 
                group-hover:bg-primary transition-all"
              >
                <MessageSquare
                  size={28}
                  className="text-purple-600 dark:text-purple-100 group-hover:text-white"
                />
              </div>
              <h3 className="text-2xl font-bold text-base-content mb-4">
                Threaded Replies
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Keep conversations organized. Reply to specific messages to
                create a focused thread without clutter.
              </p>
            </div>

            <div
              data-engage-card
              className="group bg-base-200 p-8 rounded-[32px] border border-transparent 
                hover:border-primary shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-orange-100 dark-bg-orange-700 rounded-2xl flex items-center justify-center group-hover:bg-primary  transition-all">
                <Search
                  size={28}
                  className="text-orange-600 dark:text-orange-100 group-hover:text-white"
                />
              </div>
              <h3 className="text-2xl font-bold text-base-content mb-4">
                Powerful Search
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Need to find that one link? Our lightning-fast search helps you
                locate messages and files instantly.
              </p>
            </div>

            <div
              data-engage-card
              className="group bg-base-200 p-8 rounded-[32px] border border-transparent 
                hover:border-primary shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-red-100  dark-bg-red-700 rounded-2xl flex items-center justify-center group-hover:bg-primary  transition-all">
                <Eraser
                  size={28}
                  className="text-red-600 dark:text-red-100 group-hover:text-white"
                />
              </div>
              <h3 className="text-2xl font-bold text-base-content mb-4">
                Edit & Delete
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Made a typo? No problem. Edit your messages after sending or
                remove them entirely for ultimate control.
              </p>
            </div>

            <div
              data-engage-card
              className="group bg-base-200 p-8 rounded-[32px] border border-transparent 
                hover:border-primary shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-green-100 dark-bg-green-700 rounded-2xl flex items-center justify-center group-hover:bg-primary  transition-all">
                <Pin
                  size={28}
                  className="text-green-600 dark:text-green-100 group-hover:text-white"
                />
              </div>
              <h3 className="text-2xl font-bold text-base-content mb-4">
                Pinned Messages
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Keep key info at the top. Pin important announcements or files
                so everyone can find them easily.
              </p>
            </div>

            <div
              data-engage-card
              className="group bg-base-200 p-8 rounded-[32px] border border-transparent 
                hover:border-primary shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-blue-100 dark-bg-green-700 rounded-2xl flex items-center justify-center group-hover:bg-primary  transition-all">
                <AtSign
                  size={28}
                  className="text-blue-600 dark:text-blue-100 group-hover:text-white"
                />
              </div>
              <h3 className="text-2xl font-bold text-base-content mb-4">
                Direct Mentions
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Get attention instantly by using @mentions. They'll get a
                notification even in a busy group.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/** section 5  Experience*/}
      <section ref={section5Ref} className="py-24 bg-base-100">
        <div className="max-w-7xl mx-auto px-6">
          <div data-exp-header className="text-center mb-16">
            <h2 className="text-4xl font-black text-base-content mb-4">
              Core <span className="text-primary">Experience</span>
            </h2>
            <p className="text-base-content/70 text-lg">
              Everything you need for a seamless conversation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 */}
            <div
              data-exp-card
              className="p-8 rounded-3xl bg-base-200 border border-transparent hover:border-primary hover:shadow-xl transition-all group"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6 ">
                <Edit3 size={24} />
              </div>
              <h3 className="font-bold text-xl mb-2 text-base-content">
                Typing Indicators
              </h3>
              <p className="text-base-content/70 text-sm">
                See when your friends are typing in real-time, making chats feel
                alive.
              </p>
            </div>

            {/* Card 2 */}
            <div
              data-exp-card
              className="p-8 rounded-3xl bg-base-200 border border-transparent hover:border-primary hover:shadow-xl transition-all group"
            >
              <div className="relative w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-6">
                <User size={24} />
                <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-base-100"></div>
              </div>
              <h3 className="font-bold text-xl mb-2 text-base-content">
                Live Presence
              </h3>
              <p className="text-base-content/70 text-sm">
                Know exactly when your contacts are online or when they were
                last seen.
              </p>
            </div>

            {/* Card 3 */}
            <div
              data-exp-card
              className="p-8 rounded-3xl bg-base-200 border border-transparent hover:border-primary hover:shadow-xl transition-all group"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-6">
                <CheckCheck size={24} />
              </div>
              <h3 className="font-bold text-xl mb-2 text-base-content">
                Read Receipts
              </h3>
              <p className="text-base-content/70 text-sm">
                Stay informed with delivered and seen indicators for every
                message sent.
              </p>
            </div>

            {/* Card 4 */}
            <div
              data-exp-card
              className="p-8 rounded-3xl bg-base-200 border border-transparent hover:border-primary hover:shadow-xl transition-all group"
            >
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 mb-6">
                <Database size={24} />
              </div>
              <h3 className="font-bold text-xl mb-2 text-base-content">
                Cloud Storage
              </h3>
              <p className="text-base-content/70 text-sm">
                Your chats are saved forever. Access your history from any
                device, anytime.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Features;
