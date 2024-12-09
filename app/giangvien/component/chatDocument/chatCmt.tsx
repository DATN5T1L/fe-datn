'use client'

import CkediterCustom from "../globalControll/custom-editor";
import videoMod from "../Course/VideoDetail/course-video.module.css";
import { useEffect, useState } from "react";
import useCookie from "@/app/(user-global)/component/hook/useCookie";
import useFormatDate from "@/app/(user-global)/component/globalControl/useFormatDate";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import * as Yup from 'yup'
import { useFormik } from "formik";

interface IdCourse {
    id: string;
}

interface Comment {
    avatar: string;
    id: string;
    del_flag: boolean;
    comment_text: string;
    created_at: string;
    updated_at: string;
    fullname: string;
    post_id: string;
    replies: Reply[];
    role: string;
    user_id: string;
}

interface Reply {
    del_flag: boolean;
    avatar: string;
    comment_text: string;
    comment_to: string;
    created_at: string;
    fullname: string;
    id: string;
    replies: Reply[];
    role: string;
    updated_at: string;
    user_id: string;
}
interface ApiCmt<T> {
    document_id: string;
    comments: Record<string, T>;
}

const ChatCmt: React.FC<IdCourse> = ({ id }) => {
    const userState = useSelector((state: RootState) => state.user.user)
    const [dataCmt, setDataCmt] = useState<ApiCmt<Comment> | null>(null)
    const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
    const [activeReplyId__c1, setActiveReplyId__c1] = useState<string | null>(null);
    const [activeReplyId__c2, setActiveReplyId__c2] = useState<string | null>(null);
    const [valueCmt, setValueCmt] = useState<string>('')
    const [valueCmt__c1, setValueCmt__c1] = useState<string>('')
    const [valueCmt__c2, setValueCmt__c2] = useState<string>('')
    const [currentTime, setCurrentTime] = useState<string>('')
    const token = useCookie('token')
    const [isCmt, setIsCmt] = useState(false)

    const validationSchema = Yup.object({
        comment_title: Yup.string()
    })

    useEffect(() => {
        if (id && token) {
            fetch(`/api/cmtByDocument/${id}`, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data) {
                        setDataCmt(data)
                    }
                })
                .catch(error => {
                    console.error('Có lỗi xảy ra: ', error);
                })
        }
    }, [id, token])

    const handleRepCmt = (id: string) => {
        setActiveReplyId(prevId => (prevId === id ? null : id));
        if (activeReplyId__c1) {
            setActiveReplyId__c1(prevId => (prevId === id ? id : null));
        }
        if (activeReplyId__c2) {
            setActiveReplyId__c2(prevId => (prevId === id ? id : null));
        }
    }

    const handleRepCmt__c1 = (id: string) => {
        setActiveReplyId__c1(prevId => (prevId === id ? null : id));
        if (activeReplyId) {
            setActiveReplyId(prevId => (prevId === id ? id : null));
        }
        if (activeReplyId__c2) {
            setActiveReplyId__c2(prevId => (prevId === id ? id : null));
        }
    }

    const handleRepCmt__c2 = (id: string) => {
        setActiveReplyId__c2(prevId => (prevId === id ? null : id));
        if (activeReplyId__c1) {

            setActiveReplyId__c1(prevId => (prevId === id ? id : null));
        }
        if (activeReplyId) {
            setActiveReplyId(prevId => (prevId === id ? id : null));
        }
    }

    // const formik = useFormik({
    //     initialValues: {
    //         comment_title: '',
    //         comment_text: '',
    //     },
    //     validationSchema,
    //     onSubmit: async (values) => {
    //         const res = await fetch(`/api/repCmt/${id}/`)
    //     }
    // })

    const handleFetchCmt = (idCmt: string) => {
        if (idCmt && token && id && currentTime) {
            fetch(`/api/repCmt/${id}/${idCmt}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ comment_title: `Câu hỏi lúc ${currentTime}`, comment_text: valueCmt })
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                })
                .catch(error => {
                    console.error('Có lỗi xảy ra: ', error);
                })
        }
    }


    const handleGetTime = () => {
        const now = new Date();
        const options: Intl.DateTimeFormatOptions = {
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Asia/Ho_Chi_Minh',
        };
        const timeInVietnam = new Intl.DateTimeFormat('vi-VN', options).format(now);
        setCurrentTime(timeInVietnam);
    };

    return (
        <>
            <div className={videoMod.box__chat__container}>
                {dataCmt && dataCmt.comments && Object.values(dataCmt.comments).map((item, index) => (
                    <div key={index} className={videoMod.left__line}>
                        <div className={videoMod.cmt__container}>
                            <div className={videoMod.cmt__container__header}>
                                <img src={`${item.avatar}`} alt="icon-user" className={videoMod.cmt__container__avt} />
                                <div className={videoMod.cmt__container__header__groupTitle}>
                                    <div className={videoMod.cmt__container__header__title}>
                                        {item.fullname}
                                    </div>
                                    <div className={videoMod.cmt__container__header__subtitle}>
                                        vào lúc {' '}{useFormatDate(item.created_at)}
                                    </div>
                                </div>
                            </div>
                            <div className={videoMod.cmt__container__content}>
                                <div
                                    dangerouslySetInnerHTML={{ __html: item.comment_text }}
                                ></div>
                            </div>
                            <div className={videoMod.cmt__container__setting}>
                                <div className={videoMod.cmt__container__sevice}>
                                    <img src="/img/boxHollow.svg" alt="" className={videoMod.cmt__container__sevice__icon} />
                                </div>
                                <div className={videoMod.cmt__container__sevice}>
                                    <img src="/img/action.svg" alt="" className={videoMod.cmt__container__sevice__icon} />
                                </div>
                                <div className={videoMod.cmt__container__sevice} onClick={() => handleRepCmt(item.id)}>
                                    <img src="/img/replyCmt.svg" alt="" className={videoMod.cmt__container__sevice__icon} />
                                </div>
                            </div>
                        </div>
                        <div className={`${activeReplyId === item.id ? videoMod.repCmt__container : videoMod.repCmt__container__hidden}`}>
                            <div className={videoMod.repCmt__avt__ctn}>
                                <img src={`${userState?.avatar}`} alt="icon-user" className={videoMod.repCmt__avt} />
                            </div>
                            <form className={videoMod.repCmt__form} onSubmit={() => handleFetchCmt(item.id)}>
                                <CkediterCustom
                                    initialData={valueCmt}
                                    onChange={(e) => setValueCmt(e)}
                                ></CkediterCustom>
                                <div className={videoMod.repCmt__form__sevice}>
                                    <button className={videoMod.repCmt__form__sevice__active}>Hủy</button>
                                    <button className={videoMod.repCmt__form__sevice__active} type="submit" onClick={() => handleGetTime()}>Trả lời</button>
                                </div>
                            </form>
                        </div>

                        {item.replies?.map((rep, indexRep) => (
                            <div key={indexRep} className={videoMod.left__line__c1}>
                                <div className={videoMod.cmt__container__c1}>
                                    <div className={videoMod.cmt__container__header}>
                                        <img src={`${rep.avatar}`} alt="icon-user" className={videoMod.cmt__container__avt} />
                                        <div className={videoMod.cmt__container__header__groupTitle}>
                                            <div className={videoMod.cmt__container__header__title}>
                                                {rep.fullname}
                                            </div>
                                            <div className={videoMod.cmt__container__header__subtitle}>
                                                vào lúc {' '}{useFormatDate(rep.created_at)}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={videoMod.cmt__container__content}>
                                        <div
                                            dangerouslySetInnerHTML={{ __html: rep.comment_text }}
                                        ></div>
                                    </div>
                                    <div className={videoMod.cmt__container__setting}>
                                        <div className={videoMod.cmt__container__sevice}>
                                            <img src="/img/boxHollow.svg" alt="" className={videoMod.cmt__container__sevice__icon} />
                                        </div>
                                        <div className={videoMod.cmt__container__sevice}>
                                            <img src="/img/action.svg" alt="" className={videoMod.cmt__container__sevice__icon} />
                                        </div>
                                        <div className={videoMod.cmt__container__sevice} onClick={() => handleRepCmt__c1(rep.id)}>
                                            <img src="/img/replyCmt.svg" alt="" className={videoMod.cmt__container__sevice__icon} />
                                        </div>
                                    </div>
                                </div>
                                <div className={`${activeReplyId__c1 === rep.id ? videoMod.repCmt__container : videoMod.repCmt__container__hidden}`}>
                                    <div className={videoMod.repCmt__avt__ctn}>
                                        <img src={`${userState?.avatar}`} alt="icon-user" className={videoMod.repCmt__avt} />
                                    </div>
                                    <div className={videoMod.repCmt__form}>
                                        <CkediterCustom
                                            initialData={valueCmt__c1}
                                            onChange={(e) => setValueCmt__c1(e)}
                                        ></CkediterCustom>
                                        <div className={videoMod.repCmt__form__sevice}>
                                            <button className={videoMod.repCmt__form__sevice__active}>Hủy</button>
                                            <button className={videoMod.repCmt__form__sevice__active}>Trả lời</button>
                                        </div>
                                    </div>
                                </div>
                                {rep?.replies?.map((rely, indexRely) => (
                                    <div key={indexRely} className={videoMod.left__line__c2}>
                                        <div className={videoMod.cmt__container__c2}>
                                            <div className={videoMod.cmt__container__header}>
                                                <img src={`${rely.avatar}`} alt="icon-user" className={videoMod.cmt__container__avt} />
                                                <div className={videoMod.cmt__container__header__groupTitle}>
                                                    <div className={videoMod.cmt__container__header__title}>
                                                        {rely.fullname}
                                                    </div>
                                                    <div className={videoMod.cmt__container__header__subtitle}>
                                                        vào lúc {' '}{useFormatDate(rely.created_at)}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={videoMod.cmt__container__content}>
                                                <div
                                                    dangerouslySetInnerHTML={{ __html: rely.comment_text }}
                                                ></div>
                                            </div>
                                            <div className={videoMod.cmt__container__setting}>
                                                <div className={videoMod.cmt__container__sevice}>
                                                    <img src="/img/boxHollow.svg" alt="" className={videoMod.cmt__container__sevice__icon} />
                                                </div>
                                                <div className={videoMod.cmt__container__sevice}>
                                                    <img src="/img/action.svg" alt="" className={videoMod.cmt__container__sevice__icon} />
                                                </div>
                                                <div className={videoMod.cmt__container__sevice} onClick={() => handleRepCmt__c2(rely.id)}>
                                                    <img src="/img/replyCmt.svg" alt="" className={videoMod.cmt__container__sevice__icon} />
                                                </div>
                                            </div>
                                        </div>
                                        <div className={`${activeReplyId__c2 === rely.id ? videoMod.repCmt__container : videoMod.repCmt__container__hidden}`}>
                                            <div className={videoMod.repCmt__avt__ctn}>
                                                <img src={`${userState?.avatar}`} alt="icon-user" className={videoMod.repCmt__avt} />
                                            </div>
                                            <div className={videoMod.repCmt__form}>
                                                <CkediterCustom
                                                    initialData={valueCmt__c2}
                                                    onChange={(e) => setValueCmt__c2(e)}
                                                ></CkediterCustom>
                                                <div className={videoMod.repCmt__form__sevice}>
                                                    <button className={videoMod.repCmt__form__sevice__active}>Hủy</button>
                                                    <button className={videoMod.repCmt__form__sevice__active}>Trả lời</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                ))}

            </div>
        </>
    )
}

export default ChatCmt