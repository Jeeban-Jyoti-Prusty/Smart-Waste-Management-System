import React from 'react'
import Navbar from '../components/layout/Navbar';
import HeroSection from '../components/home/HeroSection';
import Features from '../components/home/Features';
import Footer from '../components/layout/Footer';

const Home = () => {
    return (
        <>
            <Navbar />
            <HeroSection />
            <Features />
            <Footer />
        </>
    )
}

export default Home;