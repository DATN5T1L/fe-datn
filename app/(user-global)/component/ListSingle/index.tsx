'use client'

import React, { useEffect, useState } from 'react'
import { Col, Card, Row, Container } from 'react-bootstrap';
import ListPostTTO from '../ListPostTTO';
import useFormatDate from '../globalControl/useFormatDate';

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

const ListSingle: React.FC<ApiPostProps> = (props) => {
    const [dataCatePost, setDataCatePost] = useState<ApiCate<CatePost> | null>(null)
    const data = props.data

    useEffect(() => {
        if (data && data.length > 0) {
            fetch(`/api/clientCatePost/${data.length}`)
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        setDataCatePost(data)
                    }
                    console.log('cate list:', data);
                })
                .catch(error => {
                    console.error('Có lỗi xảy ra: ', error);
                })
        }
    }, [data])

    console.log(dataCatePost);


    return (
        <Container className="m-0">
            <Row style={{ padding: "0 55px" }}>
                {data && data.map((item, index) => {
                    const category = dataCatePost?.data?.find(cate => cate.id === item.category_id);
                    console.log(category);
                    return (
                        <Row key={index} className="align-items-center mb-5">
                            <Row className="text-muted align-items-center">
                                <Col xs="auto" className="pb-3">
                                    <span
                                        style={{
                                            borderLeft: "2px solid black",
                                            height: "100px",
                                            marginRight: "10px",
                                        }}
                                    ></span>
                                    <span
                                        className="fw-bold fs-5 text-black"
                                        style={{ color: "#88e8f4", marginRight: "10px" }}
                                    >
                                        {item.title_post}
                                    </span>
                                    <span style={{ color: "#88e8f4", marginRight: "10px" }}>
                                        {useFormatDate(item.updated_at)}
                                    </span>
                                    <span>Tuấn Huỳnh</span>
                                </Col>
                                <Col className="text-end">
                                    <span style={{ color: "#88e8f4", marginLeft: "10px" }}>{category ? category.tags : 'No category'}</span>
                                </Col>
                            </Row>

                            {/* Left-Right Logic */}
                            {index % 2 === 0 ? (
                                <>
                                    <Col xs={12} lg={4} className="mb-4 mb-lg-0">
                                        <Card
                                            className="border-0 position-relative w-100"
                                        >
                                            <Card.Img
                                                className="w-100"
                                                style={{ objectFit: "cover", height: "144px" }}
                                                src={`${item.img_post}`}
                                                alt={`${item.title_post}`}
                                            />
                                        </Card>
                                    </Col>
                                    <Col xs={12} lg={8}>
                                        <Card.Text className="text-black fs-6 lh-base fw-medium text-start m-0">
                                            {item.content_post}
                                        </Card.Text>
                                    </Col>
                                </>
                            ) : (
                                <>
                                    <Col xs={12} lg={8}>
                                        <Card.Text className="text-black fs-6 lh-base fw-medium">
                                            {item.content_post}
                                        </Card.Text>
                                    </Col>
                                    <Col xs={12} lg={4} className="mb-4 mb-lg-0">
                                        <Card
                                            className="border-0 position-relative w-100"
                                        >
                                            <Card.Img
                                                className="w-100"
                                                style={{ height: "144px", objectFit: "cover" }}
                                                src={`${item.img_post}`}
                                                alt={`${item.title_post}`}
                                            />
                                        </Card>
                                    </Col>
                                </>
                            )}
                        </Row>
                    )
                })}
            </Row>
        </Container>


    )
}

export default ListSingle
