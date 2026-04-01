import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { Facebook, Github, Mail } from "lucide-react";
import Logo from "./Logo";
import toast from "react-hot-toast";

const Footer = () => {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const sectionRef = useRef(null);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
    { name: "Privacy", path: "/privacy" },
  ];

  const appPlatforms = [
    { name: "Android" },
    { name: "iPhone" },
    { name: "Mac/PC" },
    { name: "Web Browser" },
  ];

  const contactInfo = [
    { icon: Mail, text: "support@dashchat.com", href: "mailto:support@dashchat.com" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/somrat350/", label: "Facebook" },
    { icon: Github, href: "https://github.com/somrat350/Dash-Chat", label: "GitHub" },
  ];

  const handleSend = () => {
    if (message.trim() && email.trim()) {
      toast.success("Thank you! We'll get back to you soon.");
      setMessage("");
      setEmail("");
    } else if (!email.trim()) {
      toast.error("Please enter your email");
    } else {
      toast.error("Please enter a message");
    }
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set("[data-footer-section]", { opacity: 1 });
      
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        "[data-footer-section]",
        { y: 34, scale: 0.97 },
        { y: 0, scale: 1, duration: 0.5, stagger: 0.1 }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={sectionRef}
      role="contentinfo"
      className="relative mt-8 sm:mt-12 border-t-2 border-primary/30 bg-gradient-to-b from-base-100 to-base-100/80 shadow-lg rounded-t-2xl py-6 px-4 sm:px-6 lg:px-8"
    >
      {/* Background Elements */}
      <div className="pointer-events-none absolute -left-16 top-10 h-32 w-32 sm:h-40 sm:w-40 rounded-full bg-primary/10 blur-2xl" />
      <div className="pointer-events-none absolute -right-12 bottom-0 h-32 w-32 sm:h-40 sm:w-40 rounded-full bg-info/10 blur-2xl" />
      
      <div className="relative mx-auto max-w-7xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-8">
          {/* Brand */}
          <div
            data-footer-section
            className="flex flex-col gap-2 items-center sm:items-start text-center sm:text-left"
          >
            <div className="transition-transform duration-300 hover:scale-105">
              <Logo />
            </div>
            <p className="text-base-content/70 text-sm leading-relaxed max-w-xs sm:max-w-full">
              Connect instantly with friends and family. Simple, reliable, secure.
            </p>
            <div className="flex gap-4 mt-1">
              {socialLinks.map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target={social.href.startsWith("http") ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className="text-base-content/60 hover:text-primary transition-all duration-300 hover:scale-110 hover:-translate-y-0.5"
                  aria-label={social.label}
                >
                  <social.icon size={22} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div
            data-footer-section
            className="flex flex-col gap-2 items-center sm:items-start text-center sm:text-left"
          >
            <h3 className="text-primary font-bold text-lg">Quick Links</h3>
            <ul className="flex flex-col gap-2 items-center sm:items-start">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.path}
                    className="text-base-content/70 hover:text-primary transition-all duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-1.5 h-1.5 bg-primary rounded-full transition-all duration-300"></span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Use Chat App */}
          <div
            data-footer-section
            className="flex flex-col gap-2 items-center sm:items-start text-center sm:text-left"
          >
            <h3 className="text-primary font-bold text-lg">Use Chat App</h3>
            <ul className="flex flex-col gap-2 items-center sm:items-start">
              {appPlatforms.map((platform) => (
                <li key={platform.name}>
                  <a
                    href="#"
                    className="text-base-content/70 hover:text-primary transition-all duration-300 text-sm flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-1.5 h-1.5 bg-primary rounded-full transition-all duration-300"></span>
                    {platform.name}
                  </a>
                </li>
              ))}
            </ul>
            <div className="pt-3 mt-2 border-t border-base-300 w-full">
              {contactInfo.map((info, idx) => (
                <a
                  key={idx}
                  href={info.href}
                  className="flex items-center justify-center sm:justify-start gap-2 text-base-content/70 hover:text-primary transition-colors duration-300 text-sm group"
                >
                  <info.icon size={14} className="group-hover:scale-110 transition-transform" />
                  <span>{info.text}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div
            data-footer-section
            className="flex flex-col gap-2"
          >
            <h3 className="text-primary font-bold text-lg text-center sm:text-left">Send Message</h3>
            <p className="text-base-content/70 text-sm text-center sm:text-left">
              Have questions or feedback?
            </p>
            <div className="flex flex-col gap-2.5">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full px-4 py-2.5 rounded-xl border border-base-300 bg-base-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-base-content placeholder-base-content/50 transition-all duration-300 text-sm"
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your message"
                rows="2"
                className="w-full px-4 py-2.5 rounded-xl border border-base-300 bg-base-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-base-content placeholder-base-content/50 transition-all duration-300 text-sm resize-none"
              />
              <button
                onClick={handleSend}
                className="bg-primary hover:bg-primary/90 text-white px-4 py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-0.5 w-full group text-sm font-medium"
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
         {/* Copyright */}
        <div className="mt-8 pt-5 border-t border-base-300">
          <p className="text-base-content/60 text-sm text-center">
            &copy; {new Date().getFullYear()} DashChat. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;