import Body from "../component/globalControl/body"
import Introduce from "../component/user-component/introduce"
import HeaderUser from "../component/user-global/headerUser"
import Main from "../component/user-global/main"
import MenuSetting from "../component/user-global/menuSetting"

const IntroUser: React.FC = () => {
    return (
        <>
            <title>TTO - Giới thiệu người dùng</title>
            <meta name="description" content="Được tạo bởi Taem TTO" />
            <Body>
                <HeaderUser></HeaderUser>
                <Main>
                    <MenuSetting></MenuSetting>
                    <Introduce></Introduce>
                </Main>
            </Body>
        </>
    )
}

export default IntroUser