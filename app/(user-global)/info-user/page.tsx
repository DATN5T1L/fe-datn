'use client'

import Body from "../component/globalControl/body";
import Infomation from "../component/auth/user-component/infomation";
import HeaderUser from "../component/auth/user-global/headerUser";
import Main from "../component/auth/user-global/main";
import MenuSetting from "../component/auth/user-global/menuSetting";
import { useEffect, useState } from "react";
import useCookie from "../component/hook/useCookie";
import { Spinner } from "react-bootstrap";


const InfoUser: React.FC = () => {
    const [isClient, setIsClient] = useState(false);
    const token = useCookie('token')

    useEffect(() => {
        if (token) {
            setIsClient(true);
        } else {
            setIsClient(false)
        }
    }, [token]);
    if (!isClient) {
        return <Spinner></Spinner>;
    }

    return (
        <>
            <title>TTO - Thông tin người dùng</title>
            <meta name="description" content="Được tạo bởi Taem TTO" />
            <Body>
                <HeaderUser></HeaderUser>
                <Main>
                    <MenuSetting></MenuSetting>
                    <Infomation></Infomation>
                </Main>
            </Body>
        </>
    )
}

export default InfoUser;