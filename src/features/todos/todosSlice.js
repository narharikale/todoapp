
import axios from 'axios' ; 

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
    data:[],
    sortByState:'ASCENDING',
    loading:'ideal',
    error :""
}

const getToDos = createAsyncThunk('todos/getToDos',
    async () => {       
        const response = await axios.get('https://jsonplaceholder.typicode.com/todos')
        return response ; 
    }
)



const todosSlice = createSlice({
    name:'todos',
    initialState,
    reducers : {
        sortBy:(state , action ) => {
            state.sortByState = action.payload
        }
    },
    extraReducers : {
        [getToDos.pending] : ( state ) => {
            state.loading = 'loading'
        }, 
        [getToDos.fulfilled] : ( state , { payload }) => {
            state.loading = 'success'
            state.data = payload.data
            state.error = "" 
        },
        [getToDos.rejected] : (state , { error }) => {
            state.loading = 'rejected'
            state.error = error.message
        }}

})

export const { sortBy } = todosSlice.actions 
export const todosReducer = todosSlice.reducer;
export { getToDos }