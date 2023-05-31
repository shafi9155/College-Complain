import React,{useState,useEffect} from 'react'
import AdminNav from './AdminNav'
import { Link } from 'react-router-dom';
function AdminStudent() {
  const [userData,setData] = useState();
  const getStudent = async () => {
    // console.log(SingleComplain.user_id)
    const url = "http://localhost:5000/api/students/getallStudent";

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const res = await response.json();
  
    setData(res);
   
  };

 useEffect(()=>{
  getStudent()
 },[userData]);

  return (
    <div className='min-h-screen'>      
    <AdminNav/>
    <div className=" container flex mx-auto  content-center justify-center  dark:text-gray-700   mt-30">
        <div className=' '>
        <table className="w-full text-m text-left text-gray-500  dark:text-gray-700 mt-40">
      <thead className=" text-l text-gray-700 uppercase bg-custom-grey dark:bg-gray-700 dark:text-gray-400 mt-60">
        <tr>
        <th scope="col" className="px-6 py-3">
                TicketNo
                </th>
          <th className='col'>Name</th>
          <th className='col'>Enrollment Number</th>
          <th className='w-1/5'>Email</th>
          <th className='w-1/6'>Mobile No</th>
          <th className='w-1/12'>Action</th>

        </tr>
      </thead>
      <tbody>
        {userData?userData.map((k)=>(
            <tr className="bg-blue-100 border-b text-black rounded-lg  dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {/* <Link to={`/Complaint/${k._id}`} > */}
                <a  className='no-underline hover:underline inline-block  text-custom-blue' href="">{k._id}</a>
                {/* </Link> */}
                </th>
                <td className="px-6 py-4">
                <a href="/SingleComplaint" className='hover:underline text-custom-blue'>{k.name}</a>
                </td>
                <td className="px-6 py-4">
                    {k.enrollmentNo}
                </td>
                <td className="px-6 py-4">
                    {k.email}
                </td>
                <td className="px-6 py-4">
                {k.mobileNo}
                </td>
                <td className='pt-4 pb-4 p-4 text-md '><button className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>Delete</button></td>
       
            </tr>
        )):<></>}
       </tbody>
     
    </table>
        </div>
        </div>
        </div>
  )
}

export default AdminStudent