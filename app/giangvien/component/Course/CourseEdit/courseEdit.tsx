"use client";

import { Button } from "react-bootstrap";
import h from "./courseEdit.module.css";
import { useEffect, useRef, useState } from "react";
import useCookie from "@/app/(user-global)/component/hook/useCookie";
import { useFormik } from "formik";
import * as Yup from 'yup'
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

interface Course {
  created_at: string;
  del_flag: boolean;
  discount_price_course: number;
  discription_course: string;
  id: string;
  img_course: string;
  instructor_id: string;
  instructor_name: string;
  name_course: string;
  price_course: number
  rating_course: string;
  status_course: string;
  tax_rate: number;
  updated_at: string;
  views_course: number;
}
interface ApiResponse<T> {
  status: string;
  message: string;
  data: T[];
}


const CourseEdit: React.FC = () => {

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const token = useCookie('token')
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const router = useRouter()

  const validationSchema = Yup.object({
    name_course: Yup.string()
      .required("Tên khóa học là bắt buộc")
      .min(3, "Tên khóa học phải có ít nhất 3 ký tự"),
    price_course: Yup.number()
      .required("Giá khóa học là bắt buộc")
      .positive("Giá phải là số dương"),
    discount_price_course: Yup.number()
      .required("Giảm giá là bắt buộc")
      .min(0, "Giảm giá phải từ 0% trở lên")
      .max(100, "Giảm giá không được vượt quá 100%"),
    discription_course: Yup.string()
      .required("Mô tả là bắt buộc")
      .max(500, "Mô tả không được vượt quá 500 ký tự"),
    tax_rate: Yup.number()
      .required("Thuế là bắt buộc")
      .positive("Thuế phải là số dương")
      .max(10, "Thuế không được vượt quá 10%"),
  });

  const formik = useFormik({
    initialValues: {
      name_course: "",
      discription_course: "",
      img_course: null as File | null,
      price_course: "",
      discount_price_course: "",
      tax_rate: "",
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: async (values) => {
      console.log("Form values:", values);
      if (token && id) {
        const userConfirmed = confirm('Bạn có muốn sửa khóa học này không?');
        console.log("User confirmed:", userConfirmed);

        if (userConfirmed) {
          console.log('Form data is being submitted');
          const formData = new FormData();
          if (values.img_course) {
            formData.append("img_course", values.img_course);
          }

          try {
            console.log('đây là form data', formData);

            const res = await fetch(`/api/allCourseAdmin/${id}`, {
              method: 'PUT',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                name_course: values.name_course,
                price_course: values.price_course,
                discount_price_course: values.discount_price_course,
                tax_rate: values.tax_rate,
                discription_course: values.discription_course
              }),
            });
            const data = await res.json();
            console.log(data);
            if (data.status === 'success') {
              alert('Sửa khóa học thành công!!!')
              router.replace(`/giangvien/CoursePage/`)
            } else {
              alert('Sửa khóa học thất bại')
            }
            console.log(data);

            const resImg = await fetch(`/api/updateImgCourse/${id}`, {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${token}`
              },
              body: formData
            })

            const dataImg = await resImg.json()

            console.log(dataImg);
            

          } catch (error) {
            console.error("Error during form submission:", error);
          }
        }
      } else {
        alert("Vui lòng đăng nhập trước khi thêm khóa học.");
      }
    },
  });

  useEffect(() => {
    if (token && id) {
      fetch(`/api/allCourseAdmin/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.data) {
            formik.setValues({
              name_course: data.data.name_course || "",
              discription_course: data.data.discription_course || "",
              price_course: data.data.price_course.toString() || "",
              discount_price_course:
                data.data.discount_price_course.toString() || "",
              tax_rate: data.data.tax_rate.toString() || "",
              img_course: null,
            });
            if (data.data.img_course) {
              setPreviewImage(data.data.img_course);
            }
          }
        })
        .catch((error) => {
          console.error("Có lỗi xảy ra: ", error);
        });
    }
  }, [token, id]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        formik.setFieldError("img_course", "Kích thước file không được vượt quá 10MB");
      } else {
        formik.setFieldValue("img_course", file);
        setPreviewImage(URL.createObjectURL(file));
        formik.setFieldError("img_course", undefined);
      }
    }
  };

  const openFileSelector = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div>
      <div className={h.header_add}>Sửa Khóa học</div>
      <form onSubmit={(e) => {
        e.preventDefault();
        console.log("Form submitted");
        formik.handleSubmit(e);
      }}>
        <div className={h.body_add}>
          <div className={h.wapper}>
            <div className={h.wapper_body}>
              <div className={h.thatep}>
                <div className={h.thatep1}>
                  <img src="/img_admin/may.svg" alt="" />
                  <div className={h.phangiua}>
                    <div className={h.chon1tep}>Ảnh bìa khóa học</div>
                    {previewImage ? (
                      <img
                        src={previewImage}
                        alt="Preview"
                        style={{
                          maxWidth: "200px",
                          maxHeight: "200px",
                          objectFit: "cover",
                          marginBottom: "10px",
                        }}
                      />
                    ) : (
                      <small className={h.chon1tep}>Chưa chọn tệp nào</small>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      ref={fileInputRef}
                      onChange={handleImageChange}
                      style={{ display: "none" }}
                    />
                    <div className={h.ghichuhinh}>
                      JPG, PNG or PDF, Kích thước file không lớn hơn 10MB
                    </div>
                  </div>
                  <Button
                    onClick={() => openFileSelector()}
                    className={h.bnthem}
                  >Thêm</Button>
                </div>
                {formik.errors.img_course && (
                  <div className={h.error}>{formik.errors.img_course}</div>
                )}
              </div>
              <form >

              </form>
              <div className={h.formnhap}>
                <div className={h.bentrong}>
                  <label htmlFor="name_course">Tên</label>
                  <input
                    id="name_course"
                    name="name_course"
                    className={h.inputne}
                    placeholder="Nhập tên khóa học"
                    value={formik.values.name_course}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.name_course && formik.errors.name_course && (
                    <div className={h.error}>{formik.errors.name_course}</div>
                  )}
                </div>

                <div className={h.bentrong}>
                  <label htmlFor="price_course">Giá</label>
                  <input
                    id="price_course"
                    name="price_course"
                    className={h.inputne}
                    placeholder="Nhập giá khóa học"
                    value={formik.values.price_course}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.price_course && formik.errors.price_course && (
                    <div className={h.error}>{formik.errors.price_course}</div>
                  )}
                </div>
              </div>

              <div className={h.formnhap}>
                <div className={h.bentrong}>
                  <label htmlFor="discount_price_course">Giá giảm (%)</label>
                  <input
                    id="discount_price_course"
                    name="discount_price_course"
                    className={h.inputne}
                    placeholder="Nhập giá giảm"
                    value={formik.values.discount_price_course}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.discount_price_course &&
                    formik.errors.discount_price_course && (
                      <div className={h.error}>
                        {formik.errors.discount_price_course}
                      </div>
                    )}
                </div>

                <div className={h.bentrong}>
                  <label htmlFor="discription_course">Mô tả</label>
                  <textarea
                    id="discription_course"
                    name="discription_course"
                    className={h.inputne}
                    placeholder="Nhập mô tả khóa học"
                    value={formik.values.discription_course}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.discription_course &&
                    formik.errors.discription_course && (
                      <div className={h.error}>
                        {formik.errors.discription_course}
                      </div>
                    )}
                </div>
              </div>

              <div className={h.formnhap}>
                <div className={h.bentrong}>
                  <div className={h.bentrong__room}>
                    <label htmlFor="tax_rate">Thuế (%)</label>
                    <input
                      id="tax_rate"
                      name="tax_rate"
                      className={h.inputne}
                      placeholder="Nhập thuế của khóa học"
                      value={formik.values.tax_rate}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.tax_rate && formik.errors.tax_rate && (
                      <div className={h.error}>{formik.errors.tax_rate}</div>
                    )}
                  </div>
                </div>
              </div>

              <div className={h.chonutragiua}>
                <Button type="submit" className={h.btnthemvao}>
                  Sửa
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
export default CourseEdit;
