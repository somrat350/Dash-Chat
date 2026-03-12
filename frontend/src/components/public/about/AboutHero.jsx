import { ArrowRight, Globe, MessageCircle, Users, Zap } from "lucide-react";

const AboutHero = () => {
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
    { label: "Countries", value: "120+", icon: <Globe className="w-6 h-6" /> },
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
      name: "~Sabbir Hossain",
      role: "Project Manager",
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
      <section className="relative min-h-150 flex items-center overflow-hidden rounded-3xl">
        
        <div className="group absolute inset-0">
          <img
            src="https://i.ibb.co/99rrcM8v/about.jpg"
            alt="About DashChat Background"
            className="w-full h-full object-cover"
          />
        
            <div className="absolute inset-0 rounded-2xl border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

          
          <div className="absolute inset-0 bg-linear-to-r from-black/50 to-black/40"></div>
        </div>

        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-6 w-full">
          <div className="max-w-3xl text-left text-white py-20">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
              About{" "}
              <span className="text-transparent bg-clip-text bg-linear-to-r from-primary to-primary/70">
                DashChat
              </span>
            </h1>

            <p className="text-xl md:text-2xl lg:text-3xl mb-8 opacity-95 leading-relaxed">
              Revolutionizing real-time communication for everyone, everywhere.
            </p>
            <p className="text-lg md:text-xl mb-4 opacity-90">
              Our mission is to make communication seamless, secure, and
              accessible for individuals and businesses around the world.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap justify-start gap-4">
              <button className="relative overflow-hidden px-6 py-3 rounded-2xl text-white bg-primary  group cursor-pointer">
                <span className="relative z-10 flex items-center gap-2">
                  <ArrowRight size={20} /> Get Started
                </span>

                {/* Background overlay */}
                <span className="absolute inset-0 bg-secondary -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out rounded-2xl"></span>
              </button>

              <button className="relative overflow-hidden flex items-center gap-2 px-6 py-3 bg-white rounded-2xl group cursor-pointer">
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
     <section className="py-16 bg-base-100">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="relative group bg-base-200 rounded-2xl p-8 shadow-md hover:shadow-xl transition-all w-72 text-center"
        >
          
          <div className="absolute inset-0 rounded-2xl border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

          
          <div className="flex justify-center mb-4 text-primary text-3xl">
            {stat.icon}
          </div>

          
          <div className="text-3xl font-bold text-base-content mb-2">
            {stat.value}
          </div>

          
          <div className="text-base-content/70 text-sm">{stat.label}</div>
        </div>
      ))}
    </div>
  </div>
</section>

      {/* Story Section  */}

     <section className="py-16 bg-base-100">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
    <div className="grid md:grid-cols-2 gap-12 items-center">
      
      <div>
        <h2 className="text-4xl font-bold text-primary mb-6">
          Our Story
        </h2>
        <p className="text-lg text-base-content/80 mb-4 leading-relaxed">
          DashChat was born from a simple idea: communication should be
          instant, secure, and accessible to everyone. Founded in 2025,
          we've grown from a small startup to a global platform connecting
          millions of users daily.
        </p>
        <p className="text-lg text-base-content/80 mb-6 leading-relaxed">
          Our mission is to break down communication barriers and bring
          people closer together, whether they're across the street or
          across the globe.
        </p>

        <div className="flex gap-6">
          
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span className="text-base-content/70">Founded in 2025</span>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-primary rounded-full"></div>
            <span className="text-base-content/70">Global Team</span>
          </div>
        </div>
      </div>

      {/* Image */}
      <div className=" group relative">
        <img
          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3"
          alt="Team collaboration"
          className="rounded-2xl shadow-2xl"
        />
          {/* Hover Border */}
            <div className="absolute inset-0 rounded-2xl border-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        <div className="group  absolute -bottom-5 -left-5 bg-base-200 p-4 rounded-lg shadow-lg">
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
      <section className="py-20 bg-base-100">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-10">
    
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-base-content mb-4">
        Meet Our <span className="text-primary">Expert Team</span>
      </h2>
    </div>

    {/* Team Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
      {teamMembers.map((member) => (
        <div key={member.id} className="flex justify-center">
          <div
            className="
              relative
           group
              bg-base-200
              p-8
              rounded-2xl
              shadow-lg
              transform -rotate-2 hover:rotate-0 hover:scale-105
              transition-all duration-300
              flex flex-col items-center
              w-72
            "
          >
            
            <div className="w-36 h-36 mb-6">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover rounded-xl shadow-md"
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
