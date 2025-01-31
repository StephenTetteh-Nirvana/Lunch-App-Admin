import { createContext, useState } from "react"
import { doc , setDoc , getDoc , updateDoc, collection, onSnapshot } from "firebase/firestore"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { db,auth } from "../firebase"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2"

const GlobalState = createContext()

export const StateProvider = ({children}) => {
  const [isAuthenticated,setAuthenticated] = useState(false)
  const [errMsg,setErrMsg] = useState('')
  const [name,setName] = useState('')
  const [price,setPrice] = useState('')
  const [image,setImage] = useState('')
  const [day,setDay] = useState('Monday')
  const [departments,setDepartments] = useState([])
  const [fetchingDepartments,setFetchingDeparments] = useState(false)
  const [deleteLoader,setDeleteLoader] = useState(false)
  const [selectedDay,setSelectedDay] = useState('Monday')
  const [finalProcess,setFinalProcess] = useState(false)

  
  const navigate = useNavigate()

  const registerUser = async (email,password,firstName,lastName,setLoading) => {
    try{
      if ( firstName && lastName && email && password ) {
        setLoading(true)
        await createUserWithEmailAndPassword(auth,email,password)
        const user = auth.currentUser
        if(user){
          const date = new Date().toDateString();
          const time = new Date().toLocaleTimeString()
          const userDoc = doc(db,"Users",user.uid)
          await setDoc(userDoc,{
            Img:'',
            firstName:firstName,
            lastName:lastName,
            email:email,
            status:'Admin',
            createdAt:`${date} at ${time}`
          })
        }
        Swal.fire({
          title: "Account created successfully",
          text: "Please login your account.",
          icon: "success"
        })
        setTimeout(()=>{
          navigate('/login')
        },1500)
      }else{
        alert('Fill all fields')
      }
      
    }catch(error){
      setTimeout(()=>{
        setErrMsg('')
      },2500)
      switch(error.code){
        case 'auth/invalid-email':
          setErrMsg('Invalid Email')
        break;

        case 'auth/invalid-credential':
          setErrMsg('Wrong Email/Password')
        break;

        case 'auth/email-already-in-use': 
          setErrMsg('Email is already taken.')
        break;

        case 'auth/wrong-password': 
          setErrMsg('Wrong Password')
        break;

        case 'auth/email-already-exists':
          setErrMsg('Email Already Exists')
        break;

        default: 
        setErrMsg('Please check your internet connection.')
        break
      }
    }finally{
      setLoading(false)
    }
  }

  const LoginUser = async(email,password,setLoading) =>{
    if(email === "" || password === "" ){
      alert('Fill all fields')
      return;
    }
    try{
      setLoading(true)
      await signInWithEmailAndPassword(auth,email,password)
      const user = auth.currentUser;
      if(user){
        const userDocRef = doc(db,"Users",user.uid)
        const userDoc = await getDoc(userDocRef) 
        if(userDoc.exists){
          const status = userDoc.data().status
          if(status === 'Personnel'){
            setErrMsg('Only admin accounts can log in')
            setTimeout(()=>{
             setErrMsg('')
            },2000)
            return;
          }else{
            localStorage.setItem('userData',JSON.stringify(userDoc.data()))
          }
        }
      }
      localStorage.setItem('user',JSON.stringify(true))
      setAuthenticated(true)
      navigate('/')
    }
    catch(error){
      setTimeout(()=>{
        setErrMsg('')
      },2500)
      switch(error.code){
        case 'auth/invalid-email':
          setErrMsg('Invalid Email')
        break;

        case 'auth/invalid-credential':
          setErrMsg('Wrong Email/Password')
        break;

        case 'auth/email-already-in-use': 
          setErrMsg('Email Already Exists')
        break;

        case 'auth/wrong-password': 
          setErrMsg('Wrong Password')
        break;

        case 'auth/user-not-found':
          setErrMsg('Account does not exist.')
        break;

        case 'auth/weak-password':
          setErrMsg('Password should be 6 characters or more.')
        break;

        default: 
        setErrMsg('Please check your internet connection.')
        break;
      }
    }finally{
    setLoading(false)
    }
  }

  // PRODUCT FUNCTIONALITIES 
  
  const addFood = async(setLoading) => {
    try{
      setLoading(true)
      const productArrayReference = doc(db,'Foods',day)
      const productArrays = await getDoc(productArrayReference)
      const productArray = productArrays.data().foods || []
        const newProduct = {
         id:String(Math.round(Math.random()*500)),
         Img:'no image',
         product:name,
         price:Number(price),
        }
        setFinalProcess(false)
        if(productArray.length === 3 ) {
          Swal.fire({
            title: "List Full",
            text: "The current day has a full list , please select a different day",
            icon: "error"
          })
          return;
        }
        await updateDoc(productArrayReference,{
          foods : [...productArray,newProduct]
        })
      setName('')
      setPrice('')
      Swal.fire({
        title: "Product added successfully.",
        text: "See all products in the list section",
        icon: "success"
      })
    }catch(error){
     console.log(error)
     Swal.fire({
      title: "Network Error",
      text: "Please check your internet connection.",
      icon: "error"
    })
    }finally{
      setLoading(false)
    }
  }

  const deleteFood = async (foodID,closeModal) => {
    try{
      setDeleteLoader(true)
      const productArrayReference = doc(db,'Foods',selectedDay)
      const productArrays = await getDoc(productArrayReference)
      const productArray = productArrays.data().foods || []
      const updatedProductArray = productArray.filter((p)=>p.id !== foodID)
      await updateDoc(productArrayReference,{
        foods:updatedProductArray
      })
      closeModal()
    }catch(error){
      console.log(error)
    }finally{
      setDeleteLoader(false)
    }
  }

  const fetchDepartments = () => {
    try{
      setFetchingDeparments(true)
      const unsub = onSnapshot(collection(db,"Departments"),(snapshot)=>{
      const list =  snapshot.docs.map((document)=>({
        id: document.id,
        ...document.data()
      }))
      setDepartments(list)
      localStorage.setItem('departments',JSON.stringify(list))
      setFetchingDeparments(false)
      })
      return unsub;
    }catch(error){
      console.log(error)
      setFetchingDeparments(false)
    }
  }

  

  return (
    <GlobalState.Provider value={{
      registerUser,errMsg,LoginUser,
      isAuthenticated,setAuthenticated,
      addFood,name,setName,price,setPrice,
      image,setImage,day,setDay,finalProcess,
      setFinalProcess,selectedDay,setSelectedDay,
      deleteFood,deleteLoader,fetchDepartments,departments,
      fetchingDepartments
    }}>
      {children}
    </GlobalState.Provider>
  )
}

export default GlobalState