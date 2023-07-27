import React,{useEffect} from 'react'
import {useDispatch,useSelector} from "react-redux"
import {BiEdit} from "react-icons/bi"
import {AiFillDelete} from "react-icons/ai"
import {Table} from "antd"
import {Link} from "react-router-dom"
import { getEnquiries } from '../features/enquiry/enquirySlice'
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
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Comment",
      dataIndex: "comment",
    }, 
    {
      title: "Mobile",
      dataIndex: "mobile",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
   
    {
      title: "Action",
      dataIndex: "action",
    },
    
  ];
  
const Enquiries = () => {
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getEnquiries())
  },[])

  const enquiryState=useSelector((state)=>state.enquiry.enquiries)

  const data1 = [];
  for (let i = 0; i < enquiryState.length; i++) {
    data1.push({
      key: i,
      name: enquiryState[i].name,
      email: enquiryState[i].email,
      comment: enquiryState[i].comment,
      mobile: enquiryState[i].mobile,
      status:(
        <>
          <select name='' className='form-control form-select' id=''>
            <option value="">Set Status</option>
          </select>
        </>
      ),
      action:(
        <>
         
          <Link to="/"><AiFillDelete className='ms-3 fs-3 text-danger'/></Link>
        </>
      ) 
    });
  }
    return (
        <div className="mt-4">
            <h3 className="mt-4 title">Recent Reviews</h3>
            <div>
            <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    )
}

export default Enquiries