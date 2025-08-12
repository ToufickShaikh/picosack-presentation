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
    duration: '2 weeks',
    budget: '₹1,50,000',
    deliverables: 'MVP firmware + captive portal'
  },
  {
    phase: 'Pilot Preparation',
    duration: '2 weeks',
    budget: '₹1,50,000',
    deliverables: '10–20 pilot units for field testing'
  },
  {
    phase: 'Soft Launch',
    duration: '2 weeks',
    budget: '₹1,00,000',
    deliverables: 'Chennai soft launch + feedback loop'
  }
];

// Budget allocation data
const allocation = [
  { key: 'rd', label: 'R&D', amount: 150000, colorClass: 'rd-color' },
  { key: 'pilot', label: 'Pilot', amount: 150000, colorClass: 'pilot-color' },
  { key: 'launch', label: 'Launch', amount: 100000, colorClass: 'launch-color' },
];
const totalBudget = allocation.reduce((sum, a) => sum + a.amount, 0);

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
              6-week pre-launch plan: build MVP, pilot in the field, and soft launch
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
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="funding-visual">
              <div className="chart-container">
                <div className="budget-allocation">
                  <h4>Budget Allocation</h4>
                  <div className="allocation-wrapper">
                    <div className="allocation-chart">
                      <div className="allocation-bar" aria-label="Budget allocation segmented bar">
                        {allocation.map((a, idx) => {
                          const percent = (a.amount / totalBudget) * 100;
                          const title = `${a.label} · ₹${a.amount.toLocaleString('en-IN')} · ${percent.toFixed(1)}%`;
                          const short = `${a.label} ${percent.toFixed(0)}%`;
                          return (
                            <motion.div
                              key={a.key}
                              className={`allocation-segment ${a.colorClass}`}
                              style={{ width: `${percent}%` }}
                              initial={{ scaleX: 0, opacity: 0 }}
                              animate={inView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
                              transition={{ duration: 0.8, delay: 0.4 + idx * 0.15 }}
                              title={title}
                              role="img"
                              aria-label={title}
                            >
                              <span className="segment-label">{short}</span>
                            </motion.div>
                          );
                        })}
                      </div>

                      {/* New 6-week timeline directly under allocation */}
                      <div className="timeline-segmented">
                        <h4>6-Week Timeline</h4>
                        <div className="timeline-bar" role="img" aria-label="6-week plan timeline">
                          <motion.div className="timeline-phase rd-phase" style={{ width: '33.33%' }} initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }} transition={{ delay: 0.9 }}>
                            <span className="phase-title">R&D</span>
                            <span className="phase-weeks">Weeks 1–2</span>
                          </motion.div>
                          <motion.div className="timeline-phase pilot-phase" style={{ width: '33.33%' }} initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }} transition={{ delay: 1.0 }}>
                            <span className="phase-title">Pilot</span>
                            <span className="phase-weeks">Weeks 3–4</span>
                          </motion.div>
                          <motion.div className="timeline-phase launch-phase" style={{ width: '33.34%' }} initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }} transition={{ delay: 1.1 }}>
                            <span className="phase-title">Launch</span>
                            <span className="phase-weeks">Weeks 5–6</span>
                          </motion.div>
                        </div>
                        <div className="week-scale" aria-hidden="true">
                          {Array.from({ length: 6 }).map((_, i) => (
                            <span key={i} className="tick">{i + 1}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="allocation-legend enhanced">
                      {allocation.map((a, idx) => {
                        const percent = (a.amount / totalBudget) * 100;
                        return (
                          <motion.div key={a.key} className="legend-item" initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }} transition={{ delay: 0.9 + idx * 0.1 }}>
                            <div className={`legend-color ${a.colorClass}`}></div>
                            <div className="legend-text">
                              <span className="legend-label">{a.label}</span>
                              <span className="legend-value">₹{a.amount.toLocaleString('en-IN')}</span>
                              <span className="legend-percent">{percent.toFixed(1)}%</span>
                            </div>
                          </motion.div>
                        );
                      })}
                    </div>
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
