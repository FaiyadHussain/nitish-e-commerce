import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { scrollReveal, staggerFadeIn } from '../../animations/gsapAnimations';
import AnimatedBackground from '../../components/AnimatedBackground/AnimatedBackground';
import ProductCard from '../../components/ProductCard/ProductCard';
import { products } from '../../data/products';
import './Shop.css';

const Shop = () => {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedGender, setSelectedGender] = useState('All');
  const productsRef = useRef(null);

  const categories = ['All', ...new Set(products.map((p) => p.category))];
  const genders = ['All', 'Men', 'Women'];

  useEffect(() => {
    let filtered = products;

    if (selectedCategory !== 'All') {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (selectedGender !== 'All') {
      filtered = filtered.filter(
        (p) => p.gender === selectedGender.toLowerCase()
      );
    }

    setFilteredProducts(filtered);
  }, [selectedCategory, selectedGender]);

  useEffect(() => {
    if (productsRef.current) {
      const productCards = productsRef.current.querySelectorAll('.product-card');
      staggerFadeIn(productCards, 0.1, 0.05);
    }
  }, [filteredProducts]);

  return (
    <div className="shop-page">
      <AnimatedBackground variant="shop" intensity="high" />
      <div className="shop-hero">
        <h1>Shop</h1>
        <p>Discover our complete collection</p>
      </div>

      <div className="container">
        <div className="shop-filters">
          <div className="filter-group">
            <h3>Category</h3>
            <div className="filter-buttons">
              {categories.map((category) => (
                <button
                  key={category}
                  className={`filter-btn ${
                    selectedCategory === category ? 'active' : ''
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="filter-group">
            <h3>Gender</h3>
            <div className="filter-buttons">
              {genders.map((gender) => (
                <button
                  key={gender}
                  className={`filter-btn ${
                    selectedGender === gender ? 'active' : ''
                  }`}
                  onClick={() => setSelectedGender(gender)}
                >
                  {gender}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="shop-results">
          <p className="results-count">
            {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
          </p>
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedCategory}-${selectedGender}`}
              ref={productsRef}
              className="products-grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Shop;

