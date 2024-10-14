import { create } from "zustand";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";
export const useUserStore = create((set) => ({
  currentUser:null,
  isLoading:true,
  currentChat:null,
  fetchUserInfo:async (uid)=>{
    if(!uid){
      set({currentUser:null,isLoading:false})
    }
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        set({currentUser:docSnap.data(),isLoading:false})
      }
      else{
        set({currentUser:null,isLoading:false})
      }
    } catch (error) {
      console.log(error );
      
      return set({currentUser:null,isLoading:false})
    }
  } ,
  fetchUserChats:async(cid)=>{
    console.log(cid);
    
    try {
      
      const docRef = doc(db, "userchats", cid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        set({currentChat:docSnap.data()})
        console.log("inside");
      }
      else{
        console.log("inside");
        set({currentChat:''})
      }
    } catch (error) {
      console.log(error );
      
    }
     
  }
}))