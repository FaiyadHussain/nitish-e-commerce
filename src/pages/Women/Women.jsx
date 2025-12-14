import { useEffect, useRef } from 'react';
import { scrollReveal, staggerFadeIn } from '../../animations/gsapAnimations';
import AnimatedBackground from '../../components/AnimatedBackground/AnimatedBackground';
import ProductCard from '../../components/ProductCard/ProductCard';
import { getWomenProducts } from '../../data/products';
import './Women.css';

const Women = () => {
  const productsRef = useRef(null);
  const womenProducts = getWomenProducts();

  useEffect(() => {
    if (productsRef.current) {
      const productCards = productsRef.current.querySelectorAll('.product-card');
      staggerFadeIn(productCards, 0.1, 0.05);
    }
  }, []);

  return (
    <div className="women-page">
      <AnimatedBackground variant="default" intensity="medium" />
      <div className="women-hero">
        <h1>Women's Collection</h1>
        <p>Elegant fashion for the sophisticated woman</p>
      </div>

      <div className="container">
        <div ref={productsRef} className="products-grid">
          {womenProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Women;

