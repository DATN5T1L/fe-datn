"use client";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Course from "../component/Course/course";
import TotalHeader from "../component/TotalHeader";

const CoursePage = () => {
  return (
    <div>
      <TotalHeader />
      <Course />
    </div>
  );
};

export default CoursePage;
