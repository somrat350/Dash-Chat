import React from 'react';
import Hero from '../LandingPage/Hero/Hero';
import ChatFeatures from './../LandingPage/ChatFeatures/ChatFeatures';
import WhyChooseUs from '../LandingPage/WhyChooseUs/WhyChooseUs';
import ChatBubble from './../LandingPage/ChatBubble/ChatBubble';
import HowItWorks from '../LandingPage/HowItWorks/HowItWorks';
import Testimonials from '../LandingPage/Testimonials/Testimonials';

const Home = () => {
    return (
        <div >
            <section> 
                <Hero></Hero>
            </section>
            <section> 
                <ChatBubble></ChatBubble>
            </section>
            <section> 
                <ChatFeatures></ChatFeatures>
            </section>
            <section> 
                <WhyChooseUs></WhyChooseUs>
            </section>
            <section> 
                <HowItWorks></HowItWorks>
            </section>
            <section> 
                <Testimonials></Testimonials>
            </section>
        </div>
    );
};

export default Home;