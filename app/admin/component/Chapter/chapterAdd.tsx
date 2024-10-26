"use client";
import "./chapterAdd.css";
const ChapterAdd = () => {
  return (
    <div>
      <div className="header-add">Thêm chapter</div>
      <div className="body-add">
        <div className="wapper">
          <div className="top-wapper">
            <div>Tên</div>
            <input />
          </div>
          <div className="top-wapper">
            <div>Khóa học </div>
            <input />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChapterAdd;
