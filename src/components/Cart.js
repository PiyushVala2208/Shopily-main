import React, { useState, useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styles from '../CSS/Cart.module.css'
import productContext from '../Context/products/productContext'
import { FaShoppingCart, FaArrowLeft, FaTrashAlt, FaPlus, FaMinus, FaTag } from 'react-icons/fa'

function Cart() {
  const context = useContext(productContext)
  const { cartData, removeFromCart } = context
  
  const [quantities, setQuantities] = useState({})
  const [subTotal, setSubTotal] = useState(0)
  const [tax, setTax] = useState(0)
  const [total, setTotal] = useState(0)
  const [promoCode, setPromoCode] = useState('')
  const [discount, setDiscount] = useState(0)
  
  // Initialize quantities from cart data when component mounts
  useEffect(() => {
    const initialQuantities = {}
    cartData.forEach(item => {
      initialQuantities[item.id] = item.cartQuantity || 1
    })
    setQuantities(initialQuantities)
  }, [cartData])
  
  // Calculate totals whenever quantities or cart items change
  useEffect(() => {
    calculateTotals()
  }, [quantities, cartData])
  
  // Handle item removal
  const handleRemoveItem = (id) => {
    removeFromCart(id)
  }
  
  // Handle quantity change
  const handleQuantityChange = (id, value) => {
    if (value > 0) {
      setQuantities({
        ...quantities,
        [id]: value
      })
    }
  }
  
  // Handle increment quantity
  const incrementQuantity = (id) => {
    const newValue = (quantities[id] || 1) + 1
    handleQuantityChange(id, newValue)
  }
  
  // Handle decrement quantity
  const decrementQuantity = (id) => {
    const newValue = (quantities[id] || 1) - 1
    if (newValue > 0) {
      handleQuantityChange(id, newValue)
    }
  }
  
  // Handle direct quantity input
  const handleQuantityInput = (e, id) => {
    const value = parseInt(e.target.value)
    if (!isNaN(value)) {
      handleQuantityChange(id, value)
    }
  }
  
  // Calculate cart totals
  const calculateTotals = () => {
    let calculatedSubTotal = 0
    
    cartData.forEach(item => {
      const quantity = quantities[item.id] || 1
      calculatedSubTotal += item.price * quantity
    })
    
    const calculatedTax = calculatedSubTotal * 0.08 // 8% tax
    const calculatedDiscount = discount
    const calculatedTotal = calculatedSubTotal + calculatedTax - calculatedDiscount
    
    setSubTotal(calculatedSubTotal)
    setTax(calculatedTax)
    setTotal(calculatedTotal)
  }
  
  // Handle apply promo code
  const handleApplyPromoCode = (e) => {
    e.preventDefault()
    
    // Simple promo code example - in real app this would verify with backend
    if (promoCode === 'SHOPILY20') {
      const newDiscount = subTotal * 0.2 // 20% off
      setDiscount(newDiscount)
    } else {
      alert('Invalid promo code')
    }
  }
  
  // Get total items in cart
  const getTotalItems = () => {
    let count = 0
    cartData.forEach(item => {
      count += quantities[item.id] || 1
    })
    return count
  }
  
  // Calculate item total
  const getItemTotal = (item) => {
    const quantity = quantities[item.id] || 1
    return item.price * quantity
  }
  
  // Render empty cart state
  const renderEmptyCart = () => {
    return (
      <div className={styles.emptyCart}>
        <FaShoppingCart className={styles.emptyCartIcon} />
        <h2 className={styles.emptyCartTitle}>Your cart is empty</h2>
        <p className={styles.emptyCartText}>Looks like you haven't added any products to your cart yet.</p>
        <Link to="/Product" className={styles.continueShopping}>
          <FaArrowLeft /> Continue Shopping
        </Link>
      </div>
    )
  }
  
  // Format price to 2 decimal places with currency symbol
  const formatPrice = (price) => {
    return `$${price.toFixed(2)}`
  }
  
  return (
    <div className={styles.cartPage}>
      <div className={styles.cartContainer}>
        <h1 className={styles.pageTitle}>Shopping Cart</h1>
        
        {cartData.length === 0 ? (
          renderEmptyCart()
        ) : (
          <div className={styles.cartLayout}>
            <div className={styles.cartList}>
              <div className={styles.cartHeader}>
                <div className={styles.cartHeaderItem}>Product</div>
                <div className={styles.cartHeaderItem}>Price</div>
                <div className={styles.cartHeaderItem}>Quantity</div>
                <div className={styles.cartHeaderItem}>Total</div>
              </div>
              
              {cartData.map((item) => (
                <div key={item.id} className={styles.cartItem}>
                  <div className={styles.productInfo}>
                    <img
                      src={item.thumbnail}
                      alt={item.title}
                      className={styles.productImage}
                    />
                    <div className={styles.productDetails}>
                      <h3 className={styles.productTitle}>{item.title}</h3>
                      <p className={styles.productCategory}>{item.category}</p>
                      <button
                        className={styles.removeButton}
                        onClick={() => handleRemoveItem(item.id)}
                      >
                        <FaTrashAlt /> Remove
                      </button>
                    </div>
                  </div>
                  
                  <div className={styles.itemPrice}>
                    {formatPrice(item.price)}
                  </div>
                  
                  <div className={styles.quantityControls}>
                    <button
                      className={styles.quantityButton}
                      onClick={() => decrementQuantity(item.id)}
                      disabled={quantities[item.id] <= 1}
                    >
                      <FaMinus />
                    </button>
                    <input
                      type="text"
                      value={quantities[item.id] || 1}
                      onChange={(e) => handleQuantityInput(e, item.id)}
                      className={styles.quantityInput}
                    />
                    <button
                      className={styles.quantityButton}
                      onClick={() => incrementQuantity(item.id)}
                    >
                      <FaPlus />
                    </button>
                  </div>
                  
                  <div className={styles.itemTotal}>
                    {formatPrice(getItemTotal(item))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className={styles.orderSummary}>
              <h2 className={styles.summaryTitle}>Order Summary</h2>
              
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Items ({getTotalItems()})</span>
                <span className={styles.summaryValue}>{formatPrice(subTotal)}</span>
              </div>
              
              <div className={styles.summaryRow}>
                <span className={styles.summaryLabel}>Tax</span>
                <span className={styles.summaryValue}>{formatPrice(tax)}</span>
              </div>
              
              {discount > 0 && (
                <div className={styles.summaryRow}>
                  <span className={styles.summaryLabel}>Discount</span>
                  <span className={styles.summaryValue}>-{formatPrice(discount)}</span>
                </div>
              )}
              
              <div className={styles.summaryTotal}>
                <span className={styles.totalLabel}>Total</span>
                <span className={styles.totalValue}>{formatPrice(total)}</span>
              </div>
              
              <button className={styles.checkoutButton}>
                Proceed to Checkout
              </button>
              
              <Link to="/Product" className={styles.continueShoppingLink}>
                Continue Shopping
              </Link>
              
              <div className={styles.promoCodeSection}>
                <h3 className={styles.promoCodeTitle}>Have a Promo Code?</h3>
                <form className={styles.promoCodeForm} onSubmit={handleApplyPromoCode}>
                  <input
                    type="text"
                    className={styles.promoCodeInput}
                    placeholder="Enter promo code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                  />
                  <button type="submit" className={styles.applyButton}>
                    Apply
                  </button>
                </form>
                          </div>
                        </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Cart
