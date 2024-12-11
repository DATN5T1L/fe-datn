import Body from "../component/globalControl/body"
import CreateRouter from "../../giangvien/component/router/add/createRouter"


const CreateLearningPath: React.FC = () => {
    return (
        <>
            <title>TTO - Tạo lộ trình mới</title>
            <meta name="description" content="Được tạo bởi Taem TTO" />
            <Body>
                <CreateRouter></CreateRouter>
            </Body>
        </>
    )
}

export default CreateLearningPath;