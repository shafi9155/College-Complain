import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import staffService from './staffService'
import {toast} from 'react-toastify';


const user=JSON.parse(localStorage.getItem('staff'));

const initialState={
    staff:user?user:null,
    Error:false,
    Success:false,
    Loading:false,
    msg:""
}
//Register user
export const registerstaff=createAsyncThunk('staff/register',async(user,thunkAPI)=>{
try{
    return await staffService.register(user)
}
catch(error){
    const message=(error.response && error.response.data && error.response.message)||error.message ||error.toString()
    return thunkAPI.rejectWithValue(message)

}

})
//login user
export const loginstaff=createAsyncThunk('staff/login',async(user,thunkAPI)=>{
    try{
        return await staffService.login(user)
    }
    catch(error){
        const message=(error.response && error.response.data && error.response.message)||error.message ||error.toString()
        toast.error("Wrong Credentials");
        return thunkAPI.rejectWithValue(message)
        console.log(error);
    }
    })

//Logout user
export const logoutstaff=createAsyncThunk('staff/logout', async()=>{
 await staffService.logout();
})

export const staffSlice=createSlice({
    name:'staff',
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
    .addCase(registerstaff.pending,(state)=>{
        state.Loading=true
    })
    .addCase(registerstaff.fulfilled,(state,action)=>{
        state.Loading=false
        state.Success=false
        state.staff=null
    })
    .addCase(registerstaff.rejected,(state,action)=>{
        state.Loading=false
        state.Error=true
        state.msg=action.payload
        state.staff=null
    })
    .addCase(loginstaff.pending,(state)=>{
        state.Loading=true
    })
    .addCase(loginstaff.fulfilled,(state,action)=>{
        state.Loading=false
        state.Success=false
        state.staff=action.payload
    })
    .addCase(loginstaff.rejected,(state,action)=>{
        state.Loading=false
        state.Error=true
        state.msg=action.payload
        state.staff=null
    })
    .addCase(logoutstaff.fulfilled,(state)=>{
        state.staff=null
    })
    }
})
export const {resetstaff}=staffSlice.actions
export default staffSlice.reducer