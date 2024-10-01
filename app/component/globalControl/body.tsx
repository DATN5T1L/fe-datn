import { Container } from "react-bootstrap";
import '@app/global.css';

interface BodyProps {
  children?: React.ReactNode; 
}

const Body: React.FC<BodyProps> = ({ children }) => {
  return (
    <>
      <Container className='body-container'>
        {children}
      </Container>
    </>
  );
};

export default Body;