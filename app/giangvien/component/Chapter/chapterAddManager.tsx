"use client";
import { Button } from "react-bootstrap";
import h from "./chapterAdd.module.css";
import { useFormik } from "formik";
import * as Yup from 'yup'
import { useRouter, useSearchParams } from "next/navigation";
import useCookie from "@/app/(user-global)/component/hook/useCookie";
import { useEffect, useState } from "react";

interface CountCourse {
  success: boolean;
  data: {
    chapters: [],
    count_chapter: number;
    course_id: string;
  }
}
interface Chapter {
  course_id: string;
  created_at: string;
  del_flag: boolean;
  id: string;
  name_chapter: string;
  serial_chapter: number;
  updated_at: string;
}
interface ApiResponse<T> {
  status: string;
  message: string;
  data: T[];
}


const ChapterAddManager: React.FC = () => {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const token = useCookie('token')
  const [countCourse, setCountCourse] = useState<CountCourse | null>(null)
  const [sttChapter, setSttChapter] = useState<ApiResponse<Chapter> | null>(null)
  const router = useRouter()

  const validationSchema = Yup.object({
    name_chapter: Yup.string()
      .required('Vui lòng nhập tên chapter')
      .min(3, "Tên chương phải có it nhất 3")
      .max(255, "Tên chương tối đa là 255 ký tự"),
    serial_chapter: Yup.number()
      .required('Vui lòng nhập số thứ tự chapter')
  });

  useEffect(() => {
    if (token && id) {
      fetch(`/api/allChapterAdmin/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if (data) {
            setSttChapter(data)
          }
        })
        .catch(error => {
          console.error('có lỗi xảy ra');
        })
    }
  }, [token, id])

  useEffect(() => {
    if (token && id) {
      fetch(`/api/countByCourseAdmin/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log(data);
          if (data) {
            setCountCourse(data)
          }
        })
        .catch(error => {
          console.error(error);
        })
    }
  }, [id, token])

  const formik = useFormik({
    initialValues: {
      name_chapter: '',
      course_id: id,
      serial_chapter: 0,
    },
    validationSchema,
    onSubmit: async (values) => {
      if (sttChapter?.data?.map((item) => item.serial_chapter).includes(values.serial_chapter)) {
        alert('Không được trùng số thứ tự')
        return
      }
      else {
        if (token && id) {
          try {
            if (confirm('Bạn có muốn thêm chương hay không?')) {
              const res = await fetch(`/api/allChapterNotCourse/`, {
                method: 'POST',
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  course_id: values.course_id,
                  name_chapter: values.name_chapter,
                  serial_chapter: values.serial_chapter,
                })
              })
              if (!res.ok) {
                const errorData = await res.json();
                console.error('Server error:', errorData);
                alert('Đã có lỗi xảy ra từ phía server. Vui lòng thử lại sau!');
              } else {
                const data = await res.json();
                console.log('Response data:', data);
                alert('Thêm chương thành công!!!');
                router.replace(`/giangvien/CoursePage`)
              }
            }
          } catch (error) {
            console.error('Có lỗi xảy ra:', error);
          }
        }
      }
    }
  })

  return (
    <div>
      <div className={h.header_add}>Thêm chương</div>
      <div className={h.body_add}>
        <form
          onSubmit={formik.handleSubmit}
          className={h.wapper}
        >
          <div className={h.formnhap}>
            <div className={h.bentrong}>
              <div>Tên</div>
              <input
                name='name_chapter'
                className={h.inputne}
                placeholder="Nhập tiêu đề chương"
                value={formik.values.name_chapter}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.name_chapter && (
                <div style={{ color: 'red' }}>{formik.errors.name_chapter}</div>
              )}
            </div>
            <div className={h.bentrong}>
              <div>Số thứ tự</div>
              <input
                type="number"
                name='serial_chapter'
                className={`${h.inputne} ${h.noSpinner}`}
                placeholder="Nhập số thứ tự chương"
                value={formik.values.serial_chapter}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              {formik.errors.serial_chapter && (
                <div  style={{ color: 'red' }}>{formik.errors.serial_chapter}</div>
              )}
            </div>
          </div>
          <div className="text-lg-center">Số chapter hiện tại trong khóa học là {countCourse?.data.count_chapter}
            {countCourse && countCourse?.data?.count_chapter > 0 && (
              <>
                {' '}bao gồm chapter: {sttChapter?.data.map((item) => item.serial_chapter).join(', ')}

              </>
            )}
          </div>
          <div className={h.chonutragiua}>
            <Button
              type="submit"
              className={h.btnthemvao}
            >Thêm vào</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default ChapterAddManager;
