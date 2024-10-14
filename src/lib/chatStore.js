import { create } from "zustand";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
import { useUserStore } from "./userStore";
export const useChatStore = create((set) => ({
  chatId:"",
  user:"",
  isCurrentUserBlocked:false,
  isReceiverBlocked:false,
  selectChat:(chatId,user)=>{
    const currentUser=useUserStore.getState().currentUser
    // current-user blocked
    if(user.blocked.includes(currentUser.id)){
      return set({
      chatId,
      user:null,
      isReceiverBlocked:false,
      isCurrentUserBlocked:true
      })
    }
    // user blocked
   else if(currentUser.blocked.includes(user.id)){
      return set({
      chatId,
      user:null,
      isReceiverBlocked:true,
      isCurrentUserBlocked:false
      })
    }
    else{
     return set({
        chatId,
        user,
        isCurrentUserBlocked:false,
        isReceiverBlocked:false
      })
    }
  },
  // changeSeen: () => {
  //   console.log("insideseen");
  //   set((state) => ({
  //     ...state, 
  //     isSeen:true
  //   }));
  // }
  // ,
  deSelectChat:()=>{
    set(state=>({...state,chatId:null}))
  },
  blockAndUnblock:()=>{
    set(state=>({...state,isReceiverBlocked:!state.isReceiverBlocked}))
  }
}))