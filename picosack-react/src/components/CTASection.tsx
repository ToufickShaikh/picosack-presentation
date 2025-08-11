import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './CTASection.css';

const CTASection: React.FC = () => {
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

  const buttonVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section id="cta" className="cta-section" ref={ref}>
      <div className="cta-background">
        <div className="gradient-overlay"></div>
        <div className="floating-particles">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="particle"
              animate={{
                y: [0, -100, 0],
                x: [0, Math.random() * 100 - 50, 0],
                opacity: [0.3, 1, 0.3],
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 4,
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>
      </div>

      <div className="container">
        <motion.div
          className="cta-container"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div variants={itemVariants} className="cta-content">
            <motion.h1 
              className="cta-title"
              animate={inView ? {
                textShadow: [
                  "0 0 5px rgba(255,255,255,0.5)",
                  "0 0 15px rgba(255,255,255,0.8), 0 0 20px rgba(255,107,53,0.6)",
                  "0 0 5px rgba(255,255,255,0.5)"
                ]
              } : {}}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              Ready to Transform MSME Digitization?
            </motion.h1>

            <motion.p variants={itemVariants} className="cta-description">
              We're seeking ₹4 lakhs to launch our pilot program in Chennai
            </motion.p>

            <motion.div variants={itemVariants} className="cta-stats">
              <div className="stat-item">
                <div className="stat-value">₹4L</div>
                <div className="stat-label">Total Investment</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">18 weeks</div>
                <div className="stat-label">To Market</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">₹50L</div>
                <div className="stat-label">Year 1 Revenue</div>
              </div>
            </motion.div>

            <motion.div variants={buttonVariants} className="cta-actions">
              <motion.button
                className="btn btn-primary pulse-animation"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  boxShadow: [
                    "0 0 0 0 rgba(255, 107, 53, 0.7)",
                    "0 0 0 15px rgba(255, 107, 53, 0)",
                    "0 0 0 0 rgba(255, 107, 53, 0.7)"
                  ],
                  scale: [1, 1.05, 1]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <span>Invest Now</span>
                <span className="btn-icon">💰</span>
              </motion.button>

              <motion.button
                className="btn btn-outline"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Request Demo</span>
                <span className="btn-icon">🚀</span>
              </motion.button>
            </motion.div>

            <motion.div variants={itemVariants} className="contact-info">
              <p className="contact-text">Contact us for detailed business plan</p>
              <div className="contact-details">
                <div className="contact-item">
                  <span className="contact-label">Email:</span>
                  <span className="contact-value">contact@picosack.in</span>
                </div>
                <div className="contact-item">
                  <span className="contact-label">Phone:</span>
                  <span className="contact-value">+91 XXXXX XXXXX</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            variants={itemVariants}
            className="cta-visual"
          >
            <motion.div
              className="success-visualization"
              animate={{
                scale: [1, 1.05, 1],
                rotateY: [0, 5, -5, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="visualization-container">
                <div className="growth-metrics">
                  <h4 className="metrics-title">Growth Projection</h4>
                  
                  <div className="metrics-grid">
                    <motion.div 
                      className="metric-card"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                    >
                      <div className="metric-icon">📈</div>
                      <div className="metric-value">₹50L</div>
                      <div className="metric-label">Year 1 Revenue</div>
                    </motion.div>
                    
                    <motion.div 
                      className="metric-card"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ delay: 0.7, duration: 0.6 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                    >
                      <div className="metric-icon">🎯</div>
                      <div className="metric-value">800</div>
                      <div className="metric-label">Breakeven Units</div>
                    </motion.div>
                    
                    <motion.div 
                      className="metric-card"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                      transition={{ delay: 0.9, duration: 0.6 }}
                      whileHover={{ scale: 1.05, y: -5 }}
                    >
                      <div className="metric-icon">🚀</div>
                      <div className="metric-value">18wk</div>
                      <div className="metric-label">To Market</div>
                    </motion.div>
                  </div>
                </div>

                <div className="chart-showcase">
                  <div className="growth-chart">
                    <motion.div 
                      className="chart-bar quarter-1"
                      initial={{ scaleY: 0 }}
                      animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
                      transition={{ duration: 1, delay: 1.2 }}
                    />
                    <motion.div 
                      className="chart-bar quarter-2"
                      initial={{ scaleY: 0 }}
                      animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
                      transition={{ duration: 1, delay: 1.4 }}
                    />
                    <motion.div 
                      className="chart-bar quarter-3"
                      initial={{ scaleY: 0 }}
                      animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
                      transition={{ duration: 1, delay: 1.6 }}
                    />
                    <motion.div 
                      className="chart-bar quarter-4 highlight-bar"
                      initial={{ scaleY: 0 }}
                      animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
                      transition={{ duration: 1, delay: 1.8 }}
                    />
                    
                    <div className="chart-labels">
                      <span>Q1</span>
                      <span>Q2</span>
                      <span>Q3</span>
                      <span>Q4</span>
                    </div>
                  </div>
                  
                  <div className="chart-legend">
                    <motion.div 
                      className="legend-item"
                      initial={{ opacity: 0, x: 20 }}
                      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                      transition={{ delay: 2, duration: 0.5 }}
                    >
                      <div className="legend-dot success"></div>
                      <span>Revenue Growth Target</span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
