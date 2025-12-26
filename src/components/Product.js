import React, { useState, useEffect, useContext } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import style from '../CSS/Product.module.css'
import { Vortex } from 'react-loader-spinner'
import { FaSearch, FaFilter, FaTimes } from 'react-icons/fa'
import ProductItem from './ProductItem'
import productContext from '../Context/products/productContext'

function Product() {
  const [products, setProducts] = useState([])
  const [result, setResult] = useState(5)
  const [loading, setLoading] = useState(true)
  const [initialLoading, setInitialLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('default')
  const [hasMore, setHasMore] = useState(true)
  const [totalProducts, setTotalProducts] = useState(0)
  const [error, setError] = useState(null)
  
  const navigate = useNavigate()
  const context = useContext(productContext)
  const { getOneProduct } = context

  const handleSearch = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    try {
      if (searchTerm.trim() === '') {
        // If search is cleared, reset to initial data
        getData()
        return
      }
      
      const response = await axios.get(`https://dummyjson.com/products/search?q=${searchTerm}`)
      setProducts(response.data.products || [])
      setTotalProducts(response.data.total || 0)
      setHasMore(response.data.products.length < response.data.total)
    } catch (error) {
      console.error('Error searching products:', error)
      setError('Failed to search products. Please try again.')
    } finally {
      setLoading(false)
    }
  }
  
  const clearSearch = () => {
    setSearchTerm('')
    getData()
  }

  const getData = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await axios.get('https://dummyjson.com/products?limit=6')
      setProducts(response.data.products || [])
      setTotalProducts(response.data.total || 0)
      setHasMore(response.data.products.length < response.data.total)
    } catch (error) {
      console.error('Error fetching products:', error)
      setError('Failed to load products. Please try again.')
    } finally {
      setLoading(false)
      setInitialLoading(false)
    }
  }

  const fetchMoreData = async () => {
    if (!hasMore) return
    
    try {
      const response = await axios.get(`https://dummyjson.com/products?limit=6&skip=${products.length}`)
      const newProducts = response.data.products || []
      
      if (newProducts.length === 0) {
        setHasMore(false)
        return
      }
      
      setProducts(prevProducts => [...prevProducts, ...newProducts])
      setHasMore(products.length + newProducts.length < totalProducts)
    } catch (error) {
      console.error('Error fetching more products:', error)
    }
  }
  
  const handleSort = (e) => {
    const value = e.target.value
    setSortBy(value)
    
    // Create a sorted copy of the products array
    const sortedProducts = [...products]
    
    switch (value) {
      case 'price-low':
        sortedProducts.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        sortedProducts.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        sortedProducts.sort((a, b) => b.rating - a.rating)
        break
      case 'newest':
        // In a real app, you'd sort by date fields
        // Here we're just using the ID as a proxy for "newness"
        sortedProducts.sort((a, b) => b.id - a.id)
        break
      default:
        // Default sort (by ID)
        sortedProducts.sort((a, b) => a.id - b.id)
    }
    
    setProducts(sortedProducts)
  }
  
  // Handle product click (direct way to navigate to product detail)
  const handleProductClick = (productId) => {
    if (typeof getOneProduct === 'function') {
      getOneProduct(productId)
    }
    navigate(`/product/${productId}`)
  }

  useEffect(() => {
    getData()
  }, [])

  if (initialLoading) {
    return (
      <div className={style.productPage}>
        <div className={style.loadingContainer} style={{ height: '80vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Vortex
            visible={true}
            height="80"
            width="80"
            ariaLabel="vortex-loading"
            wrapperStyle={{}}
            wrapperClass="vortex-wrapper"
            colors={['#D68459', '#8B5A2B', '#FFB850', '#D68459', '#8B5A2B', '#FFB850']}
          />
        </div>
      </div>
    )
  }

  return (
    <div className={style.productPage}>
      <div className={style.container}>
        <div className={style.pageHeader}>
          <div className={style.headerFlex}>
            <h2 className={style.pageTitle}>Discover Our Products</h2>
            
            <div className={style.filterControls}>
              <div className={style.selectWrapper}>
                <select 
                  className={style.select} 
                  value={sortBy}
                  onChange={handleSort}
                >
                  <option value="default">Sort By: Default</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                  <option value="newest">Newest First</option>
                </select>
              </div>
              
              <form className={style.searchForm} onSubmit={handleSearch}>
                <input 
                  type="text" 
                  className={style.searchInput}
                  placeholder="Search products..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <button 
                    type="button" 
                    className={style.clearButton}
                    onClick={clearSearch}
                  >
                    <FaTimes />
                  </button>
                )}
                <button type="submit" className={style.searchButton}>
                  <FaSearch />
                </button>
              </form>
            </div>
          </div>
        </div>
        
        {error && (
          <div className={style.errorMessage}>
            {error}
          </div>
        )}
        
        {products.length === 0 && !loading ? (
          <div className={style.noResults}>
            <h3>No products found</h3>
            <p>Try a different search term or browse our categories</p>
            <button className={style.resetButton} onClick={clearSearch}>
              Show All Products
            </button>
          </div>
        ) : (
          <InfiniteScroll
            dataLength={products.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={
              <div className={style.loadingContainer}>
                <Vortex
                  visible={true}
                  height="60"
                  width="60"
                  ariaLabel="vortex-loading"
                  wrapperStyle={{}}
                  wrapperClass="vortex-wrapper"
                  colors={['#D68459', '#8B5A2B', '#FFB850', '#D68459', '#8B5A2B', '#FFB850']}
                />
              </div>
            }
            endMessage={
              <div className={style.endMessage}>
                <p>You've seen all products</p>
              </div>
            }
          >
            <div className={style.productGrid}>
              {products.map((product) => (
                <ProductItem key={product.id} products={product} />
              ))}
            </div>
          </InfiniteScroll>
        )}
      </div>
    </div>
  )
}

export default Product
