'use client';

import { Dispatch, SetStateAction } from 'react';
import { Col, Card, Row } from 'react-bootstrap';
import useFormatDate from '../globalControl/useFormatDate';
import Link from 'next/link';
import styles from '@public/styles/post/ListPostTTO.module.css'

interface Post {
    id: string;
    title_post: string;
    content_post: string;
    img_post: string;
    views_post?: number;
    poster_id?: string;
    del_flag: boolean;
    category_id: string;
    created_at: string;
    updated_at: string;
    fullname: string;
}

interface ListPostTTOProps {
    data: Post[];
    step?: string;
    setStep?: Dispatch<SetStateAction<string>>;
}

const ListPostTTO: React.FC<ListPostTTOProps> = ({ data, step, setStep }) => {
    const listCount = step === "1" ? 2 : 3; // Số lượng bài viết hiển thị tùy thuộc vào step

    return (
        <Col xs={12} lg={6} className={styles.container}>
            {data.slice(0, listCount).map((item, index) => (
                <Card key={index} className={styles.card}>
                    <Row className={styles.row}>
                        <Col className={styles.col}>
                            <Card.Img
                                className={styles.imgImg}
                                src={item.img_post}
                                alt={item.title_post}
                            />
                        </Col>
                        <Col className={styles.col2}>
                            <Card.Body className={styles.cardBody}>
                                <Link href={`post/${item.id}`}> <Card.Title className="h6 fw-semibold" dangerouslySetInnerHTML={{ __html: item.title_post }} /></Link>
                                <Card.Text
                                    className="text-black fs-6 lh-base fw-medium"
                                    style={{
                                        display: "-webkit-box",
                                        WebkitBoxOrient: "vertical",
                                        WebkitLineClamp: 4,
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        maxHeight: "6rem",
                                    }}
                                    dangerouslySetInnerHTML={{ __html: item.content_post }}
                                />

                            </Card.Body>
                            <Row
                                className="text-muted align-items-center"
                                style={{ fontSize: '0.8rem', padding: "0px 12px" }}
                            >
                                <Col xs="auto">{useFormatDate(item.updated_at)}</Col>
                                <Col className="text-end">{item.fullname}</Col>
                            </Row>
                        </Col>
                    </Row>
                </Card>
            ))}
        </Col>
    );
};

export default ListPostTTO;
