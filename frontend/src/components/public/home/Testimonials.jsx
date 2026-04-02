import { useEffect, useRef } from "react";
import { Quote, Star } from "lucide-react";
import gsap from "gsap";
import Marquee from "react-fast-marquee";

const Testimonials = () => {
  const containerRef = useRef(null);

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

  useEffect(() => {
    const cards = containerRef.current.querySelectorAll(".testimonial-card");

    gsap.fromTo(
      cards,
      { opacity: 0, y: 50, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        stagger: 0.15,
        ease: "power3.out",
      },
    );
  }, []);

  return (
    <section className="relative bg-base-100 py-14 md:py-20 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-primary">
          Loved by Teams & Individuals
        </h2>

        <p className="mt-3 text-sm md:text-base text-base-content/70">
          Real users choose DashChat for speed and smooth communication.
        </p>

        <div className="mt-5 inline-flex items-center gap-2 bg-base-200 px-3 py-1.5 rounded-full text-sm">
          <Star size={14} className="text-amber-500" />
          4.9/5 user satisfaction
        </div>
      </div>

      <div
        ref={containerRef}
        className="max-w-[100vw] rounded-2xl overflow-x-hidden"
      >
        <Marquee
          pauseOnHover
          pauseOnClick
          autoFill
          speed={50}
          gradientWidth={50}
          gradient={true}
          gradientColor={"#2337"}
        >
          {testimonials.map((item) => (
            <article
              key={item.id}
              className="testimonial-card shrink-0 w-3xs sm:w-full max-w-90 h-50 mx-3 rounded-2xl border border-base-300 bg-base-200 p-6 shadow-md hover:shadow-xl transition-shadow"
            >
              <div className="flex justify-between items-start gap-4">
                <div className="flex items-center gap-4">
                  <div className="avatar">
                    <div className="h-12 w-12 rounded-full overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-base-content">{item.name}</h3>
                    <p className="text-xs text-base-content/60">{item.role}</p>
                  </div>
                </div>
                <Quote className="text-primary/40 shrink-0" size={24} />
              </div>

              <p className="mt-5 text-sm leading-relaxed text-base-content/80">
                "{item.text}"
              </p>
            </article>
          ))}
        </Marquee>
      </div>
    </section>
  );
};

export default Testimonials;
