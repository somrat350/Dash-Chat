import React from 'react';
import heroBG from '../../assets/hero2.png'
import { Link } from 'react-router';
import { ArrowRight, AtSign, CheckCheck, Database, Edit3, Eraser, MessageSquare, Mic, MonitorUp, Pin, Search, User, Video } from 'lucide-react';

const Features = () => {
    return (
       <div className="bg-white min-h-screen">
  {/* section 1 hero */}
 <section className="relative h-150 md:h-175 flex items-center overflow-hidden">
  
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
      <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
        Connect your team <br />
        <span className="text-primary">faster than ever</span>
      </h1>
      <p className="text-xl md:text-2xl text-gray-200 mb-10 leading-relaxed">
        Desh Chat brings all your communication into one place. Work from anywhere with the world's most flexible messaging platform.
      </p>
      
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
                                to="/about"
                                className="relative isolate overflow-hidden px-6 py-3 rounded-2xl text-white bg-primary group cursor-pointer"
                              >
                                <span className="relative z-10 flex items-center gap-2">
                                  <ArrowRight size={20} /> Get Started for Free
                                </span>
                    
                                {/* Background overlay */}
                                <span className="absolute inset-0 bg-secondary -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out rounded-2xl"></span>
                              </Link>

                              <Link
  to="/about"
  className="relative isolate overflow-hidden px-6 py-3 rounded-2xl text-black bg-white group cursor-pointer border border-gray-100 shadow-sm"
>
 
  <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-white font-bold">
    <ArrowRight size={20} /> Watch Demo
  </span>

  {/* Background overlay */}
  <span className="absolute inset-0 bg-secondary -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out -z-10"></span>
</Link>
      

          
      </div>
    </div>
  </div>
</section>
  {/* section 2 taem */}
<section className="py-24 bg-white overflow-hidden">
  <div className="max-w-7xl mx-auto px-6 md:px-16">
    <div className="grid md:grid-cols-2 gap-20 items-center">
      
      {/* image */}
      <div className="order-2 md:order-1 relative group">
        {/*  background glow */}
        <div className="absolute -inset-10 bg-gray-100 rounded-full blur-3xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
        
        <img 
          src="https://i.ibb.co.com/ShcZKkm/team.jpg" 
          alt="Team Collaboration" 
          className="relative z-10 rounded-3xl shadow-2xl transform md:-rotate-3 group-hover:rotate-0 transition-all duration-700 ease-out border border-gray-100"
        />
      </div>

      {/* Text Side */}
      <div className="order-1 md:order-2">
        <div className="inline-block px-4 py-1.5 mb-6 text-sm font-bold tracking-wider text-primary uppercase bg-primary/10 rounded-full">
          Faster Collaboration
        </div>
        
        <h2 className="text-4xl md:text-6xl font-black text-[#1d1c1d] mb-6 leading-tight">
          Work together <br />
          <span className="text-primary">from anywhere</span>
        </h2>
        
        <p className="text-xl text-gray-600 leading-relaxed mb-8">
          Share photos, videos, or heavy documents instantly. Desh-Chat ensures your team stays connected with no file size limits and lightning-fast uploads.
        </p>
        
        <div className="flex flex-wrap gap-4">
              <Link
                                to="/about"
                                className="relative isolate overflow-hidden px-6 py-3 rounded-2xl text-white bg-primary group cursor-pointer"
                              >
                                <span className="relative z-10 flex items-center gap-2">
                                  <ArrowRight size={20} /> Get Started
                                </span>
                    
                                {/* Background overlay */}
                                <span className="absolute inset-0 bg-secondary -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out rounded-2xl"></span>
                              </Link>
         

        <Link
  to="/about"
  className="relative isolate overflow-hidden px-6 py-3 rounded-2xl text-black bg-white group cursor-pointer border border-gray-100 shadow-sm"
>
  
  <span className="relative z-10 flex items-center gap-2 transition-colors duration-300 group-hover:text-white font-bold">
    Explore Features →
  </span>

  {/* Background overlay */}
  <span className="absolute inset-0 bg-secondary -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out -z-10"></span>
</Link>
          
        </div>
      </div>

    </div>
  </div>
</section>
 

 {/* section 3 Communication*/}

<section className="py-24 bg-gray-50"> 
  <div className="max-w-7xl mx-auto px-6 md:px-16">
    
    {/* Section Header */}
    <div className="mb-16">
      <h2 className="text-4xl md:text-6xl font-black text-[#1d1c1d] mb-6 tracking-tight">
        Advanced Communication <br />
        <span className="text-primary">Beyond Just Text</span>
      </h2>
      <p className="text-xl text-gray-600 max-w-2xl leading-relaxed">
        Experience high-quality voice and video interactions. Stay connected with your team and friends as if they are right next to you.
      </p>
    </div>

    {/* Features Grid */}
    <div className="grid md:grid-cols-3 gap-8">
      
      
      <div className="bg-white p-8 rounded-[32px] border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 group">
        <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center text-blue-600 mb-8 group-hover:scale-110 transition-transform">
          <Video size={30} />
        </div>
        <h3 className="text-2xl font-bold text-[#1d1c1d] mb-4 text-left">HD Video Calling</h3>
        <p className="text-gray-600 leading-relaxed text-left">
          Crystal clear video calls with low latency. Connect face-to-face with individuals or groups with a single click.
        </p>
      </div>

      
      <div className="bg-white p-8 rounded-[32px] border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 group">
        <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center text-green-600 mb-8 group-hover:scale-110 transition-transform">
          <Mic size={30} />
        </div>
        <h3 className="text-2xl font-bold text-[#1d1c1d] mb-4 text-left">Voice Messages</h3>
        <p className="text-gray-600 leading-relaxed text-left">
          Too busy to type? Send high-quality voice notes instantly. Perfect for sharing quick updates on the go.
        </p>
      </div>

      
      <div className="bg-white p-8 rounded-[32px] border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 group">
        <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center text-purple-600 mb-8 group-hover:scale-110 transition-transform">
          <MonitorUp size={30} />
        </div>
        <h3 className="text-2xl font-bold text-[#1d1c1d] mb-4 text-left">Screen Sharing</h3>
        <p className="text-gray-600 leading-relaxed text-left">
          Collaborate effectively by sharing your screen during calls. Great for presentations, debugging, or brainstorming.
        </p>
      </div>

    </div>

  
    
  </div>
</section>

{/** section 4 Engage  */}
<section className="py-24 bg-gray-50">
  <div className="max-w-7xl mx-auto px-6 md:px-16">
    
    {/* Section Header */}
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 text-left">
      <div className="max-w-2xl">
        <h2 className="text-4xl md:text-6xl font-black text-[#1d1c1d] leading-tight">
          Engage more, <br />
          <span className="text-primary">type less</span>
        </h2>
      </div>
      <p className="text-xl text-gray-600 max-w-md leading-relaxed">
        Communication is more than just words. React, reply, and find what you need in seconds.
      </p>
    </div>

    {/*  Cards  */}
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      
      
      <div className="group bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
        <div className="text-4xl mb-6 group-hover:scale-125 transition-transform duration-300 inline-block">
          😄
        </div>
        <h3 className="text-2xl font-bold text-[#1d1c1d] mb-4">Emoji Reactions</h3>
        <p className="text-gray-600 leading-relaxed">
          Quickly express your feelings on any message with emojis. It’s the fastest way to acknowledge a thought.
        </p>
      </div>

      
      <div className="group bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
        <div className="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-purple-600 mb-6 group-hover:bg-purple-600 group-hover:text-white transition-all">
          <MessageSquare size={28} />
        </div>
        <h3 className="text-2xl font-bold text-[#1d1c1d] mb-4">Threaded Replies</h3>
        <p className="text-gray-600 leading-relaxed">
          Keep conversations organized. Reply to specific messages to create a focused thread without clutter.
        </p>
      </div>

      
      <div className="group bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
        <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 mb-6 group-hover:bg-orange-600 group-hover:text-white transition-all">
          <Search size={28} />
        </div>
        <h3 className="text-2xl font-bold text-[#1d1c1d] mb-4">Powerful Search</h3>
        <p className="text-gray-600 leading-relaxed">
          Need to find that one link? Our lightning-fast search helps you locate messages and files instantly.
        </p>
      </div>

      
      <div className="group bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
        <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-red-600 mb-6 group-hover:bg-red-600 group-hover:text-white transition-all">
          <Eraser size={28} />
        </div>
        <h3 className="text-2xl font-bold text-[#1d1c1d] mb-4">Edit & Delete</h3>
        <p className="text-gray-600 leading-relaxed">
          Made a typo? No problem. Edit your messages after sending or remove them entirely for ultimate control.
        </p>
      </div>

      
      <div className="group bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
        <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-green-600 mb-6 group-hover:bg-green-600 group-hover:text-white transition-all">
          <Pin size={28} />
        </div>
        <h3 className="text-2xl font-bold text-[#1d1c1d] mb-4">Pinned Messages</h3>
        <p className="text-gray-600 leading-relaxed">
          Keep key info at the top. Pin important announcements or files so everyone can find them easily.
        </p>
      </div>

      
      <div className="group bg-white p-8 rounded-[32px] border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
        <div className="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all">
          <AtSign size={28} />
        </div>
        <h3 className="text-2xl font-bold text-[#1d1c1d] mb-4">Direct Mentions</h3>
        <p className="text-gray-600 leading-relaxed">
          Get attention instantly by using @mentions. They'll get a notification even in a busy group.
        </p>
      </div>

    </div>
  </div>
</section>

{/** section 5  Experience*/}
<section className="py-24 bg-gray-50">
  <div className="max-w-7xl mx-auto px-6">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-black text-[#1d1c1d] mb-4">Core <span className='text-primary'>Experience</span> </h2>
      <p className="text-gray-600 text-lg">Everything you need for a seamless conversation.</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      
      {/*  Card */}
      <div className="p-8 rounded-3xl bg-white border border-gray-100 hover:bg-white hover:shadow-xl transition-all group">
        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:animate-bounce">
          <Edit3 size={24} />
        </div>
        <h3 className="font-bold text-xl mb-2">Typing Indicators</h3>
        <p className="text-gray-600 text-sm">See when your friends are typing in real-time, making chats feel alive.</p>
      </div>

     
      <div className='p-8 rounded-3xl bg-white border border-gray-100 hover:bg-white hover:shadow-xl transition-all group'>
        <div className='relative w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center text-green-600 mb-6'>
          <User size={24} />
          <div className="absolute top-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
        </div>
        <h3 className="font-bold text-xl mb-2">Live Presence</h3>
        <p className="text-gray-600 text-sm">Know exactly when your contacts are online or when they were last seen.</p>
      </div>

      
      <div className="p-8 rounded-3xl bg-white border border-gray-100 hover:bg-white hover:shadow-xl transition-all group">
        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center text-purple-600 mb-6">
          <CheckCheck size={24} />
        </div>
        <h3 className="font-bold text-xl mb-2">Read Receipts</h3>
        <p className="text-gray-600 text-sm">Stay informed with delivered and seen indicators for every message sent.</p>
      </div>

      
      <div className='p-8 rounded-3xl bg-white border border-gray-100 hover:bg-white hover:shadow-xl transition-all group'>
        <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center text-orange-600 mb-6">
          <Database size={24} />
        </div>
        <h3 className="font-bold text-xl mb-2">Cloud Storage</h3>
        <p className="text-gray-600 text-sm">Your chats are saved forever. Access your history from any device, anytime.</p>
      </div>

    </div>
  </div>
</section>

</div>
    );
};

export default Features;