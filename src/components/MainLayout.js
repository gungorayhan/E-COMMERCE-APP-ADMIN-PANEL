import React, { useState } from 'react';
//outlet
import { Outlet,Link } from 'react-router-dom';
//Icons
import {
    AiOutlineDashboard,
    AiOutlineShoppingCart,
    AiOutlineUser,
    AiOutlineBgColors,
    AiOutlinePicLeft,
    AiOutlinePicRight,
} from "react-icons/ai"
import { SiBrandfolder } from "react-icons/si"
import { BiCategoryAlt } from "react-icons/bi"
import { FaClipboardList, FaBloggerB } from "react-icons/fa"
import { ImBlog } from "react-icons/im"
import { IoIosNotifications } from "react-icons/io"
import {RiCouponLine} from "react-icons/ri"

import {ToastContainer} from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
//MainLayout
import {
    MenuFoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
    MenuUnfoldOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Header, Sider, Content } = Layout;



const MainLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const navigate = useNavigate();
    return (
        <Layout>
            <Sider trigger={null} collapsible collapsed={collapsed}>
                <div className="logo">
                    <h2 className='text-white fs-5 text-center py-3 mb-0'>
                        <span className='sm-logo'></span>
                        <span className='lg-logo'>Dev Corner</span>
                    </h2>
                </div>
                <Menu
                    theme="dark"
                    mode="inline"
                    defaultSelectedKeys={['']}
                    onClick={({ key }) => {
                        if (key == "signout") {

                        } else {
                            navigate(key)
                        }
                    }}
                    items={[
                        {
                            key: '',
                            icon: <AiOutlineDashboard className='fs-4' />,
                            label: 'Dashboard',
                        },
                        {
                            key: 'customers',
                            icon: <AiOutlineUser className='fs-4' />,
                            label: 'Customers',
                        },
                        {
                            key: 'Catalog',
                            icon: <AiOutlineShoppingCart className='fs-4' />,
                            label: 'Catalog',
                            children: [
                                {
                                    key: "product",
                                    icon: <AiOutlineShoppingCart className='fs-4' />,
                                    label: 'Product',
                                },
                                {
                                    key: "list-product",
                                    icon: <AiOutlineShoppingCart className='fs-4' />,
                                    label: 'Product List',
                                },
                                {
                                    key: "brand",
                                    icon: <SiBrandfolder className='fs-4' />,
                                    label: 'Brand',
                                },
                                {
                                    key: "list-brand",
                                    icon: <SiBrandfolder className='fs-4' />,
                                    label: 'Brand List',
                                },
                                {
                                    key: "category",
                                    icon: <BiCategoryAlt className='fs-4' />,
                                    label: 'Category',
                                },
                                {
                                    key: "list-category",
                                    icon: <BiCategoryAlt className='fs-4' />,
                                    label: 'Category List',
                                },
                                , {
                                    key: "color",
                                    icon: <AiOutlineBgColors className='fs-4' />,
                                    label: 'Color',
                                },
                                {
                                    key: "list-color",
                                    icon: <AiOutlineBgColors className='fs-4' />,
                                    label: 'Color List',
                                },
                            ]
                        },
                        {
                            key: "orders",
                            icon: <FaClipboardList className='fs-4' />,
                            label: 'Orders',
                        },
                        {
                            key: "marketing",
                            icon: <RiCouponLine className='fs-4' />,
                            label: 'Marketing',
                            children: [
                                {
                                    key: "coupon",
                                    icon: <ImBlog className='fs-4' />,
                                    label: 'Add Coupon',
                                },
                                {
                                    key: "coupon-list",
                                    icon: <RiCouponLine className='fs-4' />,
                                    label: 'Coupon List',
                                },
                            ]
                        },
                        {
                            key: "blogs",
                            icon: <FaBloggerB className='fs-4' />,
                            label: 'Blogs',
                            children: [
                                {
                                    key: "blogs",
                                    icon: <ImBlog className='fs-4' />,
                                    label: 'Add Blog',
                                },
                                {
                                    key: "blog-list",
                                    icon: <FaBloggerB className='fs-4' />,
                                    label: 'Blog List',
                                },
                                {
                                    key: "blog-category",
                                    icon: <ImBlog className='fs-4' />,
                                    label: 'Add Blog Category',
                                },
                                {
                                    key: "blog-category-list",
                                    icon: <FaBloggerB className='fs-4' />,
                                    label: 'Blog Category List',
                                }
                            ]
                        },
                        {
                            key: "enquiries",
                            icon: <FaClipboardList className='fs-4' />,
                            label: 'Enquiries',
                        }
                    ]}
                />
            </Sider>
            <Layout>
                <Header
                    className='d-flex justify-content-between ps-3 pe-5'
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <AiOutlinePicRight /> : <AiOutlinePicLeft />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                    <div className='d-flex gap-4 align-items-center dropdown'>
                        <div className='position-relative'>
                            <IoIosNotifications className='fs-4' />
                            <span className="badge bg-warning rounded-circle p-1 position-absolute">3</span>
                        </div>
                        <div className='d-flex gap-3 align-items-center'>
                            <div>
                                <img
                                    width={32}
                                    height={32}
                                    src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fgq.com.tr%2Fhayat-rehberi%2Fen-iyi-profil-fotografi-nasil-secilir&psig=AOvVaw3Jv3cd5SZSWoZoxkrqbPOT&ust=1684904816948000&source=images&cd=vfe&ved=0CA4QjRxqFwoTCOC5vtnViv8CFQAAAAAdAAAAABAD"
                                    alt="" />
                            </div>
                            <div
                                role='button'
                                id='dropdownMenuLink'
                                data-bs-toggle="dropdown"
                                aria-expanded="false">
                                <h5 className='mb-0'>Ayhan</h5>
                                <p className='mb-0'>a.g@gamial.com</p>
                            </div>
                            <div className="dropdown-menu" aria-labelledby='dropdownMenuLink'>
                                <li>
                                    <Link to="#" className='dropdown-item py-1 mb-1'
                                        style={{"height":"auto","lineHeight":"20px"}}
                                    >
                                        View Profile
                                    </Link>
                                </li>
                                <li>
                                    <Link to="#" className='dropdown-item py-1 mb-1'
                                        style={{"height":"auto","lineHeight":"20px"}}
                                    >
                                        Signout
                                    </Link>
                                </li>
                            </div>
                        </div>
                    </div>
                </Header>
                <Content
                    style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 280,
                        background: colorBgContainer,
                    }}
                >
                    <ToastContainer
                    position='top-right'
                    autoClose={250}
                    hideProgressBar={false}
                    newestOntop={true}
                    closeOnClick
                    rtl={false}
                    pouseOnFocusLoss
                    fraggable
                    pouseOnHover
                    theme="light"
                    />
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    );
};
export default MainLayout;