"use client";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

const DoughnutChart = ({ data, dynamicNumber }) => {
  const chartRef = React.useRef(null);

  React.useEffect(() => {
    const chart = chartRef.current;
    if (!chart) {
      return;
    }

    const ctx = chart.ctx;
    const { width, height } = chart.chartArea;
    const centerX = width / 2 + chart.chartArea.left;
    const centerY = height / 2 + chart.chartArea.top - 5; // Adjust for multiple lines

    const drawCenterText = () => {
      // Text part 1: "Expenses"
      ctx.font = "14px Arial"; // Customize as needed
      ctx.fillStyle = "#000"; // Text color
      ctx.textAlign = "center";
      ctx.fillText(data.datasets[0].label, centerX, centerY);

      // Dynamic Text part 2: e.g., "123"
      ctx.font = "bold 16px Arial"; // Customize as needed
      const textMetrics = ctx.measureText(dynamicNumber);
      const textWidth = textMetrics.width;
      const textHeight = parseInt(ctx.font, 10); // Extract font size

      // Dynamic text
      ctx.fillStyle = "#000"; // Text color for dynamic part
      ctx.fillText(dynamicNumber, centerX, centerY + 20); // Adjust as needed
    };

    const originalDraw = chart.draw;
    chart.draw = function () {
      originalDraw.apply(this, arguments);
      this.legend.legendItems.forEach(function (item) {
        if (item.text.length > 13) {
          // Change the number according to your preference
          item.text = item.text.substring(0, 13) + "...";
        }
      });
      drawCenterText();
    };

    chart.update();
  }, [dynamicNumber]);

  return (
    <Doughnut
      ref={chartRef}
      data={data}
      options={{
        plugins: {
          legend: {
            position: "right",
          },
        },
        cutout: "50%",
        maintainAspectRatio: false,
      }}
    />
  );
};

export default DoughnutChart;
