import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { BiEdit } from "react-icons/bi"
import { AiFillDelete } from "react-icons/ai"
import { Table } from "antd"
import { Link } from "react-router-dom"
import { getBlogCategories } from '../features/bcategory/bcategorySlice'
const columns = [
    {
        title: "SNo",
        dataIndex: "key",
    },
    {
        title: "Name",
        dataIndex: "name",
        sorter:(a,b)=>a.name.length - b.name.lenght
    },
    {
        title:"Action",
        dataIndex:"action"
    }
];

const Blogcatlist = () => {
    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(getBlogCategories())
    },[])

    const bCategoryState=useSelector((state)=>state.bCategory.bCategories)

    const data1 = [];
    for (let i = 0; i < bCategoryState.length; i++) {
        data1.push({
            key: i,
            name: bCategoryState[i].title,
            action:(
                <>
                    <Link to="/" className="fs-3 text-secondary"><BiEdit/></Link>
                    <Link to="/"><AiFillDelete className='ms-3 fs-3 text-danger'/></Link>
                </>
            ),
        });
    }
    return (
        <div className="mt-4">
            <h3 className="mt-4 title">Blog Categories</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    )
}

export default Blogcatlist