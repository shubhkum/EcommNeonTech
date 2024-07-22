"use client"
import React, {useState} from 'react'
import styles from './signup.module.css'

const Signup = () => {
  const [signupData,setSignupData] = useState({
    name:"",
    email:"",
    password:""
  })  
  const submitSignup = (e) => {
    e.preventDefault()

    if(signupData.name && signupData.email && signupData.password){
     console.log(signupData,'signupdata');
     
    }
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
            <button type="submit" className={styles.signupBtn}>LOGIN</button> 
          </span>
        </form>
      </div>
    </div>
  )
}
export default Signup;