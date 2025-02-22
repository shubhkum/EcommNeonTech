"use client"
import React, { useEffect, useState } from 'react'
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {ShoppingCartIcon} from "@heroicons/react/24/outline";
import styles from './Navbar.module.css'
import { useRouter } from 'next/navigation';


export const Navbar = () => {
    const router = useRouter();
    const handleLogout = () => {
        sessionStorage.removeItem('isLoggedIn')
        sessionStorage.removeItem('email')
        sessionStorage.removeItem('id')
        setTimeout(() => {
            router.push("/login");
          }, 100);
    }
  return (
    <div>
        <div className={styles.topSection}>
            <span className={styles.topItems}>Help</span>
            <span className={styles.topItems}>Orders & Returns</span>
            <span className={styles.topItems}>Hi, John</span>
        </div>
        <div className={styles.navSection}>
            <h1 className="text-custom-xl font-bold !text-custom-xl">ECOMMERCE</h1>
            <div>
                <span className={`${styles.navItems} font-bold`}>Categories</span>
                <span className={`${styles.navItems} font-bold`}>Sale</span>
                <span className={`${styles.navItems} font-bold`}>Clearance</span>
                <span className={`${styles.navItems} font-bold`}>New stock</span>
                <span className={`${styles.navItems} font-bold`}>Trending</span>
            </div>
            <div style={{display:'flex'}}>
                <MagnifyingGlassIcon  style={{width:'30px',height:'30px',cursor:'pointer'}}/>        
                <ShoppingCartIcon style={{width:'30px',height:'30px',margin:"0rem 1.5rem",cursor:'pointer'}}/>
                <span onClick={handleLogout} style={{width:'30px',height:'30px',margin:"0rem 1.5rem",cursor:'pointer'}}>
                    Logout
                </span>
            
            </div>
        </div>
        <div style={{background:"#F4F4F4"}}>
            <p style={{textAlign:"center",padding:"0.25rem 0rem"}} className='font-bold'>Get 10% off on business sign up</p>            
        </div>
    </div>
  )
}
