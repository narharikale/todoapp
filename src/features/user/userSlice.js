
import axios from 'axios' ; 

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    data:{},
    loading:'ideal',
    error :""
}

const getUser = createAsyncThunk('user/getUser',
    async ({ userId }) => {
        const { data } = await axios.get(`https://jsonplaceholder.typicode.com/users/${userId}`)
        return data ; 
    }
)



const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        combineUserTodoData : (state , action ) => {
            state.data = { ...state.data , ...action.payload}
        }
    },
    extraReducers : {
        [getUser.pending] : ( state ) => {
            state.loading = 'loading'
        }, 
        [getUser.fulfilled] : ( state , { payload }) => {
            state.loading = 'success'
            state.data = {...state.data , ...payload}
            state.error ="" 
        },
        [getUser.rejected] : (state , { error }) => {
            state.loading = 'rejected'
            state.error = error.message
        }}
    })

export const { combineUserTodoData } = userSlice.actions
export const userReducer = userSlice.reducer;
export { getUser };
