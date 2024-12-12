"use client";
import { Button } from "react-bootstrap";
import h from "./CourseFQAEdit.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import useCookie from "@/app/(user-global)/component/hook/useCookie";
import * as Yup from 'yup'
import { useFormik } from "formik";

const CourseFQAEAdd: React.FC = () => {
    const token = useCookie('token')
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    const router = useRouter()

    const validationSchema = Yup.object({
        question: Yup.string()
            .required('Vui lòng nhập câu hỏi'),
        answer: Yup.string()
            .required('Vui lòng nhập câu hỏi')
    });

    const formik = useFormik({
        initialValues: {
            question: '',
            course_id: id,
            answer: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            if (token && id) {
                try {
                    if (confirm('Bạn có muốn thêm FAQ mới hay không?')) {
                        const res = await fetch(`/api/idFaqCourse/`, {
                            method: 'POST',
                            headers: {
                                Authorization: `Bearer ${token}`,
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                course_id: id,
                                question: values.question,
                                answer: values.answer,
                            })
                        })
                        if (!res.ok) {
                            const errorData = await res.json();
                            console.error('Server error:', errorData);
                            alert('Đã có lỗi xảy ra từ phía server. Vui lòng thử lại sau!');
                        } else {
                            const data = await res.json();
                            console.log('Response data:', data);
                            alert('Thêm FAQ thành công!!!');
                            router.replace(`/giangvien/CoursePage/CourseFQA?id=${id}`)
                        }
                    }
                } catch (error) {
                    console.error('Có lỗi xảy ra:', error);
                }
            }
        }
    })

    return (
        <div>
            <div className={h.header_add}>Thêm FQA khóa học</div>
            <div className={h.body_add}>
                <form onSubmit={formik.handleSubmit} className={h.wapper}>
                    <div className={h.formnhap}>
                        <div className={h.bentrong}>
                            <div>Câu hỏi FAQ</div>
                            <input
                                className={h.inputne1}
                                placeholder="Nhập câu hỏi"
                                name={'question'}
                                value={formik.values.question}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.question && (
                                <div style={{ color: 'red' }}>{formik.errors.question}</div>
                            )}
                        </div>
                        <div className={h.bentrong}>
                            <div>Câu trả lời FAQ</div>
                            <input
                                className={h.inputne1}
                                placeholder="Nhập câu trả lời"
                                name={'answer'}
                                value={formik.values.answer}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            {formik.errors.answer && (
                                <div style={{ color: 'red' }}>{formik.errors.answer}</div>
                            )}
                        </div>
                    </div>
                    <div className={h.formnhap}>
                        {id ? ('') : (
                            <div className={`${h.bentrong} ${h.left}`}>
                                <div>Khóa học</div>
                                <div className={h.selectne}>
                                    <select className={h.inputne}>
                                        <option value="reactjs">ReactJS</option>
                                        <option value="nodejs">NodeJS</option>
                                        <option value="typescript">TypeScript</option>
                                        <option value="nextjs">Next.js</option>
                                    </select>
                                    <img src="/img/chevronGray-04.svg" />
                                </div>
                            </div>
                        )}
                        <div className={`${h.bentrong} ${h.left} ${h.opacity}`}>
                            <div className={h.selectne}>
                                <select className={h.inputne}>
                                </select>
                                <img src="/img/chevronGray-04.svg" />
                            </div>
                        </div>
                    </div>
                    <div className={h.chonutragiua}>
                        <Button type="submit" className={h.btnthemvao}>Thêm vào</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default CourseFQAEAdd;
