import { Col, Container, Row } from "react-bootstrap"
import ButtonCpn from "../globalControl/btnComponent"
import styles from '@public/styles/learningPath/HeaderLearning.module.css'
import { formatParamString } from "../globalControl/commonC";

interface RouterRepon {
    data: route
}

interface route {
    name_route: string;
    discription_route: string;
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
                            {formatParamString(data.name_route)}
                        </h2>
                        <div className={styles.header__border__blue}>
                            <div className={styles.header__box__grayBlue}></div>
                        </div>
                    </Col>
                    <Col className={styles.body}>
                        <h3 className={styles.body__content}>
                            {formatParamString(data.discription_route)}
                        </h3>
                    </Col>

                </Row>
            </Container>
        </>
    )
}

export default HeaderLearning