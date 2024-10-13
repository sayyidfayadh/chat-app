import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useUserStore } from "../lib/userStore";
import { useChatStore } from "../lib/chatStore";

function Chat() {
  const[chat,setChat]=useState("")
  const {chatId}=useChatStore()
  const{deSelectChat}=useChatStore()
  // console.log(chatId);
  
  const endRef=useRef(null)
  useEffect(()=>{
    setTimeout(() => {
      endRef.current?.scrollIntoView({behavior:"smooth"})
    }, 500); 
  })
  useEffect(()=>{
    if (!chatId) return;
    const unSub=onSnapshot(doc(db,"chats",chatId),(res)=>{
      setChat(res.data())
    })
    return()=>{
      unSub()
    }
  },[chatId])
  const setVisibility={
    
  }
  // console.log(chat);
  if (!chatId) {
    return null; // Return null when no chatId, nothing will be rendered
  }

  return (
    
    <div className="chat">
      {chatId&&(<>
      {/* header */}
      <div className="header p-3 d-flex align-items-center justify-content-around">
      <button className="btn btn-danger rounded-pill btn-sm" onClick={deSelectChat}><i className="fa fa-arrow-left" ></i></button>
        <img
          className="avi"
          height={"70px"}
          src="/media/download.png"
          alt="sss"
        />
        <h3>It Is Horse</h3>
        <div className="d-flex gap-5">
        <i className="fa-solid fa-circle-info fa-2xl" style={{color: "#63b81e",}}></i>
        </div>
      </div>
      <hr />
      {/* chat */}
      <div className=" chatcontent">
        <div className="message">
          <img src="./media/avatar.png" alt="" />
          <div className="texts">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores at
            soluta dolor ea magni repudiandae maiores. Voluptatem tenetur odit
            animi autem, iste illum rem libero. Recusandae esse veniam a
            distinctio?
            <span>a min ago</span>
          </div>
        </div>
        <div className="message">
          <img src="./media/avatar.png" alt="" />
          <div className="texts">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores at
            soluta dolor ea magni repudiandae maiores. Voluptatem tenetur odit
            animi autem, iste illum rem libero. Recusandae esse veniam a
            distinctio?
            <span>a min ago</span>
          </div>
        </div>
        <div className="message owner">
          <div className="texts">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores at
            soluta dolor ea magni repudiandae maiores. Voluptatem tenetur odit
            animi autem, iste illum rem libero. Recusandae esse veniam a
            distinctio?
            <span>a min ago</span>
          </div>
        </div>
        <div className="message">
          <img src="./media/avatar.png" alt="" />
          <div className="texts">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores at
            soluta dolor ea magni repudiandae maiores. Voluptatem tenetur odit
            animi autem, iste illum rem libero. Recusandae esse veniam a
            distinctio?
            <span>a min ago</span>
          </div>
        </div>
        <div className="message owner">
          <div className="texts">
            <img src="./media/engin-akyurt-Hlkuojv_P6I-unsplash.jpg" height={'100px'} width={'100px'} alt="" />
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores at
            soluta dolor ea magni repudiandae maiores. Voluptatem tenetur odit
            animi autem, iste illum rem libero. Recusandae esse veniam a
            distinctio?
            <span>a min ago</span>
          </div>
        </div>
        <div className="message">
          <img src="./media/avatar.png" alt="" />
          <div className="texts">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores at
            soluta dolor ea magni repudiandae maiores. Voluptatem tenetur odit
            animi autem, iste illum rem libero. Recusandae esse veniam a
            distinctio?
            <span>a min ago</span>
          </div>
        </div>
        <div ref={endRef}></div>
      </div>
      
     

      {/* bottom */}
      <div className="inputbar ">
        <img width={"20px"} height={"20px"} src="/media/img.png" alt="" />
        <img width={"20px"} height={"20px"} src="/media/camera.png" alt="" />
        <img width={"20px"} height={"20px"} src="/media/mic.png" alt="" />
        <input
          type="text"
          className="form-control  w-75"
          placeholder="type a message..."
        />
        <button className="btn text-light">
          {" "}
          <i className="fa-solid fa-paper-plane text-light"></i> Send
        </button>
      </div>
     </> )}
    </div>
  );
}

export default Chat;
