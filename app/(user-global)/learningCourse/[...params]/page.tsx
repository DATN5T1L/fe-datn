"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { useLogout } from '@app/(user-global)/component/auth/user-component/useLogout';
import useCookie from '@app/(user-global)/component/hook/useCookie';
import { Navbar } from "react-bootstrap";
import Tippy from '@tippyjs/react/headless';
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from 'framer-motion';
import { useParams } from "next/navigation";
import CodeDev from "../codeDev";
import CodeDevLearning from "../CodeDevLearning";
import ProgressCircle from '@app/(user-global)/component/course/ProgressCircle';
import Button from "@app/(user-global)/component/globalControl/btnComponent";
import Faq from "../Faq";
import NoteContent from "../NoteContent";
import NoteCourse from "../NoteCourse";
import Questions from '../Questions';
import VideoPlayer from '../VideoPlayer';
import { Arrow, IconWhat, IconDoc, IconVideo, IconSun, IconNote, IconBell, IconSetting, IconLogout, IconCode } from "@/app/(user-global)/component/icon/icons";
import Notification from "@app/(user-global)/component/globalControl/Notification";
import { formatDateTime, formatTime, ShowNameElement } from "@/app/(user-global)/component/globalControl/commonC";
import DocumentStatus from '../statusDoc';
import stylesNav from "@public/styles/globalControl/Nav.module.css";
import styles from "@public/styles/Learning/Learning.module.css";
type NotiType = 'success' | 'error' | 'fail' | 'complete';
const Learning = () => {
    const token = useCookie('token');
    const params = useParams();
    const [id, doc_idParam, time] = params.params;
    const [doc_id, setdoc_id] = useState<string>(doc_idParam || "");
    const userState = useSelector((state: RootState) => state.user);
    const user = userState?.user;
    const avatar: string = user?.avatar ?? '';
    const { handleLogout } = useLogout();
    const [isNoti, setNoti] = useState(false);
    const [isContent, setContent] = useState(true);
    const [typeNoti, setTypeNoti] = useState<NotiType | null>(null);
    const [messageNoti, setmessageNoti] = useState("");
    const [course, setCourse] = useState<Chapter[] | null>(null);
    const [question, setQuestion] = useState<QuestionsDocument['questions'] | null>(null);
    const [code, setCode] = useState<CodesDocument['codes'] | null>(null);
    const [progress, setprogress] = useState<Progress>();
    const [nameDocument, setnameDocument] = useState('');
    const [idDocument, setIdDocument] = useState('');
    const [typeDoc, settypeDoc] = useState<string | null>(null);
    const [descdocument, setdescdocument] = useState<string | null>(null);
    const [note, setNote] = useState<Note[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [idCourse, setIdCourse] = useState<string>("");
    const [chapter_id, setChapter_id] = useState<string>("");
    const [chapterName, setChapterName] = useState<string>("");
    const course_Id = idCourse;
    const [urlVideo, setUrlVideo] = useState('');
    const [playedSeconds, setPlayedSeconds] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [html, setHtml] = useState<string>('');
    const [css, setCss] = useState<string>('');
    const [js, setJs] = useState<string>('');
    const [statusVideo, setStatusVideo] = useState<boolean>(false)
    const [visible, setVisible] = useState(false);
    const [isFooterCta, setIsFooterCTA] = useState(true);
    const [isNote, setIsNote] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [tippyVisible, setTippyVisible] = useState(false);
    const [isFAQ, setFAQ] = useState(false);
    const [isNoteContent, setIsNoteContent] = useState(false);
    const toggleSwitch = () => {
        setIsActive(!isActive);
        setTippyVisible(prev => !prev);
    };
    const show = () => setVisible(true);
    const hide = () => setVisible(false);
    const toggleNote = () => {
        setIsNote(prev => !prev);
        setIsPlaying(prev => !prev);
    };
    const toggleFaq = () => {
        setFAQ(prev => !prev);
    };
    const toggleNoteList = () => {
        setIsNoteContent(prev => !prev);
    };
    const toggleVisibility = () => {
        setIsVisible(!isVisible);
    };
    const handelIsPlaying = () => {
        setIsPlaying(!isPlaying);
    }
    const fetchIdCourse = async (id: string) => {
        try {
            const response = await fetch(`/api/slugById/${id}/Course`);
            if (!response.ok) {
                throw new Error(`API error: ${response.status}`);
            }
            const result = await response.json();
            setIdCourse(result.Course);
        } catch (error: any) {
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        if (id) fetchIdCourse(id)
    }, [id])
    const fetchDocuments = async (retries = 3): Promise<CourseData | null> => {
        try {
            const response = await fetch(`/api/getdocforyou/${course_Id}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                if (response.status === 401 && retries > 0) {

                    return await fetchDocuments(retries - 1);
                }
                throw new Error("Không thể lấy dữ liệu");
            }

            const result = await response.json() as CourseData;
            setCourse(result.data)
            return result;
        } catch (err: any) {
            setError(err.message);
            return null;
        }
    };
    const fetchProgress = async () => {
        try {
            const response = await fetch(`/api/getProgress/${course_Id}`, {
                method: "GET",
                headers: {
                    Authorization: ` ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error("Failed to fetch course");
            }

            const dataProgress = await response.json();
            const ProgressData = dataProgress[0][0]
            setprogress(ProgressData)
        } catch (err: any) {
            setError(err.message);
        }
    };

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
        } catch (err: any) {
            setError(err.message);
        }
    };


    useEffect(() => {
        if (course_Id) {
            fetchProgress()
            fetchDocuments()
        }
    }, [course_Id]);

    // lấy ra note

    const handleReload = () => {
        fetchProgress();
        fetchDocuments();
        fetchCreatStatus();
    }

    useEffect(() => {
        if (doc_id !== null) {
            fetchCreatStatus();
        }
    }, [doc_id]);

    const [openIndexes, setOpenIndexes] = useState<number[]>([]);

    const toggleItem = useCallback((index: number) => {
        setOpenIndexes(prev =>
            prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
        );
    }, []);

    // hàm định dạng ngày giờ
    const [timedocument, settimedocument] = useState('');
    // hàm sử lý tách nội dung câu hỏi
    const handleExport = (data: { html: string, css: string, js: string }) => {
        setHtml(data.html)
        setCss(data.css)
        setJs(data.js)
    };

    const handleProgressChange = (playedSeconds: number) => {
        setPlayedSeconds(playedSeconds)
    };

    useEffect(() => {
        if (course && Array.isArray(course)) {
            const findInactiveDocument = (course: Chapter[]): { document_id: string; chapter_id: string; chapter_name: string } | null => {
                for (const chapter of course) {
                    const inactiveDoc = chapter.documents.find(doc => !doc.status_document);
                    if (inactiveDoc) {
                        return {
                            document_id: inactiveDoc.document_id,
                            chapter_id: chapter.chapter_id,
                            chapter_name: chapter.chapter_name
                        };
                    } else {
                        handleIsComplete();
                    }
                    // alert('Bạn đã hoàn thành khóa học')
                }
                return null;
            };
            const findLessonByDocId = (
                course: Chapter[],
                targetDocId: string
            ): { chapter_id: string; chapter_name: string; document_id: string } | null => {
                for (const chapter of course) {
                    // Tìm tài liệu trong danh sách documents của chapter
                    const targetDoc = chapter.documents.find(doc => doc.document_id === targetDocId);
                    if (targetDoc) {
                        return {
                            chapter_id: chapter.chapter_id,
                            chapter_name: chapter.chapter_name,
                            document_id: targetDoc.document_id
                        };
                    }
                }
                return null; // Trả về null nếu không tìm thấy tài liệu
            };
            if (doc_idParam) {
                const inactiveDoc = findLessonByDocId(course, doc_id);
                if (inactiveDoc) {
                    const { chapter_id, chapter_name, document_id, } = inactiveDoc;
                    const initialDocs = course
                        .find(chapter => chapter.chapter_id === chapter_id)
                        ?.documents.find(doc => doc.document_id === document_id);
                    if (initialDocs) {
                        // Đặt trạng thái và gọi các hàm cần thiết
                        setdoc_id(initialDocs.document_id); // Gán document_id
                        setChapter_id(chapter_id); // Gán chapter_id
                        handleClickDoc(initialDocs);
                        setChapterName(chapter_name)
                        // Tìm chỉ số của tài liệu và chương để đặt selectedIndex
                        const chapterIndex = course.findIndex(chapter => chapter.chapter_id === chapter_id);
                        const docIndex = course[chapterIndex]?.documents.findIndex(doc => doc.document_id === document_id);

                        if (chapterIndex >= 0 && docIndex >= 0) {
                            setSelectedIndex(`${chapterIndex}-${docIndex}`);
                            toggleItem(chapterIndex);
                        }
                    }
                }
            } else {
                const inactiveDoc = findInactiveDocument(course);
                if (inactiveDoc) {
                    const { document_id, chapter_id, chapter_name } = inactiveDoc;

                    // Tìm tài liệu không hoạt động dựa trên document_id
                    const initialDocs = course
                        .find(chapter => chapter.chapter_id === chapter_id)
                        ?.documents.find(doc => doc.document_id === document_id);

                    if (initialDocs) {
                        // Đặt trạng thái và gọi các hàm cần thiết
                        setdoc_id(initialDocs.document_id); // Gán document_id
                        setChapter_id(chapter_id); // Gán chapter_id
                        handleClickDoc(initialDocs);
                        setChapterName(chapter_name)
                        // Tìm chỉ số của tài liệu và chương để đặt selectedIndex
                        const chapterIndex = course.findIndex(chapter => chapter.chapter_id === chapter_id);
                        const docIndex = course[chapterIndex]?.documents.findIndex(doc => doc.document_id === document_id);

                        if (chapterIndex >= 0 && docIndex >= 0) {
                            setSelectedIndex(`${chapterIndex}-${docIndex}`);
                            toggleItem(chapterIndex);
                        }
                    }
                }

            }

        }
    }, [course]);

    const handleClickDoc = (doc: CombinedDocument) => {
        setnameDocument(doc.name_document);
        settypeDoc(doc.type_document);
        setIdDocument(doc.document_id);
        settimedocument(formatDateTime(doc.updated_at));
        setdoc_id(doc.document_id);
        setdescdocument(doc.discription_document);
        setStatusVideo(doc.status_document)
        switch (doc.type_document) {
            case "quiz":
                if (doc.questions) {
                    console.log(doc.questions)
                    setQuestion(doc.questions);
                    setContent(false);
                }
                break;
            case "code":
                if (doc.codes) {
                    setCode(doc.codes);
                    setContent(false);
                }
                break;
            case "video":
                setUrlVideo((doc as VideoDocument).url_video);
                setContent(true);
                break;
            default:
                console.error("Không xác định loại tài liệu:");
        }
    };


    const renderContent = () => {
        if (typeDoc === 'video') {
            console.log("Rendering Video Player");
            return (
                <VideoPlayer
                    course_id={course_Id}
                    document_id={doc_id}
                    urlVideo={urlVideo}
                    status_video={statusVideo}
                    onProgressChange={handleProgressChange}
                    isPlaying={isPlaying}
                    reload={handleReload}
                    startTime={parseInt(time)}
                />
            );
        } else if (typeDoc === 'quiz') {
            console.log("Rendering Quiz");
            return (
                <Questions
                    course_id={course_Id}
                    documents_id={doc_id}
                    nameDocument={nameDocument}
                    timedocument={timedocument}
                    questions={question}
                    reload={handleReload}
                />
            );
        } else if (typeDoc === 'code') {

            return (
                <div className={styles.wapperCode}>
                    {code && (
                        <CodeDevLearning
                            key={code.id}
                            onExport={handleExport}
                            reload={handleReload}
                            answer_code={code.answer_code}
                            correct_answer={code.correct_answer}
                            question_code={code.question_code}
                            tutorial_code={code.tutorial_code}
                            name_document={nameDocument}
                            updated_at={code.updated_at}
                            course_id={course_Id}
                            documents_id={doc_id}
                        />
                    )}
                </div>
            );
        } else {
            setIsVisible(false)
            setIsFooterCTA(false)
            return (
                <div className={styles.Certificate} >
                    {progress && (
                        <Link href={`/Certificate/${idCourse}/${progress.name_course}`}>
                            Đi đến trang nhận chứng chỉ
                        </Link>
                    )
                    }
                </div >
            );
        }
    };

    const [selectedIndex, setSelectedIndex] = useState<string | null>(null);

    const handleIsComplete = async () => {
        if (!course_Id || !token) {
            console.error("course_Id hoặc token không hợp lệ");
            return;
        }

        try {
            const response = await fetch(`/api/changeStatusCourseCompleted/${course_Id}`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
            const responseData = await response.json();

        } catch (err: any) {

        }
    };

    const handlePreviousLesson = ({
        course,
        selectedIndex,
        setSelectedIndex,
    }: {
        course: Chapter[];
        selectedIndex: string | null;
        setSelectedIndex: (index: string) => void;
    }) => {
        if (!selectedIndex) return;

        const [currentChapterIndex, currentDocIndex] = selectedIndex.split('-').map(Number);

        // Nếu không phải bài đầu tiên trong chapter
        if (currentDocIndex > 0) {
            setSelectedIndex(`${currentChapterIndex}-${currentDocIndex - 1}`);
            handleClickDoc(course[currentChapterIndex].documents[currentDocIndex - 1]);
        }
        // Nếu là bài đầu tiên, chuyển về chapter trước (nếu có)
        else if (currentChapterIndex > 0) {
            const previousChapter = course[currentChapterIndex - 1];
            const lastDocIndex = previousChapter.documents.length - 1;

            // Kiểm tra trạng thái bài cuối cùng của chapter trước
            if (!previousChapter.documents[lastDocIndex]?.status_document) {
                alert('Bạn cần hoàn thành bài trước đó để tiếp tục.');
                return;
            }

            toggleItem(currentChapterIndex - 1)
            setSelectedIndex(`${currentChapterIndex - 1}-${lastDocIndex}`);
            setdoc_id(previousChapter.documents[lastDocIndex].document_id);
            handleClickDoc(previousChapter.documents[lastDocIndex]);
        } else {
            alert('Không có bài học trước.');
        }
    };

    const handleNextLesson = ({
        course,
        selectedIndex,
        setSelectedIndex,
    }: {
        course: Chapter[];
        selectedIndex: string | null;
        setSelectedIndex: (index: string) => void;
    }) => {
        if (!selectedIndex) return;

        const [currentChapterIndex, currentDocIndex] = selectedIndex.split('-').map(Number);

        const currentChapter = course[currentChapterIndex];
        if (currentDocIndex < currentChapter.documents.length - 1) {
            // Kiểm tra trạng thái bài hiện tại
            if (!currentChapter.documents[currentDocIndex]?.status_document) {
                alert('Bạn cần hoàn thành bài trước đó để tiếp tục.');
                return;
            }
            setSelectedIndex(`${currentChapterIndex}-${currentDocIndex + 1}`);
            handleClickDoc(currentChapter.documents[currentDocIndex + 1]);
        }
        // Nếu là bài cuối cùng, chuyển sang chapter tiếp theo (nếu có)
        else if (currentChapterIndex < course.length - 1) {
            const nextChapter = course[currentChapterIndex + 1];

            // Kiểm tra trạng thái bài đầu tiên của chapter tiếp theo
            if (!nextChapter.documents[0]?.status_document) {
                alert('Bạn cần hoàn thành bài trước đó để tiếp tục.');
                return;
            }

            toggleItem(currentChapterIndex + 1)
            setSelectedIndex(`${currentChapterIndex + 1}-0`);
            handleClickDoc(nextChapter.documents[0]);
        } else {
            alert('Không có bài học tiếp theo.');
        }
    };

    const renderChapterDocument = () => {
        // Trạng thái lưu chỉ số phần tử đã chọn
        if (course) {

            return (
                tippyVisible && isVisible ? (
                    <AnimatePresence>
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 2 }}
                            exit={{ x: '-100%' }}
                            transition={{ duration: 0.5 }}
                        >
                            <CodeDev />
                        </motion.div>
                    </AnimatePresence>
                ) : (
                    isVisible && (
                        <div className={`${styles.fixed} ${styles.listCourse}`}>
                            <div className={styles.coursesContent}>
                                {course?.map((item, index) => (
                                    <div key={index} className={styles.listItem}>
                                        <div className={styles.listItem__title} onClick={() => toggleItem(index)}>

                                            <div className={styles.listItem__titleText}>{index + 1}. {item.chapter_name}</div>


                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                className={`${styles.listItem__icon} ${openIndexes.includes(index) ? styles.rotated : ''}`}
                                            >
                                                <path
                                                    d="M18 15L12 9L6 15"
                                                    stroke="rgba(35, 125, 247, 1)"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </div>
                                        {openIndexes.includes(index) && (
                                            <ul className={styles.listItem__docs} key={index}>
                                                {item.documents.map((doc, subIndex) => {
                                                    // Kiểm tra xem bài học trước đã hoàn thành chưa


                                                    return (
                                                        <li
                                                            key={subIndex}
                                                            className={`${styles.listItem__doc}`}
                                                            style={{
                                                                backgroundColor:
                                                                    selectedIndex === `${index}-${subIndex}` ? "rgba(230, 240, 254, 1)" : "transparent",
                                                            }}
                                                            onClick={() => {
                                                                const isAllPreviousDocumentsCompleted = (currentIndex: number): boolean => {
                                                                    for (let i = 0; i < currentIndex; i++) {
                                                                        const previousCourse = course[i];
                                                                        if (previousCourse?.documents) {
                                                                            for (let doc of previousCourse.documents) {
                                                                                if (!doc.status_document) {
                                                                                    return false;
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                    return true;
                                                                };
                                                                const isPreviousDocumentCompleted =
                                                                    subIndex > 0 && item.documents[subIndex - 1]?.status_document === true;

                                                                const isCurrentDocumentBlocked =
                                                                    subIndex > 0 && !isPreviousDocumentCompleted;

                                                                // Kiểm tra điều kiện tài liệu bị khóa
                                                                if (!isAllPreviousDocumentsCompleted(index)) {
                                                                    alert('Bạn cần hoàn thành toàn bộ các tài liệu trong các chương trước để tiếp tục.');
                                                                    return;
                                                                } else if (isCurrentDocumentBlocked) {
                                                                    alert('Bạn cần hoàn thành bài trước đó để tiếp tục.');
                                                                    return;
                                                                }

                                                                setSelectedIndex(`${index}-${subIndex}`);
                                                                handleClickDoc(doc);
                                                            }}
                                                        >
                                                            <div className={styles.doc_title}>
                                                                {doc.type_document === "video" ? (
                                                                    <IconVideo />
                                                                ) : (
                                                                    <IconDoc />
                                                                )}
                                                                <div className={styles.listItem__docTitle}>
                                                                    <span className={styles.listItem__docIndex}>{`${index + 1}.${subIndex + 1}`}  </span>
                                                                    <ShowNameElement name={doc.name_document}>
                                                                        <span className={styles.listItem__docName}> {doc.name_document} </span>
                                                                    </ShowNameElement>
                                                                </div>
                                                            </div>
                                                            <DocumentStatus status_document={doc.status_document} />
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        )}
                                    </div>
                                ))}
                            </div>

                        </div>
                    ))
            )
        }


    }



    const ContentBody = () => {
        return (
            isContent ? (
                <div className={styles.body}>
                    {!isNote ? (
                        <>
                            <div className={styles.bodyTop} style={{ display: isFooterCta ? "flex" : "none" }}>
                                <div className={styles.bodyTitle}>
                                    <span className={styles.timeUpdate}>Cập nhật ngày {timedocument}</span>
                                    <h4 className={styles.titleCourse}>{nameDocument}</h4>
                                </div>
                                <Button
                                    onClick={() => {
                                        toggleNote();
                                        handelIsPlaying();
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
                                    {descdocument}
                                </p>
                            </div>
                        </>
                    ) : (
                        <AnimatePresence>
                            <motion.div
                                initial={{ y: '100%' }}
                                animate={{ y: 0 }}
                                exit={{ y: '-100%' }}
                                transition={{ duration: 0.5 }}
                                className={styles.noteTap}
                            >
                                <NoteCourse id={idDocument} title={nameDocument} time={playedSeconds} onClose={toggleNote} />
                            </motion.div>
                        </AnimatePresence>
                    )}
                </div >
            ) : (
                null
            )
        )
    }

    const HandleFaq = () => {
        return (
            isFAQ && (
                <AnimatePresence>
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ duration: 0.5 }}
                        className={styles.FAQ}
                    >
                        <Faq course_Id={course_Id} userImage={avatar} onClose={toggleFaq} />
                    </motion.div>
                </AnimatePresence>
            )
        )
    }
    const mappedCourseNew = useMemo(() => {
        if (!course || !Array.isArray(course)) return <>Trờ TTO chút xíu nhé</>; // Trả về null nếu không có course

        const contentLearning = renderContent();
        const contentChapterDocument = renderChapterDocument();
        const contentBody = ContentBody();
        const Faq = HandleFaq();
        return (
            <div className={styles.container}>
                <div className={`${styles.row}`}>
                    <div className={`${styles.flexGrow} ${styles.videoContainer}`}>
                        {contentLearning}

                        {contentBody}
                        {Faq}

                    </div>

                    {contentChapterDocument}
                </div>

            </div>
        );
    }, [course, isNote, isFAQ, tippyVisible, isVisible, openIndexes, playedSeconds, urlVideo, nameDocument, typeDoc]);



    // user


    // Lấy dữ liệu từ localStorage


    // lấy ra tất cả note của người dùng


    return (
        <main className={styles.main}>
            {isNoti ? (<Notification type={typeNoti!} message={messageNoti} />) : null}

            <Navbar className={stylesNav.nav} >
                <div className={stylesNav.brandProgress}>
                    <Link href="/" className={stylesNav.brandHeader}>
                        <Image src="/img/logo.svg" alt="Thực hiện dự án clone Facebook tại tto" className={stylesNav.imgBrandHeader} width={54} height={56} />
                    </Link>
                    {progress && (
                        <>
                            <h4 className={stylesNav.heading}>{progress.name_course}</h4>
                            <ShowNameElement name={"Tiến độ học tập"}>
                                <ProgressCircle progress={progress.progress_percentage ?? 0} />
                            </ShowNameElement>
                        </>
                    )}

                </div>
                <div className={stylesNav.cta}>

                    <label className={stylesNav.switch} onClick={toggleSwitch}>
                        <span className={`${stylesNav.slider} ${isActive ? stylesNav.active : ''}`}>
                            <IconCode />
                        </span>
                    </label>
                    <div className={stylesNav.iconNotifition} onClick={toggleNoteList}>
                        <ShowNameElement name={"Ghi chú của bạn"}>
                            <IconNote />
                        </ShowNameElement>
                    </div>
                    <Tippy visible={visible} onClickOutside={hide} interactive={true} render={attrs => (
                        <div className={stylesNav.tippyBox} tabIndex={-1} {...attrs}>
                            <div className={stylesNav.menuContent}>
                                <p className={stylesNav.menuTitle}>Tùy chọn</p>
                                <Link href="#!" className={stylesNav.menuLink}>
                                    <IconSun /> Bật giao diện tối
                                </Link>
                                <p className={stylesNav.menuTitle}>Cài đặt</p>
                                <Link href="#!" className={stylesNav.menuLink}>
                                    <IconSetting />
                                    Cài đặt
                                </Link>
                                <Link href="#!" className={stylesNav.menuLink} onClick={handleLogout}>
                                    <IconLogout />
                                    Đăng xuất
                                </Link>
                            </div>
                        </div>
                    )}>
                        <div className={stylesNav.menuOptions} onClick={visible ? hide : show}>
                            <Image src={avatar} alt="Thực hiện dự án clone Facebook tại tto" className={stylesNav.userImage} width={34} height={80} />
                            <h4 className={stylesNav.titleName}>{user?.fullname}</h4>
                            <Arrow deg="-180" />
                        </div>
                    </Tippy>
                </div>
            </Navbar >
            {mappedCourseNew}
            {!isFooterCta && (
                <div className={`${styles.actionBar}`}>
                    <div className={styles.faq} onClick={
                        () => {
                            toggleFaq();
                            handelIsPlaying();
                        }
                    }>
                        <ShowNameElement name={"Hỏi đáp"}>
                            <IconWhat />
                        </ShowNameElement>
                    </div>
                    <div className={styles.ctaNextPev}>
                        <button
                            className={styles.nextPrevCourse}
                            onClick={() => {
                                if (course) {
                                    handlePreviousLesson({ course, selectedIndex, setSelectedIndex });
                                }
                            }}
                        >
                            <Arrow deg="-180" />
                            <ShowNameElement name={"Về bài trước"}>
                                <p className={styles.titleNextPrev}>Bài trước</p>
                            </ShowNameElement>
                        </button>
                        <button
                            className={styles.nextPrevCourse}
                            onClick={() => {
                                if (course) {
                                    handleNextLesson({ course, selectedIndex, setSelectedIndex });
                                }
                            }}
                        >
                            <ShowNameElement name={"Bài kế tiếp Lưu ý chỉ được chuyển bài 1 lần"}>
                                <p className={styles.titleNextPrev}>Bài tiếp theo</p>
                            </ShowNameElement>
                            <Arrow deg="0" />
                        </button>
                    </div>
                    <div className={styles.cateSec}>
                        {
                            chapterName !== "" && (
                                <ShowNameElement name={`Chương ${chapterName}: ${nameDocument}`}>
                                    <span className={styles.chapterName}>Chương {chapterName}: {nameDocument}</span>
                                </ShowNameElement>
                            )
                        }
                        <div className={styles.iconCatesec} onClick={toggleVisibility}>
                            <svg className={isVisible ? styles.rotated : ''} xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="#234587">
                                <path fillRule="evenodd" clipRule="evenodd" d="M20.3892 0.803629C21.3558 1.46469 22 2.64499 22 4.0329V17.9671C22 19.355 21.3558 20.5353 20.3892 21.1964C19.4104 21.8658 18.1152 21.9826 16.9723 21.2446L6.18329 14.2775C5.03297 13.5346 4.5 12.2341 4.5 11C4.5 9.76587 5.03297 8.46536 6.18329 7.72253L16.9723 0.755426C18.1152 0.0173917 19.4104 0.134203 20.3892 0.803629Z" />
                            </svg>
                        </div>
                    </div>
                    {isNoteContent && (
                        <AnimatePresence>
                            <motion.div
                                initial={{ y: '100%' }}
                                animate={{ y: 0 }}
                                exit={{ y: '-110%' }}
                                transition={{ duration: 0.5 }}
                                className={styles.NoteList}
                            >
                                <NoteContent course_Id={course_Id} chapter_Id={chapter_id} doc_id={doc_id} userImage={avatar} onClose={toggleNoteList} />
                            </motion.div>
                        </AnimatePresence>
                    )}
                </div>
            )}

        </main>
    );
}
export default Learning;