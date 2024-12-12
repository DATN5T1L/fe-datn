
interface CourseAcount {
    id: string;
    name_course: string;
    slug_course: string;
    img_course: string;
    price_course: number;
    discription_course: string;
    status_course: string;
    discount_price_course: number | null;
    views_course: number;
    rating_course: number;
    tax_rate: string;
    del_flag: boolean;
    instructor_id: string;
    instructor_avatar: string;
    instructor_name: string;
    created_at: string;
    updated_at: string;
    num_chapter: number;
    name_documents: string;
    total_revenue: number;
}


interface Payment {
    id: string;
    amount: number;
    payment_method: "Momo" | "VNPAY";
    status: "completed" | "pending" | "failed";
    payment_discription: string;
    enrollment_id: string;
    del_flag: boolean;
    created_at: string;
    updated_at: string;

}

interface PaymentData {
    data: Payment[]
}
interface Data<T> {
    data: T
}
interface ApiRepon<T> {
    status: string;
    data: T;
}


interface UserBasic {
    email: string;
    fullname: string;
    phonenumber: number;
}

interface PaymentDetail extends Payment {
    course: string;
}