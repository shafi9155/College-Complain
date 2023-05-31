import React from "react";
import ComplaintDesc from './ComplaintDesc';
import Chat from './ViewComplaints/Chat';
import { useState } from "react";
import Navbar from "./Navbar";
import FacultyNav from "./FacultyNav";

function ViewComplaint() {
  const [showComnt,setshowCmnt]=useState(false);
  const [showing,setshowing]=useState(false);

  return (
    <>
    <FacultyNav/>
    <div className="mt-28">

      <div className="text-center">
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
          <span className="inline-flex items-center justify-center p-3 h-4 ml-2 text-lg font-semibold text-blue-800 bg-blue-200 rounded-full">
            3
          </span>
        </button>
      </div>
      <div className="w-1/5 absolute top-48 right-8">
         <button onClick={() => setshowing(true)} className="bg-custom-blue  mr-5 edt-btn mt-32 mb-10 text-white text-sm  p-4 rounded-lg">Update Status</button>
         <div className={showing?"block":"hidden"} >
         <div className=" pb-2">
        <p className="para">Status:</p>
          <label htmlFor="select">
           
            <select className="w-full rounded-lg p-3 border-gray-500 border-2 " >
            <option value="" hidden >Select</option>
              <option value="Accept">Accept</option>
              <option value="Progress">In Progress</option>
              <option value="Closed">Closed</option>

                 </select>
          </label>
          </div>
           <button className='bg-custom-blue text-white text-sm  m-2 p-3 rounded-lg'>Save</button>
           <button onClick={() => setshowing(false)} className='bg-custom-grey text-black text-sm  m-2 p-3 rounded-lg'>Cancel</button>
         </div>
         </div>
        <div className="mb-16">
        {!showComnt?<ComplaintDesc/>: <Chat/>}
          </div>


      
    </div>
    </>
  );
}

export default ViewComplaint;
