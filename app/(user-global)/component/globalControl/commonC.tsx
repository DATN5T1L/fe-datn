//hàm chuyển đỏi ngày giờ
import { useEffect } from "react";
// HoverElement.tsx
import React from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

interface HoverElementProps {
    name: string | number; // Tên phần tử cần hiển thị
    children: React.ReactNode; // Phần tử con (nội dung của phần tử)
}

const ShowNameElement: React.FC<HoverElementProps> = ({ name, children }) => {
    return (
        <Tippy content={name} placement="top" arrow={true}>
            <div style={{ display: 'inline-block', cursor: 'pointer' }}>
                {children}
            </div>
        </Tippy>
    );
};

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

// hàm lọc câu hỏi
const parseQues = (input: string): QuestionAnswer | null => {
    const [questionPart, answerPart] = input.split('?');
    if (!questionPart || !answerPart) return null;
    const answers = answerPart.split('|').map((str) => str.trim());
    return { question: questionPart.trim(), answers };
};

const parseFill = (input: string): QuestionAnswer | null => {
    const [questionPart, rest] = input.split('?');
    if (!questionPart || !rest) return null;

    // Tách đoạn trước và sau dấu '...'
    const [answerPart, remainingPart] = rest.split('...').map((str) => str.trim());

    // Trả về đối tượng với các phần đã tách
    return {
        question: questionPart.trim(),
        answers: [answerPart || '', remainingPart || '']
    };
};
const splitByPattern = (input: string, pat: string): string[] => {
    const regex = new RegExp(pat, 'g');
    return input.split(regex);
};

const parseCode = (input: string): codeAnswer | null => {
    if (!input.includes('?') || input.trim() === '') return null;
    const [question, ...contentParts] = input.split('?');
    const content = contentParts.join('?').trim();
    if (!question.trim() || !content) return null;
    return { question: question.trim(), content };
};
// định dạng thời gian từ float sang 21 numbar
const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};
const cleaneds = (content: string[]) => {
    return content.map(item =>
        item.replace(/\s+/g, '') // Thay thế tất cả khoảng trắng bằng chuỗi rỗng
    );
};
const cleaned = (content: string) => {
    return content.replace(/\s+/g, ''); // Thay thế tất cả khoảng trắng bằng chuỗi rỗng
};


const calculateTimeAgo = (createdAt: string): string => {
    const currentDate = new Date();
    const commentDate = new Date(createdAt);
    const differenceInMilliseconds = currentDate.getTime() - commentDate.getTime();

    const differenceInDays = Math.floor(differenceInMilliseconds / (1000 * 60 * 60 * 24));
    if (differenceInDays > 0) {
        return `${differenceInDays} ngày${differenceInDays > 1 ? "" : ""} trước`;
    }

    const differenceInHours = Math.floor(differenceInMilliseconds / (1000 * 60 * 60));
    if (differenceInHours > 0) {
        return `${differenceInHours} giờ${differenceInHours > 1 ? "" : ""} trước`;
    }

    const differenceInMinutes = Math.floor(differenceInMilliseconds / (1000 * 60));
    if (differenceInMinutes > 0) {
        return `${differenceInMinutes} phút${differenceInMinutes > 1 ? "" : ""} trước`;
    }

    return "Just now";
};

const scrollToElementBottom = (element: HTMLElement | null) => {
    if (element) {
        element.scrollTo({
            top: element.scrollHeight,
            behavior: 'smooth', // Cuộn mượt mà
        });
    }
};

const useEscapeKey = (onEsc: () => void): void => {
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent): void => {
            if (event.key === "Escape") { // Kiểm tra phím Escape
                onEsc();
            }
        };

        // Thêm sự kiện lắng nghe
        window.addEventListener("keydown", handleKeyDown);

        // Cleanup khi unmount
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onEsc]); // Chỉ re-run effect khi `onEsc` thay đổi
};

// hàm tách 
const getMonthlyProfits = (profitsByMonth: ProfitsByMonth): number[] => {
    const profits: number[] = [];
    for (let month in profitsByMonth) {
        profits.push(profitsByMonth[month]);
    }
    return profits;
};

const formatCurrency = (amount: number): string => {
    return amount.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
}
const formatParamString = (input: string): string => {
    return decodeURIComponent(input);
}
const calculateBirthYear = (age: number): number => {
    const currentYear: number = new Date().getFullYear();
    return currentYear - age;
}

const decodeAndFormatDateTime = (encodedDateTime: string) => {
    // Giải mã chuỗi (decodeURIComponent để chuyển %3A thành :)
    const decodedDateTime = decodeURIComponent(encodedDateTime);

    // Chuyển chuỗi ISO thành đối tượng Date
    const dateObject = new Date(decodedDateTime);

    // Kiểm tra nếu đối tượng Date không hợp lệ
    if (isNaN(dateObject.getTime())) {
        return "Invalid date";
    }

    // Định dạng ngày giờ theo khu vực Việt Nam
    return dateObject.toLocaleString("vi-VN", { timeZone: "UTC" });
}

const formatToVietnameseCurrencyText = (amount: number): string => {
    if (amount < 1_000_000) {
        return amount.toLocaleString("vi-VN") + " đ";
    }
    const billion = Math.floor(amount / 1_000_000_000);
    const million = Math.floor((amount % 1_000_000_000) / 1_000_000);
    const thousand = Math.floor((amount % 1_000_000) / 1_000);
    let result = "";
    if (billion > 0) result += `${billion} tỷ `;
    if (million > 0) result += `${million} triệu `;
    if (thousand > 0) result += `${thousand} nghìn `;

    return result.trim(); // Loại bỏ khoảng trắng dư
}
const getInitials = (name: string): string => {
    const nameParts = name.trim().split(' '); // Loại bỏ khoảng trắng và tách tên thành các phần
    if (nameParts.length < 2) {
        return name; // Nếu chỉ có một từ, trả về chính từ đó
    }

    const lastName = nameParts[nameParts.length - 1]; // Lấy tên cuối cùng
    const firstName = nameParts[0]; // Lấy họ đầu tiên

    return `${lastName} ${firstName}`; // Kết hợp tên cuối và họ đầu
};
export {
    getMonthlyProfits, parseQues, formatTime, formatDateTime,
    formatCurrency, parseCode, parseFill, cleaneds, cleaned,
    calculateTimeAgo, scrollToElementBottom, useEscapeKey, ShowNameElement,
    formatParamString, decodeAndFormatDateTime, calculateBirthYear, formatToVietnameseCurrencyText,
    getInitials, splitByPattern
};