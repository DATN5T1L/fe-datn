'use client';

import { useState } from 'react';
import styles from '../feedback.module.css';

const FeedBackPage = ({ params }: { params: { id: string } }) => {
    const { id } = params;

    const [reply, setReply] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await fetch('/api/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id, reply }),
            });

            if (response.ok) {
                setMessage('Gửi phản hồi thành công!');
                setReply('');
            } else {
                setMessage('Có lỗi xảy ra khi gửi phản hồi.');
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage('Không thể kết nối đến server.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Gửi phản hồi cho khách hàng</h2>
            <p className={styles.heading}>ID khách hàng: {id}</p>

            <form onSubmit={handleSubmit} className={styles.form}>
                <textarea
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                    placeholder="Nhập phản hồi của bạn..."
                    rows={5}
                    cols={50}
                    className={styles.textarea}
                ></textarea>
                <button type="submit" disabled={loading} className={styles.button}>
                    {loading ? 'Đang gửi...' : 'Gửi phản hồi'}
                </button>
            </form>

            {message && <p className={styles.message}>{message}</p>}
        </div>
    );
};

export default FeedBackPage;
