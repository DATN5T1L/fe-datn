import { Card } from "react-bootstrap"
import h from "./course.module.css";
import Link from "next/link";
import { IconDetailPlus } from '@app/(user-global)/component/icon/icons'
import { calculateTimeAgo } from "@app/(user-global)/component/globalControl/commonC"
const CouresCardAccountant: React.FC<Payment> = ({ amount, created_at, del_flag, enrollment_id, id, payment_discription, payment_method, status, updated_at }) => {
    let statusAc: string = "";
    let timePayment: string = calculateTimeAgo(created_at);
    switch (status) {
        case "completed":
            statusAc = "Thanh toán đã hoàn tất.";
            break;
        case "pending":
            statusAc = "Thanh toán đang chờ xử lý.";
            break;
        case "failed":
            statusAc = "Thanh toán thất bại.";
            break;
        default:
            statusAc = "Trạng thái không xác định.";
    }
    return (
        <tr key={id}>
            <td>
                Thanh toán {payment_method}
            </td>
            <td>{payment_discription}</td>
            <td>{amount}</td>
            <td>{timePayment}</td>
            <td>
                <span className={h.active_text}>{statusAc}</span>
            </td>
            <td className={h.option_button_group}>
                <div
                    className={`justify-content-between border d-flex py-2 rounded`}
                >
                    <Link href="/accountant/CoursePage/RecentPurchaseCourse" className="w-50 border-end">
                        <IconDetailPlus />
                    </Link>

                </div>
            </td>
        </tr>
    )
}

export default CouresCardAccountant;