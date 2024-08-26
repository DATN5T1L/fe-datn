import Image from "next/image";
import styles from "./page.module.css";
import VideoPlayer from "./component/video";
import RightSlideBar from "./component/rightSlideBar";
import MainHome from "./component/mainHome";
import LeftSlideBar from "./component/leftSlideBar";
import Banner from "./component/banner";
import Statistical from "./component/statistical";
import Member from "./component/member";
import MyCourse from "./component/myCourse";
import CoursesToTake from "./component/coursesToTake";
import News from "./component/news";
import ProductStudent from "./component/productStudent";

export default function Home() {
  return (
    <>
      <main className='main-container'>
        <LeftSlideBar></LeftSlideBar>
        <MainHome>
          <Banner />
          <Statistical />
          <Member/>
          <MyCourse/>
          <CoursesToTake/>
          <News/>
          <ProductStudent/>
        </MainHome>
        <RightSlideBar></RightSlideBar>
      </main>

    </>
  );
}
