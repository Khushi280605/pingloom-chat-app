import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, sendPasswordResetEmail, signInWithEmailAndPassword} from "firebase/auth";
import { collection, doc, getDocs, getFirestore, query, setDoc, where } from "firebase/firestore";
import { toast } from "react-toastify";

import { signOut } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDCY3XuXNVUfU8tW6uUrdvf2yfSDc_MukA",
  authDomain: "pingloom-f14cb.firebaseapp.com",
  projectId: "pingloom-f14cb",
  storageBucket: "pingloom-f14cb.firebasestorage.app",
  messagingSenderId: "169350516641",
  appId: "1:169350516641:web:fd31f33bfb90f7b30845e0"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async(username,email,password)=>{
  try{
    const res = await createUserWithEmailAndPassword(auth,email,password);
    const user = res.user;
    await setDoc (doc(db,"users",user.uid),{
      id: user.uid,
      username:username.toLowerCase() ,
      email,
      name:"",
      avatar:"",
      bio:"Hey, there i am using pingloom",
      lastSeen: Date.now()
    })
    await setDoc(doc(db,"chats",user.uid),{
      chatsData:[]
    })
    toast.success("Signup Successful!")
  } catch(error) {
     console.error(error)
     toast.error(error.code.split('/')[1].split('-').join(" "));
  }
}

const login = async (email,password) => {
    try {
      await signInWithEmailAndPassword(auth,email,password);
      toast.success("Login Successful!")
    } catch (error) {
      console.error(error);
      toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = async() => {
  try {
    await signOut(auth)
    toast.success("Logout Successful!")
  } catch (error) {
    console.error(error);
    toast.error(error.code.split('/')[1].split('-').join(" "));
  }
  
}

const resetPass = async (email) => {
  if (!email) {
    toast.error("Enter your email");
    return null;
    
  }
  try {
    const userRef = collection(db,'users');
    const q = query(userRef,where("email","==",email));
    const querySnap = await getDocs(q);
    if (!querySnap.empty) {
      await sendPasswordResetEmail(auth,email);
      toast.success("Reset Email Sent!")
    }
    else{
      toast.error("Email does not exists")
    }
  } catch (error) {
    console.error(error);
    toast.error(error.message)
  }
}

export {signup,login,logout,auth,db,resetPass }
