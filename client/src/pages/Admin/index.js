import React from 'react';
import {useFetch} from "@hooks/useFetch";
import {URLS} from "@service/API";
import {Table} from "antd";

const columns = [
    {
        title: 'email',
        dataIndex: 'email',
        key: 'email',
    },
    {
        title: 'fullName',
        dataIndex: 'fullName',
        key: 'fullName',
    },
    {
        title: 'isAdmin',
        dataIndex: 'isAdmin',
        key: 'isAdmin',
        render: val => (val ? "Admin" : "No" ),
    },
];


const Admin = () => {
    const [{data, loading}] = useFetch({
        url: URLS.USER.ALL_USER,
        initData: []
    })

    return (
        <Table  dataSource={data} columns={columns} loading={loading} />
    );
};

export default Admin;