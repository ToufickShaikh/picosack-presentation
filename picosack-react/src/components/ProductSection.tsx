import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import './ProductSection.css';

interface ProductData {
  name: string;
  price: string;
  features: string[];
  ideal: string;
  highlight?: boolean;
}

const productsData: ProductData[] = [
  {
    name: 'PicoSack Basic',
    price: '₹1,500',
    features: [
      'Digital menus/notices',
      'Wi-Fi captive portal',
      '8MB storage',
    ],
    ideal: 'Street vendors, schools'
  },
  {
    name: 'PicoSack Pro',
    price: '₹3,500',
    features: [
      'All Basic features +',
      'Order management',
      'Bluetooth printing',
      'Touchscreen interface',
    ],
    ideal: 'Restaurants, cafes',
    highlight: true
  },
  {
    name: 'PicoSack Enterprise',
    price: '₹6,800',
    features: [
      'All Pro features +',
      'UPI/card payments',
      'Swiggy/Zomato sync',
      'GST billing',
    ],
    ideal: 'Retail stores, hotels'
  }
];

const ProductSection: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Map product to image path in public
  const imgFor = (name: string) => {
    const base = process.env.PUBLIC_URL ?? '';
    if (name.includes('Basic')) return `${base}/picobasic.png`;
    if (name.includes('Pro')) return `${base}/picopro.png`;
    return `${base}/picoenter.png`;
  };

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

  const cardVariants = {
    hidden: { y: 50, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: "easeOut" as const },
    },
  };

  return (
    <section id="products" className="product-section" ref={ref}>
      <div className="container">
        <motion.div
          className="product-container"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.div variants={itemVariants} className="section-header">
            <h2 className="section-title">Product Family</h2>
            <p className="section-description">
              Choose the perfect PicoSack solution for your business needs
            </p>
          </motion.div>

          <div className="products-grid">
            {productsData.map((product, index) => (
              <motion.div
                key={index}
                className={`product-card ${product.highlight ? 'highlight' : ''}`}
                variants={cardVariants}
                whileHover={{ 
                  scale: 1.05, 
                  y: -10,
                  boxShadow: "0 25px 50px rgba(0, 0, 0, 0.2)"
                }}
                transition={{ duration: 0.3 }}
              >
                {product.highlight && (
                  <div className="popular-badge">
                    <span>Most Popular</span>
                  </div>
                )}

                <div className="product-header">
                  <motion.div 
                    className="product-image"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.15 + 0.2 }}
                  >
                    <img src={imgFor(product.name)} alt={product.name} />
                  </motion.div>

                  <h3 className="product-name">{product.name}</h3>
                  <div className="product-price">
                    <span className="price-value">{product.price}</span>
                    <span className="price-label">Starting at</span>
                  </div>
                </div>

                <div className="product-features">
                  <ul>
                    {product.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                        transition={{ 
                          duration: 0.4, 
                          delay: index * 0.2 + featureIndex * 0.1 + 0.8 
                        }}
                      >
                        {feature}
                      </motion.li>
                    ))}
                  </ul>
                </div>

                <div className="product-ideal">
                  <span className="ideal-label">Ideal for:</span>
                  <span className="ideal-text">{product.ideal}</span>
                </div>

                <motion.button
                  className="product-cta"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Choose Plan
                </motion.button>
              </motion.div>
            ))}
          </div>

          <motion.div variants={itemVariants} className="comparison-note">
            <div className="note-content">
              <h4>Why Choose PicoSack?</h4>
              <div className="comparison-grid">
                <div className="comparison-item">
                  <span className="comparison-icon">💰</span>
                  <span>90% cheaper than traditional kiosks</span>
                </div>
                <div className="comparison-item">
                  <span className="comparison-icon">📱</span>
                  <span>Zero app downloads required</span>
                </div>
                <div className="comparison-item">
                  <span className="comparison-icon">⚡</span>
                  <span>Works completely offline</span>
                </div>
                <div className="comparison-item">
                  <span className="comparison-icon">🔧</span>
                  <span>Easy setup in under 5 minutes</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductSection;
