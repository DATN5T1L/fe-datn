import { Card } from "react-bootstrap";
import h from "./course.module.css";
import Link from "next/link";
import { IconDetailPlus, IconEyes, IconStar } from '@app/(user-global)/component/icon/icons'
import { ShowNameElement, formatCurrency } from '@app/(user-global)/component/globalControl/commonC'
const CourseAcount: React.FC<Data<CourseAcount>> = ({ data
}) => {
    console.log(data)
    const getNotificationStyles = () => {
        switch (data.status_course) {
            case 'success':
                return {
                    backgroundColor: '#D4EDDA',
                };
            case 'confirming':
                return {
                    backgroundColor: '#F8D7DA',

                };

            default:
                return {
                    backgroundColor: '#000000',
                };
        }
    };

    const { backgroundColor } = getNotificationStyles()
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
                            src={data.img_course}
                            alt="Hoàn thiện dự án e-commerce cùng TTo"
                            className={h.text__img}
                        />
                    </section>
                    <Card.Img
                        src="https://res.cloudinary.com/dnmc89c8b/image/upload/v1734067208/fe_image/Hinhgau.png"
                        alt="Hoàn thiện dự án e-commerce cùng TTo"
                        className={h.headerContent__avt}
                    />
                </Card.Header>
            </td>
            <td>{formatCurrency(data.price_course)}</td>
            <td>{data.discount_price_course} %</td>
            <td>{data.views_course} <IconEyes /></td>
            <td>{formatCurrency(data.total_revenue)}</td>
            <td>{data.tax_rate} %</td>
            <td>{data.rating_course} <IconStar /></td>
            <td>
                {data.instructor_name}
            </td>
            <td>
                <span className={h.active_text}
                    style={{
                        backgroundColor
                    }}
                >{data.status_course}</span>
            </td>
            <td className={h.option_button_group}>
                <ShowNameElement name="Xem chi tiết">
                    <div
                        className={`justify-content-between border d-flex py-2 rounded`}
                    >
                        <Link href={`/accountant/CoursePage/${data.slug_course}`} className="w-50 border-end">
                            <IconDetailPlus />
                        </Link>
                    </div>
                </ShowNameElement>
            </td>
        </tr>
    )
}

export default CourseAcount;