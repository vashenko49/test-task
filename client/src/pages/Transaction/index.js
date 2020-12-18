import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {getAccounts} from "@redux/auth/selector";
import {Select, Table} from "antd";
import {useFetch} from "@hooks/useFetch";
import {URLS} from "@service/API";


const columns = [
    {
        title: 'description',
        dataIndex: 'description',
        key: 'description',
    },
    {
        title: 'transactionAmount',
        dataIndex: 'transactionAmount',
        key: 'transactionAmount',
    },
    {
        title: 'balance',
        dataIndex: 'balance',
        key: 'balance',
    },
];

const Transaction = () => {

    const [{data, loading}, getData] = useFetch({
        url: URLS.ACCOUNT.TRANSACTION,
        instant: false,
        initData: []
    })

    const [currentNumber, setCurrentNumber] = useState("")

    const accounts = useSelector(getAccounts)

    const handleNumber = v => {
        setCurrentNumber(v);
    }

    useEffect(() => {
        if (currentNumber.trim()) {
            getData({
                params: {
                    accountId: currentNumber
                }
            })
        }
    }, [currentNumber]);

    return (
        <div>
            <Select
                placeholder="Select number"
                onChange={handleNumber}
                options={accounts.map(({number, _id}) => ({
                    label: number,
                    value: _id
                }))}
            />

            {
                currentNumber.trim() && (
                    <Table dataSource={data} columns={columns} loading={loading} />
                )
            }
        </div>
    );
};

export default Transaction;