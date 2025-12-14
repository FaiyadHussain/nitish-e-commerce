import { useEffect, useRef } from 'react';
import { scrollReveal, staggerFadeIn } from '../../animations/gsapAnimations';
import AnimatedBackground from '../../components/AnimatedBackground/AnimatedBackground';
import ProductCard from '../../components/ProductCard/ProductCard';
import { getMenProducts } from '../../data/products';
import './Men.css';

const Men = () => {
  const productsRef = useRef(null);
  const menProducts = getMenProducts();

  useEffect(() => {
    if (productsRef.current) {
      const productCards = productsRef.current.querySelectorAll('.product-card');
      staggerFadeIn(productCards, 0.1, 0.05);
    }
  }, []);

  return (
    <div className="men-page">
      <AnimatedBackground variant="default" intensity="medium" />
      <div className="men-hero">
        <h1>Men's Collection</h1>
        <p>Timeless style for the modern gentleman</p>
      </div>

      <div className="container">
        <div ref={productsRef} className="products-grid">
          {menProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Men;

