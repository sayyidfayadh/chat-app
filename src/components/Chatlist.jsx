import React, { useEffect, useState } from "react";
import "./Chatlist.css";
import AddUser from "./AddUser";
import { useUserStore } from "../lib/userStore";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { Button } from "react-bootstrap";
import { useChatStore } from "../lib/chatStore";

function Chatlist() {
  
  const [chats, setChats] = useState([]);
  const [addContact,setAddContact]=useState(false);
  const { currentUser,fetchUserChats ,} = useUserStore();
  const {selectChat,changeSeen}=useChatStore()
  useEffect(() => {
    const unsub = onSnapshot(
        //chat fetch

      doc(db, "userchats", currentUser.id),
      async (res) => {
      
        const items = res.data().chats;
        const promises = items.map(async (item) => {
          //userfetch
          const userDocRef = doc(db, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);
          const user = userDocSnap.data();
          // merge
          return { ...item, user };
        });
        const chatData = await Promise.all(promises);
        // console.log(chatData);
        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );
   

    return () => {
      unsub();
    };
  }, [currentUser.id]);
  console.log(chats);
  const handleSelect=async (chat)=>{
    const updatedChats = chats.map((item) => {
      if (item.chatId === chat.chatId &&!item.isSeen) {
        return {
          ...item,
          isSeen: true, // Mark the selected chat as seen
        };
      }
      return item;
    });
    // console.log("hi");
  setChats(updatedChats) 
    const userChatsRef=doc(db,"userchats",currentUser.id)
    try {
      await updateDoc(userChatsRef,{
        chats:updatedChats,
        
      })
      const otherUserChatsRef = doc(db, "userchats", chat.receiverId);
      const otherUserChatsSnap = await getDoc(otherUserChatsRef);
      if (otherUserChatsSnap.exists()) {
        const otherUserChats = otherUserChatsSnap.data().chats.map((item) =>
          item.chatId === chat.chatId ? { ...item, isSeen: true } : item
        );
        await updateDoc(otherUserChatsRef, { chats: otherUserChats });
      }
      selectChat(chat.chatId,chat.user)
    } catch (error) {
      console.log(error);
      
    }
    
  }
  return (
    <>
    
    
    <div className="chatlist p-2">
       <div className="d-flex justify-content-between search ms-3">
                {" "}
                <img src="/media/search.png" width={"30px"} height={'35px'} alt="" className="me-2" />
                <input
                  type="text"
                  className="form-control  w-100"
                  placeholder=" search chat "
                />
                <Button className="ms-3 btn btn-light" onClick={()=>{setAddContact(!addContact)}} >{addContact?"-":"+"}</Button>{" "}
                 {addContact?<AddUser/>:<></>}
      </div>
      <hr />
      {chats?.map((chat) => (
        <div className="onechat d-flex p-2 " key={chat.chatId} onClick={()=>handleSelect(chat)}>
          <img
            className="avi"
            height={"40px"}
            src={chat.user.avi || "/media/avatar.png"}
            alt="sss"
          />
          <p className="ms-4 " style={{ fontSize: "2.5vh" }}>
            {chat.user.username} <br />
            <span className="fs-6" style={{ fontWeight: "lighter" }}>
     <div className="d-flex align-items-center gap-2">      
       <i className="fa-solid fa-check-double fa-xs" style={{color:chat?.isSeen?"skyblue":"greenyellow"}}></i>
     {chat?.lastMessage}</div> 
            </span>{" "}
          </p>
        </div>
      ))}
    </div>
  
  </>);
}

export default Chatlist;
