export class Course {
    id: string;
    name_course: string;
    slug_course: string;
    img_course: string;
    price_course: number;
    discount_price_course?: number;
    views_course: number;
    rating_course: number;
    tax_rate: number;
    del_flag: boolean;
    created_at: Date;
    updated_at?: Date;
    num_chapter: number;
    num_document: number;
    instructor_avatar: string;
    instructor_name: string;
    instructor_id: string;
    discription_course: string;
    constructor(
        id: string,
        name_course: string,
        slug_course: string,
        tax_rate: number,
        img_course: string,
        price_course: number,
        instructor_id: string,
        instructor_avatar: string,
        instructor_name: string,
        discription_course: string,
        discount_price_course?: number,
        views_course: number = 0,
        rating_course: number = 0,
        del_flag: boolean = false,
        created_at: Date = new Date(),
        updated_at?: Date,
        num_chapter: number = 0,
        num_document: number = 0,
    ) {
        this.id = id;
        this.name_course = name_course;
        this.slug_course = slug_course;
        this.tax_rate = tax_rate;
        this.img_course = img_course;
        this.price_course = price_course;
        this.discount_price_course = discount_price_course ?? 0;
        this.views_course = views_course;
        this.rating_course = rating_course;
        this.del_flag = del_flag;
        this.created_at = created_at;
        this.updated_at = updated_at;
        this.instructor_id = instructor_id;
        this.instructor_avatar = instructor_avatar;
        this.instructor_name = instructor_name;
        this.num_chapter = num_chapter;
        this.num_document = num_document;
        this.discription_course = discription_course;
    }

    displayInfo() {
        return `${this.name_course} - Giá: ${this.price_course}$ `;
    }
}
