import { useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { Quote, Star } from "lucide-react";

const Testimonials = () => {
  const sectionRef = useRef(null);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Ahmed",
      role: "Product Manager",
      image: "https://i.ibb.co.com/zW795Zdb/im.jpg",
      text: "DashChat has revolutionized our team communication. The real-time features are outstanding!",
    },
    {
      id: 2,
      name: "Rahim Khan",
      role: "Team Lead",
      image: "https://i.ibb.co.com/kssN1PFb/hjk-hl.jpg",
      text: "Perfect for remote teams. File sharing and video calls work flawlessly.",
    },
    {
      id: 3,
      name: "Nusrat Jahan",
      role: "Student",
      image: "https://i.ibb.co.com/SDW2gpS5/lllllllllllll.jpg",
      text: "Great for group studies. The typing indicator is a game-changer!",
    },
    {
      id: 4,
      name: "Hasan Mahmud",
      role: "Freelancer",
      image: "https://i.ibb.co.com/7tzr92mT/hhhhhhhhh.jpg",
      text: "Best chat app for client communication. Simple and efficient!",
    },
  ];

  const marqueeItems = useMemo(
    () => [...testimonials, ...testimonials],
    [testimonials],
  );

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        "[data-testimonial-header]",
        { opacity: 0, y: 26 },
        { opacity: 1, y: 0, duration: 0.65 },
      ).fromTo(
        "[data-testimonial-rail]",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.55 },
        "-=0.32",
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden rounded-3xl bg-base-100 py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="pointer-events-none absolute -left-16 top-10 h-56 w-56 rounded-full bg-primary/15 blur-3xl" />
      <div className="pointer-events-none absolute -right-12 bottom-0 h-56 w-56 rounded-full bg-info/15 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <div
          data-testimonial-header
          className="mx-auto max-w-3xl text-center opacity-0"
        >
          <span className="inline-flex items-center rounded-full border border-primary/30 bg-base-200 px-4 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
            Customer voices
          </span>
          <h2 className="mt-4 text-3xl md:text-5xl font-black text-primary">
            Loved by Teams and Individuals
          </h2>
          <p className="mt-3 text-sm md:text-base text-base-content/70 leading-relaxed">
            Real users choose DashChat for speed, reliability, and smooth
            communication experiences.
          </p>

          <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-base-200 px-4 py-2 text-sm font-semibold text-base-content/80">
            <Star size={16} className="text-amber-500" />
            4.9/5 average satisfaction from active users
          </div>
        </div>

        <div
          data-testimonial-rail
          className="testimonial-rail-wrapper opacity-0 mt-10"
        >
          <div className="testimonial-fade-left" />
          <div className="testimonial-fade-right" />

          <div className="testimonial-marquee track-pause flex gap-5">
            {marqueeItems.map((item, index) => (
              <article
                key={`${item.id}-${index}`}
                className="group relative w-[292px] shrink-0 rounded-2xl border border-base-300/70 bg-base-200/75 p-5 shadow-md backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="pointer-events-none absolute inset-0 rounded-2xl border-2 border-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-12 w-12 rounded-full object-cover ring-2 ring-base-100"
                    />
                    <div>
                      <h3 className="text-sm font-bold text-base-content">
                        {item.name}
                      </h3>
                      <p className="text-xs text-base-content/60">
                        {item.role}
                      </p>
                    </div>
                  </div>
                  <Quote size={18} className="text-primary/70" />
                </div>

                <p className="mt-4 text-sm leading-relaxed text-base-content/75">
                  "{item.text}"
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .testimonial-rail-wrapper {
          position: relative;
          overflow: hidden;
          border-radius: 1rem;
        }

        .testimonial-fade-left,
        .testimonial-fade-right {
          pointer-events: none;
          position: absolute;
          top: 0;
          z-index: 5;
          height: 100%;
          width: 70px;
        }

        .testimonial-fade-left {
          left: 0;
          background: linear-gradient(to right, hsl(var(--b1)) 25%, transparent);
        }

        .testimonial-fade-right {
          right: 0;
          background: linear-gradient(to left, hsl(var(--b1)) 25%, transparent);
        }

        .testimonial-marquee {
          width: max-content;
          animation: testimonial-marquee 18s linear infinite;
          will-change: transform;
        }

        .track-pause:hover {
          animation-play-state: paused;
        }

        @keyframes testimonial-marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        @media (max-width: 768px) {
          .testimonial-marquee {
            animation-duration: 14s;
          }
        }
      `}</style>
    </section>
  );
};

export default Testimonials;
