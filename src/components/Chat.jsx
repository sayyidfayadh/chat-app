import React, { useEffect, useRef, useState } from "react";
import "./Chat.css";
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useUserStore } from "../lib/userStore";
import { useChatStore } from "../lib/chatStore";

function Chat() {
  const[chat,setChat]=useState("")
  const[envelope,setEnvelope]=useState("")
  const {chatId,user}=useChatStore()
  const{deSelectChat}=useChatStore()
  const {currentUser}=useUserStore()
  // console.log(chatId);
  // console.log(user);

  
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


  // console.log(chat);
  const handleSend=async ()=>{
    if(envelope==="") return;
    try {
      await updateDoc(doc(db,"chats",chatId),{
        messages:arrayUnion({
          senderId:currentUser.id,
          envelope,
          createdAt:new Date()
        })
      })
      
      const userIDs=[currentUser.id,user.id] //array of ids to update sender and receiver using for each
      const userChatsRef=doc(db,"userchats",user.id)
      const userChatsSnap=await getDoc(userChatsRef)
      if(userChatsSnap.exists()){
        const userChatsData=userChatsSnap.data()
        // console.log(userChatsData);
        const chatIndex=userChatsData.chats.findIndex(chatofchats=>chatofchats.chatId===chatId)
         userChatsData.chats[chatIndex].lastMessage=envelope
        //  userChatsData.chats[chatIndex].isSeen=false; //id conditionally to set seen for sender and not seen for user
         userChatsData.chats[chatIndex].updatedAt= Date.now() 
         await updateDoc(userChatsRef,{
          chats:userChatsData.chats,
         })  
        
      }
      const userChatsRef2=doc(db,"userchats",currentUser.id)
      const userChatsSnap2=await getDoc(userChatsRef2)
      if(userChatsSnap2.exists()){
      const userChatsData2=userChatsSnap2.data()
      // console.log(userChatsData2);
      const chatIndex2=userChatsData2.chats.findIndex(chatofchats=>chatofchats.chatId===chatId)
       userChatsData2.chats[chatIndex2].lastMessage=envelope
      //  userChatsData2.chats[chatIndex2].isSeen=false; //id conditionally to set seen for sender and not seen for user
       userChatsData2.chats[chatIndex2].updatedAt= Date.now() 
       await updateDoc(userChatsRef2,{
        chats:userChatsData2.chats,
       })       
      }
      
    } catch (error) {
      console.error(error);
    }
  }
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
          src={user?.avi || "/media/avatar.png"}
          alt="sss"
        />
        <h3>{user?.username}</h3>
        <div className="d-flex gap-5">
        <i className="fa-solid fa-circle-info fa-2xl" style={{color: "#63b81e",}}></i>
        </div>
      </div>
      <hr />
      {/* chat */}
      <div className=" chatcontent">
        
       {chat?.messages?.map((message)=>(
         <div className={message.senderId==currentUser.id?"message owner":"message"}  key={message?.createdAt}>
         <div className="texts">
          {message.img&&
           <img src={message.img} height={'100px'} width={'100px'} alt="" />
          }
          <h6 className="text-dark ">
            {message.envelope}
          </h6>
           {/* <span>{message}</span> */}
         </div>
       </div>
      
       ))
       }
        <div ref={endRef}></div>
      </div>
      
     

      {/* bottom */}
      <div className="inputbar">
        <img width={"20px"} height={"20px"} src="/media/img.png" alt="" />
        <input
          type="text"
          className="form-control  w-75"
          placeholder="type a message..."
          onChange={(e)=>setEnvelope(e.target.value)}
        />
        <button className="btn text-light" onClick={handleSend}>
          {" "}
          <i className="fa-solid fa-paper-plane text-light"></i> Send
        </button>
      </div>
     </> )}
    </div>
  );
}

export default Chat;
