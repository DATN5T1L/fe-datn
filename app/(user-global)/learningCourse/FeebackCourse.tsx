import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import styles from "@public/styles/Learning/FeebackCourse.module.css";
import Link from "next/link";

interface FeedbackProps {
    course_id: string;
    course_name: string;
    onSubmit: (feedback: { rating: number; feedbackText: string }) => void;
}

const FeebackCourse: React.FC<FeedbackProps> = ({ onSubmit, course_id, course_name }) => {
    const [rating, setRating] = useState<number>(0);
    const [feedbackText, setFeedbackText] = useState<string>("");

    const handleRatingChange = (value: number) => {
        setRating(value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (rating === 0 || feedbackText.trim() === "") {
            alert("Vui lòng nhập đánh giá và feedback.");
            return;
        }
        onSubmit({ rating, feedbackText });
        setRating(0);
        setFeedbackText("");
    };

    return (
        <Form onSubmit={handleSubmit} className={styles.Feedback}>
            <h4 className={styles.titleFeedback}>Đánh giá khóa học</h4>
            <div className={styles.rating}>
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        onClick={() => handleRatingChange(star)}
                        className={star <= rating ? styles.active : ""}
                    >
                        ★
                    </span>
                ))}
            </div>

            <Form.Group controlId="feedbackText" className={styles.feedbackText}>
                <Form.Control
                    as="textarea"
                    rows={3}
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder="Nhập phản hồi của bạn"
                    className={styles.textArea}
                />
            </Form.Group>

            <Button variant="primary" type="submit" className={styles.submitButton}>
                Gửi đánh giá
            </Button>

        </Form>
    );
};

export default FeebackCourse;
