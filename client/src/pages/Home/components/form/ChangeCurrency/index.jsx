import React from 'react';
import {Button, Form, Select} from "antd";
import {useDispatch, useSelector} from "react-redux";
import { API_ACTIONS as AUTH_ACTIONS } from "@redux/auth/action";
import {getAccounts} from "@redux/auth/selector";

const currency = [ 'EUR', 'USD', 'BTC' ];

const ChangeCurrency = () => {
    const dispatch = useDispatch()
    const accounts = useSelector(getAccounts)

    const submit = value=>{
        close()
        dispatch( AUTH_ACTIONS.changecurrency( value ) );
    }
    return (
        <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            onFinish={submit}
        >
            <Form.Item label="Select number">
                <Form.Item
                    hasFeedback
                    label="number"
                    name="number"
                    rules={[
                        {
                            required: true,
                            message: "Please number!"
                        }
                    ]}
                >
                    <Select
                        placeholder="Select number"
                        options={accounts.map(({number}) => ({
                            label: number,
                            value: number
                        }))}
                    />
                </Form.Item>
            </Form.Item>
            <Form.Item label="Select currency">
                <Form.Item
                    hasFeedback
                    label="currency"
                    name="currency"
                    rules={[
                        {
                            required: true,
                            message: "Please currency!"
                        }
                    ]}
                >
                    <Select
                        placeholder="Select team"
                        options={currency.map( ( d ) => ( {
                            label: d,
                            value: d
                        } ) )}
                    />
                </Form.Item>
            </Form.Item>
            <Button type="primary" htmlType="submit">
                Submit
            </Button>
        </Form>
    );
};

export default ChangeCurrency;