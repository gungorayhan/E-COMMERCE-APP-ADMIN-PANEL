import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"

import * as yup from "yup"
import {useFormik, validateYupSchema} from "formik"

import { toast } from 'react-toastify'

import CustomInput from '../components/CustomInput'

import { createCategory } from '../features/pcategory/pcategorySlice'

let schema=yup.object().shape({
  title:yup.string().required("Category is Reguired")
})
const Addcat = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const newCategory= useSelector((state)=>state.pCategory)
  const {isSuccess,isLoading,isError,createdCategory}=newCategory

  useEffect(()=>{
    if(isSuccess && createdCategory){
      toast.success("Categroy Added Successfully!")
    }
    if(isError){
      toast.error("Something Went Wrong")
    }
  },[isSuccess,isLoading,isError])

  const formik=useFormik({
    initialValues:{
      title:""
    },
    validationSchema:schema,
    onSubmit:(values)=>{
      dispatch(createCategory(values))
      formik.resetForm()
      setTimeout(()=>{
        navigate("/admin/list-category")
      },3000)
    }
  })

  

  return (
    <div>
    <h3 className="mb-4 title">Add Category</h3>
    <div>
        <form action="" onSubmit={formik.handleSubmit}>
            <CustomInput 
            type="text" 
            label="Enter Category"
            name="title"
            onCh={formik.handleChange("title")}
            onBl={formik.handleBlur("title")}
            val={formik.values.title}
            lab="Enter Category"
            />
            <div className="error">
              {
                formik.touched.title && formik.errors.title
              }
            </div>
            <button className="btn btn-success border-0 rounded-3 my-5" type='submit'>
                Add Category
            </button>
        </form>
    </div>
</div>
  )
}

export default Addcat