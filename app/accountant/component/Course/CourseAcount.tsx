import { Card } from "react-bootstrap";
import h from "./course.module.css";
import Link from "next/link";
import { IconDetailPlus } from '@app/(user-global)/component/icon/icons'


const CourseAcount: React.FC<Data<CourseAcount>> = ({ data
}) => {
    return (
        <tr key={data.id}>
            <td>
                <Card.Header className={h.headerContent}>
                    <section className={h.headerContent__text}>
                        <Card.Title className={h.text__hedding2}>
                            {data.name_course}
                        </Card.Title>
                        <Card.Subtitle className={h.text__hedding3}>
                            by {data.instructor_name}
                        </Card.Subtitle>
                        <Card.Img
                            src="/img/iconReact.svg"
                            alt=""
                            className={h.text__img}
                        />
                    </section>
                    <Card.Img
                        src="/img/tuan.png"
                        alt=""
                        className={h.headerContent__avt}
                    />
                </Card.Header>
            </td>
            <td>{data.price_course}</td>
            <td>{data.discount_price_course}</td>
            <td>{data.views_course}</td>
            <td>{data.total_revenue}</td>
            <td>{data.tax_rate}</td>
            <td>{data.rating_course}</td>
            <td>
                {data.instructor_name}
            </td>
            <td>
                <span className={h.active_text}>{data.status_course}</span>
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

export default CourseAcount;