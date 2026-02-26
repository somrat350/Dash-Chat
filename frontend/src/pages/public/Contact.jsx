import React from 'react';
import { Link } from 'react-router';
import img1 from '../../assets/happy.png'
import img2 from '../../assets/team.png'
import img3 from '../../assets/happy2.png'
import img4 from '../../assets/happy4.png'
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react';

const Contact = () => {
    return (
 <div className="bg-gray-50 min-h-screen">
  {/*headerr */}
  <section className="py-20 bg-primary rounded-3xl relative">
    <div className="max-w-7xl mx-auto px-4 md:px-16">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        
        <div>
          <h1 className="text-6xl font-bold text-white mt-2 mb-6">
            Contact Us<br />
            
          </h1>
          <p className="text-xl md:text-2xl text-white/90 leading-relaxed max-w-xl">
            Already a Desh Chat user?{" "}
            <Link to="/auth/login" className="underline font-bold hover:text-white text-black transition">
              Sign in
            </Link>{" "}
            to personalize your support experience. <br />
            If you can’t sign in, feel free to contact us — we’re here to help.
          </p>
        </div>

        {/* image absolute  */}
        <div className="hidden md:block"></div>
      </div>
    </div>
  </section>

  {/* card */}
  <section className="py-16 bg-gray-50 relative">
    <div className="max-w-7xl mx-auto px-4 md:px-16">
      <div className="grid md:grid-cols-2 gap-12 items-start">
        
        
        <div className="p-10 md:p-14 bg-gray-50 rounded-3xl shadow-xl border border-gray-100 -mt-32 relative z-20">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Get answers quickly
          </h2>
          <p className="text-xl text-gray-600 mb-10 leading-relaxed">
            For a faster response, ask <strong>Desh Chat Assistant</strong> — an AI agent that can answer your support questions instantly.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
             <Link
                        to="/about"
                        className="relative isolate overflow-hidden px-6 py-3 rounded-2xl text-white bg-primary group cursor-pointer"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          <ArrowRight size={20} /> Ask AI
                        </span>
            
                        {/* Background overlay */}
                        <span className="absolute inset-0 bg-secondary -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out rounded-2xl"></span>
                      </Link>
          

            <Link
                        to="/about"
                        className="relative isolate overflow-hidden px-6 py-3 rounded-2xl text-white bg-primary group cursor-pointer"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          <ArrowRight size={20} /> Contact Support
                        </span>
            
                        {/* Background overlay */}
                        <span className="absolute inset-0 bg-secondary -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out rounded-2xl"></span>
                      </Link>
            
          </div>
        </div>

        {/* Right Side iamge section */}
        
       <div className="hidden md:block relative h-full">
  
  <div className="relative -mt-48 z-30 h-[650px] w-full">
    
    
    <img 
      src={img1} 
      className="absolute top-0 left-5 w-36 h-36 rounded-full border-4 border-white shadow-2xl object-cover z-30 transition-transform hover:scale-105" 
      alt="User 1" 
    />
    
    
    <img 
      src={img2} 
      className="absolute  right-0 w-60 h-60 rounded-full border-4 border-white shadow-2xl object-cover z-20 transition-transform hover:scale-105" 
      alt="User 2" 
    />
    
   
    <img 
      src={img3} 
      className="absolute top-50 left-10 w-40 h-40 rounded-full border-4 border-white shadow-2xl object-cover z-30 transition-transform hover:scale-105" 
      alt="User 3" 
    />

    
    <img 
      src={img4} 
      className="absolute top-60 right-8 w-50 h-50 rounded-full border-4 border-white shadow-2xl object-cover z-10 transition-transform hover:scale-105" 
      alt="User 4" 
    />
    
  </div>
</div>

      </div>
    </div>
  </section>

{/* email esction lift side*/}

<section className="py-16 bg-gray-50 relative z-40 -mt-24"> 
  <div className="max-w-7xl mx-auto px-4 md:px-16">
    
    <div className="grid md:grid-cols-2 gap-12 items-start">
      
   
      <div className="bg-white p-10 rounded-xl border border-gray-200 shadow-sm">
        <h2 className="text-3xl font-black text-[#1d1c1d] mb-8">
          Send Us a Message
        </h2>

        <form className="space-y-6">
          <div>
            <label className="block mb-2 font-bold text-[#1d1c1d]">Full Name</label>
            <input 
              type="text" 
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
              placeholder="Your name"
            />
          </div>

          <div>
            <label className="block mb-2 font-bold text-[#1d1c1d]">Email</label>
            <input 
              type="email" 
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
              placeholder="Your email"
            />
          </div>

          <div>
            <label className="block mb-2 font-bold text-[#1d1c1d]">Message</label>
            <textarea 
              rows="5"
              className="w-full border border-gray-300 rounded-md px-4 py-3 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
              placeholder="How can we help?"
            ></textarea>
          </div>

          <button className="w-full bg-primary text-white py-4 rounded-md font-bold text-sm uppercase tracking-widest hover:bg-black shadow-md transition-all active:scale-95">
            Send Message
          </button>
          
        </form>
      </div>

      {/* right side contect */}
      <div className="space-y-4 md:pt-4">
        <h2 className="text-3xl font-black text-[#1d1c1d] mb-8">Contact Info</h2>
        
        <div className="bg-white p-6 rounded-lg border border-gray-200 flex items-center gap-6 hover:shadow-md transition">
          <div className="bg-green-100 p-4 rounded-full text-green-700">
             <Mail size={24} />
          </div>
          <div>
            <h3 className="font-bold text-[#1d1c1d]">Email</h3>
            <p className="text-[#454545]">support@deshchat.com</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 flex items-center gap-6 hover:shadow-md transition">
          <div className="bg-purple-100 p-4 rounded-full text-purple-700">
             <Phone size={24} />
          </div>
          <div>
            <h3 className="font-bold text-[#1d1c1d]">Phone</h3>
            <p className="text-[#454545]">+880 1234-567890</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200 flex items-center gap-6 hover:shadow-md transition">
          <div className="bg-blue-100 p-4 rounded-full text-blue-700">
             <MapPin size={24} />
          </div>
          <div>
            <h3 className="font-bold text-[#1d1c1d]">Location</h3>
            <p className="text-[#454545]">Gazipur, Dhaka, Bangladesh</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</section>


{/*  FAQ */}
<section className="py-24 bg-gray-50"> 
  <div className="max-w-4xl mx-auto px-6">
   
    <div className="mb-12">
      <h2 className="text-4xl font-black text-[#1d1c1d] mb-4">
        Frequently Asked Questions?
      </h2>
     
    </div>
{/** all q */}
    <div className="space-y-4">
      
      <div className="group bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300">
        <div className="flex justify-between items-center cursor-pointer">
          <h4 className="text-xl font-bold text-[#1d1c1d] group-hover:text-primary transition-colors">
            How long does it take to respond?
          </h4>
          <span className="text-2xl text-gray-400 group-hover:rotate-45 transition-transform duration-300">+</span>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-gray-600 text-lg leading-relaxed">
            We usually respond within **24 hours**. Our dedicated support team works around the clock to ensure your queries are handled as quickly as possible.
          </p>
        </div>
      </div>

      
      <div className="group bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300">
        <div className="flex justify-between items-center cursor-pointer">
          <h4 className="text-xl font-bold text-[#1d1c1d] group-hover:text-primary transition-colors">
            Can I get live support?
          </h4>
          <span className="text-2xl text-gray-400 group-hover:rotate-45 transition-transform duration-300">+</span>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-gray-600 text-lg leading-relaxed">
            Yes! You can use our **Desh Chat AI Assistant** for instant replies. For complex issues, you can always transition to a human agent during business hours.
          </p>
        </div>
      </div>

      
      <div className="group bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300">
        <div className="flex justify-between items-center cursor-pointer">
          <h4 className="text-xl font-bold text-[#1d1c1d] group-hover:text-primary transition-colors">
            Is my data safe during support chats?
          </h4>
          <span className="text-2xl text-gray-400 group-hover:rotate-45 transition-transform duration-300">+</span>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-gray-600 text-lg leading-relaxed">
            Security is our priority. All support interactions are protected with the same **end-to-end encryption** used in our messaging platform.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
  
</div>
    );
};

export default Contact;