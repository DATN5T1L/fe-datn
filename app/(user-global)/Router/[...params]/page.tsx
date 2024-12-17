'use client'
import { useState, useEffect, useCallback } from "react";
import HeaderLearning from "@app/(user-global)/component/router/headerLearning";
import Body from "../../component/globalControl/body";

const Router: React.FC<{ params: { slug: string } }> = ({ params }) => {
    const { slug } = params;
    const [routerData, setRouterData] = useState<Route | null>(null);

    const fetchData = useCallback(async () => {
        try {
            // Fetch ID route by slug
            const routeResponse = await fetch(`/api/slugById/${slug}/Route`);
            if (!routeResponse.ok) throw new Error(`API error: ${routeResponse.status}`);
            const routeResult = await routeResponse.json();

            const idRoute = routeResult.Route;

            // Fetch router details by ID
            const routerResponse = await fetch(`/api/routes/${idRoute}`);
            if (!routerResponse.ok) throw new Error(`API error: ${routerResponse.status}`);
            const routerResult = await routerResponse.json();
            setRouterData(routerResult.data);
        } catch (error: any) {
            console.error("Error fetching data:", error);
        }
    }, [slug]);

    useEffect(() => {
        if (slug) fetchData();
    }, [slug, fetchData]);

    return (
        <Body>
            {routerData && <HeaderLearning data={routerData} />}
        </Body>
    );
};

export default Router;
