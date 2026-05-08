import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useScroll } from '../../hooks/useScroll';
import { navbarScroll } from '../../animations/scrollEffects';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileDropdown, setMobileDropdown] = useState(null);
  const location = useLocation();
  const navbarRef = useRef(null);
  const { getCartItemsCount } = useCart();
  const { isScrolling } = useScroll();

  useEffect(() => {
    setIsScrolled(isScrolling);
    if (navbarRef.current) {
      navbarScroll(navbarRef.current);
    }
  }, [isScrolling]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/shop', label: 'Shop' },
    { path: '/men', label: 'Men' },
    { path: '/women', label: 'Women' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  return (
    <>
      <nav
        ref={navbarRef}
        className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}
      >
        <div className="navbar-container">
          <div className="navbar-left-mobile">
            <button
              className="navbar-menu-btn"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {isMenuOpen ? (
                <svg className="menu-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg className="menu-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
            <button className="navbar-icon search-btn">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </div>

          <Link to="/" className="navbar-logo">
            <img src="/J_A_name-removebg-preview.png" alt="JACOB ATELIER" className="logo-img" />
          </Link>

          <ul className="navbar-links">
            <li>
              <Link to="/" className={`navbar-link ${location.pathname === '/' ? 'active' : ''}`}>Home</Link>
            </li>
            <li>
              <Link to="/shop" className={`navbar-link ${location.pathname === '/shop' ? 'active' : ''}`}>Shop</Link>
            </li>

            {/* MEN dropdown */}
            <li className="nav-dropdown">
              <span className="navbar-link">MEN</span>
              <div className="dropdown-menu">
                <div className="dropdown-col">
                  <div className="dropdown-heading">Top Rated</div>
                  <ul>
                    <li><Link to="/shop?category=T-Shirts">T-Shirts</Link></li>
                    <li><Link to="/shop?category=Shirts">Shirts</Link></li>
                    <li><Link to="/shop?category=SweatShirts">SweatShirts</Link></li>
                  </ul>
                </div>

                <div className="dropdown-col">
                  <div className="dropdown-heading">Hoodies</div>
                  <ul>
                    <li><Link to="/shop?category=Hoodies">Hoodies</Link></li>
                    <li className="submenu-parent">Jackets
                      {/* <ul className="submenu">
                        <li><Link to="/shop?category=Jackets">Light Jackets</Link></li>
                        <li><Link to="/shop?category=Leather">Leather Jackets</Link></li>
                      </ul> */}
                    </li>
                  </ul>
                </div>

                <div className="dropdown-col">
                  <div className="dropdown-heading">Bottom Wear</div>
                  <ul>
                    <li><Link to="/shop?category=Jeans">Jeans</Link></li>
                    <li><Link to="/shop?category=Trousers">Trousers</Link></li>
                    <li><Link to="/shop?category=Formal">Formal</Link></li>
                  </ul>
                </div>

                <div className="dropdown-col">
                  <div className="dropdown-heading">Accessories</div>
                  <ul>
                    <li><Link to="/shop?category=Accessories">Accessories</Link></li>
                  </ul>
                </div>
              </div>
            </li>

            {/* WOMEN dropdown */}
            <li className="nav-dropdown">
              <span className="navbar-link">WOMEN</span>
              <div className="dropdown-menu">
                <div className="coming-soon-overlay">
                  <span>Coming Soon</span>
                </div>
                <div className="dropdown-col">
                  <div className="dropdown-heading">Top Wear</div>
                  <ul>
                    <li><Link to="/shop?category=WomenTopWear">Top Wear</Link></li>
                  </ul>
                </div>
                <div className="dropdown-col">
                  <div className="dropdown-heading">Bottom Wear</div>
                  <ul>
                    <li><Link to="/shop?category=WomenBottomWear">Bottom Wear</Link></li>
                  </ul>
                </div>
                <div className="dropdown-col">
                  <div className="dropdown-heading">Accessories</div>
                  <ul>
                    <li><Link to="/shop?category=WomenAccessories">Accessories</Link></li>
                  </ul>
                </div>
              </div>
            </li>

            <li className="nav-dropdown">
              <span className="navbar-link">Accessories</span>
              <div className="dropdown-menu">
                <div className="coming-soon-overlay">
                  <span>Coming Soon</span>
                </div>
                <div className="dropdown-col">
                  <div className="dropdown-heading">Top Wear</div>
                  <ul>
                    <li><Link to="/shop?category=WomenTopWear">Top Wear</Link></li>
                  </ul>
                </div>
                <div className="dropdown-col">
                  <div className="dropdown-heading">Bottom Wear</div>
                  <ul>
                    <li><Link to="/shop?category=WomenBottomWear">Bottom Wear</Link></li>
                  </ul>
                </div>
                <div className="dropdown-col">
                  <div className="dropdown-heading">Accessories</div>
                  <ul>
                    <li><Link to="/shop?category=WomenAccessories">Accessories</Link></li>
                  </ul>
                </div>
              </div>
            </li>


            <li>
              <Link to="/about" className={`navbar-link ${location.pathname === '/about' ? 'active' : ''}`}>About</Link>
            </li>
            <li>
              <Link to="/contact" className={`navbar-link ${location.pathname === '/contact' ? 'active' : ''}`}>Contact</Link>
            </li>
          </ul>

          <div className="navbar-actions">
            <button className="navbar-icon search-btn-desktop">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
            <Link to="/profile" className="navbar-icon profile-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </Link>
            <Link to="/cart" className="navbar-icon cart-icon">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 0 1-8 0" />
              </svg>
              {getCartItemsCount() > 0 && (
                <span className="cart-badge">{getCartItemsCount()}</span>
              )}
            </Link>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="mobile-menu-header">
              <img src="/J_A_name-removebg-preview.png" alt="JACOB ATELIER" className="logo-img-mobile" />
              <button onClick={() => setIsMenuOpen(false)}>✕</button>
            </div>
            <ul className="mobile-menu-links">
              <li>
                <Link to="/" onClick={() => setIsMenuOpen(false)} className={location.pathname === '/' ? 'active' : ''}>Home</Link>
              </li>
              <li>
                <Link to="/shop" onClick={() => setIsMenuOpen(false)} className={location.pathname === '/shop' ? 'active' : ''}>Shop</Link>
              </li>
              
              {/* MEN Mobile Dropdown */}
              <li className="mobile-nav-dropdown">
                <div 
                  className="mobile-dropdown-header" 
                  onClick={() => setMobileDropdown(mobileDropdown === 'men' ? null : 'men')}
                >
                  <span className={location.pathname.startsWith('/men') ? 'active' : ''}>MEN</span>
                  <span className={`dropdown-arrow ${mobileDropdown === 'men' ? 'open' : ''}`}>▼</span>
                </div>
                <AnimatePresence>
                  {mobileDropdown === 'men' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mobile-dropdown-content"
                    >
                      <div className="mobile-dropdown-col">
                        <div className="mobile-dropdown-heading">Top Rated</div>
                        <ul>
                          <li><Link to="/shop?category=T-Shirts" onClick={() => setIsMenuOpen(false)}>T-Shirts</Link></li>
                          <li><Link to="/shop?category=Shirts" onClick={() => setIsMenuOpen(false)}>Shirts</Link></li>
                          <li><Link to="/shop?category=SweatShirts" onClick={() => setIsMenuOpen(false)}>SweatShirts</Link></li>
                        </ul>
                      </div>
                      <div className="mobile-dropdown-col">
                        <div className="mobile-dropdown-heading">Hoodies</div>
                        <ul>
                          <li><Link to="/shop?category=Hoodies" onClick={() => setIsMenuOpen(false)}>Hoodies</Link></li>
                          <li><Link to="/shop?category=Jackets" onClick={() => setIsMenuOpen(false)}>Jackets</Link></li>
                        </ul>
                      </div>
                      <div className="mobile-dropdown-col">
                        <div className="mobile-dropdown-heading">Bottom Wear</div>
                        <ul>
                          <li><Link to="/shop?category=Jeans" onClick={() => setIsMenuOpen(false)}>Jeans</Link></li>
                          <li><Link to="/shop?category=Trousers" onClick={() => setIsMenuOpen(false)}>Trousers</Link></li>
                          <li><Link to="/shop?category=Formal" onClick={() => setIsMenuOpen(false)}>Formal</Link></li>
                        </ul>
                      </div>
                      <div className="mobile-dropdown-col">
                        <div className="mobile-dropdown-heading">Accessories</div>
                        <ul>
                          <li><Link to="/shop?category=Accessories" onClick={() => setIsMenuOpen(false)}>Accessories</Link></li>
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>

              {/* WOMEN Mobile Dropdown */}
              <li className="mobile-nav-dropdown">
                <div 
                  className="mobile-dropdown-header" 
                  onClick={() => setMobileDropdown(mobileDropdown === 'women' ? null : 'women')}
                >
                  <span className={location.pathname.startsWith('/women') ? 'active' : ''}>WOMEN</span>
                  <span className={`dropdown-arrow ${mobileDropdown === 'women' ? 'open' : ''}`}>▼</span>
                </div>
                <AnimatePresence>
                  {mobileDropdown === 'women' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mobile-dropdown-content relative-coming-soon"
                    >
                      <div className="coming-soon-overlay">
                        <span>Coming Soon</span>
                      </div>
                      <div className="mobile-dropdown-col">
                        <div className="mobile-dropdown-heading">Top Wear</div>
                        <ul>
                          <li><Link to="/shop?category=WomenTopWear" onClick={() => setIsMenuOpen(false)}>Top Wear</Link></li>
                        </ul>
                      </div>
                      <div className="mobile-dropdown-col">
                        <div className="mobile-dropdown-heading">Bottom Wear</div>
                        <ul>
                          <li><Link to="/shop?category=WomenBottomWear" onClick={() => setIsMenuOpen(false)}>Bottom Wear</Link></li>
                        </ul>
                      </div>
                      <div className="mobile-dropdown-col">
                        <div className="mobile-dropdown-heading">Accessories</div>
                        <ul>
                          <li><Link to="/shop?category=WomenAccessories" onClick={() => setIsMenuOpen(false)}>Accessories</Link></li>
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>

              {/* ACCESSORIES Mobile Dropdown */}
              <li className="mobile-nav-dropdown">
                <div 
                  className="mobile-dropdown-header" 
                  onClick={() => setMobileDropdown(mobileDropdown === 'accessories' ? null : 'accessories')}
                >
                  <span className={location.pathname.startsWith('/accessories') ? 'active' : ''}>ACCESSORIES</span>
                  <span className={`dropdown-arrow ${mobileDropdown === 'accessories' ? 'open' : ''}`}>▼</span>
                </div>
                <AnimatePresence>
                  {mobileDropdown === 'accessories' && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="mobile-dropdown-content relative-coming-soon"
                    >
                      <div className="coming-soon-overlay">
                        <span>Coming Soon</span>
                      </div>
                      <div className="mobile-dropdown-col">
                        <div className="mobile-dropdown-heading">Top Wear</div>
                        <ul>
                          <li><Link to="/shop?category=WomenTopWear" onClick={() => setIsMenuOpen(false)}>Top Wear</Link></li>
                        </ul>
                      </div>
                      <div className="mobile-dropdown-col">
                        <div className="mobile-dropdown-heading">Bottom Wear</div>
                        <ul>
                          <li><Link to="/shop?category=WomenBottomWear" onClick={() => setIsMenuOpen(false)}>Bottom Wear</Link></li>
                        </ul>
                      </div>
                      <div className="mobile-dropdown-col">
                        <div className="mobile-dropdown-heading">Accessories</div>
                        <ul>
                          <li><Link to="/shop?category=WomenAccessories" onClick={() => setIsMenuOpen(false)}>Accessories</Link></li>
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>

              <li>
                <Link to="/about" onClick={() => setIsMenuOpen(false)} className={location.pathname === '/about' ? 'active' : ''}>About</Link>
              </li>
              <li>
                <Link to="/contact" onClick={() => setIsMenuOpen(false)} className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

