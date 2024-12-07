"use client";
import { Button } from "react-bootstrap";
import h from "./CourseFQAEdit.module.css";
import { useRouter, useSearchParams } from "next/navigation";
import useCookie from "@/app/(user-global)/component/hook/useCookie";
import { useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup'

const CourseFQAEEdit: React.FC = () => {
    const searchParams = useSearchParams()
    const id = searchParams.get('id')
    const courseId = searchParams.get('courseId')
    const token = useCookie('token')
    const router = useRouter()
    const validationSchema = Yup.object({
        question: Yup.string()
            .required('Vui lòng nhập câu hỏi'),
        answer: Yup.string()
            .required('Vui lòng nhập câu trả lời')
    })

    useEffect(() => {
        if (token && id) {
            fetch(`/api/idFaqCourse/${id}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data) {
                        formik.setValues({
                            question: data.data.question || '',
                            course_id: courseId,
                            answer: data.data.answer || '',
                        })
                    }
                })
                .catch(error => {
                    console.error(error);
                })
        }
    }, [id, token])

    const formik = useFormik({
        initialValues: {
            question: '',
            course_id: courseId,
            answer: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            if (confirm('Bạn có muốn thay đổi faq này hay không?')) {
                try {
                    if (token && id && courseId) {
                        const res = await fetch(`/api/idFaqCourse/${id}`, {
                            method: 'PUT',
                            headers: {
                                Authorization: `Bearer ${token}`,
                                'Content-type': 'application/json'
                            },
                            body: JSON.stringify({
                                question: values.question,
                                course_id: courseId,
                                answer: values.answer
                            })
                        })
                        const data = await res.json()
                        console.log(data);
                        
                        if (data.status === 'success') {
                            alert('Thay đổi thành công!!!')
                            router.replace(`/giangvien/CoursePage/CourseFQA?id=${courseId}`)
                        } else {
                            alert('Thay đổi thất bại.')
                        }
                    }
                } catch (error) {
                    console.error('Có lỗi xảy ra: ', error);
                }
            }
        }
    })

    return (
        <div>
            <div className={h.header_add}>Sửa FQA khóa học</div>
            <div className={h.body_add}>
                <form onSubmit={formik.handleSubmit} className={h.wapper}>
                    <div className={h.formnhap}>
                        <div className={h.bentrong}>
                            <div>Câu hỏi FAQ</div>
                            <input
                                className={h.inputne}
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
                                className={h.inputne}
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
                        <Button type="submit" className={h.btnthemvao}>Sửa</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};
export default CourseFQAEEdit;
