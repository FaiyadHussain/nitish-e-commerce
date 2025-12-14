import { useState } from 'react';
import { Link } from 'react-router-dom';
import AnimatedBackground from '../../components/AnimatedBackground/AnimatedBackground';
import ProductCard from '../../components/ProductCard/ProductCard';
import AnimatedButton from '../../components/AnimatedButton/AnimatedButton';
import { products } from '../../data/products';
import './Wishlist.css';

const Wishlist = () => {
  // For demo, using first 4 products as wishlist items
  const [wishlistItems] = useState(products.slice(0, 4));

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-page">
        <AnimatedBackground variant="default" intensity="medium" />
        <div className="container">
          <div className="wishlist-empty">
            <h2>Your wishlist is empty</h2>
            <p>Save your favorite items here</p>
            <Link to="/shop">
              <AnimatedButton variant="primary">Start Shopping</AnimatedButton>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <AnimatedBackground variant="default" intensity="medium" />
      <div className="container">
        <h1 className="wishlist-title">Wishlist</h1>
        <p className="wishlist-subtitle">
          {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
        </p>
        <div className="wishlist-grid">
          {wishlistItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;

