import Navbar from './Navbar';
import React , {useState , useEffect}from 'react';
import {auth , db, storage} from '../FirebaseConfig/firebaseConfig'
import {addDoc, collection , getDocs , query,where} from 'firebase/firestore'
import './Addproduct.css'
import { getDownloadURL , ref, uploadBytes } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';

 const Addproduct =()=> {
    const [producttitle , setProductTitle]=useState("");
    const [producttype, setProductType]=useState("");
    const [description,setDescription]=useState("");
    const [brand , setBrand]=useState("");
    const [customersupport , setCustomorSupport]=useState("");
    const [price , setPrice]=useState("");
    const [warranty , setWarranty]=useState("");
    const [productimage, setProductImage]=useState("");

    const [imageError , setImageError]=useState("");
    const [successMsg, setSuccessMsg]=useState("");
    const [uploadError , setUploadError]=useState("");

    function GetCurrentUser(){

        const [user , setUser]=useState("")
        const usersCollectionRef = collection(db,"users");

        useEffect(()=> {
            auth.onAuthStateChanged(userlogged=>{
                if(userlogged){
                    const getUsers= async()=>{
                        const q=query(collection(db,"users"),where("uid","==",userlogged.uid))
                       console.log(q)
                    const data=await getDocs(q);
                    setUser(data.docs.map((doc)=> ({...doc.data(),id:doc.id})))
                    }
                    getUsers()
                }
                else{
                    setUser(null)
                }
            })
        },[])
        return user
      }
    
      const types =['image/jpg', 'image/jpeg' , 'image/png', 'image/PNG']


      const handleProductImg =(e)=> {
        e.preventDefault();
        let selectedFile = e.target.files[0];
        if(selectedFile){
            if(selectedFile && types.includes(selectedFile.type)){
                setProductImage(selectedFile);
                setImageError('')
            }
         else {
            setProductImage(null)
            setImageError('please select a valid image type(png or jpg')
         }
        }
        else {
           setImageError('Please select your file')
        }
      }

    const loggeduser = GetCurrentUser();
      if (loggeduser){ console.log(loggeduser[0].email)}
   
      const handleAddProduct =(e)=>{
        e.preventDefault();
        const storageRef = ref(storage, `product-images/${producttype.toUpperCase()}/${Date.now()}`);

        //console.log(storageRef._location.path)
      uploadBytes (storageRef , productimage)
         .then(()=> {
            getDownloadURL(storageRef).then(url => {
                addDoc(collection (db , `products-${producttype.toUpperCase()}`),{
              producttitle,
              producttype,
              description ,
              brand ,
              customersupport,
              price ,
              warranty,
              productimage : url,
                })
            })
        })
      
    }


    return ( 
        <div>
            <Navbar/>
            {loggeduser && loggeduser[0].email== "riabinermine7@gmail.com"?
            <div className='addprod-container'>
                <form className='addprod-form' onSubmit={handleAddProduct}>
                    <p>add data</p>
                    {successMsg && <div className='success-msg'>{successMsg}</div>}
                    {uploadError && <div className='error-msg'>{uploadError}</div>}

                   <label>Product Title</label>
                   <input type='text' onChange={(e)=> {setProductTitle(e.target.value)}} placeholder='Product Title'/>

                  < label>Product Type</label>
                   <input type='text' onChange={(e)=> {setProductType(e.target.value)}} placeholder='Product Type'/>

                  < label>Brand Name</label>
                   <input type='text' onChange={(e)=> {setBrand(e.target.value)}} placeholder='Brand Name'/>
                
                   <label>Image</label>
                   <input onChange={handleProductImg} type='file'></input>
                   { imageError && <> 
                    <div className='error-msg'>{imageError}</div>
                    </>}
                    <label>Description</label>
                    <textarea onChange={(e)=> setDescription(e.target.value)} type='text'
                     placeholder='Enter Description'
                      />

                     <label>Price</label>
                    <textarea onChange={(e)=> setPrice(e.target.value)} type='text'
                     placeholder='Enter Price'/>


                      <label>Customer Support</label>
                      <input onChange={(e)=> setCustomorSupport(e.target.value)}
                      type="text" placeholder='Customer Support Email , Phone or adress'/>

                      <button type='submit'> Add </button>
                </form>
            </div>: <div>you dont have access to add products </div>
        }
            </div>
    )
 }
 export default Addproduct 