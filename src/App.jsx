import { useEffect, useState } from "react";
import 'react-toastify/dist/ReactToastify.css'

import "./App.css";

import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import Authent from "./components/auth/Authent";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import Chatlist from "./components/Chatlist";
import Chat from "./components/Chat";
import AddUser from "./components/AddUser";
import { useUserStore } from "./lib/userStore";
import { Route, Routes } from "react-router-dom";
import { useChatStore } from "./lib/chatStore";

function App() {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  // console.log(currentUser);
 const{chatId}=useChatStore()
 console.log(chatId);
 
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
      // console.log(user);
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  if (isLoading)
    return (
      <div className="loading">
        <div className="contain">
          <h1>Loading....</h1>
        </div>{" "}
      </div>
    );
  return (
    <>
      {" "}
      {currentUser ? (
        <Container className="contain  p-2">
          
          <Row className="" style={{ height: "100vh",width:"" }}>
          {!chatId&&
            <Col md={12} sm={12} className=" ">
              <div className="userdata d-flex flex-wrap align-items-center justify-content-between">
                <div className="imgname d-flex flex-wrap  align-items-center">
                  <img
                    className="avi"
                    src={currentUser?.avi || "/media/avatar.png"}
                    alt="useravi"
                  />
                  <h3>{currentUser?.username}</h3>
                </div>
                <button
                  className="btn btn-danger btn-sm "
                  onClick={() => auth.signOut()}
                >
                  Log Out
                </button>
              </div>
              <h3 className="mt-2 text-light text-center">Chats</h3>
              <hr />
              
                <Row className="mainchatlist p-2">
                  <Chatlist />
                  
                </Row>
            
            </Col>
}
            {chatId&&
            <Col md={12} sm={12} className="">
               <Chat />
            </Col>
}
          </Row>
        </Container>
      ) : (
        <Authent />
      )}
    </>
  );
}

export default App;
