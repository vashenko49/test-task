import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {getAccounts} from "@redux/auth/selector";
import {Button, Col, Row, Table} from "antd";
import CustomDrawer from "../CustomDrawer";

const columns = [
    {
        title: 'Number',
        dataIndex: 'number',
        key: 'number',
    },
    {
        title: 'Balance',
        dataIndex: 'balance',
        key: 'balance',
    },
    {
        title: 'Currency',
        dataIndex: 'currency',
    },
    {
        title: 'Account type',
        dataIndex: 'accountType',
        key: 'accountType',
    }
];


const Account = () => {
    const accounts = useSelector(getAccounts)
    const [open, setOpen] = useState(false)
    const [type, setType] = useState("create");

    const  handlerType = (type)=>{
        setType(type);
        setOpen(true);
    }

    return (
        <>
            <Row gutter={[16, 16]}>
                <Col span={6}>
                    <Button type="primary" danger onClick={()=>handlerType("create")}>
                        Create
                    </Button>
                </Col>
                <Col span={6}>
                    <Button type="primary" onClick={()=>handlerType("topup")}>
                        Top Up
                    </Button>
                </Col>
                <Col span={6}>
                    <Button type="primary" onClick={()=>handlerType("transfer")}>
                        Transfer
                    </Button>
                </Col>
                <Col span={6}>
                    <Button type="primary" onClick={()=>handlerType("change")}>
                        Change currency
                    </Button>
                </Col>
            </Row>
            <Table
                columns={columns}
                dataSource={accounts}
                bordered={true}
            />
            <CustomDrawer open={open} setOpen={setOpen} type={type}/>
        </>
    );
};

export default Account;