import h from "../component/Course/course.module.css"
import Table from "react-bootstrap/Table";
const Transion = () => {
    const fetchWeeklyStatistics = async () => {
        try {
            const response = await fetch(`/api/accountant/courseEnrollmentRevenue`); // Thay thế bằng URL API thật
            const result = await response.json();


        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    return (
        <main>
            <h2>Lịch sử thanh toán của người dùng</h2>
            <Table bordered hover className={`${h.table} table-responsive`}>
                <thead>
                    <tr>
                        <td>Khóa học</td>
                        <td>Giá</td>
                        <td>Giá giảm</td>
                        <td>Lượt xem</td>
                        <td>Tổng doanh thu</td>
                        <td>Thuế</td>
                        <td>Đánh giá</td>
                        <td>Giảng viên</td>
                        <td>Trạng thái</td>
                        <td>Hành động</td>
                    </tr>
                </thead>

                <tbody>
                    {/* {courseRevenue && courseRevenue.map((item, index) => (
                        <CourseAcount key={index} data={item} />
                    ))} */}
                </tbody>
            </Table>
        </main>
    )
}

export default Transion;