import { ArrowRight, Globe, MessageCircle, Users, Zap } from "lucide-react";
import { useRef, useLayoutEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ourTeamPhoto from "../../../assets/our-team-photo.png";
import ourStoryImage from "../../../assets/our-story.jpeg";

gsap.registerPlugin(ScrollTrigger);

const AboutHero = () => {
  const heroRef = useRef(null);
  const statsRef = useRef(null);
  const storyRef = useRef(null);
  const teamRef = useRef(null);
  const statCountersRef = useRef([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Hero section animations
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });
      heroTl
        .fromTo(
          "[data-hero-title]",
          { opacity: 0, y: 50, rotateX: -15 },
          { opacity: 1, y: 0, rotateX: 0, duration: 0.9, perspective: 1200 },
        )
        .fromTo(
          "[data-hero-subtitle]",
          { opacity: 0, y: 35 },
          { opacity: 1, y: 0, duration: 0.7 },
          "-=0.4",
        )
        .fromTo(
          "[data-hero-desc]",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.3",
        )
        .fromTo(
          "[data-hero-btn]",
          { opacity: 0, y: 20, scale: 0.9 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.15 },
          "-=0.3",
        );

      // Stats section - scroll triggered with counter animations
      const statsTl = gsap.timeline({
        scrollTrigger: {
          trigger: statsRef.current,
          start: "top 65%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      statsTl
        .fromTo(
          "[data-stat-card]",
          { opacity: 0, y: 30, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.1 },
          0,
        )
        .fromTo(
          "[data-stat-icon]",
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1, duration: 0.5, stagger: 0.1 },
          0,
        );

      // Counter animations for stats with growing effect
      statCountersRef.current.forEach((el, index) => {
        if (!el) return;
        const statValue = el.getAttribute("data-stat-value");
        const regex = /(\d+)/;
        const match = statValue.match(regex);

        if (match) {
          const targetValue = parseInt(match[1]);
          const suffix = statValue.includes("%") ? "%" : "+";

          // Add scale animation with counter
          gsap
            .timeline({
              scrollTrigger: {
                trigger: statsRef.current,
                start: "top 65%",
                once: true,
              },
            })
            .to(
              el,
              {
                scale: 1.3,
                duration: 0.3,
                ease: "back.out",
              },
              0,
            )
            .to(
              {},
              {
                onUpdate: function () {
                  const progress = this.progress();
                  const currentValue = Math.floor(targetValue * progress);
                  el.innerText = currentValue + suffix;
                },
                duration: 1.5,
                ease: "power2.out",
              },
              0,
            )
            .to(
              el,
              {
                scale: 1,
                duration: 0.4,
                ease: "elastic.out(1.2, 0.75)",
              },
              0.4,
            )
            .to(
              el,
              {
                color: "var(--color-primary)",
                textShadow: "0 0 20px rgba(var(--primary-rgb), 0.4)",
                duration: 0.5,
              },
              0,
            );
        }
      });

      // Story section - scroll triggered
      const storyTl = gsap.timeline({
        scrollTrigger: {
          trigger: storyRef.current,
          start: "top 65%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      storyTl
        .fromTo(
          "[data-story-title]",
          { opacity: 0, x: -40 },
          { opacity: 1, x: 0, duration: 0.7 },
        )
        .fromTo(
          "[data-story-text]",
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 0.5, stagger: 0.15 },
          "-=0.3",
        )
        .fromTo(
          "[data-story-badge]",
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.4, stagger: 0.1 },
          "-=0.2",
        )
        .fromTo(
          "[data-story-image]",
          { opacity: 0, x: 50, scale: 0.9 },
          { opacity: 1, x: 0, scale: 1, duration: 0.7 },
          "-=0.4",
        );

      // Team section - scroll triggered with stagger
      const teamTl = gsap.timeline({
        scrollTrigger: {
          trigger: teamRef.current,
          start: "top 65%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      teamTl
        .fromTo(
          "[data-team-header]",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6 },
        )
        .fromTo(
          "[data-team-card]",
          { opacity: 0, y: 35, scale: 0.9, rotation: -8 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotation: 0,
            duration: 0.6,
            stagger: 0.12,
          },
          "-=0.3",
        );
    });

    return () => ctx.revert();
  }, []);
  const stats = [
    {
      label: "Active Users",
      value: "1M+",
      icon: <Users className="w-6 h-6" />,
    },
    {
      label: "Messages Daily",
      value: "50M+",
      icon: <MessageCircle className="w-6 h-6" />,
    },
    { label: "Countries", value: "50+", icon: <Globe className="w-6 h-6" /> },
    { label: "Uptime", value: "99.9%", icon: <Zap className="w-6 h-6" /> },
  ];

  const teamMembers = [
    {
      id: 1,
      name: "~Osamabin Somrat",
      role: "Founder & Chief Executive Officer",
      image:
        "https://i.ibb.co.com/r2vV6LKw/611319340-122187850070498059-3494985892677650904-n-removebg-preview.png",
    },
    {
      id: 2,
      name: "~Tangila Khatun",
      role: "Founder & Head of Sourcing",
      image:
        "https://i.ibb.co.com/11sdH4w/Whats-App-Image-2026-02-17-at-8-26-36-AM-png-removebg-preview.png",
    },
    {
      id: 3,
      name: "~Sabbir Hossain Sohag",
      role: "Project Manager & Full Stack Developer",
      image:
        "https://i.ibb.co.com/mCCTkP71/Annotation-2026-02-17-134327-removebg-preview.png",
    },
    {
      id: 4,
      name: "~Lima Akter",
      role: "Backend Developer",
      image:
        "https://i.ibb.co.com/DP81ykjT/Whats-App-Image-2026-02-17-at-8-21-49-AM-png-removebg-preview-1.png",
    },
    {
      id: 5,
      name: "~Arman Islam Shuvo ",
      role: "Real-Time Developer",
      image:
        "https://i.ibb.co.com/zWcNKnTH/Annotation-2026-02-17-13414-removebg-preview.png",
    },
    {
      id: 6,
      name: "~China Akther",
      role: "Frontend Developer",
      image: "https://i.ibb.co.com/ZprrfY0R/png-removebg-preview.png",
    },
  ];
  return (
    <div>
      {/* hero section */}
      <section
        ref={heroRef}
        className="relative min-h-150 flex items-center overflow-hidden rounded-3xl"
      >
        <div className="group absolute inset-0">
          <img
            src={ourTeamPhoto}
            alt="About DashChat Background"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 rounded-2xl border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

          <div className="absolute inset-0 bg-linear-to-r from-black/50 to-black/40"></div>
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-3xl text-left text-white py-20">
            <h1
              data-hero-title
              className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg"
            >
              About{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-primary/70">
                DashChat
              </span>
            </h1>

            <p
              data-hero-subtitle
              className="text-xl md:text-2xl lg:text-3xl mb-8 opacity-95 leading-relaxed"
            >
              Revolutionizing real-time communication for everyone, everywhere.
            </p>
            <p data-hero-desc className="text-lg md:text-xl mb-4 opacity-90">
              Our mission is to make communication seamless, secure, and
              accessible for individuals and businesses around the world.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap justify-start gap-4">
              <button
                data-hero-btn
                className="relative overflow-hidden px-6 py-3 rounded-2xl text-white bg-primary  group cursor-pointer"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <ArrowRight size={20} /> Get Started
                </span>

                {/* Background overlay */}
                <span className="absolute inset-0 bg-secondary -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out rounded-2xl"></span>
              </button>

              <button
                data-hero-btn
                className="relative overflow-hidden flex items-center gap-2 px-6 py-3 bg-white rounded-2xl group cursor-pointer"
              >
                {/* Text */}
                <span className="relative z-10 text-secondary group-hover:text-white transition-colors duration-300 flex items-center gap-2">
                  <MessageCircle size={20} />
                  Learn More
                </span>

                {/* Background overlay */}
                <span className="absolute inset-0 bg-secondary -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out rounded-2xl"></span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section  */}
      <section
        ref={statsRef}
        className="py-20 bg-gradient-to-b from-base-100 via-base-100 to-base-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-base-content">
              Our <span className="text-primary">Growing Impact</span>
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                data-stat-card
                className="relative group bg-gradient-to-br from-base-200 via-base-300 to-base-200 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-10 shadow-lg hover:shadow-2xl transition-all duration-400 min-h-56 sm:min-h-64 md:min-h-72 lg:min-h-80 flex flex-col items-center justify-center"
              >
                {/* Animated background glow */}
                <div className="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 rounded-2xl sm:rounded-3xl border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                <div
                  data-stat-icon
                  className="flex justify-center mb-3 sm:mb-4 md:mb-6 text-primary text-3xl sm:text-4xl md:text-5xl lg:text-6xl group-hover:scale-125 transition-transform duration-300"
                >
                  {stat.icon}
                </div>

                <div
                  ref={(el) => (statCountersRef.current[index] = el)}
                  data-stat-value={stat.value}
                  className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-black text-primary mb-2 sm:mb-3 md:mb-4 transition-all duration-300 leading-none"
                  style={{ transformOrigin: "center" }}
                >
                  {stat.value}
                </div>

                <div className="text-base-content text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-center">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section  */}

      <section ref={storyRef} className="py-16 bg-base-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2
                data-story-title
                className="text-4xl font-bold text-primary mb-6"
              >
                Our Story
              </h2>
              <p
                data-story-text
                className="text-lg text-base-content/80 mb-4 leading-relaxed"
              >
                DashChat began when our six-member team discussed and refined
                the core idea, and we officially started working on the project
                from February 15, 2026.
              </p>
              <p
                data-story-text
                className="text-lg text-base-content/80 mb-6 leading-relaxed"
              >
                Team Leader Osamabin Somrat proposed this vision. Along with
                Arman Hossain Shuvo, Sabbir Hossain, Tangila Khatun, Lima Akter,
                and China Akter, we planned together and began developing
                DashChat as one team.
              </p>

              <div className="flex gap-6">
                <div data-story-badge className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-base-content/70 font-medium">
                    Founded in 2026
                  </span>
                </div>

                <div data-story-badge className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-base-content/70 font-medium">
                    Global Team
                  </span>
                </div>
              </div>
            </div>

            {/* Image */}
            <div data-story-image className=" group relative">
              <img
                src={ourStoryImage}
                alt="Our story"
                className="w-full h-auto object-contain rounded-2xl shadow-2xl transition-all duration-300 group-hover:shadow-3xl"
              />
              {/* Hover Border */}
              <div className="absolute inset-0 rounded-2xl border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              <div className="group  absolute -bottom-5 -left-5 bg-base-200 p-4 rounded-lg shadow-lg hover:shadow-xl transition-all">
                <p className="text-sm font-semibold text-base-content/70">
                  Trusted by
                </p>

                <p className="text-2xl  font-bold text-primary">50K+ Users</p>

                <div className="absolute inset-0 rounded-2xl border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section ref={teamRef} className="py-20 bg-base-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
          <div data-team-header className="text-center mb-16">
            <h2 className="text-4xl font-bold text-base-content mb-4">
              Meet Our <span className="text-primary">Expert Team</span>
            </h2>
          </div>

          {/* Team Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex justify-center">
                <div
                  data-team-card
                  className="
              relative
           group
              bg-gradient-to-br from-base-200 to-base-300
              p-8
              rounded-2xl
              shadow-lg
              hover:shadow-2xl
              transition-all duration-300
              flex flex-col items-center
              w-72 hover:scale-105"
                >
                  <div className="w-36 h-36 mb-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover rounded-xl shadow-md group-hover:shadow-lg transition-shadow"
                    />
                  </div>

                  <div className="absolute inset-0 rounded-2xl border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

                  <h3 className="text-xl font-semibold text-base-content text-center">
                    {member.name}
                  </h3>

                  <p className="text-base-content/70 text-center mt-2">
                    {member.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutHero;
