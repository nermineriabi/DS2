import React from 'react'
import './Productcontainer.css'
import { Link } from 'react-router-dom';
const Productcontainer = (product) => {
    // console.log(p)
    let p = product.product


    let mrp = parseInt(p.price)
 


    return (
        <div className='product-container'>
            <img src={p.productimage}></img>
            <div className='product-details'>
                <a href={`/product/${p.producttype}/${p.id}`}>
                    <button className='producttitle'>{p.producttitle}</button>
                </a>

                <div className='price-container'>
                    <p className='mrp'>Price: <p className='rate'>{mrp}DTN</p></p>
                </div>
                <Link to={`/product/${p.producttype}/${p.id}`}><button className='showmore-btn'>More Details &gt;</button></Link>

            </div>
        </div >
    )
}

export default Productcontainer