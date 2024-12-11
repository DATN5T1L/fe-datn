"use client";

import { SetStateAction, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import h from "./lessonAdd.module.css";
import { type } from "os";
import { useRouter, useSearchParams } from "next/navigation";
import useCookie from "@/app/(user-global)/component/hook/useCookie";
import { ErrorMessage, useFormik } from "formik";
import * as Yup from 'yup'
import dynamic from "next/dynamic";
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });
const CkediterCustomFill = dynamic(() => import("../../globalControll/custom-editor-fill"), { ssr: false });

interface Document {
  id: string;
  name_document: string;
  serial_document: number;
  type_document: string;
  updated_at: string;
  del_flag: boolean;
}
interface ApiResponse<T> {
  status: string;
  message: string;
  data: T[];
}
interface video {
  name_document: string;
  discription_document: string;
  serial_document: string;
  url_video: string;
  chapter_id: string;
}
interface code {
  name_document: string;
  discription_document: string;
  serial_document: string;
  type_document: string;
  question_code: string;
  answer_code: string;
  tutorial_code: string;
  chapter_id: string;
  html: string;
  css: string;
  js: string;
}
interface quiz {
  name_document: string;
  discription_document: string;
  serial_document: string;
  type_document: string;
  type_question: string;
  question_code: string;
  answer_code: string;
  chapter_id: string;
}


const LessonAdd: React.FC = () => {
  const [showForm, setShowForm] = useState(true);
  const [activeButton, setActiveButton] = useState("lesson");
  const [typeCourseValue, setTypeCourseValue] = useState("video");
  const [documentData, setDocumnetData] = useState<ApiResponse<Document> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const token = useCookie('token');
  const searchParam = useSearchParams()
  const id = searchParam.get('id')
  const nameChapter = searchParam.get('name');
  const idCourse = searchParam.get('idCourse');
  const nameCourse = searchParam.get('nameCourse');
  const router = useRouter()
  const [formHtml, setFormHtml] = useState(true);
  const [formCss, setFormCss] = useState(false);
  const [formJs, setFormJs] = useState(false);

  const handleReload = () => {
    setLoading(true);
    fetch(`/api/allDocumentAdmin/${id}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setDocumnetData(data)
        setLoading(false)
        console.log(data);
      })
      .catch(err => {
        console.log(err)
        setLoading(false);
      });
  }

  useEffect(() => {
    if (token && id) {
      handleReload()
    }
  }, [token, id]);

  const formikVideo = useFormik<video>({
    initialValues: {
      name_document: "",
      discription_document: "",
      serial_document: "",
      url_video: "",
      chapter_id: id ? id : "",
    },
    validationSchema: Yup.object({
      name_document: Yup.string()
        .required("Tên bài học là bắt buộc")
        .min(3, "Tên bài học phải có ít nhất 3 ký tự"),
      discription_document: Yup.string()
        .required("Mô tả là bắt buộc")
        .max(500, "Mô tả không được vượt quá 500 ký tự"),
      serial_document: Yup.number()
        .required("Số thứ tự bài học là bắt buộc")
        .positive("Số thứ tự phải là số dương"),
      url_video: Yup.string()
        .required("Url bài học là bắt buộc")
        .url('Url sai định dạng')
    }),
    onSubmit: async (values) => {
      console.log("Form values:", values);
      if (token && id) {
        const userConfirmed = confirm('Bạn có muốn thêm bài học mới không?');
        console.log("User confirmed:", userConfirmed);

        if (userConfirmed) {
          console.log('Form data is being submitted');
          try {
            const res = await fetch(`/api/addVideo/`, {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                name_document: values.name_document,
                discription_document: values.discription_document,
                serial_document: values.serial_document,
                url_video: values.url_video,
                chapter_id: values.chapter_id
              }),
            });
            const data = await res.json();
            if (data.status === 'success') {
              handleReload()
              alert('Thêm bài học thành công!!!')
              if (id && nameChapter) {
                router.replace(`/giangvien/ChapterPage/ManagerDocument?id=${id}&name=${nameChapter}&idCourse=${idCourse}&nameCourse=${nameCourse}`)
              }
            } else {
              alert('Thêm bài học thất bại')
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

  const formikCode = useFormik<code>({
    initialValues: {
      name_document: "",
      discription_document: "",
      serial_document: "",
      answer_code: "",
      question_code: "",
      tutorial_code: "",
      type_document: "",
      chapter_id: id ? id : "",
      html: "",
      css: "",
      js: "",
    },
    validationSchema: Yup.object({
      name_document: Yup.string()
        .required("Tên bài học là bắt buộc")
        .min(3, "Tên bài học phải có ít nhất 3 ký tự"),
      discription_document: Yup.string()
        .required("Mô tả là bắt buộc")
        .max(500, "Mô tả không được vượt quá 500 ký tự"),
      serial_document: Yup.number()
        .required("Số thứ tự bài học là bắt buộc")
        .positive("Số thứ tự phải là số dương"),
      question_code: Yup.string()
        .required("Câu hỏi là bắt buộc")
        .max(500, "Câu hỏi không được vượt quá 500 ký tự"),
      tutorial_code: Yup.string()
        .required("Gợi ý code là bắt buộc")
        .max(500, "Gợi ý code không được vượt quá 500 ký tự"),
      html: Yup.string()
        .transform((value) => value.replace(/\s+/g, '')),
      css: Yup.string()
        .transform((value) => value.replace(/\s+/g, '')),
      js: Yup.string()
        .transform((value) => value.replace(/\s+/g, '')),
      answer_code: Yup.string().test(
        'answer_code',
        'Bạn phải nhập ít nhất một trong ba trường: HTML, CSS, hoặc JS.',
        function () {
          const { html, css, js } = this.parent;
          return !!(html?.trim() || css?.trim() || js?.trim());
        }
      ),
    }),
    onSubmit: async (values) => {
      console.log("Form values:", values);
      const codeValues = `${values.html || ''}|${values.css || ''}|${values.js || ''}`;
      console.log(codeValues);

      if (token && typeCourseValue && id) {
        const userConfirmed = confirm('Bạn có muốn thêm bài học mới không?');
        console.log("User confirmed:", userConfirmed);

        if (userConfirmed) {
          console.log('Form data is being submitted');
          try {
            const res = await fetch(`/api/addCode/`, {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                name_document: values.name_document,
                discription_document: values.discription_document,
                serial_document: values.serial_document,
                type_document: typeCourseValue,
                question_code: values.question_code,
                answer_code: codeValues,
                tutorial_code: values.tutorial_code,
                chapter_id: values.chapter_id
              }),
            });
            const data = await res.json();
            if (data.status === 'success') {
              handleReload()
              alert('Thêm bài học thành công!!!')
              if (id && nameChapter) {
                router.replace(`/giangvien/ChapterPage/ManagerDocument?id=${id}&name=${nameChapter}&idCourse=${idCourse}&nameCourse=${nameCourse}`)
              }
            } else {
              alert('Thêm bài học thất bại')
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

  const formikQuizFill = useFormik<quiz>({
    initialValues: {
      name_document: "",
      discription_document: "",
      serial_document: "",
      answer_code: "",
      question_code: "",
      type_document: "",
      type_question: "",
      chapter_id: id ? id : "",
    },
    validationSchema: Yup.object({
      name_document: Yup.string()
        .required("Tên bài học là bắt buộc")
        .min(3, "Tên bài học phải có ít nhất 3 ký tự"),
      discription_document: Yup.string()
        .required("Mô tả là bắt buộc")
        .max(500, "Mô tả không được vượt quá 500 ký tự"),
      serial_document: Yup.number()
        .required("Số thứ tự bài học là bắt buộc")
        .positive("Số thứ tự phải là số dương"),
      question_code: Yup.string()
        .required("Câu hỏi là bắt buộc")
        .max(500, "Câu hỏi không được vượt quá 500 ký tự")
        .test(
          "contains-ellipsis",
          "Câu hỏi phải chứa 3 dấu _ (____)",
          (value) => {
            if (!value) return false;
            return /\_\_\_/.test(value);
          }
        ),
      answer_code: Yup.string()
        .transform((value) =>
          value
            ?.replace(/\s+/g, ',')
            .replace(/,(\S)/g, ', $1')
            .replace(/(\S),/g, '$1, ')
        )
        .required("Câu hỏi là bắt buộc")
        .max(500, "Câu hỏi không được vượt quá 500 ký tự"),
    }),
    onSubmit: async (values) => {
      console.log("Form values:", values);

      if (token && typeCourseValue && id) {
        const userConfirmed = confirm('Bạn có muốn thêm bài học mới không?');
        console.log("User confirmed:", userConfirmed);

        if (userConfirmed) {
          console.log('Form data is being submitted');
          try {
            const res = await fetch(`/api/addQuiz/`, {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                name_document: values.name_document,
                discription_document: values.discription_document,
                serial_document: values.serial_document,
                type_document: 'quiz',
                type_question: 'fill',
                content_question: values.question_code,
                answer_question: values.answer_code,
                chapter_id: values.chapter_id
              }),
            });
            const data = await res.json();
            if (data.status === 'success') {
              handleReload()
              alert('Thêm bài học thành công!!!')
              if (id && nameChapter) {
                router.replace(`/giangvien/ChapterPage/ManagerDocument?id=${id}&name=${nameChapter}&idCourse=${idCourse}&nameCourse=${nameCourse}`)
              }
            } else {
              alert('Thêm bài học thất bại')
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

  const formikQuizMuti = useFormik<quiz>({
    initialValues: {
      name_document: "",
      discription_document: "",
      serial_document: "",
      answer_code: "",
      question_code: "",
      type_document: "",
      type_question: "",
      chapter_id: id ? id : "",
    },
    validationSchema: Yup.object({
      name_document: Yup.string()
        .required("Tên bài học là bắt buộc")
        .min(3, "Tên bài học phải có ít nhất 3 ký tự"),
      discription_document: Yup.string()
        .required("Mô tả là bắt buộc")
        .max(500, "Mô tả không được vượt quá 500 ký tự"),
      serial_document: Yup.number()
        .required("Số thứ tự bài học là bắt buộc")
        .positive("Số thứ tự phải là số dương"),
      question_code: Yup.string()
        .transform((value) =>
          value
            ?.replace(/\s*\/\s*/g, '/')
            .trim()
        )
        .test(
          "has-question-part",
          "Câu hỏi phải có phần câu hỏi trước dấu '?' và phải có ít nhất 5 ký tự",
          (value) => {
            if (!value) return false;
            const questionPart = value.split('?')[0];
            return questionPart?.length >= 5;
          }
        )
        .test(
          "valid-question-format",
          "Dấu '?' phải nằm trước các dấu '/' và sau mỗi dấu '/' phải có ít nhất một ký tự",
          (value) => {
            if (!value) return false;
            const [questionPart, answersPart] = value.split('?');
            if (!answersPart) return false;
            if (!questionPart || questionPart.includes('/')) return false;
            if (value.includes('?/')) return false;
            const isValidSlashContent = answersPart.split('/').every((part) => part.trim().length > 0);
            return isValidSlashContent && !questionPart.includes('/');
          }
        )
        .required("Câu hỏi là bắt buộc")
        .max(500, "Câu hỏi không được vượt quá 500 ký tự"),
      answer_code: Yup.string()
        .transform((value) =>
          value
            ?.replace(/\s*,\s*/g, ", ")
            .replace(/,(\S)/g, ", $1")
            .replace(/(\S),/g, "$1, ")
            .trim()
        )
        .required("Câu trả lời là bắt buộc")
        .max(500, "Câu trả lời không được vượt quá 500 ký tự")
        .test(
          "answer_code",
          "Tất cả các đáp án phải nằm trong các câu hỏi",
          function (value) {
            const { question_code } = this.parent;
            if (!question_code || !value) return false;
            const [questionPart, answerOptionsPart] = question_code.split("?");
            if (!answerOptionsPart) return false;
            const answerOptions = answerOptionsPart
              .split("/")
              .map((option: string) => option.trim().toLowerCase());
            const answers = value
              .split("/")
              .map((a: string) => a.trim().toLowerCase());
            return answers.every((answer) => answerOptions.includes(answer));
          }
        )
    }),
    onSubmit: async (values) => {
      console.log("Form values:", values);

      if (token && typeCourseValue && id) {
        const userConfirmed = confirm('Bạn có muốn thêm bài học mới không?');
        console.log("User confirmed:", userConfirmed);

        if (userConfirmed) {
          console.log('Form data is being submitted');
          try {
            const res = await fetch(`/api/addQuiz/`, {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                name_document: values.name_document,
                discription_document: values.discription_document,
                serial_document: values.serial_document,
                type_document: 'quiz',
                type_question: 'multiple_choice',
                content_question: values.question_code,
                answer_question: values.answer_code,
                chapter_id: values.chapter_id
              }),
            });
            const data = await res.json();
            if (data.status === 'success') {
              handleReload()
              alert('Thêm bài học thành công!!!')
              if (id && nameChapter) {
                router.replace(`/giangvien/ChapterPage/ManagerDocument?id=${id}&name=${nameChapter}&idCourse=${idCourse}&nameCourse=${nameCourse}`)
              }
            } else {
              alert('Thêm bài học thất bại')
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

  const formikQuizTf = useFormik<quiz>({
    initialValues: {
      name_document: "",
      discription_document: "",
      serial_document: "",
      answer_code: "",
      question_code: "",
      type_document: "",
      type_question: "",
      chapter_id: id ? id : "",
    },
    validationSchema: Yup.object({
      name_document: Yup.string()
        .required("Tên bài học là bắt buộc")
        .min(3, "Tên bài học phải có ít nhất 3 ký tự"),
      discription_document: Yup.string()
        .required("Mô tả là bắt buộc")
        .max(500, "Mô tả không được vượt quá 500 ký tự"),
      serial_document: Yup.number()
        .required("Số thứ tự bài học là bắt buộc")
        .positive("Số thứ tự phải là số dương"),
      question_code: Yup.string()
        .transform((value) =>
          value
            ?.replace(/\s*\/\s*/g, '/')
            .trim()
        )
        .test(
          "has-question-part",
          "Câu hỏi phải có phần câu hỏi trước dấu '?' và phải có ít nhất 5 ký tự",
          (value) => {
            if (!value) return false;
            const questionPart = value.split('?')[0];
            return questionPart?.length >= 5;
          }
        )
        .test(
          "valid-question-format",
          "Dấu '?' phải nằm trước các dấu '/' và sau mỗi dấu '/' phải có ít nhất một ký tự",
          (value) => {
            if (!value) return false;
            const [questionPart, answersPart] = value.split('?');
            if (!answersPart) return false;
            if (!questionPart || questionPart.includes('/')) return false;
            if (value.includes('?/')) return false;
            const isValidSlashContent = answersPart.split('/').every((part) => part.trim().length > 0);
            return isValidSlashContent && !questionPart.includes('/');
          }
        )
        .required("Câu hỏi là bắt buộc")
        .max(500, "Câu hỏi không được vượt quá 500 ký tự"),
      answer_code: Yup.string()
        .transform((value) =>
          value
            ?.replace(/\s*,\s*/g, ", ")
            .replace(/,(\S)/g, ", $1")
            .replace(/(\S),/g, "$1, ")
            .trim()
        )
        .required("Câu trả lời là bắt buộc")
        .max(500, "Câu trả lời không được vượt quá 500 ký tự")
        .test(
          "answer_code",
          "Câu trả lời chỉ có một đáp án có trong danh sách câu hỏi",
          function (value) {
            const { question_code } = this.parent;
            if (!question_code) return false;
            const [, answersPart] = question_code.split("?");
            if (!answersPart) return false;
            const answers = answersPart
              .split("/")
              .map((answer: string) => answer.trim().toLowerCase());
            const answer = value?.trim().toLowerCase();
            return answers.includes(answer || "");
          }
        ),
    }),
    onSubmit: async (values) => {
      console.log("Form values:", values);

      if (token && typeCourseValue && id) {
        const userConfirmed = confirm('Bạn có muốn thêm bài học mới không?');
        console.log("User confirmed:", userConfirmed);

        if (userConfirmed) {
          console.log('Form data is being submitted');
          try {
            const res = await fetch(`/api/addQuiz/`, {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                name_document: values.name_document,
                discription_document: values.discription_document,
                serial_document: values.serial_document,
                type_document: 'quiz',
                type_question: 'true_false',
                content_question: values.question_code,
                answer_question: values.answer_code,
                chapter_id: values.chapter_id
              }),
            });
            const data = await res.json();
            if (data.status === 'success') {
              handleReload()
              alert('Thêm bài học thành công!!!')
              if (id && nameChapter) {
                router.replace(`/giangvien/ChapterPage/ManagerDocument?id=${id}&name=${nameChapter}&idCourse=${idCourse}&nameCourse=${nameCourse}`)
              }
            } else {
              alert('Thêm bài học thất bại')
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

  const handleOnHtml = () => {
    setFormHtml(true);
    setFormCss(false);
    setFormJs(false);
  };

  const handleOnCss = () => {
    setFormHtml(false);
    setFormCss(true);
    setFormJs(false);
  };

  const handleOnJs = () => {
    setFormHtml(false);
    setFormCss(false);
    setFormJs(true);
  };

  const handleDemo = () => {
    router.replace(`/giangvien/CoursePage/CourseVideoDetail?id=${idCourse}&name=${nameCourse}`)
  }

  return (
    <div>
      <div className={h.header}>
        <div className={h.header_add}>Thêm bài học</div>
        <div className={h.nutheader}>
          <Button
            className={activeButton === "lesson" ? h.btnbaihoc : h.btnbaitap}
            onClick={() => handleDemo()}
          >
            Demo
          </Button>
        </div>
      </div>
      <div className={h.body_add}>
        <div className={h.wapper}>
          <form
            onSubmit={
              typeCourseValue === 'video'
                ? formikVideo.handleSubmit
                : typeCourseValue === 'code'
                  ? formikCode.handleSubmit
                  : typeCourseValue === 'dientu'
                    ? formikQuizFill.handleSubmit
                    : typeCourseValue === 'tracnghiem'
                      ? formikQuizMuti.handleSubmit
                      : formikQuizTf.handleSubmit
            }
            className={h.wapper_body}
          >
            <div className={h.formnhap}>
              <div className={h.bentrong}>
                <div>Dạng bài học</div>
                <div className={h.selectne}>
                  <select
                    onChange={(e) => setTypeCourseValue(e.target.value)}
                    className={h.inputne}
                  >
                    <option value="video">Video</option>
                    <option value="dientu">Điền từ</option>
                    <option value="dungsai">Trắc nghiệm đúng sai</option>
                    <option value="tracnghiem">Trắc nghiệm nhiều câu hỏi</option>
                    <option value="code">Code</option>
                  </select>
                  <img src="/img/chevronGray-04.svg" />
                </div>
              </div>
              <div className={h.bentrong}>
                <div>Chương</div>
                <div className={h.selectne}>
                  {id && nameChapter ? (
                    <>
                      <input
                        className={h.inputne}
                        type="text"
                        value={nameChapter}
                        readOnly
                      />
                    </>
                  ) : (
                    <>
                      <select className={h.inputne}>
                        <option value="reactjs">Giới thiệu về reactJS</option>
                        <option value="reactjs">Giới thiệu về reactJS</option>
                        <option value="reactjs">Giới thiệu về reactJS</option>
                        <option value="reactjs">Giới thiệu về reactJS</option>
                        <option value="reactjs">Giới thiệu về reactJS</option>
                      </select>
                      <img src="/img/chevronGray-04.svg" />
                    </>
                  )}
                </div>
              </div>
            </div>
            {typeCourseValue === 'video' && (
              <>
                <div className={h.formnhap}>
                  <div className={h.bentrong}>
                    <div>Tên bài học</div>
                    <input
                      className={h.inputne}
                      placeholder="Tên của bài học"
                      id="name_document"
                      name="name_document"
                      value={formikVideo.values.name_document}
                      onChange={formikVideo.handleChange}
                      onBlur={formikVideo.handleBlur}
                    />
                    {formikVideo.touched.name_document && formikVideo.errors.name_document && (
                      <div className={h.error}>{formikVideo.errors.name_document}</div>
                    )}
                  </div>
                  <div className={h.bentrong}>
                    <div>Số thứ tự</div>
                    <input
                      className={h.inputne}
                      placeholder="Số thứ tự của bài học"
                      id="serial_document"
                      name="serial_document"
                      value={formikVideo.values.serial_document}
                      onChange={formikVideo.handleChange}
                      onBlur={formikVideo.handleBlur}
                    />
                    {formikVideo.touched.serial_document && formikVideo.errors.serial_document && (
                      <div className={h.error}>{formikVideo.errors.serial_document}</div>
                    )}
                    <div>
                      Chương có {documentData?.data?.length ?? 0} bài học.{documentData?.data?.length ? (
                        <>
                          {' '} Bao gồm các bài học: {documentData.data.map((item) => item.serial_document).join(', ')}
                        </>)
                        : (<></>)}
                    </div>
                  </div>
                </div>
                <div className={h.formnhap}>
                  <div className={h.bentrong}>
                    <div>Đường dẫn</div>
                    <input
                      className={h.inputne}
                      placeholder="Đường dẫn của bài học"
                      id="url_video"
                      name="url_video"
                      value={formikVideo.values.url_video}
                      onChange={formikVideo.handleChange}
                      onBlur={formikVideo.handleBlur}
                    />
                    {formikVideo.touched.url_video && formikVideo.errors.url_video && (
                      <div className={h.error}>{formikVideo.errors.url_video}</div>
                    )}
                  </div>
                  <div className={h.bentrong}>
                    <div>Mô tả bài học</div>
                    <textarea
                      rows={3}
                      className={h.inputne1}
                      placeholder="Nhập mô tả vào đây"
                      id="discription_document"
                      name="discription_document"
                      value={formikVideo.values.discription_document}
                      onChange={formikVideo.handleChange}
                      onBlur={formikVideo.handleBlur}
                    />
                    {formikVideo.touched.discription_document && formikVideo.errors.discription_document && (
                      <div className={h.error}>{formikVideo.errors.discription_document}</div>
                    )}
                  </div>
                </div>
              </>
            )}
            {typeCourseValue === 'code' && (
              <>
                <div className={h.formnhap}>
                  <div className={h.bentrong}>
                    <div>Tên bài tập</div>
                    <input
                      className={h.inputne}
                      placeholder="Nhập tên bài tập"
                      id="name_document"
                      name="name_document"
                      value={formikCode.values.name_document}
                      onChange={formikCode.handleChange}
                      onBlur={formikCode.handleBlur}
                    />
                    {formikCode.touched.name_document && formikCode.errors.name_document && (
                      <div className={h.error}>{formikCode.errors.name_document}</div>
                    )}
                  </div>
                  <div className={h.bentrong}>
                    <div>Số thứ tự</div>
                    <input
                      className={h.inputne}
                      placeholder="Số thứ tự của bài học"
                      id="serial_document"
                      name="serial_document"
                      value={formikCode.values.serial_document}
                      onChange={formikCode.handleChange}
                      onBlur={formikCode.handleBlur}
                    />
                    {formikCode.touched.serial_document && formikCode.errors.serial_document && (
                      <div className={h.error}>{formikCode.errors.serial_document}</div>
                    )}
                    <div>
                      Chương có {documentData?.data?.length ?? 0} bài học.{documentData?.data?.length ? (
                        <>
                          {' '} Bao gồm các bài học: {documentData.data.map((item) => item.serial_document).join(', ')}
                        </>)
                        : (<></>)}
                    </div>
                  </div>
                </div>
                <div className={h.formnhap}>
                  <div className={h.bentrong}>
                    <div>Mô tả bài học</div>
                    <textarea
                      rows={3}
                      className={h.inputne1}
                      placeholder="Nhập mô tả vào đây"
                      id="discription_document"
                      name="discription_document"
                      value={formikCode.values.discription_document}
                      onChange={formikCode.handleChange}
                      onBlur={formikCode.handleBlur}
                    />
                    {formikCode.touched.discription_document && formikCode.errors.discription_document && (
                      <div className={h.error}>{formikCode.errors.discription_document}</div>
                    )}
                  </div>
                  <div className={h.bentrong}>
                    <div>Câu hỏi</div>
                    <textarea
                      rows={4}
                      className={h.inputne1}
                      placeholder="Nhập câu hỏi vào đây"
                      id="question_code"
                      name="question_code"
                      value={formikCode.values.question_code}
                      onChange={formikCode.handleChange}
                      onBlur={formikCode.handleBlur}
                    />
                    {formikCode.touched.question_code && formikCode.errors.question_code && (
                      <div className={h.error}>{formikCode.errors.question_code}</div>
                    )}
                  </div>
                </div>
                <div className={h.formnhap}>
                  <div className={h.bentrong}>
                    <div>Câu trả lời</div>
                    <div>
                      <button
                        type="button"
                        className={`${formHtml && !formCss && !formJs ? h.btnCode : h.btnCodeDsb}`}
                        onClick={handleOnHtml}
                      >HTML</button>
                      <button
                        type="button"
                        className={`${!formHtml && formCss && !formJs ? h.btnCode : h.btnCodeDsb}`}
                        onClick={handleOnCss}
                      >CSS</button>
                      <button
                        type="button"
                        className={`${!formHtml && !formCss && formJs ? h.btnCode : h.btnCodeDsb}`}
                        onClick={handleOnJs}
                      >JS</button>
                    </div>
                    {formHtml ? (
                      <MonacoEditor
                        height="200px"
                        className={h.inputne2}
                        defaultLanguage="html"
                        value={formikCode.values.html}
                        theme="vs-light"
                        onChange={(value) => formikCode.setFieldValue('html', value || '')}
                      />
                    ) : formCss ? (
                      <MonacoEditor
                        height="200px"
                        className={h.inputne2}
                        defaultLanguage="css"
                        value={formikCode.values.css}
                        theme="vs-light"
                        onChange={(value) => formikCode.setFieldValue('css', value || '')}
                      />
                    ) : formJs ? (
                      <MonacoEditor
                        height="200px"
                        className={h.inputne2}
                        defaultLanguage="javascript"
                        value={formikCode.values.js}
                        theme="vs-light"
                        onChange={(value) => formikCode.setFieldValue('js', value || '')}
                      />
                    ) : ''}
                    {(formikCode.touched.html || formikCode.touched.css || formikCode.touched.js) && formikCode.errors['answer_code'] && (
                      <div className={h.error}>{formikCode.errors['answer_code']}</div>
                    )}
                  </div>
                  <div className={h.bentrong}>
                    <div>Câu trả lời mẫu</div>
                    <textarea
                      rows={4}
                      className={h.inputne1}
                      placeholder="Nhập câu trả lời mẫu vào đây"
                      id="tutorial_code"
                      name="tutorial_code"
                      value={formikCode.values.tutorial_code}
                      onChange={formikCode.handleChange}
                      onBlur={formikCode.handleBlur}
                    />
                    {formikCode.touched.tutorial_code && formikCode.errors.tutorial_code && (
                      <div className={h.error}>{formikCode.errors.tutorial_code}</div>
                    )}
                  </div>
                </div>
              </>
            )}
            {typeCourseValue === 'dientu' && (
              <>
                <div className={h.formnhap}>
                  <div className={h.bentrong}>
                    <div>Tên bài tập</div>
                    <input
                      className={h.inputne}
                      placeholder="Nhập tên bài tập"
                      id="name_document"
                      name="name_document"
                      value={formikQuizFill.values.name_document}
                      onChange={formikQuizFill.handleChange}
                      onBlur={formikQuizFill.handleBlur}
                    />
                    {formikQuizFill.touched.name_document && formikQuizFill.errors.name_document && (
                      <div className={h.error}>{formikQuizFill.errors.name_document}</div>
                    )}
                  </div>
                  <div className={h.bentrong}>
                    <div>Số thứ tự</div>
                    <input
                      className={h.inputne}
                      placeholder="Số thứ tự của bài học"
                      id="serial_document"
                      name="serial_document"
                      value={formikQuizFill.values.serial_document}
                      onChange={formikQuizFill.handleChange}
                      onBlur={formikQuizFill.handleBlur}
                    />
                    {formikQuizFill.touched.serial_document && formikQuizFill.errors.serial_document && (
                      <div className={h.error}>{formikQuizFill.errors.serial_document}</div>
                    )}
                    <div>
                      Chương có {documentData?.data?.length ?? 0} bài học.{documentData?.data?.length ? (
                        <>
                          {' '} Bao gồm các bài học: {documentData.data.map((item) => item.serial_document).join(', ')}
                        </>)
                        : (<></>)}
                    </div>
                  </div>
                </div>
                <div className={h.formnhap}>
                  <div className={h.bentrong}>
                    <div>Mô tả bài học</div>
                    <textarea
                      rows={3}
                      className={h.inputne1}
                      placeholder="Nhập mô tả vào đây"
                      id="discription_document"
                      name="discription_document"
                      value={formikQuizFill.values.discription_document}
                      onChange={formikQuizFill.handleChange}
                      onBlur={formikQuizFill.handleBlur}
                    />
                    {formikQuizFill.touched.discription_document && formikQuizFill.errors.discription_document && (
                      <div className={h.error}>{formikQuizFill.errors.discription_document}</div>
                    )}
                  </div>
                  <div className={h.bentrong}>
                    <div className={h.bentrong_container}>
                      <div className={h.quest}>Câu hỏi</div>
                      <div className={h.input__100}>
                      </div>
                      <div className={h.ckeditor}>
                        <CkediterCustomFill
                          initialData={formikQuizFill.values.question_code}
                          onChange={(data) => {
                            const cleanedData = data.replace(/\_\_\_+/g, '____');
                            formikQuizFill.setFieldValue("question_code", cleanedData);
                            formikQuizFill.setTouched({ ...formikQuizFill.touched, question_code: true });
                            formikQuizFill.validateField("question_code");
                          }}
                        ></CkediterCustomFill>
                        {formikQuizFill.errors.question_code && formikQuizFill.touched.question_code && (
                          <div className={h.errorText}>{formikQuizFill.errors.question_code} </div>
                        )}
                      </div>

                    </div>
                  </div>
                </div>
                <div className={h.formnhap}>
                  <div className={h.bentrong}>
                    <div>Câu trả lời</div>
                    <textarea
                      rows={4}
                      className={h.inputne1}
                      placeholder="Nhập trả lời vào đây"
                      id="answer_code"
                      name="answer_code"
                      value={formikQuizFill.values.answer_code}
                      onChange={formikQuizFill.handleChange}
                      onBlur={formikQuizFill.handleBlur}
                    />
                    {formikQuizFill.touched.answer_code && formikQuizFill.errors.answer_code && (
                      <div className={h.error}>{formikQuizFill.errors.answer_code}</div>
                    )}
                  </div>
                </div>
              </>
            )}
            {typeCourseValue === 'tracnghiem' && (
              <>
                <div className={h.formnhap}>
                  <div className={h.bentrong}>
                    <div>Tên bài tập</div>
                    <input
                      className={h.inputne}
                      placeholder="Nhập tên bài tập"
                      id="name_document"
                      name="name_document"
                      value={formikQuizMuti.values.name_document}
                      onChange={formikQuizMuti.handleChange}
                      onBlur={formikQuizMuti.handleBlur}
                    />
                    {formikQuizMuti.touched.name_document && formikQuizMuti.errors.name_document && (
                      <div className={h.error}>{formikQuizMuti.errors.name_document}</div>
                    )}
                  </div>
                  <div className={h.bentrong}>
                    <div>Số thứ tự</div>
                    <input
                      className={h.inputne}
                      placeholder="Số thứ tự của bài học"
                      id="serial_document"
                      name="serial_document"
                      value={formikQuizMuti.values.serial_document}
                      onChange={formikQuizMuti.handleChange}
                      onBlur={formikQuizMuti.handleBlur}
                    />
                    {formikQuizMuti.touched.serial_document && formikQuizMuti.errors.serial_document && (
                      <div className={h.error}>{formikQuizMuti.errors.serial_document}</div>
                    )}
                    <div>
                      Chương có {documentData?.data?.length ?? 0} bài học.{documentData?.data?.length ? (
                        <>
                          {' '} Bao gồm các bài học: {documentData.data.map((item) => item.serial_document).join(', ')}
                        </>)
                        : (<></>)}
                    </div>
                  </div>
                </div>
                <div className={h.formnhap}>
                  <div className={h.bentrong}>
                    <div>Mô tả bài học</div>
                    <textarea
                      rows={3}
                      className={h.inputne1}
                      placeholder="Nhập mô tả vào đây"
                      id="discription_document"
                      name="discription_document"
                      value={formikQuizMuti.values.discription_document}
                      onChange={formikQuizMuti.handleChange}
                      onBlur={formikQuizMuti.handleBlur}
                    />
                    {formikQuizMuti.touched.discription_document && formikQuizMuti.errors.discription_document && (
                      <div className={h.error}>{formikQuizMuti.errors.discription_document}</div>
                    )}
                  </div>
                  <div className={h.bentrong}>
                    <div className={h.bentrong_container}>
                      <div className={h.quest}>Câu hỏi</div>
                      <textarea
                        rows={3}
                        className={h.inputne1}
                        placeholder="Nhập câu hỏi vào đây"
                        id="question_code"
                        name="question_code"
                        value={formikQuizMuti.values.question_code}
                        onChange={formikQuizMuti.handleChange}
                        onBlur={formikQuizMuti.handleBlur}
                      />
                      {formikQuizMuti.touched.question_code && formikQuizMuti.errors.question_code && (
                        <div className={h.error}>{formikQuizMuti.errors.question_code}</div>
                      )}
                    </div>
                  </div>
                </div>
                <div className={h.formnhap}>
                  <div className={h.bentrong}>
                    <div>Câu trả lời</div>
                    <textarea
                      rows={4}
                      className={h.inputne1}
                      placeholder="Nhập trả lời vào đây"
                      id="answer_code"
                      name="answer_code"
                      value={formikQuizMuti.values.answer_code}
                      onChange={formikQuizMuti.handleChange}
                      onBlur={formikQuizMuti.handleBlur}
                    />
                    {formikQuizMuti.touched.answer_code && formikQuizMuti.errors.answer_code && (
                      <div className={h.error}>{formikQuizMuti.errors.answer_code}</div>
                    )}
                  </div>
                </div>
              </>
            )}
            {typeCourseValue === 'dungsai' && (
              <>
                <div className={h.formnhap}>
                  <div className={h.bentrong}>
                    <div>Tên bài tập</div>
                    <input
                      className={h.inputne}
                      placeholder="Nhập tên bài tập"
                      id="name_document"
                      name="name_document"
                      value={formikQuizTf.values.name_document}
                      onChange={formikQuizTf.handleChange}
                      onBlur={formikQuizTf.handleBlur}
                    />
                    {formikQuizTf.touched.name_document && formikQuizTf.errors.name_document && (
                      <div className={h.error}>{formikQuizTf.errors.name_document}</div>
                    )}
                  </div>
                  <div className={h.bentrong}>
                    <div>Số thứ tự</div>
                    <input
                      className={h.inputne}
                      placeholder="Số thứ tự của bài học"
                      id="serial_document"
                      name="serial_document"
                      value={formikQuizTf.values.serial_document}
                      onChange={formikQuizTf.handleChange}
                      onBlur={formikQuizTf.handleBlur}
                    />
                    {formikQuizTf.touched.serial_document && formikQuizTf.errors.serial_document && (
                      <div className={h.error}>{formikQuizTf.errors.serial_document}</div>
                    )}
                    <div>
                      Chương có {documentData?.data?.length ?? 0} bài học.{documentData?.data?.length ? (
                        <>
                          {' '} Bao gồm các bài học: {documentData.data.map((item) => item.serial_document).join(', ')}
                        </>)
                        : (<></>)}
                    </div>
                  </div>
                </div>
                <div className={h.formnhap}>
                  <div className={h.bentrong}>
                    <div>Mô tả bài học</div>
                    <textarea
                      rows={3}
                      className={h.inputne1}
                      placeholder="Nhập mô tả vào đây"
                      id="discription_document"
                      name="discription_document"
                      value={formikQuizTf.values.discription_document}
                      onChange={formikQuizTf.handleChange}
                      onBlur={formikQuizTf.handleBlur}
                    />
                    {formikQuizTf.touched.discription_document && formikQuizTf.errors.discription_document && (
                      <div className={h.error}>{formikQuizTf.errors.discription_document}</div>
                    )}
                  </div>
                  <div className={h.bentrong}>
                    <div className={h.bentrong_container}>
                      <div className={h.quest}>Câu hỏi</div>
                      <textarea
                        rows={3}
                        className={h.inputne1}
                        placeholder="Nhập câu hỏi vào đây"
                        id="question_code"
                        name="question_code"
                        value={formikQuizTf.values.question_code}
                        onChange={formikQuizTf.handleChange}
                        onBlur={formikQuizTf.handleBlur}
                      />
                      {formikQuizTf.touched.question_code && formikQuizTf.errors.question_code && (
                        <div className={h.error}>{formikQuizTf.errors.question_code}</div>
                      )}
                    </div>
                  </div>
                </div>
                <div className={h.formnhap}>
                  <div className={h.bentrong}>
                    <div>Câu trả lời</div>
                    <textarea
                      rows={4}
                      className={h.inputne1}
                      placeholder="Nhập trả lời vào đây"
                      id="answer_code"
                      name="answer_code"
                      value={formikQuizTf.values.answer_code}
                      onChange={formikQuizTf.handleChange}
                      onBlur={formikQuizTf.handleBlur}
                    />
                    {formikQuizTf.touched.answer_code && formikQuizTf.errors.answer_code && (
                      <div className={h.error}>{formikQuizTf.errors.answer_code}</div>
                    )}
                  </div>
                </div>
              </>
            )}
            <div className={h.chonutragiua}>
              <Button className={h.btnthemvao}>Xóa</Button>
              <Button type="submit" className={h.btnthemvao1}>Lưu</Button>
            </div>
          </form>
        </div>
      </div >
    </div >
  );
};

export default LessonAdd;
