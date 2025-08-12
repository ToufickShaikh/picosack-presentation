import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './HeroSection.css';

const HeroSection: React.FC = () => {
  const pngUrl = `${process.env.PUBLIC_URL ?? ''}/qr.png?v=1`;
  const svgUrl = `${process.env.PUBLIC_URL ?? ''}/qr.svg?v=1`;
  const demoUrl = 'https://picosack.netlify.app/';
  const pngGenerated = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(demoUrl)}`;

  const [pngFailed, setPngFailed] = useState(false);
  const [svgMarkup, setSvgMarkup] = useState<string | null>(null);
  const [svgFailed, setSvgFailed] = useState(false);

  useEffect(() => {
    if (!pngFailed) return; // only try SVG if PNG failed
    let cancelled = false;
    fetch(svgUrl, { cache: 'no-store' })
      .then(async (res) => {
        if (!res.ok) throw new Error('QR SVG load failed');
        const text = await res.text();
        if (!cancelled) setSvgMarkup(text);
      })
      .catch(() => { if (!cancelled) setSvgFailed(true); });
    return () => { cancelled = true; };
  }, [pngFailed, svgUrl]);

  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.6, staggerChildren: 0.2 } } };
  const itemVariants = { hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' as const } } };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) section.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero-section" ref={ref}>
      <div className="hero-background">
        <div className="hero-grid"></div>
        <div className="floating-elements">
          <motion.div className="float-element float-1" animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' as const }} />
          <motion.div className="float-element float-2" animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' as const, delay: 2 }} />
          <motion.div className="float-element float-3" animate={{ y: [0, -20, 0], rotate: [0, 180, 360] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' as const, delay: 4 }} />
        </div>
      </div>

      <div className="container">
        <motion.div className="hero-container" variants={containerVariants} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          <div className="hero-content">
            <motion.div variants={itemVariants} className="hero-badge">
              <span className="badge-icon">🚀</span>
              <span>Zero-App Smart Information Hub</span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="hero-title">
              <span className="title-highlight">PicoSack</span>
              <span className="title-main">The Zero-App Smart Information Hub</span>
              <span className="title-subtitle">Empowering India's MSMEs with frictionless digital transformation</span>
            </motion.h1>

            <motion.p variants={itemVariants} className="hero-description">
              Transforming 63 million businesses with our innovative captive portal technology. 
              No app downloads, no internet dependency - just instant digital menu access and seamless ordering.
            </motion.p>

            <motion.div variants={itemVariants} className="hero-stats">
              <div className="stat-item">
                <motion.div className="stat-number" initial={{ scale: 0 }} animate={inView ? { scale: 1 } : { scale: 0 }} transition={{ duration: 0.6, delay: 0.8 }}>₹1,500</motion.div>
                <div className="stat-label">Starting Price</div>
              </div>
              <div className="stat-item">
                <motion.div className="stat-number" initial={{ scale: 0 }} animate={inView ? { scale: 1 } : { scale: 0 }} transition={{ duration: 0.6, delay: 1 }}>0</motion.div>
                <div className="stat-label">App Downloads</div>
              </div>
              <div className="stat-item">
                <motion.div className="stat-number" initial={{ scale: 0 }} animate={inView ? { scale: 1 } : { scale: 0 }} transition={{ duration: 0.6, delay: 1.2 }}>100%</motion.div>
                <div className="stat-label">Offline Ready</div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="hero-actions">
              <motion.button className="btn btn-primary" onClick={() => scrollToSection('problem')} whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                <span>Explore Solution</span>
                <span className="btn-icon">➡️</span>
              </motion.button>
              <motion.button className="btn btn-secondary" onClick={() => scrollToSection('cta')} whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                <span>Contact Us</span>
                <span className="btn-icon">📞</span>
              </motion.button>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="hero-showcase">
            {/* New simplified QR card, always visible */}
            <motion.div className="qr-card" initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }} transition={{ duration: 0.6, delay: 0.4 }}>
              <div className="qr-card-header">Website Demo</div>
              <div className="qr-card-body">
                {!pngFailed ? (
                  <img src={pngUrl} onError={() => setPngFailed(true)} alt="PicoSack Website QR (PNG)" className="qr-image" width={280} height={280} loading="eager" decoding="async" />
                ) : svgMarkup && !svgFailed ? (
                  <div className="qr-svg" dangerouslySetInnerHTML={{ __html: svgMarkup }} aria-label="PicoSack Website QR (SVG)" />
                ) : (
                  <img src={pngGenerated} alt="PicoSack Website QR (Generated)" className="qr-image" width={280} height={280} loading="eager" decoding="async" />
                )}
              </div>
              <div className="qr-card-footer">
                <div className="qr-caption">Scan or</div>
                <a className="btn btn-tertiary" href={demoUrl} target="_blank" rel="noreferrer">Open Website</a>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
