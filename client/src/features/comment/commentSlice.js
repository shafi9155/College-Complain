import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import  commentService from './commentService'

const initialState={
    data:null,
    comments:null,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:""
}
export const send=createAsyncThunk('comment/send',async(data,thunkAPI)=>{

    try{
    //     const token=thunkAPI.getState().auth.user.token
     
    //    const token1=thunkAPI.getState().staff.staff.token;
    //    console.log(token1)
    console.log(data)
        return await commentService.send(data)
    }
    catch(error){
        const message=(error.response && error.response.data && error.response.message)||error.message ||error.toString()
        return thunkAPI.rejectWithValue(message)
       
    }
      })
  //Get comment
        export const getallComment=createAsyncThunk('comment/get',async(id,thunkAPI)=>{

            try{
               // const token=thunkAPI.getState().auth.user.token
                return await commentService.getComment(id)
            }
            catch(error){
                const message=(error.response && error.response.data && error.response.message)||error.message ||error.toString()
                return thunkAPI.rejectWithValue(message)
            
            }
            })


      const commentSlice=createSlice({
        name:'comment',
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
        .addCase(send.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(send.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.data=action.payload
        })
        .addCase(send.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
            state.data=null
        })
        .addCase(getallComment.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getallComment.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            state.comments=action.payload
        })
        .addCase(getallComment.rejected,(state,action)=>{
            state.isLoading=false
            state.isError=true
            state.message=action.payload
            state.comments=null
        })
        }
    })

    export const {reset}=commentSlice.actions
export default commentSlice.reducer
      