'use client'

import Body from "../component/globalControl/body"
import About from "../component/home/about"
import CourseFree from "../component/home/courseFree"
import CoursePro from "../component/home/coursePro"
import FeedBack from "../component/globalControl/feedBack"
import LearningPath from "../component/home/learningPath"
import LeftSlider from "../component/globalControl/leftSlider"
import Post from "../component/home/post"
import ProductStudent from "../component/home/productStudent"
import SliderShow from "../component/home/sliderShow"
import Why from "../component/home/why"

const Home: React.FC = () => {
    return (
        <>
            <title>TTO - Khám phá, học hỏi, vươn xa</title>
            <meta name="description" content="Được tạo bởi Taem TTO" />
            <Body>
                <LeftSlider></LeftSlider>
                <SliderShow />
                <LearningPath></LearningPath>
                <CoursePro></CoursePro>
                <CourseFree></CourseFree>
                <Why></Why>
                <Post></Post>
                <About></About>
                <ProductStudent></ProductStudent>
                <FeedBack></FeedBack>
            </Body>
        </>
    )
}

export default Home