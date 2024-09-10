import Image from "next/image";
import styles from "./page.module.css";
import VideoPlayer from "../component/video";
import RightSlideBar from "../component/home/rightSlideBar";
import MainContainer from "../component/mainContainer";
import LeftSlideBar from "../component/leftSlideBar";
import Banner from "../component/home/banner";
import Statistical from "../component/home/statistical";
import Member from "../component/home/member";
import MyCourse from "../component/home/myCourse";
import CoursesToTake from "../component/home/coursesToTake";
import News from "../component/home/news";
import ProductStudent from "../component/home/productStudent";
import BodyContainer from "../component/bodyContainer";

export default function Home() {
  return (
    <>
      <BodyContainer>
        <LeftSlideBar></LeftSlideBar>
        <MainContainer>
          <Banner />
          <Statistical />
          <Member />
          <MyCourse />
          <CoursesToTake />
          <News />
          <ProductStudent />
        </MainContainer>
        <RightSlideBar></RightSlideBar>
      </BodyContainer>

    </>
  );
}
