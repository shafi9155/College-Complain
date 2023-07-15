import React,{useState,useEffect} from 'react'
import AdminNav from './AdminNav'
import AddIcon from '@mui/icons-material/Add';
import AddStaff from './AddStaff';

function AdminStaff() {
    let [modalIsOpen, setmodalIsOpen] = useState("hidden");
    const [showaddstaff,setshowAddstaff]=useState(false);
    const [userData,setData] = useState();
    const handleModal = () => {
        setmodalIsOpen("hidden");
       };
  const getStaff = async () => {
    // console.log(SingleComplain.user_id)
    const url = "http://localhost:5000/api/staff/getallStaffData";

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    });
    const res = await response.json();
  
    setData(res);
   
  };
  const deleteuser = async () => {
    // console.log(SingleComplain.user_id)
    const url = "http://localhost:5000/api/staff/getallStaffData";

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
  getStaff()
 },[userData,deleteuser]);

    function handleclick(){
    setshowAddstaff(!showaddstaff)
      }
      function closeaddstaff(){
        setshowAddstaff(false)
      }
  return (
    <div className='min-h-screen'>      
 <AdminNav/>
 
<div className="container flex flex-col mx-auto  ">
<div className='ml-auto justify-self-end'>
  <button onClick= {handleclick} className='bg-custom-blue  mr-10 edt-btn mt-36 mb-10 text-white text-sm  p-4 rounded-lg'>Add Staff<AddIcon/></button>
</div>


<div className='rounded-lg'>
    <table className="w-full  mx-auto text-m text-left text-gray-500  dark:text-gray-400">
        <thead className="text-l text-white uppercase  dark:bg-gray-700 dark:text-gray-400 mt-60">
            <tr>
            <th scope="col" className="px-6 py-3">
                TicketNo
                </th>
                <th scope="col" className="px-6 py-3">
                Name
                </th>
                <th scope="col" className="px-6 py-3">
                Email
                </th>
                <th scope="col" className="px-6 py-3">
                Mobile Number
                </th>
                <th scope="col" className="px-6 py-3">
                Role
                </th>
                <th scope="col" className="px-6 py-3">
                Action
                </th>
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
                    {k.email}
                </td>
                <td className="px-6 py-4">
                {k.mobileNo}
                </td>
                <td className="px-6 py-4">
                {k.role}
                </td>
                <td className='pt-4 pb-4 p-4 text-md '><button onClick={deleteuser} className='focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900'>Delete</button></td>
       
            </tr>
        )):<></>}
       </tbody>
       
    </table>
    </div>
</div>
 {showaddstaff && <AddStaff closeaddstaff={closeaddstaff}/>}
</div> 
  )
}

export default AdminStaff