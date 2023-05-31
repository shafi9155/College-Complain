import React from 'react';
import AdminNav from './AdminNav'
import { useDispatch } from 'react-redux';
import {getAllComplain } from "../features/complain/complainSlice"
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
function AdminCompTable() {

    const { allComplain,message}=useSelector((state)=>state.complain)
    const dispatch=useDispatch();
    useEffect(() => {
      dispatch(getAllComplain());
    }, [dispatch])
     console.log(message)
  return (
    <div className='min-h-screen'>      
 <AdminNav/>

<div className=" container flex mx-auto content-center justify-center  mt-60">
{/* <p className='text-center text-3xl'>All Complains</p> */}
    <table className="w-full  mx-auto text-m text-left text-gray-500  dark:text-gray-400">
        <thead className="text-l text-white uppercase  dark:bg-gray-700 dark:text-gray-400 mt-60">
            <tr>
                <th scope="col" className="px-6 py-3">
                TicketNo
                </th>
                <th scope="col" className="px-6 py-3">
                    Title
                </th>
                <th scope="col" className="px-6 py-3">
                    Complain Related
                </th>
                <th scope="col" className="px-6 py-3">
                    Status
                </th>
                <th scope="col" className="px-6 py-3">
                    Username
                </th>
                
            </tr>
        </thead>
        <tbody>
        {allComplain?allComplain.map((k)=>(
            <tr className="bg-blue-100 border-b text-black rounded-lg  dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                <Link to={`/Complaint/${k._id}`} >
                <a  className='no-underline hover:underline inline-block  text-custom-blue' href="">{k._id}</a>
                </Link>
                </th>
                <td className="px-6 py-4">
                <a href="/SingleComplaint" className='hover:underline text-custom-blue'>{k.title}</a>
                </td>
                <td className="px-6 py-4">
                    {k.complain_regarding}
                </td>
                <td className="px-6 py-4">
                    {k.status}
                </td>
                <td className="px-6 py-4">
                
                </td>
            </tr>
        )):<></>}
      
        
            
         
        </tbody>
    </table>
</div>

    
    </div> 
  )
}

export default AdminCompTable
