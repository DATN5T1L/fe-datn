'use client'

import videoMod from "../Course/VideoDetail/course-video.module.css";
import { useEffect, useMemo, useState } from "react";
import useCookie from "@/app/(user-global)/component/hook/useCookie";
import useFormatDate from "@/app/(user-global)/component/globalControl/useFormatDate";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import * as Yup from 'yup'
import { useFormik } from "formik";
import dynamic from 'next/dynamic';
import Notification from "@/app/(user-global)/component/globalControl/Notification";
import { type } from "os";
import CustomJoditEditor from "@/app/componentGlobal/ckeditor/customEditor";

interface IdCourse {
    id: string;
    onUpdateTotalComments: (count: number) => void;
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

const ChatCmt: React.FC<IdCourse> = ({ id, onUpdateTotalComments }) => {
    const userState = useSelector((state: RootState) => state.user.user)
    const [dataCmt, setDataCmt] = useState<ApiCmt<Comment> | null>(null)
    const [activeReplyIdBoss, setActiveReplyIdBoss] = useState<boolean>(false);
    const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
    const [activeReplyId__c1, setActiveReplyId__c1] = useState<string | null>(null);
    const [activeReplyId__c2, setActiveReplyId__c2] = useState<string | null>(null);
    const [valueCmtBoss, setValueCmtBoss] = useState<string>('')
    const [valueCmt, setValueCmt] = useState<string>('')
    const [valueCmt__c1, setValueCmt__c1] = useState<string>('')
    const [valueCmt__c2, setValueCmt__c2] = useState<string>('')
    const [currentTime, setCurrentTime] = useState<string>('')
    const [editCmt, setEditCmt] = useState(false)
    const [editCmt__c1, setEditCmt__c1] = useState(false)
    const [editCmt__c2, setEditCmt__c2] = useState(false)
    const [idCmtChange, setIdCmtChange] = useState<string>("")
    const token = useCookie('token')
    const [notification, setNotification] = useState<{
        status: 'error' | 'success' | 'fail' | 'complete';
        message: string;
        type: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
    } | null>(null);

    const [loadingCmt, setIsLoadingCmt] = useState<boolean>(false)

    const [isCmt, setIsCmt] = useState(false)

    const countTotalComments = (comments: Comment[] | undefined): number => {
        if (!comments || comments.length === 0) return 0;
        const countReplies = (replies: Reply[] | undefined): number =>
            (replies || []).reduce(
                (acc, reply) => acc + 1 + countReplies(reply.replies || []),
                0
            );
        return comments.reduce(
            (acc, comment) => acc + 1 + countReplies(comment.replies || []),
            0
        );
    };


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
        setIsLoadingCmt(true)
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
                        const total = countTotalComments(Object.values(data.comments));
                        onUpdateTotalComments(total);
                        setIsLoadingCmt(false)
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

    const handleRepCmtBoss = () => {
        setActiveReplyIdBoss(true)
        if (activeReplyId) {
            setActiveReplyId(null);
            setValueCmt('')
        }
        if (activeReplyId__c1) {
            setActiveReplyId__c1(null);
            setValueCmt__c1('')
        }
        if (activeReplyId__c2) {
            setActiveReplyId__c2(null);
            setValueCmt__c2('')
        }
    }

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
        if (activeReplyIdBoss) {
            setActiveReplyIdBoss(false);
            setValueCmtBoss('')
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
        if (activeReplyIdBoss) {
            setActiveReplyIdBoss(false);
            setValueCmtBoss('')
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
        if (activeReplyIdBoss) {
            setActiveReplyIdBoss(false);
            setValueCmtBoss('')
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
                        setActiveReplyIdBoss(false)
                        if (data.message === 'Bình luận đã được thêm thành công.') {
                            setNotification({
                                status: 'success',
                                message: data.message,
                                type: 'bottom-right',
                            });
                            setTimeout(() => {
                                setNotification(null);
                            }, 3000);
                        }
                        reloadDataCmt()
                    })
                    .catch(error => {
                        console.error('Có lỗi xảy ra: ', error);
                        setNotification({
                            status: 'error',
                            message: error.message,
                            type: 'bottom-right',
                        });
                        setTimeout(() => {
                            setNotification(null);
                        }, 3000);
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
                            setNotification({
                                status: 'success',
                                message: data.message,
                                type: 'bottom-right',
                            });
                            setTimeout(() => {
                                setNotification(null);
                            }, 3000);
                        }
                        reloadDataCmt()
                    })
                    .catch(error => {
                        console.error('Có lỗi xảy ra: ', error);
                        setNotification({
                            status: 'error',
                            message: error.message,
                            type: 'bottom-right',
                        });
                        setTimeout(() => {
                            setNotification(null);
                        }, 3000);
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
                            setNotification({
                                status: 'success',
                                message: data.message,
                                type: 'bottom-right',
                            });
                            setTimeout(() => {
                                setNotification(null);
                            }, 3000);
                        }
                        reloadDataCmt()
                    })
                    .catch(error => {
                        console.error('Có lỗi xảy ra: ', error);
                        setNotification({
                            status: 'error',
                            message: error.message,
                            type: 'bottom-right',
                        });
                        setTimeout(() => {
                            setNotification(null);
                        }, 3000);
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
                            setNotification({
                                status: 'success',
                                message: data.message,
                                type: 'bottom-right',
                            });
                            setTimeout(() => {
                                setNotification(null);
                            }, 3000);
                        }
                        reloadDataCmt()
                    })
                    .catch(error => {
                        console.error('Có lỗi xảy ra: ', error);
                        setNotification({
                            status: 'error',
                            message: error.message,
                            type: 'bottom-right',
                        });
                        setTimeout(() => {
                            setNotification(null);
                        }, 3000);
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
                        setNotification({
                            status: 'success',
                            message: data.message,
                            type: 'bottom-right',
                        });
                        setTimeout(() => {
                            setNotification(null);
                        }, 3000);
                        reloadDataCmt()
                    })
                    .catch(error => {
                        console.error('có lỗi xảy ra: ', error);
                        setNotification({
                            status: 'error',
                            message: error.message,
                            type: 'bottom-right',
                        });
                        setTimeout(() => {
                            setNotification(null);
                        }, 3000);
                    })
            }
        }
    }

    const handleHiddenCmt = (id: string, cmtId: string) => {
        if (token && id && cmtId) {
            if ((confirm('Bạn có muốn thay đổi trạng thái của bình luận này không?'))) {
                fetch(`/api/hiddenCmtDoc/${id}/${cmtId}`, {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        setNotification({
                            status: 'success',
                            message: data.message,
                            type: 'bottom-right',
                        });
                        setTimeout(() => {
                            setNotification(null);
                        }, 3000);
                        reloadDataCmt()
                    })
                    .catch(error => {
                        setNotification({
                            status: 'error',
                            message: error.message,
                            type: 'bottom-right',
                        });
                        setTimeout(() => {
                            setNotification(null);
                        }, 3000);
                        console.error('có lỗi xảy ra: ', error);
                    })
            }
        }
    }

    const handleChangeCmt = (id: string) => {
        handleGetTime()
        if (token && id && dataCmt && dataCmt.comments && editCmt) {
            const cmtEdit = Object.values(dataCmt.comments).find(item => item.id === id)
            if (cmtEdit) {
                setValueCmt(cmtEdit?.comment_text || '')
                setActiveReplyId(id)
                setActiveReplyIdBoss(false)
                setValueCmtBoss('')
                setActiveReplyId__c1(null)
                setActiveReplyId__c2(null)
                setValueCmt__c1('')
                setValueCmt__c2('')
            }
        }
        if (token && id && dataCmt && dataCmt.comments && editCmt__c1) {
            const cmtEdit__c1 = Object.values(dataCmt.comments)
                .map(item => item.replies)
                .flat()
                .find(item => item.id === id)
            if (cmtEdit__c1) {
                setValueCmt__c1(cmtEdit__c1?.comment_text || '')
                setActiveReplyId__c1(id)
                setActiveReplyIdBoss(false)
                setValueCmtBoss('')
                setActiveReplyId(null)
                setActiveReplyId__c2(null)
                setValueCmt('')
                setValueCmt__c2('')
            }
        }
        if (token && id && dataCmt && dataCmt.comments && editCmt__c2) {
            const cmtEdit__c2 = Object.values(dataCmt.comments)
                .map(item => item.replies)
                .flat()
                .map(item__c1 => item__c1.replies)
                .flat()
                .find(item => item.id === id)

            if (cmtEdit__c2) {
                setValueCmt__c2(cmtEdit__c2?.comment_text || '')
                setActiveReplyId__c2(id)
                setActiveReplyIdBoss(false)
                setValueCmtBoss('')
                setActiveReplyId(null)
                setActiveReplyId__c1(null)
                setValueCmt('')
                setValueCmt__c1('')
            }
        }
    }

    const handleFetchChangeCmt = (idCmt: string) => {
        handleGetTime()
        if (id && token && idCmt) {
            if (editCmt || editCmt__c1 || editCmt__c2) {
                if (confirm('Bạn có muốn thay đổi bình luận này không'))
                    fetch(`/api/updateCmtDoc/${id}/${idCmt}`, {
                        method: 'PATCH',
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            comment_title: `Câu hỏi lúc ${currentTime}`,
                            comment_text: editCmt ? valueCmt : editCmt__c1 ? valueCmt__c1 : valueCmt__c2
                        })
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            setActiveReplyId(null)
                            setActiveReplyId__c1(null)
                            setActiveReplyId__c2(null)
                            setValueCmt('')
                            setValueCmt__c1('')
                            setValueCmt__c2('')
                            setEditCmt(false)
                            setEditCmt__c1(false)
                            setEditCmt__c2(false)
                            setIdCmtChange('')
                            reloadDataCmt()
                            setNotification({
                                status: 'success',
                                message: data.message,
                                type: 'bottom-right',
                            });
                            setTimeout(() => {
                                setNotification(null);
                            }, 3000);
                        })
                        .catch(error => {
                            setNotification({
                                status: 'error',
                                message: error.message,
                                type: 'bottom-right',
                            });
                            setTimeout(() => {
                                setNotification(null);
                            }, 3000);
                        })
            }
        }
    }

    useEffect(() => {
        if (idCmtChange) {
            handleChangeCmt(idCmtChange)
        }
    }, [idCmtChange])

    const renderNotification = useMemo(() => {
        const notify = []
        if (notification) {
            notify.push(
                <Notification
                    type={notification.status}
                    message={notification.message}
                    position={notification.type}
                />
            )
        }
        return notify
    }, [notification])

    return (
        <>
            {renderNotification}
            <div className={videoMod.box__chat__container}>
                {loadingCmt ? (<>
                    <div className={videoMod.left__line}>
                        <div className={videoMod.cmt__container__loading}>
                            <div className={videoMod.loading__light}></div>
                            <div className={videoMod.cmt__container__header}>
                                <div className={videoMod.cmt__container__avt__loading} />
                                <div className={videoMod.cmt__container__header__groupTitle}>
                                    <div className={videoMod.cmt__container__header__title__loading}>
                                    </div>
                                    <div className={videoMod.cmt__container__header__subtitle__loading}>
                                    </div>
                                </div>
                            </div>
                            <div className={videoMod.cmt__container__content__loading}>
                                <p className={videoMod.contentLoading}></p>
                            </div>
                            <div className={`${videoMod.cmt__container__setting}`}>
                                <div
                                    className={videoMod.cmt__container__sevice}>
                                    <div className={videoMod.cmt__container__sevice__icon__loading} />
                                </div>
                                <div
                                    className={videoMod.cmt__container__sevice}
                                >
                                    <div className={videoMod.cmt__container__sevice__icon__loading} />
                                </div>
                                <div className={videoMod.cmt__container__sevice}>
                                    <div className={videoMod.cmt__container__sevice__icon__loading} />
                                </div>
                            </div>
                        </div>
                    </div>
                </>) : (<>
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
                                <div className={`${item.user_id === userState?.id ? videoMod.cmt__container__setting : videoMod.cmt__container__setting1}`}>
                                    {item.user_id === userState?.id ? (
                                        <div
                                            className={videoMod.cmt__container__sevice}
                                            onClick={() => {
                                                setEditCmt(true)
                                                if (editCmt__c1) {
                                                    setEditCmt__c1(false)
                                                }
                                                if (editCmt__c2) {
                                                    setEditCmt__c2(false)
                                                }
                                                setIdCmtChange(item.id)
                                            }}>
                                            <img src="/img_admin/action2.svg" alt="" className={videoMod.cmt__container__sevice__icon} />
                                        </div>
                                    ) : (<></>)}
                                    <div
                                        onClick={() => {
                                            // if (item.user_id === userState?.id) {
                                            //     handleDeleteCmt(id, item.id)
                                            // } else {
                                            handleHiddenCmt(id, item.id)
                                            // }
                                        }}
                                        className={videoMod.cmt__container__sevice}
                                    >
                                        {/* {item.user_id === userState?.id ? (
                                        <img src="/img/deleteMessage.svg" alt="" className={videoMod.cmt__container__sevice__icon} />
                                    ) : ( */}
                                        <>
                                            {item.del_flag ? (
                                                <img src="/img/action.svg" alt="" className={videoMod.cmt__container__sevice__icon} />
                                            ) : (
                                                <img src="/img/hiddenEye.svg" alt="" className={videoMod.cmt__container__sevice__icon} />
                                            )}
                                        </>
                                        {/* )} */}
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
                                    <CustomJoditEditor
                                        name="valueCmt"
                                        value={valueCmt}
                                        onChange={(name, data) => setValueCmt(data)}
                                    />
                                    <div className={videoMod.repCmt__form__sevice}>
                                        <button className={videoMod.repCmt__form__sevice__active}
                                            onClick={() => {
                                                setValueCmt('')
                                                setActiveReplyId(null)
                                            }}
                                        >Hủy</button>
                                        <button
                                            disabled={valueCmt === '' ? true : false}
                                            className={videoMod.repCmt__form__sevice__active}
                                            onClick={() => {
                                                if (editCmt) {
                                                    handleFetchChangeCmt(item.id)
                                                } else {
                                                    handleFetchCmt(item.id)
                                                }
                                            }}>Trả lời</button>
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
                                        <div className={`${rep.user_id === userState?.id ? videoMod.cmt__container__setting : videoMod.cmt__container__setting1}`}>
                                            {rep.user_id === userState?.id ? (
                                                <div className={videoMod.cmt__container__sevice} onClick={() => {
                                                    setIdCmtChange(rep.id)
                                                    setEditCmt__c1(true)
                                                    if (editCmt) {
                                                        setEditCmt(false)
                                                    }
                                                    if (editCmt__c2) {
                                                        setEditCmt__c2(false)
                                                    }
                                                }}>
                                                    <img src="/img_admin/action2.svg" alt="" className={videoMod.cmt__container__sevice__icon} />
                                                </div>
                                            ) : (<></>)}
                                            <div
                                                onClick={() => {
                                                    // if (rep.user_id === userState?.id) {
                                                    //     handleDeleteCmt(id, rep.id)
                                                    // } else {
                                                    handleHiddenCmt(id, rep.id)
                                                    // }
                                                }}
                                                className={videoMod.cmt__container__sevice}
                                            >
                                                {/* {rep.user_id === userState?.id ? (
                                                <img src="/img/deleteMessage.svg" alt="" className={videoMod.cmt__container__sevice__icon} />
                                            ) : ( */}
                                                <>
                                                    {rep.del_flag ? (
                                                        <img src="/img/action.svg" alt="" className={videoMod.cmt__container__sevice__icon} />
                                                    ) : (
                                                        <img src="/img/hiddenEye.svg" alt="" className={videoMod.cmt__container__sevice__icon} />
                                                    )}
                                                </>
                                                {/* )} */}
                                            </div>
                                            <div
                                                className={videoMod.cmt__container__sevice}
                                                onClick={() => {
                                                    handleRepCmt__c1(rep.id)
                                                }}>
                                                <img src="/img/replyCmt.svg" alt="" className={videoMod.cmt__container__sevice__icon} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`${activeReplyId__c1 === rep.id ? videoMod.repCmt__container : videoMod.repCmt__container__hidden}`}>
                                        <div className={videoMod.repCmt__avt__ctn}>
                                            <img src={`${userState?.avatar}`} alt="icon-user" className={videoMod.repCmt__avt} />
                                        </div>
                                        <div className={videoMod.repCmt__form}>
                                            <CustomJoditEditor
                                                name="valueCmt__c1"
                                                value={valueCmt__c1}
                                                onChange={(name, data) => setValueCmt__c1(data)}
                                            />
                                            <div className={videoMod.repCmt__form__sevice}>
                                                <button className={videoMod.repCmt__form__sevice__active}
                                                    onClick={() => {
                                                        setValueCmt__c1('')
                                                        setActiveReplyId__c1(null)
                                                    }}
                                                >Hủy</button>
                                                <button
                                                    disabled={valueCmt__c1 === '' ? true : false}
                                                    className={videoMod.repCmt__form__sevice__active}
                                                    onClick={() => {
                                                        if (editCmt__c1) {
                                                            handleFetchChangeCmt(rep.id)
                                                        } else {
                                                            handleFetchCmt__c1(rep.id)
                                                        }
                                                    }}>Trả lời</button>
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
                                                <div className={`${rely.user_id === userState?.id ? videoMod.cmt__container__setting : videoMod.cmt__container__setting1}`}>
                                                    {rely.user_id === userState?.id ? (
                                                        <div
                                                            className={videoMod.cmt__container__sevice}
                                                            onClick={() => {
                                                                setIdCmtChange(rely.id)
                                                                setEditCmt__c2(true)
                                                                if (editCmt) {
                                                                    setEditCmt(false)
                                                                }
                                                                if (editCmt__c1) {
                                                                    setEditCmt__c1(false)
                                                                }
                                                            }}>
                                                            <img src="/img_admin/action2.svg" alt="" className={videoMod.cmt__container__sevice__icon} />
                                                        </div>
                                                    ) : (
                                                        <></>
                                                    )}
                                                    <div
                                                        onClick={() => {
                                                            // if (rely.user_id === userState?.id) {
                                                            //     handleDeleteCmt(id, rely.id)
                                                            // } else {
                                                            handleHiddenCmt(id, rely.id)
                                                            // }
                                                        }}
                                                        className={videoMod.cmt__container__sevice}
                                                    >
                                                        {/* {rely.user_id === userState?.id ? (
                                                        <img src="/img/deleteMessage.svg" alt="" className={videoMod.cmt__container__sevice__icon} />
                                                    ) : ( */}
                                                        <>
                                                            {rely.del_flag ? (
                                                                <img src="/img/action.svg" alt="" className={videoMod.cmt__container__sevice__icon} />
                                                            ) : (
                                                                <img src="/img/hiddenEye.svg" alt="" className={videoMod.cmt__container__sevice__icon} />
                                                            )}
                                                        </>
                                                        {/* )} */}
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
                                                    <CustomJoditEditor
                                                        name="valueCmt__c2"
                                                        value={valueCmt__c2}
                                                        onChange={(name, data) => setValueCmt__c2(data)}
                                                    />
                                                    <div className={videoMod.repCmt__form__sevice}>
                                                        <button className={videoMod.repCmt__form__sevice__active}
                                                            onClick={() => {
                                                                setValueCmt__c2('')
                                                                setActiveReplyId__c2(null)
                                                            }}
                                                        >Hủy</button>
                                                        <button
                                                            className={videoMod.repCmt__form__sevice__active}
                                                            disabled={valueCmt__c2 === '' ? true : false}
                                                            onClick={() => {
                                                                if (editCmt__c2) {
                                                                    handleFetchChangeCmt(rely.id)
                                                                } else {
                                                                    handleFetchCmt__c2(rely.id)
                                                                }
                                                            }}>Trả lời</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    ))}
                </>)}
            </div >
            <div className={`${videoMod.repCmt__container__boss}`}>
                <div className={`${activeReplyIdBoss ? videoMod.repCmt__container__boss__1 : videoMod.repCmt__container__boss__1__hidden}`}>
                    <div className={videoMod.repCmt__avt__ctn}>
                        <img src={`${userState?.avatar}`} alt="icon-user" className={videoMod.repCmt__avt} />
                    </div>
                    <div className={videoMod.repCmt__form}>
                        <CustomJoditEditor
                            name="valueCmtBoss"
                            value={valueCmtBoss}
                            onChange={(name, data) => setValueCmtBoss(data)}
                        />
                        <div className={videoMod.repCmt__form__sevice}>
                            <button
                                className={videoMod.repCmt__form__sevice__active}
                                onClick={() => {
                                    if (activeReplyIdBoss) {
                                        setActiveReplyIdBoss(false)
                                    }
                                    setValueCmtBoss('')
                                }}
                            >Hủy</button>
                            <button className={videoMod.repCmt__form__sevice__active} disabled={valueCmtBoss === '' ? true : false} onClick={() => handleFetchCmtBoss()}>Trả lời</button>
                        </div>
                    </div>
                </div>
                <button className={`${activeReplyIdBoss ? videoMod.repCmt__form__sevice__active__2 : videoMod.repCmt__form__sevice__active__1}`} onClick={() => handleRepCmtBoss()}>Bình luận</button>
            </div>
        </>
    )
}

export default ChatCmt