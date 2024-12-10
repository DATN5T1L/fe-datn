import Body from "@app/(user-global)/component/globalControl/body"
import CreateRouter from "@/app/giangvien/component/router/add/createRouter"


const CreateLearningPath: React.FC = () => {
    return (
        <>
            <title>TTO - Tạo lộ trình mới</title>
            <meta name="description" content="Được tạo bởi Taem TTO" />
            <div style={{marginBottom:'100px'}}>
                <Body>
                    <CreateRouter></CreateRouter>
                </Body>
            </div>
        </>
    )
}

export default CreateLearningPath