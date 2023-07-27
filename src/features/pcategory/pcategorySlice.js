import {createSlice,createAsyncThunk, createAction} from "@reduxjs/toolkit"
import pCategoryService from "./pcategoryService"

export const getCategories =createAsyncThunk(
    "productCategory/get-categories",
    async(thunkAPI)=>{
        try {
            return await pCategoryService.getProductCategories();
        } catch (error) {
            thunkAPI.rejectedWithValue(error)
        }
    }
)

export const createCategory=createAsyncThunk(
    "productCategory/create-category",
    async(categoryData,thunkAPI)=>{
        try {
            return await pCategoryService.createCategory(categoryData)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)


export const resetState=createAction("Reset_all")

const initialState={
    pCategories:[],
    isLoading:false,
    isSuccess:false,
    isError:false,
    messsage:""
}

export const pCategorySlice=createSlice({
    name:"pCategories",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(getCategories.pending,(state)=>{
                state.isLoading=true;
            })
            .addCase(getCategories.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.isSuccess=true;
                state.isError=false;
                state.pCategories=action.payload;
            })
            .addCase(getCategories.rejected,(state,action)=>{
                state.isLoading=false;
                state.isSuccess=false;
                state.isError=true;
                state.messsage=action.error;
            })
            .addCase(createCategory.pending,(state)=>{
                state.isLoading=true;
            })
            .addCase(createCategory.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.isSuccess=true;
                state.isError=false;
                state.createdCategory=action.payload;
            })
            .addCase(createCategory.rejected,(state,action)=>{
                state.isLoading=false;
                state.isSuccess=false;
                state.isError=true;
                state.messsage=action.error;
            })

            .addCase(resetState,()=>initialState)
    }
})


export default pCategorySlice.reducer