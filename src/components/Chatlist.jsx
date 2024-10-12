import React, { useEffect, useState } from "react";
import "./Chatlist.css";
import AddUser from "./AddUser";
import { useUserStore } from "../lib/userStore";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";
import { Button } from "react-bootstrap";

function Chatlist() {
  const [chats, setChats] = useState([]);
  const [addContact,setAddContact]=useState(false);
  const { currentUser } = useUserStore();
  //chat fetch
  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "userchats", currentUser.id),
      async (res) => {
        const items = res.data().chats;
        const promises = items.map(async (item) => {
          const userDocRef = doc(db, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);
          const user = userDocSnap.data();
          return { ...item, user };
        });
        const chatData = await Promise.all(promises);
        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
      }
    );
    // console.log(chats);

    return () => {
      unsub();
    };
  }, [currentUser.id]);
  // console.log(chats);
  //userfetch
  // useEffect(()=>{
  //   const unsub = onSnapshot(doc(db, "users", currentUser.id), (doc) => {
  //    setChats(doc.data())
  // });
  // return()=> {
  //   unsub()
  // }
  // },[currentUser.id])

  return (
    <>
    
    
    
    <div className="chatlist">
       <div className="d-flex search ms-3">
                {" "}
                <img src="/media/search.png" width={"30px"} height={'35px'} alt="" className="me-2" />
                <input
                  type="text"
                  className="form-control  w-75"
                  placeholder=" search chat "
                />
                <Button className="ms-3 btn btn-light" onClick={()=>{setAddContact(!addContact)}} >{addContact?"-":"+"}</Button>{" "}
                 {addContact?<AddUser/>:<></>}
      </div>
      <hr />
      {chats?.map((chat) => (
        <div className="onechat d-flex p-2 " key={chat.chatId}>
          <img
            className="avi"
            height={"40px"}
            src={chat.user.avi || "/media/download.png"}
            alt="sss"
          />
          <p className="ms-4 " style={{ fontSize: "2.5vh" }}>
            {chat.user.username} <br />
            <span className="fs-6" style={{ fontWeight: "lighter" }}>
              {chat.lastmessage}
            </span>{" "}
          </p>
        </div>
      ))}
    </div>
  
  </>);
}

export default Chatlist;
