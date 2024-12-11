
import React, { useRef, useEffect, useState } from "react";
import {
  Chart,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  LineElement,
  LineController,
  PointElement,
  BarController,
  BarElement,
  ChartDataset,
  PieController,
  ArcElement,
} from "chart.js/auto";

import style from "./Chart.module.css";

interface LineChartViewYearProps {
  years: number[];
  dataByYear: Record<number, number[]>;
}

const LineChartViewYear: React.FC<LineChartViewYearProps> = ({ years, dataByYear }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const myChartRef = useRef<Chart | null>(null);
  const [selectedYear, setSelectedYear] = useState<number>(years[0]);
  const [chartType, setChartType] = useState<"line" | "bar">("line");

  Chart.register(
    LineController,
    LineElement,
    BarController,
    BarElement,
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
          type: chartType,
          data: {
            labels: [
              "01",
              "02",
              "03",
              "04",
              "05",
              "06",
              "07",
              "08",
              "09",
              "10",
              "11",
              "12",
            ],
            datasets: [
              {
                label: `Doanh thu năm ${selectedYear} (VNĐ)`,
                data: dataByYear[selectedYear],
                backgroundColor:
                  chartType === "bar"
                    ? "rgba(67, 121, 238, 0.5)"
                    : (context: any) => {
                      const ctx = context.chart.ctx;
                      const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                      gradient.addColorStop(0.5, "rgba(67, 121, 238, 0.16)");
                      gradient.addColorStop(1, "rgba(255, 255, 255, 0.176942)");
                      return gradient;
                    },
                borderColor: "#1E6AD2",
                pointBackgroundColor: "#1E6AD2",
                pointBorderColor: "#1E6AD2",
                tension: 0.3,
                borderWidth: chartType === "bar" ? 1 : 2,
                pointRadius: chartType === "bar" ? 0 : 4,
                fill: chartType === "line",
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: true,
                position: "top",
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
                  display: true,
                },
                ticks: {
                  callback: (value) => `${value} VNĐ`,
                },
                suggestedMin: 0,
                suggestedMax: 5000,
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
  }, [selectedYear, chartType]); // Thêm chartType để cập nhật khi thay đổi loại biểu đồ

  return (
    <div className={style.bg_chart}>
      <div className={style.chart_title}>
        <h3>Thống kê doanh thu</h3>
        <div className={style.controls}>
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value as "line" | "bar")}
          >
            <option value="bar">Biểu đồ cột</option>
            <option value="line">Biểu đồ đường</option>
          </select>
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(Number(e.target.value))}
          >
            <option value={2024}>2024</option>
            <option value={2025}>2025</option>
          </select>

        </div>
      </div>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};





interface LineChartViewWeekProps {
  selectedWeek: number; // Tuần được chọn
  dataByWeek: Record<number, number[]>; // Dữ liệu theo tuần
}

const LineChartViewWeek: React.FC<LineChartViewWeekProps> = ({
  selectedWeek,
  dataByWeek,
}) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const myChartRef = useRef<Chart | null>(null);

  const [chartType, setChartType] = useState<"line" | "bar" | "both">("both");

  // Đăng ký các thành phần cần thiết cho biểu đồ
  Chart.register(
    LineController,
    BarController,
    LineElement,
    BarElement,
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
        const datasets: ChartDataset<'line' | 'bar'>[] = [];

        if (chartType === "line" || chartType === "both") {
          datasets.push({
            type: "line",
            label: `Doanh thu tuần ${selectedWeek} (VNĐ)`,
            data: dataByWeek[selectedWeek] || [],
            fill: true,
            backgroundColor:
              chartType === "line"
                ? "rgba(67, 121, 238, 0.5)"
                : "rgba(67, 121, 238, 0.16)",
            pointBackgroundColor: "#1E6AD2",
            pointBorderColor: "#1E6AD2",
            borderColor: "#1E6AD2",
            tension: 0.3,
            borderWidth: 2,
            pointRadius: 4,
          });
        }

        if (chartType === "bar" || chartType === "both") {
          datasets.push({
            type: "bar",
            label: `Số lượng sản phẩm bán tuần ${selectedWeek}`,
            data: dataByWeek[selectedWeek] || [],
            backgroundColor: "rgba(255, 99, 132, 0.6)",
            borderColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
          });
        }

        myChartRef.current = new Chart(ctx, {
          type: "bar",
          data: {
            labels: [
              "Thứ 2",
              "Thứ 3",
              "Thứ 4",
              "Thứ 5",
              "Thứ 6",
              "Thứ 7",
              "Chủ nhật",
            ],
            datasets: datasets,
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: true,
                position: "top",
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
                  display: true,
                },
                ticks: {
                  callback: (value) => `${value} VNĐ`, // Thêm đơn vị VNĐ
                },
                suggestedMin: 0,
                suggestedMax:
                  Math.max(...(dataByWeek[selectedWeek] || [])) + 100,
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
  }, [selectedWeek, dataByWeek, chartType]);

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <select
          value={chartType}
          onChange={(e) => setChartType(e.target.value as "line" | "bar" | "both")}
          style={{
            padding: "10px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            backgroundColor: "#f9f9f9",
            fontSize: "14px",
            color: "#333",
            outline: "none",
          }}
        >
          <option value="">Chọn biểu đồ</option>
          <option value="bar">Biểu đồ cột</option>
          <option value="line">Biểu đồ đường</option>
          <option value="both">Cả hai</option>
        </select>

      </div>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};


const LineChartComparison: React.FC<LineChartViewYearProps> = ({ years, dataByYear }) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const myChartRef = useRef<Chart | null>(null);

  // Đăng ký các thành phần cần thiết cho biểu đồ Line
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
            labels: [
              "01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12",
            ],
            datasets: years.map((year, index) => ({
              label: `${year} - Doanh thu (VNĐ)`,
              data: dataByYear[year] || [],
              borderColor: index === 0 ? "#1E6AD2" : "#FF6B6B",
              backgroundColor: index === 0 ? "rgba(30, 106, 210, 0.1)" : "rgba(255, 107, 107, 0.1)",
              pointBackgroundColor: index === 0 ? "#1E6AD2" : "#FF6B6B",
              pointBorderColor: index === 0 ? "#1E6AD2" : "#FF6B6B",
              tension: 0.3,
              borderWidth: 2,
              pointRadius: 4,
            })),
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: true,
                position: "top",
              },
              tooltip: {
                callbacks: {
                  label: function (context) {
                    return `${context.dataset.label}: ${context.raw} VNĐ`;
                  },
                },
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
                  display: true,
                },
                ticks: {
                  callback: (value) => `${value} VNĐ`, // Thêm đơn vị VNĐ
                },
                suggestedMin: 0,
                suggestedMax: 5000,
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
  }, [years, dataByYear]); // Thêm years và dataByYear vào dependencies

  return (
    <div className={style.bg_chart}>
      <div className={style.chart_title}>
        <h3>So sánh doanh thu: {years.join(" vs ")}</h3>
      </div>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export { LineChartViewYear, LineChartViewWeek, LineChartComparison };
