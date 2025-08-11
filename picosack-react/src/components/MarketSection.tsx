import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const MarketSection: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <section id="market" className="section" ref={ref}>
      <div className="container">
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={inView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'center', padding: '6rem 0', background: '#f8fafc', borderRadius: '20px' }}
        >
          <h2 style={{ fontSize: '3rem', fontWeight: 800, color: '#1f2937', marginBottom: '2rem' }}>
            📊 Market Analysis
          </h2>
          <p style={{ fontSize: '1.2rem', color: '#6b7280', maxWidth: '600px', margin: '0 auto' }}>
            Targeting India's massive MSME market with unprecedented opportunity.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default MarketSection;
