"use client";

import Body from "../component/globalControl/body";
import HeroPost from "../component/globalControl/HeroPost";
import TwoColumnLayout from "../component/globalControl/twoColumnPosts";
import SplitOrientationLayout from "../component/globalControl/splitPosts";
import LeftRightLayout from "../component/globalControl/leftRightPosts";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const listItems = [
  {
    type: "card",
    title: "Tầm quan trọng của bảo mật",
    image:
      "https://images.unsplash.com/photo-1719937051058-63705ed35502?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
    date: "2024-11-05",
    content:
      "Trong thời đại số hóa, bảo mật phần mềm trở thành một yếu tố không thể thiếu. Việc tích hợp các quy trình bảo mật ngay từ giai đoạn thiết kế và phát triển giúp giảm thiểu nguy cơ bị tấn công, bảo vệ dữ liệu người dùng và nâng cao uy tín doanh nghiệp.",
    author: "Tuấn Huỳnh",
  },

];

const Post: React.FC = () => {
  return (
    <>
      <Body>
        <HeroPost />
        {listItems.map((item, index) => (
          <div className="d-flex flex-column gap-5">
            <TwoColumnLayout
              type={"Horizontal"}
              direction={"Left"}
              title={item.title}
              image={item.image}
              date={item.date}
              content={item.content}
              author={item.author}
            />
            <SplitOrientationLayout
              type={"Horizontal"}
              direction={"Left"}
              title={item.title}
              image={item.image}
              date={item.date}
              content={item.content}
              author={item.author}
            />
            <LeftRightLayout
              type={"Horizontal"}
              direction={"Left"}
              title={item.title}
              image={item.image}
              date={item.date}
              content={item.content}
              author={item.author}
            />
            <TwoColumnLayout
              type={"Horizontal"}
              direction={"Left"}
              title={item.title}
              image={item.image}
              date={item.date}
              content={item.content}
              author={item.author}
            />
          </div>
        ))}
      </Body>
    </>
  );
};

export default Post;
