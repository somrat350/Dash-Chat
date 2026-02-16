import React from "react";
import BannerImg from "../../../assets/Hero-image.jpg";
import { ArrowRight, MessageCircle } from "lucide-react";

const Hero = () => {
  return (
    <div className="relative w-full">
      {/* Image */}
      <img
        src={BannerImg}
        alt="Hero Banner"
        className="w-full h-[600px] object-cover rounded-3xl"
      />

      {/* Overlay */}
      <div className="absolute inset-0 flex flex-col justify-center bg-black/40 rounded-3xl px-4">
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-extrabold leading-tight text-white
"
        >
          <span className="block">Message</span>
          <span className="block text-primary">Privately</span>
        </h1>

        <p className="mt-4 text-white text-lg max-w-xl">
          Discover amazing content and connect with others. <br />
          Simple, Reliable, private messaging and <br />
          calling for free, available all over the world.
        </p>

        {/* Buttons */}
        <div className="mt-14 flex gap-4">
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
              Log In
            </span>

            {/* Background overlay */}
            <span className="absolute inset-0 bg-secondary -translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out rounded-2xl"></span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
