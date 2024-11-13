import React from 'react';
import styles from '@public/styles/Learning/Question.module.css'



interface QuestionsProps {
    timedocument: string;
    nameDocument: string;
    questions: QuestionsDocument['questions'];

}


const Questions: React.FC<QuestionsProps> = ({ timedocument, nameDocument, questions }) => {
    const parseQues = (input: string): QuestionAnswer | null => {
        const [questionPart, answerPart] = input.split('?');

        if (!questionPart || !answerPart) return null;

        const answers = answerPart.split('/').map((str) => str.trim());

        return {
            question: questionPart.trim(),
            answers
        };
    };
    return (
        <div>
            <div className={styles.wapperQuestion}>
                {/* Thêm nội dung của quiz ở đây */}
                <div className={styles.bodyTitle}>
                    <span className={styles.timeUpdate}>Cập nhật ngày {timedocument}</span>
                    <h4 className={styles.titleCourse}>{nameDocument}</h4>
                </div>
                {questions?.map((question, index) => {
                    const parsedQuestion = parseQues(question.content_question);

                    return (
                        <div key={index} className={styles.questionItem}>
                            {parsedQuestion ? (
                                <>
                                    <p className={styles.titleQuestion}>Câu hỏi: {parsedQuestion.question}</p>
                                    {question.type_question === 'true_false' ? (
                                        <div className={styles.multipleQuesion}>
                                            <span className={styles.subtitleQuestion}>Câu hỏi đúng/sai</span>
                                            <ul className={styles.listQuestion}>
                                                {parsedQuestion.answers.map((answer, idx) => (
                                                    <li key={idx} className={styles.itemQuestion}>
                                                        <label htmlFor={`submit${idx}`} className={styles.itemAnswer}>
                                                            <input type="checkbox" name="" id={`submit${idx}`} value={answer} /> {answer}
                                                        </label>
                                                    </li>))}
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
                                                    <li key={idx} className={styles.itemQuestion}>
                                                        <label htmlFor={`submit${idx}`} className={styles.itemAnswer}>
                                                            <input type="checkbox" name="" id={`submit${idx}`} value={answer} /> {answer}
                                                        </label>
                                                    </li>))}
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
        </div>
    );
};

export default Questions;
