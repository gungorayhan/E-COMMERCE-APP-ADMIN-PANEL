import React,{useEffect} from 'react'
import {useDispatch,useSelector} from "react-redux"
import {Link} from "react-router-dom"

import { Table } from 'antd'
import {BiEdit} from "react-icons/bi"
import {AiFillDelete} from "react-icons/ai"
import { getCoupons } from '../features/coupon/couponSlice'

const columns=[
    {
        title:"SNo",
        dataIndex:"key"
    },
    {
        title:"Name",
        dataIndex:"name",
        sorter:(a,b)=>a.name.length-b.name.length
    },
    {
        title:"Discount",
        dataIndex:"discount",
        sorter:(a,b)=>a.discount.length-b.discount.length
    },
    {
        title:"Expiry",
        dataIndex:"expiry",
        sorter:(a,b)=>a.expiry.length-b.expiry.length
    },
    {
        title:"Action",
        dataIndex:"action",
    }
]


const Couponlist = () => {
    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(getCoupons())
    },[])

    const couponState=useSelector((state)=>state.coupon.coupons)

    const data1=[]
    for(let i=0; i<couponState.length;i++){
        data1.push({
            key:i+1,
            name:couponState[i].name,
            discount:couponState[i].discount,
            expiry: new Date(couponState[i].expiry).toLocaleString(),
            action: (
              <>
                <Link
                  to={`/admin/coupon/${couponState[i]._id}`}
                  className=" fs-3 text-secondary"
                >
                <BiEdit />
                </Link>
                <button
                  className="ms-3 fs-3 text-danger bg-transparent border-0"
                >
                  <AiFillDelete />
                </button>
              </>
            ),
        })
    }

  return (
    <div>
           <h3 className="mb-4 title">Coupons</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  )
}

export default Couponlist