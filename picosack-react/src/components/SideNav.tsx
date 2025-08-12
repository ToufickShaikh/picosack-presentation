import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './SideNav.css';

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

const SideNav: React.FC = () => {
  const [active, setActive] = useState<string>('hero');

  useEffect(() => {
    let ticking = false;

    const measure = () => {
      const sections = navItems.map(item => ({ id: item.id, el: document.getElementById(item.id) }));
      for (const s of sections) {
        if (!s.el) continue;
        const r = s.el.getBoundingClientRect();
        // Consider section active when its top is near viewport top
        if (r.top <= window.innerHeight * 0.35 && r.bottom > window.innerHeight * 0.35) {
          setActive(prev => (prev !== s.id ? s.id : prev));
          break;
        }
      }
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

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <nav className="side-nav" aria-label="Section navigation">
      {navItems.map(item => (
        <motion.button
          key={item.id}
          className={`side-nav-item ${active === item.id ? 'active' : ''}`}
          onClick={() => scrollTo(item.id)}
          title={item.label}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label={item.label}
          aria-current={active === item.id ? 'page' : undefined}
        >
          <span className="dot" />
          <span className="side-nav-tooltip">
            <span className="tip-icon" aria-hidden>{item.icon}</span>
            <span className="tip-text">{item.label}</span>
          </span>
        </motion.button>
      ))}
    </nav>
  );
};

export default SideNav;
