import { Col, Container, Row } from "react-bootstrap"
import ButtonCpn from "../globalControl/btnComponent"
import styles from '@public/styles/learningPath/HeaderLearning.module.css'

interface RouterRepon {
    data: Route
}

const HeaderLearning: React.FC<RouterRepon> = ({ data }) => {
    return (
        <>
            <Container className={styles.container}>
                <Row className={styles.main}>
                    <Col className={styles.header__title}>
                        <div className={styles.header__box__blue}>
                            <div className={styles.header__box_pink}></div>
                        </div>
                        <h2 className={styles.header__title__content}>
                            {data.name_route}
                        </h2>
                        <div className={styles.header__border__blue}>
                            <div className={styles.header__box__grayBlue}></div>
                        </div>
                    </Col>
                    <Col className={styles.body}>
                        <h3 className={styles.body__content}>
                            {data.discription_route}
                        </h3>
                    </Col>

                </Row>
            </Container>
        </>
    )
}

export default HeaderLearning