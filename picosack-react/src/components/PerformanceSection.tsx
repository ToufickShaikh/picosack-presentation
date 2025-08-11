import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './PerformanceSection.css';

const PerformanceSection: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

  return (
    <section id="performance" className="performance-section" ref={ref}>
      <div className="container">
        <motion.div
          className="performance-container"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div variants={itemVariants} className="section-header">
            <h2 className="section-title">Performance Benchmarks</h2>
            <p className="section-description">
              Real-world performance metrics that matter for business success
            </p>
          </motion.div>

          <div className="performance-grid">
            <motion.div variants={itemVariants} className="performance-chart">
              <div className="chart-container">
                <div className="speedometer-section">
                  <h4 className="chart-title">Performance Boost</h4>
                  <motion.div 
                    className="speedometer"
                    initial={{ scale: 0, rotate: -90 }}
                    animate={inView ? { scale: 1, rotate: 0 } : { scale: 0, rotate: -90 }}
                    transition={{ duration: 1, delay: 0.3, type: "spring", stiffness: 100 }}
                  >
                    <svg viewBox="0 0 200 200" className="speedometer-svg">
                      <defs>
                        <linearGradient id="speedometerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#10b981"/>
                          <stop offset="50%" stopColor="#FF6B35"/>
                          <stop offset="100%" stopColor="#dc2626"/>
                        </linearGradient>
                        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                          <feMerge> 
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                        </filter>
                      </defs>
                      
                      {/* Background Circle */}
                      <circle cx="100" cy="100" r="80" fill="none" stroke="#334155" strokeWidth="10" opacity="0.3"/>
                      
                      {/* Progress Circle */}
                      <motion.circle 
                        cx="100" cy="100" r="80" 
                        fill="none" 
                        stroke="url(#speedometerGradient)" 
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 80}`}
                        initial={{ strokeDashoffset: 2 * Math.PI * 80 }}
                        animate={inView && !prefersReducedMotion ? { strokeDashoffset: 2 * Math.PI * 80 * (1 - 0.57) } : { strokeDashoffset: 2 * Math.PI * 80 }}
                        transition={{ duration: 2, delay: 0.8, ease: "easeInOut" }}
                        filter="url(#glow)"
                        transform="rotate(-90 100 100)"
                      />
                      
                      {/* Center Content */}
                      <motion.text 
                        x="100" y="90" 
                        textAnchor="middle" 
                        fontSize="28" 
                        fontWeight="bold" 
                        fill="#FF6B35"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                        transition={{ delay: 2, duration: 0.5 }}
                      >
                        57%
                      </motion.text>
                      <text x="100" y="110" textAnchor="middle" fontSize="12" fill="#94a3b8">
                        Faster Loading
                      </text>
                    </svg>
                  </motion.div>
                </div>

                <div className="capacity-section">
                  <h4 className="chart-title">User Capacity</h4>
                  <div className="capacity-bars">
                    <div className="bar-container">
                      <div className="bar-group">
                        <motion.div 
                          className="capacity-bar standard-bar"
                          initial={{ scaleY: 0 }}
                          animate={inView && !prefersReducedMotion ? { scaleY: 0.36 } : { scaleY: 0.36 }}
                          transition={{ duration: 1, delay: 1, ease: "easeOut" }}
                        />
                        <div className="bar-info">
                          <div className="bar-label">8 Users</div>
                          <div className="bar-subtitle">Industry Avg</div>
                        </div>
                      </div>
                      
                      <div className="vs-indicator">VS</div>
                      
                      <div className="bar-group">
                        <motion.div 
                          className="capacity-bar picosack-bar"
                          initial={{ scaleY: 0 }}
                          animate={inView && !prefersReducedMotion ? { scaleY: 1 } : { scaleY: 1 }}
                          transition={{ duration: 1.2, delay: 1.3, ease: "easeOut" }}
                        />
                        <div className="bar-info">
                          <div className="bar-label">22 Users</div>
                          <div className="bar-subtitle">PicoSack</div>
                        </div>
                      </div>
                    </div>
                    
                    <motion.div 
                      className="capacity-improvement"
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ delay: 2.5, duration: 0.6 }}
                    >
                      <span className="improvement-badge">+175% More Capacity</span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="performance-details">
              <div className="advantages-section">
                <h3>Real-World Advantages:</h3>
                <ul className="advantages-list">
                  <li>
                    <span className="highlight">1.2s menu load time</span> vs industry average 2.8s
                  </li>
                  <li>
                    <span className="highlight">22 concurrent users</span> without lag
                  </li>
                  <li>
                    <span className="highlight">500+ offline orders</span> stored during outages
                  </li>
                  <li>
                    <span className="highlight">3-hour battery backup</span> (Pro model)
                  </li>
                  <li>
                    <span className="highlight">2.1s boot time</span> for quick setup
                  </li>
                </ul>
              </div>

              <div className="specs-section">
                <h3>Technical Specifications:</h3>
                <ul className="specs-list">
                  <li>
                    <span className="spec-label">Processor:</span> Dual-core ESP32-C6 @ 240MHz
                  </li>
                  <li>
                    <span className="spec-label">Memory:</span> 8MB PSRAM + 16MB Flash
                  </li>
                  <li>
                    <span className="spec-label">Connectivity:</span> Wi-Fi 6, Bluetooth 5.2
                  </li>
                  <li>
                    <span className="spec-label">Display:</span> 3.5" IPS touchscreen
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="performance-stats">
            <div className="stats-grid">
              <motion.div 
                className="stat-card"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="stat-icon">⚡</div>
                <div className="stat-value">1.2s</div>
                <div className="stat-label">Load Time</div>
              </motion.div>
              
              <motion.div 
                className="stat-card"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="stat-icon">👥</div>
                <div className="stat-value">22</div>
                <div className="stat-label">Concurrent Users</div>
              </motion.div>
              
              <motion.div 
                className="stat-card"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="stat-icon">🔋</div>
                <div className="stat-value">3hr</div>
                <div className="stat-label">Battery Backup</div>
              </motion.div>
              
              <motion.div 
                className="stat-card"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="stat-icon">📦</div>
                <div className="stat-value">500+</div>
                <div className="stat-label">Offline Orders</div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PerformanceSection;
