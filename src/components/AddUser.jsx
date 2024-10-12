import React, { useState } from 'react'
import './AddUser.css'
import { arrayUnion, collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from '../lib/firebase';
import { useUserStore } from '../lib/userStore';
function AddUser() {
  const [receiver,setReceiver]=useState(null)
  const[added,setadd]=useState(true)
  const {currentUser}=useUserStore()
  const handleSearch=async (e)=>{
    e.preventDefault()
    const search=new FormData(e.target)
    const username=search.get("username")
    try {    
    const usersRef = collection(db, "users");
    // Create a query against the collection.
    const q = query(usersRef, where("username", "==", username));
      // const querySnapshot
      const querySnapshot=await getDocs(q)
      if(!querySnapshot.empty){
        setReceiver(querySnapshot.docs[0].data())
      }
    } catch (error) {
      console.error(error)
      
    }
  }
  
  const handleAddUser = async () => {
    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userchats");

    try {
      const newChatRef = doc(chatRef);
      // console.log(newChatRef.id);
      
      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });
      //updates metadata current users collection
      await updateDoc(doc(userChatsRef, currentUser.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: receiver.id,
          updatedAt: Date.now(),
        }),
      });
      //updates metdata at receiever end
      await updateDoc(doc(userChatsRef, receiver.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.id,
          updatedAt: Date.now(),
        }),
      });
      setadd(false)

    
    } catch (err) {
      console.log(err);
    }
  };


  return (
   <> {added?
    <div className='addUser'>
      <form action="" className='form'onSubmit={handleSearch}>
        <input type="text" placeholder='username' name='username' />
        <button className='btn btn-light btn-lg' >Search</button>
      </form>
      {receiver&&
      <div className="user">
        
      <div className='detail'>
      <img src={receiver?.avatar || "/media/avatar.png"} alt="" />
       <h6>{receiver?.username}</h6>
      </div>
      <button className='btn btn-light btn-sm' onClick={handleAddUser}>Add user</button>
      </div>
}
    </div>:<></>
}
</>
  )
}

export default AddUser