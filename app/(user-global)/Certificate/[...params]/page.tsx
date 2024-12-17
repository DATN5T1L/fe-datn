'use client';
import { useState, useRef } from "react";
import { useParams } from "next/navigation";
import { Container } from "react-bootstrap";
import Image from "next/image";
import c from "@public/styles/Certificate.module.css";
import { useSelector } from 'react-redux';
import { RootState } from "@/redux/store";
import { formatParamString } from "../../component/globalControl/commonC";
import Button from "../../component/globalControl/btnComponent";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import useCookie from '@app/(user-global)/component/hook/useCookie';
import Body from "../../component/globalControl/body";
import FeebackCourse from "../../learningCourse/FeebackCourse";

interface FeedbackProp {
    feedback: { rating: number; feedbackText: string }
}

const Certificate = () => {
    const token = useCookie('token');
    const params = useParams();
    const ref = useRef<HTMLDivElement>(null); // Ref để export PDF
    const userState = useSelector((state: RootState) => state.user);
    const [course_id, course_name] = params.params;
    const [showCertificate, setShowCertificate] = useState<boolean>(false)
    // Lưu tên và font-size
    const [name, setName] = useState(userState.user?.fullname || '');
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('vi-VN');

    // Hàm loại bỏ dấu tiếng Việt
    function removeVietnameseTones(str: string): string {
        return str
            .normalize('NFD') // Chuyển ký tự có dấu thành dạng tổ hợp
            .replace(/[\u0300-\u036f]/g, '') // Loại bỏ các dấu
            .replace(/đ/g, 'd') // Thay thế 'đ' thường
            .replace(/Đ/g, 'D') // Thay thế 'Đ' hoa
            .trim() // Loại bỏ khoảng trắng thừa
            .replace(/\s+/g, ' '); // Chuẩn hóa khoảng trắng thành 1 khoảng trắng
    }

    // Hàm xuất PDF
    const exportPDF = async () => {
        if (ref.current) {
            const element = ref.current;

            // Ẩn phần tử không muốn xuất
            const excludeElement = element.querySelector('#exclude') as HTMLElement;
            if (excludeElement) {
                excludeElement.style.display = 'none';
            }

            // Tạo canvas từ phần tử
            const canvas = await html2canvas(element, {
                scale: 1.5, // Giảm scale để giảm dung lượng
                useCORS: true,
                backgroundColor: null,
            });

            // Hiển thị lại phần tử bị ẩn
            if (excludeElement) {
                excludeElement.style.display = '';
            }

            // Lấy dữ liệu hình ảnh từ canvas (JPEG và giảm chất lượng)
            const imgData = canvas.toDataURL('image/jpeg', 0.8);

            // Tạo file PDF
            const pdf = new jsPDF({
                orientation: 'p',
                unit: 'mm',
                format: 'a4',
                compress: true, // Kích hoạt nén
            });

            const pdfWidth = 210;
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);

            // Chuyển PDF thành Blob
            const pdfBlob = pdf.output('blob');

            // Tạo FormData để gửi file
            const formData = new FormData();
            formData.append('certificate_file', new Blob([pdfBlob], { type: 'application/pdf' }), 'certificate.pdf');

            try {
                // Gửi file PDF qua API
                const response = await fetch(`/api/addCertificate/${course_id}`, {
                    method: 'POST',
                    body: formData,
                });

                const result = await response.json();
                console.log('Server response:', result);
                if (result.success) {
                    alert('PDF uploaded successfully');
                }
            } catch (error) {
                console.error('Error uploading PDF:', error);
                alert('An error occurred while uploading the PDF');
            }
        }
    };

    const handelFeedback = async (feedback: FeedbackProp) => {
        const Data = {
            rating_course: feedback.feedback.rating,
            feedback_text: feedback.feedback.feedbackText
        }
        try {
            if (!isSubmitted) {
                const response = await fetch(`/api/addFeedback/${course_id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(Data),
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch course");
                }
                const responseData = await response.json();
                if (responseData.status === "success") {
                    setShowCertificate(true)
                    setIsSubmitted(true)
                }
                if (!responseData.ok) {
                    setIsSubmitted(false)
                } else {
                }
                alert('Cảm ơn bạn đã để lại phản hồi khóa học cho TTO.SH chúc bạn 1 ngày tốt lành')
            }
        } catch (err: any) {

        }
    }
    return (
        <Body>
            <div className={c.body}>
                <Container className={c.headings}>
                    <h2 className={c.heading}>Bạn đã hoàn thành khóa học</h2>
                    <h1 className={c.headingNameCourse}>{formatParamString(course_name)}</h1>
                    <p className={c.descTitle}>Tiếp theo bạn có thể đánh giá và nhận chứng chỉ</p>
                    {showCertificate === false && (
                        <FeebackCourse course_id={course_id} course_name={course_name} onSubmit={(feedback) => handelFeedback({ feedback })} />
                    )}
                    <div className={c.cta}>
                        {showCertificate === true && (
                            <Button
                                onClick={exportPDF} // Nút tải về PDF
                                rightIcon={false}
                                leftIcon={false}
                                status="hover"
                                hoverType={"other"}
                                type="premary"
                            >
                                Nhận chứng chỉ
                            </Button>
                        )}

                    </div>
                </Container >
                <Container className={c.container} >
                    <main className={c.Certificate} ref={ref}>
                        <h4 className={c.nameCoure}>{formatParamString(formatParamString(course_name))}</h4>
                        <div className={c.inputCertificate} >{removeVietnameseTones(name)}</div>
                        <p className={c.date}>{formattedDate}</p>
                        <Image
                            className={c.daumoc}
                            src="https://res.cloudinary.com/dnmc89c8b/image/upload/v1734268221/fe_image/moc.png"
                            alt="Mọc tto.sh"
                            width={250}
                            height={150}
                        />
                    </main>

                </Container>
            </div>
        </Body>
    );
};

export default Certificate;
