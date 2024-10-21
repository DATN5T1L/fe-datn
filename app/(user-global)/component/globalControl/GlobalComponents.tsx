import ScrollToTop from "./scrollToTop";
import LeftSlider from "./leftSlider";
import ProfileDispatch from "../auth/user-component/profileDispatch";

const GlobalComponents: React.FC = () => {
    return (
        <>
            <ScrollToTop />
            <LeftSlider />
            <ProfileDispatch />
        </>
    );
};

export default GlobalComponents;
