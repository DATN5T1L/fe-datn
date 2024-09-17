'use client'
import styles from '@public/styles/course/HeaderCourse.module.css'
import { Button, Container, Dropdown, DropdownButton, Form, Image } from "react-bootstrap"
import { Search } from 'react-bootstrap-icons'
import '@public/styles/course/course.css'

const HeaderCourse: React.FC = () => {
    return (
        <>
            <Container className={styles.container__header}>
                <div className={styles.header}>
                    <Image src="/img/searchBlue.svg" alt="" className={styles.header__img} />
                    <h1 className={styles.header__title}>Khóa học của bạn</h1>
                </div>
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
                </section>
                <section className={styles.dropGroup}>
                    <Dropdown className={styles.body__left}>
                        <Dropdown.Toggle id="dropdown-custom-1" variant="primary" className={styles.bodyLeft__btn}>
                            <div className={styles.bodyLeft__btn__title}>
                                Lộ trình
                            </div>
                            <Image src='/img/chevronBlue-04.svg' className={styles.bodyLeft__btn__img} />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item >Front-end</Dropdown.Item>
                            <Dropdown.Item >Back-end</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown className={styles.body__right} >
                        <Dropdown.Toggle id="dropdown-custom-1" variant="primary" className={styles.bodyRight__btn}>
                            <div className={styles.bodyRight__btn__title}>
                                khóa học
                            </div>
                            <Image src='/img/chevronGray-04.svg' className={styles.bodyRight__btn__img} />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item >html</Dropdown.Item>
                            <Dropdown.Item >css</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </section>
            </Container>
        </>
    )
}

export default HeaderCourse