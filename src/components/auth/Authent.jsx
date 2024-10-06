
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import './Authent.css'
import { toast } from "react-toastify";
import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth'


import Notifications from "../Notifications";
import { auth, db } from "../../lib/firebase";
import { doc, setDoc } from "@firebase/firestore";
import upload from "../../lib/upload";
function Authent() {
  const[register,setAuth]=useState(false)
  //data from input
  const[userData,setUserData]=useState({
    username:"",email:"",password:""
  })
  //avatar state
  const[avi,setAvi]=useState({
    file:null,
    url:""
  })
  const handleRegister=async (e)=>{
    e.preventDefault()
    const {username,email,password}=userData
    console.log(username);
    if(!username || !email || !password){
     toast.warn("Fill empty fields")
     return;
    }
   
    else{
      try {
        const res=await createUserWithEmailAndPassword(auth,email,password)
        let imgURL = null; 
        if (avi.file) {
          imgURL = await upload(avi.file);  
        }
       await Promise.all([

         await setDoc(doc(db, "users", res.user.uid), {
          username:username,
          email:email,
          avi:imgURL,
          id:res.user.uid,
          blocked:[]
        }),

        await setDoc(doc(db, "userchats", res.user.uid), {
          chats:[]
        })

       ])


        toast.success("welcome to Chat-App,proceed to login")

      } 
      catch (error) {
        console.error(error);
        toast.error(error.message)
      }
      
    }
  }
  const handleLogin=async (e)=>{
    const {email,password}=userData
    e.preventDefault()
    try {
      await signInWithEmailAndPassword(auth,email,password)
      toast.success("Login,Successfull")
    } catch (err) {
      console.log(err);
      toast.error(err.message)
      
    }
   
  }
 
  //avatar

  const handleAvi=e=>{
   if( e.target.files[0]){
    setAvi({
      file:e.target.files[0]
      ,url:URL.createObjectURL(e.target.files[0])
     })
    }
  }
  return (
    <div>
      <div className=" ">
        <div className="container w-50">
          <div className="card shadow p-5  mt-5  d-flex justify-content-center " style={{border:"1px solid white"}}>
          <Notifications/>
            <div className="row align-items-center " style={{minHeight:'50vh'}}>
              
                <h1 className="fw-bolder text-center ">
                 <i class="far fa-comments" ></i>Chat App{" "}
                </h1>
                <h4 className="">
                  {register
                    ? "Signup to your account"
                    : "Sign in to your account"}
                     </h4>
                  <Form className="w-100 ">
                    {register && (
                      <div className="">
                        <div className="text-center mb-2">
                         
                          <label htmlFor="imgfile" style={{textDecoration:"underline"}}> <img height={'100px'} style={{borderRadius:"50%"}} width={'100px'} src={avi.url ||"/media/92979836-profile-anonymous-face-icon-gray-silhouette-person-male-default-avatar-photo-placeholder-isolated-on.jpg"} alt=""/> Add a profile picture</label>
                          <input type="file" id="imgfile" style={{display:'none'}} onChange={handleAvi}/>
                        </div>
                      <Form.Group
                        className="mb-3"
                        controlId="exampleForm.ControlInputName"
                      >
                        <Form.Control
                          type="name"
                          placeholder="Enter your username"
                          onChange={e=>setUserData({...userData,username:e.target.value})} value={userData.username}
                        />
                      </Form.Group>
                   </div> )
                    }
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInputEmail"
                    >
                      <Form.Control
                        type="email"
                        placeholder="Enter you Email"
                        onChange={e=>setUserData({...userData,email:e.target.value})} value={userData.email}
      
                      />
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="exampleForm.ControlInputPswd"
                     
                    >
                      <Form.Control
                        type="password"
                        placeholder="Enter you password"
                        onChange={e=>setUserData({...userData,password:e.target.value})} value={userData.password}
                  
                      />
                    </Form.Group>
                  </Form>
                {
                  register?
                  <div className="text-center">
                    <button className="btn btn-light m-3 " onClick={handleRegister}>Register</button>
                    <p>Existing user?  <button className="btn text-success" style={{textDecoration:"underline"}} onClick={()=>setAuth(!register)}>Go to Login</button> </p> 
                    {/* <p>Already have an account? Click here... <Link to={'/'} style={{textDecoration:"none",color:"green"}}>Login</Link></p> */}
                  </div>:
                  <div className="text-center">
                  <button className="btn btn-light  m-3 " onClick={handleLogin}>Login</button>
                  {/* <p>New User? Click here... <Link to={'/register'} style={{textDecoration:"none",color:"red"}}>Register</Link></p> */}
                <p>New User?  <button className="btn text-success" style={{textDecoration:"underline"}} onClick={()=>setAuth(!register)}> Let's Sign-Up  </button> </p> 
                </div>
                }   
            </div>
          </div>
        </div>
      </div>
    </div>
  );

}

export default Authent


