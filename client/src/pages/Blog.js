import React,{useState} from 'react'
import Navbar from '../components/Navbar'
import SingleBlogCmpln from '../components/SingleBlogCmpln'
import { fetchPublic } from '../features/complain/complainSlice';
import {useSelector,useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import { reset } from "../features/complain/complainSlice";
import { useEffect } from "react";

function Blog() {
 
 const dispatch=useDispatch();
 
  const {publicComplain,isError,isSuccess,message}= useSelector(
    (state)=> state.complain )
  
  useEffect(() =>{

dispatch(fetchPublic());
   dispatch(reset());

}, [isError,dispatch])
  
  return (
    <div className="flex flex-col min-h-screen">
    <Navbar/>
    <div className='mt-40 mb-28'>

    {publicComplain?publicComplain.map((p)=>(
      <SingleBlogCmpln status={p.status}  title={p.title} upvotes={ p.upvotes} len={p.upvotes.length} createdAt={p.createdAt} desc={p.desc} cmpln={p.complain_regarding} ticketno={p._id} key={p} user_id={p.user_id}/>
    
   )):<div className=' flex justify-center mt-80 text-2xl text-slate-400 text-center'> No Complaints Registered </div>}
  

    </div>
    </div>
  )
}

export default Blog
