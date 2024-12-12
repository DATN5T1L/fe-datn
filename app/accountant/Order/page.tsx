"use client"
import style from "@/app/admin/component/Dashboard/Chart.module.css";
import TotalHeader from "../component/TotalHeader";
import Transition from './Transiton'
const Order = () => {

    return (

        <div className={style.mar}>
            <TotalHeader />
            <Transition />
        </div>
    )
}
export default Order;