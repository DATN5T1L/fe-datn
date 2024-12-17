'use client';

import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import Head from 'next/head';
import Body from '../../component/globalControl/body';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';
import Link from 'next/link';

const useFormatDate = (dateString: string): string => {
    try {
        const options: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        };
        return new Date(dateString).toLocaleDateString('vi-VN', options);
    } catch {
        return 'Ngày không hợp lệ';
    }
};

interface Post {
    id: string;
    title_post: string;
    slug_post: string;
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

const ListPostTTO: React.FC<ListPostTTOProps> = ({ data, step }) => {
    const listCount = step === '1' ? 2 : 3;
    return (
        <Col xs={12} className="d-flex flex-column text-truncate">
            {data.slice(0, listCount).map((item, index) => (
                <Card key={index} className="mb-4 border-0 text-truncate" style={{ height: '100%' }}>
                    <Row className="g-2" style={{ height: '130px' }}>
                        {/* Left column with image */}
                        <Col xs={6} className="d-flex align-items-stretch justify-content-end text-truncate">
                            <Card.Img
                                style={{ width: '240px', height: '144px', objectFit: 'cover' }}
                                src={item.img_post}
                                alt={item.title_post}
                            />
                        </Col>
                        {/* Right column with text */}
                        <Col xs={6} className="d-flex flex-column justify-content-between text-truncate">
                            <Card.Body className="p-0" style={{ margin: '0 12px', flex: 1 }}>
                                <Link href={`posts/${item.slug_post}`}>
                                    <Card.Title
                                        className="h6 fw-semibold"
                                        dangerouslySetInnerHTML={{ __html: item.title_post }}
                                    />
                                </Link>
                                <Card.Text
                                    className="text-black fs-6 lh-base fw-medium text-truncate"
                                    style={{
                                        display: '-webkit-box',
                                        WebkitBoxOrient: 'vertical',
                                        WebkitLineClamp: 4,
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        maxHeight: '6rem',
                                    }}
                                    dangerouslySetInnerHTML={{ __html: item.content_post }}
                                />
                            </Card.Body>
                            <Row
                                className="text-muted align-items-center text-truncate"
                                style={{ fontSize: '0.8rem', padding: '0px 12px' }}
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

const PostDetail: React.FC<{ params: { id: string } }> = ({ params }) => {
    const { id } = params;

    const [loading, setLoading] = useState(true);
    const [postData, setPostData] = useState<Post[] | null>(null);

    const fetchPostData = async (slug: string) => {
        try {
            setLoading(true);
            const res = await fetch(
                `https://tto-production-db77.up.railway.app/api/client/get-post-to-engarang/${slug}/`
            );
            if (!res.ok) throw new Error('Lỗi khi lấy dữ liệu bài viết');
            const data = await res.json();
            console.log(data);
            setPostData(data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log('Slug:', id);
        if (id) fetchPostData(id);
    }, [id]);

    return (
        <Body>
            {postData && (
                <>
                    <Head>
                        <title>{postData[0].title_post || 'Chi tiết bài viết'}</title>
                        <meta
                            name="description"
                            content={
                                postData[0]?.content_post?.substring(0, 160) ||
                                'Chi tiết bài viết trên trang của chúng tôi'
                            }
                        />
                    </Head>
                    <Container
                        className="mt-4"
                        style={{ background: '#f9f9f9', padding: '20px', borderRadius: '8px' }}
                    >
                        <Row className="w-100">
                            {/* Cột bài viết chính */}
                            <Col
                                md={8}
                                style={{
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                    padding: '15px',
                                    backgroundColor: '#fff',
                                    borderRadius: '8px',
                                }}
                            >
                                {loading ? (
                                    <div
                                        className="d-flex justify-content-center align-items-center"
                                        style={{ minHeight: '200px' }}
                                    >
                                        <Spinner animation="border" role="status">
                                            <span className="visually-hidden">Đang tải...</span>
                                        </Spinner>
                                    </div>
                                ) : postData ? (
                                    <Card
                                        className="mb-4 shadow-sm"
                                        style={{
                                            border: '1px solid #e2e8f0',
                                            borderRadius: '8px',
                                        }}
                                    >
                                        <Card.Img
                                            variant="top"
                                            src={postData[0].img_post || '/placeholder.jpg'}
                                            alt={postData[0].title_post}
                                            style={{
                                                borderRadius: '8px 8px 0 0',
                                                maxHeight: '300px',
                                                objectFit: 'cover',
                                            }}
                                        />
                                        <Card.Body>
                                            <Card.Title
                                                style={{
                                                    fontSize: '24px',
                                                    color: '#2c5282',
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                {postData[0].title_post}
                                            </Card.Title>
                                            <Card.Text
                                                className="text-muted mb-2"
                                                style={{
                                                    fontSize: '14px',
                                                    lineHeight: '1.5',
                                                    marginBottom: '20px',
                                                }}
                                            >
                                                <strong>Tác giả:</strong> {postData[0].poster_id || 'Không rõ'} <br />
                                                <strong>Ngày viết:</strong>{' '}
                                                {new Date(postData[0].created_at).toLocaleDateString('vi-VN') ||
                                                    'Không rõ'}
                                            </Card.Text>
                                            <Card.Text
                                                style={{
                                                    color: '#4a5568',
                                                    lineHeight: '1.8',
                                                    fontSize: '16px',
                                                }}
                                                dangerouslySetInnerHTML={{
                                                    __html: postData[0].content_post || 'Không có nội dung.',
                                                }}
                                            />
                                        </Card.Body>
                                    </Card>
                                ) : (
                                    <div
                                        className="d-flex justify-content-center align-items-center"
                                        style={{ minHeight: '200px' }}
                                    >
                                        <p style={{ color: '#e53e3e', fontWeight: 'bold' }}>
                                            Không tìm thấy bài viết.
                                        </p>
                                    </div>
                                )}
                            </Col>

                            {/* Cột bài viết liên quan */}
                            <Col md={4}>
                                <h5 style={{ fontWeight: 'bold', marginBottom: '50px', fontSize:'40px', textAlign:'center' }}>
                                    Bài viết liên quan
                                </h5>
                                <ListPostTTO data={postData.slice(1, 4)} step="1" />
                            </Col>
                        </Row>
                    </Container>
                </>
            )}
        </Body>
    );
};

export default PostDetail;
