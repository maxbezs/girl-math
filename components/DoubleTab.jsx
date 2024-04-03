import React from "react";
import DoughnutChart from "@/components/ui/chart";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { FaBowlFood } from "react-icons/fa6";
import IconComponent from "./IconComponent";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoubleTab = ({ transactionsData, type, dynamicNumber, theme }) => {
  const baseColors = [
    "#FFB8CA", // Lightest
    "#85002A", // Darkest
  ];

  const generateGradientColors = (colorStart, colorEnd, count) => {
    if (count === 1) {
      return [baseColors[0]];
    }
    const start = {
      hex: colorStart,
      r: parseInt(colorStart.slice(1, 3), 16),
      g: parseInt(colorStart.slice(3, 5), 16),
      b: parseInt(colorStart.slice(5, 7), 16),
    };
    const end = {
      hex: colorEnd,
      r: parseInt(colorEnd.slice(1, 3), 16),
      g: parseInt(colorEnd.slice(3, 5), 16),
      b: parseInt(colorEnd.slice(5, 7), 16),
    };
    let colors = [];

    for (let i = 0; i < count; i++) {
      let r = Math.round(
        start.r + (end.r - start.r) * (i / (count - 1))
      ).toString(16);
      let g = Math.round(
        start.g + (end.g - start.g) * (i / (count - 1))
      ).toString(16);
      let b = Math.round(
        start.b + (end.b - start.b) * (i / (count - 1))
      ).toString(16);
      colors.push(
        `#${r.padStart(2, "0")}${g.padStart(2, "0")}${b.padStart(2, "0")}`
      );
    }

    return colors;
  };

  const groupTransactions = (data) => {
    return data
      .filter((t) => t.type === type)
      .reduce((acc, transaction) => {
        const existingTransaction = acc.find(
          (t) => t.title === transaction.title
        );
        if (existingTransaction) {
          existingTransaction.amount += parseFloat(transaction.amount);
        } else {
          acc.push({
            ...transaction,
            amount: parseFloat(transaction.amount),
          });
        }
        return acc;
      }, []);
  };
  const groupedData = groupTransactions(transactionsData);

  groupedData.sort((a, b) => b.amount - a.amount);

  const chartColors = generateGradientColors(
    baseColors[0],
    baseColors[1],
    groupedData.length
  );

  const chartData = {
    labels: groupedData.map((transaction) => transaction.title),
    datasets: [
      {
        label: type.charAt(0).toUpperCase() + type.slice(1),
        data: groupedData.map((transaction) => transaction.amount),
        backgroundColor: chartColors.length > 1 ? chartColors : [baseColors[0]], // Check for a single transaction
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div className=" rounded-md  border border-muted mb-2 p-4">
        <div className="w-full h-fit">
          <DoughnutChart
            data={chartData}
            dynamicNumber={dynamicNumber}
            theme={theme}
          />
        </div>
      </div>
      <div className=" rounded-md  border border-muted mb-2">
        <div className="flex justify-between text-xs bg-muted p-2 ">
          {type.charAt(0).toUpperCase() + type.slice(1) + "List"}
        </div>
        {groupedData.map((transaction, index) => (
          <div
            key={transaction.id}
            className={`flex justify-between items-center p-2 ${
              index < groupedData.length - 1 ? "border-b border-muted" : ""
            }`}
          >
            <div className="flex items-center gap-2 text-sm">
              <IconComponent
                title={transaction.title}
                type={transaction.type}
              />
              {transaction.title}
            </div>
            <div className="text-sm">
              {Math.round(transaction.amount * 100) / 100}
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DoubleTab;
