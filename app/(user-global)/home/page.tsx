'use client'

import Body from "../component/globalControl/body"
import About from "../component/home/about"
import CourseFree from "../component/home/courseFree"
import CoursePro from "../component/home/coursePro"
import FeedBack from "../component/globalControl/feedBack"
import LearningPath from "../component/home/learningPath"
import Post from "../component/home/post"
import ProductStudent from "../component/home/productStudent"
import SliderShow from "../component/home/sliderShow"
import Why from "../component/home/why"
import FeedBackToStudent from "../component/home/feedBackToStudent"

const Home: React.FC = () => {
    return (
        <>
            <title>TTO - Khám phá, học hỏi, vươn xa</title>
            <meta name="description" content="Được tạo bởi Taem TTO" />
            <Body>
                <SliderShow />
                <LearningPath></LearningPath>
                <CoursePro></CoursePro>
                <CourseFree></CourseFree>
                <Why></Why>
                <About></About>
                <ProductStudent></ProductStudent>
                <FeedBackToStudent></FeedBackToStudent>
                <Post></Post>
                <FeedBack></FeedBack>
            </Body>
        </>
    )
}

export default Home