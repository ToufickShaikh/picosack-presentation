import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [open, setOpen] = useState(false);

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

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('keydown', onKey);
    measure();
    return () => {
      window.removeEventListener('scroll', onScroll as any);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setOpen(false);
    }
  };

  return (
    <>
      {/* Desktop right-side text nav */}
      <nav className="side-nav text-nav" aria-label="Section navigation">
        {navItems.map(item => (
          <motion.button
            key={item.id}
            className={`side-nav-item ${active === item.id ? 'active' : ''}`}
            onClick={() => scrollTo(item.id)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            aria-label={item.label}
            aria-current={active === item.id ? 'page' : undefined}
          >
            <span className="item-icon" aria-hidden>{item.icon}</span>
            <span className="item-label">{item.label}</span>
          </motion.button>
        ))}
      </nav>

      {/* Mobile hamburger button */}
      <button
        className="hamburger-btn"
        aria-label="Open navigation"
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}
      >
        <span className={`bar ${open ? 'open' : ''}`}></span>
        <span className={`bar ${open ? 'open' : ''}`}></span>
        <span className={`bar ${open ? 'open' : ''}`}></span>
      </button>

      {/* Slide-up mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-drawer"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'tween', duration: 0.25 }}
          >
            <div className="drawer-handle" onClick={() => setOpen(false)} />
            <div className="drawer-items">
              {navItems.map(item => (
                <button
                  key={item.id}
                  className={`drawer-item ${active === item.id ? 'active' : ''}`}
                  onClick={() => scrollTo(item.id)}
                  aria-label={item.label}
                >
                  <span className="item-icon" aria-hidden>{item.icon}</span>
                  <span className="item-label">{item.label}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SideNav;
