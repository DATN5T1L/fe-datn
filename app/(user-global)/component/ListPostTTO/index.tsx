'use client';

import { Dispatch, SetStateAction } from 'react';
import { Col, Card, Row } from 'react-bootstrap';
import useFormatDate from '../globalControl/useFormatDate';

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
}

interface ListPostTTOProps {
    data: Post[];
    step?: string;
    setStep?: Dispatch<SetStateAction<string>>;
}

const ListPostTTO: React.FC<ListPostTTOProps> = ({ data, step, setStep }) => {
    const listCount = step === "1" ? 2 : 3; // Số lượng bài viết hiển thị tùy thuộc vào step

    return (
        <Col xs={12} lg={6} className="d-flex flex-column">
            {data.slice(0, listCount).map((item, index) => (
                <Card key={index} className="mb-4 border-0" style={{ height: "100%" }}>
                    <Row className="g-2" style={{ height: "150px" }}>
                        {/* Left column with image */}
                        <Col xs={6} className="d-flex align-items-stretch justify-content-end">
                            <Card.Img
                                style={{ width: '240px', height: '144px', objectFit: 'cover' }}
                                src={item.img_post}
                                alt={item.title_post}
                            />
                        </Col>

                        {/* Right column with text */}
                        <Col xs={6} className="d-flex flex-column justify-content-between">
                            <Card.Body className="p-0" style={{ margin: "0 12px", flex: 1 }}>
                                <Card.Title className="h6 fw-semibold">
                                    {item.title_post}
                                </Card.Title>
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
                                >
                                    {item.content_post}
                                </Card.Text>
                            </Card.Body>
                            <Row
                                className="text-muted align-items-center"
                                style={{ fontSize: '0.8rem', padding: "0px 12px" }}
                            >
                                <Col xs="auto">{useFormatDate(item.updated_at)}</Col>
                                <Col className="text-end">Tuấn Huỳnh</Col>
                            </Row>
                        </Col>
                    </Row>
                </Card>
            ))}
        </Col>
    );
};

export default ListPostTTO;
