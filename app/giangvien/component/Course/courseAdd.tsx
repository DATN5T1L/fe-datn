"use client";

import { Button } from "react-bootstrap";
import h from "./courseAdd.module.css";
import { useFormik } from "formik";
import * as Yup from 'yup'
import { useRef, useState } from "react";
import useCookie from "@/app/(user-global)/component/hook/useCookie";
const CourseAdd: React.FC = () => {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const token = useCookie('token')

  const validationSchema = Yup.object({
    name_course: Yup.string()
      .required("Tên khóa học là bắt buộc")
      .min(3, "Tên khóa học phải có ít nhất 3 ký tự"),
    price_course: Yup.number()
      .required("Giá khóa học là bắt buộc"),
    discount_price_course: Yup.number()
      .required("Giảm giá là bắt buộc")
      .min(0, "Giảm giá phải từ 0% trở lên")
      .max(100, "Giảm giá không được vượt quá 100%"),
    discription_course: Yup.string()
      .required("Mô tả là bắt buộc")
      .max(500, "Mô tả không được vượt quá 500 ký tự"),
    tax_rate: Yup.number()
      .required("Thuế là bắt buộc")
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
    validationSchema,
    onSubmit: async (values) => {
      console.log("Form values:", values);
      if (token) {
        const userConfirmed = confirm('Bạn có muốn thêm khóa học mới không?');
        console.log("User confirmed:", userConfirmed);

        if (userConfirmed) {
          console.log('Form data is being submitted');
          const formData = new FormData();
          formData.append("name_course", values.name_course);
          formData.append("discription_course", values.discription_course);
          formData.append("price_course", values.price_course);
          formData.append("discount_price_course", values.discount_price_course);
          formData.append("tax_rate", values.tax_rate);
          if (values.img_course) {
            formData.append("img_course", values.img_course);
          }
          try {
            const res = await fetch(`/api/allCourseAdmin/`, {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${token}`,
              },
              body: formData,
            });
            const data = await res.json();
            if (data.status === 'success') {
              alert('Thêm khóa học thành công!!!')
            } else {
              alert('Thêm khóa học thất bại')
            }
            console.log(data);
          } catch (error) {
            console.error("Error during form submission:", error);
          }
        }
      } else {
        alert("Vui lòng đăng nhập trước khi thêm khóa học.");
      }
    },
  });


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
      <div className={h.header_add}>Thêm Khóa học</div>
      <form onSubmit={formik.handleSubmit}>
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
                  Thêm vào
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div >
  );
};
export default CourseAdd;
