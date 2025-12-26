import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import style from '../CSS/Product.module.css'
import productContext from '../Context/products/productContext'
import { FaStar, FaHeart, FaShoppingCart, FaEye } from 'react-icons/fa'

function ProductItem(props) {
    const { products } = props
    const context = useContext(productContext)
    const { getOneProduct, addToCart } = context
    const navigate = useNavigate()

    // Handle product click to view details
    const handleProductClick = () => {
        // First call context method to set the product in global state
        if (typeof getOneProduct === 'function') {
            getOneProduct(products.id)
        }
        
        // Then navigate to the product detail page
        navigate(`/product/${products.id}`)
    }
    
    // Handle quick view button click
    const handleQuickView = (e) => {
        e.stopPropagation() // Prevent triggering the card click
        // Same functionality as clicking the entire card
        if (typeof getOneProduct === 'function') {
            getOneProduct(products.id)
        }
        navigate(`/product/${products.id}`)
    }
    
    // Handle add to cart
    const handleAddToCart = (e) => {
        e.stopPropagation() // Prevent triggering the card click
        // Add to cart functionality
        if (typeof addToCart === 'function') {
            addToCart({...products, cartQuantity: 1})
            // Toast notification is now handled in the context
        }
    }
    
    // Handle add to wishlist
    const handleAddToWishlist = (e) => {
        e.stopPropagation() // Prevent triggering the card click
        // Add to wishlist functionality would go here
        alert(`${products.title} added to wishlist!`)
    }
    
    // Calculate star rating
    const renderStars = (rating) => {
        const fullStars = Math.floor(rating)
        const hasHalfStar = rating % 1 >= 0.5
        
        return (
            <div className={style.stars}>
                {[...Array(fullStars)].map((_, i) => (
                    <FaStar key={i} />
                ))}
            </div>
        )
    }
    
    // Calculate original price before discount
    const getOriginalPrice = () => {
        if (!products.price || !products.discountPercentage) return null
        
        return Math.round(products.price / (1 - products.discountPercentage / 100))
    }

    return (
        <div 
            className={style.productCard} 
            onClick={handleProductClick}
        >
            <div className={style.productImageContainer}>
                <img 
                    src={products.thumbnail} 
                    alt={products.title} 
                    className={style.productImage}
                />
                {products.discountPercentage > 10 && (
                    <div className={style.discountBadge}>
                        {Math.round(products.discountPercentage)}% OFF
                    </div>
                )}
                <button 
                    className={style.wishlistButton}
                    onClick={handleAddToWishlist}
                    aria-label="Add to wishlist"
                >
                    <FaHeart />
                </button>
                
                <div className={style.productActions}>
                    <button 
                        className={style.quickViewButton}
                        onClick={handleQuickView}
                        aria-label="View product details"
                    >
                        <FaEye /> View Details
                    </button>
                </div>
            </div>
            <div className={style.productInfo}>
                <div className={style.productBrand}>{products.brand}</div>
                <h3 className={style.productTitle}>{products.title}</h3>
                
                <div className={style.priceContainer}>
                    <span className={style.price}>${products.price}</span>
                    {products.discountPercentage > 0 && (
                        <span className={style.originalPrice}>
                            ${getOriginalPrice()}
                        </span>
                    )}
                </div>
                
                <div className={style.ratingContainer}>
                    {renderStars(products.rating)}
                    <span className={style.ratingCount}>({products.rating})</span>
                </div>
                
                <button 
                    className={style.addToCartButton}
                    onClick={handleAddToCart}
                    aria-label="Add to cart"
                >
                    <FaShoppingCart style={{ marginRight: '8px' }} /> Add to Cart
                </button>
            </div>
        </div>
    )
}

export default ProductItem
