'use client'

import React, { useState, useEffect } from 'react';
import 'react-calendar/dist/Calendar.css';
import styles from '@public/styles/calender/SlideRightCalender.module.css';
import '@public/styles/calender/calender.css';
import { Card } from 'react-bootstrap';

interface BoxSlideRightBarProps {
    title?: string;
    time?: string;
    task?: string;
    color?: 'primary' | 'secondery' | 'warning'
}

const BoxSlideRightBar: React.FC<BoxSlideRightBarProps> = ({ title = '', time = '', task = '', color = 'primary'}) => {
    
    const getBackGroundColor = () => {
        if(color === 'primary'){
            return styles.primary__Bg__Border;
        }
        if(color === 'secondery'){
            return styles.secondery__Bg__Border;
        }
        if(color === 'warning'){
            return styles.warning__Bg__Border;
        }
    }

    const getBgImg = () =>{
        if(color === 'primary'){
            return styles.primaryBgImg;
        }
        if(color === 'secondery'){
            return styles.seconderyBgImg;
        }
        if(color === 'warning'){
            return styles.warningBgImg;
        }
    }

    const getTitle = () =>{
        if(color === 'primary'){
            return styles.primaryTitle;
        }
        if(color === 'secondery'){
            return styles.seconderyTitle;
        }
        if(color === 'warning'){
            return styles.warningTitle;
        }
    }
    
    return (
        <>
            <Card className={`${styles.box} ${getBackGroundColor()}`}>
                <div className={`${styles.box__img} ${getBgImg()}`}>
                    <Card.Img src='/img/Vector.svg' className={styles.box__img__element} />
                </div>
                <Card.Body className={styles.box__body}>
                    <Card.Title className={`${styles.box__body__title} ${getTitle()}`}>
                        {title}
                    </Card.Title>
                    <section className={styles.box__body__section}>
                        <Card.Subtitle className={styles.body__section__subTitle}>{time}</Card.Subtitle>
                        <Card.Subtitle className={styles.body__section__subTitle}>{task}</Card.Subtitle>
                    </section>
                </Card.Body>
            </Card>
        </>
    )
}

export default BoxSlideRightBar;