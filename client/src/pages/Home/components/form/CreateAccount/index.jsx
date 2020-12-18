import React from 'react';
import {Button, Form, Select} from "antd";
import {useDispatch} from "react-redux";
import { API_ACTIONS as AUTH_ACTIONS } from "@redux/auth/action";

const currency = [ 'EUR', 'USD', 'BTC' ];
const typeAccount = [ 'credit', 'debit' ];


const CreateAccount = ({close}) => {
    const dispatch = useDispatch()

    const submit = value=>{
        close()
        dispatch( AUTH_ACTIONS.createAccount( value ) );
    }

    return (
        <Form
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            onFinish={submit}
        >
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
            <Form.Item label="typeAccount">
                <Form.Item
                    hasFeedback
                    label="typeAccount"
                    name="typeAccount"
                    rules={[
                        {
                            required: true,
                            message: "Please typeAccount"
                        }
                    ]}
                >
                    <Select
                        placeholder="typeAccount"
                        options={typeAccount.map( ( d ) => ( {
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

export default CreateAccount;