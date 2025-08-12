import React from 'react';
import './App.css';
import HeroSection from './components/HeroSection';
import ProblemSection from './components/ProblemSection';
import CompetitorSection from './components/CompetitorSection';
import TechSection from './components/TechSection';
import PerformanceSection from './components/PerformanceSection';
import ProductSection from './components/ProductSection';
import FundingSection from './components/FundingSection';
import CTASection from './components/CTASection';
import ProgressBar from './components/ProgressBar';
import SideNav from './components/SideNav';

function App() {
  return (
    <div className="App">
      <ProgressBar />
      <SideNav />
      <main>
        <HeroSection />
        <ProblemSection />
        <CompetitorSection />
        <TechSection />
        <PerformanceSection />
        <ProductSection />
        <FundingSection />
        <CTASection />
      </main>
    </div>
  );
}

export default App;
