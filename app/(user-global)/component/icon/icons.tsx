const Arrow = ({ deg }: { deg: string }) => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            style={{ transform: `rotate(${deg}deg)` }}>
            <path d="M9 18L15 12L9 6" stroke="" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
    )
}

const IconWhat = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 50 50" fill="none">
            <circle cx="25.0003" cy="25" r="20.8333" stroke="#237DF7" stroke-width="1.5" />
            <path d="M21.0938 18.4896C21.0938 16.3322 22.8426 14.5833 25 14.5833C27.1574 14.5833 28.9062 16.3322 28.9062 18.4896C28.9062 19.9218 28.1355 21.1739 26.9862 21.8539C25.9959 22.4398 25 23.3286 25 24.4792V27.0833" stroke="#237DF7" stroke-width="1.5" stroke-linecap="round" />
            <circle cx="25.0003" cy="33.3333" r="2.08333" fill="#237DF7" />
        </svg>
    )
}


export { Arrow, IconWhat }