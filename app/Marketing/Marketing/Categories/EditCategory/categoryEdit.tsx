"use client";
import { Button, Form } from "react-bootstrap";
import "./categoryEdit.css";
import mod from "../../marketing.module.css";
import { useFormik } from "formik";
import * as Yup from 'yup'
import useCookie from "@/app/(user-global)/component/hook/useCookie";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface category {
  name_category: string;
  tags: string;
}

const CategoryEdit: React.FC = () => {
  const token = useCookie('token')
  const router = useRouter()
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const [dataCate, setDataCate] = useState<category | null>(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token && id) {
      fetch(`/api/post_categories/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data?.data) {
            setDataCate(data.data);
            formik.setValues({
              name_category: data.data.name_category || "",
              tags: data.data.tags || "",
            });
          }
        })
        .catch((error) => console.error("Lỗi khi lấy dữ liệu:", error))
        .finally(() => setLoading(false));
    }
  }, [token, id]);

  const formik = useFormik({
    initialValues: {
      name_category: '',
      tags: ''
    },
    validationSchema: Yup.object({
      name_category: Yup.string()
        .required('Bắt buộc')
        .max(255, 'Tối đa 255 ký tự')
        .min(5, 'Tối thiểu 5 ký tự'),
      tags: Yup.string()
        .required('Bắt buộc')
        .test(
          'is-valid-tag',
          'Tag không hợp lệ. Các tag phải bắt đầu bằng #, chỉ chứa chữ cái thường và cách nhau bằng khoảng trắng.',
          (value) => {
            if (!value) return false;
            const tags = value.split(/\s+/);
            return tags.every(tag => /^#[\p{L}\p{N}]+$/u.test(tag))
          }
        )

    }),
    onSubmit: async (values: category) => {
      if (!dataCate) return;
      const changes: Partial<category> = {};
      if (values.name_category !== dataCate.name_category) {
        changes.name_category = values.name_category;
      }
      if (values.tags !== dataCate.tags) {
        changes.tags = values.tags;
      }
      if (Object.keys(changes).length === 0) {
        alert("Không có thay đổi nào cần cập nhật.");
        return;
      }
      try {
        const res = await fetch(`/api/post_categories/${id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(changes),
        });

        const data = await res.json();
        if (data.status === "success") {
          alert("Sửa danh mục thành công!!!");
          router.replace(`/Marketing/MarketingCategories/`);
        } else {
          alert("Sửa danh mục thất bại");
          console.error(data.message);
        }
      } catch (error) {
        console.error("Lỗi khi gửi dữ liệu:", error);
      }
    }
  })

  return (
    <div className="h-100">
      <div className="header-add">Chỉnh sửa danh mục</div>
      <div className="body-add bg-white d-flex flex-column flex-grow-1 mx-4">
        <div className="d-flex flex-column align-items-center wrapper gap-4">
          <Form className="d-flex flex-column gap-4" onSubmit={formik.handleSubmit}>
            <Form.Group>
              <Form.Label>Tên danh mục</Form.Label>
              <Form.Control
                name="name_category"
                type="text"
                placeholder="Nhập vào vào tên danh mục"
                value={formik.values.name_category}
                className={`form text-muted py-2`}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.touched.name_category && formik.errors.name_category ? (
                <div className="text-danger">{formik.errors.name_category}</div>
              ) : null}
            </Form.Group>
            <Form.Group>
              <Form.Label>Tag danh mục</Form.Label>
              <Form.Control
                name="tags"
                type="text"
                placeholder="Nhập vào tag danh mục mới"
                className="form text-muted py-2"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.tags}
              />
              {formik.touched.tags && formik.errors.tags ? (
                <div className="text-danger">{formik.errors.tags}</div>
              ) : null}
            </Form.Group>
            <Button type="submit" className={`${mod.btnCTA} btnAdd w-100`}>Chỉnh sửa</Button>
          </Form>
        </div>
      </div>
    </div>
  );
};
export default CategoryEdit;
