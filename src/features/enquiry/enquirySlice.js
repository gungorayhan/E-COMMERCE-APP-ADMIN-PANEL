import {createSlice,createAsyncThunk} from "@reduxjs/toolkit"
import enquiryService from "./enquiryService"

export const getEnquiries=createAsyncThunk(
    "enquiry/get-enquries",
    async(thunkAPI)=>{
        try {
            return await enquiryService.getEnquiries();
        } catch (error) {
            return thunkAPI.rejectedWithValue(error)
        }
    }
)

const initialState={
    enquiries:[],
    isLoading:false,
    isSuccess:false,
    isError:false,
    message:""
}

export const enquirySlice=createSlice({
    name:"enquiry",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(getEnquiries.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getEnquiries.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.isSuccess = true;
                state.enquiries = action.payload;
            })
            .addCase(getEnquiries.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.isSuccess = false;
                state.message = action.error;
            })
    }
})

export default enquirySlice.reducer