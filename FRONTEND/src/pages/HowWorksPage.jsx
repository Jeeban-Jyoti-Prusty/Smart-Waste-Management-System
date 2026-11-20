import React from 'react'
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import WorksHero from '../components/howitworks/WorksHero';
import StepProcess from '../components/howitworks/StepProcess';
import WhyMatter from '../components/howitworks/WhyMatter';
import SmallImpactCTA from '../components/howitworks/SmallImpactCTA';

const HowWorksPage = () => {
    return (
        <div>
            <Navbar />
            <WorksHero />
            <StepProcess />
            <WhyMatter />
            <SmallImpactCTA />
            <Footer />
        </div>
    )
}

export default HowWorksPage;