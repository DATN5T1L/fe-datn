
import useSWR from "swr";
import style from "@/app/admin/component/Dashboard/Chart.module.css";
import { Image } from "react-bootstrap";

const MaketingAccount = () => {

    return (

        <div className={style.mar}>
            <section className={style.container}>
                <div className={style.tag_notice}>
                    <div className={style.card_notice}>
                        <span>
                            <p className={style.titleNotice}>Tổng bài viết</p>
                            <h3 className={style.totalNotice}>100</h3>
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
                            <p className={style.titleNotice}>Tổng danh mục</p>
                            <h3 className={style.totalNotice}>200</h3>
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
                            <p className={style.titleNotice}>Tổng bình luận</p>
                            <h3 className={style.totalNotice}>3000</h3>
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
                            <p className={style.titleNotice}>Tổng lượt xem</p>
                            <h3 className={style.totalNotice}>230,000</h3>
                        </span>

                    </div>
                </div>

            </section>

        </div>
    )
}
export default MaketingAccount;