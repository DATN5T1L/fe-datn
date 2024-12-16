import React, { useState, useEffect } from 'react';
import useCookie from '@app/(user-global)/component/hook/useCookie';
import styles from '@public/styles/Learning/Question.module.css';
import { useWindowSize } from 'react-use';
import Confetti from 'react-confetti';
import { parseQues, parseFill, splitByPattern } from "@/app/(user-global)/component/globalControl/commonC";

const Questions: React.FC<QuestionsProps> = ({ course_id, documents_id, timedocument, nameDocument, questions }) => {
    const token = useCookie('token');
    const [answers, setAnswers] = useState<Record<number, string[]>>({});
    const [result, setResult] = useState<string | null>(null);
    const [showConfetti, setShowConfetti] = useState(false);
    const { width, height } = useWindowSize();
    const questionId: string | undefined = questions?.find((question) => question.id)?.id;
    // Xử lý sự kiện chọn câu trả lời
    const handleAnswerChange = (questionIndex: number, selectedAnswer: string, type: string) => {
        setAnswers((prevAnswers) => {
            const updatedAnswers = { ...prevAnswers };
            switch (type) {
                case 'true_false':

                case 'fill':
                    updatedAnswers[questionIndex] = [selectedAnswer];
                    break;
                case 'multiple_choice':
                    const currentAnswers = updatedAnswers[questionIndex] || [];
                    updatedAnswers[questionIndex] = currentAnswers.includes(selectedAnswer)
                        ? currentAnswers.filter((answer) => answer !== selectedAnswer)
                        : [...currentAnswers, selectedAnswer];
                    break;
            }
            return updatedAnswers;
        });
    };

    // Kiểm tra câu trả lời
    const checkAnswers = async () => {
        try {
            const payload = {
                user_answer: Object.values(answers).flat(),
            };
            const response = await fetch(`/api/checkAnswer/${questionId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) throw new Error('Kiểm tra câu trả lời thất bại.');
            const data = await response.json();
            setResult(data.is_correct ? 'Bạn đã trả lời đúng!' : 'Bạn đã trả lời sai. Hãy thử lại!');
            if (data.is_correct) {
                handleCorrectAnswer();
                updateStatus();
            }
            setAnswers([])
        } catch (error) {
            console.error('Lỗi kiểm tra câu trả lời:', error);
            setResult('Có lỗi xảy ra, vui lòng thử lại.');
        }
    };

    // Cập nhật trạng thái tài liệu
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
            console.log('Cập nhật trạng thái thành công:', await response.json());
        } catch (error) {
            console.error('Lỗi cập nhật trạng thái:', error);
        }
    };

    // Hiệu ứng pháo hoa
    const handleCorrectAnswer = () => {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 5000);
    };

    // Vẽ hiệu ứng pháo hoa tuỳ chỉnh
    const customConfettiShape = (ctx: CanvasRenderingContext2D) => {
        const colors = ['#FF0000', '#00FF00', '#0000FF', '#FF00FF', '#FFFF00'];
        const width = Math.random() * 20 + 5;
        const height = Math.random() * 10 + 5;
        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        ctx.fillRect(0, 0, width, height);
    };

    // Xử lý render câu hỏi
    const renderQuestion = (question: any, index: number) => {
        if (question.type_question === "multiple_choice") {
            const parsedQuestion = parseQues(question.content_question);
            return parsedQuestion ? (
                <div key={index} className={styles.questionItem}>
                    <p className={styles.titleQuestion}>Câu hỏi: {parsedQuestion.question}</p>
                    <ul className={styles.listQuestion}>
                        {parsedQuestion.answers.map((answer: string, idx: number) => (
                            <li key={`${index}-${idx}`} className={styles.itemQuestion}>
                                <label className={styles.itemAnswer}>
                                    <input
                                        type="checkbox"
                                        name={`question_${index}`}
                                        value={answer}
                                        checked={answers[index]?.includes(answer) || false}
                                        onChange={() => handleAnswerChange(index, answer, question.type_question)}
                                    />
                                    {answer}
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : null;
        } else if (question.type_question === "fill") {
            const parsedQuestion = parseFill(question.content_question);
            const parts = parsedQuestion ? splitByPattern(parsedQuestion.answers[0], "___") : [];
            return (
                <div key={index} className={styles.fillQuestion}>
                    <p className={styles.titleQuestion}>Câu hỏi: {parsedQuestion?.question}</p>
                    <div className={styles.fillContainer}>
                        {parts.map((part, idx) => (
                            <React.Fragment key={idx}>
                                <span className={styles.labelFill}>{part}</span>
                                {idx < parts.length - 1 && (
                                    <input
                                        type="text"
                                        placeholder="Nhập câu trả lời"
                                        className={styles.inputFill}
                                        value={answers[index]?.[idx] || ''}
                                        onChange={(e) =>
                                            handleAnswerChange(index, e.target.value, 'fill')
                                        }
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            );
        }
    };

    return (
        <div>
            {showConfetti && <Confetti width={width} height={height} drawShape={customConfettiShape} />}
            <div className={styles.wapperQuestion}>
                <div className={styles.bodyTitle}>
                    <span className={styles.timeUpdate}>Cập nhật ngày {timedocument}</span>
                    <h4 className={styles.titleCourse}>{nameDocument}</h4>
                </div>
                {questions?.map((question, index) => renderQuestion(question, index))}
                <div className={styles.ctaQuestion}>
                    <button className={styles.btnAnswer}>Hủy</button>
                    <button
                        className={`${styles.btnAnswer} ${styles.btnAnswerActive}`}
                        onClick={checkAnswers}
                    >
                        Trả lời
                    </button>
                </div>
                {result && <p className={styles.result}>{result}</p>}
            </div>
        </div>
    );
};

export default Questions;



