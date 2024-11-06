"use client";

import styles from '@public/styles/post/post.module.css';
import Body from '../component/globalControl/body';
import HeroPost from '../component/globalControl/HeroPost';
import CardPosts from '../component/globalControl/CardPost';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const listItems = [
    {
        type: "card",
        title: "Card 1",
        image: "images/image1.jpg",
        date: "2024-11-05",
        content: "This is the content for Card 1",
        author: "Author 1"
    },
    {
        type: "card",
        title: "Card 2",
        image: "images/image2.jpg",
        date: "2024-11-06",
        content: "This is the content for Card 2",
        author: "Author 2"
    },
    {
        type: "card",
        title: "Card 3",
        image: "images/image3.jpg",
        date: "2024-11-07",
        content: "This is the content for Card 3",
        author: "Author 3"
    },
    {
        type: "card",
        title: "Card 3",
        image: "images/image3.jpg",
        date: "2024-11-07",
        content: "This is the content for Card 3",
        author: "Author 3"
    }
];


const Post: React.FC = () => {
    return (
        <Body>
            <HeroPost />
            {listItems.map((item, index) => (
                <CardPosts
                    type='Horizontal'
                    title={item.title}
                    image={item.image}
                    date={item.date}
                    content={item.content}
                    author={item.author}
                />
            ))}

        </Body>
    );
}

export default Post;
