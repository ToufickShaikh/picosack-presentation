import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './ProblemSection.css';

interface ProblemCardData {
  icon: string;
  title: string;
  stat: string;
  statDesc: string;
  problems: string[];
}

const problemsData: ProblemCardData[] = [
  {
    icon: '📜',
    title: 'Paper Systems',
    stat: '₹500-₹2,000',
    statDesc: 'Monthly reprint costs',
    problems: [
      '63 million businesses rely on outdated paper systems',
      'Wasteful, unhygienic, static information',
      'Constant reprinting needed for updates'
    ]
  },
  {
    icon: '📱',
    title: 'QR Code Failures',
    stat: '30%',
    statDesc: 'Customer drop-off rate',
    problems: [
      'Requires smartphone and internet',
      'High customer abandonment',
      'Poor user experience'
    ]
  },
  {
    icon: '💻',
    title: 'Expensive Kiosks',
    stat: '₹30,000+',
    statDesc: 'Basic digital kiosk cost',
    problems: [
      'Fragile and complex IT needs',
      'High maintenance costs',
      '60% of India faces unreliable internet'
    ]
  }
];

const ProblemSection: React.FC = () => {
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

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section id="problem" className="problem-section" ref={ref}>
      <div className="container">
        <motion.div
          className="section-header"
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="section-badge">⚡ The Challenge</span>
          <h2 className="section-title">India's MSME Digital Gap</h2>
          <p className="section-subtitle">63 million businesses struggling with outdated systems</p>
        </motion.div>

        <motion.div
          className="problems-grid"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          {problemsData.map((problem, index) => (
            <motion.div
              key={index}
              className="problem-card"
              variants={cardVariants}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                transition: { duration: 0.2 }
              }}
            >
              <motion.div 
                className="problem-icon"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: index * 0.5 }}
              >
                {problem.icon}
              </motion.div>
              <h3>{problem.title}</h3>
              <div className="problem-stats">
                <motion.div 
                  className="stat"
                  initial={{ scale: 0 }}
                  animate={inView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.2 }}
                >
                  {problem.stat}
                </motion.div>
                <div className="stat-desc">{problem.statDesc}</div>
              </div>
              <ul className="problem-list">
                {problem.problems.map((item, itemIndex) => (
                  <motion.li
                    key={itemIndex}
                    initial={{ x: -20, opacity: 0 }}
                    animate={inView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
                    transition={{ duration: 0.4, delay: 1 + index * 0.1 + itemIndex * 0.1 }}
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="problem-summary"
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.6, delay: 1.5 }}
        >
          <div className="summary-stat">
            <motion.span 
              className="big-number"
              initial={{ scale: 0 }}
              animate={inView ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.8, delay: 1.8 }}
            >
              63M
            </motion.span>
            <span className="summary-text">MSMEs need a better solution</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProblemSection;
