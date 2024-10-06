import React from 'react'
import './AddUser.css'
function AddUser() {
  return (
    <div className='addUser'>
      <form action="" className='form'>
        <input type="text" placeholder='username' name='username' />
        <button className='btn btn-light btn-lg'>Search</button>
      </form>
      <div className="user">
      <div className='detail'>
      <img src="/media/avatar.png" alt="" />
       <h6>jane duhhh</h6>
      </div>
      <button className='btn btn-light btn-sm'>Add user</button>
      </div>
    </div>
  )
}

export default AddUser