import {createAction,createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import couponService from "./couponService"

export const getCoupons=createAsyncThunk(
    "coupon/get-coupons",
    async(thunkAPI)=>{
        try {
            return await couponService.getCoupons()
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const createCoupon=createAsyncThunk(
    "coupon/create-coupon",
    async(couponData,thunkAPI)=>{
        try {
            return await couponService.createCoupon(couponData)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)


export const resetState=createAction("Reset_all")

const initialState={
    coupons:[],
    isLoading:false,
    isSuccess:false,
    isError:false,
    message:""
}

export const couponSlice=createSlice({
    name:"coupon",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(getCoupons.pending,(state)=>{
                state.isLoading=true
            })
            .addCase(getCoupons.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.isSuccess=false;
                state.isError=false;
                state.coupons=action.payload;
            })
            .addCase(getCoupons.rejected,(state,action)=>{
                state.isLoading=false;
                state.isSuccess=false;
                state.isError=true;
                state.message=action.error;
            })

            .addCase(createCoupon.pending,(state)=>{
                state.isLoading=true
            })
            .addCase(createCoupon.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.isSuccess=true;
                state.isError=false;
                state.createdCoupon=action.payload;
            })
            .addCase(createCoupon.rejected,(state,action)=>{
                state.isLoading=false;
                state.isSuccess=false;
                state.isError=true;
                state.message=action.error;
            })

            .addCase(resetState,()=>initialState)
    }
})

export default couponSlice.reducer