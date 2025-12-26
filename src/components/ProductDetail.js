import React, { useState, useContext, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import productContext from '../Context/products/productContext'
import style from '../CSS/ProductDetail.module.css'
import axios from 'axios'
import { 
  FaArrowLeft, 
  FaShoppingCart, 
  FaHeart, 
  FaStar, 
  FaStarHalf, 
  FaMinus, 
  FaPlus,
  FaCheckCircle,
  FaRegClock,
  FaTruck,
  FaShieldAlt,
  FaUndo
} from 'react-icons/fa'

function ProductDetail() {
  const { id } = useParams(); // Get product ID from URL params
  const context = useContext(productContext);
  const { oneProduct, addToCart, fetchProductById } = context;
  const navigate = useNavigate();
  
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedDescription, setExpandedDescription] = useState(false);
  
  useEffect(() => {
    // If we have an ID from the URL, fetch that product
    if (id) {
      setLoading(true);
      setError(null);
      
      const loadProduct = async () => {
        try {
          // Try to fetch the product directly if fetchProductById is available
          if (typeof fetchProductById === 'function') {
            const result = await fetchProductById(id);
            
            if (!result) {
              throw new Error('Product not found');
            }
          } else {
            // Otherwise fetch it directly with axios
            await fetchProductDirectly(id);
          }
        } catch (err) {
          console.error('Error loading product:', err);
          setError(err.message || 'Failed to load product');
        } finally {
          setLoading(false);
        }
      };
      
      loadProduct();
    }
    
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, [id, fetchProductById]);
  
  // Fetch product directly if context method is not available
  const fetchProductDirectly = async (productId) => {
    try {
      const response = await axios.get(`https://dummyjson.com/products/${productId}`);
      if (!response.data) {
        throw new Error('Product not found');
      }
      setProduct(response.data);
    } catch (error) {
      console.error('Error fetching product:', error);
      setError(error.message || 'Failed to load product');
      throw error;
    }
  };
  
  // Use product from context if available, otherwise use the one we fetched directly
  const currentProduct = oneProduct?.id ? oneProduct : product;
  
  useEffect(() => {
    // Set the default selected image when product data loads
    if (currentProduct && currentProduct.thumbnail) {
      setSelectedImage(currentProduct.thumbnail);
    }
  }, [currentProduct]);
  
  const handleImageSelect = (image) => {
    setSelectedImage(image);
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    if (currentProduct && quantity < currentProduct.stock) {
      setQuantity(quantity + 1);
    }
  };
  
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (currentProduct && value > 0 && value <= currentProduct.stock) {
      setQuantity(value);
    }
  };
  
  const handleAddToCart = () => {
    // Add loading animation
    setIsAddingToCart(true);
    
    // Add the product to cart with the selected quantity
    if (typeof addToCart === 'function' && currentProduct) {
      addToCart({...currentProduct, cartQuantity: quantity});
    }
    
    // Reset after 1 second
    setTimeout(() => {
      setIsAddingToCart(false);
    }, 1000);
  };

  const handleExpandDescription = () => {
    setExpandedDescription(!expandedDescription);
  };
  
  const renderStars = (rating) => {
    if (!rating) return null;
    
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    return (
      <div className={style.stars}>
        {[...Array(fullStars)].map((_, i) => (
          <FaStar key={i} />
        ))}
        {hasHalfStar && <FaStarHalf />}
      </div>
    );
  };
  
  // Determine stock status
  const getStockStatus = () => {
    if (!currentProduct || currentProduct.stock === undefined) return null;
    
    if (currentProduct.stock > 10) {
      return <span className={`${style.stockStatus} ${style.inStock}`}>In Stock</span>;
    } else if (currentProduct.stock > 0) {
      return <span className={`${style.stockStatus} ${style.lowStock}`}>Low Stock</span>;
    } else {
      return <span className={`${style.stockStatus} ${style.outOfStock}`}>Out of Stock</span>;
    }
  };
  
  // Calculate original price before discount
  const getOriginalPrice = () => {
    if (!currentProduct || !currentProduct.price || !currentProduct.discountPercentage) return null;
    
    return Math.round(currentProduct.price / (1 - currentProduct.discountPercentage / 100));
  };

  // Add additional product description content
  const getFullDescription = () => {
    if (!currentProduct || !currentProduct.description) return '';
    
    // Original description
    const originalDesc = currentProduct.description;
    
    // Additional description content
    const additionalContent = `
      This premium ${currentProduct.category} from ${currentProduct.brand} offers exceptional quality and value. 
      Crafted with attention to detail, it delivers outstanding performance and reliability.
      
      ${currentProduct.title} features:
      • Premium materials for long-lasting durability
      • Elegant design that complements any style
      • Intuitive functionality for ease of use
      • Industry-leading quality assurance
      
      Whether you're looking for style, performance, or reliability, ${currentProduct.title} is the perfect choice.
    `;
    
    return expandedDescription ? originalDesc + additionalContent : originalDesc;
  };
  
  const goBack = () => {
    navigate(-1); // Go back to previous page
  };
  
  // Loading state
  if (loading) {
    return (
      <div className={style.productDetailPage}>
        <div className={style.container}>
          <div className={style.loadingContainer}>
            <p>Loading product details...</p>
          </div>
        </div>
      </div>
    );
  }
  
  // Error state
  if (error || (!currentProduct && !oneProduct)) {
    return (
      <div className={style.productDetailPage}>
        <div className={style.container}>
          <div className={style.errorContainer}>
            <h2>Product Not Found</h2>
            <p>{error || "Sorry, we couldn't find the product you're looking for."}</p>
            <button onClick={goBack} className={style.backButton}>
              <FaArrowLeft /> Go Back to Products
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className={style.productDetailPage}>
      <div className={style.container}>
        <div className={style.breadcrumbs}>
          <Link to="/" className={style.breadcrumbLink}>Home</Link>
          <span className={style.breadcrumbSeparator}>/</span>
          <Link to="/Product" className={style.breadcrumbLink}>Products</Link>
          <span className={style.breadcrumbSeparator}>/</span>
          <span>{currentProduct.title}</span>
        </div>
        
        <div className={style.productContainer}>
          {/* Left Column - Images */}
          <div className={style.imageContainer}>
            <div className={style.mainImageContainer}>
              {currentProduct.discountPercentage > 10 && (
                <div className={style.discountBadge}>
                  {Math.round(currentProduct.discountPercentage)}% OFF
                </div>
              )}
              <img 
                src={selectedImage} 
                alt={currentProduct.title} 
                className={style.mainImage} 
              />
            </div>
            
            <div className={style.galleryContainer}>
              <div 
                className={`${style.thumbnailContainer} ${selectedImage === currentProduct.thumbnail ? style.active : ''}`}
                onClick={() => handleImageSelect(currentProduct.thumbnail)}
              >
                <img 
                  src={currentProduct.thumbnail} 
                  alt={currentProduct.title} 
                  className={style.thumbnail} 
                />
              </div>
              
              {currentProduct.images && currentProduct.images.map((image, index) => (
                <div 
                  key={index}
                  className={`${style.thumbnailContainer} ${selectedImage === image ? style.active : ''}`}
                  onClick={() => handleImageSelect(image)}
                >
                  <img 
                    src={image} 
                    alt={`${currentProduct.title} - view ${index + 1}`} 
                    className={style.thumbnail} 
                  />
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Column - Product Info */}
          <div className={style.productInfo}>
            <div className={style.brand}>{currentProduct.brand}</div>
            <h1 className={style.productTitle}>{currentProduct.title}</h1>
            
            {currentProduct.rating && (
              <div className={style.ratingContainer}>
                {renderStars(currentProduct.rating)}
                <span className={style.ratingCount}>({currentProduct.rating} rating)</span>
              </div>
            )}
            
            <div className={style.divider}></div>
            
            <div className={style.priceContainer}>
              <span className={style.currentPrice}>${currentProduct.price}</span>
              
              {currentProduct.discountPercentage > 0 && (
                <>
                  <span className={style.originalPrice}>${getOriginalPrice()}</span>
                  <span className={style.discount}>Save {Math.round(currentProduct.discountPercentage)}%</span>
                </>
              )}
            </div>
            
            <div className={style.descriptionContainer}>
              <p className={style.description}>{getFullDescription()}</p>
              <button 
                className={style.readMoreButton} 
                onClick={handleExpandDescription}
              >
                {expandedDescription ? 'Show Less' : 'Read More'}
              </button>
            </div>
            
            <div className={style.productFeatures}>
              <div className={style.featureItem}>
                <FaTruck className={style.featureIcon} />
                <div className={style.featureText}>
                  <span>Free Shipping</span>
                  <small>On orders over $50</small>
                </div>
              </div>
              <div className={style.featureItem}>
                <FaRegClock className={style.featureIcon} />
                <div className={style.featureText}>
                  <span>Fast Delivery</span>
                  <small>2-4 business days</small>
                </div>
              </div>
              <div className={style.featureItem}>
                <FaUndo className={style.featureIcon} />
                <div className={style.featureText}>
                  <span>Easy Returns</span>
                  <small>30 day return policy</small>
                </div>
              </div>
              <div className={style.featureItem}>
                <FaShieldAlt className={style.featureIcon} />
                <div className={style.featureText}>
                  <span>Secure Payments</span>
                  <small>Protected by PayPal</small>
                </div>
              </div>
            </div>
            
            <div className={style.stockInfo}>
              {getStockStatus()}
              {currentProduct.stock > 0 && (
                <span className={style.stockCount}>({currentProduct.stock} items available)</span>
              )}
            </div>
            
            <div className={style.optionsContainer}>
              <label className={style.optionLabel}>Category</label>
              <div className={style.selectWrapper}>
                <select className={style.select} disabled>
                  <option value={currentProduct.category}>{currentProduct.category}</option>
                </select>
              </div>
            </div>
            
            <div className={style.quantityContainer}>
              <label className={style.optionLabel}>Quantity</label>
              <div className={style.quantityControls}>
                <button 
                  className={style.quantityBtn} 
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                >
                  <FaMinus />
                </button>
                <input 
                  type="number" 
                  value={quantity} 
                  onChange={handleQuantityChange}
                  min="1" 
                  max={currentProduct.stock} 
                  className={style.quantityInput} 
                />
                <button 
                  className={style.quantityBtn} 
                  onClick={increaseQuantity}
                  disabled={quantity >= currentProduct.stock}
                >
                  <FaPlus />
                </button>
              </div>
            </div>
            
            <button 
              className={style.addToCartBtn} 
              onClick={handleAddToCart}
              disabled={currentProduct.stock === 0}
            >
              {isAddingToCart ? (
                <>
                  <FaCheckCircle /> Added to Cart
                </>
              ) : (
                <>
                  <FaShoppingCart /> Add to Cart
                </>
              )}
            </button>
            
            <button className={style.wishlistBtn}>
              <FaHeart /> Add to Wishlist
            </button>
          </div>
        </div>
        
        {/* Additional Information Tabs */}
        <div className={style.additionalInfo}>
          <div className={style.tabsContainer}>
            <div 
              className={`${style.tab} ${activeTab === 'description' ? style.active : ''}`}
              onClick={() => setActiveTab('description')}
            >
              Description
            </div>
            <div 
              className={`${style.tab} ${activeTab === 'specifications' ? style.active : ''}`}
              onClick={() => setActiveTab('specifications')}
            >
              Specifications
            </div>
            <div 
              className={`${style.tab} ${activeTab === 'reviews' ? style.active : ''}`}
              onClick={() => setActiveTab('reviews')}
            >
              Reviews
            </div>
          </div>
          
          <div className={`${style.tabContent} ${activeTab === 'description' ? style.active : ''}`}>
            <p>{currentProduct.description}</p>
            <p>This premium quality product from {currentProduct.brand} offers exceptional performance and durability. 
            Designed with user comfort and satisfaction in mind, it provides years of reliable use. The sleek design and 
            premium materials ensure both aesthetic appeal and functional excellence.</p>
            <p>Key features include:</p>
            <ul className={style.featuresList}>
              <li>Premium quality materials for long-lasting performance</li>
              <li>Ergonomic design for maximum comfort</li>
              <li>Versatile functionality for various applications</li>
              <li>Easy maintenance and cleaning</li>
              <li>Backed by manufacturer warranty</li>
            </ul>
          </div>
          
          <div className={`${style.tabContent} ${activeTab === 'specifications' ? style.active : ''}`}>
            <table className={style.specificationsTable}>
              <tbody>
                <tr>
                  <th>Brand</th>
                  <td>{currentProduct.brand}</td>
                </tr>
                <tr>
                  <th>Category</th>
                  <td>{currentProduct.category}</td>
                </tr>
                <tr>
                  <th>Stock</th>
                  <td>{currentProduct.stock} units</td>
                </tr>
                <tr>
                  <th>Rating</th>
                  <td>{currentProduct.rating} out of 5</td>
                </tr>
                <tr>
                  <th>Dimensions</th>
                  <td>Varies by model (see product packaging)</td>
                </tr>
                <tr>
                  <th>Material</th>
                  <td>Premium quality materials</td>
                </tr>
                <tr>
                  <th>Warranty</th>
                  <td>1 year manufacturer warranty</td>
                </tr>
                <tr>
                  <th>Country of Origin</th>
                  <td>Imported</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div className={`${style.tabContent} ${activeTab === 'reviews' ? style.active : ''}`}>
            <div className={style.reviewSummary}>
              <div className={style.reviewRating}>
                <span className={style.avgRating}>{currentProduct.rating}</span>
                <div>
                  {renderStars(currentProduct.rating)}
                  <p>Based on customer reviews</p>
                </div>
              </div>
              <button className={style.writeReviewBtn}>Write a Review</button>
            </div>
            <div className={style.reviewsList}>
              <p>Be the first to review this product!</p>
            </div>
          </div>
        </div>
        
        {/* Back to Products Button */}
        <div className={style.backToProductsContainer}>
          <button className={style.backToProductsBtn} onClick={() => navigate('/Product')}>
            <FaArrowLeft /> Back to All Products
          </button>
        </div>
        
        {/* Related Products Section */}
        <div className={style.relatedProducts}>
          <h2 className={style.sectionTitle}>Related Products</h2>
          <div className={style.relatedProductsGrid}>
            {/* This would typically fetch related products from API */}
            {/* For now, just display some placeholder content */}
            <div className={style.productCard}>
              <p>Related product 1</p>
            </div>
            <div className={style.productCard}>
              <p>Related product 2</p>
            </div>
            <div className={style.productCard}>
              <p>Related product 3</p>
            </div>
            <div className={style.productCard}>
              <p>Related product 4</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail
