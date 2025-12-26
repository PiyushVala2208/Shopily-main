import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from '../CSS/Account.module.css'
import { FaUser, FaLock, FaEnvelope, FaCheck, FaGoogle, FaFacebookF } from 'react-icons/fa'

function Account() {
  const [activeTab, setActiveTab] = useState('login') // 'login' or 'register'
  const [formData, setFormData] = useState({
    login: {
      email: '',
      password: ''
    },
    register: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    }
  })
  const [formErrors, setFormErrors] = useState({
    login: {},
    register: {}
  })

  // Switch between login and register tabs
  const switchTab = (tab) => {
    setActiveTab(tab)
  }

  // Handle form input changes
  const handleInputChange = (form, field, value) => {
    setFormData({
      ...formData,
      [form]: {
        ...formData[form],
        [field]: value
      }
    })
    
    // Clear error when typing
    if (formErrors[form][field]) {
      setFormErrors({
        ...formErrors,
        [form]: {
          ...formErrors[form],
          [field]: ''
        }
      })
    }
  }

  // Validate login form
  const validateLoginForm = () => {
    const errors = {}
    const { email, password } = formData.login
    
    if (!email) errors.email = 'Email is required'
    if (!password) errors.password = 'Password is required'
    
    return errors
  }

  // Validate registration form
  const validateRegisterForm = () => {
    const errors = {}
    const { username, email, password, confirmPassword } = formData.register
    
    if (!username) errors.username = 'Username is required'
    if (!email) errors.email = 'Email is required'
    if (!password) errors.password = 'Password is required'
    if (password && password.length < 6) errors.password = 'Password must be at least 6 characters'
    if (!confirmPassword) errors.confirmPassword = 'Please confirm your password'
    if (password && confirmPassword && password !== confirmPassword) errors.confirmPassword = 'Passwords do not match'
    
    return errors
  }

  // Handle login form submission
  const handleLoginSubmit = (e) => {
    e.preventDefault()
    
    const errors = validateLoginForm()
    if (Object.keys(errors).length > 0) {
      setFormErrors({
        ...formErrors,
        login: errors
      })
      return
    }
    
    // Here you would typically make an API call to your backend
    console.log('Logging in with:', formData.login)
    alert('Login successful (demo)')
  }

  // Handle registration form submission
  const handleRegisterSubmit = (e) => {
    e.preventDefault()
    
    const errors = validateRegisterForm()
    if (Object.keys(errors).length > 0) {
      setFormErrors({
        ...formErrors,
        register: errors
      })
      return
    }
    
    // Here you would typically make an API call to your backend
    console.log('Registering with:', formData.register)
    alert('Registration successful (demo)')
  }

  return (
    <div className={styles.accountPage}>
      <div className={styles.container}>
        <div className={styles.authContainer}>
          {/* Left panel with information */}
          <div className={styles.leftPanel}>
            <div className={styles.patternOverlay}></div>
            <img src="https://shopilyhub.co/cdn/shop/files/Shopily_Logo.png?v=1685132222&width=3017" alt="Shopily" className={styles.brandLogo} />
            <h1 className={styles.welcomeTitle}>{activeTab === 'login' ? 'Welcome Back!' : 'Join Shopily Today'}</h1>
            <p className={styles.welcomeText}>
              {activeTab === 'login' 
                ? 'Sign in to access your account, manage your orders, and continue your shopping experience.' 
                : 'Create an account to enjoy personalized shopping, easy checkout, and exclusive member benefits.'}
            </p>
            
            <div className={styles.benefits}>
              <div className={styles.benefitItem}>
                <div className={styles.benefitIcon}>
                  <FaCheck />
                </div>
                <div className={styles.benefitText}>Fast checkout with saved shipping details</div>
              </div>
              <div className={styles.benefitItem}>
                <div className={styles.benefitIcon}>
                  <FaCheck />
                </div>
                <div className={styles.benefitText}>Order tracking and purchase history</div>
              </div>
              <div className={styles.benefitItem}>
                <div className={styles.benefitIcon}>
                  <FaCheck />
                </div>
                <div className={styles.benefitText}>Exclusive access to special offers and promotions</div>
              </div>
            </div>
          </div>
          
          {/* Right panel with forms */}
          <div className={styles.rightPanel}>
            <div className={styles.tabsContainer}>
              <div 
                className={`${styles.tabItem} ${activeTab === 'login' ? styles.active : ''}`}
                onClick={() => switchTab('login')}
              >
                Login
              </div>
              <div 
                className={`${styles.tabItem} ${activeTab === 'register' ? styles.active : ''}`}
                onClick={() => switchTab('register')}
              >
                Register
              </div>
              <div 
                className={styles.tabIndicator}
                style={{ 
                  width: '60px', 
                  left: activeTab === 'login' ? '30px' : '145px'
                }}
              ></div>
            </div>
            
            <div className={styles.formContainer}>
              {/* Login Form */}
              <form 
                className={`${styles.form} ${activeTab === 'login' ? styles.visible : ''}`}
                onSubmit={handleLoginSubmit}
              >
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Email Address</label>
                  <div className={styles.inputField}>
                    <FaEnvelope />
                    <input 
                      type="email" 
                      placeholder="Enter your email" 
                      value={formData.login.email}
                      onChange={(e) => handleInputChange('login', 'email', e.target.value)}
                    />
                  </div>
                  {formErrors.login.email && <div className={styles.errorMessage}>{formErrors.login.email}</div>}
                </div>
                
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Password</label>
                  <div className={styles.inputField}>
                    <FaLock />
                    <input 
                      type="password" 
                      placeholder="Enter your password" 
                      value={formData.login.password}
                      onChange={(e) => handleInputChange('login', 'password', e.target.value)}
                    />
                  </div>
                  {formErrors.login.password && <div className={styles.errorMessage}>{formErrors.login.password}</div>}
                </div>
                
                <Link to="/forgot-password" className={styles.forgotPassword}>Forgot password?</Link>
                
                <button type="submit" className={styles.submitButton}>
                  Login
                </button>
                
                <div className={styles.seperator}>or continue with</div>
                
                <div className={styles.socialLogin}>
                  <button type="button" className={styles.socialButton}>
                    <FaGoogle /> Google
                  </button>
                  <button type="button" className={styles.socialButton}>
                    <FaFacebookF /> Facebook
                  </button>
                </div>
                
                <div className={styles.formFooter}>
                  Don't have an account?{' '}
                  <span className={styles.formLink} onClick={() => switchTab('register')}>
                    Register now
                  </span>
                </div>
              </form>
              
              {/* Register Form */}
              <form 
                className={`${styles.form} ${activeTab === 'register' ? styles.visible : ''}`}
                onSubmit={handleRegisterSubmit}
              >
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Username</label>
                  <div className={styles.inputField}>
                    <FaUser />
                    <input 
                      type="text" 
                      placeholder="Choose a username" 
                      value={formData.register.username}
                      onChange={(e) => handleInputChange('register', 'username', e.target.value)}
                    />
                  </div>
                  {formErrors.register.username && <div className={styles.errorMessage}>{formErrors.register.username}</div>}
                </div>
                
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Email Address</label>
                  <div className={styles.inputField}>
                    <FaEnvelope />
                    <input 
                      type="email" 
                      placeholder="Enter your email" 
                      value={formData.register.email}
                      onChange={(e) => handleInputChange('register', 'email', e.target.value)}
                    />
                  </div>
                  {formErrors.register.email && <div className={styles.errorMessage}>{formErrors.register.email}</div>}
                </div>
                
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Password</label>
                  <div className={styles.inputField}>
                    <FaLock />
                    <input 
                      type="password" 
                      placeholder="Create a password" 
                      value={formData.register.password}
                      onChange={(e) => handleInputChange('register', 'password', e.target.value)}
                    />
                  </div>
                  {formErrors.register.password && <div className={styles.errorMessage}>{formErrors.register.password}</div>}
                </div>
                
                <div className={styles.inputGroup}>
                  <label className={styles.inputLabel}>Confirm Password</label>
                  <div className={styles.inputField}>
                    <FaLock />
                    <input 
                      type="password" 
                      placeholder="Confirm your password" 
                      value={formData.register.confirmPassword}
                      onChange={(e) => handleInputChange('register', 'confirmPassword', e.target.value)}
                    />
                  </div>
                  {formErrors.register.confirmPassword && <div className={styles.errorMessage}>{formErrors.register.confirmPassword}</div>}
                </div>
                
                <button type="submit" className={styles.submitButton}>
                  Register
                </button>
                
                <div className={styles.formFooter}>
                  Already have an account?{' '}
                  <span className={styles.formLink} onClick={() => switchTab('login')}>
                    Login
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Account
