import React,{useState,useEffect} from 'react'
import {useDispatch,useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"

import { createColor, resetState } from '../features/color/colorSlice'
import CustomInput from '../components/CustomInput'

import * as yup from "yup"
import {useFormik, validateYupSchema} from "formik"

import { toast } from 'react-toastify'

let schema=yup.object().shape({
  title:yup.string().required("Title is Required")
})

const Addcolor = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()

  const newColor = useSelector((state)=>state.color)
  const {isLoading,isSuccess,isError,createdColor} = newColor

  useEffect(()=>{
    if(isSuccess && createdColor){
      toast.success("Color Added SuccessFullyy!")
    }
    if(isError){
      toast.error("Went Wrong!")
    }
  },[isSuccess,isLoading,isError])

  const formik = useFormik({
    initialValues:{
      title:""
    },
    validationSchema:schema,
    onSubmit:(values)=>{
      dispatch(createColor(values))
      formik.resetForm()
      setTimeout(()=>{
        dispatch(resetState())
      },3000)
    }
  })

  return (
    <div>
        <h3 className="mb-4 title">Add Color</h3>
        <div>
            <form action="" onSubmit={formik.handleSubmit}>
                <CustomInput 
                type="color" 
                label="Enter Color"
                name="title"
                onCh={formik.handleChange("title")}
                onBl={formik.handleBlur("title")}
                val={formik.values.title}
                lab="Enter Color"
                />
                <button className="btn btn-success border-0 rounded-3 my-5" type='submit'>
                    Add Color
                </button>
            </form>
        </div>
    </div>
  )
}

export default Addcolor