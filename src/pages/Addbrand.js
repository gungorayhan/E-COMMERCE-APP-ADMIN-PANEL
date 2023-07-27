import React,{useEffect} from 'react'

import {createBrand, getABrand, resetState,updateABrand} from "../features/brand/brandSlice"

import CustomInput from '../components/CustomInput'

import { useDispatch,useSelector } from 'react-redux'
import { useNavigate,useLocation } from 'react-router-dom'

import {toast} from "react-toastify"

import * as yup from "yup"
import {useFormik} from "formik"


let schema =yup.object().shape({
    title:yup.string().required("Title isREquired")
})
const Addbrand = () => {
    
    const dispatch=useDispatch()
    const location=useLocation()

    const getBrandId=location.pathname.split("/")[3]
    const newBrand =useSelector((state)=>state.brand)
    const {isLoading,isSuccess,isError,createdBrand,brandName}=newBrand
    useEffect(()=>{
        if(getBrandId !==undefined){
            dispatch(getABrand(getBrandId))
            formik.values.title=brandName
        }
        else{
           dispatch(resetState())
        }
    },[getBrandId])
    useEffect(()=>{
        if(isSuccess && createdBrand){
            toast.success("Bran Added Successfully!")
        }
        if(isError){
            toast.error("Brand not add")
        }
    },[isLoading,isSuccess,isError,createdBrand])

    const formik=useFormik({
        initialValues:{
            title:"",
        },
        validationSchema:schema,
        onSubmit:(values)=>{
            if(getBrandId!==undefined){
                const data={id:getBrandId,brandData:values}
                dispatch(updateABrand(data))
            }
            else{
                dispatch(createBrand(values))
            }
            formik.resetForm()
            setTimeout(()=>{
                dispatch(resetState())
            },3000)
        }
    })

    return (
        <div>
            <h3 className="mb-4 title">{getBrandId!==undefined? "Edit":"Add"} Brand</h3>
            <div>
                <form action="" onSubmit={formik.handleSubmit}>
                    <CustomInput type="text" label="Enter Brand"
                    name="title"
                    onCh={formik.handleChange("title")}
                    onBl={formik.handleChange("title")}
                    val={formik.values.title}
                    lab="Enter Brand"
                     />
                     <div className="error">
                        {
                            formik.touched.title && formik.errors.title
                        }
                     </div>
                    <button className="btn btn-success border-0 rounded-3 my-5" type='submit'>
                        Add Brand
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Addbrand