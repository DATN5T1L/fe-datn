import React, { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import h from "./course.module.css";
import Link from "next/link";
import Course from "./course";
import { usePathname } from "next/navigation";
import useCookie from "@/app/(user-global)/component/hook/useCookie";

interface CourseData {
  created_at: string;
  del_flag: boolean;
  discount_price_course: number;
  id: string;
  img_course: string;
  instructor_id: string;
  instructor_name: string;
  name_course: string;
  price_course: number;
  rating_course: string;
  status_course: string
  tax_rate: string;
  updated_at: string;
  views_course: number;
}
interface ApiResponse<T> {
  status: string;
  message: string;
  data: T[];
}
interface CourseProps {
  postData: ApiResponse<CourseData> | null;
}

const HeaderCourse: React.FC = () => {
  const pathname = usePathname()
  const token = useCookie('token');

  const [loading, setLoading] = useState<boolean>(true);
  const [courseData, setCourseData] = useState<ApiResponse<CourseData> | null>(null);
  const [statusFilter, setStatusFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [discountFilter, setDiscountFilter] = useState('');

  useEffect(() => {
    if (token) {
      setLoading(true);
      fetch('/api/allCourseAdmin/', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => res.json())
        .then(data => {
          setCourseData(data)
          setLoading(false)
        })
        .catch(err => {
          console.log(err)
          setLoading(false);
        });
    }
  }, [token]);

  console.log(courseData);

  const filteredCourses = courseData?.data.filter(course => {
    if (statusFilter && course.status_course !== statusFilter) {
      return false;
    }
    if (priceFilter === "1" && course.price_course >= 1000) {
      return false;
    } else if (priceFilter === "2" && course.price_course < 1000) {
      return false;
    }
    if (discountFilter === "1" && course.discount_price_course >= 100) {
      return false;
    } else if (discountFilter === "2" && course.discount_price_course < 100) {
      return false;
    }
    return true;
  });

  const handleReset = () => {
    setStatusFilter('')
    setPriceFilter('')
    setDiscountFilter('')
  }

  return (
    <>
      <div className={`${h.mainheader} d-flex flex-column `}>
        <div className="mx-4 mx-xs-2 mx-sm-3">
          <div
            className={`d-flex justify-content-between align-items-center my-4 flex-wrap`}
          >
            <div className="col-12 col-md-6">
              <h2 className={h.heading}>Quản lý khóa học</h2>
            </div>
            <div className={`${h.actions} d-flex`}>
              <Button
                variant="outline-primary"
                className={`${h.btnCTA} ${h.btnCTAOutline} me-2`}
              >
                Thêm chương
              </Button>
              <Link href="/giangvien/CoursePage/CourseAdd">
                <Button className={`${h.btnCTA}`}>Thêm khóa học</Button>
              </Link>
            </div>
          </div>
        </div>
        <div className={`${h.filter_bar} d-flex justify-content-between `}>
          <div className="d-flex">
            <img
              src="/img_admin/action.svg"
              className="bg-white border-end p-4 "
              alt="Action"
            />
            <div className="bg-white border-end p-4">
              <select
                aria-label="Trạng thái"
                className={`${h.formSelect} bg-transparent`}
                onChange={(e) => setStatusFilter(e.target.value)}
                value={statusFilter}
              >
                <option value="">Trạng thái</option>
                <option value="confirming">Confirming</option>
                <option value="failed">Failed</option>
                <option value="success">Success</option>
              </select>
            </div>
            <div className="bg-white border-end p-4">
              <select
                aria-label="Trạng thái"
                className={`${h.formSelect} bg-transparent`}
                onChange={(e) => setPriceFilter(e.target.value)}
                value={priceFilter}
              >
                <option value="">Giá</option>
                <option value="1">0-1000</option>
                <option value="2">1000+</option>
              </select>
            </div>
            <div className="bg-white border-end p-4">
              <select
                aria-label="Trạng thái"
                className={`${h.formSelect} bg-transparent`}
                onChange={(e) => setDiscountFilter(e.target.value)}
                value={discountFilter}
              >
                <option value="">Giá giảm</option>
                <option value="1">0-100</option>
                <option value="2">100-1000+</option>
              </select>
            </div>
            <div className="bg-white p-4 d-inline-flex align-items-center " onClick={() => handleReset()}>
              <img src="/img_admin/restart.svg" alt="Reset" />
              <span className="text-danger">Cài lại</span>
            </div>
          </div>
          <div>
            <InputGroup className={h.searchInputGroup}>
              <input
                type="text"
                placeholder="Tìm kiếm khóa học"
                className={h.searchInput}
              />
              <div className={h.searchIconWrapper}>
                <img
                  src="/img_admin/search.svg"
                  alt="Search"
                  width={"24px"}
                  height={"24px"}
                />
              </div>
            </InputGroup>
          </div>
        </div>
      </div>
      {filteredCourses && <Course data={filteredCourses} />}
    </>
  );
};

export default HeaderCourse