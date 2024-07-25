"use client"
import React , {useEffect, useState} from 'react'
import styles from './verify/verify.module.css'
// import {Categories} from './constants.js'
import { Pagination } from "antd";
import { redirect } from 'next/navigation';
import axios from 'axios';
interface Category {
  id: number | string;
  name: string
}
export default function Home() {
  const BASE_URL = 'https://ecomm-neon-tech.vercel.app'
  if (typeof window !== 'undefined') {
    const isAuth = sessionStorage.getItem('isLoggedIn');
    if(!isAuth || !sessionStorage){
      console.log(isAuth,'isAuth');
      redirect("/login")
    }
  }
  const [categories, setCategories] = useState<Category[]>([])
  // const [selectedCategories, setSelectedCategories] = useState(
  //   Categories.reduce((acc, item) => (acc[item.id] = item.checked, acc), {}));  
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([])
  const [currentPage, setCurrentPage] = useState(1);
  const ItemsPerPage = 6;
  const indexOfLastItem = currentPage * ItemsPerPage;
  const indexOfFirstItem = indexOfLastItem - ItemsPerPage;
  const currentItems = categories?.slice(indexOfFirstItem, indexOfLastItem);
  const [mappedSelectedIds, setMappedSelectedIds] = useState<Record<string, boolean>>({})
  const [updateDb,setUpdateDb] = useState(false)
  console.log('categories',selectedCategories);
  
  useEffect(() => {
    const getSelectedCategories = async () => {
      try {
        if (typeof window == 'undefined') {
          const id = sessionStorage.getItem("id")
          const response = await axios.get(`${BASE_URL}/user/${id}`);
          if (response.status == 200){
            console.log(response,'responseeee',response?.data?.result?.[0]?.user?.selectedCategories);
            setSelectedCategories(response?.data?.result?.[0]?.user?.selectedCategories)
          }
        }
      } catch (error) {
        console.error('Unable to fetch selected categories', error);
      }
    }
    const getCategories = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/categories`);
        if (response.status == 200){
          console.log(response,'responseeee',response?.data?.result?.[0]?.categories);
          setCategories(response?.data?.result?.[0]?.categories)
        }
      } catch (error) {
        console.error('Unable to fetch selected categories', error);
      }
    }
    if (categories?.length == 0 ){
      getCategories()
    }
    if (selectedCategories?.length == 0){
      getSelectedCategories()
    }
  },[])

  useEffect(() =>{
    if (selectedCategories) {
      const newMap: Record<string | number, boolean> = {}
      selectedCategories.forEach((item:Category) => {
        console.log('insideeffect');
        newMap[item.id] = true
      })
      setMappedSelectedIds(newMap)
    }
  },[selectedCategories])

  const updateCategory = async (newTempSelected:any) => {
    try {
      if (typeof window == 'undefined') {
        const id = sessionStorage.getItem("id")
        const categoriesId = newTempSelected?.map((item:any) => item.id)
        const response = await axios.put(`${BASE_URL}/user/${id}`,{
          "selectedCategories" : categoriesId
        });
        if (response.status == 200){
          console.log(response,'responseeee');
          // setCategories(response?.data?.result?.[0]?.categories)
        }
      }
    } catch (error) {
      console.error('Unable to fetch selected categories', error);
    }
  }

  const handleCheckboxChange = (itemId:any) => {
    console.log(itemId,'itemId');
    const categoryItem: Category | undefined = categories?.find((item:any) => item.id === itemId)
    if (mappedSelectedIds[itemId]) {
      console.log('inside');
      const newTempSelected = selectedCategories.filter((item:any) => item.id !== itemId)
      setSelectedCategories((prevCategories) => {
        if (!prevCategories) return []
        const newSelected = prevCategories.filter((item:any) => item.id !== itemId)
        return newSelected
      });
      updateCategory(newTempSelected)
    } else{
      const newTempSelected = [...selectedCategories, categoryItem]
      updateCategory(newTempSelected)
      console.log('inside not');
      setSelectedCategories((prevCategories) => ([...prevCategories,...(categoryItem ? [categoryItem]: []) ]))
    }
  };

  const handlePageChange = (page:any) => {
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
              {currentItems?.map((item) => (
                <div key={item.id} className='flex items-center start w-full' style={{marginTop:'0.2rem',marginLeft:'65%'}}>
                  <div className='flex items-center'>
                    <input
                      type="checkbox"
                      id={(item.id as string)}
                      checked={mappedSelectedIds[item.id] ? true : false} 
                      onChange={() => handleCheckboxChange(item.id)} 
                      style={{width:'20px',height:'20px',margin:'0 0.8rem 0'}}
                    />
                  </div>
                    <label style={{textAlign:'left'}} htmlFor={(item.id as string)} className='font-bold text-custom-xl-3 !text-custom-xl-3'>{item.name}</label>
                </div>
              ))}
            </div>
            <div style={{display:'flex',justifyContent:'center'}}>
              <Pagination         
                defaultCurrent={1}
                total={categories?.length}
                pageSize={ItemsPerPage}
                onChange={handlePageChange}
                className="mt-4" 
                showSizeChanger={false}
              />
            </div>
          </div>
      </div>
  </div>
  );
}
