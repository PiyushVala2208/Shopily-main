import React from 'react'
import { Link } from 'react-router-dom'
import style from '../CSS/Home.module.css'
import { FaStar, FaStarHalfAlt } from 'react-icons/fa'

function Home() {
    return (
        <>
            <div className={style.header}>
                <div className={style.headerGrid}>
                    <div className={style.headerContent}>
                        <div className={style.headerContentBox}>
                            <h1 className={style.slogan}>BOLD STYLE FOR THE MODERN ERA</h1>
                            <p className={style.subSlogan}>
                                Discover our premium collection of fashion that makes a statement.
                                Crafted for those who dare to stand out.
                            </p>
                            <Link to="/products" className={style.exploreButton}>
                                Explore Now
                            </Link>
                        </div>
                    </div>
                    <div className={style.headerImage}>
                        <img 
                            alt='Fashion showcase' 
                            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                        />
                    </div>
                </div>
            </div>

            <div className={style.features}>
                <h2 className={style.featureTitle}>Featured Collections</h2>
                <div className={style.featureGrid}>
                    <div className={style.featureCard}>
                        <div className={style.featureImage}>
                            <img 
                                alt='Summer Collection' 
                                src='https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=720&q=80' 
                            />
                        </div>
                        <div className={style.featureContent}>
                            <h3>Summer Essentials</h3>
                            <p>Lightweight, breathable pieces perfect for the warm season. Designed for comfort without compromising style.</p>
                            <Link to="/products" className={style.featureButton}>
                                View Collection
                            </Link>
                        </div>
                    </div>

                    <div className={style.featureCard}>
                        <div className={style.featureImage}>
                            <img 
                                alt='Autumn Collection' 
                                src='https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=720&q=80' 
                            />
                        </div>
                        <div className={style.featureContent}>
                            <h3>Autumn Staples</h3>
                            <p>Rich textures and warm tones to embrace the changing season. Versatile pieces for layering.</p>
                            <Link to="/products" className={style.featureButton}>
                                View Collection
                            </Link>
                        </div>
                    </div>

                    <div className={style.featureCard}>
                        <div className={style.featureImage}>
                            <img 
                                alt='Premium Collection' 
                                src='https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=720&q=80' 
                            />
                        </div>
                        <div className={style.featureContent}>
                            <h3>Premium Selection</h3>
                            <p>Expertly crafted pieces using the finest materials. Timeless designs that elevate any wardrobe.</p>
                            <Link to="/products" className={style.featureButton}>
                                View Collection
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className={style.brands}>
                <h3 className={style.brandsTitle}>Our Partners</h3>
                <div className={style.brandsGrid}>
                    <div className={style.brandItem}>
                        <img alt='Xiaomi' src='https://images.firstpost.com/wp-content/uploads/2021/08/XiaomiLogoNew2.jpg' />
                    </div>
                    <div className={style.brandItem}>
                        <img alt='Apple' src='https://www.pngitem.com/pimgs/m/59-591019_apple-logo-png-photos-apple-logo-and-name.png' />
                    </div>
                    <div className={style.brandItem}>
                        <img alt='Oppo' src='https://assets.gadgets360cdn.com/pricee/assets/brand/og-oppo-logo.png' />
                    </div>
                    <div className={style.brandItem}>
                        <img alt='Asus' src='https://liliputing.com/wp-content/uploads/2010/12/asus-logo.jpg' />
                    </div>
                    <div className={style.brandItem}>
                        <img alt='Coca-Cola' src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Coca-Cola_logo.svg/640px-Coca-Cola_logo.svg.png' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
