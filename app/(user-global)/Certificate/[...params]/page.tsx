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
import Body from "../../component/globalControl/body";

const Certificate = () => {
    const params = useParams();
    const ref = useRef<HTMLDivElement>(null); // Ref để export PDF
    const userState = useSelector((state: RootState) => state.user);
    const [course_id, course_name] = params.params;

    // Lưu tên và font-size
    const [name, setName] = useState(userState.user?.fullname || '');
    const [fontSize, setFontSize] = useState('4rem');

    // Xử lý thay đổi input
    const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setName(value);

        // Giảm font-size nếu quá dài
        if (value.length > 20) {
            setFontSize('2.5rem'); // Font nhỏ hơn nếu trên 20 ký tự
        } else {
            setFontSize('4rem'); // Trả về font mặc định
        }
    };

    // Lấy ngày hiện tại
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
                } else {
                    alert('Failed to upload PDF');
                }
            } catch (error) {
                console.error('Error uploading PDF:', error);
                alert('An error occurred while uploading the PDF');
            }
        }
    };






    return (
        <Body>
            <div className={c.body}>

                <Container className={c.headings}>
                    <h2 className={c.heading}>Chúc mừng bạn đã hoàn thành <br /> {formatParamString(course_name)}</h2>
                    <p className={c.descTitle}>Tiếp theo bạn có thể nhận chứng chỉ của mình bằng cách bấm vào nút dưới đây</p>
                    <div className={c.cta}>
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

                    </div>
                </Container >
                <Container className={c.container} >
                    <main className={c.Certificate} ref={ref}>
                        <h4 className={c.nameCoure}>{formatParamString(formatParamString(course_name))}</h4>
                        <div className={c.inputCertificate} style={{
                            display: 'block',
                            margin: '0 auto',
                            width: '80%',
                            borderRadius: '5px',
                            borderColor: '#ccc',
                            outline: 'none',
                            fontSize: fontSize, // Cập nhật font-size
                        }}>{removeVietnameseTones(name)}</div>
                        <input
                            id="exclude"
                            type="text"
                            placeholder="Nhập tên của bạn"
                            value={name} // Không chuyển trực tiếp bằng removeVietnameseTones
                            onChange={handleChangeName}
                            // Thay đổi tên
                            className={`${c.inputCertificates} ${c.noPrint}`}
                            style={{
                                display: 'block',
                                margin: '0 auto',
                                width: '80%',
                                borderRadius: '5px',
                                borderColor: '#ccc',
                                outline: 'none',
                                fontSize: fontSize, // Cập nhật font-size
                            }}
                            autoFocus
                        />
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
