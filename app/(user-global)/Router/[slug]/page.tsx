import { useState, useEffect } from "react";

const Router: React.FC<{ params: { id: string } }> = ({ params }) => {

    const { id } = params
    const [idRoute, setIdRoute] = useState<string>("");

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
        if (id) fetchIdCourse(id)
    }, [id])

    return (
        <>Trang lộ trình</>
    )
}

export default Router