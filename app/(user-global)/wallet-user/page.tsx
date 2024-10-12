import Body from "../component/globalControl/body";
import Infomation from "../component/user-component/infomation";
import Wallet from "../component/user-component/wallet";
import HeaderUser from "../component/user-global/headerUser";
import Main from "../component/user-global/main";
import MenuSetting from "../component/user-global/menuSetting";


const WalletUser: React.FC = () => {
    return (
        <>
            <title>TTO - Ví người dùng</title>
            <meta name="description" content="Được tạo bởi Taem TTO" />
            <Body>
                <HeaderUser></HeaderUser>
                <Main>
                    <MenuSetting></MenuSetting>
                    <Wallet></Wallet>
                </Main>
            </Body>
        </>
    )
}

export default WalletUser;