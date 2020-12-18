import React from 'react';
import { Typography } from 'antd';
import {useSelector} from "react-redux";
import {getPersonalData} from "@redux/auth/selector";

const { Title } = Typography;

const PersonalData = () => {

    const {email, fullName, isAdmin} = useSelector(getPersonalData)

    return (
        <div>
            <Title>Personal Data</Title>
            <Title level={4}>Email {email}</Title>
            <Title level={4}>Full Name {fullName}</Title>
            { isAdmin && <Title level={5}>Admin</Title>}

        </div>
    );
};

export default PersonalData;