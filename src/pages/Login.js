import React, { useEffect } from 'react'
import CustomInput from '../components/CustomInput'
//router
import { Link, useNavigate} from 'react-router-dom'
//form 
import {useFormik} from "formik"
import * as yup from "yup"
//action fonk
import { useDispatch, useSelector } from 'react-redux'
//reducer action
import {login} from "../features/auth/authSlice"
const Login = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  let schema=yup.object().shape({
    email:yup.string()
    .email("Email Shoul be valid")
    .required("Email is required"),

    password:yup.string()
    .required("Password is Required")
  })

  const formik = useFormik({
    initialValues:{
      email:"",
      password:""
    },
    validationSchema:schema,
    onSubmit:(values)=>{
      dispatch(login(values))
    }
  })

  const {user,isLaoding,isError,isSuccess,message}=useSelector((state)=>state.auth)

  useEffect(()=>{
    if(isSuccess){
      navigate("admin")
    }
    else{
      navigate("");
    }
  },[user,isLaoding,isError,isSuccess,message]);

  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-3">
        <h3 className="text-center title">Login</h3>
        <p className="text-center">Login to your account to continue</p>
        <div className='error text-center'>
          {
            message.message=="Rejected" ? "You are not an Admin" : ""
          }
        </div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput 
          type="text" 
          name="email" 
          label="Email Address" 
          id="email" 
          val={formik.values.email}
          onCh={formik.handleChange("email")}
          />
         <div className="error">
         {
            formik.touched.firstname && formik.errors.firstname ? 
            (<div>{formik.errors.firstname}</div>): null
           }
         </div>
          <CustomInput 
          type="password"
          name="password"
          label="Password"
          id="pass"
          val={formik.values.password}
          onCh={formik.handleChange("password")} />
          <div className='error'>
          {
            formik.touched.password && formik.errors.password ? 
            (<div>{formik.errors.password}</div>): null
           }
          </div>
          <div className='mb-3 text-end'>
            <Link to="/forgot-password">Forgot Password?</Link>
          </div>
          <button
          className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
          style={{background:"#ffd333"}}
          type='submit'
          >
            Login  
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login