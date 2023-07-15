import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { singleComplain } from "../features/complain/complainSlice";
import { useParams } from "react-router-dom";
import Trackcmp from "./Trackcmp";

function ComplaintDesc() {
  let [modalIsOpen, setmodalIsOpen] = useState("hidden");
   const [btndata,setbtndata]=useState("")
   const [buttonDisabled, setButtonDisabled] = useState(true);
  const [reqtime,setreqtime]=useState("");
 const [userData,setData] = useState();
 const [dropdown, setdropdown] = useState(false);

 const  toggledropdown = () =>{
  if(dropdown){
  setdropdown(false);
  }
  else{
    setdropdown(true);
  }
  console.log(dropdown)
 }

//  useEffect(()=>{
//   toggledropdown
//  },[dropdown])
  
  const handleModal = () => {
    setmodalIsOpen("hidden");
    if(btndata==="Close"){
      closeComplain();
    }
    else
    escalteCmpln();
  };
   
  const id = useParams();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(singleComplain(id));
  }, [id, dispatch]);
  const { SingleComplain } = useSelector((state) => state.complain);
  const { user } = useSelector((state) => state.auth);


  const getUser = async () => {
    // console.log(SingleComplain.user_id)
    const url = `http://localhost:5000/api/students/getStudent/${SingleComplain.user_id}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const res = await response.json();
    // console.log(res)
    setData(res);
   
  };

 useEffect(()=>{
  getUser()
 },[SingleComplain]);
 


  const { staff } = useSelector((state) => state.staff);

  useEffect(() => {
    if(SingleComplain){
   const l=SingleComplain.assigned.length;
   const lastAssigntime = SingleComplain.assigned[l-1].time;
   
   let date=new Date(lastAssigntime)
   
   let currentdate=new Date();
  const diff=currentdate-date;
  const milsec1day = 86400000
   const numDays = Math.floor((currentdate-date)/milsec1day);
  const datediff = new Date(date.getTime()+((7*milsec1day)));
      setreqtime(datediff)
    if (currentdate >= datediff) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
    if(staff && SingleComplain.assigned[l-1].assignedto!==null){
      setButtonDisabled(false);

    }
  }
  }, [SingleComplain]);
  if (!SingleComplain) {
  return <p>Loading...</p>;
  }
  if (!userData) {
    return <p>Loading...</p>;
    }

  const escalteCmpln = async () => {
   
    const url = `http://localhost:5000/api/complain//escalateComplain/${SingleComplain._id}`;

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ department: SingleComplain.complain_regarding }),
    });
    const res = await response.json();
   
  };
  const  closeComplain = async () => {
    
    const url = `http://localhost:5000/api/complain/closeComplain/${SingleComplain._id}`;
  
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    
    });
    const res = await response.json();
  
  };
  return (
    <div className="flex m-20">
      

      <div className="w-2/3  px-20 py-5 mb-20 bg-gray-200 rounded-lg ">
        <div>
          <div>
            


            <div className={`${modalIsOpen} model box-shadow`}>
              <div className="overlay"></div>

              <div
                id="popup-modal"
                tabindex="-1"
                className={`fixed flex justify-center items-center z-50  p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full`}
              >
                <div className="relative w-full h-full max-w-md md:h-auto">
                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-900">
                    <button
                      onClick={() => {
                        setmodalIsOpen("hidden");
                      }}
                      type="button"
                      className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                      data-modal-hide="popup-modal"
                    >
                      <svg
                        aria-hidden="true"
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                    <div className="p-6 text-center">
                      <svg
                        aria-hidden="true"
                        className="mx-auto mb-4 text-white-400 w-14 h-14 dark:text-gray-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                      </svg>
                      <h3 className="mb-5 text-lg font-normal text-white dark:text-white-400">
                        Are you sure you want to {btndata} this complaint?
                      </h3>

                      <button
                        onClick={handleModal}
                        data-modal-hide="popup-modal"
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
                      >
                        Yes, {btndata}
                      </button>

                      <button
                        onClick={() => {
                          setmodalIsOpen("hidden");
                          setbtndata("")
                        }}
                        data-modal-hide="popup-modal"
                        type="button"
                        className="text-white bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-800 dark:text-white dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-900 dark:focus:ring-gray-600"
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center relative">
            <div>
            <h1 className="text-4xl text-center m-10 p-3 text-custom-blue">
              {" "}
              {SingleComplain.title}
            </h1>
            </div>
            <div className="absolute right-0 top-10">
            <button  onClick={toggledropdown} data-dropdown-toggle="dropdown" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-9 py-3 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 " type="button"> Update Status <svg class="w-4 h-4 ml-2" aria-hidden="true" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path></svg></button>

<div i class={`z-10 ${dropdown?"hidden":""} bg-white divide-y divide-gray-100 rounded-lg shadow w-48 dark:bg-gray-400`}>
    <ul class="py-2 text-sm text-gray-700 dark:text-black" aria-labelledby="dropdownDefaultButton">
    <li>
      { (SingleComplain.status!=="Closed"  )?(<button disabled={buttonDisabled} 
         onClick={()=>{setmodalIsOpen('')
         setbtndata("esclate")
         }}
         title={`${staff?'First accept complaint and then escalte it':`You can esclate complain after ${reqtime}`}`}
          className={`block px-4 py-3 w-full hover:bg-gray-100 rounded-lg dark:hover:bg-gray-600 dark:hover:text-white ${buttonDisabled?'opacity-50 cursor-not-allowed':''}`}> Escalate Complain</button>):<>
             </>}
      </li>
      <hr></hr>
      <li>
      {!user && SingleComplain.status!=="Closed" ?(<button 
         onClick={()=>{setmodalIsOpen('')
         setbtndata("Close")
         }}
          className="block px-4 py-3  w-full rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"> Close Complain</button>):<></>}
      </li>
     
    </ul>
</div>
            </div>
            <div>
            {/* { (SingleComplain.status!=="Closed"  )?(<button disabled={buttonDisabled} 
         onClick={()=>{setmodalIsOpen('')
         setbtndata("esclate")
         }}
         title={`${staff?'First accept complaint and then escalte it':`You can esclate complain after ${reqtime}`}`}
          className={`bg-blue-700  mr-5 edt-btn mt-10 mb-10 text-white text-sm  p-4 rounded-lg ${buttonDisabled?'opacity-50 cursor-not-allowed':''}`}> Escalate Complain</button>):<>
             </>} */}
            {/* {!user && SingleComplain.status!=="Closed" ?(<button 
         onClick={()=>{setmodalIsOpen('')
         setbtndata("Close")
         }}
          className="bg-blue-700  mr-5 edt-btn mt-10 mb-10 text-white text-sm  p-4 rounded-lg"> Close Complain</button>):<></>} */}
            </div>
            

            
            
          </div>
          <p>Submitted By : {userData.name}</p>
          <p>Email : {userData.email}</p>
          <p>Enrollment No : {userData.enrollmentNo}</p>
          <p>Phone No : {userData.mobileNo}</p>

          <p className="pt-10 ">Description:</p>

          <p className=" pb-10 text-gray-500">{SingleComplain.desc}</p>
        </div>
        <p className="mb-3">Attachments:</p>

        <div className="m-10">
          <div>
            <img
              src="https://assets.telegraphindia.com/telegraph/07bhrWater.jpg"
              alt=""
            />
          </div>
          <div className="flex">
            <div className="w-1/4 m-2">
            <img className="h-72"
              src="https://images.hindustantimes.com/rf/image_size_640x362/HT/p2/2017/07/13/Pictures/_209512ce-67a0-11e7-ae46-9bfe7bf72e96.jpg"
              alt=""
            />
            </div>
            
            <div className="w-1/4 m-2">
            <img className=" h-72 "
              src="https://i.pinimg.com/originals/b4/55/d8/b455d81a204e80765021a641832b0b09.jpg"
              alt=""
            />
            </div>
            
          </div>
        </div>
      </div>

      <div className=" w-1/3 ">
        <Trackcmp assigned={SingleComplain.assigned} status={SingleComplain.status}/>
      </div>
    </div>
  );
}

export default ComplaintDesc;
