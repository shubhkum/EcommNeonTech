import React from 'react'
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline";
import {ShoppingCartIcon} from "@heroicons/react/24/outline";
import styles from './Navbar.module.css'


export const Navbar = () => {

  return (
    <div>
        <div className={styles.profileSection}>
            <span className={styles.profileItems}>Help</span>
            <span className={styles.profileItems}>Orders & Returns</span>
            <span className={styles.profileItems}>Hi, John</span>
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
            </div>
        </div>
        <div style={{background:"#F4F4F4"}}>
            <p style={{textAlign:"center",fontSize:"small",fontWeight:"600",padding:"0.25rem 0rem"}} className='font-bold'>Get 10% off on business sign up</p>            
        </div>
    </div>
  )
}
