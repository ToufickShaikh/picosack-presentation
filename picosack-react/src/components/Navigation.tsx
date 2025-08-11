import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  { id: 'performance', label: 'Performance', icon: '📊' },
  { id: 'products', label: 'Products', icon: '📱' },
  { id: 'funding', label: 'Funding', icon: '💼' },
  { id: 'cta', label: 'Contact', icon: '📞' },
];

const Navigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showQRScanner, setShowQRScanner] = useState(false);

  useEffect(() => {
    let ticking = false;

    const measure = () => {
      const scrolled = window.scrollY > 100;
      setIsScrolled(prev => (prev !== scrolled ? scrolled : prev));

      const sections = navItems.map(item => ({
        id: item.id,
        element: document.getElementById(item.id),
      }));

      let current: string | null = null;
      for (const section of sections) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= 110 && rect.bottom > 110) {
            current = section.id;
            break;
          }
        }
      }
      if (current) setActiveSection(prev => (prev !== current ? current! : prev));
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(measure);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    measure();
    return () => window.removeEventListener('scroll', onScroll as any);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      setIsMobileMenuOpen(false);
    }
  };

  const handleWiFiDemo = () => {
    alert('🛜 Connecting to PicoSack-Demo WiFi...\n📱 Demo menu will load automatically!');
    setShowQRScanner(true);
  };

  const openQRScanner = () => {
    window.open('https://picosack.netlify.app/', '_blank');
    setShowQRScanner(false);
  };

  return (
    <>
      <motion.nav
        className={`modern-nav ${isScrolled ? 'scrolled' : ''}`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
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

        <div className="nav-sections desktop-nav">
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

        <motion.button
          className="wifi-demo-btn"
          onClick={handleWiFiDemo}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="wifi-icon">📡</span>
          <span className="wifi-text">Demo WiFi</span>
        </motion.button>

        <motion.button
          className="mobile-menu-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          whileTap={{ scale: 0.95 }}
        >
          <div className={`hamburger ${isMobileMenuOpen ? 'active' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </motion.button>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="mobile-menu-content">
              {navItems.map((item) => (
                <motion.button
                  key={item.id}
                  className={`mobile-nav-item ${activeSection === item.id ? 'active' : ''}`}
                  onClick={() => scrollToSection(item.id)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-text">{item.label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showQRScanner && (
          <motion.div
            className="qr-scanner-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowQRScanner(false)}
          >
            <motion.div
              className="qr-scanner-content"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="qr-header">
                <h3>📱 Scan QR Code for Demo</h3>
                <button onClick={() => setShowQRScanner(false)}>✕</button>
              </div>
              <div className="qr-code">
                <div className="qr-grid">
                  {[...Array(25)].map((_, i) => (
                    <div
                      key={i}
                      className={`qr-dot ${Math.random() > 0.5 ? 'filled' : ''}`}
                    />
                  ))}
                </div>
              </div>
              <p>Scan to open PicoSack Digital Menu Demo</p>
              <motion.button
                className="demo-button"
                onClick={openQRScanner}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                🌐 Open Demo Website
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
