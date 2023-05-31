import React from 'react'
import { Link } from 'react-router-dom'
function Activecmpt(props) {
  return (
    <div>
      <div className="p-2 w-2/3 mx-auto m-5 rounded-2xl  cmpln box-shadow">
      <Link to={`/Complaint/${props.k._id}`} >
        <a href="/Staff/SingleCompalins" className="no-underline hover:underline p-4 inline-block text-3xl text-custom-blue   " >{props.k.title}</a>
        </Link>
        <span className="  pl-2 pr-2 mt-2 mr-3 text-lg  float-right shadow-md ">{props.k.complain_type}</span>
       <div className='flex justify-between'> 
       <div className='flex'><span className='pl-4  text-sm block'>Ticket No : {props.k._id} </span>
        <p className="pl-4 text-sm">Complain Related: {props.k.complain_regarding}</p>
        <span className="pl-4 inline-block text-sm">Tuesday 18:20:22 IST</span></div> 
       <div> <span>Status : </span><span className="mr-3 inline-block text-yellow-400"> {props.k.status} </span></div>
        </div>
    </div>
    </div>
  )
}

export default Activecmpt
