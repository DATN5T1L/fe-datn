"use client";

import styles from '@public/styles/post/post.module.css';
import Body from '../component/globalControl/body';
import HeroPost from '../component/globalControl/HeroPost';

const fetcher = (url: string) => fetch(url).then(res => res.json());

const Post: React.FC = () => {
    return (
        <Body>
            <HeroPost/>
        </Body>
    );
}

export default Post;
