import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';
import { Link, useLoaderData } from 'react-router-dom';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([])
    const [currentPage, setCurrenPage] = useState(0)
    const { totalItems } = useLoaderData()

    const [itemsPerPage, setItemsPerPage] = useState(10)
    const itemOptions = [5, 10, 15, 20, 30]

    const handleOptions = (event) => {
        setItemsPerPage(parseInt(event.target.value))
        setCurrenPage(0)
    }


    //const itemsPerPage = 10;
    const totalPage = Math.ceil(totalItems / itemsPerPage)
    const pageNumbers = [...Array(totalPage).keys()]

    useEffect(()=>{
            const fetchData= async()=>{
            const responce = await fetch(`http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`)
            const products = await responce.json()
            setProducts(products)
        }
        fetchData()
    },[currentPage, itemsPerPage])



    // useEffect(() => {
    //     fetch('http://localhost:5000/products')
    //         .then(res => res.json())
    //         .then(data => setProducts(data))
    // }, []);

    useEffect(() => {
        const storedCart = getShoppingCart();
        const savedCart = [];
        // step 1: get id of the addedProduct
        for (const id in storedCart) {
            // step 2: get product from products state by using id
            const addedProduct = products.find(product => product._id === id)
            if (addedProduct) {
                // step 3: add quantity
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;
                // step 4: add the added product to the saved cart
                savedCart.push(addedProduct);
            }
            // console.log('added Product', addedProduct)
        }
        // step 5: set the cart
        setCart(savedCart);
    }, [products])

    const handleAddToCart = (product) => {
        // cart.push(product); '
        let newCart = [];
        // const newCart = [...cart, product];
        // if product doesn't exist in the cart, then set quantity = 1
        // if exist update quantity by 1
        const exists = cart.find(pd => pd._id === product._id);
        if (!exists) {
            product.quantity = 1;
            newCart = [...cart, product]
        }
        else {
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd._id !== product._id);
            newCart = [...remaining, exists];
        }

        setCart(newCart);
        addToDb(product._id)
    }

    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    return (
        <>
            <div className='shop-container'>
                <div className="products-container">
                    {
                        products.map(product => <Product
                            key={product._id}
                            product={product}
                            handleAddToCart={handleAddToCart}
                        ></Product>)
                    }
                </div>
                <div className="cart-container">
                    <Cart
                        cart={cart}
                        handleClearCart={handleClearCart}
                    >
                        <Link className='proceed-link' to="/orders">
                            <button className='btn-proceed'>Review Order</button>
                        </Link>
                    </Cart>
                </div>
            </div>


            {/* paginamtion */}
            <div className="pagination">
                <p>currnt Page: {currentPage}</p>
                {
                    pageNumbers.map(number => <button
                        key={number}
                        onClick={() => setCurrenPage(number)}
                        className={currentPage == number? "selected":""}
                    >{number}</button>)
                }

                <select
                    value={itemsPerPage}
                    onChange={handleOptions}
                >
                    {
                        itemOptions.map(option => <option
                            key={option}
                            value={option}
                        >
                            {option}
                        </option>)
                    }
                </select>
            </div>
        </>
    );
};

export default Shop;