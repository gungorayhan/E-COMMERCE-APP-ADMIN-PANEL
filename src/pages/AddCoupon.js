import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import CustomInput from '../components/CustomInput'
import { createCoupon, resetState } from "../features/coupon/couponSlice"

import * as yup from "yup"
import { useFormik } from "formik"
import { toast } from "react-toastify"

let schema = yup.object().shape({
    name: yup.string().required("Title is Required"),
    expiry:yup.date().required("Expiry is Required"),
    discount:yup.number().required("Discount is Required ")
})
const AddCoupon = () => {
    const dispatch = useDispatch()

    const newCoupon = useSelector((state) => state.coupon)
    const { isLoading, isSuccess, isError, createdCoupon } = newCoupon

    useEffect(() => {
        if (isSuccess && createdCoupon) {
            toast.success("Coupon Added")
        }
        if (isError) {
            toast.error("Somethşng went wrong")
        }
    }, [isLoading, isSuccess, isError])

    const formik = useFormik({
        initialValues: {
            name: "",
            expiry:"",
            discount:""
        },
        validationSchema: schema,
        onSubmit: (values) => {
            //console.log(values)
            dispatch(createCoupon(values))
            formik.resetForm()
            setTimeout(() => {
                dispatch(resetState())
            }, 3000)
        }
    })

    return (
        <div>
            <h3 className="mb-4 title">Add Coupon</h3>
            <div>
                <form action="" onSubmit={formik.handleSubmit}>
                    <CustomInput
                        type="text"
                        label="Enter Coupon"
                        name="name"
                        onCh={formik.handleChange("name")}
                        onBl={formik.handleBlur("name")}
                        val={formik.values.name}
                        id="name"
                    />
                    <div className="error">
                        {
                            formik.touched.name && formik.errors.name
                        }
                    </div>
                    <CustomInput
                        type="date"
                        label="Enter Date"
                        name="expiry"
                        onCh={formik.handleChange("expiry")}
                        onBl={formik.handleBlur("expiry")}
                        val={formik.values.expiry}
                        id="date"
                    />
                    <div className="error">
                        {
                            formik.touched.expiry && formik.errors.expiry
                        }
                    </div>
                    <CustomInput
                        type="number"
                        label="Enter Discount"
                        name="discount"
                        onCh={formik.handleChange("discount")}
                        onBl={formik.handleBlur("discount")}
                        val={formik.values.discount}
                        id="discount"
                    />
                    <div className="error">
                        {
                            formik.touched.discount && formik.errors.discount
                        }
                    </div>
                    <button className="btn btn-success border-0 rounded-3 my-5" type='submit'>
                        Add Coupon
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddCoupon