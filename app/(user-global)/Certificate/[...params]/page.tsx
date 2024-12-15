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

            // Tìm và ẩn phần tử không muốn xuất
            const excludeElement = element.querySelector('#exclude') as HTMLElement;
            if (excludeElement) {
                excludeElement.style.display = 'none';
            }

            // Tạo canvas từ phần tử
            const canvas = await html2canvas(element, {
                scale: 2,
                useCORS: true,
                backgroundColor: null,
            });

            // Khôi phục lại trạng thái hiển thị của phần tử bị loại bỏ
            if (excludeElement) {
                excludeElement.style.display = '';
            }

            // Lấy dữ liệu hình ảnh từ canvas
            const imgData = canvas.toDataURL('image/png');

            // Tạo file PDF
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = 210;
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

            // Gửi hình ảnh lên server
            try {
                const response = await fetch('/api/uploadImgPost', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ image: imgData })
                });

                const result = await response.json();

                if (result.success) {
                    alert(result.image);
                } else {
                    alert('Failed to upload image');
                }
            } catch (error) {
                console.error('Error uploading image:', error);
                alert('An error occurred while uploading the image');
            }

            pdf.save(`certificate_${course_name}.pdf`);
        }
    };





    return (
        <>
            <Container className={c.container} >
                <main className={c.Certificate} ref={ref}>
                    <h4 className={c.nameCoure}>{formatParamString(course_name)}</h4>
                    <div className={c.inputCertificate} style={{
                        display: 'block',
                        margin: '0 auto',
                        width: '80%',
                        borderRadius: '5px',
                        borderColor: '#ccc',
                        outline: 'none',
                        fontSize: fontSize, // Cập nhật font-size
                    }}>{name}</div>
                    <input
                        id="exclude"
                        type="text"
                        placeholder="Nhập tên của bạn"
                        value={name} // Không chuyển trực tiếp bằng removeVietnameseTones
                        onChange={handleChangeName} // Thay đổi tên
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
                    />
                    <p className={c.date}>{formattedDate}</p>
                    <Image
                        className={c.daumoc}
                        src="https://res.cloudinary.com/dnmc89c8b/image/upload/v1734250970/fe_image/daumoc.png"
                        alt="Mọc tto.sh"
                        width={250}
                        height={150}
                    />
                </main>
                <div className={c.cta}>
                    <Button
                        onClick={exportPDF} // Nút tải về PDF
                        rightIcon={false}
                        leftIcon={false}
                        hoverType={"other"}
                        type="premary"
                    >
                        Tải về
                    </Button>

                </div>
            </Container>


        </>
    );
};

export default Certificate;
