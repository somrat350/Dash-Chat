import ChatBubble from "../../components/public/home/ChatBubble";
import ChatFeatures from "../../components/public/home/ChatFeatures";
import Hero from "../../components/public/home/Hero";
import HowItWorks from "../../components/public/home/HowItWorks";
import Testimonials from "../../components/public/home/Testimonials";
import WhyChooseUs from "../../components/public/home/WhyChooseUs";

const Home = () => {
  return (
    <>
      <Hero />
      <ChatBubble />
      <ChatFeatures />
      <WhyChooseUs />
      <HowItWorks />
      <Testimonials />
    </>
  );
};

export default Home;
