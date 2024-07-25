"use client"
import React, {useState} from 'react'
import styles from './signup.module.css'
import axios from 'axios'; 
import { useRouter } from 'next/navigation';

const Signup = () => {
  const BASE_URL = 'https://ecomm-neon-tech.vercel.app'
  const router = useRouter()
  const [signupData,setSignupData] = useState({
    name:"",
    email:"",
    password:""
  })  

  const submitSignup = async (e:any) => {
    e.preventDefault()
    if(signupData.name && signupData.email && signupData.password){
      try {
        const response = await axios.post(`${BASE_URL}/user`, {
          name: signupData.name,
          email: signupData.email,
          password: signupData.password,
        });
        if (response.status == 200){
          console.log(response,'response');
          const email = response?.data?.result?.[0]?.user?.email
          const id = response?.data?.result?.[0]?.user?.id
          sessionStorage.setItem("email",email)
          sessionStorage.setItem("id",id)
          setTimeout(() => {
            router.push("/verify");
          }, 100);
        }
        console.log('Signup successful:', response.data);
      } catch (error) {
        console.error('Signup error:', error);
      }
    };
  }
  

  return (
    <div className={styles.loginContainer}>
      <div className={styles.cardContainer}>
        <h2 className={`${styles.heading} text-custom-xl font-bold !text-custom-xl`}>Create your account</h2>
        <form onSubmit={submitSignup}>
          <div className={styles.fields}>
            <label className={`${styles.fieldLabel} font-bold`} htmlFor="name">
              Name
            </label>
            <input id="name" placeholder="Enter" className={styles.inputField} onChange={(e)=>setSignupData(prev=>({...prev,name:e.target.value}))} />
          </div>
          <div className={styles.fields}>
            <label htmlFor="email" className='font-bold'>Email</label>
            <input id="email" placeholder="Enter email" className={styles.inputField} onChange={(e)=>setSignupData(prev=>({...prev,email:e.target.value}))} />
          </div>
          <div className={styles.fields}>
            <label htmlFor="password" className='font-bold'>Password</label>
            <input type="password" id="password" placeholder="Enter password" className={styles.inputField} onChange={(e)=>setSignupData(prev=>({...prev,password:e.target.value}))} />
          </div>
          <button className={styles.loginButton}>CREATE ACCOUNT</button>
          <span className={styles.linkContainer}>
            <p>Have an Account ?</p>
            <span onClick={() => router.push('/login')} className={styles.signupBtn}>LOGIN</span> 
          </span>
        </form>
      </div>
    </div>
  )
}
export default Signup;