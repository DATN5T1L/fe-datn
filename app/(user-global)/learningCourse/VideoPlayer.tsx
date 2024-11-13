import ReactPlayer from 'react-player/youtube';
import { useRef, useState, useEffect } from "react";
import styles from '@public/styles/Learning/Video.module.css'

type NotiType = 'success' | 'error' | 'fail' | 'complete';

interface VideoProp {
    urlVideo: string;
    onProgressChange: (playedSeconds: number) => void;
    onPause?: () => void;
}

const VideoPlayer: React.FC<VideoProp> = ({ urlVideo, onProgressChange, onPause }) => {

    const [type, setType] = useState<string | null>(null);
    const lastValidTimeRef = useRef<number>(0);
    const playerRef = useRef<any>(null);
    const [videoDuration, setVideoDuration] = useState<number>(0);
    const [playedSeconds, setPlayedSeconds] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const isWarningShown = useRef(false);
    const [isNoti, setNoti] = useState(false);
    const [isContent, setContent] = useState(true);
    const [typeNoti, setTypeNoti] = useState<NotiType | null>(null);
    const [messageNoti, setmessageNoti] = useState("");

    const handleProgress = (progress: { playedSeconds: number }) => {
        const { playedSeconds } = progress;
        setPlayedSeconds(playedSeconds);
        onProgressChange(playedSeconds);
        if (Math.abs(playedSeconds - lastValidTimeRef.current) > 15) {
            // Quay về thời gian hợp lệ trước đó
            if (playedSeconds < lastValidTimeRef.current) {
                // Người dùng đang tua ngược, chỉ cập nhật lastValidTime
                lastValidTimeRef.current = playedSeconds;
            } else {
                // Quay về thời gian hợp lệ trước đó
                if (playerRef.current) {
                    playerRef.current.seekTo(lastValidTimeRef.current);
                }
            }
        } else {
            // Cập nhật thời gian hợp lệ cuối cùng trong ref
            lastValidTimeRef.current = playedSeconds;
        }
        if (videoDuration - playedSeconds <= 30 && !isWarningShown.current) {

            isWarningShown.current = true; // Đảm bảo chỉ hiện thông báo một lần
        }

    };
    // hàm dừng video
    const pauseVideo = () => {
        setIsPlaying(false);
        if (onPause) pauseVideo();
    };
    const nextVideo = (url: string) => {
        // TODO: Lấy tài liệu tiếp theo
        //...
        // setUrlVideo(url);
    }
    const handleDuration = (duration: number) => {
        setVideoDuration(duration); // Save the video duration
        const minutes = Math.floor(duration / 60); // Calculate minutes
        const seconds = Math.floor(duration % 60); // Calculate remaining seconds
        console.log(`Thời gian kết thúc video: ${minutes} phút ${seconds} giây`);
        isWarningShown.current = false;
    };

    useEffect(() => {

        if (playedSeconds >= videoDuration - 30 && playedSeconds < videoDuration) {

            console.log("Video đã kết thúc");
        }

    }, [playedSeconds, videoDuration])

    const handleEnded = () => { //hàm sử lý khi video kết thúc

        alert("Video đã kết thúc");
        setmessageNoti("Video sắp hết!");
        setTypeNoti('error');
        setNoti(true);
    }
    return (
        <div className={styles.Video}>
            <ReactPlayer
                ref={playerRef}
                url={urlVideo}
                controls
                width="100%"
                height="100%"
                onProgress={handleProgress}
                onDuration={handleDuration}
                playing={isPlaying}
                autoPlay
                onEnded={handleEnded} // Tự động phát
            />
        </div>
    )
}

export default VideoPlayer