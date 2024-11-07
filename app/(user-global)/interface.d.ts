
interface Progress {
    progress_percentage: number;
    course_name: string;
    course_id: number;
}

// Khởi tạo trạng thái với kiểu dữ liệu


interface Document {
    document_id: number;
    name_document: string;
    type_document: "code" | "quiz" | "video";
    status_video: boolean;
    url_video: string;
    updated_at: string;
}

interface Chapter {
    chapter_id: number;
    chapter_name: string;
    documents: CombinedDocument[];
}

interface CourseData {
    course_id: number;
    course_name: string;
    data: Chapter[];
}

interface Note {
    note_id: number;
    title_note: string;
    content_note: string;
    cache_time_note: number;
}

interface CodesDocument extends Document {
    type_document: "code";
    codes: {
        answer_code: string;
        correct_answer: string;
        question_code: string;
        tutorial_code: string;
    }[];
}

interface QuestionsDocument extends Document {
    type_document: "quiz";
    questions: {
        content_question: string;
        correct_answer: string;
        type_question: string;
    }[];
}
interface VideoDocument extends Document {
    type_document: "video";
}

type CombinedDocument = CodesDocument | QuestionsDocument | VideoDocument;

// Interface for the API response


//  interface cho quesion
interface QuestionAnswer {
    question: string;
    answers: string[];
}

// code

interface CodeDevProps {
    onExport: (data: { html: string, css: string, js: string }) => void;
    answer_code: string;
    correct_answer: string;
    question_code: string;
    tutorial_code: string;
}
// Payments

interface FaqCourse {
    question_faq: string;
    answer_faq: string;
}

interface ApiResponse<T> {
    status: string;
    message: string;
    data: T;
}



interface ModalChangeImgProps {
    show: boolean;
    onClose: () => void;
}
interface ModalChangeInfoProps {
    show: boolean;
    onClose: () => void;
}
interface ModalChangeNameProps {
    show: boolean;
    onClose: () => void;
}
interface ModalChangePassProps {
    show: boolean;
    onClose: () => void;
}

// đăng nhập đăng ký

interface RegisterFormData {
    userName: string;
    email: string;
    password: string;
    confirmPassword: string;
    role: string;
}

interface LoginFormInputs {
    email: string;
    password: string;
    general?: string;
}

// interface of ui


interface Feedback {
    module_id: number;
    course_id: number;
    user_id: number;
    img_course: string;
    rating_course: number;
    feedback_text: string | null;
}

interface FeedbackResponse {
    status: string;
    message: string;
    data: Feedback[];
}

interface ChapterData {
    name_chapters: string[];
}

interface FeedbackData {
    course_id: number;
    user_id: number;
    fullname: string;
    avatar: string;
    rating_course: number;
    feedback_text: string;
}

interface FaqCourse {
    question_faq: string;
    answer_faq: string;
}

interface ApiResponse<T> {
    status: string;
    message: string;
    data: T;
}
interface ButtonProps {
    type?: 'secondery' | 'premary' | 'disable';
    size?: 'S' | 'M';
    status?: 'default' | 'disable' | 'hover' | 'noBorder';
    leftIcon?: boolean;
    rightIcon?: boolean;
    chevron?: 1 | 2 | 3 | 4;
    hover?: boolean;
    hoverType?: 'default' | 'other';
    typeButton?: 'btn' | 'sm' | 'rs';
    width?: number;
    height?: number;
    widthText?: string;
    onClick?: () => void;
    children: React.ReactNode;
}

interface CardPosts {
    type: "Horizontal" | "Vertical";
    title: string;
    image: string;
    date: string;
    content: string;
    author: string;

}

interface FaqProps {
    course_Id: number;
    course: Chapter[]; // Mảng các chương
    onClose: () => void; // Hàm để đóng popup

}
interface Document {
    document_id: number;
    name_document: string;
    type_document: "code" | "quiz" | "video";
    status_video: boolean;
    url_video: string;
    updated_at: string;
}

interface Chapter {
    chapter_id: number;
    chapter_name: string;
    documents: Document[];
}
interface ListItem {
    title: string;
    content: { name: string, duration: string, status: boolean, type: string }[];  // Thêm trường 'duration'
}

interface courseidProp {
    courseId: number;
}
interface ListItem {
    title: string;
    content: { name: string, duration: string, status: boolean, type: string }[];  // Thêm trường 'duration'
}

interface NavCourseProps {
    userId: number;
    courseId: number;
}
interface NoteCourseProps {
    id: number;
    title: string;
    time: date;
    onClose: () => void; // Thêm prop để đóng popup từ bên ngoài
}
interface NotificationProps {
    type: 'success' | 'error' | 'fail' | 'complete';
    message: string;
}