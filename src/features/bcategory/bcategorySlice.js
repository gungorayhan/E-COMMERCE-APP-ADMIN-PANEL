import {createSlice,createAsyncThunk, createAction} from "@reduxjs/toolkit"
import bCategoryService from "./bcategoryService"

export const getBlogCategories = createAsyncThunk(
    "blogCategory/get-categories",
    async(thunkAPI)=>{
        try {
            return bCategoryService.getBlogCategories();
        } catch (error) {
            return thunkAPI.rejectedWithValue(error)
        }
    }
)

export const createBlogCategory= createAsyncThunk(
    "blogCategory/create-blogCategory",
    async(blogcategoryData,thunkAPI)=>{
        try {
            return await bCategoryService.createBlogCategory(blogcategoryData)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)


export const resetState=createAction("Reset_all")

const initialState={
    bCategories:[],
    isLoading:false,
    isSuccess:false,
    isError:false,
    message:""
}

const bCategorySlice=createSlice({
    name:"bCategory",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(getBlogCategories.pending,(state)=>{
                state.isLoading=true
            })
            .addCase(getBlogCategories.fulfilled,(state,action)=>{
                state.isLoading=false
                state.isSuccess=true
                state.isError=false
                state.bCategories=action.payload
            })
            .addCase(getBlogCategories.rejected,(state,action)=>{
                state.isLoading=false
                state.isSuccess=false
                state.isError=true
                state.message=action.error
            })
            .addCase(createBlogCategory.pending,(state)=>{
                state.isLoading=true
            })
            .addCase(createBlogCategory.fulfilled,(state,action)=>{
                state.isLoading=false
                state.isSuccess=true
                state.isError=false
                state.createdBlogCategory=action.payload
            })
            .addCase(createBlogCategory.rejected,(state,action)=>{
                state.isLoading=false
                state.isSuccess=false
                state.isError=true
                state.message=action.error
            })

            .addCase(resetState,()=>initialState)
    }
})


export default bCategorySlice.reducer