import {configureStore} from "@reduxjs/toolkit"

//reducer
import authReducer from "../features/auth/authSlice"
import customersReducer from "../features/customers/customersSlice"
import productReducer from "../features/product/productSlice"
import brandReducer from "../features/brand/brandSlice"
import pCategoryReducer from "../features/pcategory/pcategorySlice"
import blogReducer from "../features/blogs/blogSlice"
import bCategoryReducer from "../features/bcategory/bcategorySlice"
import colorReducer from "../features/color/colorSlice"
import enquiryReducer from "../features/enquiry/enquirySlice"
import uploadReducer from "../features/upload/uploadSlice"
import couponReducer from "../features/coupon/couponSlice"


export const store=configureStore({
    reducer:{
        auth:authReducer,
        customer:customersReducer,
        product:productReducer,
        brand:brandReducer,
        pCategory: pCategoryReducer,
        blog:blogReducer,
        bCategory:bCategoryReducer,
        color:colorReducer,
        enquiry:enquiryReducer,
        upload:uploadReducer,
        coupon:couponReducer
    }
})