'use client'

import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import h from "./Router.module.css";
import Link from "next/link";
import RouterIndex from "./routerIndex";
import { usePathname } from "next/navigation";
import useCookie from "@/app/(user-global)/component/hook/useCookie";

interface Route {
    id: string;
    name_route: string;
    slug_route: string;
    img_route: string;
    discription_route: string;
    del_flag: boolean;
    created_at: string;
    updated_at: string;
}
interface RouteList {
    routes: Route[];
}

const RouterHeader: React.FC = () => {
    const pathname = usePathname()
    const token = useCookie('token');

    const [loading, setLoading] = useState<boolean>(true);
    const [routerData, setRouterData] = useState<RouteList | null>(null);
    const [statusFilter, setStatusFilter] = useState('');
    const [priceFilter, setPriceFilter] = useState('');
    const [discountFilter, setDiscountFilter] = useState('');

    useEffect(() => {
        if (token) {
            setLoading(true);
            fetch('/api/allRouterAdmin/', {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    setRouterData(data)
                    setLoading(false)
                })
                .catch(err => {
                    console.log(err)
                    setLoading(false);
                });
        }
    }, [token]);

    console.log(routerData);

    const filteredRouter = routerData?.routes.filter(router => {

        return true;
    });

    const handleReset = () => {
        setStatusFilter('')
        setPriceFilter('')
        setDiscountFilter('')
    }

    return (
        <>
            <div className={`${h.mainheader} d-flex flex-column `}>
                <div className="mx-4 mx-xs-2 mx-sm-3">
                    <div
                        className={`d-flex justify-content-between align-items-center my-4 flex-wrap`}
                    >
                        <div className="col-12 col-md-6">
                            <h2 className={h.heading}>Quản lý lộ trình</h2>
                        </div>
                        <div className={`${h.actions} d-flex`}>
                            <Link href="/giangvien/router/add">
                                <Button className={`${h.btnCTA}`}>Thêm lộ trình</Button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className={`${h.filter_bar} d-flex justify-content-between `}>

                    <div>
                        <InputGroup className={h.searchInputGroup}>
                            <input
                                type="text"
                                placeholder="Tìm kiếm lộ trình"
                                className={h.searchInput}
                            />
                            <div className={h.searchIconWrapper}>
                                <img
                                    src="/img_admin/search.svg"
                                    alt="Search"
                                    width={"24px"}
                                    height={"24px"}
                                />
                            </div>
                        </InputGroup>
                    </div>
                </div>
            </div>
            {routerData && <RouterIndex data={routerData.routes} />}
        </>
    );
};

export default RouterHeader