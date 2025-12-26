import React from 'react'
import Style from '../CSS/footer.module.css'
import { Link } from 'react-router-dom'
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaPinterestP, 
  FaMapMarkerAlt, 
  FaPhoneAlt, 
  FaEnvelope,
  FaCcVisa,
  FaCcMastercard,
  FaCcPaypal,
  FaCcAmex
} from 'react-icons/fa'

function Footer() {
  return (
    <footer className={Style.footer}>
      <div className={Style.footerPattern}></div>
      <div className={Style.container}>
        <div className={Style.footerFlex}>
          <div className={Style.brandColumn}>
            <h1 className={Style.footerLogo}>
              <span className={Style.footerLogoHighlight}>Shop</span>ily
            </h1>
            <p className={Style.footerText}>
              Discover the latest trends in fashion and lifestyle products. 
              We bring you carefully curated collections that combine style, quality, and value.
            </p>
            
            <form className={Style.newsletterForm}>
              <input 
                type="email" 
                placeholder="Your email address" 
                className={Style.newsletterInput} 
              />
              <button type="submit" className={Style.newsletterButton}>
                Subscribe
              </button>
            </form>
            
            <div className={Style.socialIcons}>
              <Link to="https://www.facebook.com/login/" className={Style.socialIcon}>
                <FaFacebookF />
              </Link>
              <Link to="https://twitter.com/" className={Style.socialIcon}>
                <FaTwitter />
              </Link>
              <Link to="https://www.instagram.com/accounts/login/" className={Style.socialIcon}>
                <FaInstagram />
              </Link>
              <Link to="https://in.pinterest.com/login/" className={Style.socialIcon}>
                <FaPinterestP />
              </Link>
            </div>
          </div>
          
          <div className={Style.footerColumn}>
            <h3 className={Style.footerHeading}>Shop</h3>
            <ul className={Style.footerLinks}>
              <li><Link to="/products">All Products</Link></li>
              <li><Link to="/products">New Arrivals</Link></li>
              <li><Link to="/products">Best Sellers</Link></li>
              <li><Link to="/products">Special Offers</Link></li>
              <li><Link to="/products">Coming Soon</Link></li>
            </ul>
          </div>
          
          <div className={Style.footerColumn}>
            <h3 className={Style.footerHeading}>Help</h3>
            <ul className={Style.footerLinks}>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/">Shipping & Returns</Link></li>
              <li><Link to="/">FAQs</Link></li>
              <li><Link to="/">Size Guide</Link></li>
            </ul>
          </div>
          
          <div className={Style.footerColumn}>
            <h3 className={Style.footerHeading}>Contact</h3>
            <div className={Style.contactItem}>
              <FaMapMarkerAlt className={Style.contactIcon} />
              <p className={Style.contactText}>123 Fashion Street, Design District, New York, NY 10001</p>
            </div>
            <div className={Style.contactItem}>
              <FaPhoneAlt className={Style.contactIcon} />
              <p className={Style.contactText}>+1 (555) 123-4567</p>
            </div>
            <div className={Style.contactItem}>
              <FaEnvelope className={Style.contactIcon} />
              <p className={Style.contactText}>support@shopily.com</p>
            </div>
          </div>
        </div>
        
        <div className={Style.divider}></div>
        
        <div className={Style.footerBottom}>
          <p className={Style.copyright}>
            © {new Date().getFullYear()} Shopily. All rights reserved.
          </p>
          
          <div className={Style.creditCards}>
            <FaCcVisa className={Style.cardIcon} />
            <FaCcMastercard className={Style.cardIcon} />
            <FaCcPaypal className={Style.cardIcon} />
            <FaCcAmex className={Style.cardIcon} />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
