"use client"
import React , {useState} from 'react'
import styles from './verify/verify.module.css'
import {Categories} from './constants.js'
import { Pagination } from "antd";

export default function Home() {

  const [selectedCategories, setSelectedCategories] = useState(
    Categories.reduce((acc, item) => (acc[item.id] = item.checked, acc), {}));  
  const [currentPage, setCurrentPage] = useState(1);
  const ItemsPerPage = 8;
  const indexOfLastItem = currentPage * ItemsPerPage;
  const indexOfFirstItem = indexOfLastItem - ItemsPerPage;
  const currentItems = Categories.slice(indexOfFirstItem, indexOfLastItem);
  const handleCheckboxChange = (itemId) => {
    setSelectedCategories((prevCategories) => ({
      ...prevCategories,
      [itemId]: !prevCategories[itemId], 
    }));
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  return (
      <div className={styles.loginContainer}>
      <div className={styles.cardContainer}>
        <h2 className={`${styles.heading} text-custom-xl font-bold !text-custom-xl`}
          style={{padding: '1rem 0 0.2rem 0'}}
        >Please mark your interests!</h2>
        <p style={{textAlign:"center"}}>We will keep you notified.</p>
          <div className={styles.fields}>
            <label style={{margin:'0.5rem 0 1rem',fontWeight:'bold',textAlign:'center'}}>My saved interests!</label>
            <div className='flex flex-col items-center'>
              {currentItems.map((item) => (
                <div key={item.id} className='flex items-center start w-full' style={{marginTop:'0.2rem',marginLeft:'65%'}}>
                  <div className='flex items-center'>
                    <input
                      type="checkbox"
                      id={item.id}
                      checked={selectedCategories[item.id]} 
                      onChange={() => handleCheckboxChange(item.id)} 
                      style={{width:'20px',height:'20px',margin:'0 0.8rem 0'}}
                    />
                  </div>
                    <label style={{textAlign:'left'}} htmlFor={item.id} className='font-bold text-custom-xl-3 !text-custom-xl-3'>{item.name}</label>
                </div>
              ))}
            </div>
            <div style={{display:'flex',justifyContent:'center'}}>
              <Pagination         
                defaultCurrent={1}
                total={Categories.length}
                pageSize={ItemsPerPage}
                onChange={handlePageChange}
                className="mt-4" 
              />
            </div>
          </div>
      </div>
  </div>
  );
}
