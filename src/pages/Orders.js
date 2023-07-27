import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import { Table } from "antd"
import {Link} from "react-router-dom"

import { getOrders } from '../features/auth/authSlice';
const columns = [
    {
        title: "SNo",
        dataIndex: "key",
    },
    {
        title: "Name",
        dataIndex: "name",
    },
    {
        title: "Product",
        dataIndex: "product",
    },
    {
        title: "Amount",
        dataIndex: "amount",
    },
    {
        title: "Date",
        dataIndex: "date",
    },
    {
        title: "Action",
        dataIndex: "action",
    },
    
];

const Orders = () => {
    const dispatch=useDispatch();

    useEffect(()=>{
        dispatch(getOrders())
    },[])

    const orderState = useSelector((state)=>state.auth.orders)
    console.log(orderState)
   const data1 = [];
for (let i = 0; i < orderState.length; i++) {
    data1.push({
        key: i+1,
        name: orderState[i].orderby.firstname,
        product:orderState[i].products.map((i)=>{
            return(
                <ul>
                    <li>{i.product.title}</li>
               </ul>
            )
        }) ,
        amount:orderState[i].paymenIntent.amount,
        date:new Date(orderState[i].createdAt).toLocaleString(),
        action:(
            <>
                <Link to="/" className='fs-3 text-secondary'><BiEdit/></Link>
                <Link to="/" className='ms-3 fs-3 text-danger'><AiFillDelete/></Link>
            </>
        )
    });
}
    return (
        <div className="mt-4">
            <h3 className="mt-4 title">Orders</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    )
}

export default Orders