import React, { useEffect } from "react"
import PropTypes from "prop-types"
import {Link, useHistory} from "react-router-dom"
import { Button, Card, Form, Input, Row, Typography } from "antd"
import { passwordValidator } from "@utils"
import { useDispatch, useSelector } from "react-redux"
import css from "./styles.module.scss"
import { API_ACTIONS as AUTH_ACTIONS } from "@redux/auth/action";
import { getAuth } from "@redux/auth/selector";

const Auth = ({ isLogIn = true }) => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { loading, authorized } = useSelector(getAuth)
  const [form] = Form.useForm()

  useEffect(() => {
    if (authorized) {
      history.push("/")
    }
  }, [authorized, history])

  const onAuth = (values) => {
    if(isLogIn){
      dispatch( AUTH_ACTIONS.logIn( values ) );
    }else {
      dispatch( AUTH_ACTIONS.signUp( values ) );
    }
  }

  return (
    <div className={css.authView}>
      <Card className={css.authViewCard} bordered={false}>
        <div className={css.authForm}>
          <Typography.Title level={3} className={css.authFormHeader}>
              {isLogIn?"Login":"SignUp"}
          </Typography.Title>

          <Form form={form} onFinish={onAuth}>
              {
                  !isLogIn && (
                      <Form.Item
                          name="fullName"
                          rules={[
                              {
                                  required: true,
                                  message: "Please input your e-mail!",
                              },
                          ]}
                      >
                          <Input placeholder="Full name" />
                      </Form.Item>
                  )
              }
            <Form.Item
              name="email"
              rules={[
                {
                  type: "email",
                  message: "E-mail is not valid!",
                },
                {
                  required: true,
                  message: "Please input your e-mail!",
                },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: "Password is required!",
                },
                {
                  validator: passwordValidator(),
                },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>

            <div className={css.authFormFooter}>
              <Button block loading={loading} type="primary" htmlType="submit">
                Login
              </Button>
            </div>
          </Form>
          {
            isLogIn?(<Link to="/signup">Sign Up</Link>):(<Link to="/login">Log In</Link>)
          }
        </div>
      </Card>
    </div>
  )
}

Auth.propTypes = {
  isLogIn: PropTypes.bool,
}

export default Auth
