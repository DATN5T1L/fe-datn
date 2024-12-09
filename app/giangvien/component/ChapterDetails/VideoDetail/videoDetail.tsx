'use client'

import { useEffect, useRef, useState } from "react";
import videoMod from "../../Course/VideoDetail/course-video.module.css";
import courseMod from "../../Course/VideoDetail/course.module.css";
import { Button, Image, Stack } from "react-bootstrap";
import {
  ChevronLeft,
  ChevronRight,
  PlayCircle,
  SkipStart,
} from "react-bootstrap-icons";
import Accordion from "react-bootstrap/Accordion";
import CkediterCustom from "../../globalControll/custom-editor";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";
import useCookie from "@/app/(user-global)/component/hook/useCookie";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

interface DocumentDetailProps {
  type: string
}

interface Document {
  id: string;
  name_document: string;
  serial_document: number;
  type_document: string;
  updated_at: string;
}

interface DocumentData<T> {
  status: string;
  chapter_id: string;
  name_chapter: string;
  data: T[]
}

interface ChapterAccordionProps {
  onChangeType: (type: string) => void;
  data: Document[];
}

const VideoDetail: React.FC = () => {
  const searchParams = useSearchParams()
  const [closeFaq, setCloseFaq] = useState(false)
  const [closeCmt, setCloseCmt] = useState(false)
  const token = useCookie('token')
  const [isloading, setIsLoading] = useState(false)

  const [chapterData, setChapterData] = useState<DocumentData<Document> | null>(null)
  const id = searchParams.get('id')
  const nameParams = searchParams.get('name')
  console.log(id);


  const [typeDocument, setTypeDocument] = useState<string>("video");

  useEffect(() => {
    if (id && token) {
      setIsLoading(true)
      fetch(`/api/allDocumentAdmin/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log('Document Data:', data)
          setChapterData(data)
          setIsLoading(false)
        })
        .catch(err => {
          console.log('Error fetching document data:', err)
          setIsLoading(false)
        });
    }
  }, [id, token])

  const handleChangeType = (type: string) => {
    setTypeDocument(type);
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
              </div>
            </>
          )}
        </div>
        <DocumentDetail type={typeDocument}></DocumentDetail>
        {/*Accordion gồm chương và dấu thời gian*/}
        <div className={`${videoMod.chapters} flex-md-shrink-1 flex-grow-1 p-2`}>
          <ChapterSearchBar />
          {chapterData && (
            <ChapterAccordion onChangeType={handleChangeType} data={chapterData?.data} />
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
            className={`${courseMod.btnCTA} ${courseMod.btnCTAOutline} d-flex align-items-center gap-2`}
          >
            <ChevronLeft />
            Bài trước
          </Button>
          <Button
            variant="outline-primary"
            className={`${courseMod.btnCTA} ${courseMod.btnCTAOutline} d-flex align-items-center gap-2`}
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

const DocumentDetail: React.FC<DocumentDetailProps> = ({ type }) => {
  const [htmlCode, setHtmlCode] = useState("<!-- Nhập code html vào đây -->");
  const [cssCode, setCssCode] = useState("/* Nhập code css vào đây */");
  const [jsCode, setJsCode] = useState("// Nhập code javascript vào đây");
  const [formHtml, setFormHtml] = useState(true);
  const [formCss, setFormCss] = useState(false);
  const [formJs, setFormJs] = useState(false);

  const text = `
  <p>
    @media screen and ( ... ) {<br>
    &nbsp;&nbsp;&nbsp;&nbsp;p {<br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;color: ...;<br>
    &nbsp;&nbsp;&nbsp;&nbsp;}
    <br>
    }
  </p>
`;

  // Tách nội dung thành mảng các đoạn
  const splitContent = text.split("...");
  const [inputs, setInputs] = useState<string[]>(
    new Array(splitContent.length - 1).fill("")
  );

  // Hàm xử lý khi nhập liệu
  const handleInputChange = (index: number, value: string) => {
    const newInputs = [...inputs];
    newInputs[index] = value;
    setInputs(newInputs);
  };

  console.log(htmlCode);


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

  console.log(type);


  return (
    <>
      {type === 'video' ? (
        <div
          className={`${videoMod.videoContainer} flex-shrink-1 align-items-start`}
        >
          <video controls>
            <source src="/video/html-in-5-mins.mp4" type="video/mp4" />
          </video>
          <div className="d-flex flex-row p-3 gap-2">
            <div className="d-flex flex-column flex-grow-1">
              <span className={`${videoMod.date} text-muted`}>
                Cập nhật ngày <time dateTime="07-10-2024">07-10-2024</time>
              </span>
              <h3>HTML và CSS là gì?</h3>
              <p>
                HTML CSS (HyperText Markup Language Cascading Style Sheets) Nội
                dung bổ sung: https://www.w3schools.com/css/css_pseudo_classes.asp

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
      ) : type === 'code' ? (
        <div
          className={`${videoMod.videoContainer} flex-shrink-1 align-items-start`}
          style={{ minWidth: '60vw' }}
        >
          <div className={videoMod.documentHedding}>
            <div style={{ gap: '4px' }}>
              <div className={videoMod.documentHedding__title}>
                Bài tập code
              </div>
              <div className={videoMod.documentHedding__date}>Cập nhật ngày: 26/11/2024</div>
            </div>
            <div style={{ gap: '4px' }}>
              <div className={videoMod.documentHedding__content}>
                Câu hỏi: Nội dung câu hỏi
              </div>
              <div className={videoMod.documentHedding__subtitle}>
                Mô tả câu hỏi
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
      ) : type === 'tracnghiem' ? (
        <>
          <div
            className={`${videoMod.videoContainer} flex-shrink-1 align-items-start`}
            style={{ minWidth: '60vw' }}
          >
            <div className={videoMod.documentHedding}>
              <div style={{ gap: '4px' }}>
                <div className={videoMod.documentHedding__title}>
                  Bài tập trắc nghiệm nhiều đáp án
                </div>
                <div className={videoMod.documentHedding__date}>Cập nhật ngày: 26/11/2024</div>
              </div>
              <div style={{ gap: '4px' }}>
                <div className={videoMod.documentHedding__content}>
                  Câu hỏi: Đâu là cách khai báo 1 biến
                </div>
                <div className={videoMod.documentHedding__subtitle}>
                  Chọn các đáp án đúng
                </div>
              </div>
            </div>
            <div className={videoMod.document__container__checkbox}>
              <div className={videoMod.document__container__checkbox__item}>
                <label className={videoMod.document__container__checkbox__label}>
                  <input type="checkbox" className={videoMod.document__container__checkbox__input} />
                  var item = 1
                </label>
              </div>
              <div className={videoMod.document__container__checkbox__item}>
                <label className={videoMod.document__container__checkbox__label}>
                  <input type="checkbox" className={videoMod.document__container__checkbox__input} />
                  var item = 2
                </label>
              </div>
              <div className={videoMod.document__container__checkbox__item}>
                <label className={videoMod.document__container__checkbox__label}>
                  <input type="checkbox" className={videoMod.document__container__checkbox__input} />
                  var item = 3
                </label>
              </div>
              <div className={videoMod.document__container__checkbox__item}>
                <label className={videoMod.document__container__checkbox__label}>
                  <input type="checkbox" className={videoMod.document__container__checkbox__input} />
                  var item = 4
                </label>
              </div>
            </div>
            <div className={videoMod.btn__group}>
              <button className={videoMod.btn__group_item}>Hủy</button>
              <button className={videoMod.btn__group_item}>Trả  lời</button>
            </div>
          </div>
        </>
      ) : type === 'dientu' ? (
        <>
          <div
            className={`${videoMod.videoContainer} flex-shrink-1 align-items-start`}
            style={{ minWidth: '60vw' }}
          >
            <div className={videoMod.documentHedding}>
              <div style={{ gap: '4px' }}>
                <div className={videoMod.documentHedding__title}>
                  Bài tập điền từ
                </div>
                <div className={videoMod.documentHedding__date}>Cập nhật ngày: 26/11/2024</div>
              </div>
              <div style={{ gap: '4px' }}>
                <div className={videoMod.documentHedding__content}>
                  Câu hỏi: Nội dung câu hỏi
                </div>
                <div className={videoMod.documentHedding__subtitle}>
                  Mô tả câu hỏi
                </div>
              </div>
            </div>
            <div
              dangerouslySetInnerHTML={{ __html: splitContent.join(" ____ ") }}
              className={videoMod.document__code}
            ></div>
            <div className={videoMod.input__group__fill}>
              {inputs.map((value, index) => (
                <div key={index}>
                  <label className={videoMod.input_label} >
                    Câu trả lời {index + 1}:
                  </label>
                  <input
                    type="text"
                    value={value}
                    onChange={(e) => handleInputChange(index, e.target.value)}
                    placeholder={`Nhập giá trị tại vị trí ${index + 1}`}
                    className={videoMod.input__fill__item}
                  />
                </div>
              ))}
              <div className={videoMod.btn__group}>
                <button className={videoMod.btn__group_item}>Hủy</button>
                <button className={videoMod.btn__group_item}>Trả  lời</button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <div
            className={`${videoMod.videoContainer} flex-shrink-1 align-items-start`}
            style={{ minWidth: '60vw' }}
          >
            <div className={videoMod.documentHedding}>
              <div style={{ gap: '4px' }}>
                <div className={videoMod.documentHedding__title}>
                  Bài tập trắc nghiệm đúng sai
                </div>
                <div className={videoMod.documentHedding__date}>Cập nhật ngày: 26/11/2024</div>
              </div>
              <div style={{ gap: '4px' }}>
                <div className={videoMod.documentHedding__content}>
                  Câu hỏi: Đâu là cách khai báo 1 biến
                </div>
                <div className={videoMod.documentHedding__subtitle}>
                  Chọn đáp án đúng nhất
                </div>
              </div>
            </div>
            <div className={videoMod.document__container__checkbox}>
              <div className={videoMod.document__container__checkbox__item}>
                <label className={videoMod.document__container__checkbox__label}>
                  <input type="radio" name="check" className={videoMod.document__container__checkbox__input} />
                  var item = 1
                </label>
              </div>
              <div className={videoMod.document__container__checkbox__item}>
                <label className={videoMod.document__container__checkbox__label}>
                  <input type="radio" name="check" className={videoMod.document__container__checkbox__input} />
                  2
                </label>
              </div>
              <div className={videoMod.document__container__checkbox__item}>
                <label className={videoMod.document__container__checkbox__label}>
                  <input type="radio" name="check" className={videoMod.document__container__checkbox__input} />
                  var 3
                </label>
              </div>
              <div className={videoMod.document__container__checkbox__item}>
                <label className={videoMod.document__container__checkbox__label}>
                  <input type="radio" name="check" className={videoMod.document__container__checkbox__input} />
                  var = 4
                </label>
              </div>
            </div>
            <div className={videoMod.btn__group}>
              <button className={videoMod.btn__group_item}>Hủy</button>
              <button className={videoMod.btn__group_item}>Trả  lời</button>
            </div>
          </div>
        </>
      )}
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
  const name = searchParams.get('name')
  const [dataDocument, setDataDocument] = useState(null)
  const token = useCookie('token')

  console.log('đây là data:', data);

  const sortData = [...data].sort((a, b) => a.serial_document - b.serial_document)
  const handleGetDataDocumnet = (id: string) => {
    if (token && id) {
      fetch(`/api/documentId/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log('chi tiết bài tập:', data);
          setDataDocument(data)
        })
        .catch(error => console.error(error))
    }
  }

  return (
    <Accordion defaultActiveKey={["0"]} alwaysOpen>
      <Accordion.Item eventKey="0">
        <Accordion.Header>
          <div className="d-flex flex-column">
            <span className="fw-bold">1. {name}</span>
            <div className={`${videoMod.accordionHeaderInfo} d-flex gap-2`}>
              <span>3/3</span>|<span>24.24</span>
            </div>
          </div>
        </Accordion.Header>
        <Accordion.Body className="p-0">
          <Stack gap={2}>
            {sortData.map((item) => (
              <Button
                key={item.id}
                variant="outline"
                className={`${videoMod.chapterBtn}`}
                onClick={() => {
                  onChangeType(`${item.type_document}`)
                  handleGetDataDocumnet(item.id)
                }}
              >
                <div className="d-flex align-items-center gap-2">
                  {item.type_document === 'video' ? (
                    <PlayCircle size={17} className="text-muted" />
                  ) : (
                    <img src="/img/pencil.svg" alt="icon-document" className={videoMod.icon__document} />
                  )}
                  <div
                    className={`${videoMod.accordionChapter} d-flex flex-column align-items-start text-muted`}
                  >
                    <span>{item.serial_document} {item.name_document}</span>
                    <span>24.24</span>
                  </div>
                </div>
              </Button>
            ))}
            <Button
              variant="outline"
              className={`${videoMod.chapterBtn}`}
              onClick={() => onChangeType('code')}
            >
              <div className="d-flex align-items-center gap-2">
                <img src="/img/pencil.svg" alt="icon-document" className={videoMod.icon__document} />
                <div
                  className={`${videoMod.accordionChapter} d-flex flex-column align-items-start text-muted`}
                >
                  <span>1.1 Bài tập code</span>
                  <span>24.24</span>
                </div>
              </div>
            </Button>
            <Button
              variant="outline"
              className={`${videoMod.chapterBtn}`}
              onClick={() => onChangeType('dungsai')}
            >
              <div className="d-flex align-items-center gap-2">
                <img src="/img/pencil.svg" alt="icon-document" className={videoMod.icon__document} />
                <div
                  className={`${videoMod.accordionChapter} d-flex flex-column align-items-start text-muted`}
                >
                  <span>1.1 Bài tập trắc nghiệm đúng sai</span>
                  <span>24.24</span>
                </div>
              </div>
            </Button>
            <Button
              variant="outline"
              className={`${videoMod.chapterBtn}`}
              onClick={() => onChangeType('tracnghiem')}
            >
              <div className="d-flex align-items-center gap-2">
                <img src="/img/pencil.svg" alt="icon-document" className={videoMod.icon__document} />
                <div
                  className={`${videoMod.accordionChapter} d-flex flex-column align-items-start text-muted`}
                >
                  <span>1.1 Bài tập trắc nghiệm nhiều đáp án</span>
                  <span>24.24</span>
                </div>
              </div>
            </Button>
          </Stack>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
};

