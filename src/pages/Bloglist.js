import React,{useEffect} from 'react'
import {useSelector,useDispatch} from "react-redux"
import {BiEdit} from "react-icons/bi"
import {AiFillDelete} from "react-icons/ai"
import { Table } from "antd"
import { getBlogs } from '../features/blogs/blogSlice';
import {Link} from "react-router-dom"
const columns = [
    {
        title: "SNo",
        dataIndex: "key",
    },
    {
        title: "Title",
        dataIndex: "title",
    },
    {
        title:"Category",
        dataIndex:"category"
    },
    {
        title: "Action",
        dataIndex: "action",
    },
    
];

const Bloglist = () => {

    const dispatch=useDispatch()
    useEffect(()=>{
        dispatch(getBlogs())
    },[])

    const blogState= useSelector((state)=>state.blog.blogs)

    const data1 = [];
for (let i = 0; i < blogState.length; i++) {
    data1.push({
        key: i+1,
        title: blogState[i].title,
        category: blogState[i].category,
        action:(
            <>
                <Link to={`/admin/brand/${blogState[i]._id}`} className="fs-3 text-secondary"><BiEdit/></Link>
                <Link to="/"><AiFillDelete className='ms-3 fs-3 text-danger'/></Link>
            </>
        ),
    });
}
    return (
        <div className="mt-4">
            <h3 className="mt-4 title">Blog List</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    )
}

export default Bloglist