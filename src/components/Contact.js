import React, { useState } from 'react'
import styles from '../CSS/Contact.module.css'
import { 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaClock,
  FaArrowRight, 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn,
  FaCheckCircle,
  FaChevronDown,
  FaStore
} from 'react-icons/fa'

function Contact() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  })
  
  const [submitted, setSubmitted] = useState(false)
  const [activeFaq, setActiveFaq] = useState(null)
  
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }
  
  const handleSubmit = (e) => {
    e.preventDefault()
    // Form validation
    if (!formData.firstName || !formData.email || !formData.message) {
      alert('Please fill in all required fields')
      return
    }
    
    // Here you would typically send the data to a server
    console.log('Form submitted:', formData)
    
    // Show success message
    setSubmitted(true)
    
    // Reset form after submission
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      subject: '',
      message: ''
    })
    
    // Hide success message after 5 seconds
    setTimeout(() => {
      setSubmitted(false)
    }, 5000)
  }

  const toggleFaq = (index) => {
    if (activeFaq === index) {
      setActiveFaq(null)
    } else {
      setActiveFaq(index)
    }
  }

  // FAQ Data
  const faqData = [
    {
      question: "What are your shipping rates?",
      answer: "We offer free shipping on all orders above $50. For orders under $50, a flat rate of $5.99 applies. International shipping rates vary depending on location."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a confirmation email with a tracking number. You can use this number to track your package on our website or the carrier's site."
    },
    {
      question: "What is your return policy?",
      answer: "We accept returns within 30 days of purchase. Items must be in their original condition with tags attached. Please contact our customer service team to initiate a return."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to most countries worldwide. International shipping times vary depending on the destination. Please allow 7-14 business days for international deliveries."
    },
    {
      question: "How can I change or cancel my order?",
      answer: "If you need to change or cancel your order, please contact us as soon as possible. We can usually accommodate changes if the order hasn't been processed yet."
    }
  ]
  
  return (
    <div className={styles.contactPage}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroPattern}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Get in Touch</h1>
          <p className={styles.heroSubtitle}>We'd love to hear from you. Reach out with any questions, feedback, or inquiries and our team will get back to you soon.</p>
        </div>
        <svg className={styles.heroWave} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path fill="#f9f7f5" fillOpacity="1" d="M0,192L48,197.3C96,203,192,213,288,213.3C384,213,480,203,576,165.3C672,128,768,64,864,42.7C960,21,1056,43,1152,69.3C1248,96,1344,128,1392,144L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
        </svg>
      </div>
      
      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.contactContainer}>
          <div className={styles.contactBox}>
            {/* Info Section */}
            <div className={styles.infoSection}>
              <div className={styles.infoPattern}></div>
              <h2 className={styles.infoTitle}>Contact Information</h2>
              <p className={styles.infoText}>
                Have questions about our products or services? Our friendly team is here to help you with anything you need.
              </p>
              
              <div className={styles.contactMethods}>
                <div className={styles.contactMethod}>
                  <div className={styles.iconBox}>
                    <FaPhone />
                  </div>
                  <div className={styles.methodContent}>
                    <h3 className={styles.methodTitle}>Call Us</h3>
                    <p className={styles.methodText}>+1 (555) 123-4567</p>
                    <p className={styles.methodText}>Mon-Fri: 9AM - 6PM EST</p>
                  </div>
                </div>
                
                <div className={styles.contactMethod}>
                  <div className={styles.iconBox}>
                    <FaEnvelope />
                  </div>
                  <div className={styles.methodContent}>
                    <h3 className={styles.methodTitle}>Email Us</h3>
                    <p className={styles.methodText}>support@shopily.com</p>
                    <p className={styles.methodText}>business@shopily.com</p>
                  </div>
                </div>
                
                <div className={styles.contactMethod}>
                  <div className={styles.iconBox}>
                    <FaMapMarkerAlt />
                  </div>
                  <div className={styles.methodContent}>
                    <h3 className={styles.methodTitle}>Visit Us</h3>
                    <p className={styles.methodText}>123 Fashion Street</p>
                    <p className={styles.methodText}>New York, NY 10001</p>
                  </div>
                </div>
                
                <div className={styles.contactMethod}>
                  <div className={styles.iconBox}>
                    <FaClock />
                  </div>
                  <div className={styles.methodContent}>
                    <h3 className={styles.methodTitle}>Business Hours</h3>
                    <p className={styles.methodText}>Monday - Friday: 9AM - 6PM</p>
                    <p className={styles.methodText}>Saturday: 10AM - 4PM</p>
                  </div>
                </div>
              </div>
              
              <div className={styles.socialMedia}>
                <h3 className={styles.socialTitle}>Connect With Us</h3>
                <div className={styles.socialIcons}>
                  <a href="#" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                    <FaFacebookF />
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                    <FaTwitter />
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                    <FaInstagram />
                  </a>
                  <a href="#" target="_blank" rel="noopener noreferrer" className={styles.socialIcon}>
                    <FaLinkedinIn />
                  </a>
                </div>
              </div>
            </div>
            
            {/* Form Section */}
            <div className={styles.formSection}>
              <h2 className={styles.formTitle}>Send Us a Message</h2>
              
              {submitted ? (
                <div className={styles.successMessage}>
                  <FaCheckCircle className={styles.successIcon} />
                  <p className={styles.successText}>Thank you for your message! We'll get back to you as soon as possible.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.label} htmlFor="firstName">First Name*</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className={styles.input}
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                        placeholder="John"
                      />
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label className={styles.label} htmlFor="lastName">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        className={styles.input}
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label className={styles.label} htmlFor="email">Email Address*</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className={styles.input}
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                      />
                    </div>
                    
                    <div className={styles.formGroup}>
                      <label className={styles.label} htmlFor="phone">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        className={styles.input}
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 (123) 456-7890"
                      />
                    </div>
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="subject">Subject*</label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className={styles.input}
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      placeholder="How can we help you?"
                    />
                  </div>
                  
                  <div className={styles.formGroup}>
                    <label className={styles.label} htmlFor="message">Message*</label>
                    <textarea
                      id="message"
                      name="message"
                      className={styles.textarea}
                      value={formData.message}
                      onChange={handleChange}
                      required
                      placeholder="Please provide details about your inquiry..."
                    ></textarea>
                  </div>
                  
                  <button type="submit" className={styles.submitButton}>
                    Send Message <FaArrowRight />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
        
        {/* Map Section */}
        <section className={styles.mapSection}>
          <h2 className={styles.sectionTitle}>Find Our Location</h2>
          <div className={styles.mapContainer}>
            <div className={styles.map}>
              <img 
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                alt="Map location" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            </div>
          </div>
        </section>
        
        {/* Store Locations Section */}
        <section className={styles.storesSection}>
          <h2 className={styles.sectionTitle}>Our Store Locations</h2>
          <div className={styles.storesGrid}>
            <div className={styles.storeCard}>
              <img 
                src="https://images.unsplash.com/photo-1582887068729-57e0a083b6fa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
                alt="New York Store" 
                className={styles.storeImage} 
              />
              <div className={styles.storeInfo}>
                <h3 className={styles.storeTitle}>New York Flagship</h3>
                
                <div className={styles.storeDetail}>
                  <FaMapMarkerAlt className={styles.storeIcon} />
                  <p className={styles.storeText}>123 Fashion Street, New York, NY 10001</p>
                </div>
                
                <div className={styles.storeDetail}>
                  <FaPhone className={styles.storeIcon} />
                  <p className={styles.storeText}>+1 (555) 123-4567</p>
                </div>
                
                <div className={styles.storeDetail}>
                  <FaClock className={styles.storeIcon} />
                  <p className={styles.storeText}>Mon-Sat: 10AM - 8PM, Sun: 11AM - 6PM</p>
                </div>
                
                <button className={styles.storeButton}>
                  <FaStore /> Visit Store
                </button>
              </div>
            </div>
            
            <div className={styles.storeCard}>
              <img 
                src="https://images.unsplash.com/photo-1548862597-a85e07fb4d69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
                alt="Los Angeles Store" 
                className={styles.storeImage} 
              />
              <div className={styles.storeInfo}>
                <h3 className={styles.storeTitle}>Los Angeles Boutique</h3>
                
                <div className={styles.storeDetail}>
                  <FaMapMarkerAlt className={styles.storeIcon} />
                  <p className={styles.storeText}>456 Beverly Blvd, Los Angeles, CA 90210</p>
                </div>
                
                <div className={styles.storeDetail}>
                  <FaPhone className={styles.storeIcon} />
                  <p className={styles.storeText}>+1 (555) 987-6543</p>
                </div>
                
                <div className={styles.storeDetail}>
                  <FaClock className={styles.storeIcon} />
                  <p className={styles.storeText}>Mon-Sat: 9AM - 9PM, Sun: 10AM - 7PM</p>
                </div>
                
                <button className={styles.storeButton}>
                  <FaStore /> Visit Store
                </button>
              </div>
            </div>
            
            <div className={styles.storeCard}>
              <img 
                src="https://images.unsplash.com/photo-1527244801627-4fa9a55a93a8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80" 
                alt="Chicago Store" 
                className={styles.storeImage} 
              />
              <div className={styles.storeInfo}>
                <h3 className={styles.storeTitle}>Chicago Store</h3>
                
                <div className={styles.storeDetail}>
                  <FaMapMarkerAlt className={styles.storeIcon} />
                  <p className={styles.storeText}>789 Michigan Ave, Chicago, IL 60611</p>
                </div>
                
                <div className={styles.storeDetail}>
                  <FaPhone className={styles.storeIcon} />
                  <p className={styles.storeText}>+1 (555) 456-7890</p>
                </div>
                
                <div className={styles.storeDetail}>
                  <FaClock className={styles.storeIcon} />
                  <p className={styles.storeText}>Mon-Fri: 10AM - 7PM, Sat-Sun: 11AM - 5PM</p>
                </div>
                
                <button className={styles.storeButton}>
                  <FaStore /> Visit Store
                </button>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className={styles.faqSection}>
          <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
          <div className={styles.faqList}>
            {faqData.map((faq, index) => (
              <div key={index} className={`${styles.faqItem} ${activeFaq === index ? styles.open : ''}`}>
                <div className={styles.faqQuestion} onClick={() => toggleFaq(index)}>
                  <h3 className={styles.faqTitle}>{faq.question}</h3>
                  <FaChevronDown className={styles.faqToggle} />
                </div>
                {activeFaq === index && (
                  <div className={styles.faqContent}>
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Contact 