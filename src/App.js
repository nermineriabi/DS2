import './App.css';
import {BrowserRouter , Routes ,Route} from'react-router-dom'
import Home from './Components/Home';
import Login from './Components/Login';
import Signup from './Components/Signup';
import PgFOF from './Components/PgFOF';
import Cart from './Components/Cart';
import UserProfile from './Components/UserProfile'
import Addproduct from './Components/Addproduct';
import Allproductpage from './Components/Some-Product-Components/Allproductpaje';
import Specificproductpage from './Components/Some-Product-Components/Specificproductpage'
function App() {
  return (
   <BrowserRouter>
<Routes>
  <Route exact path="/" element={<Home />} />
  <Route exact path="/home" element={<Home />} />
  <Route exact path="/signup" element={<Signup />} />
  <Route exact path="/login" element={<Login />} />
  <Route exact path="/cart" element={<Cart/>}/>
  <Route exact path="/userprofile" element={<UserProfile/>}/>
  <Route exact path="/sellproduct" element={<Addproduct/>}/>
  

  <Route exact path="/product-type/tableware" element={<Allproductpage type={'Tableware'}/>}/>
  <Route exact path="/product-type/homeanddecoration" element={<Allproductpage type={'Home & Decoration'}/>}/>
  <Route exact path="/product-type/jewelryandaccessories" element={<Allproductpage type={'Jewelry & Accessories'}/>}/>
  <Route exact path="/product-type/clothing" element={<Allproductpage type={'Clothing'}/>}/>
   
   <Route path='/product/:type/:id' element={<Specificproductpage/>}/>
   <Route exact path="/cartdata" element={<Cart />} />



  


  <Route exact path="*" element={<PgFOF />} />
</Routes>

   </BrowserRouter>
  );
}

export default App;
