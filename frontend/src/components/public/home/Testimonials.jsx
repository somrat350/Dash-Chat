import React from "react";
import { Quote, Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

const Testimonials = () => {
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

  return (
    <section className="relative overflow-hidden rounded-3xl bg-base-100 py-14 md:py-20 px-4 sm:px-6 lg:px-8">
      {/* Background Blur */}
      <div className="absolute -left-10 top-10 h-40 w-40 md:h-56 md:w-56 bg-primary/15 blur-3xl rounded-full" />
      <div className="absolute -right-10 bottom-0 h-40 w-40 md:h-56 md:w-56 bg-info/15 blur-3xl rounded-full" />

      {/* Header */}
      <div className="relative mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center rounded-full border border-primary/30 bg-base-200 px-3 py-1 text-[10px] sm:text-xs font-semibold uppercase text-primary">
          Customer voices
        </span>

        <h2 className="mt-4 text-2xl sm:text-3xl md:text-5xl font-black text-primary">
          Loved by Teams & Individuals
        </h2>

        <p className="mt-3 text-xs sm:text-sm md:text-base text-base-content/70">
          Real users choose DashChat for speed and smooth communication.
        </p>

        <div className="mt-5 inline-flex items-center gap-2 bg-base-200 px-3 py-1.5 rounded-full text-xs sm:text-sm">
          <Star size={14} className="text-amber-500" />
          4.9/5 user satisfaction
        </div>
      </div>

      {/* Swiper */}
      <div className="mt-10">
        <Swiper
          modules={[EffectCoverflow, Pagination, Autoplay]}
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          loop={true} // ✅ infinite loop
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          slidesPerView={1}
          spaceBetween={16}
          breakpoints={{
            480: { slidesPerView: 1.1 },
            640: { slidesPerView: 1.2 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 2.5 },
            1280: { slidesPerView: 3 },
          }}
          coverflowEffect={{
            rotate: 25,
            stretch: 0,
            depth: 120,
            modifier: 1,
            slideShadows: false,
          }}
          pagination={{ clickable: true }}
        >
          {testimonials.map((item) => (
            <SwiperSlide key={item.id}>
              <article className="group w-full max-w-sm mx-auto rounded-2xl border bg-base-200/90 p-6 md:p-8 shadow-lg hover:shadow-2xl transition">
                <div className="flex justify-between items-start gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-14 w-14 md:h-16 md:w-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="text-base md:text-lg font-bold">
                        {item.name}
                      </h3>
                      <p className="text-sm md:text-base text-gray-500">
                        {item.role}
                      </p>
                    </div>
                  </div>
                  <Quote size={22} className="text-primary" />
                </div>
                <p className="mt-5 text-sm md:text-base text-gray-700">
                  "{item.text}"
                </p>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Testimonials;
