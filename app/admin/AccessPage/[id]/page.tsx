"use client";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { HeaderAccess } from "@/app/admin/component/Access/headerAccess";
import InputComponents from "@/app/admin/component/InputComponent";
import { HeaderUpdateAccess } from "../../component/Access/Update/HeaderUpdate";



const UpdateAccessPage = () => {

  const [formData, setFormData] = useState({
    name: '',
    account: '',
    password: '',
    role: '',
    confirmation: '',
  });

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log(formData);
    // Xử lý logic gửi form
  };

  return (
    <div>
      <HeaderUpdateAccess />
      <div
        className={` flex-column flex-grow-1 mx-4 mx-xs-2 mx-sm-3 bg-white`}
        style={{ minHeight: '75vh' }}
      >
        <form className="d-flex align-items-center justify-center col" onSubmit={handleSubmit} style={{ flexDirection: 'column' }}>
          <div className="row d-flex align-items-center justify-content-center my-4" style={{ width: '100%' }}>
            <div className="col-12 col-md-6 col-lg-6">
              <label htmlFor="name" className="form-label">
                Tên
              </label>

              <InputComponents
                value={formData.name}
                onChange={handleChange}
                placeholder="Nhập tên của bạn"
                type="text"
                name="name"
              />
            </div>

            <div className="col-12 col-md-6 col-lg-6">
              <label htmlFor="password" className="form-label">
                Mật khẩu
              </label>
              <InputComponents
                value={formData.password}
                onChange={handleChange}
                placeholder="Nhập mật khẩu"
                type="password"
                name="password"
              />
            </div>
          </div>


          <div className="row d-flex align-items-center justify-content-center mb4" style={{ width: '100%' }}>
            <div className=" col-12 col-md-6 col-lg-6">
              <label htmlFor="name" className="form-label">
                Tài khoản
              </label>

              <InputComponents
                value={formData.account}
                onChange={handleChange}
                placeholder="Nhập tài khoản của bạn"
                type="text"
                name="acount"
              />
            </div>

            <div className="col-12 col-md-6 col-lg-6">
              <label htmlFor="password" className="form-label">
                Vai trò
              </label>
              <div className="position-relative d-flex">
                <select aria-label="Lượt xem" className="form-control" style={{ height: 50, backgroundColor: '#f5f6fa', borderColor: '#f5f6fa', borderRadius: 10 }}>
                  <option>Lượt xem  </option>
                  <option value="1">0-100</option>
                  <option value="2">1000+</option>
                </select>
                <div className="position-absolute" style={{ top: '25%', right: 10 }}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708" />
                  </svg>
                </div>
              </div>

            </div>
          </div>


          <button type="submit" className="btn btn-primary my-4" style={{ width: 200, height: 50 }}>
            Thêm vào
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateAccessPage;
