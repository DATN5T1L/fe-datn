import { Card } from "react-bootstrap"
import Link from "next/link";
import h from '../component/Course/course.module.css';
import { ShowNameElement, formatCurrency, calculateTimeAgo } from '@app/(user-global)/component/globalControl/commonC'
import { IconDetailPlus } from '@app/(user-global)/component/icon/icons';
interface CardTransition {
    data: Payment
    index: number;
}
const CardTransition: React.FC<CardTransition> = ({ data, index }) => {
    const getNotificationStyles = () => {
        switch (data.status) {
            case 'completed':
                return {
                    backgroundColor: "rgba(36, 161, 72, 1)",
                };
            case 'pending':
                return {
                    backgroundColor: '#F8D7DA',
                };
            case 'failed':
                return {
                    backgroundColor: '#F8D7DA',

                };

            default:
                return {
                    backgroundColor: '#000000',
                };
        }
    };
    const { backgroundColor } = getNotificationStyles();
    return (
        <tr key={data.id}>
            <td>{index}</td>
            <td>
                {data.payment_method}
            </td>
            <td>{formatCurrency(data.amount)}</td>
            <td>{data.payment_discription === null ? (
                <>Không có ghi chú</>
            ) : (data.payment_discription)}
            </td>

            <td>
                <ShowNameElement name={data.status}>
                    <div className={h.active_text}
                        style={{
                            backgroundColor
                        }}
                    >

                    </div>
                </ShowNameElement>
            </td>
            <td>{calculateTimeAgo(data.created_at)}
            </td>
            <td className={h.option_button_group}>
                <ShowNameElement name="Xem chi tiết">
                    <div
                        className={`justify-content-between border d-flex py-2 rounded`}
                    >
                        <Link
                            href={`/accountant/Order/${data.id}/${data.status}/${data.amount}/${data.payment_discription === null ? "Không có ghi chú" : encodeURIComponent(data.payment_discription)}/${data.created_at}`}
                            className="w-50 border-end"
                        >
                            <IconDetailPlus />
                        </Link>
                    </div>
                </ShowNameElement>
            </td>
        </tr>
    )
}

export default CardTransition;