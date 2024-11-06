import styles from "@public/styles/post/CartPost.module.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

interface CardPosts {
  type?: "Horizontal" | "Vertical";
  direction?: "Left" | "Right";
  title: string;
  image: string;
  date?: string;
  content: string;
  author?: string;
}
const HeroColumnPost: React.FC<CardPosts> = ({
  type,
  direction,
  title,
  image,
  date,
  content,
  author,
}) => {
  return (
    <Container className={`${styles.heroArticleContainer} position-relative`}>
      <img src={image} height={480} width={632} />
      <Row className={`${styles.titleArticle} d-flex flex-column`}>
        <h2 className="text-white fw-bold h2">{title}</h2>
        <p className="text-white">{content}</p>
      </Row>
    </Container>
  );
};

export default HeroColumnPost;
