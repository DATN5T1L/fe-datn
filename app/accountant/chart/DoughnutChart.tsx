// components/SpacedDotChart.tsx
import { useEffect, useRef } from "react";
import { Chart, ChartData, ChartConfiguration, ChartOptions } from "chart.js";

const DoughnutChart = () => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const myChartRef = useRef<Chart<"doughnut"> | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext("2d");
    if (!ctx) return;

    if (myChartRef.current) {
      myChartRef.current.destroy();
    }

    const dotColor = "#237DF7";
    const emptyColor = "#D9E6FF";
    const numberOfDots = 4;
    const totalSegments = numberOfDots * 2;

    // Chart data
    const data: ChartData<"doughnut"> = {
      datasets: [
        {
          data: Array(totalSegments).fill(1),
          backgroundColor: Array.from({ length: totalSegments }, (_, i) =>
            i % 2 === 0 ? dotColor : emptyColor
          ),
          borderWidth: 0,
        },
      ],
    };

    const options: ChartOptions<"doughnut"> = {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: { enabled: false },
      },
      rotation: -90,
      circumference: 360,
      cutout: "80%",
      animation: false,
    };

    // Creating the chart instance
    const config: ChartConfiguration<"doughnut"> = {
      type: "doughnut",
      data,
      options,
    };

    myChartRef.current = new Chart(ctx, config);

    return () => {
      if (myChartRef.current) {
        myChartRef.current.destroy();
      }
    };
  }, []);

  return (
    <canvas
      id="spacedDotChart"
      ref={chartRef}
      width="150"
      height="150"
    ></canvas>
  );
};

export default DoughnutChart;
