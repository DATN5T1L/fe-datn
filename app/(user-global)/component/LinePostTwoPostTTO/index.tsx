'use client'

import React, { useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import ListPostTTO from '../ListPostTTO'
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

const LinePostTwoPostTTO: React.FC<ApiPostProps> = (props) => {

    const data = props.data
    const getData2 = data.slice(0, 2)
    const dataArr = data.slice(2)

    return (
        <Container className='m-0'>
            <Row style={{ padding: "80px 55px" }}>
                {/* Left section */}
                <Col xs={12} lg={8}>
                    <Row className="g-4">
                        {getData2 && getData2.map((item, index) => (
                            <Col xs={6} key={index}>
                                <Card className="mb-3 border-0">
                                    <Row className="g-3 d-flex flex-column">
                                        <Col xs={12}>
                                            <Card.Img
                                                className="w-100"
                                                style={{ height: '137px', objectFit: 'cover' }}
                                                src={`${item.img_post}`}
                                                alt={`${item.title_post}`}
                                            />
                                        </Col>
                                        <Col xs={12} className="d-flex flex-column justify-content-between">
                                            <Card.Body className="p-0">
                                                <Card.Title className="h6 fw-semibold">
                                                    {item.title_post}
                                                </Card.Title>
                                                <Card.Text className="text-black fs-6 lh-base fw-medium">
                                                    {item.content_post}
                                                </Card.Text>
                                            </Card.Body>
                                            <Row className="text-muted align-items-center" style={{ fontSize: '0.8rem' }}>
                                                <Col xs="auto">{useFormatDate(item.updated_at)}</Col>
                                                <Col className="text-end">Tuấn huỳnh</Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Col>

                {/* Right section */}
                {dataArr && (
                    <ListPostTTO data={dataArr} />
                )}
            </Row>
        </Container>
    )
}

export default LinePostTwoPostTTO
