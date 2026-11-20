import React from 'react'
import Navbar from '../components/layout/Navbar';
import AboutHero from '../components/aboutpage/AboutHero';
import MissionVision from '../components/aboutpage/MissionVision';
import WhyChoose from '../components/aboutpage/WhyChoose';
import ReportWasteCTA from '../components/aboutpage/ReportWasteCTA';
import Footer from '../components/layout/Footer';

const AboutPage = () => {
    return (
        <div >
            <Navbar />
            <AboutHero />
            <MissionVision />
            <WhyChoose />
            <ReportWasteCTA />
            <Footer />
        </div>
    )
}

export default AboutPage;