import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import complainReducer from '../features/complain/complainSlice'
import commentsReducer from '../features/comment/commentSlice'
import staffReducer from '../features/staff/staffSlice'
import adminReducer from '../features/Admin/adminSlice'
export const store=configureStore({
    reducer:{
        auth:authReducer,
        complain:complainReducer,
        comments:commentsReducer,
        staff:staffReducer,
        admin:adminReducer
    }
})