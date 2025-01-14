import { useState, useEffect, useRef } from 'react';
import { Container, Col, Row } from "react-bootstrap";
import useCookie from '@app/(user-global)/component/hook/useCookie';
import Tippy from '@tippyjs/react/headless';
import Editor, { OnChange, useMonaco } from '@monaco-editor/react';
import Confetti from 'react-confetti';
import { UpdateStatusComponent } from '@app/(user-global)/component/Api/apiHoock';
import { formatDateTime, parseCode, cleaneds, cleaned } from "@/app/(user-global)/component/globalControl/commonC";
import styles from "@public/styles/Learning/codeDev.module.css";
import { useWindowSize } from 'react-use';

const CodeDevLearning: React.FC<CodeDevProps> = ({
    answer_code,
    correct_answer,
    question_code,
    tutorial_code,
    updated_at,
    name_document,
    course_id,
    documents_id,
    reload
}) => {
    const token = useCookie('token');
    const [html, setHtml] = useState<string>('<h1>Hello, World!</h1>');
    const [css, setCss] = useState<string>('h1 { color: blue; }');
    const [js, setJs] = useState<string>('');
    const [activeTab, setActiveTab] = useState('html');
    const [activeContentTab, setActiveContentTab] = useState('content');
    const [isSuggest, setSuggest] = useState<boolean>(false);
    const [iscorrectAnswer, setcorrectAnswer] = useState<boolean>(false);
    const [isSubmit, setSubmit] = useState<number>(0)
    const [showAlert, setShowAlert] = useState<boolean>(true);
    const [correctAnswer, setCorrectAnswer] = useState<string | null>(correct_answer ?? null);
    const [questionCode, setQuestionCode] = useState<codeAnswer | null>(null);
    const [tutorialCode, setTutorialCode] = useState<string | null>(tutorial_code ?? null);
    const [result, setResult] = useState<string | null>(null);
    const toggleSuggest = () => setSuggest((prev) => !prev);
    const toggleAnswer = () => setcorrectAnswer((prev) => !prev);
    const toggleAlert = () => setShowAlert((prev) => !prev);

    const [isCorrect, setIsCorrect] = useState(false);
    const [showConfetti, setShowConfetti] = useState(false);
    const { width, height } = useWindowSize();
    const [htmlAnswer = '', cssAnswer = '', jsAnswer = ''] = answer_code?.split('|') || [];
    const runCode = () => {
        const output = document.getElementById('output') as HTMLIFrameElement;
        const outputDocument = output?.contentDocument || output?.contentWindow?.document;
        if (outputDocument) {
            outputDocument.open();
            outputDocument.write(`
                <style>${css}</style>
                ${html}
                <script>${js}<\/script>
            `);
            outputDocument.close();
            const capturedOutputHTML = outputDocument.body.innerHTML.trim();
            const capturedCSS = cleaned(css);
            const htmlContent = capturedOutputHTML;
            const scriptTag = htmlContent.split('<script>');
            const cleanedContent = scriptTag.map(item =>
                item.replace(/\n/g, '').replace(/<\/script>$/, '')
            );
            const cleanedContents = cleaneds(cleanedContent);
            const [htmlDone, jsDone] = cleanedContents;
            compareOutput(htmlDone, capturedCSS, jsDone);
        }
    };
    const compareOutput = (capturedHTML: string, capturedCSS: string, capturedJS: string) => {
        const correctHTML = cleaned(htmlAnswer);
        const correctCSS = cleaned(cssAnswer);
        const correctJS = cleaned(jsAnswer);
        const htmlMatch = capturedHTML === correctHTML;
        const cssMatch = capturedCSS === correctCSS;
        const jsMatch = capturedJS === correctJS;
        if (htmlMatch && cssMatch && jsMatch) {
            setIsCorrect(true);
            updateStatus();
            setShowConfetti(true)
            setResult("Chính xác")
            setTimeout(() => {
                setShowConfetti(false);
                setResult("Bạn đã hoàn thành bài tập")
                reload()
            }, 3000)
            return true;
        } else {
            setIsCorrect(false);
            setResult("Chưa chính xác")
            return false;
        }
    };
    const handAnswer = () => {
        runCode();
        setSubmit((prev) => prev + 1);
    }
    const updateStatus = async () => {
        try {
            const response = await fetch(`/api/upStatusDoc`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    course_id,
                    status_doc: true,
                    cache_time_video: null,
                    document_id: documents_id,
                }),
            });

            if (!response.ok) throw new Error('Cập nhật trạng thái thất bại.');
        } catch (error) {
            console.error('Lỗi cập nhật trạng thái:', error);
        }
    };
    useEffect(() => {
        if (question_code) {
            const parsedResult = parseCode(question_code);
            setQuestionCode(parsedResult);
        }
    }, [question_code]);
    const customConfettiShape = (ctx: CanvasRenderingContext2D) => {
        const colors = ['#FF0000', '#00FF00', '#0000FF', '#FF00FF', '#FFFF00'];
        const width = Math.random() * 20 + 5;
        const height = Math.random() * 10 + 5;
        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        ctx.fillRect(0, 0, width, height);
    };

    return (
        <Row className={styles.codeMain}>
            {showConfetti && <Confetti width={width} height={height} drawShape={customConfettiShape} />}
            <Col md={6}>
                <ul className={styles.nav}>
                    <li
                        className={`${styles.itemNav} ${styles.itemNavContent} ${activeContentTab === 'content' ? styles.itemNavActed : ''}`}
                        onClick={() => setActiveContentTab('content')}
                    >
                        Nội dung
                    </li>
                    <li
                        className={`${styles.itemNav} ${styles.itemNavContent} ${activeContentTab === 'Webs' ? styles.itemNavActed : ''}`}
                        onClick={() => setActiveContentTab('Webs')}
                    >
                        Trình duyệt
                    </li>
                </ul>
                <div className={styles.boxContent} style={{ display: activeContentTab === 'content' ? 'flex' : 'none' }}>
                    <div className={styles.bodyTitle}>
                        <span className={styles.timeUpdate}>Cập nhật ngày {formatDateTime(updated_at)}</span>
                        <h4 className={styles.titleCourse}>{name_document}</h4>
                    </div>

                    <div className={styles.contentText}>
                        <p className={styles.contentQues}>Câu hỏi: {question_code}</p>
                        <p className={styles.contentQuess}> {questionCode?.question}</p>
                        <h6 className={styles.codeResult} style={{
                            color: isCorrect ? "green" : "red",
                            marginTop: "20px",
                            fontWeight: "bold",
                        }}>{result}</h6>
                    </div>
                </div>
                <div className={styles.boxContent} style={{ display: activeContentTab === 'Webs' ? 'block' : 'none' }}>
                    <iframe id="output" style={{ width: '100%', height: '100%', border: '1px solid #ccc' }}></iframe>
                </div>
            </Col>
            <Col md={6} className={styles.CodeFrame}>
                {
                    !iscorrectAnswer ? (
                        <div className={`${styles.containerDev} ${styles.DevLearning}`}>
                            <ul className={styles.nav}>
                                <li
                                    className={`${styles.itemNav} ${activeTab === 'html' ? styles.itemNavActed : ''}`}
                                    onClick={() => setActiveTab('html')}
                                >
                                    HTML
                                </li>
                                <li
                                    className={`${styles.itemNav} ${activeTab === 'css' ? styles.itemNavActed : ''}`}
                                    onClick={() => setActiveTab('css')}
                                >
                                    CSS
                                </li>
                                <li
                                    className={`${styles.itemNav} ${activeTab === 'js' ? styles.itemNavActed : ''}`}
                                    onClick={() => setActiveTab('js')}
                                >
                                    JS
                                </li>
                            </ul>

                            <div className={styles.boxText} style={{ display: activeTab === 'html' ? 'block' : 'none' }}>
                                <Editor
                                    height="60vh"
                                    language="html"
                                    value={html}
                                    theme="vs-light"
                                    onChange={(value) => setHtml(value || '')}
                                    options={{
                                        automaticLayout: true,
                                        fontSize: 16,
                                    }}
                                />
                            </div>

                            <div className={styles.boxText} style={{ display: activeTab === 'css' ? 'block' : 'none' }}>
                                <Editor
                                    height="60vh"
                                    language="css"
                                    value={css}
                                    theme="vs-light"
                                    onChange={(value) => setCss(value || '')}
                                    options={{
                                        automaticLayout: true,
                                        fontSize: 16,
                                    }}
                                />
                            </div>

                            <div className={styles.boxText} style={{ display: activeTab === 'js' ? 'block' : 'none' }}>
                                <Editor
                                    height="60vh"
                                    language="javascript"
                                    value={js}
                                    theme="vs-light"
                                    onChange={(value) => setJs(value || '')}
                                    options={{
                                        automaticLayout: true,
                                        fontSize: 16,
                                    }}
                                />
                            </div>
                            <div className={styles.cta}>
                                <Tippy visible={isSuggest} onClickOutside={toggleSuggest} interactive={true} render={attrs => (
                                    <div className={styles.SuggestBox} tabIndex={-1} {...attrs}>
                                        <div className={styles.SuggestBoxTitle}>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                                <path fillRule="evenodd" clipRule="evenodd" d="M11.5 2C7.35786 2 4 5.43595 4 9.67442C4 11.9468 4.96602 13.9892 6.49859 15.3934C7.0094 15.8614 7.38782 16.2082 7.65601 16.4598C7.7901 16.5855 7.89262 16.6838 7.9683 16.7592C8.00601 16.7968 8.03486 16.8266 8.05635 16.8496C8.06699 16.861 8.07499 16.8699 8.0808 16.8766C8.08649 16.8831 8.0892 16.8864 8.0892 16.8864C8.32571 17.1851 8.3769 17.2622 8.40739 17.332C8.43787 17.4018 8.45982 17.4922 8.51949 17.8717C8.54305 18.0216 8.54545 18.2782 8.54545 18.9767L8.54545 19.0067C8.54544 19.4158 8.54543 19.7687 8.57107 20.0583C8.5982 20.3645 8.65825 20.6677 8.81949 20.9535C8.99902 21.2717 9.25723 21.5359 9.56818 21.7196C9.84747 21.8846 10.1438 21.946 10.443 21.9738C10.726 22 11.0709 22 11.4707 22H11.5293C11.9291 22 12.274 22 12.557 21.9738C12.8562 21.946 13.1525 21.8846 13.4318 21.7196C13.7428 21.5359 14.001 21.2717 14.1805 20.9535C14.3418 20.6677 14.4018 20.3645 14.4289 20.0583C14.4546 19.7687 14.4546 19.4158 14.4545 19.0067V18.9767C14.4545 18.2782 14.457 18.0216 14.4805 17.8717C14.5402 17.4922 14.5621 17.4018 14.5926 17.332C14.6231 17.2622 14.6743 17.1851 14.9108 16.8864C14.9108 16.8864 14.9133 16.8834 14.9192 16.8766C14.925 16.8699 14.933 16.861 14.9436 16.8496C14.9651 16.8266 14.994 16.7968 15.0317 16.7592C15.1074 16.6838 15.2099 16.5855 15.344 16.4598C15.6122 16.2082 15.9906 15.8614 16.5014 15.3934C18.034 13.9892 19 11.9468 19 9.67442C19 5.43595 15.6421 2 11.5 2ZM13.0851 19.6744H9.91494C9.91791 19.7714 9.92239 19.8561 9.92914 19.9323C9.94769 20.1418 9.97899 20.2178 10.0004 20.2558C10.0603 20.3619 10.1463 20.4499 10.25 20.5112C10.2871 20.5331 10.3615 20.5651 10.5661 20.5841C10.7802 20.604 11.0626 20.6047 11.5 20.6047C11.9374 20.6047 12.2198 20.604 12.4339 20.5841C12.6385 20.5651 12.7129 20.5331 12.75 20.5112C12.8537 20.4499 12.9397 20.3619 12.9996 20.2558C13.021 20.2178 13.0523 20.1418 13.0709 19.9323C13.0776 19.8561 13.0821 19.7714 13.0851 19.6744ZM12.6105 8.17647C12.9169 8.40043 12.9878 8.83616 12.769 9.1497L11.591 10.8372H12.9934C13.2488 10.8372 13.4828 10.9833 13.5996 11.2156C13.7165 11.448 13.6966 11.7277 13.5482 11.9404L11.6001 14.7311C11.3813 15.0446 10.9554 15.1173 10.649 14.8933C10.3426 14.6693 10.2716 14.2336 10.4905 13.9201L11.6685 12.2326H10.2661C10.0107 12.2326 9.77673 12.0865 9.65986 11.8541C9.54299 11.6218 9.56284 11.342 9.71129 11.1294L11.6593 8.33867C11.8782 8.02513 12.304 7.95251 12.6105 8.17647Z" fill="white" />
                                            </svg>
                                            Gợi ý
                                        </div>
                                        <p className={styles.SuggestBoxContent}>
                                            {tutorial_code}
                                        </p>
                                    </div>
                                )}>
                                    <button type='button' className={styles.btnCtaDev} onClick={toggleSuggest}>
                                        Gợi ý
                                    </button>
                                </Tippy>
                                {isSubmit > 0 && (
                                    <button type='button' className={styles.btnCtaDev} onClick={toggleAnswer} >
                                        Xem đáp án
                                    </button>
                                )}

                                <button type='button' className={styles.btnCtaDev} onClick={() => {
                                    handAnswer();

                                }}>
                                    Chạy
                                </button>

                            </div>

                        </div>
                    ) : (
                        isSubmit > 0 ? (
                            <div className={styles.Answer}>
                                {answer_code}
                                <button onClick={toggleAnswer}>Ẩn</button>
                            </div>
                        ) : (

                            <Tippy visible={showAlert} onClickOutside={toggleAlert} interactive={true} render={attrs => (
                                <div className={styles.SuggestBox} tabIndex={-1} {...attrs}>
                                    <div className={styles.SuggestBoxTitle}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                                            <path fillRule="evenodd" clipRule="evenodd" d="M11.5 2C7.35786 2 4 5.43595 4 9.67442C4 11.9468 4.96602 13.9892 6.49859 15.3934C7.0094 15.8614 7.38782 16.2082 7.65601 16.4598C7.7901 16.5855 7.89262 16.6838 7.9683 16.7592C8.00601 16.7968 8.03486 16.8266 8.05635 16.8496C8.06699 16.861 8.07499 16.8699 8.0808 16.8766C8.08649 16.8831 8.0892 16.8864 8.0892 16.8864C8.32571 17.1851 8.3769 17.2622 8.40739 17.332C8.43787 17.4018 8.45982 17.4922 8.51949 17.8717C8.54305 18.0216 8.54545 18.2782 8.54545 18.9767L8.54545 19.0067C8.54544 19.4158 8.54543 19.7687 8.57107 20.0583C8.5982 20.3645 8.65825 20.6677 8.81949 20.9535C8.99902 21.2717 9.25723 21.5359 9.56818 21.7196C9.84747 21.8846 10.1438 21.946 10.443 21.9738C10.726 22 11.0709 22 11.4707 22H11.5293C11.9291 22 12.274 22 12.557 21.9738C12.8562 21.946 13.1525 21.8846 13.4318 21.7196C13.7428 21.5359 14.001 21.2717 14.1805 20.9535C14.3418 20.6677 14.4018 20.3645 14.4289 20.0583C14.4546 19.7687 14.4546 19.4158 14.4545 19.0067V18.9767C14.4545 18.2782 14.457 18.0216 14.4805 17.8717C14.5402 17.4922 14.5621 17.4018 14.5926 17.332C14.6231 17.2622 14.6743 17.1851 14.9108 16.8864C14.9108 16.8864 14.9133 16.8834 14.9192 16.8766C14.925 16.8699 14.933 16.861 14.9436 16.8496C14.9651 16.8266 14.994 16.7968 15.0317 16.7592C15.1074 16.6838 15.2099 16.5855 15.344 16.4598C15.6122 16.2082 15.9906 15.8614 16.5014 15.3934C18.034 13.9892 19 11.9468 19 9.67442C19 5.43595 15.6421 2 11.5 2ZM13.0851 19.6744H9.91494C9.91791 19.7714 9.92239 19.8561 9.92914 19.9323C9.94769 20.1418 9.97899 20.2178 10.0004 20.2558C10.0603 20.3619 10.1463 20.4499 10.25 20.5112C10.2871 20.5331 10.3615 20.5651 10.5661 20.5841C10.7802 20.604 11.0626 20.6047 11.5 20.6047C11.9374 20.6047 12.2198 20.604 12.4339 20.5841C12.6385 20.5651 12.7129 20.5331 12.75 20.5112C12.8537 20.4499 12.9397 20.3619 12.9996 20.2558C13.021 20.2178 13.0523 20.1418 13.0709 19.9323C13.0776 19.8561 13.0821 19.7714 13.0851 19.6744ZM12.6105 8.17647C12.9169 8.40043 12.9878 8.83616 12.769 9.1497L11.591 10.8372H12.9934C13.2488 10.8372 13.4828 10.9833 13.5996 11.2156C13.7165 11.448 13.6966 11.7277 13.5482 11.9404L11.6001 14.7311C11.3813 15.0446 10.9554 15.1173 10.649 14.8933C10.3426 14.6693 10.2716 14.2336 10.4905 13.9201L11.6685 12.2326H10.2661C10.0107 12.2326 9.77673 12.0865 9.65986 11.8541C9.54299 11.6218 9.56284 11.342 9.71129 11.1294L11.6593 8.33867C11.8782 8.02513 12.304 7.95251 12.6105 8.17647Z" fill="white" />
                                        </svg>
                                        Chú ý !
                                    </div>
                                    <p className={styles.SuggestBoxContent}>
                                        Bạn hãy thử code 1 lần
                                    </p>
                                    <button type='button' className={styles.btnCtaDev} onClick={
                                        () => {
                                            toggleAlert()
                                            toggleAnswer()
                                        }
                                    }>
                                        X
                                    </button>
                                </div>
                            )}>
                                <>Nội dung</>
                            </Tippy>

                        )
                    )
                }
            </Col>

        </Row>

    );
};

export default CodeDevLearning;
