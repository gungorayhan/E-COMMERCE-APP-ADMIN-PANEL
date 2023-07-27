import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import customerServices from "./customersServices";

export const getUsers=createAsyncThunk(
    "customers/get-customers",
    async(thunkAPI)=>{
    try {
        return await customerServices.getUsers();
    } catch (error) {
        return thunkAPI.rejectWithValue(error)
    }
})

const initialState={
    customers:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:""
}

export const customersSlice=createSlice({
    name:'customers',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(getUsers.pending,(state)=>{
                state.isLoading=true;
            })
            .addCase(getUsers.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.isError=false;
                state.isSuccess=true;
                state.customers=action.payload;
            })
            .addCase(getUsers.rejected,(state,action)=>{
                state.isLoading=false;
                state.isError=true;
                state.isSuccess=false;
                state.message=action.error;
            })
    }
})

export default customersSlice.reducer