import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './TechSection.css';

interface TechFeature {
  category: string;
  features: {
    title: string;
    description: string;
    highlight: string;
  }[];
}

const techData: TechFeature[] = [
  {
    category: "Hardware Excellence",
    features: [
      {
        title: "ESP32-C6 MCU",
        description: "with Wi-Fi 6 and Bluetooth 5",
        highlight: "ESP32-C6 MCU"
      },
      {
        title: "8MB PSRAM",
        description: "for instant menu loading",
        highlight: "8MB PSRAM"
      },
      {
        title: "Unified PCB design",
        description: "reduces manufacturing costs by 40%",
        highlight: "Unified PCB design"
      },
      {
        title: "Extended-range antenna",
        description: "(up to 15m coverage)",
        highlight: "Extended-range antenna"
      },
      {
        title: "Modular design",
        description: "for easy repairs/upgrades",
        highlight: "Modular design"
      }
    ]
  },
  {
    category: "Software Innovations",
    features: [
      {
        title: "Zero-app captive portal",
        description: "- no downloads needed",
        highlight: "Zero-app captive portal"
      },
      {
        title: "Hybrid storage",
        description: "(SPIFFS + SD card)",
        highlight: "Hybrid storage"
      },
      {
        title: "Offline-first architecture",
        description: "- stores 500+ orders",
        highlight: "Offline-first architecture"
      },
      {
        title: "Dynamic power management",
        description: "- 3hr battery backup",
        highlight: "Dynamic power management"
      }
    ]
  }
];

const TechSection: React.FC = () => {
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

  return (
    <section id="tech" className="tech-section" ref={ref}>
      <div className="container">
        <motion.div
          className="tech-container"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div variants={itemVariants} className="section-header">
            <h2 className="section-title">Technical Breakthroughs</h2>
            <p className="section-description">
              Cutting-edge hardware and software innovations that make PicoSack possible
            </p>
          </motion.div>

          <div className="tech-grid">
            <div className="tech-features">
              {techData.map((category, categoryIndex) => (
                <motion.div
                  key={categoryIndex}
                  className="feature-category"
                  variants={itemVariants}
                >
                  <h3 className="category-title">{category.category}:</h3>
                  <ul className="feature-list">
                    {category.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        className="feature-item"
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ 
                          duration: 0.4, 
                          delay: categoryIndex * 0.3 + featureIndex * 0.1 + 0.5 
                        }}
                      >
                        <span className="highlight">{feature.highlight}</span> {feature.description}
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            <motion.div variants={itemVariants} className="tech-diagram">
              <div className="diagram-container">
                <svg viewBox="0 0 500 400" className="tech-svg">
                  <defs>
                    <linearGradient id="cpuGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#004E89"/>
                      <stop offset="100%" stopColor="#3A7CA5"/>
                    </linearGradient>
                    <filter id="componentShadow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur"/>
                      <feComposite in="SourceGraphic" in2="blur" operator="over"/>
                    </filter>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#FF6B35"/>
                    </marker>
                  </defs>
                  
                  {/* ESP32 Chip */}
                  <motion.rect 
                    x="150" y="50" width="200" height="100" rx="15" 
                    fill="url(#cpuGradient)" 
                    filter="url(#componentShadow)"
                    initial={{ scale: 0 }}
                    animate={inView ? { scale: 1 } : { scale: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  />
                  <text x="250" y="100" fontSize="18" fill="white" textAnchor="middle" fontWeight="600">ESP32-C6</text>
                  <text x="250" y="120" fontSize="12" fill="white" textAnchor="middle">Wi-Fi 6 + Bluetooth 5</text>
                  
                  {/* Components */}
                  <motion.g
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <rect x="50" y="200" width="100" height="80" rx="10" className="component"/>
                    <text x="100" y="240" className="component-text">Touch UI</text>
                  </motion.g>
                  
                  <motion.g
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                  >
                    <rect x="200" y="200" width="100" height="80" rx="10" className="component"/>
                    <text x="250" y="240" className="component-text">8MB PSRAM</text>
                  </motion.g>
                  
                  <motion.g
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                  >
                    <rect x="350" y="200" width="100" height="80" rx="10" className="component"/>
                    <text x="400" y="240" className="component-text">Printer</text>
                  </motion.g>
                  
                  {/* Connections */}
                  <motion.path 
                    d="M250,150 V180 H100 V200" 
                    className="flow-arrow"
                    initial={{ pathLength: 0 }}
                    animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={{ duration: 1, delay: 1.5 }}
                  />
                  <motion.path 
                    d="M250,150 V180 H250 V200" 
                    className="flow-arrow"
                    initial={{ pathLength: 0 }}
                    animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={{ duration: 1, delay: 1.7 }}
                  />
                  <motion.path 
                    d="M250,150 V180 H400 V200" 
                    className="flow-arrow"
                    initial={{ pathLength: 0 }}
                    animate={inView ? { pathLength: 1 } : { pathLength: 0 }}
                    transition={{ duration: 1, delay: 1.9 }}
                  />
                  
                  {/* Antenna */}
                  <motion.g
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                    transition={{ duration: 0.6, delay: 2.2 }}
                  >
                    <path d="M350,100 L420,30 M350,100 L420,170" stroke="#FF6B35" strokeWidth="3" strokeLinecap="round"/>
                    <circle cx="350" cy="100" r="8" fill="#FF6B35"/>
                  </motion.g>
                </svg>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TechSection;
