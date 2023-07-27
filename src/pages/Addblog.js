import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, Link } from "react-router-dom"
import CustomInput from '../components/CustomInput'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
//import { Stepper } from 'react-form-stepper'

import Dropzone from "react-dropzone"

import { uploadImg, delImg } from '../features/upload/uploadSlice'

import * as yup from "yup"
import { useFormik } from "formik"

import { toast } from "react-toastify"

import { createBlog, resetState } from '../features/blogs/blogSlice'
import { getBlogCategories } from '../features/bcategory/bcategorySlice'

let schema = yup.object().shape({
    title: yup.string().required("Title is Required"),
    description: yup.string().required("Description is Required"),
    category: yup.string().required("Category is Required")
})

const Addblog = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()


    useEffect(() => {
        dispatch(getBlogCategories())
    }, [])

    const imgState = useSelector((state) => state.upload.images)
    const bCatState = useSelector((state) => state.bCategory.bCategories)

    const blogState = useSelector((state)=>state.blog)
    const {isLoading,isSuccess,isError,createdBlog}=blogState

    useEffect(()=>{
        if(isLoading && createdBlog){
            toast.success("Blog Added!")
        }
        if(isError){
            toast.error("Something went wrong!")
        }
    },[isLoading,isSuccess,isError])

    const img = [];
    imgState.forEach((i) => {
        img.push({
            public_id: i.public_id,
            url: i.url
        })
    })

    useEffect(() => {
        formik.values.images = img
    }, [img])


    const formik = useFormik({
        initialValues: {
            title: "",
            description: "",
            category: "",
            images: ""
        },
        validationSchema: schema,
        onSubmit: (values) => {
            dispatch(createBlog(values))
            formik.resetForm()
            setTimeout(() => {
                dispatch(resetState())
            }, 3000)
        }
    })

    return (
        <div>
            <h3 className="mb-4 title">Add Blog</h3>
            {/* <Stepper
                steps={[{ label: "Add Blog Details" }, { label: "Upload Images" }, { label: "Finish" }]}
                activeStep={1}
            /> */}
            <div className=''>
                <form action="" onSubmit={formik.handleSubmit}>
                    {/* <Dragger {...props}>
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">Click or drag file to this area to upload</p>
                        <p className="ant-upload-hint">
                            Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                            banned files.
                        </p>
                    </Dragger> */}
                    <div className="mt-3">
                        <CustomInput
                            type="teext"
                            label="Enter Blog Title"
                            className="form-control"
                            name="title"
                            onCh={formik.handleChange("title")}
                            onBl={formik.handleBlur("title")}
                            val={formik.values.title}
                            lab="Enter Blog Title"
                        />
                    </div>
                    <div className="error">
                        {
                            formik.touched.title && formik.errors.title
                        }
                    </div>
                    <select
                        id=""
                        className='form-control py-3 mb-3 mt-3'
                        name="category"
                        onChange={formik.handleChange("category")}
                        onBlur={formik.handleBlur("category")}
                        value={formik.values.category}

                    >
                        <option value="">Select Blog Category</option>
                        {
                            bCatState.map((i, j) => {
                                return (
                                    <option key={j} value={i.title}>{i.title}</option>
                                )
                            })
                        }
                    </select>
                    <div className="error">
                        {
                            formik.touched.category && formik.errors.category
                        }
                    </div>
                    <ReactQuill
                        theme='snow'
                        value={formik.values.description}
                        onChange={formik.handleChange("description")}
                        name="description"
                        className='mt-3'
                    />

                    <div className="bg-white border-1 p-5 text-center mt-3">

                        <Dropzone onDrop={acceptedFiles => dispatch(uploadImg(acceptedFiles))}>
                            {({ getRootProps, getInputProps }) => (
                                <section>
                                    <div {...getRootProps()}>
                                        <input {...getInputProps()} />
                                        <p>Drag 'n' drop some files here, or click to select files</p>
                                    </div>
                                </section>
                            )}
                        </Dropzone>
                    </div>
                    <div className="showimages d-flex flex-wrap gap-3">
                        {
                            imgState?.map((i, j) => {
                                return (
                                    <div key={j} className='position-relative'>
                                        <button
                                            type='button'
                                            onClick={() => { dispatch(delImg(i.public_id)) }}
                                            className="btn-close position-absolute"
                                            style={{ top: "5px", right: "5px" }}
                                        ></button>
                                        <img src={i.url} alt="" width={200} height={200} />
                                    </div>
                                )
                            })
                        }
                    </div>
                    <button className="btn btn-success border-0 rounded-3 my-5" type='submit'>Add Blog</button>
                </form>
            </div>
        </div>
    )
}

export default Addblog

