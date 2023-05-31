import React,{useState,useEffect} from 'react'
import  {useDispatch,useSelector} from 'react-redux'
import { useParams } from 'react-router-dom';
import { send,getallComment } from '../../features/comment/commentSlice';
function Chat() {

    const {SingleComplain}=useSelector((state)=>state.complain)
    const {staff}=useSelector((state)=>state.staff)
    const {user}=useSelector((state)=>state.auth)
    const [desc,setdesc]=useState("");
    const [shouldReload, setShouldReload] = useState(false);
    const complain_id=SingleComplain._id;

    const getDate = (time) => {
        const date = new Date(time);

        console.log(date.getDate());
        console.log(date.getDay());
        console.log(date.getTime());
        
        // const timestamp = {
        //     date : date.getDate(),
        //     day : date.getDay(),
        //     time : date.getTime()
        // }
        return date.toUTCString();
    }

    let name,Role;
    if(staff!==null){
        name=staff.name;
        Role=staff.Role
    }
    else{
        name=user.name;
        Role="User"
    }
    const data={
        desc,
        complain_id,
        name,Role
    }
    // console.log(data )
  
    const dispatch=useDispatch();
   const id=useParams();
 //  console.log(id)
   useEffect(() => {
        dispatch(getallComment(id.id))
      //  window.location.reload()
   },[shouldReload])
   
 
    const handleClick=async(e)=>{
       
        e.preventDefault();
         dispatch(send(data))
         setShouldReload(true)
       
    }
    const {comments}=useSelector((state)=>state.comments)
    if (!comments) {
        return <p>Loading...</p>
      }
      
     const getname=(n,role)=>{
             if(name===n){
                return "You"
             }
             if(role==="User"){
                return n;
             }
             return n+" ("+role+")";
     }
   
  return (
    <div className='m-5  mx-auto bg-gray-200 w-1/2'>
    <div className='container chat'>
      <div className='p-5 h-4/6 overflow-auto'>
      {comments?comments.map((c)=>(

        <div className='bg-gray-300 rounded-lg p-5 m-5'>

        <p className='text-blue-700'>{getname(c.name,c.role)}</p>
    <hr class="h-px mb-2 bg-gray-200 border-0 dark:bg-gray-700"/>
        <p>{c.desc}</p> 

       

        <p className='text-right text-sm pt-2'>  {getDate(c.createdAt)}</p>
        </div>
   )):  <><div>No complain </div></>}
   
       
      </div>
    <div>
    <form className='p-3 bg-gray-400 mb-2 h-2/6' >
   <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-white-700 dark:border-gray-600">
       <div className="px-4 py-2 bg-white rounded-t-lg dark:bg-white-800">
           <label htmlFor="comment" className="sr-only">Your comment</label>
           <textarea id="comment" onChange={(e) => setdesc(e.target.value)} rows="4"   className="w-full p-3 text-sm text-gray-900 bg-white border-0 dark:bg-white-800 focus:ring-0 dark:text-gray dark:placeholder-gray-400" placeholder="Write a comment..." required></textarea>
       </div>
      
  
       <div className="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600">
           <button type="submit" onClick={handleClick} className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
               Post comment
           </button>
           <div className="flex pl-0 space-x-1 sm:pl-2">
               
               <button type="button" className="inline-flex justify-center p-2 text-white-500 rounded cursor-pointer hover:text-white-900 hover:bg-gray-100 dark:text-white-400 dark:hover:text-white dark:hover:bg-white-600">
                   <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"></path></svg>
                   <span className="sr-only">Upload image</span>
               </button>
           </div>
       </div>
   </div>
</form>
    </div>


    </div>
    </div>
  )
}

export default Chat
