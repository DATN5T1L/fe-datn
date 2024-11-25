"use client";

import { SetStateAction, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import h from "./lessonAdd.module.css";
import { type } from "os";

const LessonEdit: React.FC = () => {
  const [showForm, setShowForm] = useState(true);
  const [activeButton, setActiveButton] = useState("lesson");
  const [typeCourseValue, setTypeCourseValue] = useState("video");

  const handleButtonClick = (buttonType: SetStateAction<string>) => {
    setShowForm(buttonType === "lesson");
    setActiveButton(buttonType);
  };

  return (
    <div>
      <div className={h.header}>
        <div className={h.header_add}>Sửa bài học</div>
        <div className={h.nutheader}>
          <Button
            className={activeButton === "lesson" ? h.btnbaihoc : h.btnbaitap}
            onClick={() => handleButtonClick("lesson")}
          >
            Demo
          </Button>
        </div>
      </div>
      <div className={h.body_add}>
        <div className={h.wapper}>
          <div className={h.wapper_body}>
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
                    <option value="dungsai">Đúng sai</option>
                    <option value="tracnghiem">Trắc nghiệm</option>
                    <option value="code">Code</option>
                  </select>
                  <img src="/img/chevronGray-04.svg" />
                </div>
              </div>
              <div className={h.bentrong}>
                <div>Chương</div>
                <div className={h.selectne}>
                  <select className={h.inputne}>
                    <option value="reactjs">Giới thiệu về reactJS</option>
                    <option value="reactjs">Giới thiệu về reactJS</option>
                    <option value="reactjs">Giới thiệu về reactJS</option>
                    <option value="reactjs">Giới thiệu về reactJS</option>
                    <option value="reactjs">Giới thiệu về reactJS</option>
                  </select>
                  <img src="/img/chevronGray-04.svg" />
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
                    />
                  </div>
                  <div className={h.bentrong}>
                    <div>Số thứ tự</div>
                    <input
                      className={h.inputne}
                      placeholder="Số thứ tự của bài học"
                    />
                  </div>
                </div>
                <div className={h.formnhap}>
                  <div className={h.bentrong}>
                    <div>Đường dẫn</div>
                    <input
                      className={h.inputne}
                      placeholder="Đường dẫn của bài học"
                    />
                  </div>
                  <div className={h.bentrong}>
                    <div>Mô tả bài học</div>
                    <textarea
                      rows={3}
                      className={h.inputne1}
                      placeholder="Nhập mô tả vào đây"
                    />
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
                    />
                  </div>
                  <div className={h.bentrong}>
                    <div>Số thứ tự</div>
                    <input
                      className={h.inputne}
                      placeholder="Số thứ tự của bài học"
                    />
                  </div>
                </div>
                <div className={h.formnhap}>
                  <div className={h.bentrong}>
                    <div>Mô tả bài học</div>
                    <textarea
                      rows={3}
                      className={h.inputne1}
                      placeholder="Nhập mô tả vào đây"
                    />
                  </div>
                  <div className={h.bentrong}>
                    <div>Câu hỏi</div>
                    <textarea
                      rows={4}
                      className={h.inputne1}
                      placeholder="Nhập câu hỏi vào đây"
                    />
                  </div>
                </div>
                <div className={h.formnhap}>
                  <div className={h.bentrong}>
                    <div>Câu trả lời</div>
                    <textarea
                      rows={4}
                      className={h.inputne1}
                      placeholder="Nhập trả lời vào đây"
                    />
                  </div>
                  <div className={h.bentrong}>
                    <div>Câu trả lời mẫu</div>
                    <textarea
                      rows={4}
                      className={h.inputne1}
                      placeholder="Nhập câu trả lời mẫu vào đây"
                    />
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
                    />
                  </div>
                  <div className={h.bentrong}>
                    <div>Số thứ tự</div>
                    <input
                      className={h.inputne}
                      placeholder="Số thứ tự của bài học"
                    />
                  </div>
                </div>
                <div className={h.formnhap}>
                  <div className={h.bentrong}>
                    <div>Mô tả bài học</div>
                    <textarea
                      rows={3}
                      className={h.inputne1}
                      placeholder="Nhập mô tả vào đây"
                    />
                  </div>
                  <div className={h.bentrong}>
                    <div>Câu hỏi</div>
                    <textarea
                      rows={4}
                      className={h.inputne1}
                      placeholder="Nhập câu hỏi vào đây"
                    />
                  </div>
                </div>
                <div className={h.formnhap}>
                  <div className={h.bentrong}>
                    <div>Câu trả lời</div>
                    <textarea
                      rows={4}
                      className={h.inputne1}
                      placeholder="Nhập trả lời vào đây"
                    />
                  </div>
                </div>
              </>
            )}
            <div className={h.chonutragiua}>
              <Button className={h.btnthemvao}>Xóa</Button>
              <Button className={h.btnthemvao1}>Lưu</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonEdit;
