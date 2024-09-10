'use client';
import { useState, useEffect, useRef, ChangeEvent, useLayoutEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin, { Draggable, DropArg } from '@fullcalendar/interaction';
import timeGridPlugin from '@fullcalendar/timegrid';
import '@public/styles/calender/bigCalender.css';
import { Button, ButtonGroup, Col, Container, Dropdown, Form, Image, Modal, Row } from 'react-bootstrap';
import { addDays, format, isBefore, startOfMonth } from 'date-fns';
import Notiflix from 'notiflix';
import styles from '@public/styles/calender/BigCalender.module.css'
import { flushSync } from 'react-dom';


interface Event {
    title: string;
    start: Date | string;
    end: Date | string;
    id: string;
    classNames: string[]
}
interface FullCalendarProps {
    selectedDate: Date;
    onDateChange: (date: Date) => void;
}

const BigCalendar: React.FC<FullCalendarProps> = ({ selectedDate, onDateChange }) => {
    const [events, setEvent] = useState([
        { title: 'Thiết kế giao diện cơ bản bằng html', id: '1', classNames: ['html'] },
        { title: 'Thiết kế giao diện cơ bản bằng css', id: '2', classNames: ['css'] },
        { title: 'Xử lý dữ liệu cơ bản bằng javascript', id: '3', classNames: ['javascript'] },
        { title: 'Thiết kế giao diện cơ bản bằng php', id: '4', classNames: ['php'] },
        { title: 'Nhập môn lập trình: lập trình C', id: '5', classNames: ['c'] },
    ]);

    const [allEvents, setAllEvents] = useState<Event[]>([]);
    const [showDelete, setShowDelete] = useState<boolean>(false);
    const [idDelete, setIdDelete] = useState<string | null>(null);

    const [view, setView] = useState<string>('timeGridWeek');
    const [isToday, setIsToday] = useState<boolean>(false);
    const today = new Date().toISOString().split('T')[0];
    const [title, setTitle] = useState<string>('');

    const [startTime, setStartTime] = useState<string>('');
    const [endTime, setEndTime] = useState<string>('');

    const [showAddEvent, setShowAddEvent] = useState<boolean>(false);

    const calendarRef = useRef<FullCalendar | null>(null);

    // input time 
    // start time
    const [startTimeInput, setStartTimeInput] = useState<string>('');
    const [isValidTimeStart, setIsValidTimeStart] = useState<boolean>(true);
    // end time
    const [endTimeInput, setEndTimeInput] = useState<string>('');
    const [isValidTimeEnd, setIsValidTimeEnd] = useState<boolean>(true);

    const regexPatternTime = /^\d{6}$/;

    // add event từ form

    // value của date và course 
    const [selectedCourse, setSelectedCourse] = useState<string>('');
    const [eventDate, setEventDate] = useState<string>('');

    // đặt thời gian bắt đầu và kết thúc cho event mới

    useEffect(() => {
        const start = new Date().toISOString();
        const end = new Date(new Date().getTime() + 60 * 60 * 1000).toISOString();

        setStartTime(start);
        setEndTime(end);
    }, []);

    // thêm sự kiện vào lịch khi kéo từ danh sách bên ngoài

    // const addEvent = (data: DropArg) => {
    //     const today = new Date();
    //     today.setHours(0, 0, 0, 0);
    //     console.log(`Today's Date: ${today}`);
    //     console.log(`Event Date: ${data.date}`);

    //     if (data.date.getTime() < today.getTime()) {
    //         console.log('Cannot create events for past dates.');
    //         return;
    //     } else {
    //         const event = {
    //             ...newEvent,
    //             title: data.draggedEl.innerText,
    //             start: `${data.date.toISOString()}`,
    //             end: `${new Date(data.date.getTime() + 60 * 60 * 1000).toISOString()}`,
    //             id: `${new Date().getTime()}`
    //         };

    //         console.log(event);
    //         setAllEvents([...allEvents, event]);
    //         setNewEvent({
    //             title: '',
    //             start: '',
    //             end: '',
    //             id: ''
    //         });
    //     }

    // };

    // nhận giá trị sự kiện từ form 
    const handleCourseChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedCourse(e.target.value);
    };

    const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEventDate(e.target.value);
    };

    //xử lý dữ liệu từ form

    const handleSaveEvent = () => {
        if (!selectedCourse || !startTimeInput || !endTimeInput || !eventDate) {
            Notiflix.Report.info(
                'Chưa đủ thông tin',
                'Vui lòng điền tất cả thông tin.',
                'Đồng ý',
            );
            return;
        }

        const formattedStartTime = formatTime(startTimeInput);
        const formattedEndTime = formatTime(endTimeInput);

        if (!formattedStartTime || !formattedEndTime) {
            Notiflix.Report.info(
                'Sai định dạng',
                'Thời gian không đúng định dạng.',
                'Đồng ý',
            );
            return;
        }

        const startDateTime = new Date(`${eventDate}T${formattedStartTime}`);
        let endDateTime = new Date(`${eventDate}T${formattedEndTime}`);

        if (formattedStartTime === '23:59:59') {
            endDateTime = addDays(endDateTime, 1);
        }
        const now = new Date();
        if (isBefore(startDateTime, now)) {
            Notiflix.Report.failure(
                'Thời gian không hợp lệ',
                'Thời gian bắt đầu không thể ở trong quá khứ.',
                'Đồng ý',
            );
            return;
        }
        if (isBefore(endDateTime, startDateTime)) {
            Notiflix.Confirm.show(
                'Thay đổi ngày kết thúc',
                'Thời gian kết thúc không thể nhỏ hơn thời gian bắt đầu. Chuyển tiếp qua ngày hôm sau?',
                'Có',
                'Không',
                () => {
                    endDateTime = addDays(endDateTime, 1);
                    saveEvent(startDateTime, endDateTime);
                },
                () => {
                    Notiflix.Report.info(
                        'Nhập lại thông tin',
                        'Vui lòng nhập lại thời gian kết thúc.',
                        'Đồng ý',
                    );
                }
            );
        } else {
            saveEvent(startDateTime, endDateTime);
        }
    };

    const saveEvent = (startDateTime: Date, endDateTime: Date) => {
        const formattedStartDateTime = format(startDateTime, "yyyy-MM-dd'T'HH:mm:ss");
        const formattedEndDateTime = format(endDateTime, "yyyy-MM-dd'T'HH:mm:ss");

        const selectedEvent = events.find(event => event.title === selectedCourse);

        if (!selectedEvent) {
            Notiflix.Report.failure(
                'Lỗi',
                'Không tìm thấy khóa học.',
                'Đồng ý'
            );
            return;
        }

        const newEvent: Event = {
            id: `${new Date().getTime()}`,
            title: selectedCourse,
            start: formattedStartDateTime,
            end: formattedEndDateTime,
            classNames: selectedEvent.classNames,
        };

        console.log(newEvent.start, newEvent.end);
        console.log(newEvent);

        Notiflix.Report.success(
            'Thêm lịch thành công',
            `Tên: ${newEvent.title}, từ ${format(startDateTime, 'HH:mm:ss')} đến ${format(endDateTime, 'HH:mm:ss')}. Đừng quên vào học nhé`,
            'Đồng ý',
        );

        setAllEvents([...allEvents, newEvent]);
        handleCloseAddEvent();
        setSelectedCourse('');
        setStartTimeInput('');
        setEndTimeInput('');
        setEventDate('');
    };

    // Đóng modal thêm event mới

    const handleCloseAddEvent = () => setShowAddEvent(false);
    const handleShowAddEvent = () => setShowAddEvent(true);

    // Hàm xử lý khi kéo thay đổi kích thước sự kiện khoảng thời gian
    const handleEventResize = (resizeInfo: any) => {
        const { event } = resizeInfo;
        const newStart = event.start ? new Date(event.start).toISOString() : null;
        const newEnd = event.end ? new Date(event.end).toISOString() : null;
        setAllEvents(prevEvents => {
            return prevEvents.map(e => {
                if (e.id === event.id) {
                    return {
                        ...e,
                        start: newStart || e.start,
                        end: newEnd || e.end
                    };
                }
                return e;
            });
        });
        console.log(`Tên : ${event.title}, bắt đầu: ${newStart}, kết thúc: ${newEnd}`);
    };

    // Hàm xử lý khi kéo và thả sự kiện trên lịch 
    const handleEventDrop = (dropInfo: any) => {
        const { event } = dropInfo;
        const newStart = new Date(event.start);
        const newEnd = new Date(event.end);
        const now = new Date();

        const newStartDate = new Date(newStart.toDateString());
        const todayDate = new Date(now.toDateString());

        const newStartLocalHours = newStart.getHours();
        const newStartLocalMinutes = newStart.getMinutes();
        const newStartLocalSeconds = newStart.getSeconds();

        const nowHours = now.getHours();
        const nowMinutes = now.getMinutes();
        const nowSeconds = now.getSeconds();

        if (newStartDate < todayDate) {
            Notiflix.Report.failure(
                'Lỗi chuyển lịch',
                'Không thể dời lịch về ngày cũ',
                'Đồng ý',
            );
            dropInfo.revert();
            return;
        }

        if (newStart && (newStart < now || (newStart.getFullYear() === now.getFullYear()
            && newStart.getMonth() === now.getMonth()
            && newStart.getDate() === now.getDate()
            && newStartLocalHours < nowHours)
            || (newStart.getFullYear() === now.getFullYear()
                && newStart.getMonth() === now.getMonth()
                && newStart.getDate() === now.getDate()
                && newStartLocalHours === nowHours
                && newStartLocalMinutes < nowMinutes) || (newStart.getFullYear() === now.getFullYear()
                    && newStart.getMonth() === now.getMonth() && newStart.getDate() === now.getDate()
                    && newStartLocalHours === nowHours && newStartLocalMinutes === nowMinutes
                    && newStartLocalSeconds < nowSeconds))) {
            Notiflix.Report.failure(
                'Lỗi chuyển lịch',
                'Không thể dời lịch về giờ cũ',
                'Đồng ý',
            );
            dropInfo.revert();
            return;
        }
        setAllEvents(prevEvents => {
            return prevEvents.map(e => {
                if (e.id === event.id) {
                    return {
                        ...e,
                        start: newStart?.toISOString() || e.start,
                        end: newEnd?.toISOString() || e.end
                    };
                }
                return e;
            });
        });

        console.log(`Event moved: ${event.title}, start: ${newStart}, end: ${newEnd}`);
    };

    // Hiển thị modal xóa sự kiện
    const handleDeleteModal = (id: string) => {
        setShowDelete(true);
        setIdDelete(id);
    };

    // Xóa sự kiện khi người dùng xác nhận trong modal
    const handleDelete = () => {
        if (idDelete) {
            setAllEvents(prevEvents => prevEvents.filter(event => event.id !== idDelete));
            setShowDelete(false);
            setIdDelete(null);
        }
    };

    // Hàm xử lý khi nhấn chuột phải vào sự kiện để xóa
    const handleEventRightClick = (e: MouseEvent, id: string) => {
        e.preventDefault();
        handleDeleteModal(id);
    };

    // Đổi chế độ xem của lịch (tuần hoặc tháng)
    const changeView = (view: string) => {
        const calendarApi = calendarRef.current?.getApi();
        if (calendarApi) {
            calendarApi.changeView(view);
        }
        setView(view);
    };

    // Trả về tiêu đề cho chế độ xem hiện tại (tuần hoặc tháng)
    const getViewLabel = () => {
        if (view === 'timeGridWeek') return 'Tuần';
        if (view === 'dayGridMonth') return 'Tháng';
        return 'Chọn chế độ xem';
    };

    // Kiểm tra xem lịch có đang hiển thị ngày hôm nay hay không
    const checkIfToday = () => {
        const calendarApi = calendarRef.current?.getApi();
        if (calendarApi) {
            const calendarDate = calendarApi.getDate();
            const today = new Date();
            if (
                calendarDate.getFullYear() === today.getFullYear() &&
                calendarDate.getMonth() === today.getMonth() &&
                calendarDate.getDate() === today.getDate()
            ) {
                setIsToday(true);
            } else {
                setIsToday(false);
            }
        }
    };

    // Cập nhật tiêu đề của lịch theo chế độ xem
    const updateTitle = () => {
        const calendarApi = calendarRef.current?.getApi();
        if (calendarApi) {
            const view = calendarApi.view;
            let title = view.title;
            if (title.includes('năm')) {
                title = title.replace(/\s*năm\s*/g, ', ');
                title = title.trim();
            }
            setTitle(title);
        }
    };

    // nút quay lại tuần trước
    const handlePrev = () => {
        const calendarApi = calendarRef.current?.getApi();
        if (calendarApi) {
            if (view === 'dayGridMonth') {
                calendarApi.prev();
            } else if (view === 'timeGridWeek') {
                calendarApi.prev();
            }
            checkIfToday();
            updateTitle();
        }
    };

    // nút quay về hôm nay
    const handleToday = () => {
        const calendarApi = calendarRef.current?.getApi();
        if (calendarApi) {
            calendarApi.today();
            checkIfToday();
            updateTitle();

            if (view === 'dayGridMonth') {
                calendarApi.gotoDate(selectedDate);
            }
        }
    };

    // nút tiến tới tuần sau
    const handleNext = () => {
        const calendarApi = calendarRef.current?.getApi();
        if (calendarApi) {
            if (view === 'dayGridMonth') {
                calendarApi.next();
            } else if (view === 'timeGridWeek') {
                calendarApi.next();
            }
            checkIfToday();
            updateTitle();
        }
    };


    useEffect(() => {
        checkIfToday();
        updateTitle();
    }, []);

    const [currentTime, setCurrentTime] = useState(new Date());

    // Cập nhật thời gian hiện tại mỗi phút
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 60000);

        return () => clearInterval(interval);
    }, []);

    // Hàm để kiểm tra giờ hiện tại và thay đổi màu
    const highlightCurrentHour = () => {
        const hours = currentTime.getHours();
        const fcElements = document.getElementsByClassName('fc-scrollgrid-shrink-cushion');

        Array.from(fcElements).forEach((element) => {
            const parentTd = element.closest('td');
            const timeSlotStr = parentTd ? parentTd.getAttribute('data-time') : null;

            if (timeSlotStr) {
                const timeSlotHour = parseInt(timeSlotStr.split(':')[0], 10);
                const htmlElement = element as HTMLElement;

                if (timeSlotHour === hours) {
                    htmlElement.classList.add('ct-fc-scrollgrid-shrink-cushion');
                } else {
                    htmlElement.classList.remove('ct-fc-scrollgrid-shrink-cushion');
                }
            }
        });
    };

    // Cập nhật khi thời gian thay đổi
    useEffect(() => {
        highlightCurrentHour();
    }, [currentTime]);

    const handleEventChange = (changeInfo: any) => {
        const updatedEvent = {
            ...changeInfo.event,
            start: changeInfo.event.start?.toISOString() || '',
            end: changeInfo.event.end?.toISOString() || '',
        };

        setAllEvents(prevEvents =>
            prevEvents.map(event => event.id === updatedEvent.id ? updatedEvent : event)
        );
    };

    // hàm check start time input 
    const handleChangeStartTime = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setStartTimeInput(value)
        if (regexPatternTime.test(value)) {
            const formattedTime = formatTime(value);
            console.log(formattedTime);
            setIsValidTimeStart(formattedTime !== null);
        } else {
            setIsValidTimeStart(false);
        }
    }

    // hàm check end time input 
    const handleChangeEndTime = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setEndTimeInput(value)
        if (regexPatternTime.test(value)) {
            const formattedTime = formatTime(value);
            console.log(formattedTime);
            setIsValidTimeEnd(formattedTime !== null);
        } else {
            setIsValidTimeEnd(false);
        }
    }

    // chuyển đổi định dạng time hhmmss thành hh:mm:ss
    const formatTime = (timeString: string): string | null => {
        if (timeString.length !== 6) return null;

        const hours = parseInt(timeString.slice(0, 2), 10);
        const minutes = parseInt(timeString.slice(2, 4), 10);
        const seconds = parseInt(timeString.slice(4, 6), 10);

        if (hours > 23 || minutes > 59 || seconds > 59) return null;

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    // đồng bộ hóa với calendar right
    useEffect(() => {
        const handle = () => {
            calendarRef.current?.getApi().gotoDate(selectedDate);
            updateTitle();
            setIsToday(false);
        };

        setTimeout(handle, 0);
    }, [selectedDate]);

    //đồng bộ ngược
    const handleDatesSet = (info: any) => {
        const startDate = new Date(info.start);

        // Kiểm tra điều kiện để tránh gọi không cần thiết
        if (view === 'timeGridWeek') {
            const monthOfStartDate = startDate.getMonth();
            const selectedMonth = selectedDate.getMonth();
            console.log('Month of Start Date:', monthOfStartDate);
            console.log('Selected Month:', selectedMonth);

            if (monthOfStartDate !== selectedMonth) {
                console.log('Changing week view and month differs, updating to startDate');
                onDateChange(startDate);
            }
        }
    };



    return (
        <Container className={styles.container} >
            <Row className={styles.container__col}>
                <Col className={styles.header}>
                    <h2 className={styles.header__main__title}>
                        Lịch học
                    </h2>
                    <Button variant="primary" className={styles.header__button__group} onClick={handleShowAddEvent}>
                        <Image src='/img/add.svg' className={styles.header__button__img} />
                        Tạo lịch học mới
                    </Button>
                    <Modal show={showAddEvent} onHide={handleCloseAddEvent}>
                        <Modal.Header closeButton>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>Chọn môn học</Form.Label>
                                    <Form.Select aria-label="Default select example" onChange={handleCourseChange}>
                                        <option>Chọn môn học cần lên lịch</option>
                                        {events.map(e => (
                                            <option
                                                key={e.id}
                                                value={e.title}
                                            >
                                                {e.title}
                                            </option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Giờ bắt đầu</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={startTimeInput}
                                        onChange={handleChangeStartTime}
                                        isInvalid={!isValidTimeStart}
                                        placeholder="nhập giờ bắt đầu"
                                    />
                                    {!isValidTimeStart && (
                                        <Form.Control.Feedback type="invalid">
                                            vui lòng nhập đúng định dạng giờ hh:mm:ss
                                        </Form.Control.Feedback>
                                    )}
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                    <Form.Label>Giờ kết thúc</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={endTimeInput}
                                        onChange={handleChangeEndTime}
                                        isInvalid={!isValidTimeEnd}
                                        placeholder="nhập giờ kết thúc"
                                    />
                                    {!isValidTimeEnd && (
                                        <Form.Control.Feedback type="invalid">
                                            vui lòng nhập đúng định dạng giờ hh:mm:ss
                                        </Form.Control.Feedback>
                                    )}
                                </Form.Group>
                                <Form.Group
                                    className="mb-3"
                                    controlId="exampleForm.ControlTextarea1"
                                >
                                    <Form.Label>Chọn ngày lên lịch</Form.Label>
                                    <Form.Control
                                        type='date'
                                        onChange={handleDateChange}
                                        value={eventDate}
                                        min={today}
                                    />
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseAddEvent}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={handleSaveEvent}>
                                Save Changes
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Col>
            </Row>
            <Row className={styles.container__col}>
                <Col className={styles.body}>
                    <section className={styles.body__left}>
                        <div className={styles.body__left__title} >
                            {title}
                        </div>
                        <ButtonGroup className={styles.body__left__btnGroup}>
                            <Button onClick={handlePrev} className={styles.btnPrev}>
                                <Image src='/img/Arrow - Left 2.svg' className={styles.btnPrev__img} />
                            </Button>
                            <Button onClick={handleToday} disabled={isToday} className={styles.today}>
                                hôm nay
                            </Button>
                            <Button onClick={handleNext} className={styles.btnNext}>
                                <Image src='/img/Arrow - Right 2.svg' className={styles.btnRight__img} />
                            </Button>
                        </ButtonGroup>
                    </section>
                    <Dropdown as={ButtonGroup} className={styles.body__right}>
                        <Dropdown.Toggle id="dropdown-custom-1" variant="primary" className={styles.bodyRight__btn}>
                            <div className={styles.bodyRight__btn__title}>
                                {getViewLabel()}
                            </div>
                            <Image src='/img/chevron-04.svg' className={styles.bodyRight__btn__img} />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => changeView('dayGridMonth')} disabled={view === 'dayGridMonth'}>Tháng</Dropdown.Item>
                            <Dropdown.Item onClick={() => changeView('timeGridWeek')} disabled={view === 'timeGridWeek'}>Tuần</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>
            <Row className={styles.container__col}>
                <Col className={styles.fullCalendar}>
                    <FullCalendar
                        ref={calendarRef}
                        plugins={[
                            dayGridPlugin,
                            interactionPlugin,
                            timeGridPlugin
                        ]}
                        headerToolbar={{
                            left: '',
                            center: '',
                            right: ''
                        }}
                        allDaySlot={false}
                        initialView={view}
                        firstDay={1}
                        nowIndicator={true}
                        editable={true}
                        droppable={true}
                        selectable={true}
                        selectMirror={true}
                        locale={'vi'}
                        titleFormat={{
                            year: 'numeric',
                            month: 'long',
                        }}
                        dateClick={(info) => {
                            onDateChange(new Date(info.dateStr));
                        }}
                        eventContent={undefined}
                        eventResize={handleEventResize}
                        eventDrop={handleEventDrop}
                        eventChange={handleEventChange}
                        events={allEvents}
                        dayHeaderContent={(args) => {
                            const today = new Date();
                            const todayDate = `${today.getDate()}/${today.getMonth() + 1}`;
                            const calendarDate = `${args.date.getDate()}/${args.date.getMonth() + 1}`;
                            const isTodayNow = todayDate === calendarDate;
                            return (
                                <div className="week-container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <div className='week-t'>{args.view.calendar.formatDate(args.date, { weekday: 'long' })}</div>
                                    <div className={`week-n ${isTodayNow ? 'bg-blue' : ''}`} style={{ fontSize: '12px', color: 'gray', textDecoration: 'none !important' }}>
                                        {args.view.calendar.formatDate(args.date, { day: 'numeric', month: 'numeric' })}
                                    </div>
                                </div>
                            );
                        }}
                        eventDidMount={(info) => {
                            info.el.addEventListener('contextmenu', (e) => {
                                handleEventRightClick(e, info.event.id);
                            });
                        }}
                        datesSet={handleDatesSet}
                    />
                </Col>
            </Row>
            <Modal show={showDelete} onHide={() => setShowDelete(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Xóa sự kiện</Modal.Title>
                </Modal.Header>
                <Modal.Body>Bạn có chắc chắn muốn xóa sự kiện này?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDelete(false)}>
                        Hủy
                    </Button>
                    <Button variant="danger" onClick={handleDelete}>
                        Xóa
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container >
    );
};

export default BigCalendar;
