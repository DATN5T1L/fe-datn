"use client";

import React from 'react';
import { Container, Row, Col, Image } from 'react-bootstrap';
import styles from "@public/styles/post/post.module.css";

const HeroPost: React.FC = () => {
    return(
        <>
            <Container className={styles.container}>
                <h2 className={styles.title}>
                    Bản tin TTO.SH
                </h2>
                <Row className={styles.Wapper}>
                    <Col xs={6} md={3}>
                        <figure className={styles.itemList}>
                            <Image className={styles.image} src="https://images.unsplash.com/photo-1719937206341-38a6392dfdef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8" alt="" />
                                <figcaption className={styles.descImg}>Xu hướng công nghệ</figcaption>
                        </figure>
                    </Col>
                    <Col xs={6} md={3}>
                        <figure className={styles.itemList}>
                            <Image className={styles.image} src="https://images.unsplash.com/photo-1719937206341-38a6392dfdef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8" alt="" />
                                <figcaption className={styles.descImg}>Xu hướng công nghệ</figcaption>
                        </figure>
                    </Col>
                    <Col xs={6} md={3}>
                        <figure className={styles.itemList}>
                            <Image className={styles.image} src="https://images.unsplash.com/photo-1719937206341-38a6392dfdef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8" alt="" />
                                <figcaption className={styles.descImg}>Xu hướng công nghệ</figcaption>
                        </figure>
                    </Col>
                    <Col xs={6} md={3}>
                        <figure className={styles.itemList}>
                            <Image className={styles.image} src="https://images.unsplash.com/photo-1719937206341-38a6392dfdef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8" alt="" />
                                <figcaption className={styles.descImg}>Xu hướng công nghệ</figcaption>
                        </figure>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default HeroPost;