import axios from 'axios'
const API_URL='/api/complain/comments'


//Post Comment
const send=async(data)=>{
    // const config={
    //     headers:{
    //         Authorization:`Bearer ${token}`
    //     }
    // }
   // console.log(data);
    const response=await axios.post(API_URL+'/send',data)
  
    return response.data;
}

const getComment=async(id)=>{
    // const config={
    //     headers:{
    //         Authorization:`Bearer ${token}`
    //     }
    // }
    const response=await axios.get(API_URL+`/${id}`)
  
    return response.data;
}

const commentService={
   send,getComment
}
export default commentService