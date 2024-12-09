import { useEffect, useRef, useState } from "react";
import videoMod from "./course-video.module.css";
import courseMod from "./course.module.css";
import { Button, Image, Stack } from "react-bootstrap";
import {
  ChevronLeft,
  ChevronRight,
  PlayCircle,
  QuestionCircle,
  Search,
  SkipStart,
} from "react-bootstrap-icons";
import Accordion from "react-bootstrap/Accordion";
import CkediterCustom from "../../globalControll/custom-editor";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import useCookie from "@/app/(user-global)/component/hook/useCookie";
import useFormatDate from "@/app/(user-global)/component/globalControl/useFormatDate";
import ReactPlayer from "react-player";
import ReactLoading from 'react-loading';

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

interface DocumentDetailProps {
  idDoc: string
}

interface CourseData {
  course_id: string;
  data: DocumentData<Document>[]
}

interface Document {
  document_id: string;
  name_document: string;
  discription_document: string;
  serial_document: number;
  type_document: string;
  url_video: string;
  updated_at: string;
  codes: [
    {
      answer_code: string;
      id: string;
      question_code: string;
      tutorial_code: string;
      updated_at: string;
    }
  ];
  quizs: [
    {
      answer_question: string;
      content_question: string;
      id: string;
      type_question: string;
      updated_at: string;
    }
  ];
}

interface DocumentData<T> {
  chapter_id: string;
  chapter_name: string;
  documents: T[]
}

interface Apidata<T> {
  status: string;
  message: string;
  data: T
}

interface ChapterAccordionProps {
  onChangeType: (idDoc: string) => void;
  data: CourseData;
}

const VideoDetail: React.FC = () => {
  const searchParams = useSearchParams()
  const [closeFaq, setCloseFaq] = useState(false)
  const [closeCmt, setCloseCmt] = useState(false)
  const token = useCookie('token')
  const [isloading, setIsLoading] = useState(false)

  const [chapterData, setChapterData] = useState<CourseData | null>(null)
  const id = searchParams.get('id')
  const nameParams = searchParams.get('name')
  console.log(id);


  const [typeDocument, setTypeDocument] = useState<string>("");

  useEffect(() => {
    if (id && token) {
      setIsLoading(true)
      fetch(`/api/docByCourseAdmin/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log('Document Data:', data)
          setChapterData(data)
          if (data && data.data.length > 0) {
            const firstDoc = data.data[0]?.documents?.[0];
            if (firstDoc) {
              setTypeDocument(firstDoc.document_id)
            }
          }
          setIsLoading(false)
        })
        .catch(err => {
          console.log('Error fetching document data:', err)
          setIsLoading(false)
        });
    }
  }, [id, token])

  const documents = chapterData
    ? chapterData.data.flatMap((chapter) => chapter.documents)
    : [];


  const handleChangeType = (idDoc: string) => {
    setTypeDocument(idDoc);
  };

  const handleCloseFaq = () => {
    setCloseFaq(!closeFaq)
    if (closeCmt) {
      setCloseFaq(false)
    }
  }

  const handleCloseCmt = () => {
    setCloseCmt(!closeCmt)
    if (closeFaq) {
      setCloseCmt(false)
    }
  }

  const handlePrevious = () => {
    const currentIndex = documents.findIndex(
      (doc) => doc.document_id === typeDocument
    );
    if (currentIndex > 0) {
      setTypeDocument(documents[currentIndex - 1].document_id);
    } else {
      alert("Đây là bài đầu tiên!");
    }
  };

  const handleNext = () => {
    const currentIndex = documents.findIndex(
      (doc) => doc.document_id === typeDocument
    );
    if (currentIndex < documents.length - 1) {
      setTypeDocument(documents[currentIndex + 1].document_id);
    } else {
      alert("Đây là bài cuối cùng!");
    }
  };

  return (
    <>
      <div className={`${videoMod.content} d-flex flex-column flex-lg-row`}>
        <div className={`${videoMod.FAQ__container} ${closeFaq || closeCmt ? videoMod.FAQ__container__not__hidden : videoMod.FAQ__container__hidden}`}>
          {closeFaq && (
            <>
              <div className={videoMod.FAQ__hedding}>
                <div className={videoMod.FAQ__title}>
                  Hỏi đáp
                </div>
                <div className={videoMod.FAQ__btn} onClick={() => handleCloseFaq()}>
                  <img className={videoMod.FAQ__icon} src="/img/CanxelBlack.svg" alt="close" />
                </div>
              </div>
              <div className={videoMod.FAQ__subtitle}>
                Danh sách bài học
                <hr className={videoMod.FAQ__subtitle__hr} />
              </div>
              <div className={videoMod.FAQ__body}>
                <Accordion defaultActiveKey={["0"]} alwaysOpen>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      <div className="d-flex flex-column">
                        <span className="fw-bold">1. Bắt đầu</span>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body className="p-0">
                      <Stack gap={2}>
                        <Button variant="outline" className={`${videoMod.chapterBtn}`}>
                          <div className="d-flex align-items-center gap-2">
                            <PlayCircle size={17} className="text-muted" />
                            <div
                              className={`${videoMod.accordionChapter} d-flex flex-column align-items-start text-muted`}
                            >
                              <span>1.1 Bắt đầu</span>
                            </div>
                          </div>
                        </Button>
                        <Button variant="outline" className={`${videoMod.chapterBtn}`}>
                          <div className="d-flex align-items-center gap-2">
                            <PlayCircle size={17} className="text-muted" />
                            <div
                              className={`${videoMod.accordionChapter} d-flex flex-column align-items-start text-muted`}
                            >
                              <span>1.2 Bắt đầu</span>
                            </div>
                          </div>
                        </Button>
                        <Button variant="outline" className={`${videoMod.chapterBtn}`}>
                          <div className="d-flex align-items-center gap-2">
                            <PlayCircle size={17} className="text-muted" />
                            <div
                              className={`${videoMod.accordionChapter} d-flex flex-column align-items-start text-muted`}
                            >
                              <span>1.3 Bắt đầu</span>
                            </div>
                          </div>
                        </Button>
                      </Stack>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>
                      <div className="d-flex flex-column">
                        <span className="fw-bold">1. Bắt đầu</span>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body className="p-0">
                      <Stack gap={2}>
                        <Button variant="outline" className={`${videoMod.chapterBtn}`}>
                          <div className="d-flex align-items-center gap-2">
                            <PlayCircle size={17} className="text-muted" />
                            <div
                              className={`${videoMod.accordionChapter} d-flex flex-column align-items-start text-muted`}
                            >
                              <span>2.1 Bắt đầu</span>
                            </div>
                          </div>
                        </Button>
                        <Button variant="outline" className={`${videoMod.chapterBtn}`}>
                          <div className="d-flex align-items-center gap-2">
                            <PlayCircle size={17} className="text-muted" />
                            <div
                              className={`${videoMod.accordionChapter} d-flex flex-column align-items-start text-muted`}
                            >
                              <span>2.2 Bắt đầu</span>
                            </div>
                          </div>
                        </Button>
                        <Button variant="outline" className={`${videoMod.chapterBtn}`}>
                          <div className="d-flex align-items-center gap-2">
                            <PlayCircle size={17} className="text-muted" />
                            <div
                              className={`${videoMod.accordionChapter} d-flex flex-column align-items-start text-muted`}
                            >
                              <span>2.3 Bắt đầu</span>
                            </div>
                          </div>
                        </Button>
                      </Stack>
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>
                      <div className="d-flex flex-column">
                        <span className="fw-bold">1. Bắt đầu</span>
                      </div>
                    </Accordion.Header>
                    <Accordion.Body className="p-0">
                      <Stack gap={2}>
                        <Button variant="outline" className={`${videoMod.chapterBtn}`}>
                          <div className="d-flex align-items-center gap-2">
                            <PlayCircle size={17} className="text-muted" />
                            <div
                              className={`${videoMod.accordionChapter} d-flex flex-column align-items-start text-muted`}
                            >
                              <span>1.1 Bắt đầu</span>
                            </div>
                          </div>
                        </Button>
                        <Button variant="outline" className={`${videoMod.chapterBtn}`}>
                          <div className="d-flex align-items-center gap-2">
                            <PlayCircle size={17} className="text-muted" />
                            <div
                              className={`${videoMod.accordionChapter} d-flex flex-column align-items-start text-muted`}
                            >
                              <span>1.1 Bắt đầu</span>
                            </div>
                          </div>
                        </Button>
                        <Button variant="outline" className={`${videoMod.chapterBtn}`}>
                          <div className="d-flex align-items-center gap-2">
                            <PlayCircle size={17} className="text-muted" />
                            <div
                              className={`${videoMod.accordionChapter} d-flex flex-column align-items-start text-muted`}
                            >
                              <span>1.1 Bắt đầu</span>
                            </div>
                          </div>
                        </Button>
                      </Stack>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            </>
          )}
          {closeCmt && (
            <>
              <div className={videoMod.CMT__hedding}>
                <div className={videoMod.CMT__title}>
                  108 Bình luận
                </div>
                <div className={videoMod.FAQ__btn} onClick={() => handleCloseCmt()}>
                  <img className={videoMod.FAQ__icon} src="/img/CanxelBlack.svg" alt="close" />
                </div>
              </div>
              <div className={videoMod.box__chat__container}>
                <div className={videoMod.cmt__container}>
                  <div className={videoMod.cmt__container__header}>
                    <img src="/img/iconUserChatDetail.svg" alt="icon-user" className={videoMod.cmt__container__avt} />
                    <div className={videoMod.cmt__container__header__groupTitle}>
                      <div className={videoMod.cmt__container__header__title}>
                        Thảo Thảo
                      </div>
                      <div className={videoMod.cmt__container__header__subtitle}>
                        2 tháng trước
                      </div>
                    </div>
                  </div>
                  <div className={videoMod.cmt__container__content}>
                    Domain rồi còn subdomain dùng sao hả thầy. Em có sài domain và deploy được rồi.
                  </div>
                  <div className={videoMod.cmt__container__setting}>
                    <div className={videoMod.cmt__container__sevice}>
                      <img src="/img/boxHollow.svg" alt="" className={videoMod.cmt__container__sevice__icon} />
                    </div>
                    <div className={videoMod.cmt__container__sevice}>
                      <img src="/img/action.svg" alt="" className={videoMod.cmt__container__sevice__icon} />
                    </div>
                    <div className={videoMod.cmt__container__sevice}>
                      <img src="/img/replyCmt.svg" alt="" className={videoMod.cmt__container__sevice__icon} />
                    </div>
                  </div>
                </div>
                <div className={videoMod.repCmt__container}>
                  <div className={videoMod.repCmt__avt__ctn}>
                    <img src="/img/iconUserChatDetail.svg" alt="icon-user" className={videoMod.repCmt__avt} />
                  </div>
                  <div className={videoMod.repCmt__form}>
                    <CkediterCustom></CkediterCustom>
                    <div className={videoMod.repCmt__form__sevice}>
                      <button className={videoMod.repCmt__form__sevice__active}>Hủy</button>
                      <button className={videoMod.repCmt__form__sevice__active}>Trả lời</button>
                    </div>
                  </div>
                </div>
                <div className={videoMod.cmt__container}>
                  <div className={videoMod.cmt__container__header}>
                    <img src="/img/iconUserChatDetail.svg" alt="icon-user" className={videoMod.cmt__container__avt} />
                    <div className={videoMod.cmt__container__header__groupTitle}>
                      <div className={videoMod.cmt__container__header__title}>
                        Thảo Thảo
                      </div>
                      <div className={videoMod.cmt__container__header__subtitle}>
                        2 tháng trước
                      </div>
                    </div>
                  </div>
                  <div className={videoMod.cmt__container__content}>
                    Domain rồi còn subdomain dùng sao hả thầy. Em có sài domain và deploy được rồi.
                  </div>
                  <div className={videoMod.cmt__container__setting}>
                    <div className={videoMod.cmt__container__sevice}>
                      <img src="/img/boxHollow.svg" alt="" className={videoMod.cmt__container__sevice__icon} />
                    </div>
                    <div className={videoMod.cmt__container__sevice}>
                      <img src="/img/action.svg" alt="" className={videoMod.cmt__container__sevice__icon} />
                    </div>
                    <div className={videoMod.cmt__container__sevice}>
                      <img src="/img/replyCmt.svg" alt="" className={videoMod.cmt__container__sevice__icon} />
                    </div>
                  </div>
                </div>
                <div className={videoMod.cmt__container}>
                  <div className={videoMod.cmt__container__header}>
                    <img src="/img/iconUserChatDetail.svg" alt="icon-user" className={videoMod.cmt__container__avt} />
                    <div className={videoMod.cmt__container__header__groupTitle}>
                      <div className={videoMod.cmt__container__header__title}>
                        Thảo Thảo
                      </div>
                      <div className={videoMod.cmt__container__header__subtitle}>
                        2 tháng trước
                      </div>
                    </div>
                  </div>
                  <div className={videoMod.cmt__container__content}>
                    Domain rồi còn subdomain dùng sao hả thầy. Em có sài domain và deploy được rồi.
                  </div>
                  <div className={videoMod.cmt__container__setting}>
                    <div className={videoMod.cmt__container__sevice}>
                      <img src="/img/boxHollow.svg" alt="" className={videoMod.cmt__container__sevice__icon} />
                    </div>
                    <div className={videoMod.cmt__container__sevice}>
                      <img src="/img/action.svg" alt="" className={videoMod.cmt__container__sevice__icon} />
                    </div>
                    <div className={videoMod.cmt__container__sevice}>
                      <img src="/img/replyCmt.svg" alt="" className={videoMod.cmt__container__sevice__icon} />
                    </div>
                  </div>
                </div>
                <div className={videoMod.cmt__container}>
                  <div className={videoMod.cmt__container__header}>
                    <img src="/img/iconUserChatDetail.svg" alt="icon-user" className={videoMod.cmt__container__avt} />
                    <div className={videoMod.cmt__container__header__groupTitle}>
                      <div className={videoMod.cmt__container__header__title}>
                        Thảo Thảo
                      </div>
                      <div className={videoMod.cmt__container__header__subtitle}>
                        2 tháng trước
                      </div>
                    </div>
                  </div>
                  <div className={videoMod.cmt__container__content}>
                    Domain rồi còn subdomain dùng sao hả thầy. Em có sài domain và deploy được rồi.
                  </div>
                  <div className={videoMod.cmt__container__setting}>
                    <div className={videoMod.cmt__container__sevice}>
                      <img src="/img/boxHollow.svg" alt="" className={videoMod.cmt__container__sevice__icon} />
                    </div>
                    <div className={videoMod.cmt__container__sevice}>
                      <img src="/img/action.svg" alt="" className={videoMod.cmt__container__sevice__icon} />
                    </div>
                    <div className={videoMod.cmt__container__sevice}>
                      <img src="/img/replyCmt.svg" alt="" className={videoMod.cmt__container__sevice__icon} />
                    </div>
                  </div>
                </div>
                <div className={videoMod.cmt__container}>
                  <div className={videoMod.cmt__container__header}>
                    <img src="/img/iconUserChatDetail.svg" alt="icon-user" className={videoMod.cmt__container__avt} />
                    <div className={videoMod.cmt__container__header__groupTitle}>
                      <div className={videoMod.cmt__container__header__title}>
                        Thảo Thảo
                      </div>
                      <div className={videoMod.cmt__container__header__subtitle}>
                        2 tháng trước
                      </div>
                    </div>
                  </div>
                  <div className={videoMod.cmt__container__content}>
                    Domain rồi còn subdomain dùng sao hả thầy. Em có sài domain và deploy được rồi.
                  </div>
                  <div className={videoMod.cmt__container__setting}>
                    <div className={videoMod.cmt__container__sevice}>
                      <img src="/img/boxHollow.svg" alt="" className={videoMod.cmt__container__sevice__icon} />
                    </div>
                    <div className={videoMod.cmt__container__sevice}>
                      <img src="/img/action.svg" alt="" className={videoMod.cmt__container__sevice__icon} />
                    </div>
                    <div className={videoMod.cmt__container__sevice}>
                      <img src="/img/replyCmt.svg" alt="" className={videoMod.cmt__container__sevice__icon} />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
        <DocumentDetail idDoc={typeDocument}></DocumentDetail>
        {/*Accordion gồm chương và dấu thời gian*/}
        <div className={`${videoMod.chapters} flex-md-shrink-1 flex-grow-1 p-2`}>
          <ChapterSearchBar />
          {chapterData && (
            <ChapterAccordion onChangeType={handleChangeType} data={chapterData} />
          )}
        </div>
      </div>
      <footer
        className={`${videoMod.contentFooter} d-flex align-items-center justify-content-between px-3`}
      >
        <div className="d-flex gap-3">
          {closeFaq ? (
            <div className="" aria-disabled={true}>
              <Image width={50} src="/img/Faq.svg" alt="icon-chat" className="text-primary" />
            </div>
          ) : (
            <div className="">
              <Image width={50} src="/img/Faq.svg" className="text-primary" onClick={() => handleCloseFaq()} alt="icon-chat" />
            </div>
          )}
          {closeFaq ? (
            <div className="" aria-disabled={true}>
              <Image width={50} src="/img/chatDetailVideo.svg" alt="icon-chat" className="text-primary" />
            </div>
          ) : (
            <div className="">
              <Image width={50} src="/img/chatDetailVideo.svg" className="text-primary" onClick={() => handleCloseCmt()} alt="icon-chat" />
            </div>
          )}
        </div>
        <div className="d-inline-flex gap-2">
          <Button
            variant="outline-primary"
            className={`d-flex align-items-center gap-2`}
            onClick={handlePrevious}
            disabled={!documents.length || documents.findIndex(doc => doc.document_id === typeDocument) === 0}
          >
            <ChevronLeft />
            Bài trước
          </Button>
          <Button
            variant="outline-primary"
            className={`d-flex align-items-center gap-2`}
            onClick={handleNext}
            disabled={!documents.length || documents.findIndex(doc => doc.document_id === typeDocument) === documents.length - 1}
          >
            Bài kế tiếp
            <ChevronRight />
          </Button>
        </div>
        <div className="d-inline-flex align-items-center gap-2">
          <span className={`${videoMod.footerChapter} text-muted`}>
            {nameParams}
          </span>
        </div>
      </footer>
    </>
  )
};

export default VideoDetail;

const DocumentDetail: React.FC<DocumentDetailProps> = ({ idDoc }) => {
  const [htmlCode, setHtmlCode] = useState("");
  const [cssCode, setCssCode] = useState("");
  const [jsCode, setJsCode] = useState("");
  const [formHtml, setFormHtml] = useState(true);
  const [formCss, setFormCss] = useState(false);
  const [formJs, setFormJs] = useState(false);
  const token = useCookie('token')
  const [dataDoc, setDataDoc] = useState<Apidata<Document> | null>(null)
  const [fillValue, setFillValue] = useState('')
  const [tfValue, setTfValue] = useState('')
  const [selectedMuti, setSelectedMuti] = useState<string[]>([]);
  const [mutiValue, setMutiValue] = useState('');

  const handleCheckFill = () => {
    if (dataDoc && dataDoc.data.type_document === 'quiz' && dataDoc.data.quizs[0] && dataDoc.data.quizs[0].type_question === "fill") {
      if (dataDoc.data.quizs[0].answer_question) {
        const answer = dataDoc?.data.quizs[0].answer_question
        if (answer === fillValue) {
          alert('Đáp án đúng')
          setFillValue('')
        } else {
          alert('Đáp án sai')
          setFillValue('')
        }
      }
    }
  }

  const handleCheckTf = () => {
    if (dataDoc && dataDoc.data.type_document === 'quiz' && dataDoc.data.quizs[0] && dataDoc.data.quizs[0].type_question === "true_false") {
      if (dataDoc.data.quizs[0].answer_question) {
        const answer = dataDoc?.data.quizs[0].answer_question
        if (answer === tfValue) {
          alert('Đáp án đúng')
          setTfValue('')
        } else {
          alert('Đáp án sai')
          setTfValue('')
        }
      }
    }
  }

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const updatedAnswers = event.target.checked
      ? [...selectedMuti, value]
      : selectedMuti.filter((answer) => answer !== value);

    setSelectedMuti(updatedAnswers);

    const joinedString = updatedAnswers.join('/');
    setMutiValue(joinedString);
  };

  const handleCheckMuti = () => {
    if (dataDoc && dataDoc.data.type_document === 'quiz' && dataDoc.data.quizs[0] && dataDoc.data.quizs[0].type_question === "multiple_choice") {
      if (dataDoc.data.quizs[0].answer_question) {
        const answer = dataDoc?.data.quizs[0].answer_question
        if (answer === mutiValue) {
          alert('Đáp án đúng')
          setMutiValue('')
          setSelectedMuti([])
        } else {
          alert('Đáp án sai')
          setMutiValue('')
          setSelectedMuti([])
        }
      }
    }
  }

  console.log(mutiValue);

  const handleHtmlChange = (value: string | undefined) => {
    setHtmlCode(value || "");
  };

  const handleCssChange = (value: string | undefined) => {
    setCssCode(value || "");
  };

  const handleJsChange = (value: string | undefined) => {
    setJsCode(value || "");
  };

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

  console.log('id: ', idDoc);

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
          console.log(data);
          if (data) {
            setDataDoc(data)
          }
        })
        .catch(error => {
          console.error(error);
        })
    }
  }, [idDoc, token])



  return (
    <>
      {dataDoc && dataDoc?.data?.type_document === 'video' ? (
        <div
          className={`${videoMod.videoContainer} flex-shrink-1 align-items-start`}
          style={{ minWidth: '60vw' }}
        >
          <ReactPlayer
            url={`${dataDoc.data.url_video}`}
            width="100%"
            height="70%"
            controls={true}
          />
          <div className="d-flex flex-row p-3 gap-2">
            <div className="d-flex flex-column flex-grow-1">
              <span className={`${videoMod.date} text-muted`}>
                Cập nhật ngày <time>{useFormatDate(dataDoc.data.updated_at)}</time>
              </span>
              <h3>{dataDoc.data.name_document}</h3>
              <p>
                {dataDoc.data.discription_document}
              </p>
            </div>
            <div
              className={`${courseMod.actions} d-flex flex-column flex-shrink-0`}
            >
              <Button className={`${courseMod.btnCTA}`}>Duyệt video</Button>
              <Button
                variant="outline-primary"
                className={`${courseMod.btnCTA} ${courseMod.btnCTAOutline}`}
              >
                Từ chối video
              </Button>
            </div>
          </div>
        </div>
      ) : dataDoc?.data?.type_document === 'code' ? (
        <div
          className={`${videoMod.videoContainer} flex-shrink-1 align-items-start`}
          style={{ minWidth: '60vw' }}
        >
          <div className={videoMod.documentHedding}>
            <div style={{ gap: '4px' }}>
              <div className={videoMod.documentHedding__title}>
                {dataDoc.data.name_document}
              </div>
              <div className={videoMod.documentHedding__date}>Cập nhật ngày: {useFormatDate(dataDoc.data.updated_at)}</div>
            </div>
            <div style={{ gap: '4px' }}>
              <div className={videoMod.documentHedding__content}>
                Câu hỏi: {dataDoc.data.codes[0].question_code}
              </div>
              <div className={videoMod.documentHedding__subtitle}>
                {dataDoc.data.codes[0].tutorial_code}
              </div>
            </div>
          </div>

          <div className={videoMod.documentBody}>
            <div className={videoMod.documentBody__btnGroup}>
              <div
                className={`${formHtml && !formCss && !formJs ? videoMod.documentBody__btnGroup__btn : videoMod.documentBody__btnGroup__btn__active}`}
                onClick={handleOnHtml}
              >
                HTML
              </div>
              <div
                className={`${!formHtml && formCss && !formJs ? videoMod.documentBody__btnGroup__btn : videoMod.documentBody__btnGroup__btn__active}`}
                onClick={handleOnCss}
              >
                CSS</div>
              <div
                className={`${!formHtml && !formCss && formJs ? videoMod.documentBody__btnGroup__btn : videoMod.documentBody__btnGroup__btn__active}`}
                onClick={handleOnJs}
              >
                JS</div>
            </div>
            <div className={videoMod.documentBody__main}>
              {formHtml ? (
                <MonacoEditor
                  height="400px"
                  defaultLanguage="html"
                  value={htmlCode}
                  theme="vs-light"
                  onChange={handleHtmlChange}
                />
              ) : formCss ? (
                <MonacoEditor
                  height="400px"
                  defaultLanguage="css"
                  value={cssCode}
                  theme="vs-light"
                  onChange={handleCssChange}
                />
              ) : formJs ? (
                <MonacoEditor
                  height="400px"
                  defaultLanguage="javascript"
                  value={jsCode}
                  theme="vs-light"
                  onChange={handleJsChange}
                />
              ) : ''}
            </div>
          </div>
          <div className={videoMod.btn__group}>
            <button className={videoMod.btn__group_item}>Hủy</button>
            <button className={videoMod.btn__group_item}>Trả  lời</button>
          </div>
        </div >
      ) : dataDoc?.data?.type_document === 'quiz' &&
        dataDoc.data.quizs[0].type_question === 'multiple_choice' ? (
        <>
          <div
            className={`${videoMod.videoContainer} flex-shrink-1 align-items-start`}
            style={{ minWidth: '60vw' }}
          >
            <div className={videoMod.documentHedding}>
              <div style={{ gap: '4px' }}>
                <div className={videoMod.documentHedding__title}>
                  {dataDoc.data.name_document}
                </div>
                <div className={videoMod.documentHedding__date}>Cập nhật ngày: {useFormatDate(dataDoc.data.name_document)}</div>
              </div>
              <div style={{ gap: '4px' }}>
                <div className={videoMod.documentHedding__content}>
                  Câu hỏi: {dataDoc.data.discription_document}
                </div>
                <div className={videoMod.documentHedding__subtitle}>
                  {dataDoc.data.discription_document}
                </div>
              </div>
            </div>
            <div className={videoMod.document__container__checkbox}>
              {dataDoc.data.quizs[0].content_question.split('/').map((item) => (
                <div key={item} className={videoMod.document__container__checkbox__item}>
                  <label className={videoMod.document__container__checkbox__label}>
                    <input
                      type="checkbox"
                      value={item}
                      checked={selectedMuti.includes(item)}
                      onChange={handleCheckboxChange}
                      className={videoMod.document__container__checkbox__input}
                    />
                    {item}
                  </label>
                </div>
              ))}
            </div>
            <div className={videoMod.btn__group}>
              <button className={videoMod.btn__group_item} onClick={() => {
                setMutiValue('')
                setSelectedMuti([])
              }}>Hủy</button>
              <button className={videoMod.btn__group_item} onClick={handleCheckMuti}>Trả  lời</button>
            </div>
          </div>
        </>
      ) : dataDoc?.data?.type_document === 'quiz' && dataDoc.data.quizs[0].type_question === 'fill' ? (
        <>
          <div
            className={`${videoMod.videoContainer} flex-shrink-1 align-items-start`}
            style={{ minWidth: '60vw' }}
          >
            <div className={videoMod.documentHedding}>
              <div style={{ gap: '4px' }}>
                <div className={videoMod.documentHedding__title}>
                  {dataDoc.data.name_document}
                </div>
                <div className={videoMod.documentHedding__date}>Cập nhật ngày: {useFormatDate(dataDoc.data.updated_at)}</div>
              </div>
              <div style={{ gap: '4px' }}>
                <div className={videoMod.documentHedding__content}>
                  Câu hỏi: {dataDoc.data.name_document}
                </div>
                <div className={videoMod.documentHedding__subtitle}>
                  {dataDoc.data.discription_document}
                </div>
              </div>
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: dataDoc.data.quizs[0].content_question }}
              className={videoMod.document__code}
            ></div>
            <div className={videoMod.input__group__fill}>
              <div >
                <label className={videoMod.input_label} >
                  Câu trả lời:
                </label>
                <input
                  type="text"
                  value={fillValue}
                  onChange={(e) => setFillValue(e.target.value)}
                  placeholder={`Nhập giá trị lần lượt`}
                  className={videoMod.input__fill__item}
                />
              </div>
              <div className={videoMod.btn__group}>
                <button className={videoMod.btn__group_item} onClick={() => setFillValue('')}>Hủy</button>
                <button className={videoMod.btn__group_item} onClick={handleCheckFill}>Trả  lời</button>
              </div>
            </div>
          </div>
        </>
      ) : dataDoc?.data?.type_document === 'quiz' && dataDoc.data.quizs[0].type_question === 'true_false' ? (
        <>
          <div
            className={`${videoMod.videoContainer} flex-shrink-1 align-items-start`}
            style={{ minWidth: '60vw' }}
          >
            <div className={videoMod.documentHedding}>
              <div style={{ gap: '4px' }}>
                <div className={videoMod.documentHedding__title}>
                  {dataDoc.data.name_document}
                </div>
                <div className={videoMod.documentHedding__date}>Cập nhật ngày: {useFormatDate(dataDoc.data.updated_at)}</div>
              </div>
              <div style={{ gap: '4px' }}>
                <div className={videoMod.documentHedding__content}>
                  Câu hỏi: {dataDoc.data.name_document}
                </div>
                <div className={videoMod.documentHedding__subtitle}>
                  {dataDoc.data.discription_document}
                </div>
              </div>
            </div>
            <div className={videoMod.document__container__checkbox}>
              {dataDoc.data.quizs[0].content_question.split('/')
                .map((item) => (
                  <div key={item} className={videoMod.document__container__checkbox__item}>
                    <label className={videoMod.document__container__checkbox__label}>
                      <input
                        type="radio"
                        name={`check`}
                        onChange={(e) => setTfValue(e.target.value)}
                        checked={tfValue.includes(item)}
                        value={`${[item]}`}
                        className={videoMod.document__container__checkbox__input}
                      />
                      {[item]}
                    </label>
                  </div>
                ))
              }
            </div>
            <div className={videoMod.btn__group}>
              <button className={videoMod.btn__group_item} onClick={() => setTfValue('')}>Hủy</button>
              <button className={videoMod.btn__group_item} onClick={handleCheckTf}>Trả  lời</button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className={`${videoMod.videoContainer1}`}
            style={{ minWidth: '60vw' }}
          >
            <ReactLoading type={"spin"} color={'rgba(153, 153, 153, 1)'} height={'10%'} width={'10%'} className={videoMod.align} />
          </div>
        </>
      )
      }
    </>
  )
}

const ChapterSearchBar: React.FC = () => {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span
          className="input-group-text bg-transparent border-end-0 rounded-start-5 rounded-end-0 p-2"
          id="inputGroup-sizing-default"
        >
          {/* Search icon start */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 12 12"
            fill="none"
          >
            <g clipPath="url(#clip0_3435_8010)">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.75 1.375C3.33375 1.375 1.375 3.33375 1.375 5.75C1.375 8.16625 3.33375 10.125 5.75 10.125C8.16625 10.125 10.125 8.16625 10.125 5.75C10.125 3.33375 8.16625 1.375 5.75 1.375ZM0.625 5.75C0.625 2.91954 2.91954 0.625 5.75 0.625C8.58046 0.625 10.875 2.91954 10.875 5.75C10.875 7.03026 10.4056 8.20087 9.62943 9.0991L11.2652 10.7348C11.4116 10.8813 11.4116 11.1187 11.2652 11.2652C11.1187 11.4116 10.8813 11.4116 10.7348 11.2652L9.0991 9.62943C8.20087 10.4056 7.03026 10.875 5.75 10.875C2.91954 10.875 0.625 8.58046 0.625 5.75Z"
                fill="#4993f8"
              />
            </g>
            <defs>
              <clipPath id="clip0_3435_8010">
                <rect width="12" height="12" fill="white" />
              </clipPath>
            </defs>
          </svg>
          {/* Search icon end */}
        </span>
      </div>
      <input
        placeholder="Tìm kiếm bài học"
        type="text"
        className="form-control rounded-end-5 border-start-0 p-2"
        aria-label="Default"
        aria-describedby="inputGroup-sizing-default"
      />
    </div>
  );
};

const ChapterAccordion: React.FC<ChapterAccordionProps> = ({ onChangeType, data }) => {
  const searchParams = useSearchParams()
  if (!data) return null;

  return (
    <>
      <Accordion defaultActiveKey={["0"]} alwaysOpen>
        {data && data.data.map((item, index) => (
          <Accordion.Item key={index} eventKey={`${index}`}>
            <Accordion.Header>
              <div className="d-flex flex-column">
                <span className="fw-bold">{index + 1}. {item.chapter_name}</span>
                <div className={`${videoMod.accordionHeaderInfo} d-flex gap-2`}>
                  <span>{item?.documents?.length}</span>|<span>24.24</span>
                </div>
              </div>
            </Accordion.Header>
            <Accordion.Body className="p-0">
              <Stack gap={2}>
                {item?.documents?.sort((a, b) => a.serial_document - b.serial_document)
                  .map((doc) => (
                    <Button
                      key={doc.serial_document}
                      variant="outline"
                      className={`${videoMod.chapterBtn}`}
                      onClick={() => {
                        onChangeType(`${doc.document_id}`)
                      }}
                    >
                      <div className="d-flex align-items-center gap-2">
                        {doc.type_document === 'video' ? (
                          <PlayCircle size={17} className="text-muted" />
                        ) : (
                          <img src="/img/pencil.svg" alt="icon-document" className={videoMod.icon__document} />
                        )}
                        <div
                          className={`${videoMod.accordionChapter} d-flex flex-column align-items-start text-muted`}
                        >
                          <span>{doc.serial_document}. {doc.name_document}</span>
                          <span>24.24</span>
                        </div>
                      </div>
                    </Button>
                  ))}
              </Stack>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </>
  );
};

