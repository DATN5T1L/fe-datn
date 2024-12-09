import { Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react"
import r from '@public/styles/course/Reminder.module.css';
import { IconPlus, IconX, IconEdit, IconPush } from "@app/(user-global)/component/icon/icons";
import Button from "@app/(user-global)/component/globalControl/btnComponent";
import Notification from "@app/(user-global)/component/globalControl/Notification";
import { motion } from 'framer-motion';
import { ShowNameElement } from '@app/(user-global)/component/globalControl/commonC';
interface ReminDetailProp {
    course_id: string;
    name_course: string;
    token: string | null;
    onLose: () => void;
}

interface ApiResponseReminderDetail {
    message: string;
    data: Reminder[];
}

const ReminderDetail: React.FC<ReminDetailProp> = ({ onLose, course_id, name_course, token }) => {
    const [type, setType] = useState<NotiType>("complete");
    const [message, setMessage] = useState<string>("");
    const [showNotification, setShowNotification] = useState(false);
    const [idReminder, setIdReminder] = useState<string>("");
    const [activeTab, setActiveTab] = useState('chitiet');
    const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
    const [selectedDays, setSelectedDays] = useState<string[]>([]);
    const [selectedTime, setSelectedTime] = useState<string>("");
    const [reminderContent, setReminderContent] = useState<Reminder[]>([]);

    console.log(selectedDays, selectedTime)
    function convertTime(input: string): string {
        // Tách các thành phần giờ, phút và giây
        const [hour, minute] = input.split(":");
        // Chỉ cần trả về chuỗi giờ và phút
        return `${hour}:${minute}`;
    }

    const getDayInVietnamese = (day: string): string => {
        switch (day) {
            case 'Monday': return "Thứ Hai";
            case 'Tuesday': return "Thứ Ba";
            case 'Wednesday': return "Thứ Tư";
            case 'Thursday': return "Thứ Năm";
            case 'Friday': return "Thứ Sáu";
            case 'Saturday': return "Thứ Bảy";
            case 'Sunday': return "Chủ Nhật";
            default: return "Không xác định";
        }
    };
    const times = generateTimes(8, 22, 30);
    function generateTimes(startHour: number, endHour: number, interval: number) {
        const times: string[] = [];

        // Duyệt qua các giờ từ startHour đến endHour
        for (let hour = startHour; hour <= endHour; hour++) {
            // Tạo các mốc giờ cho mỗi giờ
            for (let minute = 0; minute < 60; minute += interval) {
                // Đảm bảo rằng giờ và phút có 2 chữ số
                const formattedHour = hour.toString().padStart(2, '0');
                const formattedMinute = minute.toString().padStart(2, '0');

                // Tạo chuỗi giờ
                times.push(`${formattedHour}:${formattedMinute}`);
            }
        }

        return times;
    }

    // State lưu trữ các giờ đã chọn


    // Hàm xử lý khi bấm vào nút giờ
    const handleTimeClick = (time: string) => {
        setSelectedTimes((prevSelectedTimes) => {
            // Kiểm tra và xử lý giá trị thời gian
            const formattedTime = convertTime(time);
            if (prevSelectedTimes.includes(formattedTime)) {
                return prevSelectedTimes.filter(t => t !== formattedTime);
            }
            return [...prevSelectedTimes, formattedTime];
        });
    };
    // console.log(selectedTimes)

    const fetchReminderDetail = async () => {
        try {
            const response = await fetch(`/api/reminders/${course_id}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!response.ok) {
                throw new Error("Failed to fetch course");
            }
            const data = await response.json() as ApiResponseReminderDetail;
            // console.log(data, "chi tiết data")
            setReminderContent(data.data);
            console.log(reminderContent)
        } catch (err: any) {
            console.log(err.message);
        }
    };

    const handleDaySelection = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setSelectedDays((prevDays) => {
            if (checked) {
                // Chỉ thêm nếu giá trị chưa tồn tại trong danh sách
                return prevDays.includes(value) ? prevDays : [...prevDays, value];
            } else {
                // Xóa giá trị nếu nó bị bỏ chọn
                return prevDays.filter(day => day !== value);
            }
        });
    };
    const handleDay = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        setSelectedDays(() => {
            if (checked) {
                // Chỉ thêm giá trị này và loại bỏ các giá trị khác
                return [value];
            } else {
                // Nếu bỏ chọn, danh sách sẽ rỗng
                return [];
            }
        });
    };
    const handleAddReminder = async () => {
        const datas = {
            course_id: course_id,
            day_of_week: selectedDays,
            time: selectedTimes
        }
        try {
            const response = await fetch(`/api/addReminder/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(datas),
            })

            const responseData = await response.json();

            if (!response.ok) {
                setType("fail");
                setMessage(responseData.message || "An error occurred");
                setShowNotification(true);
                setTimeout(() => {
                    setShowNotification(false);
                }, 3000);
                return; // Exit if the response is not OK
            }

            fetchReminderDetail();
            setSelectedTimes([]);
            setSelectedDays([]);

            setType("success")
            setMessage(responseData.message);
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false);
                setActiveTab('chitiet')
            }, 3000);
        } catch (error) {
            console.error('Failed to save note:', error);
        }

    }
    const handleEditReminder = async () => {
        const datas = {
            reminder: [
                {
                    day_of_week: selectedDays[0],
                    remider_id: idReminder,
                    time: selectedTime,
                }
            ]
        };
        try {
            const response = await fetch(`/api/editReminder/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(datas),
            })

            const responseData = await response.json();
            if (!response.ok) {
                setType("fail");
                setMessage(responseData.message || "An error occurred");
                setShowNotification(true);
                setTimeout(() => {
                    setShowNotification(false);
                }, 3000);
                return; // Exit if the response is not OK
            }

            fetchReminderDetail();
            setSelectedTimes([]);
            setSelectedDays([]);

            setType("success")
            setMessage(responseData.message);
            setShowNotification(true);
            setTimeout(() => {
                setShowNotification(false);
                setActiveTab('chitiet')
            }, 3000);
        } catch (error) {
            console.error('Failed to save note:', error);
        }

    }
    const handleDelete = async (id: string) => {
        try {
            const response = await fetch(`/api/deleteReminder/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            })

            const responseData = await response.json();
            if (!response.ok) {
                setType("fail")
                setMessage(responseData.message);
            }
            setType("success")
            setMessage(responseData.message);
            setShowNotification(true);
            fetchReminderDetail()
            setTimeout(() => {
                setShowNotification(false);
            }, 3000);
        } catch (error) {
            console.error('Failed to save note:', error);
        }
    };
    useEffect(() => {
        fetchReminderDetail()
    }, [course_id])
    const dayMapping: Record<
        "Thứ 2" | "Thứ 3" | "Thứ 4" | "Thứ 5" | "Thứ 6" | "Thứ 7" | "Chủ nhật",
        string
    > = {
        "Thứ 2": "Monday",
        "Thứ 3": "Tuesday",
        "Thứ 4": "Wednesday",
        "Thứ 5": "Thursday",
        "Thứ 6": "Friday",
        "Thứ 7": "Saturday",
        "Chủ nhật": "Sunday",
    };
    return (
        <div className={r.popUpSetting} >
            <div className={r.settingTime}>
                <div className={r.headingString}>
                    <div>
                        <h4 className={r.headingSTime}>
                            Nhắc nhở  {name_course} của bạn
                        </h4>
                        <p className={r.descSTime}>Thông tin, thêm nhắc nhở,...</p>
                    </div>
                    <div onClick={onLose} className={r.Canxel}><IconX /></div>
                </div>
                <aside className={r.nav}>
                    <button

                        className={r.navBtn}
                        onClick={() => setActiveTab('chitiet')}
                    >
                        Chi tiết
                    </button>
                    <button
                        className={r.navBtn}
                        onClick={() => setActiveTab('themmoi')}
                    >
                        Thêm nhắc nhỏ
                    </button>
                </aside>
                <main
                    style={{
                        display: activeTab === 'themmoi' ? 'block' : 'none',
                        zIndex: activeTab === 'themmoi' ? 1 : 0,
                    }}
                >
                    <Row className={r.ctaTimes}>
                        {times.map((time, index) => (
                            <Col xs={6} sm={6} md={4} key={index} className={r.ctaTime}>
                                <input
                                    type="button"
                                    value={time}
                                    className={r.ctaButton}
                                    onClick={() => handleTimeClick(time)}
                                />
                            </Col>
                        ))}
                    </Row>
                    <div className={r.descSTime}>
                        Tùy chọn
                        <input
                            type="time"
                            name=""
                            id=""
                            onBlur={(e) => handleTimeClick(e.currentTarget.value)}
                            className={r.btnAddTime}
                        />
                    </div>
                    <Row className={r.daysOfWeek}>

                        <Col md={12} className={r.daysW} >
                            <label className={r.days}>
                                Thứ Hai
                                <input
                                    type="checkbox"
                                    name="days"
                                    value="Monday"
                                    onChange={(e) => handleDaySelection(e)}
                                />

                            </label>
                        </Col>
                        <Col md={12} className={r.daysW} >
                            <label className={r.days}>
                                Thứ Ba
                                <input
                                    type="checkbox"
                                    name="days"
                                    value="Tuesday"
                                    onChange={(e) => handleDaySelection(e)}
                                />

                            </label>
                        </Col>
                        <Col md={12} className={r.daysW}>
                            <label className={r.days}>
                                Thứ Tư
                                <input
                                    type="checkbox"
                                    name="days"
                                    value="Wednesday"
                                    onChange={(e) => handleDaySelection(e)}
                                />

                            </label>
                        </Col>
                        <Col md={12} className={r.daysW}>
                            <label className={r.days}>
                                Thứ Năm
                                <input
                                    type="checkbox"
                                    name="days"
                                    value="Thursday"
                                    onChange={(e) => handleDaySelection(e)}
                                />

                            </label>
                        </Col>
                        <Col md={12} className={r.daysW}>
                            <label className={r.days}>
                                Thứ Sáu
                                <input
                                    type="checkbox"
                                    name="days"
                                    value="Friday"
                                    onChange={(e) => handleDaySelection(e)}
                                />

                            </label>
                        </Col>
                        <Col md={12} className={r.daysW}>
                            <label className={r.days}>
                                Thứ Bảy
                                <input
                                    type="checkbox"
                                    name="days"
                                    value="Saturday"
                                    onChange={(e) => handleDaySelection(e)}
                                />
                            </label>
                        </Col>
                        <Col md={12} className={r.daysW}>
                            <label className={r.days}>
                                Chủ Nhật
                                <input
                                    type="checkbox"
                                    name="days"
                                    value="Sunday"
                                    onChange={(e) => handleDaySelection(e)}
                                />

                            </label>
                        </Col>
                    </Row>

                    <div className={r.ctaSubmit}>
                        <Button

                            type="disable"
                            status="hover"
                            size="S"
                            height={40}
                            leftIcon={false}
                            rightIcon={false}
                        >
                            Hủy
                        </Button>
                        <Button
                            type="premary"
                            status="hover"
                            size="S"
                            height={40}
                            leftIcon={false}
                            rightIcon={false}
                            onClick={handleAddReminder}
                        >
                            Thêm
                        </Button>
                    </div>
                </main>
                <main
                    className={r.ContentReminders}
                    style={{
                        display: activeTab === 'chitiet' ? 'block' : 'none',
                        zIndex: activeTab === 'chitiet' ? 1 : 0,
                        width: '100%',
                    }}
                >
                    {reminderContent && reminderContent.length > 0 ? (
                        <Row className={r.listTime}>
                            {reminderContent.map((item, index) => (
                                <Col md={12} key={index} className={r.itemTime}>
                                    <div className={r.ContentTime}>
                                        {getDayInVietnamese(item.day_of_week)} - {convertTime(item.time)}
                                        <div className={r.ctaReminItem}>
                                            <ShowNameElement name="Thay đổi nhắc nhở">
                                                <span
                                                    onClick={() => {
                                                        setIdReminder(item.reminder_id);
                                                        setActiveTab("suanhacnho");
                                                    }}
                                                >
                                                    <IconEdit />
                                                </span>
                                            </ShowNameElement>
                                            <ShowNameElement name="Xóa nhắc nhở">
                                                <span onClick={() => {
                                                    handleDelete(item.reminder_id);
                                                }}>
                                                    <IconPush />
                                                </span>
                                            </ShowNameElement>
                                        </div>
                                    </div>
                                </Col>
                            ))}

                        </Row>
                    ) : (
                        <span className={r.docNoContent}>Không có lịch nhắc nhở nào</span>
                    )}
                </main>
                <main

                    style={{
                        display: activeTab === 'suanhacnho' ? 'block' : 'none',
                        zIndex: activeTab === 'suanhacnho' ? 1 : 0,
                        width: '100%',
                    }}
                >
                    <div className={r.FormIdit}>
                        <div className={r.FormControl}>
                            <p>Thời gian</p>
                            <input
                                type="time"
                                className={r.inputEditTime}
                                onBlur={(e) => setSelectedTime(e.currentTarget.value)}
                            />
                            <p> Ngày nhắc nhở</p>
                            <Row className={r.daysOfWeekEdit}>
                                {(["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"] as const).map((day) => (
                                    <Col md={12} key={day} className={`${r.daysW}`}>
                                        <label className={r.days}>
                                            {day}
                                            <input
                                                type="radio"
                                                name="days"
                                                value={dayMapping[day]}
                                                onChange={(e) => handleDay(e)}
                                            />
                                        </label>
                                    </Col>
                                ))}
                            </Row>
                            <div className={r.ctaSubmit}>
                                <Button
                                    type="disable"
                                    status="hover"
                                    size="S"
                                    height={40}
                                    leftIcon={false}
                                    rightIcon={false}
                                    onClick={() => setActiveTab("chitiet")}
                                >
                                    Hủy
                                </Button>
                                <Button
                                    type="premary"
                                    status="hover"
                                    size="S"
                                    height={40}
                                    leftIcon={false}
                                    rightIcon={false}
                                    onClick={() => handleEditReminder()}
                                >
                                    Thay  đổi
                                </Button>
                            </div>
                        </div>
                    </div>
                </main>
            </div >
            {
                showNotification && (
                    <motion.div
                        initial={{ x: '-100%' }} // Bắt đầu từ bên ngoài màn hình (trái)
                        animate={{ x: 0 }}       // Chạy vào giữa màn hình
                        exit={{ x: '-100%' }}    // Chạy ra khỏi màn hình (trái)
                        transition={{ duration: 1 }} // Thời gian chuyển đổi 0.5 giây
                        className={r.noteTap}
                    >
                        <Notification type={type} message={message} position='bottom-left' />
                    </motion.div>
                )
            }
        </div >
    )
}

export default ReminderDetail 