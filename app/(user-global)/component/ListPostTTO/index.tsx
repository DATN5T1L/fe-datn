'use client'

import { Dispatch, SetStateAction } from 'react';
import { Col, Card, Row } from 'react-bootstrap';
import useFormatDate from '../globalControl/useFormatDate';

interface PostCmt {
    id: string;
    title_post: string;
    content_post: string;
    img_post: string;
    views_post: number;
    poster_id: string;
    del_flag: boolean;
    category_id: string;
    created_at: string;
    updated_at: string;
}
interface PostView {
    id: string;
    title_post: string;
    content_post: string;
    img_post: string;
    views_post: number;
    status_post: string;
    del_flag: boolean;
    user_id: string;
    category_id: string;
    created_at: string;
    updated_at: string;
}
interface ApiPostProps {
    data: PostCmt[] | PostView[];
}


const ListPostTTO: React.FC<ApiPostProps> = (props) => {

    const data = props.data;

    return (
        <Col xs={12} lg={4}>
            {data && data.map((item, index) => (
                <>
                    <Card key={index} className="mb-3 border-0">
                        <Row className="g-2">
                            <Col xs={4}>
                                <Card.Img
                                    className="w-100 h-100"
                                    style={{ height: '100%', objectFit: 'cover' }}
                                    src={`${item.img_post}`}
                                    alt={`${item.title_post}`}
                                />
                            </Col>
                            <Col xs={8} className="d-flex flex-column justify-content-between">
                                <Card.Body className="p-0">
                                    <Card.Title className="h6 fw-semibold">
                                        {
                                            item.title_post
                                        }
                                    </Card.Title>
                                    <Card.Text className="text-black fs-6 lh-base fw-medium">
                                        <div dangerouslySetInnerHTML={{ __html: item.content_post }}></div>
                                    </Card.Text>
                                </Card.Body>
                                <Row className="text-muted align-items-center" style={{ fontSize: '0.8rem' }}>
                                    <Col xs="auto">{useFormatDate(item.created_at)}</Col>
                                    <Col className="text-end">Tuấn Huỳnh</Col>
                                </Row>
                            </Col>
                        </Row>
                    </Card>
                </>
            ))}
        </Col >
    );
}

export default ListPostTTO;
