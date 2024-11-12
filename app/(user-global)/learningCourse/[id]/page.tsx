"use client";

// import VideoPlayer from "@app/(user-global)/component/videoPlayer";
import ReactPlayer from 'react-player/youtube';
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import useFetch from '../../component/hook/useFetch';
import { useLogout } from '@app/(user-global)/component/auth/user-component/useLogout';
import useCookie from '@app/(user-global)/component/hook/useCookie';
import { Row, Col, Nav, Navbar } from "react-bootstrap";
import Tippy from '@tippyjs/react/headless';
import Link from "next/link";
import Image from "next/image";
import { motion } from 'framer-motion';

// thêm component
import CodeDev from "@app/(user-global)/component/globalControl/codeDev";
import ProgressCircle from '@app/(user-global)/component/course/ProgressCircle';
import Button from "@app/(user-global)/component/globalControl/btnComponent";
import Faq from "@app/(user-global)/component/globalControl/Faq";
import NoteCourse from "@app/(user-global)/component/globalControl/NoteCourse";
import CodeDevLearning from "@app/(user-global)/component/globalControl/CodeDevLearning";

// thêm Comment thông báo 
import Notification from "@app/(user-global)/component/globalControl/Notification";

// thêm styles
import stylesNav from "@public/styles/globalControl/Nav.module.css";
import styles from "@public/styles/globalControl/Learning.module.css";

type NotiType = 'success' | 'error' | 'fail' | 'complete';



const Learning: React.FC<{ params: { id: string } }> = ({ params }) => {
    const token = useCookie('token');
    const { id } = params;
    const course_Id = id; // tạo biến Id thành course_id
    const userState = useSelector((state: RootState) => state.user); // lấy thông tin user đang đăng nhập
    const user = userState?.user;  // lấy thông tin user đang đăng nhập
    const { handleLogout } = useLogout(); // hook đăng xuất
    // biến để show/hide câu hỏi thường gặp
    const [isNoti, setNoti] = useState(false); // biến để show/hide câu hỏi thường gặp
    const [isContent, setContent] = useState(true); // biến để show/hide câu hỏi thường gặp
    const [typeNoti, setTypeNoti] = useState<NotiType | null>(null); // biến để show/hide câu hỏi thường gặp
    const [messageNoti, setmessageNoti] = useState(""); // biến để show/hide câu hỏi thường gặp

    // danh sách các biến lưu trữ dữ liệu khóa học
    const [progress, setprogress] = useState<Progress | null>(null); // biến lưu tiến độ người dùng
    const [error, setError] = useState<string | null>(null);
    const [course, setCourse] = useState<Chapter[] | null>(null);
    const [nameDocument, setnameDocument] = useState('');
    const [idDocument, setIdDocument] = useState('');
    const [typeDoc, settypeDoc] = useState<string | null>(null);
    const [descdocument, setdescdocument] = useState<string | null>(null);
    const [note, setNote] = useState<Note[] | null>(null);
    const [question, setQuestion] = useState<QuestionsDocument['questions'] | null>(null);
    const [code, setCode] = useState<CodesDocument['codes'] | null>(null);

    // trạng thái bài học
    // tạo biến lưu trư id bài học
    const [doc_id, setdoc_id] = useState<string | null>(null);
    const [statusDoc, setStatusDoc] = useState(false);
    const isWarningShown = useRef(false);
    const [urlVideo, setUrlVideo] = useState('');
    const [type, setType] = useState<string | null>(null);
    const lastValidTimeRef = useRef<number>(0);
    const playerRef = useRef<any>(null); // Tham chiếu tới video player
    const [videoDuration, setVideoDuration] = useState<number>(0); //lưu thời gian kết thúc video
    const [playedSeconds, setPlayedSeconds] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);

    // state change
    const [isActiveDoc, setIsActiveDoc] = useState(false);
    const [activeDocIndex, setActiveDocIndex] = useState<number | null>(null);
    // result code 
    const [html, setHtml] = useState<string>('');
    const [css, setCss] = useState<string>('');
    const [js, setJs] = useState<string>('');


    // ẩn hiển các hạng mục
    const [visible, setVisible] = useState(false); // biến để show/hide modal
    const [isNoteList, setisNoteList] = useState(false);    //  biến để show/hide danh sách ghi chú
    const [isNote, setIsNote] = useState(false); // biến để show/hide ghi chú
    const [isActive, setIsActive] = useState(false); // biến để show/hide menu frofile
    const [isVisible, setIsVisible] = useState(true);
    const [tippyVisible, setTippyVisible] = useState(false);
    const [isFAQ, setFAQ] = useState(false);

    const toggleSwitch = () => {
        setIsActive(!isActive);
        setTippyVisible(prev => !prev);
    };
    const show = () => setVisible(true);
    const hide = () => setVisible(false);
    const showNoteList = () => setisNoteList(true);
    const hideNoteList = () => setisNoteList(false);

    const toggleNote = () => {
        setIsNote(prev => !prev);
        const parentElement = document.querySelector('.row');

        if (!isNote && parentElement) {
            // Cuộn phần tử cha đến cuối
            parentElement.scrollTop = parentElement.scrollHeight;
        }
    };

    const toggleFaq = () => {
        setFAQ(prev => !prev);
    };

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };


    //----------------------------------------------------------------
    // Lưu trạng thái bài học
    const [statusDocData, setStatusDocData] = useState<ApiResponseStatus | null>(null)
    const [dataCourses, setDataCourses] = useState<Chapter | null>(null)
    const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
    };
    // Call API
    //Lấy ra danh sách bài học
    const {
        data: documentsData,
        error: documentsError,
        fetchData: fetchDocuments,
        loading: documentsLoading,
    } = useFetch<CourseData>({
        url: `/api/getdocforyou/${course_Id}`,
        method: "GET",
        headers
    });
    // Lấy ra trạng thái bài học
    const {
        data: statusData,
        error: statusError,
        fetchData: fetchStatus,
        loading: statusLoading,
    } = useFetch<ApiResponseStatus>({
        url: `/api/allStatusDoc/${course_Id}`,
        method: "GET",
        headers,
    });

    useEffect(() => {
        // Chỉ gọi API khi dữ liệu chưa tồn tại
        if (!documentsData && !statusData) {
            const fetchDatas = async () => {
                await fetchDocuments();
                await fetchStatus();
            };
            fetchDatas();
        }
    }, [fetchDocuments, fetchStatus, documentsData, statusData]);
    // ghép api
    useEffect(() => {
        if (documentsData && statusData) {
            const updatedChaptersData = documentsData.data.map(chapter => {
                return {
                    ...chapter,
                    documents: chapter.documents.map(document => {
                        const videoStatus = statusData.data.find(status => status.document_id === document.document_id);
                        if (videoStatus) {
                            document.status_video = videoStatus.status_video;

                        }
                        return document;
                    })
                };
            });
            console.log("Updated Chapters Data:", updatedChaptersData);
            setCourse(updatedChaptersData);
        }
    }, [documentsData, statusData]);


    // Ghép API
    const fetchNotes = async () => {
        try {
            const response = await fetch(`/api/getnoteByCourse/${course_Id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch course");
            }

            const dataNote = await response.json();
            console.log(dataNote)
            if (Array.isArray(dataNote.data)) {
                setNote(dataNote.data);
                return dataNote
            } else {
                console.error("data.data is not an array");
            }

        } catch (err: any) {
            setError(err.message);
        }
    };

    // const {
    //     data: statusData,
    //     error: statusError,
    //     fetchData: fetchStatus,
    //     loading: statusLoading,
    // } = useFetch<ApiResponseStatus>({
    //     url: `/api/addStatusDoc/${course_Id}`,
    //     method: "GET",
    //     headers,
    // });

    const fetchCreatStatus = async () => {
        try {
            const response = await fetch(`/api/createStatusDoc/${doc_id}/${course_Id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch course");
            }
            const data = await response.json();
            console.log(data, "trạng thái bài học");
        } catch (err: any) {
            setError(err.message);
        }
    };

    useEffect(() => {
        if (doc_id !== null) {
            // Chạy fetchCreatStatus chỉ khi docId đã được cập nhật
            fetchCreatStatus();
        }
    }, [doc_id]);



    const [openIndexes, setOpenIndexes] = useState<number[]>([]);

    const toggleItem = useCallback((index: number) => {
        setOpenIndexes(prev =>
            prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
        );
    }, []);


    // Cập nhật secondNew mỗi khi seconds thay đổi

    const handleProgress = (progress: { playedSeconds: number }) => {
        const { playedSeconds } = progress;
        setPlayedSeconds(playedSeconds);
        // console.log(lastValidTimeRef.current, "giây hợp lệ trước đó");


        // Kiểm tra nếu người dùng cố gắng tua quá 2 giây từ lastValidTime
        if (Math.abs(playedSeconds - lastValidTimeRef.current) > 15) {
            // Quay về thời gian hợp lệ trước đó
            if (playedSeconds < lastValidTimeRef.current) {
                // Người dùng đang tua ngược, chỉ cập nhật lastValidTime
                lastValidTimeRef.current = playedSeconds;
            } else {
                // Quay về thời gian hợp lệ trước đó
                if (playerRef.current) {
                    playerRef.current.seekTo(lastValidTimeRef.current);
                }
            }
        } else {
            // Cập nhật thời gian hợp lệ cuối cùng trong ref
            lastValidTimeRef.current = playedSeconds;
        }
        if (videoDuration - playedSeconds <= 30 && !isWarningShown.current) {

            isWarningShown.current = true; // Đảm bảo chỉ hiện thông báo một lần
        }

    };
    // hàm dừng video
    const pauseVideo = () => {

        setIsPlaying(false);
    };
    const nextVideo = (url: string) => {
        // TODO: Lấy tài liệu tiếp theo
        //...
        setUrlVideo(url);
    }
    // console.log("playedSeconds", playedSeconds);

    const handleDuration = (duration: number) => {
        setVideoDuration(duration); // Save the video duration
        const minutes = Math.floor(duration / 60); // Calculate minutes
        const seconds = Math.floor(duration % 60); // Calculate remaining seconds
        console.log(`Thời gian kết thúc video: ${minutes} phút ${seconds} giây`);
        isWarningShown.current = false;
    };

    useEffect(() => {
        // Check if the video has finished
        if (playedSeconds >= videoDuration - 30 && playedSeconds < videoDuration) {
            console.log("Video đã kết thúc");
        }
        return
    }, [playedSeconds, videoDuration]);

    // hàm định dạng thời gian
    const formatTime = (seconds: number): string => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    };
    const handleEnded = () => { //hàm sử lý khi video kết thúc

        alert("Video đã kết thúc");
        setmessageNoti("Video sắp hết!");
        setTypeNoti('error');
        setNoti(true);
    }
    // hàm định dạng ngày giờ
    const [timedocument, settimedocument] = useState('');

    const formatDateTime = (datetimeStr: string): string => {
        const date = new Date(datetimeStr);
        // Lấy các thành phần ngày, tháng, năm, giờ, phút
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();

        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');

        // Kết hợp các thành phần thành chuỗi ngày giờ (không bao gồm giây)
        return `${day}-${month}-${year} ${hours}:${minutes}`;
    };



    // hàm sử lý tách nội dung câu hỏi
    const parseQues = (input: string): QuestionAnswer | null => {
        const [questionPart, answerPart] = input.split('?');

        if (!questionPart || !answerPart) return null;

        const answers = answerPart.split('/').map((str) => str.trim());

        return {
            question: questionPart.trim(),
            answers
        };
    };
    const handleExport = (data: { html: string, css: string, js: string }) => {
        // console.log('HTML:', data.html);
        // console.log('CSS:', data.css);
        // console.log('JS:', data.js);
        setHtml(data.html)
        setCss(data.css)
        setJs(data.js)
        // Ở đây bạn có thể thực hiện các hành động khác với dữ liệu, như lưu trữ, hiển thị, v.v.
    };






    const mappedCourseNew = useMemo(() => {
        if (!course || !Array.isArray(course)) return <>Trờ TTO chút xíu nhé</>; // Trả về null nếu không có course

        // const findInactiveDocument = (course: Chapter[]) => {
        //     let inactiveDoc: Document | null | undefined = null;

        //     for (const chapter of course) {
        //         inactiveDoc = chapter.documents.find(doc => doc.status_video === false);

        //         if (inactiveDoc) {
        //             break;
        //         }
        //     }

        //     return inactiveDoc;
        // };

        // const inactiveDoc = findInactiveDocument(course);

        // if (inactiveDoc) {
        //     setUrlVideo(inactiveDoc.url_video);
        //     setnameDocument(inactiveDoc.name_document);
        //     settypeDoc(inactiveDoc.type_document);
        // }

        return (
            <div className={`${styles.row}`}>
                <div className={`${styles.flexGrow} ${styles.videoContainer}`}>

                    {typeDoc === 'video' ? (
                        <div className={styles.Video}>
                            <ReactPlayer
                                ref={playerRef}
                                url={urlVideo}
                                controls
                                width="100%"
                                height="100%"
                                onProgress={handleProgress}
                                onDuration={handleDuration}
                                playing={isPlaying}
                                autoPlay
                                onEnded={handleEnded} // Tự động phát
                            />
                        </div>
                    ) : typeDoc === 'quiz' ? (
                        <div className={styles.wapperQuestion}>
                            {/* Thêm nội dung của quiz ở đây */}
                            <div className={styles.bodyTitle}>
                                <span className={styles.timeUpdate}>Cập nhật ngày {timedocument}</span>
                                <h4 className={styles.titleCourse}>{nameDocument}</h4>
                            </div>
                            {question?.map((question, index) => {
                                const parsedQuestion = parseQues(question.content_question);

                                return (
                                    <div key={index} className={styles.questionItem}>
                                        {parsedQuestion ? (
                                            <>
                                                <p className={styles.titleQuestion}>Câu hỏi: {parsedQuestion.question}</p>
                                                {question.type_question === 'true_false' ? (
                                                    <div className={styles.tfQuesion}>
                                                        <span className={styles.subtitleQuestion}>Câu hỏi đúng/sai</span>
                                                        <ul className={styles.listQuestion}>
                                                            {parsedQuestion.answers.map((answer, idx) => (
                                                                <li key={idx} className={styles.itemQuestion}> <input type="checkbox" name="" id="" /> {answer}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ) : question.type_question === 'multiple_choice' ? (
                                                    <div className={styles.multipleQuesion}>
                                                        <span className={styles.subtitleQuestion}>Chọn ít nhất 1 câu trả lời đúng</span>
                                                        <ul className={styles.listQuestion} >
                                                            {parsedQuestion.answers.map((answer, idx) => (
                                                                <li key={idx} className={styles.itemQuestion}>
                                                                    <label htmlFor={`submit${idx}`} className={styles.itemAnswer}>
                                                                        <input type="checkbox" name="" id={`submit${idx}`} value={answer} /> {answer}
                                                                    </label>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                ) : question.type_question === 'fill' ? (
                                                    <div className={styles.filleQuesion} >
                                                        <span className={styles.subtitleQuestion}>Điền vào phần còn thiếu</span>
                                                        <ul className={styles.listQuestion}>
                                                            {parsedQuestion.answers.map((answer, idx) => (
                                                                <label htmlFor={`submit${idx}`} className={styles.itemAnswer}>
                                                                    <input type="checkbox" name="" id={`submit${idx}`} value={answer} /> {answer}
                                                                </label>))}
                                                        </ul>
                                                    </div>
                                                ) : null}
                                                <div className={styles.ctaQuestion}>
                                                    <button className={`${styles.btnAnswer} `}>Hủy</button>
                                                    <button className={`${styles.btnAnswer} ${styles.btnAnswerActive} `}>Trả lời</button>
                                                </div>
                                            </>
                                        ) : (
                                            <p>Nội dung câu hỏi không hợp lệ.</p>
                                        )}
                                        {/* <p>Đáp án đúng: {question.correct_answer}</p>
                                        <p>Loại câu hỏi: {question.type_question}</p> */}
                                    </div>
                                );
                            })}
                        </div>
                    ) : typeDoc === 'code' ? (
                        <div className={styles.wapperCode}>

                            {code?.map((code, index) => (

                                <CodeDevLearning onExport={handleExport}
                                    answer_code={code.answer_code}
                                    correct_answer={code.correct_answer}
                                    question_code={code.question_code}
                                    tutorial_code={code.tutorial_code}
                                />

                            ))}
                        </div>
                    ) : (
                        <div className={styles.wapperQuestion}>Không phải video, quiz hoặc code</div>
                    )}

                    {isContent ? (
                        <div className={styles.body}>
                            {!isNote ? (
                                <>
                                    <div className={styles.bodyTop}>
                                        <div className={styles.bodyTitle}>
                                            <span className={styles.timeUpdate}>Cập nhật ngày {timedocument}</span>
                                            <h4 className={styles.titleCourse}>{nameDocument}</h4>
                                        </div>
                                        <Button
                                            onClick={() => {
                                                toggleNote();
                                                pauseVideo();
                                            }}
                                            type="premary" // Đã sửa thành "primary"
                                            status="hover"
                                            size="S"
                                            leftIcon={false}
                                            rightIcon={false}
                                            height={40}
                                        >
                                            Thêm ghi chú {formatTime(playedSeconds)}
                                        </Button>
                                    </div>
                                    <div className={styles.bodyContent}>
                                        <p className={styles.content}>
                                            HTML CSS (HyperText Markup Language Cascading Style Sheets) Nội dung bổ sung:
                                            <a
                                                href="https://www.w3schools.com/css/css_pseudo_classes.asp"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                https://www.w3schools.com/css/css_pseudo_classes.asp
                                            </a>
                                        </p>
                                    </div>
                                </>
                            ) : (
                                <motion.div
                                    initial={{ y: '100%' }}
                                    animate={{ y: 0 }}
                                    exit={{ y: '-100%' }}
                                    transition={{ duration: 0.5 }}
                                    className={styles.noteTap}
                                >
                                    <NoteCourse id={idDocument} title={nameDocument} time={playedSeconds} onClose={toggleNote} />
                                </motion.div>
                            )}
                        </div>
                    ) : (
                        null
                    )}

                    {isFAQ && (
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ duration: 0.5 }}
                            className={styles.FAQ}
                        >
                            <Faq course_Id={course_Id} onClose={toggleFaq} course={course} />
                        </motion.div>
                    )}
                </div>

                {
                    tippyVisible && isVisible ? (
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 2 }}
                            exit={{ x: '-100%' }}
                            transition={{ duration: 0.5 }}
                        >
                            <CodeDev />
                        </motion.div>
                    ) : (
                        isVisible && (
                            <div className={`${styles.fixed} ${styles.listCourse}`}>
                                <div className={styles.searchContainer}>
                                    <input
                                        className={styles.inputSearch}
                                        type="text"
                                        placeholder="Tìm kiếm bài học"
                                    />
                                </div>
                                {course.map((item, index) => (
                                    <div key={index} className={styles.listItem}>
                                        <div className={styles.listItem__title} onClick={() => toggleItem(index)}>
                                            <div className={styles.listItem__titleText}>{index + 1}. {item.chapter_name}</div>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                className={`${styles.listItem__icon} ${openIndexes.includes(index) ? styles.rotated : ''}`}>
                                                <path
                                                    d="M18 15L12 9L6 15"
                                                    stroke="#B3B3B3"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        {openIndexes.includes(index) && (
                                            <ul className={styles.listItem__docs}>

                                                {item.documents.map((doc, subIndex) => (

                                                    <li key={subIndex} className={`${styles.listItem__doc}`}
                                                        style={{
                                                            backgroundColor: activeDocIndex === subIndex ? "#f0f0f0" : "#fff",
                                                        }}

                                                        onClick={() => {
                                                            setActiveDocIndex(subIndex);
                                                            setnameDocument(doc.name_document);
                                                            settypeDoc(doc.type_document);
                                                            setIdDocument(doc.document_id)
                                                            settimedocument(formatDateTime(doc.updated_at));
                                                            setUrlVideo(doc.url_video);
                                                            setdoc_id(doc.document_id)

                                                            if (doc.type_document === 'quiz' && doc.questions) {
                                                                setQuestion(doc.questions);
                                                                setContent(false);
                                                            } else if (doc.type_document === 'code' && doc.codes) {
                                                                console.log(doc.type_document)
                                                                setCode(doc.codes);
                                                                setContent(false);
                                                            } else if (doc.type_document === 'video') {
                                                                setContent(true);
                                                            }
                                                        }}>
                                                        <div className={styles.doc_title} >
                                                            {doc.type_document === "video" ? (
                                                                // Icon video
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                                    <g clipPath="url(#clip0_4106_3787)">
                                                                        <circle cx="9.99935" cy="9.99999" r="8.33333" stroke="#B3B3B3" strokeWidth="1.5" />
                                                                        <path
                                                                            d="M12.8447 9.11752C13.4962 9.50215 13.4962 10.4978 12.8447 10.8825L8.91124 13.2048C8.27809 13.5786 7.5 13.0921 7.5 12.3224L7.5 7.67762C7.5 6.90788 8.27809 6.42133 8.91124 6.79515L12.8447 9.11752Z"
                                                                            stroke="#B3B3B3"
                                                                            strokeWidth="1.5" />
                                                                    </g>
                                                                    <defs>
                                                                        <clipPath id="clip0_4106_3787">
                                                                            <rect width="20" height="20" fill="white" />
                                                                        </clipPath>
                                                                    </defs>
                                                                </svg>
                                                            ) : (
                                                                // Icon tài liệu
                                                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                                                    <path opacity="0.5" d="M3.33398 18.3335H16.6673" stroke="#B3B3B3" stroke-width="1.5" stroke-linecap="round" />
                                                                    <path d="M12.1919 2.43436L11.574 3.05228L5.8932 8.7331C5.50843 9.11788 5.31604 9.31027 5.15058 9.52239C4.95541 9.77263 4.78807 10.0434 4.65155 10.3299C4.53581 10.5727 4.44977 10.8308 4.27769 11.3471L3.54852 13.5346L3.37028 14.0693C3.2856 14.3233 3.35172 14.6034 3.54107 14.7927C3.73042 14.9821 4.0105 15.0482 4.26455 14.9635L4.79926 14.7853L6.98677 14.0561L6.9868 14.0561C7.50301 13.884 7.76112 13.798 8.00397 13.6823C8.29045 13.5457 8.5612 13.3784 8.81143 13.1832C9.02355 13.0178 9.21594 12.8254 9.60071 12.4406L9.60072 12.4406L15.2815 6.75979L15.8995 6.14187C16.9233 5.11807 16.9233 3.45816 15.8995 2.43436C14.8757 1.41055 13.2157 1.41055 12.1919 2.43436Z" stroke="#B3B3B3" stroke-width="1.5" />
                                                                    <path opacity="0.5" d="M11.5724 3.05273C11.5724 3.05273 11.6496 4.36581 12.8082 5.52441C13.9668 6.68301 15.2799 6.76025 15.2799 6.76025M4.79762 14.7858L3.54688 13.535" stroke="#B3B3B3" stroke-width="1.5" />
                                                                </svg>
                                                            )}
                                                            <div className={styles.listItem__docTitle}
                                                            >
                                                                <span className={styles.listItem__docIndex}>{`${index + 1}.${subIndex + 1}`}  </span>
                                                                {/* {doc.document_id} */}
                                                                <span className={styles.listItem__docName}> {doc.name_document} </span>
                                                            </div>
                                                        </div>
                                                        {
                                                            doc.status_video === true ? (<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                                <g clipPath="url(#clip0_4331_7659)">
                                                                    <circle cx="6" cy="6" r="5" stroke="#24A148" stroke-width="1.5" />
                                                                    <path d="M4.25 6.25L5.25 7.25L7.75 4.75" stroke="#24A148" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                                                                </g>
                                                                <defs>
                                                                    <clipPath id="clip0_4331_7659">
                                                                        <rect width="12" height="12" fill="white" />
                                                                    </clipPath>
                                                                </defs>
                                                            </svg>) : (<svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
                                                                <g clipPath="url(#clip0_4979_2333)">
                                                                    <path d="M1 8C1 6.58579 1 5.87868 1.43934 5.43934C1.87868 5 2.58579 5 4 5H8C9.41421 5 10.1213 5 10.5607 5.43934C11 5.87868 11 6.58579 11 8C11 9.41421 11 10.1213 10.5607 10.5607C10.1213 11 9.41421 11 8 11H4C2.58579 11 1.87868 11 1.43934 10.5607C1 10.1213 1 9.41421 1 8Z" stroke="#B3B3B3" stroke-width="1.5" />
                                                                    <path d="M6 7V9" stroke="#B3B3B3" stroke-width="1.5" stroke-linecap="round" />
                                                                    <path d="M3 5V4C3 2.34315 4.34315 1 6 1C7.65685 1 9 2.34315 9 4V5" stroke="#B3B3B3" stroke-width="1.5" stroke-linecap="round" />
                                                                </g>
                                                                <defs>
                                                                    <clipPath id="clip0_4979_2333">
                                                                        <rect width="12" height="12" fill="white" />
                                                                    </clipPath>
                                                                </defs>
                                                            </svg>)
                                                        }

                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )
                    )
                }


            </div >

        );
    }, [course, isNote, isFAQ, tippyVisible, isVisible, openIndexes, playedSeconds, urlVideo, nameDocument, typeDoc]);



    // user
    const avatar: string = user?.avatar ?? '';

    // Lấy dữ liệu từ localStorage
    useEffect(() => {
        const storedData = localStorage.getItem('progress_percentages');
        if (storedData) {
            const parsedData = JSON.parse(storedData);
            setprogress(parsedData || null);
        }
    }, [id]);

    // lấy ra tất cả note của người dùng


    return (
        <main className={styles.main}>
            {isNoti ? (<Notification type={typeNoti!} message={messageNoti} />) : null}

            <Navbar className={stylesNav.nav} >
                <div className={stylesNav.brandProgress}>
                    <Link href="/" className={stylesNav.brandHeader}>
                        <Image src="/img/logo.svg" alt="logo" className={stylesNav.imgBrandHeader} width={54} height={56} />
                    </Link>
                    <h4 className={stylesNav.heading}>{progress?.course_name}</h4>
                    <ProgressCircle progress={progress?.progress_percentage ?? 0} />
                </div>
                <div className={stylesNav.cta}>
                    <label className={stylesNav.switch} onClick={toggleSwitch}>
                        <span className={`${stylesNav.slider} ${isActive ? stylesNav.active : ''}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <g filter="url(#filter0_i_4106_6840)">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M1.46447 1.46447C0 2.92893 0 5.28595 0 10C0 14.714 0 17.0711 1.46447 18.5355C2.92893 20 5.28595 20 10 20C14.714 20 17.0711 20 18.5355 18.5355C20 17.0711 20 14.714 20 10C20 5.28595 20 2.92893 18.5355 1.46447C17.0711 0 14.714 0 10 0C5.28595 0 2.92893 0 1.46447 1.46447ZM11.4881 4.44591C11.8882 4.55311 12.1256 4.96437 12.0184 5.36447L9.4302 15.0237C9.32299 15.4238 8.91174 15.6613 8.51164 15.5541C8.11154 15.4468 7.8741 15.0356 7.98131 14.6355L10.5695 4.97624C10.6767 4.57614 11.088 4.3387 11.4881 4.44591ZM12.9697 6.46967C13.2626 6.17678 13.7374 6.17678 14.0303 6.46967L14.2387 6.67801C14.874 7.3133 15.4038 7.84308 15.7678 8.32019C16.1521 8.82379 16.4216 9.35587 16.4216 10C16.4216 10.6441 16.1521 11.1762 15.7678 11.6798C15.4038 12.1569 14.874 12.6867 14.2387 13.322L14.0303 13.5303C13.7374 13.8232 13.2626 13.8232 12.9697 13.5303C12.6768 13.2374 12.6768 12.7626 12.9697 12.4697L13.1412 12.2981C13.8229 11.6164 14.2797 11.1574 14.5753 10.7699C14.8577 10.3998 14.9216 10.1843 14.9216 10C14.9216 9.81571 14.8577 9.60024 14.5753 9.23007C14.2797 8.84258 13.8229 8.38356 13.1412 7.70191L12.9697 7.53033C12.6768 7.23744 12.6768 6.76257 12.9697 6.46967ZM5.96986 6.46967C6.26275 6.17678 6.73762 6.17678 7.03052 6.46967C7.32341 6.76257 7.32341 7.23744 7.03052 7.53033L6.85894 7.70191C6.17729 8.38356 5.72052 8.84258 5.42488 9.23007C5.14245 9.60024 5.07861 9.81571 5.07861 10C5.07861 10.1843 5.14245 10.3998 5.42488 10.7699C5.72052 11.1574 6.17729 11.6164 6.85894 12.2981L7.03052 12.4697C7.32341 12.7626 7.32341 13.2374 7.03052 13.5303C6.73762 13.8232 6.26275 13.8232 5.96986 13.5303L5.76151 13.322C5.12617 12.6867 4.59638 12.1569 4.23235 11.6798C3.84811 11.1762 3.57861 10.6441 3.57861 10C3.57861 9.35587 3.84811 8.82379 4.23235 8.32019C4.59638 7.84308 5.12617 7.31331 5.76151 6.67801L5.96986 6.46967Z" />
                                </g>
                                <defs>
                                    <filter id="filter0_i_4106_6840" x="0" y="0" width="20" height="22" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                                        <feFlood floodOpacity="0" result="BackgroundImageFix" />
                                        <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                                        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
                                        <feOffset dy="2" />
                                        <feGaussianBlur stdDeviation="2" />
                                        <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
                                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
                                        <feBlend mode="normal" in2="shape" result="effect1_innerShadow_4106_6840" />
                                    </filter>
                                </defs>
                            </svg>
                        </span>
                    </label>

                    <div className={stylesNav.iconNotifition}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 11.094 21.8795 10.2162 21.6537 9.38161C21.5684 9.06633 21.1987 8.94083 20.9028 9.0791C20.3248 9.34916 19.68 9.5 19 9.5C16.5147 9.5 14.5 7.48528 14.5 5C14.5 4.31996 14.6508 3.67516 14.9209 3.09722C15.0592 2.80131 14.9337 2.4316 14.6184 2.3463C13.7838 2.12048 12.906 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22Z" fill="#808080" />
                            <circle cx="19" cy="5" r="3" fill="#24A148" />
                        </svg>
                    </div>
                    <Tippy visible={isNoteList} onClickOutside={hideNoteList} interactive={true} render={attrs => (
                        <div className={stylesNav.Note} tabIndex={-1} {...attrs}>
                            {note === null ? (
                                <p className={stylesNav.noNotes}>Chưa có ghi chú nào</p> // Hiển thị thông báo nếu không có ghi chú
                            ) : (
                                <>
                                    <div className={stylesNav.noteTitle}>Ghi chú của bạn</div> {/* Tiêu đề hiển thị một lần */}
                                    {note?.map((note, index) => (
                                        <div key={note.note_id || index} className={stylesNav.noteItem}> {/* Sử dụng note.id nếu có */}
                                            <div className={stylesNav.noteHeader}>
                                                <p className={stylesNav.noteItemName}>Tên bài học</p>
                                                <p className={stylesNav.noteItem__title}>{note.title_note}</p>
                                            </div>
                                            <div className={stylesNav.noteBody}>
                                                <p className={stylesNav.noteItem__content}>{note.content_note}</p>
                                                <p className={stylesNav.noteItem__content}>{note.cache_time_note}</p>
                                            </div>
                                        </div>
                                    ))}
                                </>
                            )}
                        </div>
                    )}>
                        <div className={stylesNav.iconNotifition} onClick={isNoteList ? hideNoteList : showNoteList}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="20" viewBox="0 0 18 20" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M4.81 0H13.191C16.28 0 18 1.78 18 4.83V15.16C18 18.26 16.28 20 13.191 20H4.81C1.77 20 0 18.26 0 15.16V4.83C0 1.78 1.77 0 4.81 0ZM5.08 4.66V4.65H8.069C8.5 4.65 8.85 5 8.85 5.429C8.85 5.87 8.5 6.22 8.069 6.22H5.08C4.649 6.22 4.3 5.87 4.3 5.44C4.3 5.01 4.649 4.66 5.08 4.66ZM5.08 10.74H12.92C13.35 10.74 13.7 10.39 13.7 9.96C13.7 9.53 13.35 9.179 12.92 9.179H5.08C4.649 9.179 4.3 9.53 4.3 9.96C4.3 10.39 4.649 10.74 5.08 10.74ZM5.08 15.31H12.92C13.319 15.27 13.62 14.929 13.62 14.53C13.62 14.12 13.319 13.78 12.92 13.74H5.08C4.78 13.71 4.49 13.85 4.33 14.11C4.17 14.36 4.17 14.69 4.33 14.95C4.49 15.2 4.78 15.35 5.08 15.31Z" fill="#808080" />
                            </svg>
                        </div>
                    </Tippy>

                    <Tippy visible={visible} onClickOutside={hide} interactive={true} render={attrs => (
                        <div className={stylesNav.tippyBox} tabIndex={-1} {...attrs}>
                            <div className={stylesNav.menuContent}>
                                <p className={stylesNav.menuTitle}>Tùy chọn</p>
                                <Link href="#!" className={stylesNav.menuLink}><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                    <path d="M7.28451 10.3333C7.10026 10.8546 7 11.4156 7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12C17 9.23858 14.7614 7 12 7C11.4156 7 10.8546 7.10026 10.3333 7.28451" stroke="#B3B3B3" stroke-width="1.5" stroke-linecap="round" />
                                    <path d="M12 2V4" stroke="#B3B3B3" stroke-width="1.5" stroke-linecap="round" />
                                    <path d="M12 20V22" stroke="#B3B3B3" stroke-width="1.5" stroke-linecap="round" />
                                    <path d="M4 12L2 12" stroke="#B3B3B3" stroke-width="1.5" stroke-linecap="round" />
                                    <path d="M22 12L20 12" stroke="#B3B3B3" stroke-width="1.5" stroke-linecap="round" />
                                    <path d="M19.7773 4.22217L17.5553 6.25375" stroke="#B3B3B3" stroke-width="1.5" stroke-linecap="round" />
                                    <path d="M4.22266 4.22217L6.44467 6.25375" stroke="#B3B3B3" stroke-width="1.5" stroke-linecap="round" />
                                    <path d="M6.44531 17.5557L4.22309 19.7779" stroke="#B3B3B3" stroke-width="1.5" stroke-linecap="round" />
                                    <path d="M19.7773 19.7778L17.5553 17.5555" stroke="#B3B3B3" stroke-width="1.5" stroke-linecap="round" />
                                </svg> Bật giao diện tối
                                </Link>
                                <p className={stylesNav.menuTitle}>Cài đặt</p>
                                <Link href="#!" className={stylesNav.menuLink}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M18.4023 11.5801C18.76 11.7701 19.036 12.0701 19.2301 12.3701C19.6083 12.9901 19.5776 13.7501 19.2097 14.4201L18.4943 15.6201C18.1162 16.2601 17.411 16.6601 16.6855 16.6601C16.3278 16.6601 15.9292 16.5601 15.6022 16.3601C15.3365 16.1901 15.0299 16.1301 14.7029 16.1301C13.6911 16.1301 12.8429 16.9601 12.8122 17.9501C12.8122 19.1001 11.872 20.0001 10.6968 20.0001H9.30692C8.12145 20.0001 7.18125 19.1001 7.18125 17.9501C7.16081 16.9601 6.31259 16.1301 5.30085 16.1301C4.96361 16.1301 4.65702 16.1901 4.40153 16.3601C4.0745 16.5601 3.66572 16.6601 3.31825 16.6601C2.58245 16.6601 1.87729 16.2601 1.49917 15.6201L0.79402 14.4201C0.415896 13.7701 0.395456 12.9901 0.773581 12.3701C0.937094 12.0701 1.24368 11.7701 1.59115 11.5801C1.87729 11.4401 2.06125 11.2101 2.23498 10.9401C2.74596 10.0801 2.43937 8.95012 1.57071 8.44012C0.55897 7.87012 0.231943 6.60012 0.814459 5.61012L1.49917 4.43012C2.09191 3.44012 3.35913 3.09012 4.38109 3.67012C5.27019 4.15012 6.425 3.83012 6.9462 2.98012C7.10972 2.70012 7.20169 2.40012 7.18125 2.10012C7.16081 1.71012 7.27323 1.34012 7.4674 1.04012C7.84553 0.420122 8.53024 0.0201221 9.27627 0.00012207H10.7172C11.4735 0.00012207 12.1582 0.420122 12.5363 1.04012C12.7203 1.34012 12.8429 1.71012 12.8122 2.10012C12.7918 2.40012 12.8838 2.70012 13.0473 2.98012C13.5685 3.83012 14.7233 4.15012 15.6226 3.67012C16.6344 3.09012 17.9118 3.44012 18.4943 4.43012L19.179 5.61012C19.7718 6.60012 19.4447 7.87012 18.4228 8.44012C17.5541 8.95012 17.2475 10.0801 17.7687 10.9401C17.9322 11.2101 18.1162 11.4401 18.4023 11.5801ZM7.10972 10.0101C7.10972 11.5801 8.4076 12.8301 10.0121 12.8301C11.6165 12.8301 12.8838 11.5801 12.8838 10.0101C12.8838 8.44012 11.6165 7.18012 10.0121 7.18012C8.4076 7.18012 7.10972 8.44012 7.10972 10.0101Z" fill="#B3B3B3" />
                                    </svg>
                                    Cài đặt
                                </Link>
                                <Link href="#!" className={stylesNav.menuLink} onClick={handleLogout}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="21" height="20" viewBox="0 0 21 20" fill="none">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M7.89535 9.23C7.45785 9.23 7.11192 9.57 7.11192 10C7.11192 10.42 7.45785 10.77 7.89535 10.77H14V15.55C14 18 11.9753 20 9.47238 20H4.51744C2.02471 20 0 18.01 0 15.56V4.45C0 1.99 2.03488 0 4.52762 0H9.49273C11.9753 0 14 1.99 14 4.44V9.23H7.89535ZM17.6302 6.5402L20.5502 9.4502C20.7002 9.6002 20.7802 9.7902 20.7802 10.0002C20.7802 10.2002 20.7002 10.4002 20.5502 10.5402L17.6302 13.4502C17.4802 13.6002 17.2802 13.6802 17.0902 13.6802C16.8902 13.6802 16.6902 13.6002 16.5402 13.4502C16.2402 13.1502 16.2402 12.6602 16.5402 12.3602L18.1402 10.7702H14.0002V9.2302H18.1402L16.5402 7.6402C16.2402 7.3402 16.2402 6.8502 16.5402 6.5502C16.8402 6.2402 17.3302 6.2402 17.6302 6.5402Z" fill="#B3B3B3" />
                                    </svg>
                                    Đăng xuất
                                </Link>

                            </div>
                        </div>
                    )}>
                        <div className={stylesNav.menuOptions} onClick={visible ? hide : show}>
                            <Image src={avatar} alt="logo" className={stylesNav.userImage} width={34} height={80} />
                            <h4 className={stylesNav.titleName}>{user?.fullname}</h4>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M6 9L12 15L18 9" stroke="#237DF7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                    </Tippy>
                </div>
            </Navbar >

            <div className={styles.container}>
                {/* Video */}
                {mappedCourseNew}
            </div>
            <div className={`${styles.actionBar}`}>
                <div className={styles.faq} onClick={toggleFaq}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
                        <circle cx="25.0003" cy="25" r="20.8333" stroke="#237DF7" stroke-width="1.5" />
                        <path d="M21.0938 18.4896C21.0938 16.3322 22.8426 14.5833 25 14.5833C27.1574 14.5833 28.9062 16.3322 28.9062 18.4896C28.9062 19.9218 28.1355 21.1739 26.9862 21.8539C25.9959 22.4398 25 23.3286 25 24.4792V27.0833" stroke="#237DF7" stroke-width="1.5" stroke-linecap="round" />
                        <circle cx="25.0003" cy="33.3333" r="2.08333" fill="#237DF7" />
                    </svg>
                </div>
                <div className={styles.ctaNextPev}>
                    <Link href={"/#"} className={styles.nextPrevCourse}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M15 18L9 12L15 6" stroke="" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        <p className={styles.titleNextPrev}>Bài trước</p>
                    </Link>
                    <Link href={"/#"} className={styles.nextPrevCourse}>
                        <p className={styles.titleNextPrev}>Bài tiếp theo</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M9 18L15 12L9 6" stroke="" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                    </Link>
                </div>
                <div className={styles.cateSec}>
                    <span>Chương 1: Bắt đầu</span>
                    <div className={styles.iconCatesec} onClick={toggleVisibility}>
                        <svg className={isVisible ? styles.rotated : ''} xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="#234587">
                            <path fillRule="evenodd" clipRule="evenodd" d="M20.3892 0.803629C21.3558 1.46469 22 2.64499 22 4.0329V17.9671C22 19.355 21.3558 20.5353 20.3892 21.1964C19.4104 21.8658 18.1152 21.9826 16.9723 21.2446L6.18329 14.2775C5.03297 13.5346 4.5 12.2341 4.5 11C4.5 9.76587 5.03297 8.46536 6.18329 7.72253L16.9723 0.755426C18.1152 0.0173917 19.4104 0.134203 20.3892 0.803629Z" />
                        </svg>
                    </div>
                </div>

            </div>
        </main>
    );
}
export default Learning;