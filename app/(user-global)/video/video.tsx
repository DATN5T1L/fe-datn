"use client"
import React, { useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player/youtube';

const YouTubePlayer = () => {
    const [lastValidTime, setLastValidTime] = useState(0); // Thời gian hợp lệ cuối cùng
    const playerRef = useRef<any>(null); // Tham chiếu tới video player

    const handleProgress = (progress: { playedSeconds: number }) => {
        const { playedSeconds } = progress;
        console.log(playedSeconds);

        // Nếu người dùng cố gắng tua quá 15 giây từ lastValidTime
        if (Math.abs(playedSeconds - lastValidTime) > 15) {
            console.log(lastValidTime, "giay tua");
            // Khôi phục lại vị trí
            playerRef.current.seekTo(lastValidTime); // Quay về thời gian hợp lệ trước đó
        } else {
            // Cập nhật thời gian hợp lệ cuối cùng
            setLastValidTime(playedSeconds);
        }
    };

    return (
        <div style={{ maxWidth: '560px', margin: 'auto' }}>

        </div>
    );
};

export default YouTubePlayer;
