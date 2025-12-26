import { useState } from "react";
import { useNavigate } from "react-router-dom";
import productContext from "./productContext";


const ProductState = (props) => {

    const navigate = useNavigate();

    const productInitial = []
    const cartInitial = []
    const toastsInitial = []

    const [products, setProducts] = useState(productInitial);
    const [oneProduct, setOneProduct] = useState();
    const [cartData, setCartData] = useState(cartInitial);
    const [toasts, setToasts] = useState(toastsInitial);

    // Toast management
    const addToast = (message, type = 'success', duration = 3000) => {
        const id = Date.now();
        const toast = { id, message, type, duration };
        setToasts(prevToasts => [...prevToasts, toast]);
        
        // Automatically remove toast after duration
        setTimeout(() => removeToast(id), duration);
    };
    
    const removeToast = (id) => {
        setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
    };

    // Get total count of items in cart, including quantities
    const getCartItemCount = () => {
        let totalCount = 0;
        if (cartData && cartData.length > 0) {
            cartData.forEach(item => {
                totalCount += item.cartQuantity || 1;
            });
        }
        return totalCount;
    };

    const getAllProduct = async () => {
        const res = await fetch(`https://dummyjson.com/products?limit=10`, {
            method: "GET",
        })
        const json = await res.json();
        setProducts(json.products)
        console.log("data...........", json);

    }

    const searchProduct = async (name) => {
        await fetch(`https://dummyjson.com/products/search?q=${name}`, {
            method: 'GET'
        }).then((res) => {
            // const json = res.json();
        }).then(data => {
            console.log("one data", data);
            setProducts(data)
        })
    }

    const getOneProduct = async (id) => {
        await fetch(`https://dummyjson.com/products/${id}`, {
            method: "GET"
        }).then((res) => {
            const json = res.json();
            return json
        }).then(data => {
            console.log("one data", data);
            setOneProduct(data)
        })
    }

    
    const addToCart = (product) => {
        // Check if product already exists in cart
        const existingProductIndex = cartData.findIndex(item => item.id === product.id);
        
        if (existingProductIndex !== -1) {
            // Product exists, update quantity
            const updatedCart = [...cartData];
            const currentQuantity = updatedCart[existingProductIndex].cartQuantity || 1;
            updatedCart[existingProductIndex].cartQuantity = currentQuantity + 1;
            
            setCartData(updatedCart);
            addToast(`${product.title} quantity updated in cart!`, 'info');
        } else {
            // Product doesn't exist, add new
            setCartData(cartData.concat(product));
            addToast(`${product.title} added to cart!`, 'success');
        }
    }
    const removeFromCart = (id) =>{
        const product = cartData.find(item => item.id === id);
        const newCart = cartData.filter((product)=>{
            return product.id !== id
        })
        setCartData(newCart)
        
        // Add toast notification if product was found
        if (product) {
            addToast(`${product.title} removed from cart`, 'info');
        }
    }
    return (
        <productContext.Provider value={{ 
            products, 
            oneProduct, 
            cartData, 
            toasts, 
            getAllProduct, 
            getOneProduct, 
            searchProduct, 
            addToCart, 
            removeFromCart,
            removeToast,
            getCartItemCount
        }}>
            {props.children}
        </productContext.Provider>
    )

}


export default ProductState;