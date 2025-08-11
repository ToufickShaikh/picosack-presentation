import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './CompetitorSection.css';

interface CompetitorData {
  solution: string;
  initialCost: string;
  recurringCost: string;
  weaknesses: string;
  ourAdvantage: string;
}

const competitorData: CompetitorData[] = [
  {
    solution: 'Paper Menus',
    initialCost: 'Low',
    recurringCost: 'High (₹500–₹2K/mo)',
    weaknesses: 'Wasteful, unhygienic, static',
    ourAdvantage: '✅ Digital, dynamic, zero reprints'
  },
  {
    solution: 'KFC-style Kiosks',
    initialCost: '₹30,000+',
    recurringCost: 'High maintenance',
    weaknesses: 'Fragile, complex IT needs',
    ourAdvantage: '✅ 1/10th cost, rugged design'
  },
  {
    solution: 'QR Code Systems',
    initialCost: 'Free–₹5K',
    recurringCost: 'Website hosting fees',
    weaknesses: 'Requires smartphone + internet',
    ourAdvantage: '✅ Zero-app, works on any WiFi device'
  },
  {
    solution: 'Tablet POS',
    initialCost: '₹15,000+',
    recurringCost: 'Monthly SaaS fees',
    weaknesses: 'Cloud-dependent, slow offline',
    ourAdvantage: '✅ Full offline functionality'
  }
];

const CompetitorSection: React.FC = () => {
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
        staggerChildren: 0.1,
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
    <section id="competitors" className="competitor-section" ref={ref}>
      <div className="container">
        <motion.div
          className="competitor-container"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div variants={itemVariants} className="section-header">
            <h2 className="section-title">Why We Outperform</h2>
            <p className="section-description">
              Comprehensive comparison with existing solutions in the market
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="comparison-table-container">
            <div className="comparison-table-wrapper">
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th>Solution</th>
                    <th>Initial Cost</th>
                    <th>Recurring Cost</th>
                    <th>Key Weaknesses</th>
                    <th>Our Advantage</th>
                  </tr>
                </thead>
                <tbody>
                  {competitorData.map((competitor, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                    >
                      <td className="solution-name">
                        <strong>{competitor.solution}</strong>
                      </td>
                      <td>{competitor.initialCost}</td>
                      <td>{competitor.recurringCost}</td>
                      <td className="weaknesses">{competitor.weaknesses}</td>
                      <td className="advantages">{competitor.ourAdvantage}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="competitive-highlights">
            <div className="highlight-grid">
              <motion.div 
                className="highlight-card"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="highlight-icon">💰</div>
                <div className="highlight-content">
                  <h4>Cost Effective</h4>
                  <p>90% cheaper than traditional kiosk solutions</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="highlight-card"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="highlight-icon">📱</div>
                <div className="highlight-content">
                  <h4>Zero App</h4>
                  <p>No smartphone or app downloads required</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="highlight-card"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="highlight-icon">⚡</div>
                <div className="highlight-content">
                  <h4>Offline Ready</h4>
                  <p>Full functionality without internet dependency</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default CompetitorSection;
