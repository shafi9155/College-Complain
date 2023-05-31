import axios from 'axios'
const API_URL='/api/staff/'

//Register User
const register=async(userData)=>{
    const response=await axios.post(API_URL+'createStaff',userData)
    if(response.data){
       localStorage.setItem('staff',JSON.stringify(response.data))
    
    }
    return response.data;
}
const login=async(userData)=>{
    const response=await axios.post(API_URL+'Stafflogin',userData)
    if(response.data){
        localStorage.setItem('staff',JSON.stringify(response.data))
    }
    return response.data;
}
const logout=()=>{
    localStorage.removeItem('staff')
}
const authService={
    register,logout,login
}
export default authService
