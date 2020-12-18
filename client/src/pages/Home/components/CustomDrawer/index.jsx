import React, {useMemo} from 'react';
import {Drawer} from "antd";
import CreateAccount from "../form/CreateAccount";
import TopUp from "../form/TopUp";
import Transfer from "../form/Transfer";
import ChangeCurrency from "../form/ChangeCurrency";

const CustomDrawer = ({open, type, setOpen}) => {

    const forms = useMemo(()=>({
        create: <CreateAccount close={()=>setOpen(false)}/>,
        topup: <TopUp close={()=>setOpen(false)}/>,
        transfer: <Transfer close={()=>setOpen(false)}/>,
        change: <ChangeCurrency close={()=>setOpen(false)}/>,
    }),[])

    let form = forms.hasOwnProperty(type)?forms[type]:<></>;


    return (
        <Drawer
            title={type}
            placement="right"
            closable={false}
            onClose={()=>setOpen(false)}
            visible={open}
        >
            {form}
        </Drawer>
    );
};

export default CustomDrawer;