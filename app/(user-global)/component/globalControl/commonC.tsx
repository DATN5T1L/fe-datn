//hàm chuyển đỏi ngày giờ
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
    const answers = answerPart.split('/').map((str) => str.trim());
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


export { parseQues, formatTime, formatDateTime, parseCode, parseFill, cleaneds, cleaned };