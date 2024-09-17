'use client'
import styles from '@public/styles/course/HeaderCourse.module.css'
import { Button, Container, Form, Image } from "react-bootstrap"
import { Search } from 'react-bootstrap-icons'

const HeaderCourse: React.FC = () => {
    return (
        <>
            <Container >
                <section className={styles.nav}>
                    <Form className={styles.nav__searchBar}>
                        <Form.Control
                            type="search"
                            placeholder="Tìm kiếm"
                            aria-label="Search"
                            className={styles.searchBar__searchInput}
                        />
                        <Button variant="outline-secondary" className={styles.searchBar__searchButton}>
                            <Search />
                        </Button>
                    </Form>
                    <div className={styles.nav__control}>
                        <div className={styles.control__element1}>
                            <Image src="/img/check.svg" alt="" className={styles.elenment1__img} />
                            <Image src="/img/Widget 7.svg" alt="" className={styles.elenment1__img} />
                        </div>
                        <div className={styles.control__element2}>
                            <Image src="/img/ItemDoc.svg" alt="" className={styles.element2__img} />
                        </div>
                    </div>
                </section>
            </Container>
        </>
    )
}

export default HeaderCourse