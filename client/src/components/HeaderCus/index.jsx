import React, {useState} from 'react';
import {Layout, Menu} from "antd";

import {DesktopOutlined, FileOutlined, PieChartOutlined,} from '@ant-design/icons'
import {useDispatch, useSelector} from "react-redux";
import { getAuth } from "@redux/auth/selector";
import { API_ACTIONS as AUTH_ACTIONS } from "@redux/auth/action";
import {Link} from "react-router-dom";

const { Sider} = Layout;


const HeaderCus = () => {
    const dispatch = useDispatch()
    const { user:{isAdmin}, authorized } = useSelector(getAuth)
    const [collapsed, setCollapsed] = useState(false);


    const handlerLogOut = ()=>{
        dispatch( AUTH_ACTIONS.logOut( ) );
    }
    return (
        <>
            {
                authorized && <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
                    <div className="logo"/>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1" icon={<PieChartOutlined/>}>
                            <Link to="/">Dashboard</Link>
                        </Menu.Item>
                        <Menu.Item key="2" icon={<PieChartOutlined/>}>
                            <Link to="/transaction">Transaction</Link>
                        </Menu.Item>
                        {isAdmin && <Menu.Item key="3" icon={<DesktopOutlined/>}>
                            <Link to="/admin">Admin</Link>
                        </Menu.Item>}
                        <Menu.Item key="4" icon={<FileOutlined/>} onClick={handlerLogOut}>
                            LogOut
                        </Menu.Item>
                    </Menu>
                </Sider>
            }
            </>
    );
};

export default HeaderCus;