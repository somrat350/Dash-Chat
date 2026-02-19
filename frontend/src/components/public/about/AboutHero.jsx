import { ArrowRight, Globe, MessageCircle, Users, Zap } from 'lucide-react';
import React from 'react';


const AboutHero = () => {
    const stats = [
    { label: "Active Users", value: "1M+", icon: <Users className="w-6 h-6" /> },
    { label: "Messages Daily", value: "50M+", icon: <MessageCircle className="w-6 h-6" /> },
    { label: "Countries", value: "120+", icon: <Globe className="w-6 h-6" /> },
    { label: "Uptime", value: "99.9%", icon: <Zap className="w-6 h-6" /> },
  ];

   const teamMembers = [
  {
    id: 1,
    name: "~Osamabin Somrat",
    role: "Founder & Chief Executive Officer",
    image: "https://i.ibb.co.com/r2vV6LKw/611319340-122187850070498059-3494985892677650904-n-removebg-preview.png"
  },
  {
    id: 2,
    name: "~Tangila Khatun",
    role: "Founder & Head of Sourcing",
    image: "https://i.ibb.co.com/11sdH4w/Whats-App-Image-2026-02-17-at-8-26-36-AM-png-removebg-preview.png"
  },
  {
    id: 3,
    name: "~Sabbir Hossain",
    role: "Project Manager",
    image: "https://i.ibb.co.com/mCCTkP71/Annotation-2026-02-17-134327-removebg-preview.png"
  },
  {
    id: 4,
    name: "~Lima Akter",
    role: "Backend Developer",
    image: "https://i.ibb.co.com/DP81ykjT/Whats-App-Image-2026-02-17-at-8-21-49-AM-png-removebg-preview-1.png"
  },
  {
    id: 5,
    name: "~Arman Islam Shuvo ",
    role: "Real-Time Developer",
    image: "https://i.ibb.co.com/zWcNKnTH/Annotation-2026-02-17-13414-removebg-preview.png"
  },
  {
    id: 6,
    name: "~China Akther",
    role: "Frontend Developer",
    image: "https://i.ibb.co.com/ZprrfY0R/png-removebg-preview.png"
  }
];
    return (
        <div>
          <section className="relative min-h-[600px] flex items-center overflow-hidden rounded-3xl">

  {/* Background Image */}
  <div className="absolute inset-0">
    <img
      src="https://i.ibb.co/99rrcM8v/about.jpg"
      alt="About DashChat Background"
      className="w-full h-full object-cover"
    />

    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
  </div>

  {/* Content */}
  <div className="relative max-w-7xl mx-auto px-6 w-full">
    
    <div className="max-w-3xl text-left text-white py-20">
      
      <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
        About{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary/70">
  DashChat
</span>
      </h1>

      <p className="text-xl md:text-2xl lg:text-3xl mb-8 opacity-95 leading-relaxed">
        Revolutionizing real-time communication for everyone, everywhere.
      </p>
      <p className="text-lg md:text-xl mb-4 opacity-90">
  Our mission is to make communication seamless, secure, and accessible 
  for individuals and businesses around the world.
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
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-6 rounded-xl bg-gray-50 hover:shadow-lg transition-shadow">
                <div className="flex justify-center text-blue-600 mb-3">
                  {stat.icon}
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

{/* Story Section  */}

<section className="py-16 bg-gray-50">
    <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* story  */}
            <div>
               <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
                <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                DashChat was born from a simple idea: communication should be instant, 
                secure, and accessible to everyone. Founded in 2024, we've grown from 
                a small startup to a global platform connecting millions of users daily.
              </p>
               <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                Our mission is to break down communication barriers and bring people 
                closer together, whether they're across the street or across the globe.
              </p>
              <div className='flex gap-4'>
                {/* lift */}
                <div className='flex items-center gap-2'>
                  <div className='w-2 h-2 bg-primary rounded-full'></div>
                  <span className='text-gray-700'>Founded in 2025</span>
                </div>
                {/* right */}
                   <div className='flex items-center gap-2'>
                    <div className='w-2 h-2 bg-primary rounded-full'></div>
                    <span className='text-gray-700'>Global Team</span>
                   </div>
              </div>
            </div>
            {/* image  */}
            <div className="relative">
                 <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3"
                alt="Team collaboration"
                className="rounded-2xl shadow-2xl"
              /> 
              <div className="absolute -bottom-5 -left-5 bg-white p-4 rounded-lg shadow-lg">
                <p className="text-sm font-semibold text-gray-900">Trusted by</p>
                <p className="text-2xl font-bold text-primary">50K+ Users</p>
              </div>
            </div>

        </div>

    </div>
</section >

{/* Team Section */}
  <section className="py-20 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4">
    
    {/* Section Heading */}
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">
        Meet Our <span className="text-primary">Expert Team</span>
      </h2>
    
    </div>

    {/* Team Cards */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">

      {teamMembers.map((member) => (
        <div
          key={member.id}
          className="flex justify-center"
        >
          <div
            className="
              bg-gradient-to-br from-green-50 to-white-50

              p-8
              rounded-2xl
              shadow-lg
              transform rotate-[-4deg]
              hover:rotate-0
              hover:scale-105
              transition-all duration-300
              flex flex-col items-center
              w-full h-85 max-w-xs
            "
          >
            <div className="w-50 h-50 mb-6">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover rounded-xl shadow-md"
              />
            </div>

            <h3 className="text-xl font-semibold text-gray-900 text-center">
              {member.name}
            </h3>

            <p className="text-gray-500 text-center mt-2">
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
