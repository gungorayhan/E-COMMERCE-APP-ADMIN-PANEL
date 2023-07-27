import {createSlice,createAsyncThunk,createAction} from "@reduxjs/toolkit"
import productServices from "./productServices"

export const getProduct = createAsyncThunk(
    "product/get-product",
    async(thunkAPI)=>{
        try {
            return await productServices.getProduct();
        } catch (error) {
            return thunkAPI.rejectedWithValue(error)
        }
    }
)

export const createProduct=createAsyncThunk(
    "product/create-products",
    async(productData,thunkAPI)=>{
        try {
            return await productServices.createProduct(productData);
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const resetState = createAction("Reset_all");


const initialState={
    products:[],
    isLoading:false,
    isSuccess:false,
    isErorr:false,
    message:""
}

export const productSlice=createSlice({
    name:"product",
    initialState,
    reduserc:{},
    extraReducers:(builder)=>{
        builder
            .addCase(getProduct.pending,(state)=>{
                state.isLoading=true;
                state.isSuccess=false;
                state.isErorr=false;
            })
            .addCase(getProduct.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.isSuccess=true;
                state.Error=false;
                state.products=action.payload;
            })
            .addCase(getProduct.rejected,(state,action)=>{
                state.isLoading=false;
                state.isSuccess=false;
                state.isErorr=true;
                state.message=action.error;
            })
            .addCase(createProduct.pending,(state)=>{
                state.isLoading=true;
                state.isSuccess=false;
                state.isErorr=false;
            })
            .addCase(createProduct.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.isSuccess=true;
                state.Error=false;
                state.createdProduct =action.payload;
            })
            .addCase(createProduct.rejected,(state,action)=>{
                state.isLoading=false;
                state.isSuccess=false;
                state.isErorr=true;
                state.message=action.error;
            })
            .addCase(resetState,()=>initialState)
    }
})

export default productSlice.reducer