"use client";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Article from "../component/Article/article";
import styles from "../layout.module.css";
import { HeaderArticle } from "../component/Article/headerArrticle";

const Admin = () => {
  return (
    <div>
      <HeaderArticle />
      <Article />
    </div>
  );
};

export default Admin;
