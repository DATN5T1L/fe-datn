
import styles from '@public/styles/user/HeaderUser.module.css'
import { Col, Container, Image, Row } from 'react-bootstrap';

const HeaderUser: React.FC = () => {
    return (
        <>
            <Container className={styles.container}>
                <section className={styles.container__bg}>
                    <article className={styles.content}>
                        <Image src="/img/avt.jpg" alt="" className={styles.img} />
                        <section className={styles.content__main}>
                            <h3 className={styles.content__main__title}>Con Văn Người</h3>
                            <h4 className={styles.content__main__date}>Ngày 08 tháng 12 năm 2002</h4>
                        </section>
                    </article>
                </section>
            </Container>
        </>
    )
}

export default HeaderUser;