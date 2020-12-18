import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAccounts} from "@redux/auth/selector";
import {Button, Form, Input, InputNumber, Select} from "antd";
import {API_ACTIONS as AUTH_ACTIONS} from "@redux/auth/action";

const Transfer = ({close}) => {
    const dispatch = useDispatch()
    const accounts = useSelector(getAccounts)

    const submit = value => {
        close()
        dispatch(AUTH_ACTIONS.transfer(value));
    }

    return (
        <Form
            labelCol={{span: 4}}
            wrapperCol={{span: 14}}
            layout="horizontal"
            onFinish={submit}
        >
            <Form.Item label="Select number">
                <Form.Item
                    hasFeedback
                    label="fromNumber"
                    name="fromNumber"
                    rules={[
                        {
                            required: true,
                            message: "Please fromNumber!"
                        }
                    ]}
                >
                    <Select
                        placeholder="Select fromNumber"
                        options={accounts.map(({number}) => ({
                            label: number,
                            value: number
                        }))}
                    />
                </Form.Item>
            </Form.Item>
            <Form.Item
                label="toNumber"
                name="toNumber"
                rules={[
                    {
                        required: true,
                        message: "Please input toNumber",
                    },
                ]}
            >
                <Input />
            </Form.Item>
            <Form.Item name={"amount"} label="amount" rules={[
                {
                    required: true,
                    message: "Please amount!"
                }
            ]}>
                <InputNumber/>
            </Form.Item>
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
        </Form>
    );
};

export default Transfer;