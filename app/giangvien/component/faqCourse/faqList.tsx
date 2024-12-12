'use client'
import { Accordion, Button, Stack } from "react-bootstrap";
import videoMod from "../Course/VideoDetail/course-video.module.css";
import { PlayCircle } from "react-bootstrap-icons";
import useCookie from "@/app/(user-global)/component/hook/useCookie";
import { useEffect, useState } from "react";

interface FaqListProps {
    id: string
}

interface Faq {
    id: string;
    question_faq: string;
    answer_faq: string;
    course_id: string;
    created_at: string;
    updated_at: string;
    del_flag: boolean;
}

interface ApiRes<T> {
    status: string;
    data: Record<string, T>
}

const FaqList: React.FC<FaqListProps> = (props) => {
    const token = useCookie('token')
    const id = props.id
    const [dataFaq, setDataFaq] = useState<ApiRes<Faq> | null>(null)

    useEffect(() => {
        if (token && id) {
            fetch(`/api/faqCourse/${id}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log('faq: ', data);
                    if (data.status === 'success') {
                        setDataFaq(data)
                    }
                })
        }
    }, [token, id])

    return (
        <>
            <div className={videoMod.FAQ__body}>
                <Accordion defaultActiveKey={["0"]} alwaysOpen>
                    {dataFaq && Object.values(dataFaq?.data)?.map((item, index) => (
                        <Accordion.Item eventKey={`${item.id}`} key={index}>
                            <Accordion.Header>
                                <div className="d-flex flex-column">
                                    <span className="fw-bold">{index + 1}. {item.question_faq}</span>
                                </div>
                            </Accordion.Header>
                            <Accordion.Body className="p-0">
                                <Stack gap={2}>
                                    <Button variant="outline" className={`${videoMod.chapterBtn}`}>
                                        <div className="d-flex align-items-center gap-2">
                                            <div
                                                className={`${videoMod.accordionChapter} d-flex flex-column align-items-start text-muted`}
                                            >
                                                <span className={videoMod.textFaqList}>{item.answer_faq}</span>
                                            </div>
                                        </div>
                                    </Button>
                                </Stack>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </div>
        </>
    )
}

export default FaqList