"use client";
import { useState, useEffect, useRef } from "react";
import { Container, Row } from "react-bootstrap";
import Button from "../globalControl/btnComponent";
import styles from "@public/styles/course/coursedetail.module.css";
import FormFeedback from "../globalControl/FormFeedback";

const RegisterSale = () => {
    const [isShow, setIsShow] = useState<boolean>(false);
    const formRef = useRef<HTMLDivElement | null>(null);

    const toggleShowForm = () => {
        setIsShow((prev) => !prev);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (formRef.current && !formRef.current.contains(event.target as Node)) {
            setIsShow(false);
        }
    };

    useEffect(() => {
        if (isShow) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isShow]);

    return (
        <section id="contact" className={`${styles.callHelp}`}>
            <Container className={`${styles.container} ${styles.containerCallHelp}`}>
                <Row className={`${styles.row} ${styles.rowCallhelp}`}>
                    <h3 className={styles.titleCallHelp}>
                        Đăng ký tư vấn lộ trình học hoàn toàn miễn phí!
                    </h3>
                    <p className={styles.descCallHelp}>
                        Tư vấn viên sẽ liên hệ và giải đáp mọi thắc mắc của bạn về lộ trình học để trở thành nhà phát triển chuyên nghiệp
                    </p>
                </Row>

                <Button
                    type="secondery"
                    status="hover"
                    size="S"
                    leftIcon={false}
                    rightIcon={false}
                    chevron={4}
                    width={145}
                    height={40}
                    onClick={toggleShowForm}
                >
                    Nhận tư vấn miễn phí
                </Button>

                {isShow && (
                    <div className={styles.Form}>
                        <main ref={formRef}>
                            <FormFeedback />
                        </main>
                    </div>
                )}
            </Container>
        </section>
    );
};

export default RegisterSale;
