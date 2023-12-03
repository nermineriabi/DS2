import Navbar from './Navbar';
import React , {useState , useEffect}from 'react';
import {auth , db} from '../FirebaseConfig/firebaseConfig'
import {collection , getDocs , query,where} from 'firebase/firestore'
import { updateProfile } from 'firebase/auth';
import './UserProfile.css'
const UserProfile =()=>{
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
const loggeduser = GetCurrentUser();
  if (loggeduser){ console.log(loggeduser[0].email)}

  return (
    <div>
      <Navbar />
      <div className='userprofile-outercontainer'>
        {loggeduser ? (
          <div className='user-profile'>
            <p>Your account details</p>

            <div className='data-row'>
              <span>Your Name</span>
              <span>{loggeduser[0].username}</span>
            </div>

            <div className='data-row'>
              <span>Your Email </span>
              <span>{loggeduser[0].email}</span>
            </div>

            <div className='data-row'>
              <span>Your Phone Number</span>
              <span>{loggeduser[0].phonenumber}</span>
            </div>

            <div className='data-row'>
              <span>Address</span>
              <span>{loggeduser[0].adress}</span>
            </div>
          </div>
        ) : (
          <div>You are not logged in</div>
        )}
      </div>
    </div>
  )
}
export default UserProfile