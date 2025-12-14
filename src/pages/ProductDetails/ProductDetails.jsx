import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { getProductById } from '../../data/products';
import AnimatedBackground from '../../components/AnimatedBackground/AnimatedBackground';
import AnimatedButton from '../../components/AnimatedButton/AnimatedButton';
import { fadeIn, scaleIn } from '../../animations/gsapAnimations';
import './ProductDetails.css';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = getProductById(id);
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors[0] || '');
  const [quantity, setQuantity] = useState(1);
  const imageRef = useRef(null);
  const detailsRef = useRef(null);

  useEffect(() => {
    if (!product) {
      navigate('/shop');
      return;
    }

    if (imageRef.current) {
      scaleIn(imageRef.current, 0.2);
    }
    if (detailsRef.current) {
      fadeIn(detailsRef.current, 0.4);
    }
  }, [product, navigate]);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    // Show success animation/notification
  };

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  return (
    <div className="product-details-page">
      <AnimatedBackground variant="product" intensity="low" />
      <div className="container">
        <div className="product-details-content">
          <motion.div
            ref={imageRef}
            className="product-image-section"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img src={product.image} alt={product.name} className="product-main-image" />
          </motion.div>

          <motion.div
            ref={detailsRef}
            className="product-info-section"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="product-name">{product.name}</h1>
            <p className="product-category">{product.category}</p>
            <p className="product-price">${product.price}</p>

            <p className="product-description">{product.description}</p>

            <div className="product-options">
              <div className="option-group">
                <label>Size</label>
                <div className="size-buttons">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              <div className="option-group">
                <label>Color</label>
                <div className="color-buttons">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      className={`color-btn ${selectedColor === color ? 'active' : ''}`}
                      onClick={() => setSelectedColor(color)}
                      style={{
                        backgroundColor:
                          color === 'White'
                            ? '#ffffff'
                            : color === 'Black'
                            ? '#000000'
                            : color === 'Navy'
                            ? '#001f3f'
                            : color === 'Beige'
                            ? '#d4c5b9'
                            : color === 'Gray'
                            ? '#808080'
                            : '#d4c5b9',
                      }}
                    >
                      {color !== 'White' && color !== 'Black' && color !== 'Navy' && color !== 'Beige' && color !== 'Gray' ? color : ''}
                    </button>
                  ))}
                </div>
              </div>

              <div className="option-group">
                <label>Quantity</label>
                <div className="quantity-controls">
                  <button onClick={() => handleQuantityChange(-1)}>-</button>
                  <span>{quantity}</span>
                  <button onClick={() => handleQuantityChange(1)}>+</button>
                </div>
              </div>
            </div>

            <div className="product-actions">
              <AnimatedButton
                variant="primary"
                size="lg"
                onClick={handleAddToCart}
                className="add-to-cart-btn"
              >
                Add to Cart
              </AnimatedButton>
              <AnimatedButton variant="outline" size="lg">
                Add to Wishlist
              </AnimatedButton>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;

