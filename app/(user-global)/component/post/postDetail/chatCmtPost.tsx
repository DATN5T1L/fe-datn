'use client'

import mod from "@app/Marketing/Marketing/MarketingArticle/Comments/comments.module.css";
import { useEffect, useState } from "react";
import useCookie from "../../hook/useCookie";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useFormik } from "formik";
import * as Yup from 'yup'

interface ChatCmtPostProps {
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

interface PostWithComments<T> {
    post_id: string;
    comments: T[];
}

const ChatCmtPost: React.FC<ChatCmtPostProps> = ({ id }) => {
    const userId = useSelector((state: RootState) => state.user.user)
    const [replyContent, setReplyContent] = useState<string>("");
    const [cmt, setCmt] = useState<string>("");
    const [activeReplyId, setActiveReplyId] = useState<string | null>(null);
    const [editId, setEditId] = useState<string | null>(null);
    const [replyContentR, setReplyContentR] = useState<string>("")
    const [activeReplyIdR, setActiveReplyIdR] = useState<string | null>(null)
    const [editIdR, setEditIdR] = useState<string | null>(null);
    const [replyContentRR, setReplyContentRR] = useState<string>("")
    const [activeReplyIdRR, setActiveReplyIdRR] = useState<string | null>(null)
    const [editIdRR, setEditIdRR] = useState<string | null>(null);
    const [loadCmt, setLoadCmt] = useState(false)
    const [reloadCmt, setReloadCmt] = useState(false)
    const [loadCmtP, setLoadCmtP] = useState(false)
    const [loadCmt1, setLoadCmt1] = useState(false)
    const [loadCmt2, setLoadCmt2] = useState(false)
    const [loadCmt3, setLoadCmt3] = useState(false)
    const [dataWithCmt, setDataWithCmt] = useState<PostWithComments<Comment> | null>(null)
    const token = useCookie('token')


    useEffect(() => {
        if (id && token) {
            fetchComments();
        }
    }, [id, token]);

    const fetchComments = () => {
        setLoadCmt(true);
        fetch(`/api/comment/${id}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setDataWithCmt(data);
                console.log('data cmt: ',data);
            })
            .catch((error) => console.error(error))
            .finally(() => {
                setLoadCmt(false);
                setReloadCmt(false)
            });
    };

    const reloadComments = () => {
        if (!loadCmt) {
            fetchComments();
        }
    };

    useEffect(() => {
        if (id && token && reloadCmt) {
            fetchComments();
        }
    }, [id, token, reloadCmt]);

    const handleCmtSubmit = (commentId: string | number) => {
        console.log(`Nội dung cho comment ${commentId}:`, cmt)
        setLoadCmtP(true)
        if (commentId && token && userId?.id) {
            fetch(`/api/commentPost/${id}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ comment_text: cmt })
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setLoadCmtP(false)
                    setCmt("")
                    reloadComments()
                })
                .catch(error => {
                    setCmt("")
                    setLoadCmtP(false)
                    console.error(error)
                })
        }
    }

    const handleReplySubmit = (commentId: string) => {
        console.log(`Nội dung trả lời cho comment ${commentId}:`, replyContent)
        setLoadCmt1(true)
        if (commentId && token) {
            fetch(`/api/commentPost/${id}/${commentId}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ comment_text: replyContent })
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setReplyContent("")
                    setActiveReplyId(null)
                    setLoadCmt1(false)
                    reloadComments()
                })
                .catch(error => {
                    setReplyContent("")
                    setActiveReplyId(null)
                    setLoadCmt1(false)
                    console.error(error)
                })
        }
    }

    const handleReplySubmitR = (replyId: string) => {
        setLoadCmt2(true)
        if (replyId && token) {
            fetch(`/api/commentPost/${id}/${replyId}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ comment_text: replyContentR })
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setReplyContentR("")
                    setActiveReplyIdR(null)
                    setLoadCmt2(false)
                    reloadComments()
                })
                .catch(error => {
                    setReplyContentR("")
                    setActiveReplyIdR(null)
                    setLoadCmt2(false)
                    console.error(error)
                })
        }
        console.log(`Nội dung trả lời cho reply ${replyId}:`, replyContentR)
    }

    const handleReplySubmitRR = (replyId: string) => {
        setLoadCmt3(true)
        if (replyId && token) {
            fetch(`/api/commentPost/${id}/${replyId}`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ comment_text: replyContentRR })
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    setReplyContentRR("")
                    setActiveReplyIdRR(null)
                    setLoadCmt3(false)
                    reloadComments()
                })
                .catch(error => {
                    setReplyContentRR("")
                    setActiveReplyIdRR(null)
                    setLoadCmt3(false)
                    console.error(error)
                })
        }
        console.log(`Nội dung trả lời cho reply ${replyId}:`, replyContentRR)
    }

    const formik = useFormik({
        initialValues: {
            comment_text: '',
            id: ''
        },
        validationSchema: Yup.object({
            comment_text: Yup.string().required('bắt buộc').max(255, 'Tối đa 255 ký tự'),
        }),
        onSubmit: async (values) => {
            setLoadCmt1(true)
            setEditId(null);
            try {
                if (token && values.id) {
                    if (confirm('Bạn có muốn thay đổi bình luận này không!!')) {
                        const res = await fetch(`/api/changeCmtPost/${id}/${values.id}`, {
                            method: 'PUT',
                            headers: {
                                Authorization: `Bearer ${token}`,
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ comment_text: values.comment_text })
                        })
                        const data = await res.json();
                        console.log(data);


                        if (res.ok) {
                            alert(data.message)
                            reloadComments()
                            setReloadCmt(true)
                            setLoadCmt1(false)
                        } else {
                            alert('Thay đổi thấy bại. Hãy thử lại')
                            setLoadCmt1(false)
                        }
                    }
                }
            } catch (error) {
            }
        }
    })

    const formikR = useFormik({
        initialValues: {
            comment_text: '',
            id: ''
        },
        validationSchema: Yup.object({
            comment_text: Yup.string().required('bắt buộc').max(255, 'Tối đa 255 ký tự'),
        }),
        onSubmit: async (values) => {
            setEditIdR(null)
            setLoadCmt2(true)
            try {
                if (token && values.id) {
                    if (confirm('Bạn có muốn thay đổi bình luận này không!!')) {
                        const res = await fetch(`/api/changeCmtPost/${id}/${values.id}`, {
                            method: 'PUT',
                            headers: {
                                Authorization: `Bearer ${token}`,
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ comment_text: values.comment_text })
                        })
                        const data = await res.json();
                        console.log(data);


                        if (res.ok) {
                            alert(data.message)
                            setReloadCmt(true)
                            setLoadCmt2(false)
                        } else {
                            alert('Thay đổi thấy bại. Hãy thử lại')
                            setLoadCmt2(false)
                        }
                    }
                }

            } catch (error) {
            }
        }
    })

    const formikRR = useFormik({
        initialValues: {
            comment_text: '',
            id: ''
        },
        validationSchema: Yup.object({
            comment_text: Yup.string().required('bắt buộc').max(255, 'Tối đa 255 ký tự'),
        }),
        onSubmit: async (values) => {
            setEditIdRR(null)
            setLoadCmt3(true)
            try {
                if (token && values.id) {
                    if (confirm('Bạn có muốn thay đổi bình luận này không!!')) {
                        const res = await fetch(`/api/changeCmtPost/${id}/${values.id}`, {
                            method: 'PUT',
                            headers: {
                                Authorization: `Bearer ${token}`,
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({ comment_text: values.comment_text })
                        })
                        const data = await res.json();
                        console.log(data);

                        if (res.ok) {
                            alert(data.message)
                            setReloadCmt(true)
                            setLoadCmt3(false)
                        } else {
                            alert('Thay đổi thấy bại. Hãy thử lại')
                            setLoadCmt3(false)
                        }
                    }
                }

            } catch (error) {
            }
        }
    })

    useEffect(() => {
        if (editId && dataWithCmt) {
            const selectedComment = dataWithCmt.comments.find(
                (item) => item.id === editId
            );
            if (selectedComment) {
                formik.setFieldValue('comment_text', selectedComment.comment_text);
                formik.setFieldValue('id', selectedComment.id);
            }
        }

        if (editIdR && dataWithCmt?.comments) {
            const selectedComment = dataWithCmt.comments
                .map((item) => item.replies)
                .flat() // Làm phẳng mảng các bình luận trả lời
                .find((item) => item.id === editIdR); // Tìm bình luận trả lời có editIdR
            if (selectedComment) {
                formikR.setFieldValue('comment_text', selectedComment.comment_text);
                formikR.setFieldValue('id', selectedComment.id);
            }
        }

        if (editIdRR && dataWithCmt?.comments) {
            const selectedComment = dataWithCmt.comments
                .map((item) => item.replies) // Lấy tất cả các bình luận trả lời cấp 1
                .flat() // Làm phẳng mảng các bình luận trả lời cấp 1
                .map((itemR) => itemR.replies) // Lấy tất cả các bình luận trả lời cấp 2
                .flat() // Làm phẳng mảng các bình luận trả lời cấp 2
                .find((item) => item.id === editIdRR); // Tìm bình luận trả lời cấp 2 có editIdRR
            if (selectedComment) {
                formikRR.setFieldValue('comment_text', selectedComment.comment_text);
                formikRR.setFieldValue('id', selectedComment.id);
            }
        }
    }, [editId, editIdR, editIdRR, dataWithCmt]);
    return (
        <>
            <div className={`${mod.comments} d-flex flex-column gap-3`}>
                <div className="mt-3">
                    <textarea
                        value={cmt}
                        onChange={(e) => setCmt(e.target.value)}
                        placeholder="Nhập nội dung bình luận"
                        rows={3}
                        className={mod.comment_input}
                    />
                    <button
                        className={`btn btn-primary mt-2 ${cmt === '' ? mod.btn_disabled : ''} ${loadCmtP ? mod.btn_disabled : ''}`}
                        onClick={() => {
                            if (id) {
                                handleCmtSubmit(id)
                            }
                        }}
                        disabled={loadCmtP}
                    >
                        Gửi bình luận
                    </button>
                </div>
                {dataWithCmt?.comments?.map((item, index) => (
                    <div className="d-flex gap-3" key={index}>
                        <img
                            src={`${item.avatar}`}
                            style={{ maxWidth: "48px", objectFit: "cover" }}
                            className="align-self-baseline"
                        />
                        <div className="d-flex flex-column">
                            <span className={`${mod.name}`}>{item.fullname}</span>
                            <small>{item.comment_text}</small>
                            <div className="d-inline-flex gap-3 my-2">
                                {item.del_flag === true ? (<>
                                    <small
                                        className="text-primary"
                                        onClick={() => {
                                            setActiveReplyId(activeReplyId === item.id ? null : item.id)
                                            setActiveReplyIdR(null)
                                            setActiveReplyIdRR(null)
                                            setEditId(null)
                                            setEditIdR(null)
                                            setEditIdRR(null)
                                        }}
                                    >
                                        Trả lời
                                    </small>
                                    {item.user_id === userId?.id ? (
                                        <small
                                            className="text-primary"
                                            onClick={() => {
                                                setActiveReplyId(null)
                                                setActiveReplyIdR(null)
                                                setActiveReplyIdRR(null)
                                                setEditId(editId === item.id ? null : item.id)
                                                setEditIdR(null)
                                                setEditIdRR(null)
                                            }}
                                        >Sửa</small>
                                    ) : ('')}
                                </>) : ('')}
                            </div>
                            {activeReplyId === item.id && (
                                <div className="mt-3">
                                    <textarea
                                        value={replyContent}
                                        onChange={(e) => setReplyContent(e.target.value)}
                                        placeholder="Nhập nội dung trả lời..."
                                        rows={3}
                                        className={mod.comment_input}
                                    />
                                    <button
                                        className={`btn btn-primary mt-2 ${replyContent === '' ? mod.btn_disabled : ''}  ${loadCmt1 ? mod.btn_disabled : ''}`}
                                        onClick={() => handleReplySubmit(item.id)}
                                        disabled={loadCmt1}
                                    >
                                        Gửi trả lời
                                    </button>
                                </div>
                            )}
                            {editId === item.id && (
                                <form className="mt-3" onSubmit={formik.handleSubmit}>
                                    <input
                                        style={{ minHeight: '48px', minWidth: '32px' }}
                                        type="hidden"
                                        value={formik.values.id}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        name="id"
                                    />
                                    <textarea
                                        value={formik.values.comment_text}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        name="comment_text"
                                        rows={3}
                                        className={mod.comment_input}
                                    />
                                    {formik.touched.comment_text && formik.errors.comment_text && (
                                        <div className="invalid-feedback">{formik.errors.comment_text}</div>
                                    )}
                                    <button
                                        className={`btn btn-primary mt-2 ${formik.values.comment_text.trim() === '' ? mod.btn_disabled : ''
                                            }`}
                                        type="submit"
                                        disabled={formik.isSubmitting || formik.values.comment_text.trim() === ''}
                                    >
                                        Lưu
                                    </button>
                                </form>
                            )}
                            {item.replies?.map((itemR, indexR) => (
                                <div
                                    key={indexR}
                                    className="d-flex gap-3 flex-column border-2 border-start px-2 mt-3"
                                >
                                    <div className="w-100 d-flex flex-row gap-3 ">
                                        <img
                                            src={`${itemR.avatar}`}
                                            className="align-self-baseline"
                                            style={{ maxWidth: "48px", objectFit: "cover" }}
                                        />
                                        <div className="d-flex flex-column">
                                            <span className={`${mod.name}`}>{itemR.fullname}</span>
                                            <small>{itemR.comment_text}</small>
                                            <div className="d-flex flex-row gap-3 mt-2">
                                                {item.del_flag === true ? (<>
                                                    <small
                                                        className="text-primary"
                                                        onClick={() => {
                                                            setActiveReplyIdR(activeReplyIdR === itemR.id ? null : itemR.id)
                                                            setActiveReplyId(null)
                                                            setActiveReplyIdRR(null)
                                                            setEditId(null)
                                                            setEditIdR(null)
                                                            setEditIdRR(null)
                                                        }}
                                                    >
                                                        Trả lời
                                                    </small>
                                                    {itemR.user_id === userId?.id ? (
                                                        <small
                                                            className="text-primary"
                                                            onClick={() => {
                                                                setActiveReplyId(null)
                                                                setActiveReplyIdR(null)
                                                                setActiveReplyIdRR(null)
                                                                setEditId(null)
                                                                setEditIdR(editIdR === itemR.id ? null : itemR.id)
                                                                setEditIdRR(null)
                                                            }}
                                                        >Sửa</small>
                                                    ) : ('')}
                                                </>) : ('')}
                                            </div>
                                        </div>
                                    </div>
                                    {activeReplyIdR === itemR.id && (
                                        <div className="mt-3">
                                            <textarea
                                                value={replyContentR}
                                                onChange={(e) => setReplyContentR(e.target.value)}
                                                placeholder="Nhập nội dung trả lời..."
                                                rows={3}
                                                className={mod.comment_input}
                                            />
                                            <button
                                                className={`btn btn-primary mt-2 ${replyContentR === '' ? mod.btn_disabled : ''}  ${loadCmt2 ? mod.btn_disabled : ''}`}
                                                onClick={() => handleReplySubmitR(itemR.id)}
                                                disabled={loadCmt2}
                                            >
                                                Gửi trả lời
                                            </button>
                                        </div>
                                    )}
                                    {editIdR === itemR.id && (
                                        <form className="mt-3" onSubmit={formikR.handleSubmit}>
                                            <input
                                                type="hidden"
                                                value={formikR.values.id}
                                                onChange={formikR.handleChange}
                                                onBlur={formikR.handleBlur}
                                                name="id"
                                            />
                                            <textarea
                                                value={formikR.values.comment_text}
                                                onChange={formikR.handleChange}
                                                onBlur={formikR.handleBlur}
                                                name="comment_text"
                                                rows={3}
                                                className={mod.comment_input}

                                            />
                                            <button
                                                className={`btn btn-primary mt-2 ${formikR.values.comment_text.trim() === '' ? mod.btn_disabled : ''
                                                    }`}
                                                type="submit"
                                                disabled={formikR.isSubmitting || formikR.values.comment_text.trim() === ''}
                                            >
                                                Lưu
                                            </button>
                                        </form>
                                    )}

                                    {itemR.replies?.map((itemRR, indexRR) => (
                                        <div
                                            key={indexRR}
                                            className="d-flex gap-3 border-2 border-start px-2 mt-3"
                                        >
                                            <div className="w-100 d-flex flex-row gap-3 ">

                                                <img
                                                    src={`${itemRR.avatar}`}
                                                    className="align-self-baseline"
                                                    style={{ maxWidth: "48px", objectFit: "cover" }}
                                                />
                                                <div className="d-flex flex-column">
                                                    <span className={`${mod.name}`}>{itemRR.fullname}</span>
                                                    <small>{itemRR.comment_text}</small>
                                                    <div className="d-flex flex-row gap-3 mt-2">
                                                        {item.del_flag === true ? (<>
                                                            {itemR.del_flag === true ? (<>
                                                                <small
                                                                    className="text-primary"
                                                                    onClick={() => {
                                                                        setActiveReplyIdRR(activeReplyIdRR === itemRR.id ? null : itemRR.id)
                                                                        setActiveReplyId(null)
                                                                        setActiveReplyIdR(null)
                                                                        setEditId(null)
                                                                        setEditIdR(null)
                                                                        setEditIdRR(null)
                                                                    }}
                                                                >
                                                                    Trả lời
                                                                </small>
                                                                {itemRR.user_id === userId?.id ? (
                                                                    <small
                                                                        className="text-primary"
                                                                        onClick={() => {
                                                                            setActiveReplyId(null)
                                                                            setActiveReplyIdR(null)
                                                                            setActiveReplyIdRR(null)
                                                                            setEditId(null)
                                                                            setEditIdR(null)
                                                                            setEditIdRR(editIdRR === itemRR.id ? null : itemRR.id)
                                                                        }}
                                                                    >Sửa</small>
                                                                ) : ('')}
                                                            </>) : ("")}
                                                        </>) : ('')}
                                                    </div>
                                                    {activeReplyIdRR === itemRR.id && (
                                                        <div className="mt-3">
                                                            <textarea
                                                                value={replyContentRR}
                                                                onChange={(e) => setReplyContentRR(e.target.value)}
                                                                placeholder="Nhập nội dung trả lời..."
                                                                rows={3}
                                                                className={mod.comment_input}
                                                            />
                                                            <button
                                                                className={`btn btn-primary mt-2 ${replyContentRR === '' ? mod.btn_disabled : ''}  ${loadCmt3 ? mod.btn_disabled : ''}`}
                                                                onClick={() => handleReplySubmitRR(itemRR.id)}
                                                                disabled={loadCmt3}
                                                            >
                                                                Gửi trả lời
                                                            </button>
                                                        </div>
                                                    )}
                                                    {editIdRR === itemRR.id && (
                                                        <form onSubmit={formikRR.handleSubmit} className="mt-3">
                                                            <input
                                                                type="hidden"
                                                                value={formikRR.values.id}
                                                                onChange={formikRR.handleChange}
                                                                onBlur={formikRR.handleBlur}
                                                                name="id"
                                                            />
                                                            <textarea
                                                                value={formikRR.values.comment_text}
                                                                onChange={formikRR.handleChange}
                                                                onBlur={formikRR.handleBlur}
                                                                name="comment_text"
                                                                rows={3}
                                                                className={mod.comment_input}
                                                            />
                                                            <button
                                                                className={`btn btn-primary mt-2 ${formikRR.values.comment_text.trim() === '' ? mod.btn_disabled : ''
                                                                    }`}
                                                                type="submit"
                                                                disabled={formikRR.isSubmitting || formikRR.values.comment_text.trim() === ''}
                                                            >
                                                                Lưu
                                                            </button>
                                                        </form>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default ChatCmtPost