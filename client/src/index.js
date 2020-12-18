import React from "react"
import ReactDOM from "react-dom"
import {Provider} from "react-redux"
import App from "@containers/AppContainer"
import store from '../src/redux/store'
import {HashRouter as Router} from "react-router-dom"
import 'antd/dist/antd.css';
import HeaderCus from "./components/HeaderCus";
import {Layout} from "antd";
import Container from "./components/Container";


const reduxStore = store()

ReactDOM.render(
    <Provider store={reduxStore}>
        <Router>
            <Layout>
                <HeaderCus/>
                <Container>
                    <App/>
                </Container>
            </Layout>
        </Router>
    </Provider>,
    document.getElementById("root")
)
