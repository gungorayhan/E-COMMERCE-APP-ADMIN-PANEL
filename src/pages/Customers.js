import React, { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Table } from "antd"
import { getUsers } from '../features/customers/customersSlice';
const columns = [
    {
        title: "SNo",
        dataIndex: "key",
    },
    {
        title: "Name",
        dataIndex: "name",
        sorter: (a, b) => a.name.lenght - b.name.lenght,
    },
    {
        title: "Email",
        dataIndex: "email",
    },
    {
        title: "Mobile",
        dataIndex: "mobile",
    },
];

const Customers = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsers());
    }, [])

    const customerstate = useSelector((state) => state.customer.customers)

    const data1 = [];

    for (let i = 0; i < customerstate.length; i++) {
        if (customerstate[i].role !== "Admin") {
            data1.push({
                key: i + 1,
                name: customerstate[i].firstname + " " + customerstate[i].lastname,
                email: customerstate[i].email,
                mobile: customerstate[i].mobile,
            });
        }
    
    }
    return (
        <div className="mt-4">
            <h3 className="mt-4 title">Customers</h3>
            <div>
                <Table columns={columns} dataSource={data1} />
            </div>
        </div>
    )
}

export default Customers