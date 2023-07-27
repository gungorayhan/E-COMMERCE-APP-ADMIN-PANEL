import React,{useEffect,useState} from 'react'
import {useDispatch,useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
import {toast} from "react-toastify"

import * as yup from "yup"
import {useFormik} from "formik"

import CustomInput from '../components/CustomInput'
import { createBlogCategory,resetState} from '../features/bcategory/bcategorySlice'

let schema=yup.object().shape({
  title:yup.string().required("CAtegory Name is Required")
})

const Addblogcat = () => {

  const dispatc=useDispatch()
  const navigate=useNavigate()
const newBlogCategory= useSelector((state)=>state.bCategory)
  const {isLoading,isSuccess,isError,createdBlogCategory} = newBlogCategory
  useEffect(()=>{
    if(isSuccess && createdBlogCategory){
      toast.success("Blog Category Added")
    }
    if(isError){
      toast.error("Something Went Wrong")
    }
  },[isLoading,isSuccess,isError])

  const formik=useFormik({
    initialValues:{
      title:""
    },
    validationSchema:schema,
    onSubmit:(values)=>{
      dispatc(createBlogCategory(values))
      formik.resetForm()
      setTimeout(()=>{
        dispatc(resetState())
      })
    }
  })


  return (
    <div>
        <h3 className="mb-4 title">Add Blog Category</h3>
        <div>
            <form action="" onSubmit={formik.handleSubmit}>
                <CustomInput 
                type="text" 
                label="Enter Blog Category"
                name="title"
                onCh={formik.handleChange("title")}
                onBl={formik.handleBlur("title")}
                val={formik.values.title}
                lab="Enter Blog Category"
                />
                <div className="error">
                  {
                    formik.touched.title && formik.errors.title
                  }
                </div>
                <button className="btn btn-success border-0 rounded-3 my-5" type='submit'>
                  Add Blog Category
                </button>
            </form>
        </div>
    </div>
  )
}

export default Addblogcat