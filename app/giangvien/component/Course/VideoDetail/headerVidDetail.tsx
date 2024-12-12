'use client'

import { useSearchParams } from "next/navigation";
import h from "./course.module.css";

import { Button } from "react-bootstrap";
import { useEffect, useMemo, useState } from "react";

import Notification from "@/app/(user-global)/component/globalControl/Notification";
import useCookie from "@/app/(user-global)/component/hook/useCookie";

const HeaderVideoDetail: React.FC = () => {
  const searchParams = useSearchParams()
  const [dataCourse, setDataCourse] = useState('')
  const [notification, setNotification] = useState<{
    status: 'error' | 'success' | 'fail' | 'complete';
    message: string;
    type: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  } | null>(null);

  const id = searchParams.get(`id`)
  const token = useCookie('token')

  const handleReload = () => {
    if (token && id) {
      fetch(`/api/allCourseAdmin/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          console.log('Bài học', data);
          setDataCourse(data.data.status_course)
        })
        .catch(error => {
          console.error('Có lỗi xảy ra: ', error);
        });
    }
  }

  useEffect(() => {
    if (token && id) {
      handleReload()
    }
  }, [token, id]);

  const handleDone = () => {
    if (token && id) {
      if (confirm('Bạn có muốn đăng khóa học này không?')) {
        fetch(`/api/censorCourse/${id}`, {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            status_course: 'success'
          })
        })
          .then(res => res.json())
          .then(data => {
            handleReload()
            alert('Thay đổi trạng thái thành công')
          })
          .catch(error => {
            console.error(`Có lỗi xảy ra: `, error);
          })
      }
    }
  }

  const handleFail = () => {
    if (token && id) {
      if (confirm('Bạn có muốn gỡ khóa học này không?'))
        fetch(`/api/censorCourse/${id}`, {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            status_course: 'failed'
          })
        })
          .then(res => res.json())
          .then(data => {
            handleReload()
            alert('Thay đổi trạng thái thành công')
          })
          .catch(error => {
            console.error(`Có lỗi xảy ra: `, error);
          })
    }
  }

  const handleConfirming = () => {
    if (token && id) {
      if (confirm('Bạn có muốn chuyển về chờ duyệt khóa học này không?')) {
        fetch(`/api/censorCourse/${id}`, {
          method: 'PATCH',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            status_course: 'confirming'
          })
        })
          .then(res => res.json())
          .then(data => {
            handleReload()
            alert('Thay đổi trạng thái thành công')
          })
          .catch(error => {
            console.error(`Có lỗi xảy ra: `, error);
          })
      }
    }
  }

  return (
    <div className="mx-4 mx-xs-2 mx-sm-3 position-relative">
      <div className={`d-flex justify-content-between align-items-center my-4`}>
        <h2 className={h.heading}>Chi tiết khóa học</h2>

        <div className={`${h.actions} d-flex`}>
          {dataCourse && dataCourse !== 'failed' ? (
            <Button
              variant="outline-primary"
              className={`${h.btnCTA} ${h.btnCTAOutline} me-2`}
              onClick={() => {
                handleFail()
              }}
            >
              Từ chối khoá học
            </Button>
          ) : (
            ''
          )}
          {dataCourse && dataCourse === 'failed' || dataCourse === 'confirming' ? (
            <Button
              className={`${h.btnCTA}`}
              onClick={() => {
                handleDone()
              }}
            >Đăng khóa học</Button>
          ) : (
            <Button
              className={`${h.btnCTA}`}
              onClick={() => {
                handleConfirming()
              }}
            >Chuyển về chờ duyệt</Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HeaderVideoDetail;
