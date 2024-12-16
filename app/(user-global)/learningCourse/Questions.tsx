// import React, { useEffect, useState } from 'react';
// import useCookie from '@app/(user-global)/component/hook/useCookie';
// import styles from '@public/styles/Learning/Question.module.css';
// import { useWindowSize } from 'react-use';
// import Confetti from 'react-confetti';

// import { parseQues, parseFill, splitByPattern } from "@/app/(user-global)/component/globalControl/commonC";

// const Questions: React.FC<QuestionsProps> = ({ course_id, documents_id, timedocument, nameDocument, questions }) => {
//     const token = useCookie('token');
//     const [answers, setAnswers] = useState<Record<number, string[]>>({});
//     const [result, setResult] = useState<string | null>(null);
//     const [showConfetti, setShowConfetti] = useState(false);
//     const questionId: string | undefined = questions?.find((question) => question.id)?.id;
//     const [QuestionFill, setQuestionFill] = useState<string[]>([])
//     // Hàm phân tích câu hỏi và câu trả lời

//     console.log(questions)
//     ///Hàm xử lý sự kiện khi người dùng chọn câu trả lời
//     const handleAnswerChange = (questionIndex: number, selectedAnswer: string, type: string) => {
//         setAnswers((prevAnswers) => {
//             const updatedAnswers = { ...prevAnswers };
//             if (type === 'true_false') {
//                 // Câu hỏi đúng/sai: chỉ lưu một câu trả lời duy nhất
//                 updatedAnswers[questionIndex] = [selectedAnswer];
//             } else if (type === 'multiple_choice') {
//                 // Câu hỏi nhiều đáp án đúng: cho phép chọn nhiều đáp án
//                 const selectedAnswers = updatedAnswers[questionIndex] || [];
//                 if (selectedAnswers.includes(selectedAnswer)) {
//                     updatedAnswers[questionIndex] = selectedAnswers.filter((answer) => answer !== selectedAnswer);
//                 } else {
//                     updatedAnswers[questionIndex] = [...selectedAnswers, selectedAnswer];
//                 }
//             } else if (type === 'fill') {
//                 // Câu hỏi điền vào chỗ trống: chỉ lưu một câu trả lời duy nhất (dạng text)
//                 updatedAnswers[questionIndex] = [selectedAnswer];
//             }
//             return updatedAnswers;
//         });
//     };

//     const checkAnswers = async () => {
//         // Prepare the answers in the correct format
//         const formattedAnswers = Object.keys(answers).map((questionIndex) => {
//             const selectedAnswers = answers[parseInt(questionIndex)];
//             return selectedAnswers ? selectedAnswers : [];
//         });

//         const payload = {
//             user_answer: formattedAnswers.flat(),  // Flatten the array of arrays if needed
//         };

//         console.log(JSON.stringify(payload, null, 2), questionId);
//         try {
//             const response = await fetch(`/api/checkAnswer/${questionId}`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${token}`,
//                 },
//                 body: JSON.stringify(payload),
//             });

//             if (!response.ok) throw new Error('Đã xảy ra lỗi khi kiểm tra câu trả lời');
//             const data = await response.json();
//             console.log('Kết quả kiểm tra:', data);
//             setResult(data.is_correct ? 'Bạn đã trả lời đúng!' : 'Bạn đã trả lời sai. Hãy thử lại!');
//             updataStatus();
//             if (data.is_correct === true) {

//                 handleCorrectAnswer();
//             }
//         } catch (error) {
//             console.error('Lỗi khi kiểm tra câu trả lời:', error);
//             setResult('Có lỗi xảy ra, vui lòng thử lại sau.');
//         }
//     };


//     const updataStatus = async () => {
//         // console.log(JSON.stringify(payload, null, 2));

//         try {
//             const data = {
//                 course_id: course_id,
//                 status_doc: true,
//                 cache_time_video: null,
//                 document_id: documents_id,
//             };

//             const response = await fetch(`/api/upStatusDoc`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     Authorization: `Bearer ${token}`,
//                 },
//                 body: JSON.stringify(data),
//             });

//             if (!response.ok) throw new Error('Đã xảy ra lỗi khi kiểm tra câu trả lời');
//             const datas = await response.json();
//             console.log('Cập nhật trạng thái thàng công', datas);

//         } catch (error) {
//             console.error('Lỗi khi kiểm tra câu trả lời:', error);
//             setResult('Có lỗi xảy ra, vui lòng thử lại sau.');
//         }
//     };


//     const handleCorrectAnswer = () => {
//         setShowConfetti(true);
//         setTimeout(() => setShowConfetti(false), 5000);
//     };

//     // Custom shape for confetti particles
//     const customConfettiShape = (ctx: CanvasRenderingContext2D) => {
//         // Set random colors for confetti
//         const colors = ['#FF0000', '#00FF00', '#0000FF', '#FF00FF', '#FFFF00'];
//         const color = colors[Math.floor(Math.random() * colors.length)];

//         // Set random size for confetti
//         const width = Math.random() * 20 + 5;
//         const height = Math.random() * 10 + 5;

//         // Draw rectangle (confetti piece)
//         ctx.fillStyle = color;
//         ctx.fillRect(0, 0, width, height);
//     };

//     useEffect(() => {
//         if (questions) {
//             questions.forEach((question) => {
//                 if (question.type_question === 'fill') {
//                     const parsedQuestion = parseFill(question.content_question);
//                     if (parsedQuestion) {
//                         const questionFillParts = splitByPattern(parsedQuestion.answers[0], "___");
//                         setQuestionFill((prev) => [...prev, questionFillParts]); // Thêm vào danh sách
//                     }
//                 }
//             });
//         }
//     }, [questions]);
//     return (
//         <div>
//             {showConfetti && (
//                 <Confetti
//                     drawShape={customConfettiShape}  // Use custom shape function
//                 />
//             )}
//             <div className={styles.wapperQuestion}>
//                 <div className={styles.bodyTitle}>
//                     <span className={styles.timeUpdate}>Cập nhật ngày {timedocument}</span>
//                     <h4 className={styles.titleCourse}>{nameDocument}</h4>
//                 </div>

//                 {questions?.map((question, index) => {
//                     if (question.type_question === "multiple_choice") {
//                         const parsedQuestion = parseQues(question.content_question);
//                         console.log(parsedQuestion)
//                         return (
//                             <div key={index} className={styles.questionItem}>
//                                 {parsedQuestion ? (
//                                     <>
//                                         <p className={styles.titleQuestion}>Câu hỏi: {parsedQuestion.question}</p>
//                                         <ul className={styles.listQuestion}>
//                                             {parsedQuestion.answers.map((answer, idx) => {
//                                                 return (
//                                                     <li key={`${index}-${idx}`} className={styles.itemQuestion}>
//                                                         <label htmlFor={`submit${idx}`} className={styles.itemAnswer}>
//                                                             <input
//                                                                 type={question.type_question === 'true_false' ? 'radio' : 'checkbox'}
//                                                                 name={`question_${index}`}
//                                                                 id={`submit${idx}`}
//                                                                 value={answer}
//                                                                 checked={answers[index]?.includes(answer) || false}
//                                                                 onChange={() => handleAnswerChange(index, answer, question.type_question)} // Đảm bảo bạn truyền đúng tham số vào hàm xử lý
//                                                             />
//                                                             {answer}
//                                                         </label>
//                                                     </li>
//                                                 );
//                                             })}
//                                         </ul>
//                                         <div className={styles.ctaQuestion}>
//                                             <button className={styles.btnAnswer}>Hủy</button>
//                                             <button
//                                                 className={`${styles.btnAnswer} ${styles.btnAnswerActive}`}
//                                                 onClick={checkAnswers}
//                                             >Trả lời</button>
//                                         </div>
//                                     </>
//                                 ) : (
//                                     <p>Nội dung câu hỏi không hợp lệ.</p>
//                                 )}
//                             </div>
//                         );
//                     } else {
//                         const parsedQuestion = parseFill(question.content_question);
//                         return (
//                             <div className={styles.fillQuestion}>
//                                 <p className={styles.titleQuestion}>Câu hỏi: {parsedQuestion?.question}</p>
//                                 <p className={styles.titleQuestion}>Điền vào phần còn trống</p>
//                                 <div className={styles.fiilContainer}>
//                                     {QuestionFill && QuestionFill.map((part, idx) => (
//                                         <React.Fragment key={idx}>
//                                             {/* Phần trước hoặc sau chỗ trống */}
//                                             <span className={styles.labelFill}>{part}</span>
//                                             {/* Nếu không phải phần cuối, thêm ô nhập */}
//                                             {idx < QuestionFill.length - 1 && (
//                                                 <input
//                                                     placeholder='nhập câu trả lời'
//                                                     type="text"
//                                                     id={`fill_${index}_${idx}`}
//                                                     className={styles.inputFill}
//                                                     value={answers[index]?.[idx] || ''}
//                                                 // onChange={(e) =>
//                                                 //     handleAnswerChange(index, e.target.value, 'fill', idx)
//                                                 // }
//                                                 />
//                                             )}
//                                         </React.Fragment>
//                                     ))}
//                                 </div>
//                             </div>
//                         );
//                     }

//                 })}
//                 <>{result}</>
//             </div>
//         </div >
//     );
// };


// const Questions: React.FC<QuestionsProps> = ({ course_id, documents_id, timedocument, nameDocument, questions }) => {
//     const token = useCookie('token');
//     const [state, setState] = useState({
//         answers: {},
//         result: null,
//         showConfetti: false,
//     });

//     const setAnswers = (index, answer) => {
//         setState((prev) => ({
//             ...prev,
//             answers: {
//                 ...prev.answers,
//                 [index]: answer,
//             },
//         }));
//     };

//     const handleCorrectAnswer = () => {
//         setState((prev) => ({ ...prev, showConfetti: true }));
//         setTimeout(() => setState((prev) => ({ ...prev, showConfetti: false })), 5000);
//     };

//     // Các hàm renderMultipleChoiceQuestion và renderFillQuestion
//     // ...

//     return (
//         <div>
//             {state.showConfetti && <Confetti numberOfPieces={150} recycle={false} />}
//             <div className={styles.wapperQuestion}>
//                 <div className={styles.bodyTitle}>
//                     <span className={styles.timeUpdate}>Cập nhật ngày {timedocument}</span>
//                     <h4 className={styles.titleCourse}>{nameDocument}</h4>
//                 </div>

//                 {questions?.map((question, index) =>
//                     question.type_question === 'multiple_choice'
//                         ? renderMultipleChoiceQuestion(question, index)
//                         : renderFillQuestion(question, index)
//                 )}

//                 <>{state.result}</>
//             </div>
//         </div>
//     );
// };

// export default Questions;

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
                setAnswers([])
            }
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



