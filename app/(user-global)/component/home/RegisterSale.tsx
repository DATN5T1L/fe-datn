import { Container, Row } from "react-bootstrap";
import Button from "../globalControl/btnComponent";
import styles from "@public/styles/course/coursedetail.module.css";
const RegisterSale = () => {
    return (
        <section className={`${styles.callHelp}`} >
            <Container className={`${styles.container} ${styles.containerCallHelp}`}>
                <Row className={`${styles.row} ${styles.rowCallhelp}  `}>
                    <h3 className={styles.titleCallHelp}>Đăng ký tư vấn lộ trình học
                        hoàn toàn miễn phí!</h3>
                    <p className={styles.descCallHelp}>Tư vấn viên sẽ liên hệ và giải đáp mọi thắc mắc của bạn về lộ trình học để trở thành nhà phát triển chuyên nghiệp</p>
                </Row>

                <Button type="secondery" status="hover" size="S" leftIcon={false} rightIcon={false} chevron={4} width={145} height={40}>Nhận tư vấn miễn phí</Button>

            </Container>
        </section >
    )
}

export default RegisterSale;