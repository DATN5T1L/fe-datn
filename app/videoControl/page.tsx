'use client';

import React, { useEffect, useRef, useState } from 'react';
import useSWR from "swr"
import '@public/styles/video/video.css'

interface VideoProps {
    VideoOne: boolean | null;
}

declare global {
    interface Window {
        onYouTubeIframeAPIReady: () => void;
    }
}

declare namespace YT {
    class Player {
        constructor(elementId: string, options: any);
        destroy(): void;
        playVideo(): void;
        getCurrentTime(): number;
    }

    enum PlayerState {
        UNSTARTED = -1,
        ENDED = 0,
        PLAYING = 1,
        PAUSED = 2,
        BUFFERING = 3,
        CUED = 5,
    }
}

const VideoControl: React.FC<VideoProps> = ({ VideoOne = null }) => {
    const fetcher = (...args: [RequestInfo, RequestInit?]) => fetch(...args).then(res => res.json())
    const { data, error, isLoading, mutate} = useSWR(`http://localhost:3003/statusVideo/_id/66f1116214388e0b0541e891`, fetcher)
    const playerRef = useRef<HTMLDivElement>(null);
    const [player, setPlayer] = useState<YT.Player | null>(null);
    const [isPlay, setIsPlay] = useState<boolean>(true);
    const [videoStatus, setVideoStatus] = useState<{ finished: boolean }>({ finished: false });

    const initializePlayer = (startSeconds: number = 0, allowFullScreen: number = 0) => {
        // Khởi tạo YouTube Player khi API đã sẵn sàng
        const ytPlayer = new YT.Player('player', {
            height: '390',
            width: '640',
            videoId: 'x0x_lzDZh0c', // Thay bằng ID video của bạn
            playerVars: {
                controls: 1, // Hiển thị các điều khiển của YouTube (0: ẩn, 1: hiển thị)
                autoplay: 0, // Tự động phát video khi load (0: không tự động, 1: tự động)
                mute: 0, // Tắt âm thanh khi khởi tạo (0: không tắt, 1: tắt âm thanh)
                cc_load_policy: 1, // Hiển thị nút phụ đề (0: không hiện, 1: hiện)
                iv_load_policy: 3, // Hiển thị chú thích video (1: hiện, 3: không hiện)
                modestbranding: 1, // Giảm bớt thương hiệu YouTube (0: không giảm, 1: giảm)
                rel: 0, // Không hiển thị video liên quan sau khi phát xong (0: hiện, 1: không hiện)
                showinfo: 0, // Ẩn thông tin về video (chỉ áp dụng với một số video)
                fs: allowFullScreen, // Cho phép chế độ fullscreen nếu status là true
                playsinline: 1, // Phát video inline thay vì full màn hình trên thiết bị di động (0: full màn hình, 1: inline)
                start: 0, // Bắt đầu phát video tại thời điểm 0 giây
                //end: 120,  Kết thúc phát video tại thời điểm 120 giây
                enablejsapi: 1, // Kích hoạt JavaScript API
                origin: window.location.origin, // Đặt origin để đảm bảo API hoạt động
                hl: 'vi', // Thiết lập ngôn ngữ (ví dụ: 'vi' cho Tiếng Việt)
                disablekb: 1,   // Vô hiệu hóa phím tắt
            },
            events: {
                onReady: (event: any) => {
                    setPlayer(ytPlayer);
                    if (startSeconds > 0) {
                        ytPlayer.playVideo();
                    }
                },
                onStateChange: async (event: any) => {
                    if (event.data === YT.PlayerState.PLAYING) {
                        setIsPlay(false);
                        console.log('Video đã bắt đầu phát');
                    } else if (event.data === YT.PlayerState.ENDED) {
                        setVideoStatus({ finished: true });
                        console.log('Video đã kết thúc');
                        await updateVideoStatus(); // Cập nhật trạng thái video sau khi kết thúc
                    }
                },
            },
        });
    };

    useEffect(() => {
        if (data) {
            // Khởi tạo lại player khi data thay đổi (vd: khi mutate chạy)
            if (!player) {
                const tag = document.createElement('script');
                tag.src = 'https://www.youtube.com/iframe_api';
                const firstScriptTag = document.getElementsByTagName('script')[0];
                if (firstScriptTag && firstScriptTag.parentNode) {
                    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
                }

                window.onYouTubeIframeAPIReady = () => {
                    initializePlayer(0, data.status ? 1 : 0);
                };
            } else {
                const currentTime = player.getCurrentTime();
                player.destroy(); // Hủy player cũ
                initializePlayer(currentTime, data.status ? 1 : 0); // Tạo lại player với giá trị fs mới
            }
        }
    }, [data]);

    useEffect(() => {
        console.log(videoStatus);   
    }, [videoStatus]);

    const updateVideoStatus = async () => {
        try {
            const response = await fetch('http://localhost:3003/statusVideo/_id/66f1116214388e0b0541e891', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ status: true }),
            });

            if (!response.ok) {
                throw new Error('Failed to update video status');
            }

            const updatedData = await response.json();
            console.log('Status updated:', updatedData);

            mutate(); 
        } catch (error) {
            console.error('Error updating video status:', error);
        }
    };


    if (error) return <strong>Có lỗi xảy ra khi tải danh mục</strong>;
    if (isLoading) return <strong>Đang tải dữ liệu ..... </strong>;

    return (
        <>
            <div className='containervieo'>
                <div id="player" ref={playerRef}></div>
                {isPlay && (
                    <>
                        <div className="disabled__start__header"></div>
                        <div className='disabled__start__footer'></div>
                    </>
                )}
                {/* <div className="disable__info"></div>
                <div className="disable__logo"></div> */}
                {/* <div className="disable__time"></div> */}
            </div>
        </>
    );
};

export default VideoControl;
