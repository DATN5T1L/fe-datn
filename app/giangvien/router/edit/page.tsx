'use client'

import Body from "@app/(user-global)/component/globalControl/body"
import EditRouter from "@/app/giangvien/component/router/edit/editRouter"
import { useSearchParams } from "next/navigation"


const CreateLearningPath: React.FC = () => {
    const searchPamam = useSearchParams()
    const id = searchPamam.get('id')

    return (
        <>
            <title>TTO - Sửa lộ trình </title>
            <meta name="description" content="Được tạo bởi Taem TTO" />
            <div style={{ marginBottom: '100px' }}>
                <Body>
                    {id && (
                        <EditRouter id={id}></EditRouter>
                    )}
                </Body>
            </div>
        </>
    )
}

export default CreateLearningPath