// models/Course.tsx
export class Course {
    id: number;
    name_course: string;
    img_course: string;
    price_course: number;
    discount_price_course?: number;
    status_course: 'active' | 'inactive' | 'archived';
    views_course: number;
    rating_course: number; // Chuyển đổi thành kiểu number
    num_lesson: number; // Thêm thuộc tính num_lesson
    tax_rate: number; // Chuyển đổi thành kiểu number
    del_flag: boolean;
    created_at: Date;
    updated_at?: Date;
    chapters_count: number; // Thêm thuộc tính chapters_count
    documents_count: number; // Thêm thuộc tính documents_count
    instructor_id: number;

    constructor(
        id: number,
        name_course: string,
        img_course: string,
        price_course: number,
        instructor_id: number,
        discount_price_course?: number,
        status_course: 'active' | 'inactive' | 'archived' = 'active',
        views_course: number = 0,
        rating_course: number = 0,
        tax_rate: number = 0,
        del_flag: boolean = false,
        created_at: Date = new Date(),
        updated_at?: Date,
        num_lesson: number = 0,
        chapters_count: number = 0,
        documents_count: number = 0
    ) {
        this.id = id;
        this.name_course = name_course;
        this.img_course = img_course;
        this.price_course = price_course;
        this.discount_price_course = discount_price_course;
        this.status_course = status_course;
        this.views_course = views_course;
        this.rating_course = rating_course;
        this.tax_rate = tax_rate;
        this.del_flag = del_flag;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.instructor_id = instructor_id;
        this.num_lesson = num_lesson; // Khởi tạo num_lesson
        this.chapters_count = chapters_count; // Khởi tạo chapters_count
        this.documents_count = documents_count; // Khởi tạo documents_count
    }

    // Phương thức để hiển thị thông tin khóa học
    displayInfo() {
        return `${this.name_course} - Giá: ${this.price_course}$ - Trạng thái: ${this.status_course}`;
    }
}
