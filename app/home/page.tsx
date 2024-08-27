import Image from "next/image";
import styles from "./page.module.css";
import VideoPlayer from "../component/video";
import RightSlideBar from "../component/home/rightSlideBar";
import MainHome from "../component/home/mainHome";
import LeftSlideBar from "../component/home/leftSlideBar";
import Banner from "../component/home/banner";
import Statistical from "../component/home/statistical";
import Member from "../component/home/member";
import MyCourse from "../component/home/myCourse";
import CoursesToTake from "../component/home/coursesToTake";
import News from "../component/home/news";
import ProductStudent from "../component/home/productStudent";

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
