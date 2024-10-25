"use client";
import React, { useState } from 'react'
import { HeaderDetailUser } from '../../component/Users/Detail/headerDetail'
import style from '../../layout.module.css'
import { Image } from 'react-bootstrap';
import ViewBarCharts from '../../component/Dashboard/ViewChart'

const DetailUser: React.FC = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  return (
    <div>
      <HeaderDetailUser />

      <section className={style.container}>
        <div className={style.tag_notice}>
          <div className={style.card_notice}>
            <span>
              <p>Tổng bài viết</p>
              <h3>100</h3>
            </span>
            <Image
              src={"/img_admin/total_article.svg"}
              alt="icon"
              width={60}
              height={60}
            />
          </div>
          <div className={style.card_notice}>
            <span>
              <p>Tổng danh mục</p>
              <h3>200</h3>
            </span>
            <Image
              src={"/img_admin/category.svg"}
              alt="icon"
              width={60}
              height={60}
            />
          </div>
          <div className={style.card_notice}>
            <span>
              <p>Tổng bình luận</p>
              <h3>3000</h3>
            </span>
            <Image
              src={"/img_admin/comment.svg"}
              alt="icon"
              width={60}
              height={60}
            />
          </div>
          <div className={style.card_notice}>
            <span>
              <p>Tổng lượt xem</p>
              <h3>230,000</h3>
            </span>
            <Image
              src={"/img_admin/total_view.svg"}
              alt="icon"
              width={60}
              height={60}
              onClick={handleShow}
            />
          </div>
          {/* <Ò show={show} handleClose={handleClose} /> */}
        </div>
        <div className={style.chart}>
          <ViewBarCharts />
        </div>
      </section>
    </div>
  )
}

export default DetailUser