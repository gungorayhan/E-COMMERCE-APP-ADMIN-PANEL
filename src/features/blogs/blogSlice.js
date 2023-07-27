import {createSlice,createAsyncThunk,createAction} from "@reduxjs/toolkit"
import blogService from "./blogService"

export const getBlogs = createAsyncThunk(
    "blog/get-blogs",
    async(thunkAPI)=>{
        try {
            return await blogService.getBlogs();
        } catch (error) {
            return thunkAPI.rejectedWithValue(error);
        }
    }
)

export const createBlog=createAsyncThunk(
    "blog/create-blog",
    async(blogData,thunkAPI)=>{
        try {
            return await blogService.createBlog(blogData)
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)
export const resetState=createAction("Reset_all")
const initialState={
    blogs:[],
    isLoading:false,
    isSuccess:false,
    isError:false,
    message:""
}

export const blogSlice=createSlice({
    name:"blog",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(getBlogs.pending,(state)=>{
                state.isLoading=true;
            })
            .addCase(getBlogs.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.isSuccess=true;
                state.isError=false;
                state.blogs=action.payload;
            })
            .addCase(getBlogs.rejected,(state,action)=>{
                state.isLoading=false;
                state.isSuccess=false;
                state.isError=true;
                state.message=action.payload;
            })
            .addCase(createBlog.pending,(state)=>{
                state.isLoading=true;
            })
            .addCase(createBlog.fulfilled,(state,action)=>{
                state.isLoading=false;
                state.isSuccess=true;
                state.isError=false;
                state.createdBlog=action.payload;
            })
            .addCase(createBlog.rejected,(state,action)=>{
                state.isLoading=false;
                state.isSuccess=false;
                state.isError=true;
                state.message=action.payload;
            })
            .addCase(resetState,()=>initialState)
    }
})

export default blogSlice.reducer