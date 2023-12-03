import React ,{useState}from 'react';
import Navbar from './Navbar';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {collection , addDoc} from 'firebase/firestore'
import {auth ,db} from '../FirebaseConfig/firebaseConfig'
import './Signup.css'

const Signup =()=>{
  const[username,setUsername]=useState("");
  const[password , setPassword]=useState("");
  const[email , setEmail]=useState("");
  const[phonenumber , setPhonenumber]=useState("");
  const[adress , setAdress]=useState("");

const navigate = useNavigate()
const[errorMsg , setErrorMsg]=useState("")
const[successMsg,setSuccessMsg]=useState("")


const handleSubmit = (e)=>{
    e.preventDefault();
    createUserWithEmailAndPassword(auth ,email,password)
    .then((userCredential)=> {
        const user =userCredential.user;
        const initialcartvalue=0;
        console.log(user)
        addDoc(collection(db , "users"),{
            username : username ,email:email,phonenumber: phonenumber,
            password:password,cart:initialcartvalue,adress:adress,uid:user.uid
        }).then(()=>{
            setSuccessMsg('New user added succefully , you will now be automatically redirected to login page')
            setUsername('')
            setPhonenumber('')
            setEmail('')
            setPassword('')
            setErrorMsg('')
            setTimeout(()=>{
                setSuccessMsg('');
                navigate('/login');
            }, 4000);
        })
        .catch((error)=> {setErrorMsg(error.message)});

    })
    .catch ((error)=>{
        if(error.message =='Firebase:Error (auth/invalid-email).'){
            setErrorMsg('please fill required fields')
        }
        if(error.message == 'Firebase : Error(auth/email-already-in-use)'){
            setErrorMsg('user already exist');
        }
    })
}
    return(
        <div>
            <Navbar/>
            <div className='signup-container'>
                <form className='signup-form' onSubmit={handleSubmit}>
                    <p>Create Account</p>

                   {successMsg && <>
                   <div className='success-msg'>
                    {successMsg}
                    </div></>}

                  {errorMsg && <><div>
                    {errorMsg}
                    </div></>}

                    <label>You Name</label>
                    <input onChange={(e)=>setUsername(e.target.value)}
                     type='text' placeholder='First and last'/>
                       <label>Mobile Number</label>
                    <input onChange={(e)=>setPhonenumber(e.target.value)}
                     type='tel' placeholder='Mobile Number'/>
                       <label>Email</label>
                    <input onChange={(e)=>setEmail(e.target.value)}
                     type='email' placeholder='Enter your Email'/>
                       <label>Password</label>
                    <input onChange={(e)=>setPassword(e.target.value)}
                     type='password' placeholder='Enter your Password'/>
                       <label>Adress</label>
                    <textarea onChange={(e)=>setAdress(e.target.value)}
                      placeholder='Enter your Adress'/>
                      <button type='submit'>Sign up</button>
                      <div>
                        <span>
                            Already have an account ?
                        </span>
                        <Link to='/login'>Sign in</Link>
                      </div>


                </form>
                </div >
        </div>
    )
}
export default Signup