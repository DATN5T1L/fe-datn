import Body from "../component/globalControl/body";
import Infomation from "../component/auth/user-component/infomation";
import HeaderUser from "../component/auth/user-global/headerUser";
import Main from "../component/auth/user-global/main";
import MenuSetting from "../component/auth/user-global/menuSetting";


const InfoUser: React.FC = () => {
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