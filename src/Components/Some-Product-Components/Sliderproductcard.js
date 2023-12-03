import React from 'react'
import { Link } from 'react-router-dom';
import './Sliderproductcard.css'


const Sliderproductcard = (product) => {
    // console.log(p)
    let p = product.product

    let mrp = parseInt(p.price)
   


    return (
        <div>
            <div className='mini-product-container'>
                <div className='mini-img-container'> <img src={p.productimage}></img></div>
                <div className='mini-product-details'>
                    <p className='mini-producttitle'>{p.producttitle}</p>
                    <div className='mini-price-container'>
                        <p className='mrp'>Price: <p className='rate'>{mrp}DTN</p></p>
                    </div>
                    <Link to={`/product/${p.producttype}/${p.id}`}><button className='showmore-btn'>More Details &gt;</button></Link>
                </div>
            </div >
        </div>
    )
}

export default Sliderproductcard