import React,{useEffect} from 'react'
import Activecmpt from '../../components/Faculty/Activecmpt'
// import Singlecmpln from '../../components/Singlecmpln'
import FacultyNav from '../../components/FacultyNav'
import { useDispatch,useSelector } from 'react-redux';
import { getallactiveComplain } from '../../features/complain/complainSlice';

function Activecomplains() {
  const dispatch=useDispatch();
  const { staff}=useSelector((state)=>state.staff)

  
  
  useEffect(() =>{
   // console.log(data)
    dispatch(getallactiveComplain({Role:staff.Role}));
      //  dispatch(reset());
    
    }, [])
    const { allactiveComplain,isError,isLoading,message}=useSelector((state)=>state.complain)
  return (
    <div className="flex flex-col min-h-screen">
      <FacultyNav homeclr='dark:text-gray-400' newcpl="dark:text-gray-400" activecpl='dark:text-blue-400' closedcpl="dark:text-gray-400"/>

      <div className=' container mx-auto my-40 '>
      {allactiveComplain?allactiveComplain.map((k)=>(  <Activecmpt k={k}/>)):(<div className=' flex justify-center mt-80 text-2xl text-slate-400 text-center'> No Active Complaints Registered </div>)}

        </div>
        
      
    </div>
  )
}

export default Activecomplains
