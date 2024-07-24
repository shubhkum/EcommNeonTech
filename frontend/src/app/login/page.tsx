"use client";
import React,{useState} from 'react'
import styles from './login.module.css'
import axios from 'axios'
import { useRouter } from 'next/navigation';

const Login = () => {
  const BASE_URL = 'http://localhost:8000'
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const router = useRouter();
  const submitLogin = async (e) => {
    e.preventDefault();
    if(loginData.email && loginData.password){
      try {
        const response = await axios.post(`${BASE_URL}/verifyUser`, {
          email: loginData.email,
          password: loginData.password,
        });
        if (response.status == 200){
          localStorage.setItem('isLoggedIn', "true")
          setTimeout(() => {
            router.push("/");
          }, 100);
        }
        console.log('Signup successful:', response.data);
      } catch (error) {
        console.error('Signup error:', error);
      }
    }
  };
  

  return (
    <div className={styles.loginContainer}>
      <div className={styles.cardContainer}>
        <h2 className={`${styles.heading} text-custom-xl font-bold !text-custom-xl`}>Login</h2>
        <h4 style={{ textAlign: "center", padding: "0.5rem 0" }} className='custom-xl-2 font-bold !custom-xl-2'>Welcome back to ECOMMERCE</h4>
        <p style={{ textAlign: "center", padding: "0.5rem 0", fontSize: "small" }}>The next gen business marketplace</p>
        <form onSubmit={submitLogin}>
          <div className={styles.fields}>
            <label htmlFor="email" className='font-bold'>Email</label>
            <input id="email" placeholder="Enter email" className={styles.inputField} onChange={(e) => setLoginData((prev) => ({ ...prev, email: e.target.value }))} />
          </div>
          <div className={styles.fields}>
            <label htmlFor="password" className='font-bold'>Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter password"
              className={styles.inputField}
              onChange={(e) => setLoginData((prev) => ({ ...prev, password: e.target.value }))}
            />
          </div>
          <button className={styles.loginButton}>LOGIN</button>
          <span className={styles.linkContainer}>
            <p>Don't have an Account?</p>
            <button type="submit" className={styles.signupBtn}>
              SIGN UP
            </button>
          </span>
        </form>
      </div>
    </div>
  )
}

export default Login