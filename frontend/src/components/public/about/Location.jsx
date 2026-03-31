import { Mail, Phone, MapPin, Clock3, Building2 } from "lucide-react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Location = () => {
  const sectionRef = useRef(null);

  const branches = [
    {
      city: "Dhaka",
      title: "Head Office",
      address: "House 12, Road 7, Dhanmondi, Dhaka",
      mapSrc: "https://www.google.com/maps?q=Dhaka,Bangladesh&output=embed",
    },
    {
      city: "Chittagong",
      title: "Regional Branch",
      address: "Agrabad Commercial Area, Chittagong",
      mapSrc:
        "https://www.google.com/maps?q=Chittagong,Bangladesh&output=embed",
    },
    {
      city: "Rangpur",
      title: "North Zone Branch",
      address: "Modern Mor, Rangpur Sadar, Rangpur",
      mapSrc: "https://www.google.com/maps?q=Rangpur,Bangladesh&output=embed",
    },
  ];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
        defaults: { ease: "power3.out" },
      });

      tl.fromTo(
        "[data-location-heading]",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.7 },
      )
        .fromTo(
          "[data-location-subheading]",
          { opacity: 0, y: 22 },
          { opacity: 1, y: 0, duration: 0.6 },
          "-=0.35",
        )
        .fromTo(
          "[data-branch-card]",
          { opacity: 0, y: 40, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.14 },
          "-=0.2",
        )
        .fromTo(
          "[data-location-panel]",
          { opacity: 0, x: 28 },
          { opacity: 1, x: 0, duration: 0.6 },
          "-=0.45",
        );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 bg-base-100 overflow-hidden"
    >
      <div className="absolute -top-24 -left-20 w-72 h-72 rounded-full bg-primary/10 blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -right-16 w-72 h-72 rounded-full bg-secondary/10 blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
        <div className="text-center mb-14">
          <h2
            data-location-heading
            className="text-3xl sm:text-4xl md:text-5xl font-black text-base-content"
          >
            Visit Our <span className="text-primary">Branch Offices</span>
          </h2>
          <p
            data-location-subheading
            className="mt-4 text-base sm:text-lg text-base-content/70 max-w-3xl mx-auto"
          >
            We are available across Bangladesh to support our users with local
            presence, faster response, and reliable communication services.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-10">
          {branches.map((branch) => (
            <article
              key={branch.city}
              data-branch-card
              className="group bg-gradient-to-br from-base-200 via-base-200 to-base-300 rounded-3xl border border-base-300 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden"
            >
              <div className="p-5 pb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/15 text-primary text-xs font-bold uppercase tracking-wide mb-3">
                  <Building2 className="w-4 h-4" />
                  {branch.title}
                </div>
                <h3 className="text-2xl font-bold text-base-content">
                  {branch.city}
                </h3>
                <p className="mt-2 text-sm text-base-content/70 leading-relaxed">
                  {branch.address}
                </p>
              </div>

              <div className="mx-5 mb-5 rounded-2xl overflow-hidden border border-base-300 h-64">
                <iframe
                  src={branch.mapSrc}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`${branch.city} Branch Location`}
                  className="w-full h-full"
                ></iframe>
              </div>
            </article>
          ))}
        </div>

        <div
          data-location-panel
          className="grid md:grid-cols-2 gap-6 bg-gradient-to-r from-base-200/90 via-base-200 to-base-300/90 border border-base-300 rounded-3xl p-6 sm:p-8 shadow-xl"
        >
          <div>
            <h3 className="text-2xl font-bold text-base-content mb-6">
              Contact Information
            </h3>

            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <div className="bg-primary/20 p-3 rounded-xl">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-base-content/60">Email</p>
                  <p className="text-base sm:text-lg font-semibold text-base-content">
                    support@dashchat.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-secondary/20 p-3 rounded-xl">
                  <Phone className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="text-sm text-base-content/60">Phone</p>
                  <p className="text-base sm:text-lg font-semibold text-base-content">
                    +880 1234 567890
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="bg-primary/20 p-3 rounded-xl">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-base-content/60">Primary Office</p>
                  <p className="text-base sm:text-lg font-semibold text-base-content">
                    Dhanmondi, Dhaka, Bangladesh
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-base-100 rounded-2xl p-5 sm:p-6 border border-base-300">
            <div className="flex items-center gap-2 mb-5 text-base-content">
              <Clock3 className="w-5 h-5 text-primary" />
              <h4 className="text-xl font-bold">Business Hours</h4>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center px-4 py-3 rounded-xl bg-base-200 border border-base-300">
                <span className="font-medium text-base-content">
                  Saturday - Thursday
                </span>
                <span className="font-semibold text-base-content">
                  8:00 AM - 10:00 PM
                </span>
              </div>

              <div className="flex justify-between items-center px-4 py-3 rounded-xl bg-base-200 border border-base-300">
                <span className="font-medium text-base-content">Friday</span>
                <span className="font-semibold text-error">Closed</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
