import React from 'react';
import { LanguageProvider } from './context/LanguageContext';
import LoadingScreen from './components/LoadingScreen';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Programs from './components/Programs';
import Stats from './components/Stats';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import Registration from './components/Registration';
import Footer from './components/Footer';
import FloatingWidgets from './components/FloatingWidgets';

function AppContent() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/20 antialiased overflow-x-hidden">
      {/* Playful Splash Loading Screen */}
      <LoadingScreen />
      
      {/* Sticky Header Navigation */}
      <Navbar />
      
      {/* Main Landing Sections */}
      <main className="flex-grow">
        {/* Welcoming Hero banner */}
        <Hero />
        
        {/* About vision & pillars */}
        <About />
        
        {/* Kindergarten educational Programs */}
        <Programs />
        
        {/* Animated statistics counters */}
        <Stats />
        
        {/* Parents reviews and testimonials */}
        <Testimonials />
        
        {/* Frequently Asked Questions */}
        <FAQ />
        
        {/* Registration form request with Confetti */}
        <Registration />
      </main>
      
      {/* Footer copyright and quick links */}
      <Footer />
      
      {/* Floating utility shortcuts */}
      <FloatingWidgets />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
