'use client';

import React, { useEffect, useState } from 'react';
import { Col, Card, Row, Container } from 'react-bootstrap';
import useFormatDate from '../globalControl/useFormatDate';

import Link from 'next/link';
interface CatePost {
    created_at: string;
    del_flag: boolean;
    id: string;
    name_category: string;
    tags: string;
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
    slug_post: string;
    category_id: string;
    created_at: string;
    updated_at: string;
}

interface ApiPostProps {
    data: PostView[];
}

interface ApiCate<T> {
    success: string;
    data: T[];
}

const ListSingle: React.FC<ApiPostProps> = ({ data }) => {
    const [dataCatePost, setDataCatePost] = useState<ApiCate<CatePost> | null>(null);

    useEffect(() => {
        if (data && data.length > 0) {
            fetch(`/api/clientCatePost/${data.length}`)
                .then((res) => res.json())
                .then((result) => {
                    if (result) {
                        setDataCatePost(result);
                    }
                    console.log('Category list:', result);
                })
                .catch((error) => {
                    console.error('Error fetching categories:', error);
                });
        }
    }, [data]);

    return (
        <Container className="m-0">
            <Row style={{ padding: "64px 55px" }}>
                {data.map((item, index) => {
                    const category = dataCatePost?.data?.find(
                        (cate) => cate.id === item.category_id
                    );

                    return (
                        <Row key={index} className="align-items-center mb-5">
                            {/* Header row */}
                            <Row className="text-muted align-items-center">
                                <Col xs="auto" className="pb-3">
                                    <span
                                        style={{
                                            borderLeft: "2px solid black",
                                            height: "100px",
                                            marginRight: "10px",
                                        }}
                                    ></span>
                                    <Link href={`/post/${item.slug_post}`}>
                                    <span
                                        className="fw-bold fs-5 text-black"
                                        style={{ color: "#88e8f4", marginRight: "10px" }}
                                        dangerouslySetInnerHTML={{ __html: item.title_post }}
                                    /></Link>

                                    <span style={{ color: "#88e8f4", marginRight: "10px" }}>
                                        {useFormatDate(item.updated_at)}
                                    </span>
                                    <span>Tuấn Huỳnh</span>
                                </Col>
                                <Col className="text-end pb-3">
                                    <span style={{ color: "#88e8f4", marginLeft: "10px" }}>
                                        {category ? category.tags : 'No category'}
                                    </span>
                                </Col>
                            </Row>

                            {/* Left-Right Layout */}
                            {index % 2 === 0 ? (
                                <>
                                    {/* Image on the left */}
                                    <Col xs={12} lg={4} className="mb-4 mb-lg-0">
                                        <Card className="border-0 position-relative w-100 ">
                                            <Card.Img
                                                className="w-100"
                                                style={{
                                                    objectFit: "cover",
                                                    height: "144px",
                                                }}
                                                src={item.img_post}
                                                alt={item.title_post}
                                            />
                                        </Card>
                                    </Col>

                                    {/* Content on the right */}
                                    <Col xs={12} lg={8}>
                                        <Card.Text className="text-black fs-6 lh-base fw-medium text-start m-0 text-truncate" dangerouslySetInnerHTML={{ __html: item.content_post }} />
                                    </Col>
                                </>
                            ) : (
                                <>
                                    {/* Content on the left */}
                                    <Col xs={12} lg={8}>
                                        <Card.Text className="text-black fs-6 lh-base fw-medium text-start m-0 text-truncate" dangerouslySetInnerHTML={{ __html: item.content_post }} />
                                    </Col>

                                    {/* Image on the right */}
                                    <Col xs={12} lg={4} className="mb-4 mb-lg-0 ">
                                        <Card className="border-0 position-relative w-100 ">
                                            <Card.Img
                                                className="w-100"
                                                style={{
                                                    objectFit: "cover",
                                                    height: "144px",
                                                }}
                                                src={item.img_post}
                                                alt={item.title_post}
                                            />
                                        </Card>
                                    </Col>
                                </>
                            )}
                        </Row>
                    );
                })}
            </Row>
        </Container>
    );
};

export default ListSingle;
