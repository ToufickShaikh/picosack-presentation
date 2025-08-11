import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './HeroSection.css';

const HeroSection: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="hero-section" ref={ref}>
      <div className="hero-background">
        <div className="hero-grid"></div>
        <div className="floating-elements">
          <motion.div
            className="float-element float-1"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut" as const,
            }}
          />
          <motion.div
            className="float-element float-2"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut" as const,
              delay: 2,
            }}
          />
          <motion.div
            className="float-element float-3"
            animate={{
              y: [0, -20, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut" as const,
              delay: 4,
            }}
          />
        </div>
      </div>

      <div className="container">
        <motion.div
          className="hero-container"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
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
                <motion.div
                  className="stat-number"
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 }}
                >
                  ₹1,500
                </motion.div>
                <div className="stat-label">Starting Price</div>
              </div>
              <div className="stat-item">
                <motion.div
                  className="stat-number"
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.6, delay: 1 }}
                >
                  0
                </motion.div>
                <div className="stat-label">App Downloads</div>
              </div>
              <div className="stat-item">
                <motion.div
                  className="stat-number"
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.6, delay: 1.2 }}
                >
                  100%
                </motion.div>
                <div className="stat-label">Offline Ready</div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="hero-actions">
              <motion.button
                className="btn btn-primary"
                onClick={() => scrollToSection('problem')}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Explore Solution</span>
                <span className="btn-icon">�</span>
              </motion.button>
              <motion.button
                className="btn btn-secondary"
                onClick={() => scrollToSection('cta')}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Contact Us</span>
                <span className="btn-icon">�</span>
              </motion.button>
            </motion.div>
          </div>

          <motion.div
            variants={itemVariants}
            className="hero-showcase"
          >
            <motion.div
              className="device-mockup"
              initial={{ rotateY: -15, scale: 0.8 }}
              animate={inView ? { rotateY: -15, scale: 1 } : { rotateY: -15, scale: 0.8 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              whileHover={{ scale: 1.05, rotateY: -10 }}
            >
              <div className="device-frame">
                <div className="device-screen">
                  <img src="/pico-bg.png" alt="PicoSack Device Interface" className="device-image" />
                  <div className="screen-overlay">
                    <div className="interface-elements">
                      <div className="menu-items">
                        <motion.div
                          className="menu-item"
                          initial={{ x: -20, opacity: 0 }}
                          animate={inView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
                          transition={{ duration: 0.4, delay: 1.2 }}
                        >
                          📋 Digital Menu
                        </motion.div>
                        <motion.div
                          className="menu-item"
                          initial={{ x: -20, opacity: 0 }}
                          animate={inView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
                          transition={{ duration: 0.4, delay: 1.4 }}
                        >
                          🛒 Quick Order
                        </motion.div>
                        <motion.div
                          className="menu-item"
                          initial={{ x: -20, opacity: 0 }}
                          animate={inView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
                          transition={{ duration: 0.4, delay: 1.6 }}
                        >
                          💳 Payment
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="device-glow"></div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
