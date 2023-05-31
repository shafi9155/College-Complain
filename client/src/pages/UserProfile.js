import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux';
import Navbar from '../components/Navbar'
import Singlecmpln from '../components/Singlecmpln'
import { useDispatch } from 'react-redux';
import {getAllUserComplain} from "../features/complain/complainSlice"
import { useEffect } from 'react';
function UserProfile() {

  const [showing,setshowing]=useState(false);

  const {user} =useSelector((state)=>state.auth)
  const { alluserComplain}=useSelector((state)=>state.complain)
  const dispatch=useDispatch();
  useEffect(() => {
    dispatch(getAllUserComplain());
  }, [dispatch])
  
  return (

    <div className=' flex flex-col min-h-screen'>
    <Navbar/>
<div className="parent  m-auto mt-40 flex flex-row mb-20">
    <div className= " m-5 bio basis-1/3">
       <img src="/avatar.png" className="w-52 m-3"   alt=" profile img"/>
       <p className='p-1'>Name :{user.name}</p>
       <p className='p-1'>Enrollment No: {user.enrollmentNo}</p>
       <p className='p-1'>Email : {user.email}</p>
       <p className='p-1'>Mobile No:{user.mobileNo}</p>
         <button className="bg-custom-blue edt-btn mt-5 text-white text-sm  p-2 rounded-lg" onClick={() => setshowing(true)}>Edit Profile</button>
       <div className={showing?"block":"hidden"} >
            <label htmlFor="">
                <span className='mt-2 mb-1 inline-block'>Name</span>
                <input className='border-2 border-slate-400 w-full p-1 rounded-lg' type="text"/>
            </label>
            <label htmlFor="">
                <span className='mt-2 mb-1 inline-block'>Mobile No</span>
                <input className='border-2 border-slate-400 w-full p-1 rounded-lg' type="text"/>
            </label>
            <label htmlFor="">
                <span className='mt-2 mb-1 inline-block'>Change Photo</span>
                <input className='border-2 mb-4 border-slate-400 w-full p-1 rounded-lg' type="file"/>
            </label>
           <button className='bg-custom-blue text-white text-sm  m-2 p-3 rounded-lg'>Save</button>
           <button onClick={() => setshowing(false)} className='bg-custom-grey text-black text-sm  m-2 p-3 rounded-lg'>Cancel</button>
         </div>
         
    </div>
    <div className='basis-2/3'>
    {alluserComplain?alluserComplain.map((p)=>(
      <Singlecmpln title={p.title} status={p.status} createdAt={p.createdAt} ticketno={p._id} complain_type={p.complain_type} complain_regarding={p.complain_regarding}/>
   )):  <><div>No complain </div></>}
    

    
     </div>
  </div>
    </div>
  
  )
}

export default UserProfile