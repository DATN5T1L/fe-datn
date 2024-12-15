import { Container, Row } from "react-bootstrap"
import styles from '@public/styles/user/Main.module.css'

interface MainProps {
    children?: React.ReactNode
}

const Main: React.FC<MainProps> = ({ children }) => {
    return (
        <>
            <Container className={styles.container}>
                <Row className={styles.main}>
                    {children}
                </Row>
            </Container>
        </>
    )
}

export default Main 