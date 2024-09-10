'use client';

import { useState } from 'react';
import BodyContainer from '../component/bodyContainer';
import MainCalender from '../component/calender/mainCalender';
import SlideRightBar from '../component/calender/slideRightBar';
import LeftSlideBar from '../component/leftSlideBar';
import MainContainer from '../component/mainContainer';





const CalendarComponent: React.FC = () => {

    const [selectedDate, setSelectedDate] = useState<Date>(new Date());

    const handleDateChange = (date: Date) => {
        setSelectedDate(date);
    };

    return (
        <BodyContainer gap={'20px'}>
            <LeftSlideBar></LeftSlideBar>
            <MainCalender selectedDate={selectedDate} onDateChange={handleDateChange} ></MainCalender>
            <SlideRightBar
                selectedDate={selectedDate}
                onDateChange={handleDateChange}
            ></SlideRightBar>
        </BodyContainer>
    );
};

export default CalendarComponent;
