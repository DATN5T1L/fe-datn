'use client'

import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import styles from '@public/styles/calender/SlideRightCalender.module.css';
import '@public/styles/calender/calender.css';
import { Card, Col, Container, Nav, Row } from 'react-bootstrap';
import RightContainer from '../rightContainer';
import BoxSlideRightBar from './boxSlideRightBar';
import { CalendarProps } from 'react-calendar';
import { startOfMonth, format } from 'date-fns';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];
interface RightCalendarProps {
    selectedDate: Date;
    onDateChange: (date: Date) => void;
}

const SlideRightBar: React.FC<RightCalendarProps> = ({ selectedDate, onDateChange }) => {
    const [mounted, setMounted] = useState(false);
    const [value, setValue] = useState<Value>(new Date());

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    const handleDateChange: CalendarProps['onChange'] = (value, event) => {
        if (value instanceof Date) {
            onDateChange(value);
        }
    };

    const formatMonthYear = (locale: string | undefined, date: Date): string => {
        const month = new Intl.DateTimeFormat('vi-VN', { month: 'long' }).format(date);
        const year = date.getFullYear();
        return `${month.charAt(0).toUpperCase() + month.slice(1)}, ${year}`;
    };
    const formatShortWeekday = (locale: string | undefined, date: Date): string => {
        return new Intl.DateTimeFormat('vi-VN', { weekday: 'short' }).format(date);
    };
    return (
        <>
            <RightContainer height={'946px'}>
                <Container className='container-calender'>
                    <Calendar
                        value={selectedDate}
                        onChange={handleDateChange}
                        locale='en'
                        prevLabel={<img src="/img/ArrowLeft2.svg" alt="" className={styles.iconCalender} />}
                        nextLabel={<img src="/img/ArrowRight2.svg" alt="" className={styles.iconCalender} />}
                        formatMonthYear={formatMonthYear}
                        formatShortWeekday={formatShortWeekday}
                    />
                    <Row md={12} className={styles.sliderBarRight}>
                        <Col md={12} className={styles.sliderBarRight__container}>
                            <Card className={styles.sliderBarRight__header}>
                                <Card.Title className={styles.sliderBarRight__header__title}>Lịch học hôm nay</Card.Title>
                                <Nav.Link href='/' className={styles.sliderBarRight__header__link}>
                                    Xem tất cả
                                </Nav.Link>
                            </Card>
                            <Card className={styles.sliderBarRight__nav}>
                                <Card.Subtitle className={styles.sliderBarRight__nav__subTitle}>
                                    Tuần thứ 2
                                </Card.Subtitle>
                            </Card>
                            <article className={styles.sliderBarRight__body}>
                                <BoxSlideRightBar
                                    title={'Thiết kế giao diện cơ bản'}
                                    time={'9-11 AM'}
                                    task={'1 Nhiệm vụ'}
                                    color={'primary'}
                                ></BoxSlideRightBar>
                                <BoxSlideRightBar
                                    title={'Thiết kế giao diện cơ bản'}
                                    time={'9-11 AM'}
                                    task={'1 Nhiệm vụ'}
                                    color={'secondery'}
                                ></BoxSlideRightBar>
                                <BoxSlideRightBar
                                    title={'Thiết kế giao diện cơ bản'}
                                    time={'9-11 AM'}
                                    task={'1 Nhiệm vụ'}
                                    color={'warning'}
                                ></BoxSlideRightBar>
                            </article>
                        </Col>
                    </Row>
                </Container>
            </RightContainer>
        </>
    )
}

export default SlideRightBar