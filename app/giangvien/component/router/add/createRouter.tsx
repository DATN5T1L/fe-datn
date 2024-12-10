'use client'

import { useEffect, useRef, useState } from "react";
import { Button, Col, Container, Form, Image, InputGroup, Row } from "react-bootstrap";
import styles from '@public/styles/learningPath/CreateRouter.module.css';
import ButtonCpn from "../../../../(user-global)/component/globalControl/btnComponent";
import useCookie from "@/app/(user-global)/component/hook/useCookie";
import * as Yup from 'yup'
import { useFormik } from "formik";
import { useRouter } from "next/navigation";

interface MyData {
    route_id: string | number;
    name_route: string;
}

type MyDataArray = MyData[];

const CreateRouter: React.FC = () => {
    const inputRef1 = useRef<HTMLInputElement>(null);
    const inputRef2 = useRef<HTMLInputElement>(null);
    const [isFocused1, setIsFocused1] = useState(false);
    const [isFocused2, setIsFocused2] = useState(false);
    const [open1, SetOpen1] = useState(false)
    const [open2, SetOpen2] = useState(false)
    const token = useCookie('token')
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const router = useRouter()

    const handleFocus1 = () => {
        if (inputRef1.current) {
            inputRef1.current.focus();
        }
    };

    const handleFocus2 = () => {
        if (inputRef2.current) {
            inputRef2.current.focus();
        }
    };

    const handleOpenMenu1 = () => {
        SetOpen1(!open1)
    }

    const handleOpenMenu2 = () => {
        SetOpen2(!open2)
    }

    const formik = useFormik({
        initialValues: {
            name_route: '',
            img_route: null as File | null,
            discription_route: '',
            del_flag: "false"
        },
        validationSchema: Yup.object({
            name_route: Yup.string()
                .required("Tên lộ trình là bắt buộc")
                .min(3, "Tên lộ trình phải có ít nhất 3 ký tự"),
            discription_route: Yup.string()
                .required("Mô tả là bắt buộc")
                .max(500, "Mô tả không được vượt quá 500 ký tự"),
        }),
        onSubmit: async (values) => {
            if (token) {
                if (confirm('Bạn có muốn thêm lộ trình này không?')) {
                    const formData = new FormData();
                    formData.append("name_route", values.name_route)
                    formData.append("discription_route", values.discription_route)
                    formData.append("del_flag", values.del_flag)
                    if (values.img_route) {
                        formData.append("img_route", values.img_route);
                    }
                    try {
                        const res = await fetch(`/api/allRouterAdmin/`, {
                            method: 'POST',
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                            body: formData,
                        });
                        const data = await res.json();
                        if (data.status === 'success') {
                            alert('Thêm lộ trình thành công!!!')
                            router.replace('/giangvien/router')
                        } else {
                            alert('Thêm lộ trình thất bại')
                        }
                        console.log(data);
                    } catch (error) {
                        console.error("Có lỗi xảy ra:", error);
                    }
                }
            } else {
                alert("Vui lòng đăng nhập trước khi thêm lộ trình.");
            }
        }
    })

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            if (file.size > 10 * 1024 * 1024) {
                formik.setFieldError("img_route", "Kích thước file không được vượt quá 10MB");
            } else {
                formik.setFieldValue("img_route", file);
                setPreviewImage(URL.createObjectURL(file));
                formik.setFieldError("img_route", undefined);
            }
        }
    };

    const openFileSelector = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    return (
        <>
            <Container className={styles.conatiner}>
                <Row className={styles.body}>
                    <Col className={styles.header}>
                        <h1 className={styles.title}>Tạo lộ trình mới </h1>
                        <h3 className={styles.subTitle}>
                            Tạo lộ trình mới.
                        </h3>
                    </Col>
                    <Col className={styles.main}>
                        <Form className={styles.form__container} onSubmit={formik.handleSubmit}>
                            <Row className={styles.form__container__top}>
                                <Col className={styles.form__container__top__left}>
                                    <Form.Group className={styles.formGroup__top}>
                                        <Form.Label className={styles.formGroup__top__title}>Nhập tên lộ trình </Form.Label>
                                        <InputGroup
                                            hasValidation
                                            className={`${styles.inputGroup} ${isFocused1 ? styles.border__blue : styles.border__black}`}
                                            tabIndex={0}
                                            onClick={handleFocus1}
                                        >
                                            <InputGroup.Text id="inputGroupPrepend" className={styles.inputGroup__text}>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.inputGroup__text__icon}>
                                                    <g clipPath="url(#clip0_590_6710)">
                                                        <path d="M4 19L8 5" stroke="#DBDBDB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${isFocused1 ? styles.blue : styles.black}`} />
                                                        <path d="M16 5L20 19" stroke="#DBDBDB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${isFocused1 ? styles.blue : styles.black}`} />
                                                        <path d="M12 8V6" stroke="#DBDBDB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${isFocused1 ? styles.blue : styles.black}`} />
                                                        <path d="M12 13V11" stroke="#DBDBDB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${isFocused1 ? styles.blue : styles.black}`} />
                                                        <path d="M12 18V16" stroke="#DBDBDB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`${isFocused1 ? styles.blue : styles.black}`} />
                                                    </g>
                                                    <defs>
                                                        <clipPath id="clip0_590_6710">
                                                            <rect width="24" height="24" fill="white" />
                                                        </clipPath>
                                                    </defs>
                                                </svg>
                                            </InputGroup.Text>
                                            <Form.Control
                                                type="text"
                                                placeholder="Nhập tên lộ trình"
                                                aria-describedby="inputGroupPrepend" 
                                                required
                                                className={styles.form__control__top}
                                                ref={inputRef1}
                                                id="name_route"
                                                name="name_route"
                                                value={formik.values.name_route}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                        </InputGroup>
                                        {formik.touched.name_route && formik.errors.name_route && (
                                            <div className={styles.error}>{formik.errors.name_route}</div>
                                        )}
                                    </Form.Group>
                                </Col>
                                <Col className={styles.form__container__top__right}>
                                    <Form.Group className={styles.formGroup__top}>
                                        <Form.Label className={styles.formGroup__top__title}>Nhập chi tiết lộ trình.</Form.Label>
                                        <InputGroup
                                            hasValidation
                                            className={`${styles.inputGroup} ${isFocused2 ? styles.border__blue : styles.border__black}`}
                                            tabIndex={0}
                                            onClick={handleFocus2}
                                        >
                                            <InputGroup.Text id="inputGroupPrepend" className={styles.inputGroup__text}>
                                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={styles.inputGroup__text__icon}>
                                                    <path className={`${isFocused2 ? styles.blue : styles.black}`} d="M21 16V8.00002C20.9996 7.6493 20.9071 7.30483 20.7315 7.00119C20.556 6.69754 20.3037 6.44539 20 6.27002L13 2.27002C12.696 2.09449 12.3511 2.00208 12 2.00208C11.6489 2.00208 11.304 2.09449 11 2.27002L4 6.27002C3.69626 6.44539 3.44398 6.69754 3.26846 7.00119C3.09294 7.30483 3.00036 7.6493 3 8.00002V16C3.00036 16.3508 3.09294 16.6952 3.26846 16.9989C3.44398 17.3025 3.69626 17.5547 4 17.73L11 21.73C11.304 21.9056 11.6489 21.998 12 21.998C12.3511 21.998 12.696 21.9056 13 21.73L20 17.73C20.3037 17.5547 20.556 17.3025 20.7315 16.9989C20.9071 16.6952 20.9996 16.3508 21 16Z" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path className={`${isFocused2 ? styles.blue : styles.black}`} d="M7.5 4.20996L12 6.80996L16.5 4.20996" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path className={`${isFocused2 ? styles.blue : styles.black}`} d="M7.5 19.79V14.6L3 12" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path className={`${isFocused2 ? styles.blue : styles.black}`} d="M21 12L16.5 14.6V19.79" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path className={`${isFocused2 ? styles.blue : styles.black}`} d="M3.27002 6.95996L12 12.01L20.73 6.95996" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    <path className={`${isFocused2 ? styles.blue : styles.black}`} d="M12 22.08V12" stroke="#333333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                </svg>
                                            </InputGroup.Text>
                                            <Form.Control
                                                type="text"
                                                placeholder="Nhập chi tiết lộ trình"
                                                aria-describedby="inputGroupPrepend"
                                                required
                                                className={styles.form__control__top}
                                                ref={inputRef2}
                                                id="discription_route"
                                                name="discription_route"
                                                value={formik.values.discription_route}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                        </InputGroup>
                                        {formik.touched.discription_route && formik.errors.discription_route && (
                                            <div className={styles.error}>{formik.errors.discription_route}</div>
                                        )}
                                    </Form.Group>
                                </Col>
                            </Row>
                            <Row className={styles.form__container__bottom}>
                                <div className={styles.thatep}>
                                    <div className={styles.thatep1}>
                                        <img src="/img_admin/may.svg" alt="" />
                                        <div className={styles.phangiua}>
                                            <div className={styles.chon1tep}>Ảnh bìa lộ trình</div>
                                            {previewImage ? (
                                                <img
                                                    src={previewImage}
                                                    alt="Preview"
                                                    style={{
                                                        maxWidth: "200px",
                                                        maxHeight: "200px",
                                                        objectFit: "cover",
                                                        marginBottom: "10px",
                                                    }}
                                                />
                                            ) : (
                                                <small className={styles.chon1tep}>Chưa chọn tệp nào</small>
                                            )}
                                            <input
                                                type="file"
                                                accept="image/*"
                                                ref={fileInputRef}
                                                onChange={handleImageChange}
                                                style={{ display: "none" }}
                                            />
                                            <div className={styles.ghichuhinh}>
                                                JPG, PNG or PDF, Kích thước file không lớn hơn 10MB
                                            </div>
                                        </div>
                                        <Button
                                            onClick={() => openFileSelector()}
                                            className={styles.bnthem}
                                        >Thêm</Button>
                                    </div>
                                    {formik.errors.img_route && (
                                        <div className={styles.error}>{formik.errors.img_route}</div>
                                    )}
                                </div>
                                <section className={styles.btn__group}>
                                    <Button>Hủy</Button>
                                    <Button type="submit">Thêm lộ trình</Button>
                                </section>
                            </Row>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>
    );
};

export default CreateRouter;
