import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import authServices from "./authServices";

const getUserfromLocalStorage= localStorage.getItem("user")
?JSON.parse(localStorage.getItem("user"))
:null;

const initialState={
    user:getUserfromLocalStorage,
    orders:[],
    isError:false,
    isLoading:false,
    isSuccess:false,
    message:"",
}

export const login = createAsyncThunk(
    "auth/admin-login",
    async(user,thunkAPI)=>{
        try {
            return await authServices.login(user);
        } catch (error) {
            return thunkAPI.rejectWithValue(error);
        }
    }
)

export const getOrders=createAsyncThunk(
    "order/get-orders",
    async(thunkAPI)=>{
        try {
            return await authServices.getOrders()
        } catch (error) {
            thunkAPI.rejectedWithValue(error)
        }
    }
)

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducer:{},
    extraReducers:(builder)=>{
        builder
        //login
            .addCase(login.pending,(state)=>{
                state.isLoading=true;
            })
            .addCase(login.fulfilled,(state,action)=>{
                state.isLoading= false;
                state.isSuccess=true;
                state.user=action.payload;
            })
            .addCase(login.rejected,(state,action)=>{
                state.isLoading=false;
                state.isError=true;
                state.isSuccess=false;
                state.user=null;
            })
        //getOrders
            .addCase(getOrders.pending,(state)=>{
                state.isLoading=true;
            })
            .addCase(getOrders.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.isSuccess=true;
                state.isError=false;
                state.orders=action.payload;
            })
            .addCase(getOrders.rejected,(state,action)=>{
                state.isLoading=false;
                state.isSuccess=false;
                state.isError=true;
                state.message=action.error;
            })
    }
})

export default authSlice.reducer;