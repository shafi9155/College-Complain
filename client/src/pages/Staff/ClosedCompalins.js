import React,{useEffect} from 'react'
import Closedcmpt from '../../components/Faculty/Closedcmpt'
import FacultyNav from '../../components/FacultyNav'
// import Trackorder from '../../components/Trackorder'

import { useDispatch,useSelector } from 'react-redux';
import { getallclosedComplain } from '../../features/complain/complainSlice';

function ClosedCompalins() {
  const dispatch=useDispatch();
  const { staff}=useSelector((state)=>state.staff)

  
  
  useEffect(() =>{
   // console.log(data)
    dispatch(getallclosedComplain({Role:staff.Role}));
      //  dispatch(reset());
     }, [])
    const { allclosedComplain,isError,isLoading,message}=useSelector((state)=>state.complain)
  return (
    <div className="flex flex-col min-h-screen">
      <FacultyNav homeclr='dark:text-gray-400' newcpl="dark:text-gray-400" activecpl='dark:text-gray-400' closedcpl="dark:text-blue-400"/>
      <div className=' container mx-auto my-40'>
      {allclosedComplain?allclosedComplain.map((k)=>( <Closedcmpt k={k} />)):(<div className=' flex justify-center mt-80 text-2xl text-slate-400 text-center'> No New Complaints Registered </div>)}
          
        </div>

    </div>
  )
}

export default ClosedCompalins
