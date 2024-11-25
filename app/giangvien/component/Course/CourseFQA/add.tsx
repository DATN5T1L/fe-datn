"use client";
import { Button } from "react-bootstrap";
import h from "./CourseFQAEdit.module.css";
const CourseFQAEAdd: React.FC = () => {
    return (
        <div>
            <div className={h.header_add}>Thêm FQA khóa học</div>
            <div className={h.body_add}>
                <div className={h.wapper}>
                    <div className={h.formnhap}>
                        <div className={h.bentrong}>
                            <div>Câu hỏi FAQ</div>
                            <input className={h.inputne} placeholder="Nhập tiêu đề chapter" />
                        </div>
                        <div className={h.bentrong}>
                            <div>Câu trả lời FAQ</div>
                            <input className={h.inputne} placeholder="Nhập tiêu đề chapter" />
                        </div>
                    </div>
                    <div className={h.formnhap}>
                        <div className={`${h.bentrong} ${h.left}`}>
                            <div>Khóa học</div>
                            <div className={h.selectne}>
                                <select className={h.inputne}>
                                    <option value="reactjs">ReactJS</option>
                                    <option value="nodejs">NodeJS</option>
                                    <option value="typescript">TypeScript</option>
                                    <option value="nextjs">Next.js</option>
                                </select>
                                <img src="/img/chevronGray-04.svg" />
                            </div>
                        </div>
                        <div className={`${h.bentrong} ${h.left} ${h.opacity}`}>
                            <div className={h.selectne}>
                                <select className={h.inputne}>
                                </select>
                                <img src="/img/chevronGray-04.svg" />
                            </div>
                        </div>
                    </div>
                    <div className={h.chonutragiua}>
                        <Button className={h.btnthemvao}>Thêm vào</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CourseFQAEAdd;
