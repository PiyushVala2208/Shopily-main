import React from 'react'
import styles from '../CSS/About.module.css'
import { FaLeaf, FaHandshake, FaLightbulb, FaRecycle, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function About() {
  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <div className={styles.heroSection}>
        <div className={styles.heroPattern}></div>
        <h1 className={styles.heroTitle}>About Shopily</h1>
        <p className={styles.heroSubtitle}>Delivering quality products and exceptional shopping experiences since 2023</p>
      </div>
      
      <div className={styles.contentWrapper}>
        {/* Story Section */}
        <section className={styles.storySection}>
          <div className={styles.storyContent}>
            <span className={styles.sectionTag}>Our Story</span>
            <h2 className={styles.sectionTitle}>How We Started</h2>
            <p className={styles.paragraph}>
              Founded in 2023, Shopily was born from a simple idea: to create an online shopping 
              experience that combines quality, affordability, and convenience. What started as 
              a small venture has grown into a trusted marketplace serving customers worldwide.
            </p>
            <p className={styles.paragraph}>
              Our journey has been driven by our commitment to customer satisfaction and our 
              passion for bringing the best products to your doorstep. We carefully select each 
              item in our inventory to ensure it meets our high standards for quality and value.
            </p>
          </div>
          <div className={styles.storyImage}>
            <div className={styles.storyImageInner} style={{backgroundImage: `url(https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80)`}}></div>
          </div>
        </section>
        
        {/* Stats Section */}
        <section className={styles.statsSection}>
          <h2 className={styles.sectionTitle}>Growing With Our Customers</h2>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>10K+</div>
              <div className={styles.statLabel}>Happy Customers</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>5K+</div>
              <div className={styles.statLabel}>Products</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>15+</div>
              <div className={styles.statLabel}>Countries Served</div>
            </div>
            <div className={styles.statItem}>
              <div className={styles.statNumber}>24/7</div>
              <div className={styles.statLabel}>Customer Support</div>
            </div>
          </div>
        </section>
        
        {/* Values Section */}
        <section className={styles.valuesSection}>
          <h2 className={styles.sectionTitle}>Our Values</h2>
          <p className={styles.paragraph} style={{textAlign: 'center', maxWidth: '700px', margin: '0 auto 40px'}}>
            These core principles guide everything we do at Shopily, from product selection to customer service.
          </p>
          <div className={styles.valuesGrid}>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <FaHandshake />
              </div>
              <h3 className={styles.valueTitle}>Quality</h3>
              <p className={styles.valueText}>
                We thoroughly vet all products to ensure they meet our high standards of quality and durability.
                Every item is selected with our customers' satisfaction in mind.
              </p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <FaLeaf />
              </div>
              <h3 className={styles.valueTitle}>Affordability</h3>
              <p className={styles.valueText}>
                We believe in fair pricing and offering great value for your money without compromising on quality.
                We negotiate with suppliers to pass savings on to you.
              </p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <FaLightbulb />
              </div>
              <h3 className={styles.valueTitle}>Innovation</h3>
              <p className={styles.valueText}>
                We continuously seek new products and technologies to enhance your life and stay ahead of the curve
                in the rapidly evolving e-commerce landscape.
              </p>
            </div>
            <div className={styles.valueCard}>
              <div className={styles.valueIcon}>
                <FaRecycle />
              </div>
              <h3 className={styles.valueTitle}>Sustainability</h3>
              <p className={styles.valueText}>
                We're committed to reducing our environmental footprint with each step we take, from eco-friendly
                packaging to partnering with sustainable brands.
              </p>
            </div>
          </div>
        </section>
        
        {/* Mission Section */}
        <section className={styles.missionSection}>
          <div className={styles.missionContent}>
            <span className={styles.sectionTag}>Our Mission</span>
            <h2 className={styles.sectionTitle}>Why We Exist</h2>
            <p className={styles.paragraph}>
              At Shopily, our mission is to transform the online shopping experience by providing 
              a curated selection of high-quality products, exceptional customer service, and a 
              user-friendly platform that makes finding exactly what you need simple and enjoyable.
            </p>
            <p className={styles.paragraph}>
              We strive to be more than just an e-commerce store – we aim to be your trusted 
              partner in discovering products that enhance your daily life, while maintaining 
              our commitment to sustainability and ethical business practices.
            </p>
          </div>
          <div className={styles.missionImage}>
            <div className={styles.missionImageInner} style={{backgroundImage: `url(https://images.unsplash.com/photo-1573164574511-73c773193279?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1738&q=80)`}}></div>
          </div>
        </section>
        
        {/* Team Section */}
        <section className={styles.teamSection}>
          <h2 className={styles.sectionTitle}>Meet Our Team</h2>
          <p className={styles.paragraph} style={{textAlign: 'center', maxWidth: '700px', margin: '0 auto 40px'}}>
            Behind Shopily is a dedicated team of professionals passionate about creating 
            the best shopping experience for you.
          </p>
          <div className={styles.teamGrid}>
            <div className={styles.teamCard}>
              <div className={styles.teamCardImage + ' ' + styles.teamMember1}>
                <div className={styles.teamSocial}>
                  <div className={styles.teamSocialIcon}><FaLinkedin /></div>
                  <div className={styles.teamSocialIcon}><FaTwitter /></div>
                  <div className={styles.teamSocialIcon}><FaInstagram /></div>
                </div>
              </div>
              <div className={styles.teamCardBottom}>
                <h3 className={styles.teamName}>Emily Johnson</h3>
                <p className={styles.teamRole}>Founder & CEO</p>
                <p className={styles.teamBio}>
                  Emily has over 15 years of experience in retail and e-commerce, with a passion for creating exceptional customer experiences.
                </p>
              </div>
            </div>
            
            <div className={styles.teamCard}>
              <div className={styles.teamCardImage + ' ' + styles.teamMember2}>
                <div className={styles.teamSocial}>
                  <div className={styles.teamSocialIcon}><FaLinkedin /></div>
                  <div className={styles.teamSocialIcon}><FaTwitter /></div>
                  <div className={styles.teamSocialIcon}><FaInstagram /></div>
                </div>
              </div>
              <div className={styles.teamCardBottom}>
                <h3 className={styles.teamName}>David Wilson</h3>
                <p className={styles.teamRole}>Head of Product</p>
                <p className={styles.teamBio}>
                  David leads our product strategy, bringing his expertise in product development and market research to curate our collection.
                </p>
              </div>
            </div>
            
            <div className={styles.teamCard}>
              <div className={styles.teamCardImage + ' ' + styles.teamMember3}>
                <div className={styles.teamSocial}>
                  <div className={styles.teamSocialIcon}><FaLinkedin /></div>
                  <div className={styles.teamSocialIcon}><FaTwitter /></div>
                  <div className={styles.teamSocialIcon}><FaInstagram /></div>
                </div>
              </div>
              <div className={styles.teamCardBottom}>
                <h3 className={styles.teamName}>Sarah Chen</h3>
                <p className={styles.teamRole}>Lead Designer</p>
                <p className={styles.teamBio}>
                  Sarah ensures our platform offers an intuitive and beautiful shopping experience, with an eye for detail and user-centered design.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaPattern}></div>
          <h2 className={styles.ctaTitle}>Join the Shopily Community</h2>
          <p className={styles.ctaText}>
            Discover our curated selection of products and experience shopping the Shopily way.
          </p>
          <Link to="/Product" className={styles.ctaButton}>
            Shop Now
          </Link>
        </section>
      </div>
    </div>
  )
}

export default About 