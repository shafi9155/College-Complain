import React, { useEffect } from 'react'
import ComplaintForm from '../components/ComplaintForm'
import Navbar from '../components/Navbar'


function Complaint() {

  return (
    <div>
      <Navbar/>
      <div className="box-shadow form mt-44 mb-28">
        <h1 className='text-4xl p-5 text-custom-blue'>Student Complaint Form</h1> 
         <ComplaintForm/>
      </div>
    </div>
  )
}

export default Complaint
