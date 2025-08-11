import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './Navigation.css';

interface NavItem {
  id: string;
  label: string;
  icon: string;
}

const navItems: NavItem[] = [
  { id: 'hero', label: 'Home', icon: '🏠' },
  { id: 'problem', label: 'Problem', icon: '⚡' },
  { id: 'competitors', label: 'Competitors', icon: '🏆' },
  { id: 'tech', label: 'Tech', icon: '⚙️' },
  { id: 'performance', label: 'Performance', icon: '�' },
  { id: 'products', label: 'Products', icon: '�' },
  { id: 'funding', label: 'Funding', icon: '💼' },
  { id: 'cta', label: 'Contact', icon: '📞' },
];

const Navigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);

      // Update active section based on scroll position
      const sections = navItems.map(item => ({
        id: item.id,
        element: document.getElementById(item.id),
      }));

      const currentSection = sections.find(section => {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom > 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveSection(currentSection.id);
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <motion.nav
      className={`modern-nav ${isScrolled ? 'scrolled' : ''}`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" as const }}
    >
      <div className="nav-brand">
        <div className="brand-icon">
          <div className="icon-layers">
            <motion.div
              className="layer layer-1"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <motion.div
              className="layer layer-2"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
            />
            <motion.div
              className="layer layer-3"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
            />
          </div>
        </div>
        <span className="brand-text">PicoSack</span>
      </div>

      <div className="nav-sections">
        {navItems.map((item) => (
          <motion.button
            key={item.id}
            className={`nav-item ${activeSection === item.id ? 'active' : ''}`}
            onClick={() => scrollToSection(item.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="nav-icon">{item.icon}</span>
            <span className="nav-text">{item.label}</span>
          </motion.button>
        ))}
      </div>
    </motion.nav>
  );
};

export default Navigation;
