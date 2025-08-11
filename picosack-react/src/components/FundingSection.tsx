import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './FundingSection.css';

interface PhaseData {
  phase: string;
  duration: string;
  budget: string;
  deliverables: string;
}

const phaseData: PhaseData[] = [
  {
    phase: 'R&D',
    duration: '4 weeks',
    budget: '₹1,50,000',
    deliverables: '3 working prototypes'
  },
  {
    phase: 'Pilot Production',
    duration: '6 weeks', 
    budget: '₹1,50,000',
    deliverables: '50 field-test units'
  },
  {
    phase: 'Market Launch',
    duration: '8 weeks',
    budget: '₹1,00,000', 
    deliverables: 'Chennai rollout'
  }
];

const roiData = [
  { label: 'Breakeven', value: '~800 units sold' },
  { label: 'Year 1 Revenue', value: '₹50 lakhs (10,000 units)' },
  { label: 'Year 2 Expansion', value: 'Pan-India distribution' }
];

const FundingSection: React.FC = () => {
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
    <section id="funding" className="funding-section" ref={ref}>
      <div className="container">
        <motion.div
          className="funding-container"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div variants={itemVariants} className="section-header">
            <h2 className="section-title">Funding Requirements</h2>
            <p className="section-description">
              Strategic investment roadmap to market leadership
            </p>
          </motion.div>

          <div className="funding-grid">
            <motion.div variants={itemVariants} className="funding-details">
              <div className="investment-summary">
                <h3 className="investment-title">Total Investment: <span className="highlight">₹4,00,000</span></h3>
                
                <div className="phases-table-container">
                  <table className="phases-table">
                    <thead>
                      <tr>
                        <th>Phase</th>
                        <th>Duration</th>
                        <th>Budget</th>
                        <th>Deliverables</th>
                      </tr>
                    </thead>
                    <tbody>
                      {phaseData.map((phase, index) => (
                        <motion.tr
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                          transition={{ duration: 0.6, delay: index * 0.1 + 0.5 }}
                        >
                          <td className="phase-name"><strong>{phase.phase}</strong></td>
                          <td>{phase.duration}</td>
                          <td className="budget-amount">{phase.budget}</td>
                          <td>{phase.deliverables}</td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="roi-section">
                  <h3>Projected ROI:</h3>
                  <ul className="roi-list">
                    {roiData.map((item, index) => (
                      <motion.li
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ duration: 0.4, delay: index * 0.1 + 1 }}
                      >
                        <span className="roi-label">{item.label}:</span> {item.value}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="funding-visual">
              <div className="chart-container">
                <div className="budget-allocation">
                  <h4>Budget Allocation</h4>
                  <div className="allocation-wrapper">
                    <motion.svg viewBox="0 0 400 400" className="allocation-chart">
                      <defs>
                        <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
                          <feGaussianBlur stdDeviation="4" result="blur"/>
                          <feComposite in="SourceGraphic" in2="blur" operator="over"/>
                        </filter>
                        <linearGradient id="rdGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#FF6B35"/>
                          <stop offset="100%" stopColor="#FF8C5A"/>
                        </linearGradient>
                        <linearGradient id="pilotGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#004E89"/>
                          <stop offset="100%" stopColor="#3A7CA5"/>
                        </linearGradient>
                        <linearGradient id="launchGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#1e293b"/>
                          <stop offset="100%" stopColor="#475569"/>
                        </linearGradient>
                      </defs>
                      
                      {/* Background circle */}
                      <circle cx="200" cy="200" r="120" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2"/>
                      
                      {/* R&D Slice (37.5%) - 135 degrees */}
                      <motion.path 
                        d="M200,80 A120,120 0 0,1 320,200 L200,200 Z" 
                        fill="url(#rdGradient)"
                        filter="url(#shadow)"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                        transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
                        whileHover={{ scale: 1.05 }}
                        style={{ transformOrigin: "200px 200px" }}
                      />
                      
                      {/* Pilot Slice (37.5%) - 135 degrees */}
                      <motion.path 
                        d="M320,200 A120,120 0 0,1 200,320 L200,200 Z" 
                        fill="url(#pilotGradient)"
                        filter="url(#shadow)"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                        transition={{ duration: 0.8, delay: 0.7, type: "spring" }}
                        whileHover={{ scale: 1.05 }}
                        style={{ transformOrigin: "200px 200px" }}
                      />
                      
                      {/* Launch Slice (25%) - 90 degrees */}
                      <motion.path 
                        d="M200,320 A120,120 0 0,1 80,200 L200,200 Z" 
                        fill="url(#launchGradient)"
                        filter="url(#shadow)"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                        transition={{ duration: 0.8, delay: 0.9, type: "spring" }}
                        whileHover={{ scale: 1.05 }}
                        style={{ transformOrigin: "200px 200px" }}
                      />
                      
                      {/* Center circle */}
                      <circle cx="200" cy="200" r="40" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.2)" strokeWidth="2"/>
                      <text x="200" y="195" fontSize="12" fill="#f8fafc" textAnchor="middle" fontWeight="600">TOTAL</text>
                      <text x="200" y="210" fontSize="16" fill="#FF6B35" textAnchor="middle" fontWeight="700">₹4L</text>
                    </motion.svg>
                    
                    <div className="allocation-legend">
                      <motion.div 
                        className="legend-item"
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ delay: 1.2, duration: 0.4 }}
                      >
                        <div className="legend-color rd-color"></div>
                        <div className="legend-text">
                          <span className="legend-label">R&D</span>
                          <span className="legend-value">₹1.5L (37.5%)</span>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="legend-item"
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ delay: 1.4, duration: 0.4 }}
                      >
                        <div className="legend-color pilot-color"></div>
                        <div className="legend-text">
                          <span className="legend-label">Pilot</span>
                          <span className="legend-value">₹1.5L (37.5%)</span>
                        </div>
                      </motion.div>
                      
                      <motion.div 
                        className="legend-item"
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ delay: 1.6, duration: 0.4 }}
                      >
                        <div className="legend-color launch-color"></div>
                        <div className="legend-text">
                          <span className="legend-label">Launch</span>
                          <span className="legend-value">₹1L (25%)</span>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>

                <div className="timeline">
                  <h4>Development Timeline</h4>
                  <div className="timeline-container">
                    <motion.div 
                      className="timeline-line"
                      initial={{ scaleX: 0 }}
                      animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                      transition={{ duration: 1.5, delay: 1.8 }}
                    />
                    
                    <motion.div 
                      className="timeline-milestone"
                      style={{ left: '22%' }}
                      initial={{ scale: 0, y: 20 }}
                      animate={inView ? { scale: 1, y: 0 } : { scale: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: 2.2, type: "spring", stiffness: 200 }}
                    >
                      <div className="milestone-marker rd-marker"></div>
                      <div className="milestone-content">
                        <div className="milestone-week">Week 4</div>
                        <div className="milestone-title">Prototypes Ready</div>
                        <div className="milestone-desc">3 working models</div>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="timeline-milestone"
                      style={{ left: '56%' }}
                      initial={{ scale: 0, y: 20 }}
                      animate={inView ? { scale: 1, y: 0 } : { scale: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: 2.4, type: "spring", stiffness: 200 }}
                    >
                      <div className="milestone-marker pilot-marker"></div>
                      <div className="milestone-content">
                        <div className="milestone-week">Week 10</div>
                        <div className="milestone-title">Pilot Production</div>
                        <div className="milestone-desc">50 field-test units</div>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="timeline-milestone"
                      style={{ left: '89%' }}
                      initial={{ scale: 0, y: 20 }}
                      animate={inView ? { scale: 1, y: 0 } : { scale: 0, y: 20 }}
                      transition={{ duration: 0.5, delay: 2.6, type: "spring", stiffness: 200 }}
                    >
                      <div className="milestone-marker launch-marker"></div>
                      <div className="milestone-content">
                        <div className="milestone-week">Week 18</div>
                        <div className="milestone-title">Market Launch</div>
                        <div className="milestone-desc">Chennai rollout</div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FundingSection;
