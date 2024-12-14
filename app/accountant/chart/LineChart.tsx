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

interface LineChartProps {
  labels: string[]; // Nhãn trên trục x (ví dụ: các tháng)
  data: number[]; // Dữ liệu doanh số tương ứng với từng nhãn
}

const LineChart: React.FC<LineChartProps> = ({ labels, data }) => {
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
        myChartRef.current = new Chart(ctx, {
          type: "line",
          data: {
            labels: labels, // Truyền nhãn từ props
            datasets: [
              {
                label: "Doanh số",
                data: data, // Truyền dữ liệu từ props
                fill: true,
                backgroundColor: "rgba(0, 182, 155, 0.2)", // Vùng bên dưới đường
                borderColor: "rgb(0, 182, 155)",
                tension: 0.4, // Làm mượt đường
                borderWidth: 3,
                pointRadius: 5,
                pointBackgroundColor: "rgb(0, 182, 155)",
                pointHoverRadius: 7, // Tăng kích thước điểm khi hover
                showLine: true,
              },
            ],
          },
          options: {
            plugins: {
              legend: {
                display: true,
                position: "top",
                align: "center",
                labels: {
                  font: {
                    size: 14,
                  },
                },
              },
              tooltip: {
                callbacks: {
                  label: function (tooltipItem) {
                    return `Doanh số: ${tooltipItem.raw} triệu`;
                  },
                },
              },
            },
            scales: {
              x: {
                grid: {
                  display: false,
                },
                ticks: {
                  font: {
                    size: 12,
                  },
                },
              },
              y: {
                grid: {
                  color: "rgba(200, 200, 200, 0.2)",
                },
                ticks: {
                  stepSize: 20, // Khoảng cách giữa các giá trị
                  callback: function (value) {
                    return `${value} triệu`; // Hiển thị giá trị với đơn vị
                  },
                  font: {
                    size: 12,
                  },
                },
                suggestedMin: 0,
                suggestedMax: Math.max(...data) + 20, // Tự động điều chỉnh trục y
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
  }, [labels, data]); // Theo dõi thay đổi của labels và data

  return (
    <div>
      <canvas height={"266px"} ref={chartRef}></canvas>
    </div>
  );
};

export default LineChart;
