import Image from "next/image";
import styles from "./page.module.css";
import VideoPlayer from "./component/video";

export default function Home() {
  return (
    <>
      <div>
        <VideoPlayer></VideoPlayer>
      </div>
    </>
  );
}
