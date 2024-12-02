const Doctype = ({ type }: { type: string }) => {
    return (
        type === "video" ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <g clipPath="url(#clip0_4106_3787)">
                    <circle cx="9.99935" cy="9.99999" r="8.33333" stroke="#B3B3B3" strokeWidth="1.5" />
                    <path
                        d="M12.8447 9.11752C13.4962 9.50215 13.4962 10.4978 12.8447 10.8825L8.91124 13.2048C8.27809 13.5786 7.5 13.0921 7.5 12.3224L7.5 7.67762C7.5 6.90788 8.27809 6.42133 8.91124 6.79515L12.8447 9.11752Z"
                        stroke="#B3B3B3"
                        strokeWidth="1.5" />
                </g>
                <defs>
                    <clipPath id="clip0_4106_3787">
                        <rect width="20" height="20" fill="white" />
                    </clipPath>
                </defs>
            </svg>
        ) : (
            // Icon tài liệu
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path opacity="0.5" d="M3.33398 18.3335H16.6673" stroke="#B3B3B3" strokeWidth="1.5" stroke-linecap="round" />
                <path d="M12.1919 2.43436L11.574 3.05228L5.8932 8.7331C5.50843 9.11788 5.31604 9.31027 5.15058 9.52239C4.95541 9.77263 4.78807 10.0434 4.65155 10.3299C4.53581 10.5727 4.44977 10.8308 4.27769 11.3471L3.54852 13.5346L3.37028 14.0693C3.2856 14.3233 3.35172 14.6034 3.54107 14.7927C3.73042 14.9821 4.0105 15.0482 4.26455 14.9635L4.79926 14.7853L6.98677 14.0561L6.9868 14.0561C7.50301 13.884 7.76112 13.798 8.00397 13.6823C8.29045 13.5457 8.5612 13.3784 8.81143 13.1832C9.02355 13.0178 9.21594 12.8254 9.60071 12.4406L9.60072 12.4406L15.2815 6.75979L15.8995 6.14187C16.9233 5.11807 16.9233 3.45816 15.8995 2.43436C14.8757 1.41055 13.2157 1.41055 12.1919 2.43436Z" stroke="#B3B3B3" strokeWidth="1.5" />
                <path opacity="0.5" d="M11.5724 3.05273C11.5724 3.05273 11.6496 4.36581 12.8082 5.52441C13.9668 6.68301 15.2799 6.76025 15.2799 6.76025M4.79762 14.7858L3.54688 13.535" stroke="#B3B3B3" strokeWidth="1.5" />
            </svg>
        )
    )
}