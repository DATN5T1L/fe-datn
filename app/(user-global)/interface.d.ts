
interface Progress {
    progress_percentage: number;
    course_name: string;
    course_id: string;
}

// Khởi tạo trạng thái với kiểu dữ liệu


interface Document {
    document_id: string;
    name_document: string;
    type_document: "code" | "quiz" | "video";
    status_document: boolean;
    discription_document: string;
    url_video: string;
    updated_at: string;
}

interface Chapter {
    chapter_id: string;
    chapter_name: string;
    documents: CombinedDocument[];
}

interface CourseData {
    course_id: string;
    course_name: string;
    data: Chapter[];
}

interface Note {
    note_id: string;
    title_note: string;
    content_note: string;
    cache_time_note: number;
}

interface CodesDocument extends Document {
    type_document: "code";
    codes: {
        id: string;
        answer_code: string;
        correct_answer: string;
        question_code: string;
        tutorial_code: string;
        updated_at: string;
    }[];
}

interface QuestionsDocument extends Document {
    type_document: "quiz";
    questions: Question[] | null;
}
interface Question {
    id: string;
    content_question: string;
    correct_answer: string;
    type_question: string;
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
interface codeAnswer {
    question: string;
    content: string;
}

interface QuestionsProps {
    course_id: string;
    documents_id: string | null;
    timedocument: string;
    nameDocument: string;
    questions: QuestionsDocument['questions'];

}

// code

interface CodeDevProps {
    onExport: (data: { html: string, css: string, js: string }) => void;
    answer_code: string;
    correct_answer: string;
    question_code: string;
    tutorial_code: string;
    updated_at: string;
    name_document: string;
    course_id: string;
    documents_id: string | null;
}

interface UpdateStatusComponentProps {
    course_id: string | null;
    documents_id: string | null;
    token: string | null;
    onSuccess?: (data: any) => void;
    onError?: (error: Error) => void;
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
    module_id: string;
    course_id: string;
    user_id: string;
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
    course_id: string;
    user_id: string;
    fullname: string;
    avatar: string;
    rating_course: number;
    feedback_text: string;
}

interface FaqCourse {
    question_faq: string;
    answer_faq: string;
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
    course_Id: string; // Mảng các chương
    onClose: () => void; // Hàm để đóng popup

}
interface ListItem {
    title: string;
    content: { name: string, duration: string, status: boolean, type: string }[];  // Thêm trường 'duration'
}

interface courseidProp {
    courseId: string;
}
interface ListItem {
    title: string;
    content: { name: string, duration: string, status: boolean, type: string }[];  // Thêm trường 'duration'
}

interface NavCourseProps {
    userId: string;
    courseId: string;
}
interface NoteCourseProps {
    id: string;
    title: string;
    time: date;
    onClose: () => void; // Thêm prop để đóng popup từ bên ngoài
}
interface NotificationProps {
    type: 'success' | 'error' | 'fail' | 'complete';
    message: string;
}

interface Route {
    route_id: string;
    name_route: string;
    img_route: string;
    discription_route: string; // Sửa lại tên thuộc tính
    status: 'default' | 'customize';
    del_flag: boolean;
    created_at: Date;
    updated_at: Date;
}

// search
interface RouteSearch {
    id: string;
    title: string;
    image: string;
}

interface CourseSearch {
    id: string;
    title: string;
    image: string;
}

interface PostSearch {
    id: string;
    title: string;
    image: string;
}

interface ApiResponseSearch {
    routes: RouteSearch[];
    courses: CourseSearch[];
    posts: PostSearch[];
}


// inter of statuc doc

interface StatusData {
    id: string;
    status_doc: boolean;
    cache_time_video: number;
    document_id: string;
    enrollment_id: string;
    del_flag: boolean;
    created_at: string;
    updated_at: string;
}
