"use client";

import { SetStateAction, useCallback, useEffect, useState } from "react";
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
  answer_code__false: string;
  answer_code__true: string;
  chapter_id: string;
}

const LessonEdit: React.FC = () => {
  const [showForm, setShowForm] = useState(true);
  const [activeButton, setActiveButton] = useState("lesson");
  const [typeCourseValue, setTypeCourseValue] = useState("video");
  const [documentData, setDocumnetData] = useState<ApiResponse<Document> | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const token = useCookie('token');
  const router = useRouter()
  const searchParam = useSearchParams()
  const id = searchParam.get('idChapter')
  const nameChapter = searchParam.get('nameChapter');
  const idDoc = searchParam.get('idDoc');
  const idCourse = searchParam.get('idCourse')
  const nameCourse = searchParam.get('nameCourse')
  const [formHtml, setFormHtml] = useState(true);
  const [formCss, setFormCss] = useState(false);
  const [formJs, setFormJs] = useState(false);
  // muti quest 
  const [countQuestion, setCountQuestion] = useState(2)
  const [countAnswer, setCountAnswer] = useState(1)
  const [questions, setQuestions] = useState<string[]>(["", ""]);
  const [answers, setAnswers] = useState<string[]>([""]);
  const [finalQuest, setFinalQuest] = useState<string>("");
  const [finalAnswer, setFinalAnswer] = useState<string>("");
  const [errors, setErrors] = useState<boolean[]>([false, false]);
  const [errorsAnswer, setErrorsAnswer] = useState<boolean[]>([false]);
  // tf quest 
  const [countQuestionTf, setCountQuestionTf] = useState(2)
  const [countAnswerTf, setCountAnswerTf] = useState(1)
  const [questionsTf, setQuestionsTf] = useState<string[]>(["", ""]);
  const [answersTf, setAnswersTf] = useState<string[]>([""]);
  const [finalQuestTf, setFinalQuestTf] = useState<string>("");
  const [finalAnswerTf, setFinalAnswerTf] = useState<string>("");
  const [errorsTf, setErrorsTf] = useState<boolean[]>([false, false]);
  const [errorsAnswerTf, setErrorsAnswerTf] = useState<boolean[]>([false]);
  const [isQues, setIsQues] = useState(false)
  //fill 
  const [fillDataQues, setFillDataQues] = useState('')
  const [fillDateAnswer, setFillDataAnswer] = useState('')

  useEffect(() => {
    if (token && id) {
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
          console.log('All data:', data);
        })
        .catch(err => {
          console.log(err)
          setLoading(false);
        });
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
      if (token) {
        const userConfirmed = confirm('Bạn có muốn sửa bài học này không?');
        console.log("User confirmed:", userConfirmed);

        if (userConfirmed) {
          console.log('Form data is being submitted');
          try {
            const res = await fetch(`/api/editVideo/${idDoc}`, {
              method: 'PUT',
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
              alert('Sửa bài học thành công!!!')
              if (id && nameChapter) {
                router.replace(`/giangvien/ChapterPage/ManagerDocument?id=${id}&name=${nameChapter}&idCourse=${idCourse}&nameCourse=${nameCourse}`)
              }
            } else {
              alert('Sửa bài học thất bại')
            }
            console.log(data);
          } catch (error) {
            console.error("Error during form submission:", error);
          }
        }
      } else {
        alert("Vui lòng đăng nhập trước khi sửa khóa học.");
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

      if (token && typeCourseValue) {
        const userConfirmed = confirm('Bạn có muốn sửa bài học này không?');
        console.log("User confirmed:", userConfirmed);

        if (userConfirmed) {
          console.log('Form data is being submitted');
          try {
            const res = await fetch(`/api/editCode/${idDoc}`, {
              method: 'PUT',
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
              alert('Sửa bài học thành công!!!')
              if (id && nameChapter) {
                router.replace(`/giangvien/ChapterPage/ManagerDocument?id=${id}&name=${nameChapter}&idCourse=${idCourse}&nameCourse=${nameCourse}`)
              }
            } else {
              alert('Sửa bài học thất bại')
            }
            console.log(data);
          } catch (error) {
            console.error("Error during form submission:", error);
          }
        }
      } else {
        alert("Vui lòng đăng nhập trước khi sửa khóa học.");
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
      answer_code__false: '',
      answer_code__true: ''
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
        .required('Câu hỏi là bắt buộc'),
      answer_code__true: Yup.string()
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

      if (token && typeCourseValue) {
        const userConfirmed = confirm('Bạn có muốn sửa bài học này không?');
        console.log("User confirmed:", userConfirmed);
        const fillArr = [values.question_code, values.answer_code__true].join('?')

        if (userConfirmed) {
          console.log('Form data is being submitted');
          try {
            const res = await fetch(`/api/editQuiz/${idDoc}`, {
              method: 'PUT',
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
                content_question: fillArr,
                answer_question: values.answer_code,
                chapter_id: values.chapter_id
              }),
            });
            const data = await res.json();
            if (data.status === 'success') {
              alert('Sửa bài học thành công!!!')
              if (id && nameChapter) {
                router.replace(`/giangvien/ChapterPage/ManagerDocument?id=${id}&name=${nameChapter}&idCourse=${idCourse}&nameCourse=${nameCourse}`)
              }
            } else {
              alert('Sửa bài học thất bại')
            }
            console.log(data);
          } catch (error) {
            console.error("Error during form submission:", error);
          }
        }
      } else {
        alert("Vui lòng đăng nhập trước khi sửa khóa học.");
      }
    },
  });

  const formikQuizMuti = useFormik<quiz>({
    initialValues: {
      name_document: "",
      discription_document: "",
      serial_document: "",
      answer_code: finalAnswer,
      question_code: "",
      type_document: "",
      type_question: "",
      chapter_id: id ? id : "",
      answer_code__false: finalQuest,
      answer_code__true: finalAnswer
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
        .required("Câu hỏi là bắt buộc"),
      answer_code__false: Yup.string()
        .required("Đáp án xảy ra lỗi"),
      answer_code__true: Yup.string()
        .required("Đáp án đúng xảy ra lỗi"),
    }),
    onSubmit: async (values) => {
      if (token && typeCourseValue && idDoc) {
        const questArr = [values.question_code, finalQuest].join('?')
        const userConfirmed = confirm('Bạn có muốn sửa bài học này không?');
        console.log("User confirmed:", userConfirmed);

        if (userConfirmed) {
          console.log('Form data is being submitted');
          try {
            const res = await fetch(`/api/editQuiz/${idDoc}`, {
              method: 'PUT',
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
                content_question: questArr,
                answer_question: answers.join('|'),
                chapter_id: values.chapter_id
              }),
            });
            const data = await res.json();
            if (data.status === 'success') {
              alert('Sửa bài học thành công!!!')
              if (id && nameChapter) {
                router.replace(`/giangvien/ChapterPage/ManagerDocument?id=${id}&name=${nameChapter}&idCourse=${idCourse}&nameCourse=${nameCourse}`)
              }
            } else {
              alert('Sửa bài học thất bại')
            }
            console.log(data);
          } catch (error) {
            console.error("Error during form submission:", error);
          }
        }
      } else {
        alert("Vui lòng đăng nhập trước khi sửa khóa học.");
      }
    },
  });

  const formikQuizTf = useFormik<quiz>({
    initialValues: {
      name_document: "",
      discription_document: "",
      serial_document: "",
      answer_code: finalAnswer,
      question_code: "",
      type_document: "",
      type_question: "",
      chapter_id: id ? id : "",
      answer_code__false: finalQuestTf,
      answer_code__true: finalAnswerTf
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
        .required("Câu hỏi là bắt buộc"),
      answer_code__false: Yup.string()
        .required("Đáp án xảy ra lỗi"),
      answer_code__true: Yup.string()
        .required("Đáp án đúng xảy ra lỗi"),
    }),
    onSubmit: async (values) => {
      if (token && typeCourseValue) {
        const questArr = [values.question_code, finalQuestTf].join('?')
        const userConfirmed = confirm('Bạn có muốn sửa bài học này không?');
        console.log("User confirmed:", userConfirmed);

        if (userConfirmed) {
          console.log('Form data is being submitted');
          try {
            const res = await fetch(`/api/editQuiz/${idDoc}`, {
              method: 'PUT',
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
                content_question: questArr,
                answer_question: answersTf.join('|'),
                chapter_id: values.chapter_id
              }),
            });
            const data = await res.json();
            if (data.status === 'success') {
              alert('Sửa bài học thành công!!!')
              if (id && nameChapter) {
                router.replace(`/giangvien/ChapterPage/ManagerDocument?id=${id}&name=${nameChapter}&idCourse=${idCourse}&nameCourse=${nameCourse}`)
              }
            } else {
              alert('Sửa bài học thất bại')
            }
            console.log(data);
          } catch (error) {
            console.error("Error during form submission:", error);
          }
        }
      } else {
        alert("Vui lòng đăng nhập trước khi sửa khóa học.");
      }
    },
  });

  //muti
  const handleIncrease = () => {
    setQuestions((prev) => {
      const updatedQuestions = [...prev, ""];
      setErrors((prevErrors) => [...prevErrors, false]);
      return updatedQuestions;
    });
    setCountQuestion((prev) => prev + 1);
  };

  const handleReduce = () => {
    if (questions.length > 1) {
      const questionToRemove = questions[questions.length - 1];
      const isQuestionAnswer = answers.some(
        (answer) => answer.trim() === questionToRemove.trim()
      );

      if (isQuestionAnswer) {
        alert('không thể xóa câu hỏi mẫu trùng với câu hỏi đúng')
        return;
      }

      setQuestions((prevQuestions) => {
        const updatedQuestions = prevQuestions.slice(0, -1);
        const updatedFinalQuest = updatedQuestions
          .filter((q) => q.trim() !== "")
          .join("|");
        setFinalQuest(updatedFinalQuest);
        formikQuizMuti.setFieldValue("answer_code__false", updatedFinalQuest);
        return updatedQuestions;
      });

      setErrors((prevErrors) => prevErrors.slice(0, -1));
      setCountQuestion((prev) => prev - 1);
    }
  };


  const handleIncrease_answer = () => {
    setAnswers((prev) => {
      const updatedAnswers = [...prev, ""];
      setErrorsAnswer((prevErrors) => [...prevErrors, false]);
      return updatedAnswers;
    });
    setCountAnswer((prev) => prev + 1);
  };

  const handleReduce_answer = () => {
    if (answers.length > 1) {
      const updatedAnswers = answers.slice(0, -1);
      const updatedErrorsAnswer = updatedAnswers.map((answer) => answer.trim() === "");
      const updatedFinalAnswer = updatedAnswers
        .filter((a) => a.trim() !== "")
        .join("|");
      setAnswers(updatedAnswers);
      setErrorsAnswer(updatedErrorsAnswer);
      setFinalAnswer(updatedFinalAnswer);
      setCountAnswer(updatedAnswers.length);
    }
  };

  const handleChange = (index: number, value: string) => {
    const trimmedValue = value.trim();

    setQuestions((prevQuestions) => {
      const updatedQuestions = [...prevQuestions];
      updatedQuestions[index] = value;
      const filteredQuestions = updatedQuestions.filter((q) => q !== "");
      const newFinalQuest = filteredQuestions.join("|");
      const isEmpty = trimmedValue === "";
      const isDuplicate = updatedQuestions.some(
        (q, idx) => idx !== index && q === trimmedValue
      );
      const updatedErrorsAnswer = answers.map((answer) => {
        const isValidQuestion = updatedQuestions.some(
          (question) => question.trim() === answer.trim()
        );
        if (!isValidQuestion && answer.trim()) {
          formikQuizMuti.setFieldError(
            "answer_code__true",
            "Câu trả lời đúng phải giống với nội dung câu hỏi mẫu"
          );
        }
        return !isValidQuestion;
      });
      setErrorsAnswer(updatedErrorsAnswer);
      setFinalQuest(newFinalQuest);
      if (isEmpty) {
        formikQuizMuti.setFieldError(
          "answer_code__false",
          "Câu hỏi không được để trống!"
        );
      } else if (isDuplicate) {
        formikQuizMuti.setFieldError(
          "answer_code__false",
          "Câu hỏi không được trùng nhau!"
        );
      } else {
        formikQuizMuti.setFieldError("answer_code__false", "");
        formikQuizMuti.setFieldValue("answer_code__false", newFinalQuest);
      }

      return updatedQuestions;
    });

    setErrors((prevErrors) => {
      const updatedErrors = [...prevErrors];
      updatedErrors[index] = trimmedValue === "";
      return updatedErrors;
    });
  };

  const handleChange_answer = (index: number, value: string) => {
    setAnswers((prev) => {
      const updatedAnswers = [...prev];
      updatedAnswers[index] = value;
      setErrorsAnswer((prevErrors) => {
        const updatedErrorsAnswer = [...prevErrors];
        updatedErrorsAnswer[index] = value.trim() === "";
        return updatedErrorsAnswer;
      });
      const isDuplicate = updatedAnswers.some(
        (answer, idx) => idx !== index && answer.trim() === value.trim()
      );
      const isValidQuestion = questions.some(
        (question) => question.trim() === value.trim()
      );

      if (!isDuplicate && isValidQuestion) {
        const newFinalAnswer = updatedAnswers
          .filter((answer) => answer.trim() !== "")
          .join("|");
        setFinalAnswer(newFinalAnswer);
        formikQuizMuti.setFieldValue("answer_code__true", newFinalAnswer);
      }

      if (value.trim() === "") {
        formikQuizMuti.setFieldError(
          "answer_code__true",
          "Câu trả lời đúng không được để trống!"
        );
      } else if (!isValidQuestion) {
        formikQuizMuti.setFieldError(
          "answer_code__true",
          "Câu trả lời đúng phải giống với nội dung câu hỏi mẫu"
        );
      } else if (isDuplicate) {
        formikQuizMuti.setFieldError(
          "answer_code__true",
          "Câu trả lời không được trùng nhau"
        );
      } else {
        formikQuizMuti.setFieldError("answer_code__true", "");
      }

      return updatedAnswers;
    });

    setErrorsAnswer((prevErrors) => {
      const updatedErrorsAnswer = [...prevErrors];
      updatedErrorsAnswer[index] = value.trim() === "";
      return updatedErrorsAnswer;
    });
  };

  const renderQuest = Array.from({ length: countQuestion }, (_, index) => {
    return (
      <div key={index} style={{ marginBottom: "8px" }}>
        <input
          className={`${h.inputne1} ${errors[index] ? "input-error" : ""}`}
          placeholder={`Nhập câu hỏi ${index + 1} vào đây`}
          value={questions[index] || ""}
          onChange={(e) => handleChange(index, e.target.value)}
        />
      </div>
    )
  });

  const renderAnswer = Array.from({ length: countAnswer }, (_, index) => {
    const isDuplicate = answers.some(
      (answer, idx) => idx !== index && answer.trim() === answers[index]?.trim()
    );
    const isValidQuestion = questions.some(
      (question) => question.trim() === answers[index]?.trim()
    );
    const hasError = errorsAnswer[index];
    const currentAnswer = answers[index];

    return (
      <div key={index} style={{ marginBottom: "8px" }}>
        <input
          className={`${h.inputne1} ${errorsAnswer[index] ? "input-error" : ""}`}
          placeholder={`Nhập câu trả lời đúng vào đây`}
          value={answers[index]}
          onChange={(e) => handleChange_answer(index, e.target.value)}
        />
        {hasError && (
          <p className="error-text">Câu trả lời đúng không được để trống!</p>
        )}
        {!isValidQuestion && currentAnswer && (
          <p className="error-text">Đáp án phải là một trong các câu hỏi!</p>
        )}
        {isDuplicate && currentAnswer && (
          <p className="error-text">Câu trả lời không được trùng với các đáp án khác!</p>
        )}
      </div>
    );
  });

  useEffect(() => {
    if (isQues) {
      answers.forEach((answer, index) => {
        const trimmedAnswer = answer?.trim() || "";
        const isValidQuestion = questions.some(
          (question) => question.trim() === trimmedAnswer
        );
        const isDuplicate = answers.some(
          (ans, idx) => idx !== index && ans.trim() === trimmedAnswer
        );

        if (!isValidQuestion && trimmedAnswer) {
          formikQuizMuti.setFieldError(
            "answer_code__true",
            "Câu trả lời đúng phải giống với nội dung câu hỏi mẫu!"
          );
          setIsQues(false)
        }
        if (isDuplicate && trimmedAnswer) {
          formikQuizMuti.setFieldError(
            "answer_code__true",
            "Câu trả lời không được trùng với các đáp án khác!"
          );
          setIsQues(false)
        }
      });
    }
  }, [questions, answers, finalQuest, finalAnswer, countQuestion, countAnswer, isQues]);


  //true_false

  const handleIncreaseTf = () => {
    setQuestionsTf((prev) => {
      const updatedQuestions = [...prev, ""];
      setErrorsTf((prevErrors) => [...prevErrors, false]);
      return updatedQuestions;
    });
    setCountQuestionTf((prev) => prev + 1);
  };

  const handleReduceTf = () => {
    if (questionsTf.length > 1) {
      const questionToRemove = questionsTf[questionsTf.length - 1];
      const isQuestionAnswer = answersTf.some(
        (answer) => answer.trim() === questionToRemove.trim()
      );

      if (isQuestionAnswer) {
        alert('không thể xóa câu hỏi mẫu trùng với câu hỏi đúng')
        return;
      }
      setQuestionsTf((prev) => {
        const updatedQuestions = prev.slice(0, -1);
        const updatedFinalQuestTf = updatedQuestions
          .filter((q) => q.trim() !== "")
          .join("|");
        setFinalQuestTf(updatedFinalQuestTf);
        setErrorsTf((prevErrors) => prevErrors.slice(0, -1));
        formikQuizTf.setFieldValue("answer_code__false", updatedFinalQuestTf);
        return updatedQuestions;
      });
      setErrorsTf((prevErrors) => prevErrors.slice(0, -1));
      setCountQuestionTf((prev) => prev - 1);
    }
  };

  const handleChangeTf = (index: number, value: string) => {
    const trimmedValue = value.trim();
    setQuestionsTf((prev) => {
      const updatedQuestions = [...prev];
      updatedQuestions[index] = value;
      const filteredQuestions = updatedQuestions.filter((q) => q !== "");
      const newFinalQuest = filteredQuestions.join("|");
      const isEmpty = trimmedValue === "";
      const isDuplicate = updatedQuestions.some(
        (q, idx) => idx !== index && q === trimmedValue
      );
      const updatedErrorsAnswer = answersTf.map((answer) => {
        const isValidQuestion = updatedQuestions.some(
          (question) => question.trim() === answer.trim()
        );
        if (!isValidQuestion && answer.trim()) {
          formikQuizTf.setFieldError(
            "answer_code__true",
            "Câu trả lời đúng phải giống với nội dung câu hỏi mẫu"
          );
        }
        return !isValidQuestion;
      });
      setErrorsAnswerTf(updatedErrorsAnswer);
      setFinalQuestTf(newFinalQuest);
      if (isEmpty) {
        formikQuizTf.setFieldError(
          "answer_code__false",
          "Câu hỏi không được để trống!"
        );
      } else if (isDuplicate) {
        formikQuizTf.setFieldError(
          "answer_code__false",
          "Câu hỏi không được trùng nhau!"
        );
      } else {
        formikQuizTf.setFieldError("answer_code__false", "");
        formikQuizTf.setFieldValue("answer_code__false", newFinalQuest);
      }
      return updatedQuestions;
    });
    setErrorsTf((prevErrors) => {
      const updatedErrors = [...prevErrors];
      updatedErrors[index] = value.trim() === "";
      return updatedErrors;
    });
  };

  const handleChange_answerTf = (index: number, value: string) => {
    setAnswersTf((prev) => {
      const updatedAnswers = [...prev];
      updatedAnswers[index] = value;
      setErrorsAnswerTf((prevErrors) => {
        const updatedErrorsAnswer = [...prevErrors];
        updatedErrorsAnswer[index] = value.trim() === "";
        return updatedErrorsAnswer;
      });
      const isDuplicate = updatedAnswers.some(
        (answer, idx) => idx !== index && answer.trim() === value.trim()
      );
      const isValidQuestion = questionsTf.some(
        (question) => question.trim() === value.trim()
      );

      if (!isDuplicate && isValidQuestion) {
        const newFinalAnswer = updatedAnswers
          .filter((answer) => answer.trim() !== "")
          .join("|");
        setFinalAnswerTf(newFinalAnswer);
        formikQuizTf.setFieldValue("answer_code__true", newFinalAnswer);
      }

      if (value.trim() === "") {
        formikQuizTf.setFieldError(
          "answer_code__true",
          "Câu trả lời đúng không được để trống!"
        );
      } else if (!isValidQuestion) {
        formikQuizTf.setFieldError(
          "answer_code__true",
          "Câu trả lời đúng phải giống với nội dung câu hỏi mẫu"
        );
      } else if (isDuplicate) {
        formikQuizTf.setFieldError(
          "answer_code__true",
          "Câu trả lời không được trùng nhau"
        );
      } else {
        formikQuizTf.setFieldError("answer_code__true", "");
      }

      return updatedAnswers;
    });

    setErrorsAnswerTf((prevErrors) => {
      const updatedErrorsAnswer = [...prevErrors];
      updatedErrorsAnswer[index] = value.trim() === "";
      return updatedErrorsAnswer;
    });
  };

  const renderQuestTf = Array.from({ length: countQuestionTf }, (_, index) => {
    return (
      <div key={index} style={{ marginBottom: "8px" }}>
        <input
          className={`${h.inputne1} ${errorsTf[index] ? "input-error" : ""}`}
          placeholder={`Nhập câu hỏi ${index + 1} vào đây`}
          value={questionsTf[index] || ""}
          onChange={(e) => handleChangeTf(index, e.target.value)}
        />
      </div>
    )
  });

  const renderAnswerTf = Array.from({ length: countAnswerTf }, (_, index) => {
    return (
      <div key={index} style={{ marginBottom: "8px" }}>
        <input
          className={`${h.inputne1} ${errorsAnswerTf[index] ? "input-error" : ""}`}
          placeholder={`Nhập câu trả lời đúng vào đây`}
          value={answersTf[index] || ""}
          onChange={(e) => handleChange_answerTf(index, e.target.value)}
        />
      </div>
    );
  });

  useEffect(() => {
    if (isQues) {
      answersTf.forEach((answer, index) => {
        const trimmedAnswer = answer?.trim() || "";
        const isValidQuestion = questionsTf.some(
          (question) => question.trim() === trimmedAnswer
        );

        if (!isValidQuestion && trimmedAnswer) {
          formikQuizFill.setFieldError(
            "answer_code__true",
            "Câu trả lời đúng phải giống với nội dung câu hỏi mẫu!"
          );
          setIsQues(false)
        }
      });
    }
  }, [questionsTf, answersTf, finalQuestTf, finalAnswerTf, countQuestionTf, countAnswerTf, isQues]);

  useEffect(() => {
    if (token && idDoc) {
      fetch(`/api/documentId/${idDoc}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log('data doc: ', data);
          if (data && data.data) {
            const dataDoc = data.data
            if (dataDoc.type_document && dataDoc.type_document === 'video') {
              setTypeCourseValue('video')
              formikVideo.setValues({
                name_document: dataDoc.name_document || "",
                discription_document: dataDoc.discription_document || "",
                serial_document: dataDoc.serial_document || "",
                url_video: dataDoc.url_video || "",
                chapter_id: id ? id : "",
              })
            }
            else if (dataDoc.type_document && dataDoc.type_document === 'quiz') {
              if (dataDoc.quizs && dataDoc.quizs[0].type_question === 'true_false') {
                setTypeCourseValue('dungsai')
                if (dataDoc.quizs[0].content_question && dataDoc.quizs[0].answer_question) {
                  const contentMutiArrTf = dataDoc?.quizs[0]?.content_question?.split('?')
                  const contentArrTf = contentMutiArrTf[1].split('|')
                  const answerArrTf = dataDoc?.quizs[0]?.answer_question?.split('|')
                  setCountQuestionTf(contentArrTf.length)
                  setQuestionsTf(contentArrTf)
                  setCountAnswerTf(answerArrTf.length)
                  setAnswersTf(answerArrTf)
                  setFinalQuestTf(contentMutiArrTf[1])
                  setFinalAnswerTf(dataDoc?.quizs[0]?.answer_question)
                  formikQuizTf.setValues({
                    name_document: dataDoc.name_document || "",
                    discription_document: dataDoc.discription_document || "",
                    serial_document: dataDoc.serial_document || "",
                    answer_code: dataDoc.quizs[0].answer_question || "",
                    question_code: contentMutiArrTf[0] || "",
                    type_document: dataDoc.type_document || "",
                    type_question: dataDoc.quizs[0].type_question || "",
                    chapter_id: id ? id : "",
                    answer_code__false: contentMutiArrTf[1] || '',
                    answer_code__true: dataDoc?.quizs[0]?.answer_question || ''
                  })
                }
              } else if (dataDoc.quizs && dataDoc.quizs[0].type_question === 'fill') {
                setTypeCourseValue('dientu')
                const fillArr = dataDoc.quizs && dataDoc?.quizs[0]?.content_question?.split('?')
                console.log(fillArr[0]);
                console.log(fillArr[1]);

                formikQuizFill.setValues({
                  name_document: dataDoc.name_document || "",
                  discription_document: dataDoc.discription_document || "",
                  serial_document: dataDoc.serial_document || "",
                  answer_code: dataDoc.quizs[0].answer_question || "",
                  question_code: fillArr[0] || "",
                  type_document: dataDoc.type_document || "",
                  type_question: dataDoc.quizs[0].type_question || "",
                  chapter_id: id ? id : "",
                  answer_code__false: '',
                  answer_code__true: fillArr[1] || ""
                })
              } else if (dataDoc.quizs && dataDoc.quizs[0].type_question === 'multiple_choice') {
                setTypeCourseValue('tracnghiem')
                if (dataDoc.quizs[0].content_question && dataDoc.quizs[0].answer_question) {
                  const contentMutiArr = dataDoc?.quizs[0]?.content_question?.split('?')
                  const contentArr = contentMutiArr[1].split('|')
                  const answerArr = dataDoc?.quizs[0]?.answer_question?.split('|')
                  setCountQuestion(contentArr.length)
                  setQuestions(contentArr)
                  setCountAnswer(answerArr.length)
                  setAnswers(answerArr)
                  setFinalQuest(contentMutiArr[1])
                  setFinalAnswer(dataDoc?.quizs[0]?.answer_question)

                  formikQuizMuti.setValues({
                    name_document: dataDoc.name_document || "",
                    discription_document: dataDoc.discription_document || "",
                    serial_document: dataDoc.serial_document || "",
                    answer_code: dataDoc.quizs[0].answer_question || "",
                    question_code: contentMutiArr[0] || "",
                    type_document: dataDoc.type_document || "",
                    type_question: dataDoc.quizs[0].type_question || "",
                    chapter_id: id ? id : "",
                    answer_code__false: contentMutiArr[1] || '',
                    answer_code__true: dataDoc?.quizs[0]?.answer_question || ''
                  })
                }

              }
            }
            else if (dataDoc.type_document && dataDoc.type_document === 'code') {
              if (dataDoc.codes[0]) {
                const arrCode = dataDoc.codes[0].answer_code
                const arrFormat = arrCode.split('|')
                setTypeCourseValue('code')
                formikCode.setValues({
                  name_document: dataDoc.name_document || "",
                  discription_document: dataDoc.discription_document || "",
                  serial_document: dataDoc.serial_document || "",
                  answer_code: dataDoc.codes[0].answer_code || "",
                  question_code: dataDoc.codes[0].question_code || "",
                  tutorial_code: dataDoc.codes[0].tutorial_code || "",
                  type_document: dataDoc.type_document || "",
                  chapter_id: id ? id : "",
                  html: arrFormat[0] || "",
                  css: arrFormat[1] || "",
                  js: arrFormat[2] || ""
                })
              }
            }
          }
        })
    }
  }, [token, idDoc])

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
        <div className={h.header_add}>Sửa bài học</div>
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
                    value={typeCourseValue}
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
                    <div>Câu hỏi</div>
                    <textarea
                      rows={3}
                      className={h.inputne1}
                      placeholder="Nhập câu hỏi vào đây"
                      id="question_code"
                      name="question_code"
                      value={formikQuizFill.values.question_code}
                      onChange={formikQuizFill.handleChange}
                      onBlur={formikQuizFill.handleBlur}
                    />
                    {formikQuizFill.touched.question_code && formikQuizFill.errors.question_code && (
                      <div className={h.error}>{formikQuizFill.errors.question_code}</div>
                    )}
                  </div>
                </div>
                <div className={h.formnhap}>
                  <div className={h.bentrong}>
                    <div className={h.bentrong_container}>
                      <div className={h.input__100}>
                        <div className={h.quest}>Nội dung câu hỏi</div>
                      </div>
                      <div className={h.ckeditor}>
                        <CkediterCustomFill
                          initialData={formikQuizFill.values.answer_code__true}
                          onChange={(data) => {
                            const cleanedData = data.replace(/\_\_\_+/g, '____');
                            formikQuizFill.setFieldValue("answer_code__true", cleanedData);
                            formikQuizFill.setTouched({ ...formikQuizFill.touched, answer_code__true: true });
                            formikQuizFill.validateField("answer_code__true");
                          }}
                        ></CkediterCustomFill>
                        {formikQuizFill.errors.answer_code__true && formikQuizFill.touched.answer_code__true && (
                          <div className={h.errorText}>{formikQuizFill.errors.answer_code__true} </div>
                        )}
                      </div>
                    </div>
                  </div>
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
                    <div>Câu trả lời cho câu hỏi</div>
                    {renderQuest}
                    <div className={h.btnAddQuest}>
                      <div className={`${countQuestion === 2 ? h.addQuestDisable : h.addQuest}`} onClick={() => handleReduce()}>
                        <img src="/img/deleteQuest.svg" alt="" className={h.btn__addQuest} />
                      </div>
                      <div className={`${countQuestion === 4 ? h.addQuestDisable : h.addQuest}`} onClick={() => handleIncrease()}>
                        <img src="/img/addQuest.svg" alt="" className={h.btn__addQuest} />
                      </div>
                    </div>
                    {formikQuizMuti.errors.answer_code__false && (
                      <div className={h.error}>{formikQuizMuti.errors.answer_code__false}</div>
                    )}
                  </div>
                  <div className={h.bentrong}>
                    <div>Câu trả lời đúng</div>
                    {renderAnswer}
                    <div className={h.btnAddQuest}>
                      <div className={`${countAnswer === 1 ? h.addQuestDisable : h.addQuest}`} onClick={() => handleReduce_answer()}>
                        <img src="/img/deleteQuest.svg" alt="" className={h.btn__addQuest} />
                      </div>
                      <div className={`${countAnswer === countQuestion ? h.addQuestDisable : h.addQuest}`} onClick={() => handleIncrease_answer()}>
                        <img src="/img/addQuest.svg" alt="" className={h.btn__addQuest} />
                      </div>
                    </div>
                    {formikQuizMuti.errors.answer_code__true && (
                      <div className={h.error}>{formikQuizMuti.errors.answer_code__true}</div>
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
                    <div>Câu trả lời cho câu hỏi</div>
                    {renderQuestTf}
                    <div className={h.btnAddQuest}>
                      <div className={`${countQuestionTf === 2 ? h.addQuestDisable : h.addQuest}`} onClick={() => handleReduceTf()}>
                        <img src="/img/deleteQuest.svg" alt="" className={h.btn__addQuest} />
                      </div>
                      <div className={`${countQuestionTf === 4 ? h.addQuestDisable : h.addQuest}`} onClick={() => handleIncreaseTf()}>
                        <img src="/img/addQuest.svg" alt="" className={h.btn__addQuest} />
                      </div>
                    </div>
                    {formikQuizTf.errors.answer_code__false && (
                      <div className={h.error}>{formikQuizTf.errors.answer_code__false}</div>
                    )}
                  </div>
                  <div className={h.bentrong}>
                    <div>Câu trả lời đúng</div>
                    {renderAnswerTf}
                    {formikQuizTf.errors.answer_code__true && (
                      <div className={h.error}>{formikQuizTf.errors.answer_code__true}</div>
                    )}
                  </div>
                </div>
              </>
            )}
            <div className={h.chonutragiua}>
              <Button className={h.btnthemvao}>Xóa</Button>
              <Button
                type="submit"
                disabled={
                  (typeCourseValue === 'tracnghiem' &&
                    (!formikQuizMuti.isValid || !formikQuizMuti.dirty || errorsAnswer.some((error) => error))) ||
                  (typeCourseValue === 'dungsai' &&
                    (!formikQuizTf.isValid || !formikQuizTf.dirty || errorsAnswerTf.some((error) => error)))
                }
                className={h.btnthemvao1}
              >Lưu</Button>
            </div>
          </form>
        </div>
      </div >
    </div >
  );
};

export default LessonEdit;
