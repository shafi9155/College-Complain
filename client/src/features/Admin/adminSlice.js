import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import adminService from './adminService'
import {toast} from 'react-toastify';

const user=JSON.parse(localStorage.getItem('admin'));

const initialState={
    admin:user?user:null,
    Error:false,
    Success:false,
    Loading:false,
    msg:""
}
//Register user
export const registeradmin=createAsyncThunk('admin/register',async(user,thunkAPI)=>{
try{
    return await adminService.register(user)
}
catch(error){
    const message=(error.response && error.response.data && error.response.message)||error.message ||error.toString()
    return thunkAPI.rejectWithValue(message)

}

})
//login user
export const loginadmin=createAsyncThunk('admin/login',async(user,thunkAPI)=>{
    try{
        return await adminService.login(user)
    }
    catch(error){
        const message=(error.response && error.response.data && error.response.message)||error.message ||error.toString()
        toast.error("Wrong Credentials");
        return thunkAPI.rejectWithValue(message)
        console.log(error);
    }
    })

//Logout user
export const logoutadmin=createAsyncThunk('admin/logout', async()=>{
 await adminService.logout();
})

export const adminSlice=createSlice({
    name:'admin',
    initialState,

    reducers:{
        reset:(state)=>{
            state.Loading=false
            state.Error=false
            state.Success=false
            state.msg=''
        },
    },
    extraReducers:(builders)=>{
    builders
    .addCase(registeradmin.pending,(state)=>{
        state.Loading=true
    })
    .addCase(registeradmin.fulfilled,(state,action)=>{
        state.Loading=false
        state.Success=false
        state.admin=null
    })
    .addCase(registeradmin.rejected,(state,action)=>{
        state.Loading=false
        state.Error=true
        state.msg=action.payload
        state.admin=null
    })
    .addCase(loginadmin.pending,(state)=>{
        state.Loading=true
    })
    .addCase(loginadmin.fulfilled,(state,action)=>{
        state.Loading=false
        state.Success=false
        state.admin=action.payload
    })
    .addCase(loginadmin.rejected,(state,action)=>{
        state.Loading=false
        state.Error=true
        state.msg=action.payload
        state.admin=null
    })
    .addCase(logoutadmin.fulfilled,(state)=>{
        state.admin=null
    })
    }
})
export const {resetadmin}=adminSlice.actions
export default adminSlice.reducer