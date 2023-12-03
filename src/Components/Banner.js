import React , {useState , useEffect}from 'react';
import {Carousel} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import slide1 from './assests/image/slide1.jpg'
import slide2 from './assests/image/slide2.jpg'
import slide3 from './assests/image/slide3.jpg'
import slide4 from './assests/image/slide4.jpg'
import './Banner.css'

const Banner =()=>{
    function GetCurrentUser(){
      const [user ,setUser]=useState('')
    }

    return (
  <Carousel>
      <Carousel.Item>
        <img
          className='d-block-w-100'
          src={slide1}
          alt='First slide'
        />
       
      </Carousel.Item>

      <Carousel.Item>
        <img
          className='d-block-w-100'
          src={slide2}
          alt='Second slide'
        />
    
      </Carousel.Item>

      <Carousel.Item>
        <img
          className='d-block-w-100'
          src={slide3}
          alt='Third slide'
        />
    
      </Carousel.Item>

      <Carousel.Item>
        <img
          className='d-block-w-100'
          src={slide4}
          alt='Fourth slide'
        />
    
      </Carousel.Item>
    </Carousel>
  );
    
}
export default Banner