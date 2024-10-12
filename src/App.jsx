import { useEffect, useState } from "react";

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

function App() {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  // console.log(currentUser);

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
        <Container className="contain  ">
          <Row className="" style={{ height: "" }}>
            <Col md={5} sm={12} className="border ">
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
              <h3 className="mt-2 text-light">Chats</h3>
              <hr />
              
                <Row className="mainchatlist">
                  <Chatlist />
                </Row>
            
            </Col>
            <Col md={7} sm={12} className="border">
              <Chat />
            </Col>
          </Row>
        </Container>
      ) : (
        <Authent />
      )}
    </>
  );
}

export default App;
