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
    comment_title: string;
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
    comment_title: string;
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
    const [activeReplyIdBoss, setActiveReplyIdBoss] = useState<string | null>(null);
    const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
    const [activeReplyId__c1, setActiveReplyId__c1] = useState<string | null>(null);
    const [activeReplyId__c2, setActiveReplyId__c2] = useState<string | null>(null);
    const [valueCmtBoss, setValueCmtBoss] = useState<string>('')
    const [valueCmt, setValueCmt] = useState<string>('')
    const [valueCmt__c1, setValueCmt__c1] = useState<string>('')
    const [valueCmt__c2, setValueCmt__c2] = useState<string>('')
    const [currentTime, setCurrentTime] = useState<string>('')
    const token = useCookie('token')
    const [isCmt, setIsCmt] = useState(false)

    const countTotalComments = (comments: Comment[]): number => {
        const countReplies = (replies: Reply[]): number => {
            return replies.reduce((acc, reply) => {
                return acc + 1 + countReplies(reply.replies);
            }, 0);
        };
        return comments.reduce((acc, comment) => {
            return acc + 1 + countReplies(comment.replies);
        }, 0);
    };

    const validationSchema = Yup.object({
        comment_title: Yup.string()
    })

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

    const reloadDataCmt = () => {
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
    }

    useEffect(() => {
        if (id && token) {
            reloadDataCmt()
        }
    }, [id, token])

    const handleRepCmt = (id: string) => {
        setActiveReplyId(prevId => (prevId === id ? null : id));
        if (activeReplyId__c1) {
            setActiveReplyId__c1(prevId => (prevId === id ? id : null));
            setValueCmt__c1('')
        }
        if (activeReplyId__c2) {
            setActiveReplyId__c2(prevId => (prevId === id ? id : null));
            setValueCmt__c2('')
        }
    }

    const handleRepCmt__c1 = (id: string) => {
        setActiveReplyId__c1(prevId => (prevId === id ? null : id));
        if (activeReplyId) {
            setActiveReplyId(prevId => (prevId === id ? id : null));
            setValueCmt('')
        }
        if (activeReplyId__c2) {
            setActiveReplyId__c2(prevId => (prevId === id ? id : null));
            setValueCmt__c2('')
        }
    }

    const handleRepCmt__c2 = (id: string) => {
        setActiveReplyId__c2(prevId => (prevId === id ? null : id));
        if (activeReplyId__c1) {
            setValueCmt__c1('')
            setActiveReplyId__c1(prevId => (prevId === id ? id : null));
        }
        if (activeReplyId) {
            setValueCmt('')
            setActiveReplyId(prevId => (prevId === id ? id : null));
        }
    }

    const handleFetchCmtBoss = () => {
        handleGetTime()
        console.log(currentTime);

        if (confirm('Bạn có muốn thêm bình luận này không?')) {
            if (token && id) {
                fetch(`/api/repCmt/${id}`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ comment_title: `Câu hỏi lúc ${currentTime}`, comment_text: valueCmtBoss })
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        setValueCmtBoss('')
                        if (data.message === 'Bình luận đã được thêm thành công.') {
                            alert('Đã thêm bình luận thành công')
                        }
                        reloadDataCmt()
                    })
                    .catch(error => {
                        console.error('Có lỗi xảy ra: ', error);
                    })
            }
        }
    }


    const handleFetchCmt = (idCmt: string) => {
        console.log('idCmt', idCmt);

        handleGetTime()
        console.log(currentTime);

        if (confirm('Bạn có muốn thêm bình luận này không?')) {
            if (idCmt && token && id) {
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
                        setValueCmt('')
                        setActiveReplyId(null)
                        if (data.message === 'Bình luận đã được thêm thành công.') {
                            alert('Đã thêm bình luận thành công')
                        }
                        reloadDataCmt()
                    })
                    .catch(error => {
                        console.error('Có lỗi xảy ra: ', error);
                    })
            }
        }
    }

    const handleFetchCmt__c1 = (idCmt: string) => {
        console.log('idCmt', idCmt);

        handleGetTime()
        console.log(currentTime);

        if (confirm('Bạn có muốn thêm bình luận này không?')) {
            if (idCmt && token && id) {
                fetch(`/api/repCmt/${id}/${idCmt}`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ comment_title: `Câu hỏi lúc ${currentTime}`, comment_text: valueCmt__c1 })
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        setValueCmt__c1('')
                        setActiveReplyId__c1(null)
                        if (data.message === 'Bình luận đã được thêm thành công.') {
                            alert('Đã thêm bình luận thành công')
                        }
                        reloadDataCmt()
                    })
                    .catch(error => {
                        console.error('Có lỗi xảy ra: ', error);
                    })
            }
        }
    }

    const handleFetchCmt__c2 = (idCmt: string) => {
        console.log('idCmt', idCmt);

        handleGetTime()
        console.log(currentTime);

        if (confirm('Bạn có muốn thêm bình luận này không?')) {
            if (idCmt && token && id) {
                fetch(`/api/repCmt/${id}/${idCmt}`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ comment_title: `Câu hỏi lúc ${currentTime}`, comment_text: valueCmt__c2 })
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        setValueCmt__c2('')
                        setActiveReplyId__c2(null)
                        if (data.message === 'Bình luận đã được thêm thành công.') {
                            alert('Đã thêm bình luận thành công')
                        }
                        reloadDataCmt()
                    })
                    .catch(error => {
                        console.error('Có lỗi xảy ra: ', error);
                    })
            }
        }
    }

    const handleDeleteCmt = (id: string, cmtId: string) => {
        if (token && id && cmtId) {
            if ((confirm('Bạn có muốn xóa bình luận này không?'))) {
                fetch(`/api/deleteCmtDoc/${id}/${cmtId}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        reloadDataCmt()
                    })
                    .catch(error => {
                        console.error('có lỗi xảy ra: ', error);
                    })
            }
        }
    }

    const handleHiddenCmt = (id: string, cmtId: string) => {
        if (token && id && cmtId) {
            if ((confirm('Bạn có muốn ẩn bình luận này không?'))) {
                fetch(`/api/hiddenCmtDoc/${id}/${cmtId}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        reloadDataCmt()
                    })
                    .catch(error => {
                        console.error('có lỗi xảy ra: ', error);
                    })
            }
        }
    }

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
                                        {item.comment_title}
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
                                    <img src="/img_admin/action2.svg" alt="" className={videoMod.cmt__container__sevice__icon} />
                                </div>
                                <div
                                    onClick={() => {
                                        if (item.user_id === userState?.id) {
                                            handleDeleteCmt(id, item.id)
                                        } else {
                                            handleHiddenCmt(id, item.id)
                                        }
                                    }}
                                    className={videoMod.cmt__container__sevice}
                                >
                                    {item.user_id === userState?.id ? (
                                        <img src="/img/deleteMessage.svg" alt="" className={videoMod.cmt__container__sevice__icon} />
                                    ) : (
                                        <img src="/img/action.svg" alt="" className={videoMod.cmt__container__sevice__icon} />
                                    )}
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
                            <div className={videoMod.repCmt__form}>
                                <CkediterCustom
                                    initialData={valueCmt}
                                    onChange={(e) => setValueCmt(e)}
                                ></CkediterCustom>
                                <div className={videoMod.repCmt__form__sevice}>
                                    <button className={videoMod.repCmt__form__sevice__active}>Hủy</button>
                                    <button className={videoMod.repCmt__form__sevice__active} onClick={() => handleFetchCmt(item.id)}>Trả lời</button>
                                </div>
                            </div>
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
                                                {rep.comment_title}
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
                                            <img src="/img_admin/action2.svg" alt="" className={videoMod.cmt__container__sevice__icon} />
                                        </div>
                                        <div
                                            onClick={() => {
                                                if (rep.user_id === userState?.id) {
                                                    handleDeleteCmt(id, rep.id)
                                                } else {
                                                    handleHiddenCmt(id, rep.id)
                                                }
                                            }}
                                            className={videoMod.cmt__container__sevice}
                                        >
                                            {rep.user_id === userState?.id ? (
                                                <img src="/img/deleteMessage.svg" alt="" className={videoMod.cmt__container__sevice__icon} />
                                            ) : (
                                                <img src="/img/action.svg" alt="" className={videoMod.cmt__container__sevice__icon} />
                                            )}
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
                                            <button className={videoMod.repCmt__form__sevice__active} onClick={() => handleFetchCmt__c1(rep.id)}>Trả lời</button>
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
                                                        {rely.comment_title}
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
                                                    <img src="/img_admin/action2.svg" alt="" className={videoMod.cmt__container__sevice__icon} />
                                                </div>
                                                <div
                                                    onClick={() => {
                                                        if (rely.user_id === userState?.id) {
                                                            handleDeleteCmt(id, rely.id)
                                                        } else {
                                                            handleHiddenCmt(id, rely.id)
                                                        }
                                                    }}
                                                    className={videoMod.cmt__container__sevice}
                                                >
                                                    {rely.user_id === userState?.id ? (
                                                        <img src="/img/deleteMessage.svg" alt="" className={videoMod.cmt__container__sevice__icon} />
                                                    ) : (
                                                        <img src="/img/action.svg" alt="" className={videoMod.cmt__container__sevice__icon} />
                                                    )}
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
                                                    <button className={videoMod.repCmt__form__sevice__active} onClick={() => { handleFetchCmt__c2(rely.id) }}>Trả lời</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                ))}
            </div >
            <div className={`${videoMod.repCmt__container__boss}`}>
                <div className={videoMod.repCmt__avt__ctn}>
                    <img src={`${userState?.avatar}`} alt="icon-user" className={videoMod.repCmt__avt} />
                </div>
                <div className={videoMod.repCmt__form}>
                    <CkediterCustom
                        initialData={valueCmtBoss}
                        onChange={(e) => setValueCmtBoss(e)}
                    ></CkediterCustom>
                    <div className={videoMod.repCmt__form__sevice}>
                        <button className={videoMod.repCmt__form__sevice__active} onClick={() => setValueCmtBoss('')}>Hủy</button>
                        <button className={videoMod.repCmt__form__sevice__active} onClick={() => handleFetchCmtBoss()}>Trả lời</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatCmt