import React, { useState, useEffect, useRef, useContext } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaShoppingCart, FaUser, FaSearch, FaBars, FaTimes } from 'react-icons/fa'
import styles from '../CSS/Navbar.module.css'
import productContext from '../Context/products/productContext'



function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [searchValue, setSearchValue] = useState('')
  const searchInputRef = useRef(null)
  const location = useLocation()
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  
  // Get cart data from context
  const context = useContext(productContext)
  const { getCartItemCount } = context
  
  // Calculate total items in cart
  const cartItemCount = getCartItemCount()
  
  // Check if viewport is mobile
  const isMobile = windowWidth < 768
  
  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
      if (window.innerWidth >= 768) {
        setMenuOpen(false)
      }
    }
    
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false)
    setSearchOpen(false)
  }, [location])
  
  // Toggle search bar
  const toggleSearch = () => {
    setSearchOpen(!searchOpen)
    if (!searchOpen) {
      setTimeout(() => {
        if (searchInputRef.current) {
          searchInputRef.current.focus()
        }
      }, 100)
    }
  }
  
  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navContainer}>
          {/* Mobile menu button */}
          {isMobile && (
            <button 
              className={styles.mobileMenuButton} 
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              {menuOpen ? <FaTimes className={styles.icon} /> : <FaBars className={styles.icon} />}
            </button>
          )}
          
          {/* Logo */}
          <Link to="/" className={styles.logoLink}>
            <h1 className={styles.logo}>
              <span className={styles.logoHighlight}>Shop</span>
              <span className={styles.logoDark}>ily</span>
            </h1>
          </Link>
          
          {/* Desktop Menu */}
          {!isMobile && (
            <div className={styles.desktopMenu}>
              <Link 
                to="/" 
                className={`${styles.menuItem} ${location.pathname === '/' ? styles.activeMenuItem : ''}`}
              >
                Home
              </Link>
              <Link 
                to="/Product" 
                className={`${styles.menuItem} ${location.pathname === '/Product' ? styles.activeMenuItem : ''}`}
              >
                Products
              </Link>
              <Link 
                to="/about" 
                className={`${styles.menuItem} ${location.pathname === '/about' ? styles.activeMenuItem : ''}`}
              >
                About
              </Link>
              <Link 
                to="/contact" 
                className={`${styles.menuItem} ${location.pathname === '/contact' ? styles.activeMenuItem : ''}`}
              >
                Contact
              </Link>
            </div>
          )}
          
          {/* Right side actions */}
          <div className={styles.actions}>
            {/* Search Button/Input */}
            <div className={`${styles.searchContainer} ${searchOpen ? styles.open : ''}`}>
              {searchOpen && (
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search products..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className={styles.searchInput}
                />
              )}
              <button 
                className={styles.actionButton} 
                onClick={toggleSearch}
                aria-label="Search"
              >
                {searchOpen ? <FaTimes className={styles.icon} /> : <FaSearch className={styles.icon} />}
              </button>
            </div>
            
            {/* Account Button */}
            <Link to="/Account" className={styles.actionLink}>
              <button className={styles.actionButton} aria-label="My Account">
                <FaUser className={styles.icon} />
              </button>
            </Link>
            
            {/* Cart Button */}
            <Link to="/Cart" className={styles.actionLink}>
              <button className={styles.actionButton} aria-label="Shopping Cart">
                <FaShoppingCart className={styles.icon} />
                {cartItemCount > 0 && <span className={styles.badge}>{cartItemCount}</span>}
              </button>
            </Link>
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      <div 
        className={`${styles.mobileMenuContainer} ${menuOpen ? styles.mobileMenuOpen : ''}`}
      >
        <div className={styles.mobileMenuContent}>
          <Link 
            to="/" 
            className={`${styles.mobileMenuItem} ${location.pathname === '/' ? styles.activeMobileMenuItem : ''}`}
          >
            Home
          </Link>
          <Link 
            to="/Product" 
            className={`${styles.mobileMenuItem} ${location.pathname === '/Product' ? styles.activeMobileMenuItem : ''}`}
          >
            Products
          </Link>
          <Link 
            to="/about" 
            className={`${styles.mobileMenuItem} ${location.pathname === '/about' ? styles.activeMobileMenuItem : ''}`}
          >
            About
          </Link>
          <Link 
            to="/contact" 
            className={`${styles.mobileMenuItem} ${location.pathname === '/contact' ? styles.activeMobileMenuItem : ''}`}
          >
            Contact
          </Link>
          
          {/* Search in mobile menu */}
          <div className={styles.mobileSearchContainer}>
            <input
              type="text"
              placeholder="Search products..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className={styles.mobileSearchInput}
            />
            <button className={styles.mobileSearchButton}>
              <FaSearch className={styles.searchIcon} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Overlay */}
      {menuOpen && (
        <div 
          className={styles.overlay}
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  )
}

export default Navbar
