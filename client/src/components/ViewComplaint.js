import React,{useEffect} from "react";
import ComplaintDesc from './ComplaintDesc';
import Chat from './ViewComplaints/Chat';
import { useState } from "react";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import FacultyNav from "./FacultyNav";


function ViewComplaint() {
  const [showComnt,setshowCmnt]=useState(false);
   
const user=useSelector((state)=>state.auth);
const staff=useSelector((state)=>state.staff)

  return (

    <div className="mt-28">
      {user? (<Navbar/>):<></>}
      {staff? (<FacultyNav/>):<></>}
    <div >


      <div className="text-center -mt-2">
        <button
        onClick={()=>{
          setshowCmnt(false);
        }}
          type="button"
          className="w-1/2  border items-center p-5 text-xl font-medium  text-white bg-blue-700  hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >Complaint Description
        </button>
        <button
         onClick={()=>{
          setshowCmnt(true);
        }}
          type="button"
          className="w-1/2  items-center  p-5 text-xl font-medium text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Comment
          {/* <span className="inline-flex items-center justify-center p-3 h-4 ml-2 text-lg font-semibold text-blue-800 bg-blue-200 rounded-full">
            3
          </span> */}
        </button>
      </div>

        <div className="mb-16">
        {!showComnt?<ComplaintDesc/>: <Chat/>}
          </div>

    </div>
    </div>
  );
}

export default ViewComplaint;
