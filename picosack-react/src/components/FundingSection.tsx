import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './FundingSection.css';
import { BUDGETS, TOTAL_BUDGET, TIME_TO_MARKET, formatINR } from '../constants/budget';

// Define merged phases (no separate additional table)
interface PhaseData { key: string; phase: string; duration: string; amount: number; deliverables: string; colorClass: string; }

const mergedPhases: PhaseData[] = [
  {
    key: 'hd',
    phase: 'Design + R&D',
    duration: 'Months 1–2',
    amount: BUDGETS.hardwareDesign + BUDGETS.rd,
    deliverables: 'HW architecture, PCB stackup, MVP firmware & captive portal',
    colorClass: 'hd-color'
  },
  {
    key: 'hdev',
    phase: 'Development + Pilot',
    duration: 'Months 3–4',
    amount: BUDGETS.hardwareDevelopment + BUDGETS.pilot,
    deliverables: 'Prototype builds and 10–20 unit field pilot',
    colorClass: 'hdev-color'
  },
  {
    key: 'casing',
    phase: 'Casing',
    duration: 'Month 5',
    amount: BUDGETS.casingDesign,
    deliverables: 'Industrial casing design & fabrication',
    colorClass: 'casing-color'
  },
  {
    key: 'test',
    phase: 'Testing + Launch',
    duration: 'Month 6',
    amount: BUDGETS.ipcA600Testing + BUDGETS.launch,
    deliverables: 'IPC-A-600 compliance, soft launch, feedback loop',
    colorClass: 'test-color'
  }
];

const FundingSection: React.FC = () => {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.6, staggerChildren: 0.2 } } };
  const itemVariants = { hidden: { y: 30, opacity: 0 }, visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: 'easeOut' as const } } };

  return (
    <section id="funding" className="funding-section" ref={ref}>
      <div className="container">
        <motion.div className="funding-container" variants={containerVariants} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          <motion.div variants={itemVariants} className="section-header">
            <h2 className="section-title">Funding Requirements</h2>
            <p className="section-description">{TIME_TO_MARKET} plan: design, develop, validate, and launch</p>
          </motion.div>

          <div className="funding-grid">
            <motion.div variants={itemVariants} className="funding-details">
              <div className="investment-summary">
                <h3 className="investment-title">Total Investment: <span className="highlight">{formatINR(TOTAL_BUDGET)}</span></h3>
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
                      {mergedPhases.map((phase, index) => (
                        <motion.tr key={phase.key} initial={{ opacity: 0, x: -20 }} animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }} transition={{ duration: 0.6, delay: index * 0.1 + 0.4 }}>
                          <td className="phase-name"><strong>{phase.phase}</strong></td>
                          <td>{phase.duration}</td>
                          <td className="budget-amount">{formatINR(phase.amount)}</td>
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
                        {mergedPhases.map((p, idx) => {
                          const percent = (p.amount / TOTAL_BUDGET) * 100;
                          const title = `${p.phase} · ${formatINR(p.amount)} · ${percent.toFixed(1)}%`;
                          const short = `${p.phase.split(' ')[0]} ${percent.toFixed(0)}%`;
                          return (
                            <motion.div
                              key={p.key}
                              className={`allocation-segment ${p.colorClass}`}
                              style={{ width: `${percent}%` }}
                              initial={{ scaleX: 0, opacity: 0 }}
                              animate={inView ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
                              transition={{ duration: 0.8, delay: 0.4 + idx * 0.12 }}
                              title={title}
                              role="img"
                              aria-label={title}
                            >
                              <span className="segment-label">{short}</span>
                            </motion.div>
                          );
                        })}
                      </div>

                      <div className="timeline-segmented">
                        <h4>6-Month Timeline</h4>
                        <div className="timeline-bar" role="img" aria-label="6-month plan timeline">
                          <motion.div className="timeline-phase hd-phase" style={{ width: '33.33%' }} initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }} transition={{ delay: 0.9 }}>
                            <span className="phase-title">HW Design</span>
                            <span className="phase-weeks">Months 1–2</span>
                          </motion.div>
                          <motion.div className="timeline-phase hdev-phase" style={{ width: '33.33%' }} initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }} transition={{ delay: 1.0 }}>
                            <span className="phase-title">HW Dev</span>
                            <span className="phase-weeks">Months 3–4</span>
                          </motion.div>
                          <motion.div className="timeline-phase casing-phase" style={{ width: '16.67%' }} initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }} transition={{ delay: 1.1 }}>
                            <span className="phase-title">Casing</span>
                            <span className="phase-weeks">Month 5</span>
                          </motion.div>
                          <motion.div className="timeline-phase test-phase" style={{ width: '16.67%' }} initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }} transition={{ delay: 1.2 }}>
                            <span className="phase-title">IPC A-600</span>
                            <span className="phase-weeks">Month 6</span>
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
                      {mergedPhases.map((p, idx) => {
                        const percent = (p.amount / TOTAL_BUDGET) * 100;
                        return (
                          <motion.div key={p.key} className="legend-item" initial={{ opacity: 0, y: 10 }} animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }} transition={{ delay: 0.9 + idx * 0.08 }}>
                            <div className={`legend-color ${p.colorClass}`}></div>
                            <div className="legend-text">
                              <span className="legend-label">{p.phase}</span>
                              <span className="legend-value">{formatINR(p.amount)}</span>
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
