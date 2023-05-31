import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import  complainService from './complainService'

const initialState={
    data:null,
    publicComplain:null,
    allComplain:null,
    alluserComplain:null,
    SingleComplain:null,
    allnewComplain:null,
    allactiveComplain:null,
    allclosedComplain:null,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:""
}
//Register Complain
export const register=createAsyncThunk('complain/register',async(formData,thunkAPI)=>{

    try{
        const token=thunkAPI.getState().auth.user.token
        return await complainService.register(formData,token)
    }
    catch(error){
        const message=(error.response && error.response.data && error.response.message)||error.message ||error.toString()
        return thunkAPI.rejectWithValue(message)
       
    }
      })
      //Fetch Public Complain
export const fetchPublic=createAsyncThunk('complain/PublicComplain',async(data,thunkAPI)=>{
      try{
        return await complainService.fetchPublicComplain();
      }
      catch(error){
        const message=(error.response && error.response.data && error.response.message)||error.message ||error.toString()
        return thunkAPI.rejectWithValue(message)
      }
})
export const getAllUserComplain=createAsyncThunk('complain/',async(data,thunkAPI)=>{
    try{
        const token=thunkAPI.getState().auth.user.token
      return await complainService.getAllUserComplain(token);
    }
    catch(error){
      const message=(error.response && error.response.data && error.response.message)||error.message ||error.toString()
      return thunkAPI.rejectWithValue(message)
    }
})
export const getAllComplain=createAsyncThunk('complain/All',async(data,thunkAPI)=>{
    try{
       //    const token=thunkAPI.getState().auth.user.token
      return await complainService.getAllComplain();
    }
    catch(error){
      const message=(error.response && error.response.data && error.response.message)||error.message ||error.toString()
      return thunkAPI.rejectWithValue(message)
    }
})
export const singleComplain=createAsyncThunk('complain/Single',async(id,thunkAPI)=>{
    try{
      //  const token=thunkAPI.getState().auth.user.token
       //  console.log(id.id);
      return await complainService.getsingleComplain(id.id);
    }
    catch(error){
      const message=(error.response && error.response.data && error.response.message)||error.message ||error.toString()
      return thunkAPI.rejectWithValue(message)
    }
})
export const getallnewComplain=createAsyncThunk('complain/newComplain',async(data,thunkAPI)=>{
    try{
      //  const token=thunkAPI.getState().auth.user.token
       //  console.log(id.id);
    
      return await complainService.getallnewComplain(data);
    }
    catch(error){
      const message=(error.response && error.response.data && error.response.message)||error.message ||error.toString()
      return thunkAPI.rejectWithValue(message)
    }
})
export const getallclosedComplain=createAsyncThunk('complain/closedComplain',async(data,thunkAPI)=>{
    try{
      //  const token=thunkAPI.getState().auth.user.token
       //  console.log(id.id);
    
      return await complainService.getallclosedComplain(data);
    }
    catch(error){
      const message=(error.response && error.response.data && error.response.message)||error.message ||error.toString()
      return thunkAPI.rejectWithValue(message)
    }
})
export const getallactiveComplain=createAsyncThunk('complain/activeComplain',async(data,thunkAPI)=>{
    try{
      //  const token=thunkAPI.getState().auth.user.token
       //  console.log(id.id);
    
      return await complainService.getallactiveComplain(data);
    }
    catch(error){
      const message=(error.response && error.response.data && error.response.message)||error.message ||error.toString()
      return thunkAPI.rejectWithValue(message)
    }
})


      const complainSlice=createSlice({
        name:'complain',
        initialState,
    
        reducers:{
            reset:(state)=>{
                state.isLoading=false
                state.isError=false
                state.isSuccess=false
                state.message=''
            },
          
        },
        extraReducers:(builders)=>{
        builders
        .addCase(register.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(register.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.data=action.payload
        })
        .addCase(register.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
            state.data=null
        })
        .addCase(getallnewComplain.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getallnewComplain.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.allnewComplain=action.payload
        })
        .addCase(getallnewComplain.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
            state.allnewComplain=null
        })
        .addCase(getAllComplain.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getAllComplain.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.allComplain=action.payload
        })
        .addCase(getAllComplain.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
            state.allComplain=null
        })
        .addCase(fetchPublic.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(fetchPublic.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.publicComplain=action.payload
        })
        .addCase(fetchPublic.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
            state.publicComplain=null
        })
        .addCase(getAllUserComplain.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getAllUserComplain.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.alluserComplain=action.payload
        })
        .addCase(getAllUserComplain.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
            state.alluserComplain=null
        })
        .addCase(getallactiveComplain.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getallactiveComplain.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.allactiveComplain=action.payload
        })
        .addCase(getallactiveComplain.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
            state.allactiveComplain=null
        })
        .addCase(getallclosedComplain.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getallclosedComplain.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.allclosedComplain=action.payload
        })
        .addCase(getallclosedComplain.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
            state.allclosedComplain=null
        })
        .addCase(singleComplain.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(singleComplain.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
           state.SingleComplain=action.payload
        })
        .addCase(singleComplain.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
            state.SingleComplain=null
        })
        }
    })

    export const {reset}=complainSlice.actions
export default complainSlice.reducer
      