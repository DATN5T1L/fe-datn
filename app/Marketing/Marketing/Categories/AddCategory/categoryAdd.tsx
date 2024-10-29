"use client";
import { Button, Form } from "react-bootstrap";
import "./categoryAdd.css";
import mod from "../../marketing.module.css";

const CategoryAdd = () => {
  return (
    <div className="h-100">
      <div className="header-add">Thêm danh mục</div>
      <div className="body-add bg-white d-flex flex-column flex-grow-1 mx-4">
        <div className="d-flex flex-column align-items-center wrapper gap-4">
          <Form>
            <Form.Group>
              <Form.Label>Tên danh mục</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nhập vào vào tên danh mục mới"
                className={`form text-muted py-2`}
              />
            </Form.Group>
          </Form>
          <Button className={`${mod.btnCTA} btnAdd`}>Thêm vào</Button>
        </div>
      </div>
    </div>
  );
};
export default CategoryAdd;
