"use client"
import React,{useState} from 'react'
import styles from './verify.module.css'
import { InputOTP } from 'antd-input-otp';

const Verify = () => {
  const [value, setValue] = useState([]); 
  console.log(value,'value');
  
  const handleSubmit = (otp) => {
    const payload = otp || value;
    let isEmpty = false
    for (let i=0 ;i<payload.length;i++){
      if (payload[i] == ''){
        isEmpty = true
        break
      }
    }
    if(payload.length === 6 && !isEmpty){
      console.log(otp,'otp');
    }
    console.log(payload,'payload');
  };  

  return (
    <div className={styles.loginContainer}>
      <div className={styles.cardContainer}>
        <h2 className={`${styles.heading} text-custom-xl font-bold !text-custom-xl`}>Verify your email</h2>
        <p style={{textAlign:"center",padding:"0",fontSize:"small"}}>Enter the 8 digit code you have received on shubh**@gmail.com</p>
          <div className={styles.fields}>
            <label style={{textAlign:'center',padding:'0.5rem 0'}} className='font-bold'>Code</label>
            <InputOTP style={{margin:"0.7rem 0"}} inputType="numeric" onChange={setValue} value={value} autoSubmit={handleSubmit} />
          </div>
          <button className={styles.loginButton} onClick={() => handleSubmit(value)}>VERIFY</button>
      </div>
    </div>
  )
}

export default Verify
