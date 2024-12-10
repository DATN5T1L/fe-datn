
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
  PieController,
  ArcElement,
} from "chart.js/auto";
import style from "./Chart.module.css";

const LineChartViewYear = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const myChartRef = useRef<Chart | null>(null);
  const [selectedYear, setSelectedYear] = useState<number>(2024);
  const [chartType, setChartType] = useState<"line" | "bar">("line");

  // Dữ liệu theo năm
  const dataByYear: Record<number, number[]> = {
    2024: [1500, 3800, 2500, 3750, 1000, 4000, 400, 800, 100, 2000, 4200, 500],
    2025: [2000, 3400, 3000, 4000, 1500, 4500, 800, 900, 120, 2100, 4300, 700],
  };

  // Đăng ký các thành phần cần thiết cho biểu đồ
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



const LineChartViewMonth = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const myChartRef = useRef<Chart | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number>(1);
  const [chartType, setChartType] = useState<"line" | "bar">("line");

  // Đăng ký các thành phần cần thiết cho biểu đồ
  Chart.register(
    LineController,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
    BarController,
    BarElement
  );

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");

      // Hủy biểu đồ cũ nếu có
      if (myChartRef.current) {
        myChartRef.current.destroy();
      }

      if (ctx) {
        const dataForSelectedMonth = getDataForMonth(selectedMonth);
        myChartRef.current = new Chart(ctx, {
          type: chartType,
          data: {
            labels: dataForSelectedMonth.labels,
            datasets: [
              {
                label: "Lượt xem(nghìn lượt)",
                data: dataForSelectedMonth.data,
                fill: true,
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
                pointBackgroundColor: "#1E6AD2",
                pointBorderColor: "#1E6AD2",
                borderColor: "#1E6AD2",
                tension: 0.4,
                borderWidth: 1,
                pointRadius: 3,
                showLine: true,
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: false,
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
                  callback: function (value) {
                    if (
                      value === 1000 ||
                      value === 2000 ||
                      value === 3000 ||
                      value === 4000 ||
                      value === 5000
                    ) {
                      return value;
                    }
                    return null;
                  },
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
  }, [selectedMonth, chartType]);

  // Hàm xử lý dữ liệu cho từng tháng
  const getDataForMonth = (month: number) => {
    const labels = ["Week 1", "Week 2", "Week 3", "Week 4"];
    const data = Array.from({ length: 4 }, () =>
      Math.floor(Math.random() * 5000 + 500)
    );
    return { labels, data };
  };

  return (
    <div className={style.bg_chart}>
      <div className={style.chart_title}>
        <h3>Thống kê theo tháng</h3>
        <div>
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(Number(e.target.value))}
          >
            <option value={1}>January</option>
            <option value={2}>February</option>
            <option value={3}>March</option>
            <option value={4}>April</option>
            <option value={5}>May</option>
            <option value={6}>June</option>
            <option value={7}>July</option>
            <option value={8}>August</option>
            <option value={9}>September</option>
            <option value={10}>October</option>
            <option value={11}>November</option>
            <option value={12}>December</option>
          </select>

          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value as "line" | "bar")}
          >
            <option value="line">Biểu đồ đường</option>
            <option value="bar">Biểu đồ cột</option>
          </select>
        </div>
      </div>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

const LineChartViewWeek = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const myChartRef = useRef<Chart | null>(null);
  const [selectedWeek, setSelectedWeek] = useState<number>(1);

  // Dữ liệu theo tuần
  const dataByWeek: Record<number, number[]> = {
    1: [200, 300, 250, 400, 350, 450, 500], // Tuần 1
    2: [300, 400, 350, 500, 450, 550, 600], // Tuần 2
    3: [250, 350, 300, 450, 400, 500, 550], // Tuần 3
    4: [400, 500, 450, 600, 550, 650, 700], // Tuần 4
  };

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
            labels: ["Thứ 2", "Thứ 3", "Thứ 4", "Thứ 5", "Thứ 6", "Thứ 7", "Chủ nhật"],
            datasets: [
              {
                label: `Doanh thu tuần ${selectedWeek} (VNĐ)`,
                data: dataByWeek[selectedWeek],
                fill: true,
                backgroundColor: (context) => {
                  const ctx = context.chart.ctx;
                  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                  gradient.addColorStop(0.5, "rgba(67, 121, 238, 0.16)");
                  gradient.addColorStop(1, "rgba(255, 255, 255, 0.176942)");
                  return gradient;
                },
                pointBackgroundColor: "#1E6AD2",
                pointBorderColor: "#1E6AD2",
                borderColor: "#1E6AD2",
                tension: 0.3,
                borderWidth: 2,
                pointRadius: 4,
                showLine: true,
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
                  callback: (value) => `${value} VNĐ`, // Thêm đơn vị VNĐ
                },
                suggestedMin: 0,
                suggestedMax: 700,
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
  }, [selectedWeek]); // Thêm selectedWeek để cập nhật khi tuần thay đổi

  return (
    <div className={style.bg_chart}>
      <div className={style.chart_title}>
        <h3>Thống kê tuần</h3>
        <select
          value={selectedWeek}
          onChange={(e) => setSelectedWeek(Number(e.target.value))}
        >
          <option value={1}>Tuần 1</option>
          <option value={2}>Tuần 2</option>
          <option value={3}>Tuần 3</option>
          <option value={4}>Tuần 4</option>
        </select>
      </div>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};
const LineChartComparison = () => {
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
                label: "2024 - Doanh thu (VNĐ)",
                data: [1500, 3800, 2500, 3750, 1000, 4000, 400, 800, 100, 2000, 4200, 500],
                borderColor: "#1E6AD2",
                backgroundColor: "rgba(30, 106, 210, 0.1)",
                pointBackgroundColor: "#1E6AD2",
                pointBorderColor: "#1E6AD2",
                tension: 0.3,
                borderWidth: 2,
                pointRadius: 4,
              },
              {
                label: "2025 - Doanh thu (VNĐ)",
                data: [2000, 3500, 3000, 4000, 1500, 3800, 600, 900, 200, 2500, 4500, 800],
                borderColor: "#FF6B6B",
                backgroundColor: "rgba(255, 107, 107, 0.1)",
                pointBackgroundColor: "#FF6B6B",
                pointBorderColor: "#FF6B6B",
                tension: 0.3,
                borderWidth: 2,
                pointRadius: 4,
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
  }, []);

  return (
    <div className={style.bg_chart}>
      <div className={style.chart_title}>
        <h3>So sánh doanh thu: 2024 vs 2025</h3>
      </div>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};

export { LineChartViewMonth, LineChartViewYear, LineChartViewWeek, LineChartComparison };
