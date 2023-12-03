import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar'
import { useParams } from 'react-router-dom'
import { auth, db } from '../../FirebaseConfig/firebaseConfig'
import { doc, getDoc, collection, query, where, getDocs, addDoc } from "firebase/firestore";
import './Specificproductpage.css'
import ProductSlider from './ProductSlider';

const Specificproductpage = () => {
    const { type, id } = useParams()
    const [product, setProduct] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    function GetCurrentUser() {
        const [user, setUser] = useState("");
        const usersCollectionRef = collection(db, "users");
        useEffect(() => {
            auth.onAuthStateChanged(userlogged => {
                if (userlogged) {
                    // console.log(userlogged.email)
                    const getUsers = async () => {
                        const q = query(collection(db, "users"), where("uid", "==", userlogged.uid));
                        // console.log(q);
                        const data = await getDocs(q);
                        setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
                    };
                    getUsers();
                }
                else {
                    setUser(null);
                }
            })
        }, [])
        return user
    }
    const loggeduser = GetCurrentUser();


    function GetCurrentProduct() {
        // const productCollectionRef = collection(db, `products-${type.toUpperCase()}`);

        useEffect(() => {
            const getProduct = async () => {

                const docRef = doc(db, `products-${type.toUpperCase()}`, id);
                const docSnap = await getDoc(docRef);
                setProduct(docSnap.data());
            };
            getProduct();
        }, [])
        return product
    }

    GetCurrentProduct();
    // console.log(product)
    // console.log(currentprod.description)

    // console.log('hii')

    // console.log(currentprod.price)




    const addtocart = () => {
        if (loggeduser) {
            console.log(loggeduser[0].uid)
            addDoc(collection(db, `cart-${loggeduser[0].uid}`), {
                product, quantity: 1
            }).then(() => {
                setSuccessMsg('Product added to cart');

            }).catch((error) => { setErrorMsg(error.message) });
        }
        else {
            setErrorMsg('You need to login first')
        }

    }
    
    

    return (


        <div>
            <Navbar />

            {product ?
                <div className='myprod-container'>
                    <div className='prod-img-cont'>
                        <img src={product.productimage} />
                    </div>

                    <div className='prod-data'>
                        <p className='prod-head'>{product.producttitle}</p>
                        <p className='prod-keyspecs'>{product.keyspecs}</p>
                        <div className='specific-price-container'>
                            <p className='mrp'>Price : <p className='rate'>{product.price}DTN</p></p>
                        </div>
                        <p className='prod-details-head'>Details</p>
                        <p className='prod-description'>{product.description}</p>
                        <div className='row-cont'>
    
                            <div className='buy-cart'>
                                <button className='btn'>Buy Now</button>
                                <button className='btn' onClick={addtocart}>Add to Cart</button>
                            </div>
                        </div>
                        {successMsg && <>
                            <div className='success-msg'>{successMsg}</div>
                        </>}
                        {errorMsg && <>
                            <div className='error-msg'>{errorMsg}</div>
                        </>}
                    </div>
                </div>
                : <p>Loading...</p>}
            <p className='prod-details-head2'>Similar Items</p>
            <ProductSlider type={type} />

        </div>
    )
}

export default Specificproductpage