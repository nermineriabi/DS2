import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import './Allproductpage.css';
import { db } from "../../FirebaseConfig/firebaseConfig";
import { collection, query, onSnapshot, getDocs } from "firebase/firestore";
import Productcontainer from './Productcontainer'



const Allproductpage=(props)=>{
const [products , setProducts]=useState([]);

useEffect (()=>{

    const getProducts=()=> {
        const productsArray= [];
        const path=`products-${props.type.toUpperCase()}`
          console.log(props)

       getDocs(collection(db,path)).then((querySnapshot)=>{
         querySnapshot.forEach((doc)=>{
            productsArray.push({...doc.data(),id: doc.id})
           // console.log(doc.id , "=>",doc.data());
        });
        setProducts(productsArray)
       }).catch('Error error error')

       
    }
    getProducts();
},[] )  

    return(
        <div className="allproductpage">
            <Navbar/>
            <div className="heading">
                <p>Top Results for {props.type}</p>
            </div>

            <div className="allproductcontainer">
            {products.map((product) => (
        <Productcontainer 
         key={product.id} 
         product={product}
          />
))}
           </div>
        </div>
    )
}
export default Allproductpage