import React from "react";
import DoughnutChart from "@/components/ui/chart";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { FaBowlFood } from "react-icons/fa6";
import IconComponent from "./IconComponent";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoubleTab = ({ transactionsData, type, dynamicNumber }) => {
  const colors = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF8C00",
    "#00CED1",
    "#9370DB",
    "#FF1493",
    "#32CD32",
  ];

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const generateRandomColors = (count) => {
    const shuffledColors = shuffleArray([...colors]);
    return shuffledColors.slice(0, count);
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

  const chartData = {
    labels: groupedData.map((transaction) => transaction.title),
    datasets: [
      {
        label: type.charAt(0).toUpperCase() + type.slice(1),
        data: groupedData.map((transaction) => transaction.amount),
        backgroundColor: generateRandomColors(groupedData.length),
        borderColor: "#fff",
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <div className=" rounded-md  border border-rose-100 mb-2 p-4">
        <div className="w-full h-fit">
          <DoughnutChart data={chartData} dynamicNumber={dynamicNumber} />
        </div>
      </div>
      <div className=" rounded-md  border border-rose-100 mb-2">
        <div className="flex justify-between text-xs bg-rose-100 p-2 ">
          {type.charAt(0).toUpperCase() + type.slice(1) + "List"}
        </div>
        {groupedData.map((transaction) => (
          <div
            key={transaction.id}
            className="flex justify-between items-center p-2"
          >
            <div className="flex items-center gap-2 text-sm">
              <IconComponent
                title={transaction.title}
                type={transaction.type}
              />
              {transaction.title}
            </div>
            <div className="text-sm">{transaction.amount}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DoubleTab;
