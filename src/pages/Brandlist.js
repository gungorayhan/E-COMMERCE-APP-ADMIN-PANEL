import React,{useEffect} from 'react'
import {useDispatch,useSelector} from "react-redux"
import { getBrands } from '../features/brand/brandSlice';
import {AiFillDelete} from "react-icons/ai"
import {BiEdit} from "react-icons/bi"
import {Link} from "react-router-dom"
import { Table } from "antd"
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
        title: "Action",
        dataIndex: "action",
    }
];

const Brandlist = () => {
    const dispatch=useDispatch()

    useEffect(()=>{
        dispatch(getBrands())
    },[])

    const brandState = useSelector((state)=>state.brand.brands)
    const data1 = [];
for (let i = 0; i < brandState.length; i++) {
    data1.push({
        key: i+1,
        title: brandState[i].title,
        action:(
            <>
            <Link to={`/admin/brand/${brandState[i]._id}`}
            className='fs-3 text-secondary'>
                <BiEdit />
            </Link>
            <Link to="/" className='ms-3 fs-3 text-danger'>
                <AiFillDelete />
            </Link>
            </>
        )
    });
}
    return (
        <div className="mt-4 title">
            <h3 className="mt-4">Brands</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    )
}

export default Brandlist