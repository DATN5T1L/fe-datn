"use client";

import React, { FC } from "react";
import {
  Button,
  Form,
  InputGroup,
  Table,
  Pagination,
  Container,
} from "react-bootstrap";
import h from "./fqa.module.css";
import Link from "next/link";
import "./fqa.css";

const FQA: React.FC<{}> = () => {
 const totalPages = 10;
 const currentPage = 1;
 const onPageChange = (page: number) => {
   console.log("Chuyển tới trang:", page);
 };

 const renderPaginationItems = () => {
   if (totalPages <= 7) {
     return Array.from({ length: totalPages }, (_, idx) => (
       <Pagination.Item
         key={idx}
         active={currentPage === idx + 1}
         onClick={() => onPageChange(idx + 1)}
       >
         {idx + 1}
       </Pagination.Item>
     ));
   }
   return (
     <>
       {Array.from({ length: 7 }, (_, idx) => (
         <Pagination.Item
           key={idx}
           active={currentPage === idx + 1}
           onClick={() => onPageChange(idx + 1)}
         >
           {idx + 1}
         </Pagination.Item>
       ))}
       <Pagination.Ellipsis disabled />
     </>
   );
 };
 return (
   <div className={`${h.main} d-flex flex-column `}>
     <div
       className={`${h.header} d-flex justify-content-between align-items-center`}
     >
       <h2 className={h.heading}>FQA Khóa học</h2>

       <div className={`${h.actions} d-flex`}>
         <Button className={`${h.btnCTA}`}>Thêm câu hỏi</Button>
       </div>
     </div>
     <div className={`${h.left_right}`}>
       <div className={h.left}>
         Khóa học: <span>Website Design UI/UX</span>
       </div>
       <div className={`${h.right} `}>
         <InputGroup className={h.searchInputGroup}>
           <Form.Control
             type="text"
             placeholder="Tìm kiếm chapter"
             className={h.searchInput}
           />
           <div className={h.searchIconWrapper}>
             <img
               src="/img_admin/search.svg"
               alt="Tự học lập trình JavaScript tại TTO.SH"
               width={"24px"}
               height={"24px"}
             />
           </div>
         </InputGroup>
       </div>
     </div>

     {/* Post List */}
     <div
       className={`${h.bodytable}d-flex overflow-auto w-100`}
       style={{ whiteSpace: "nowrap" }}
     >
       <Table bordered hover className={`${h.table}`}>
         <thead>
           <tr>
             <td>Câu hỏi</td>
             <td>Câu trả lời</td>
             <td>Ngày thêm</td>
             <td>Hành động</td>
           </tr>
         </thead>
         <tbody>
           {Array(5)
             .fill(null)
             .map((_, idx) => (
               <tr key={idx}>
                 <td>Giới thiệu về reactJS</td>
                 <td>Khóa học reactJS</td>
                 <td>01/01/2024</td>

                 <td className={h.option_button_group}>
                   <div
                     className={`w-50 justify-content-between border d-flex py-2 rounded row mx-1`}
                   >
                     <Link
                       href="/#!"
                       className="w-50 border-end justify-content-center align-item-center d-flex col-6"
                     >
                       <img src="/img_admin/eyes.svg" alt="Tự học lập trình JavaScript tại TTO.SH" />
                     </Link>
                     <Link
                       href={`ChapterPage?id=${1}`}
                       as={`ChapterPage/${1}`}
                       className="w-50 border-end justify-content-center align-item-center d-flex col-6"
                     >
                       <img src="/img_admin/action2.svg" alt="Tự học lập trình JavaScript tại TTO.SH" />
                     </Link>
                   </div>
                 </td>
               </tr>
             ))}
         </tbody>
       </Table>
     </div>

     {/* Pagination */}
     <div className="paginationWrapper">
       <Pagination className="pagination">
         <Pagination.Prev
           onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
         >
           <img
             src="/img_admin/prep.svg"
             alt="Lập trình ReactJS"
             width="8"
             height="16"
           />
         </Pagination.Prev>
         {renderPaginationItems()}
         <Pagination.Next
           onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
         >
           <img src="/img_admin/prep2.svg" alt="Lập trình ReactJS" width="8" height="16" />
         </Pagination.Next>
       </Pagination>
     </div>
   </div>
 );
};

export default FQA;
