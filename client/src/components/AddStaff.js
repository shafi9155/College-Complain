import React from 'react'
import { useState } from 'react';
import { registerstaff } from '../features/staff/staffSlice';
import { useDispatch } from 'react-redux';
import CloseIcon from '@mui/icons-material/Close';

function AddStaff({closeaddstaff}) {
  const options2 = ["Mess", "Hostel","Academics"];
    const [Name, setName] = useState("");
    const [department,setdepartment]=useState(options2[0]);
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setrole] = useState("");
    const StaffHierarchy={
      Mess: ["Mess Committee", "Mess Manager", "Assistant Registrar","Deputy Registrar", "Director"],
      Hostel: ["Hostel Committee","Assistant Warden", "Deputy Registrar","Director"],
      Academics: ["Faculty", "Head of Department", "Dean","Director"],
    }
      const dispatch=useDispatch();
     function handleSubmit(e){
      e.preventDefault();
      const name=Name;
      const mobileNo=phone
      dispatch(registerstaff({name,department,email,role,mobileNo}));
      alert("Staff added  Successfully");
    }
  return (
    <div className="model box-shadow ">
    <div className="overlay"></div>
    <div className=" modal-content flex mx-auto content-center justify-center ">
      <form className="text-left w-full px-10">
      <div >
            <label htmlFor="Name">
              <p className="para">Name:</p>
              <input
                placeholder="Name"
                value={Name}
                onChange={(e) => setName(e.target.value)}
                type="text"
                className="ipt"
              />
            </label>
          </div>
          <div className=" pb-2">
        <p className="para">Deparment:</p>
          <label htmlFor="select">
           
            <select className="w-full rounded-lg p-3 border-gray-500 border-2 " onChange={(e) => setdepartment(e.target.value)}  >
            {options2.map((value) => (
          <option value={value} key={value}>
            {value}
          </option>
         ))}
            </select>
          </label>
          </div>
          <div className=" pb-2">
        <p className="para">Role:</p>
          <label htmlFor="select">
           
            <select className="w-full rounded-lg p-3 border-gray-500 border-2 " onChange={(e) => setrole(e.target.value)}  >
            {StaffHierarchy[department].map((value) => (
          <option value={value} key={value}>
            {value}
          </option>
         ))}
            </select>
          </label>
          </div>
          <div>
          <label htmlFor="email">
            <p className="para">Email:</p>
            <input
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="ipt"
            />
          </label>
        </div>
        <div>
          <label htmlFor="phone">
            <p className="para">Phone:</p>
            <input
              placeholder="6007686868"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              type="number"
              className="ipt"
            />
          </label>
        </div>
       
        <button onClick={closeaddstaff} className="close-modal hover:text-red-500"><CloseIcon/></button>
        <div className="flex justify-around">
          <label htmlFor="submit">
            <button type="submit"  onClick={handleSubmit} className="btn hover:bg-gray-700 mt-8 py-3 px-6 text-white" >
            Add Staff</button>
          </label>
          <label htmlFor="submit">
            <input type="submit" value="Close" onClick={closeaddstaff} className="btn hover:bg-gray-700 mt-8 py-3 px-6 text-white" />
          </label>
        </div>
      </form>
    </div>
    </div>
    
  );
}



export default AddStaff