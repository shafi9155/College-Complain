import React, { useState } from "react";
import {useSelector,useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import { register,reset } from "../features/auth/authSlice";
import { useEffect } from "react";
import CloseIcon from '@mui/icons-material/Close';

  function SignUp({closeSignup}) {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [enrollmentNo, setEnrollmentno] = useState("");
  const [mobileNo, setmobileNo] = useState();
  const [password, setPassword] = useState("");
  const [cpassword, setcPassword] = useState("");
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const {user,isLoading,isError,isSuccess,message}= useSelector(
    (state)=> state.auth )

   useEffect(() =>{
      if(isError){
        toast.error(message);
      }
     
      if(user || isSuccess){
    
       navigate("/");
      //  closeSignup();
      }
     dispatch(reset());

  }, [user ,isError,isSuccess,message,navigate,dispatch])
   
  
 const handleSubmit = (e)=>{
      e.preventDefault();
    if(password!==cpassword){
      toast.error('Passwords do not match')
    }
    else{
      const name=firstName+" "+lastName
      const studentData={
         name,email,enrollmentNo,mobileNo,password
      }
      dispatch(register(studentData));
        closeSignup();
     
    }
  }

  return (
    <div className="model box-shadow">
    <div className="overlay"></div>
     <div className=" modal-content"> 

      <form className="-mb-8 mx-5  text-left">
        <div className="flex justify-between">
          <div className="">
            <label htmlFor="firstName">
              <p className="para">First Name:</p>
              <input
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstname(e.target.value)}
                type="text"
                className="ipt"
              />
            </label>
          </div>
          <div className="">
            <label htmlFor="lastName">
              <p className="para">Last Name:</p>
              <input
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                className="ipt"
              />
            </label>
          </div>
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
          <label htmlFor="rollno">
            <p className="para">Enrollment No:</p>
            <input
              placeholder="LCS2020001"
              value={enrollmentNo}
              onChange={(e) => setEnrollmentno(e.target.value)}
              type="text"
              className="ipt"
            />
          </label>
        </div>
        <div>
          <label htmlFor="phone">
            <p className="para">Phone:</p>
            <input
              placeholder="6007686868"
              value={mobileNo}
              onChange={(e) => setmobileNo(e.target.value)}
              type="number"
              className="ipt"
            />
          </label>
        </div>
        <div>
          <label htmlFor="password">
            <p className="para">Password</p>
            <input
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="ipt"
            />
          </label>
        </div>
        <div>
          <label htmlFor="cpassword">
            <p className="para">Confirm Password</p>
            <input
              placeholder="Confirm Password"
              value={cpassword}
              onChange={(e) => setcPassword(e.target.value)}
              type="password"
              className="ipt"
            />
          </label>
        </div>
 <div className="mx-auto"> 
 <div className="flex justify-around ">
 <button onClick={handleSubmit} className="btn  container w-1/3 justify-center bg-gray-800 text-white mt-10 p-5 hover:bg-gray-900"> Sign Up</button>
 <button onClick={closeSignup} className="btn  container w-1/3 justify-center bg-gray-800 text-white mt-10 p-5 hover:bg-gray-900">Close</button>

 </div>
 <button onClick={closeSignup}  className="close-modal hover:text-red-500"><CloseIcon sx={{
         fontSize:"35px"
         
  }}/></button>
 </div>

    
      </form>
      </div>
    </div>
  );
}

export default SignUp;
