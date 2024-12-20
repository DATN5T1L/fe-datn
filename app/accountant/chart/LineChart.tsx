"use client";
import React, { useRef, useEffect } from "react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  LineElement,
  LineController,
  PointElement,
} from "chart.js/auto";
import style from "./Chart.module.css";

type DataType = {
  [key: string]: number; // Kiểu dữ liệu dạng object với các key là tháng (chuỗi) và giá trị là số
};

type Props = {
  data: DataType; // Dữ liệu đầu vào
};

const LineChart: React.FC<Props> = ({ data }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const myChartRef = useRef<Chart | null>(null);

  // Đăng ký các thành phần cần thiết cho biểu đồ line
  Chart.register(
    LineController,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend
  );

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      // Hủy biểu đồ cũ nếu có
      if (myChartRef.current) {
        myChartRef.current.destroy();
      }

      if (ctx) {
        // Chuyển đổi dữ liệu nhận từ `props` thành format cần thiết cho biểu đồ
        const labels = Array.from({ length: 12 }, (_, i) => `Tháng ${i + 1}`); // Tạo nhãn từ tháng 1 -> tháng 12
        const revenues = labels.map((_, index) => {
          const monthKey = (index + 1).toString().padStart(2, "0"); // Tạo key theo định dạng "01", "02", ...
          return data[monthKey] ?? 0; // Lấy giá trị doanh thu hoặc mặc định là 0
        });

        myChartRef.current = new Chart(ctx, {
          type: "line",
          data: {
            labels, // Nhãn từ tháng 1 -> tháng 12
            datasets: [
              {
                data: revenues, // Dữ liệu doanh thu theo tháng
                fill: true,
                backgroundColor: "rgba(255, 255, 255, 0)",
                borderColor: "rgb(0, 182, 155)",
                tension: 0.3,
                borderWidth: 2,
                pointRadius: 3,
                pointBackgroundColor: "rgb(0, 182, 155)",
                showLine: true,
              },
            ],
          },
          options: {
            plugins: {
              legend: {
                display: false,
                position: "right",
                align: "center",
              },
            },
            scales: {
              x: {
                grid: {
                  display: false,
                },
              },
              y: {
                grid: {
                  display: false,
                },
                ticks: {
                  stepSize: 25, // Đặt khoảng cách giữa các ticks
                  callback: function (value) {
                    return value; // Hiển thị tất cả các giá trị
                  },
                },
                suggestedMin: 0,
                suggestedMax: 100,
              },
            },
          },
        });
      }
    }
    return () => {
      if (myChartRef.current) {
        myChartRef.current.destroy();
      }
    };
  }, [data]); // Lắng nghe sự thay đổi của props `data`

  return (
    <div>
      <canvas height={"266px"} ref={chartRef}></canvas>
    </div>
  );
};

export default LineChart;
