import React from "react";
import "./Chat.css";
function Chat() {
  return (
    <div className="chat">
      {/* header */}
      <div className="header p-3 d-flex align-items-center justify-content-between">
        <img
          className="avi"
          height={"70px"}
          src="/media/download.png"
          alt="sss"
        />
        <h3>It Is Horse</h3>
        <div className="d-flex gap-5">
          <img
            className=""
            height={"20px"}
            src="/media/phone.png"
            alt="PHONE"
          />
          <img
            className=""
            height={"20px"}
            src="/media/video.png"
            alt="VIDEO"
          />
          <img className="" height={"20px"} src="/media/info.png" alt="info" />
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
            <img src="./media/engin-akyurt-Hlkuojv_P6I-unsplash.jpg" alt="" />
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dolores at
            soluta dolor ea magni repudiandae maiores. Voluptatem tenetur odit
            animi autem, iste illum rem libero. Recusandae esse veniam a
            distinctio?
            <span>a min ago</span>
          </div>
        </div>
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
    </div>
  );
}

export default Chat;
