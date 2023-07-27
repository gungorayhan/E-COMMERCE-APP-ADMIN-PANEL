import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { getCategories } from '../features/pcategory/pcategorySlice';
import { BiEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';

import {Link} from "react-router-dom"
import { Table } from "antd"
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
        title: "Action",
        dataIndex: "action",
    },
    
];

const Categorylist = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategories())
    }, [])

    const pCatState = useSelector((state) => state.pCategory.pCategories)

    const data1 = [];
    for (let i = 0; i < pCatState.length; i++) {
        data1.push({
            key: i+1,
            name: pCatState[i].title,
            action:(
                <>
                <Link to="/">
                    <BiEdit className='fs-3 text-secondary'/>
                </Link>
                <Link to="/">
                    <AiFillDelete className='ms-3 fs-3 text-danger'/>
                </Link>
                </>
            )
        });
    }
    return (
        <div className="mt-4">
            <h3 className="mt-4 title">Product Categories</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    )
}

export default Categorylist