import ChatBubble from "../../components/public/home/ChatBubble";
import Hero from "../../components/public/home/Hero";
import HowItWorks from "../../components/public/home/HowItWorks";
import Testimonials from "../../components/public/home/Testimonials";
import WhyChooseUs from "../../components/public/home/WhyChooseUs";
import FAQ from "../../components/public/home/FAQ";
import Pricing from "../../components/public/home/Pricing";
import CTABanner from "../../components/public/home/CTABanner";
import ChatFeatures from "../../components/public/home/ChatFeatures";

const Home = () => {
  return (
    <>
      <Hero />
      <ChatBubble />
      <ChatFeatures />
      <WhyChooseUs />
      <HowItWorks />
      <Testimonials />
      <FAQ />
      <Pricing />
      <CTABanner />
    </>
  );
};

export default Home;
