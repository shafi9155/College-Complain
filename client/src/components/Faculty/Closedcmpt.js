import React from 'react'
import { Link } from 'react-router-dom'
function Closedcmpt(props) {
  return (
    <div>
      <div className="p-2  m-5 w-2/3 mx-auto rounded-2xl box-shadow cmpln">
      <Link to={`/Complaint/${props.k._id}`} >
        <a href="" className="no-underline hover:underline p-4 inline-block text-3xl text-custom-blue   " >{props.k.title}</a>
        </Link>
        <p className=" pl-2 pr-2 mt-2 mr-3 text-lg  float-right shadow-md">{props.k.complain_type}</p>
       <div className='flex justify-around'>
        <span className=' mt-4  text-sm block'>Ticket No: {props.k._id}  </span>
        <p className=" mt-4 text-sm">Complain Related: {props.k.complain_regarding}</p>
        <span className=" mt-4 inline-block text-sm">Date at Time</span>
        <div><span>Status : </span><span className=" mt-2 inline-block text-red-500"> {props.k.status}  </span></div>
        </div>
    </div>
    </div>
  )
}

export default Closedcmpt
