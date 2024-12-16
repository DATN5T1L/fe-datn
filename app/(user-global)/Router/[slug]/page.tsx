'use client'
import { useState, useEffect } from "react";
import HeaderLearning from "@app/(user-global)/component/router/headerLearning"
import Body from "../../component/globalControl/body";

const Router: React.FC<{ params: { id: string } }> = ({ params }) => {

    const { id } = params
    const [idRoute, setIdRoute] = useState<string>("");
    const [router, setRouter] = useState<Route>()

    const fetchIdCourse = async (id: string) => {
        try {
            const response = await fetch(`/api/slugById/${id}/Route`);

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }
            const result = await response.json();
            console.log(result)
            setIdRoute(result.Route);
        } catch (error: any) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        if (idRoute !== "") fetchIdCourse(idRoute)
    }, [idRoute])

    useEffect(() => {
        if (id) fetchRouter(id)
    }, [id])

    const fetchRouter = async (id: string) => {
        try {
            const response = await fetch(`/api/routes/${id}`);

            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }
            const result = await response.json();
            console.log(result)
            setRouter(result.data);
        } catch (error: any) {
            console.error("Error fetching data:", error);
        }
    };

    return (
        <Body>

            {router && (<HeaderLearning data={router} />)}
        </Body>
    )
}

export default Router