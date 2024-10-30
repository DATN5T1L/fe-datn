"use client";
import h from "./UsersDetail.module.css";
import { Card, Col, Container, Row } from "react-bootstrap";
import { Figure, Image } from "react-bootstrap";
const UserDetail = () => {
  return (
    <div>
      <div className={h.header_title}>Chi tiết người dùng</div>
      <div className={h.header_body}>
        <div className={h.card_notice}>
          <span>
            <p>Đã học</p>
            <h3>500</h3>
          </span>
          <Image
            src={"/img_admin/boxvippro.png"}
            alt="icon"
            width={60}
            height={60}
          />
        </div>
        <div className={h.card_notice}>
          <span>
            <p>Đã hoàn thành</p>
            <h3>499</h3>
          </span>
          <Image
            src={"/img_admin/monneyvip.svg"}
            alt="icon"
            width={60}
            height={60}
          />
        </div>
        <div className={h.card_notice}>
          <span>
            <p>Tổng tiền học</p>
            <h3>6,000k</h3>
          </span>
          <Image
            src={"/img_admin/comment.svg"}
            alt="icon"
            width={60}
            height={60}
          />
        </div>
        <div className={h.card_notice}>
          <span>
            <p>Đánh giá khóa học</p>
            <h3>3</h3>
          </span>
          <Image
            src={"/img_admin/total_view.svg"}
            alt="icon"
            width={60}
            height={60}
          />
        </div>
      </div>
      <div className={h.body_user}>
        <div className={h.body_avatar}>
          <Figure>
            <Figure.Image
              width={110}
              height={110}
              alt="Avatar"
              src="/img_admin/avatarvip.png"
              roundedCircle
              className="mt-4"
            />
            <Figure.Caption className={h.name_title}>Minh Tâm</Figure.Caption>
            <Figure.Caption>Học viên</Figure.Caption>
            <Figure.Caption>Name123@gmail.com</Figure.Caption>
          </Figure>
        </div>
        <div className={h.body_study}>
          <Row md={12} className={h.main__course}>
            <Col md={4} className={h.mainBox}>
              <Card className={h.mainBox__content}>
                <Card.Header className={h.headerContent}>
                  <section className={h.headerContent__text}>
                    <Card.Title className={h.text__hedding2}>
                      WEBSITE DESIGN UI/UX
                    </Card.Title>
                    <Card.Subtitle className={h.text__hedding3}>
                      by My Team
                    </Card.Subtitle>
                    <Card.Img
                      src="/img/iconReact.svg"
                      alt=""
                      className={h.text__img}
                    />
                  </section>
                  <Card.Img
                    src="/img/tuan.png"
                    alt=""
                    className={h.headerContent__avt}
                  />
                </Card.Header>
                <Card.Body className={h.mainContent}>
                  <section className={h.bodyContent}>
                    <div className={h.bodyContent__element}>
                      <Image
                        src="/img/bookoffgreen.svg"
                        alt=""
                        className={h.element__img}
                      />
                      <Card.Text className={h.element__text}>
                        10 Chương
                      </Card.Text>
                    </div>
                    <div className={h.bodyContent__element}>
                      <Image
                        src="/img/bookopenblue.svg"
                        alt=""
                        className={h.element__img}
                      />
                      <Card.Text className={h.element__text}>
                        10 Bài tập
                      </Card.Text>
                    </div>
                    <div className={h.bodyContent__element}>
                      <Image
                        src="/img/bookopenyellow.svg"
                        alt=""
                        className={h.element__img}
                      />
                      <Card.Text className={h.element__text}>
                        10 Đã học
                      </Card.Text>
                    </div>
                  </section>
                  <section className={h.mainContent__headContent}>
                    <div className={h.headContent__evaluete}>
                      <div className={h.evaluete__main}>
                        <div className={h.starGroup}>
                          <Image
                            src="/img/iconStar.svg"
                            alt=""
                            className={h.starElement}
                          />
                          <Image
                            src="/img/iconStar.svg"
                            alt=""
                            className={h.starElement}
                          />
                          <Image
                            src="/img/iconStar.svg"
                            alt=""
                            className={h.starElement}
                          />
                          <Image
                            src="/img/iconStar.svg"
                            alt=""
                            className={h.starElement}
                          />
                          <Image
                            src="/img/iconStar.svg"
                            alt=""
                            className={h.starElement}
                          />
                        </div>

                        <Card.Text className={h.starNumber}>
                          {"("} 4,5 {")"}
                        </Card.Text>
                      </div>
                    </div>
                    <div className={h.headContent__percent}>
                      <Card.Text className={h.evaluete__note}>
                        {"("} 504 phản hồi {")"}
                      </Card.Text>
                    </div>
                  </section>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className={h.mainBox}>
              <Card className={h.mainBox__content}>
                <Card.Header className={h.headerContent}>
                  <section className={h.headerContent__text}>
                    <Card.Title className={h.text__hedding2}>
                      WEBSITE DESIGN UI/UX
                    </Card.Title>
                    <Card.Subtitle className={h.text__hedding3}>
                      by My Team
                    </Card.Subtitle>
                    <Card.Img
                      src="/img/iconReact.svg"
                      alt=""
                      className={h.text__img}
                    />
                  </section>
                  <Card.Img
                    src="/img/tuan.png"
                    alt=""
                    className={h.headerContent__avt}
                  />
                </Card.Header>
                <Card.Body className={h.mainContent}>
                  <section className={h.bodyContent}>
                    <div className={h.bodyContent__element}>
                      <Image
                        src="/img/bookoffgreen.svg"
                        alt=""
                        className={h.element__img}
                      />
                      <Card.Text className={h.element__text}>
                        10 Chương
                      </Card.Text>
                    </div>
                    <div className={h.bodyContent__element}>
                      <Image
                        src="/img/bookopenblue.svg"
                        alt=""
                        className={h.element__img}
                      />
                      <Card.Text className={h.element__text}>
                        10 Bài tập
                      </Card.Text>
                    </div>
                    <div className={h.bodyContent__element}>
                      <Image
                        src="/img/bookopenyellow.svg"
                        alt=""
                        className={h.element__img}
                      />
                      <Card.Text className={h.element__text}>
                        10 Đã học
                      </Card.Text>
                    </div>
                  </section>
                  <section className={h.mainContent__headContent}>
                    <div className={h.headContent__evaluete}>
                      <div className={h.evaluete__main}>
                        <div className={h.starGroup}>
                          <Image
                            src="/img/iconStar.svg"
                            alt=""
                            className={h.starElement}
                          />
                          <Image
                            src="/img/iconStar.svg"
                            alt=""
                            className={h.starElement}
                          />
                          <Image
                            src="/img/iconStar.svg"
                            alt=""
                            className={h.starElement}
                          />
                          <Image
                            src="/img/iconStar.svg"
                            alt=""
                            className={h.starElement}
                          />
                          <Image
                            src="/img/iconStar.svg"
                            alt=""
                            className={h.starElement}
                          />
                        </div>

                        <Card.Text className={h.starNumber}>
                          {"("} 4,5 {")"}
                        </Card.Text>
                      </div>
                    </div>
                    <div className={h.headContent__percent}>
                      <Card.Text className={h.evaluete__note}>
                        {"("} 504 phản hồi {")"}
                      </Card.Text>
                    </div>
                  </section>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className={h.mainBox}>
              <Card className={h.mainBox__content}>
                <Card.Header className={h.headerContent}>
                  <section className={h.headerContent__text}>
                    <Card.Title className={h.text__hedding2}>
                      WEBSITE DESIGN UI/UX
                    </Card.Title>
                    <Card.Subtitle className={h.text__hedding3}>
                      by My Team
                    </Card.Subtitle>
                    <Card.Img
                      src="/img/iconReact.svg"
                      alt=""
                      className={h.text__img}
                    />
                  </section>
                  <Card.Img
                    src="/img/tuan.png"
                    alt=""
                    className={h.headerContent__avt}
                  />
                </Card.Header>
                <Card.Body className={h.mainContent}>
                  <section className={h.bodyContent}>
                    <div className={h.bodyContent__element}>
                      <Image
                        src="/img/bookoffgreen.svg"
                        alt=""
                        className={h.element__img}
                      />
                      <Card.Text className={h.element__text}>
                        10 Chương
                      </Card.Text>
                    </div>
                    <div className={h.bodyContent__element}>
                      <Image
                        src="/img/bookopenblue.svg"
                        alt=""
                        className={h.element__img}
                      />
                      <Card.Text className={h.element__text}>
                        10 Bài tập
                      </Card.Text>
                    </div>
                    <div className={h.bodyContent__element}>
                      <Image
                        src="/img/bookopenyellow.svg"
                        alt=""
                        className={h.element__img}
                      />
                      <Card.Text className={h.element__text}>
                        10 Đã học
                      </Card.Text>
                    </div>
                  </section>
                  <section className={h.mainContent__headContent}>
                    <div className={h.headContent__evaluete}>
                      <div className={h.evaluete__main}>
                        <div className={h.starGroup}>
                          <Image
                            src="/img/iconStar.svg"
                            alt=""
                            className={h.starElement}
                          />
                          <Image
                            src="/img/iconStar.svg"
                            alt=""
                            className={h.starElement}
                          />
                          <Image
                            src="/img/iconStar.svg"
                            alt=""
                            className={h.starElement}
                          />
                          <Image
                            src="/img/iconStar.svg"
                            alt=""
                            className={h.starElement}
                          />
                          <Image
                            src="/img/iconStar.svg"
                            alt=""
                            className={h.starElement}
                          />
                        </div>

                        <Card.Text className={h.starNumber}>
                          {"("} 4,5 {")"}
                        </Card.Text>
                      </div>
                    </div>
                    <div className={h.headContent__percent}>
                      <Card.Text className={h.evaluete__note}>
                        {"("} 504 phản hồi {")"}
                      </Card.Text>
                    </div>
                  </section>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className={h.mainBox}>
              <Card className={h.mainBox__content}>
                <Card.Header className={h.headerContent}>
                  <section className={h.headerContent__text}>
                    <Card.Title className={h.text__hedding2}>
                      WEBSITE DESIGN UI/UX
                    </Card.Title>
                    <Card.Subtitle className={h.text__hedding3}>
                      by My Team
                    </Card.Subtitle>
                    <Card.Img
                      src="/img/iconReact.svg"
                      alt=""
                      className={h.text__img}
                    />
                  </section>
                  <Card.Img
                    src="/img/tuan.png"
                    alt=""
                    className={h.headerContent__avt}
                  />
                </Card.Header>
                <Card.Body className={h.mainContent}>
                  <section className={h.bodyContent}>
                    <div className={h.bodyContent__element}>
                      <Image
                        src="/img/bookoffgreen.svg"
                        alt=""
                        className={h.element__img}
                      />
                      <Card.Text className={h.element__text}>
                        10 Chương
                      </Card.Text>
                    </div>
                    <div className={h.bodyContent__element}>
                      <Image
                        src="/img/bookopenblue.svg"
                        alt=""
                        className={h.element__img}
                      />
                      <Card.Text className={h.element__text}>
                        10 Bài tập
                      </Card.Text>
                    </div>
                    <div className={h.bodyContent__element}>
                      <Image
                        src="/img/bookopenyellow.svg"
                        alt=""
                        className={h.element__img}
                      />
                      <Card.Text className={h.element__text}>
                        10 Đã học
                      </Card.Text>
                    </div>
                  </section>
                  <section className={h.mainContent__headContent}>
                    <div className={h.headContent__evaluete}>
                      <div className={h.evaluete__main}>
                        <div className={h.starGroup}>
                          <Image
                            src="/img/iconStar.svg"
                            alt=""
                            className={h.starElement}
                          />
                          <Image
                            src="/img/iconStar.svg"
                            alt=""
                            className={h.starElement}
                          />
                          <Image
                            src="/img/iconStar.svg"
                            alt=""
                            className={h.starElement}
                          />
                          <Image
                            src="/img/iconStar.svg"
                            alt=""
                            className={h.starElement}
                          />
                          <Image
                            src="/img/iconStar.svg"
                            alt=""
                            className={h.starElement}
                          />
                        </div>

                        <Card.Text className={h.starNumber}>
                          {"("} 4,5 {")"}
                        </Card.Text>
                      </div>
                    </div>
                    <div className={h.headContent__percent}>
                      <Card.Text className={h.evaluete__note}>
                        {"("} 504 phản hồi {")"}
                      </Card.Text>
                    </div>
                  </section>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className={h.mainBox}>
              <Card className={h.mainBox__content}>
                <Card.Header className={h.headerContent}>
                  <section className={h.headerContent__text}>
                    <Card.Title className={h.text__hedding2}>
                      WEBSITE DESIGN UI/UX
                    </Card.Title>
                    <Card.Subtitle className={h.text__hedding3}>
                      by My Team
                    </Card.Subtitle>
                    <Card.Img
                      src="/img/iconReact.svg"
                      alt=""
                      className={h.text__img}
                    />
                  </section>
                  <Card.Img
                    src="/img/tuan.png"
                    alt=""
                    className={h.headerContent__avt}
                  />
                </Card.Header>
                <Card.Body className={h.mainContent}>
                  <section className={h.bodyContent}>
                    <div className={h.bodyContent__element}>
                      <Image
                        src="/img/bookoffgreen.svg"
                        alt=""
                        className={h.element__img}
                      />
                      <Card.Text className={h.element__text}>
                        10 Chương
                      </Card.Text>
                    </div>
                    <div className={h.bodyContent__element}>
                      <Image
                        src="/img/bookopenblue.svg"
                        alt=""
                        className={h.element__img}
                      />
                      <Card.Text className={h.element__text}>
                        10 Bài tập
                      </Card.Text>
                    </div>
                    <div className={h.bodyContent__element}>
                      <Image
                        src="/img/bookopenyellow.svg"
                        alt=""
                        className={h.element__img}
                      />
                      <Card.Text className={h.element__text}>
                        10 Đã học
                      </Card.Text>
                    </div>
                  </section>
                  <section className={h.mainContent__headContent}>
                    <div className={h.headContent__evaluete}>
                      <div className={h.evaluete__main}>
                        <div className={h.starGroup}>
                          <Image
                            src="/img/iconStar.svg"
                            alt=""
                            className={h.starElement}
                          />
                          <Image
                            src="/img/iconStar.svg"
                            alt=""
                            className={h.starElement}
                          />
                          <Image
                            src="/img/iconStar.svg"
                            alt=""
                            className={h.starElement}
                          />
                          <Image
                            src="/img/iconStar.svg"
                            alt=""
                            className={h.starElement}
                          />
                          <Image
                            src="/img/iconStar.svg"
                            alt=""
                            className={h.starElement}
                          />
                        </div>

                        <Card.Text className={h.starNumber}>
                          {"("} 4,5 {")"}
                        </Card.Text>
                      </div>
                    </div>
                    <div className={h.headContent__percent}>
                      <Card.Text className={h.evaluete__note}>
                        {"("} 504 phản hồi {")"}
                      </Card.Text>
                    </div>
                  </section>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} className={h.mainBox}>
              <Card className={h.mainBox__content}>
                <Card.Header className={h.headerContent}>
                  <section className={h.headerContent__text}>
                    <Card.Title className={h.text__hedding2}>
                      WEBSITE DESIGN UI/UX
                    </Card.Title>
                    <Card.Subtitle className={h.text__hedding3}>
                      by My Team
                    </Card.Subtitle>
                    <Card.Img
                      src="/img/iconReact.svg"
                      alt=""
                      className={h.text__img}
                    />
                  </section>
                  <Card.Img
                    src="/img/tuan.png"
                    alt=""
                    className={h.headerContent__avt}
                  />
                </Card.Header>
                <Card.Body className={h.mainContent}>
                  <section className={h.bodyContent}>
                    <div className={h.bodyContent__element}>
                      <Image
                        src="/img/bookoffgreen.svg"
                        alt=""
                        className={h.element__img}
                      />
                      <Card.Text className={h.element__text}>
                        10 Chương
                      </Card.Text>
                    </div>
                    <div className={h.bodyContent__element}>
                      <Image
                        src="/img/bookopenblue.svg"
                        alt=""
                        className={h.element__img}
                      />
                      <Card.Text className={h.element__text}>
                        10 Bài tập
                      </Card.Text>
                    </div>
                    <div className={h.bodyContent__element}>
                      <Image
                        src="/img/bookopenyellow.svg"
                        alt=""
                        className={h.element__img}
                      />
                      <Card.Text className={h.element__text}>
                        10 Đã học
                      </Card.Text>
                    </div>
                  </section>
                  <section className={h.mainContent__headContent}>
                    <div className={h.headContent__evaluete}>
                      <div className={h.evaluete__main}>
                        <div className={h.starGroup}>
                          <Image
                            src="/img/iconStar.svg"
                            alt=""
                            className={h.starElement}
                          />
                          <Image
                            src="/img/iconStar.svg"
                            alt=""
                            className={h.starElement}
                          />
                          <Image
                            src="/img/iconStar.svg"
                            alt=""
                            className={h.starElement}
                          />
                          <Image
                            src="/img/iconStar.svg"
                            alt=""
                            className={h.starElement}
                          />
                          <Image
                            src="/img/iconStar.svg"
                            alt=""
                            className={h.starElement}
                          />
                        </div>

                        <Card.Text className={h.starNumber}>
                          {"("} 4,5 {")"}
                        </Card.Text>
                      </div>
                    </div>
                    <div className={h.headContent__percent}>
                      <Card.Text className={h.evaluete__note}>
                        {"("} 504 phản hồi {")"}
                      </Card.Text>
                    </div>
                  </section>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};
export default UserDetail;
