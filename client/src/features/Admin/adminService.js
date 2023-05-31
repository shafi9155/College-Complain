import axios from 'axios'
const API_URL='/api/admin/'

//Register User
const register=async(userData)=>{
    const response=await axios.post(API_URL+'createAdmin',userData)
    if(response.data){
       localStorage.setItem('admin',JSON.stringify(response.data))
    
    }
    return response.data;
}
const login=async(userData)=>{
    const response=await axios.post(API_URL+'Adminlogin',userData)
    console.log(response)
    if(response.data){
        localStorage.setItem('admin',JSON.stringify(response.data))
    }
    return response.data;
}
const logout=()=>{
    localStorage.removeItem('admin')
}
const authService={
    register,logout,login
}
export default authService
