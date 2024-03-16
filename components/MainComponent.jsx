"use client";
import React, { useEffect, useState } from "react";
import { db } from "@/lib/firebase/firebase";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import DoubleTab from "../components/DoubleTab";
import { MdAdd } from "react-icons/md";
import MonthPicker from "@/components/MonthPicker";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format, parseISO } from "date-fns";
import TransationComponent from "../components/TransactionComponent";
import SideMenu from "@/components/SideMenu";
import Link from "next/link";
import { useTheme } from "next-themes";

const MainComponent = ({ currentUser }) => {
  const [transactionsData, setTransactionsData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const theme = useTheme();

  async function getTransactionsForMonth(month) {
    const transactionsRef = collection(
      db,
      "users",
      currentUser.uid,
      "transactions"
    );

    const startDate = new Date(month.getFullYear(), month.getMonth(), 1);
    const endDate = new Date(month.getFullYear(), month.getMonth() + 1, 0);

    const q = query(
      transactionsRef,
      where("date", ">=", startDate),
      where("date", "<=", endDate),
      orderBy("date", "desc")
    );

    const querySnapshot = await getDocs(q);
    const transactions = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      transactions.push({
        id: doc.id,
        ...data,
      });
    });

    const formattedData = formatFirestoreTimestamps(transactions);
    setTransactionsData(formattedData);
  }
  useEffect(() => {
    getTransactionsForMonth(selectedMonth);
  }, [currentUser, selectedMonth]);

  function formatFirestoreTimestamps(data) {
    return data.map((item) => {
      const date = new Date(
        item.date.seconds * 1000 + item.date.nanoseconds / 1e6
      );
      const isoString = date.toISOString();
      return { ...item, date: isoString };
    });
  }

  const summarizeTransactions = (transactions) => {
    const summary = {};
    transactions.forEach((transaction) => {
      const date = format(parseISO(transaction.date), "dd.MM.yyyy");

      if (!summary[date]) {
        summary[date] = {
          totalIncome: 0,
          totalExpenses: 0,
          transactions: [],
        };
      }
      if (transaction.type === "income") {
        summary[date].totalIncome += parseFloat(transaction.amount);
      } else {
        summary[date].totalExpenses += parseFloat(transaction.amount);
      }
      summary[date].transactions.push(transaction);
    });
    return summary;
  };

  const getDynamicNumber = (type) => {
    return transactionsData
      .filter((t) => t.type === type)
      .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
  };

  const transactionSummary = summarizeTransactions(transactionsData);

  return (
    <div>
      <div className="flex justify-between ">
        <SideMenu currentUser={currentUser} />
        <MonthPicker onMonthChange={setSelectedMonth} />
        <Button size="icon" asChild>
          <Link href="/add-edit-transaction">
            <MdAdd />
          </Link>
        </Button>
      </div>
      <Tabs defaultValue="balance" className="w-full  h-fit">
        <TabsList className="grid w-full grid-cols-3 my-2">
          <TabsTrigger value="income">
            <div>
              Income: <div>{getDynamicNumber("income")}</div>
            </div>
          </TabsTrigger>
          <TabsTrigger value="expenses">
            <div>
              Expenses: <div>{getDynamicNumber("expenses")}</div>
            </div>
          </TabsTrigger>
          <TabsTrigger value="balance">
            <div>
              Balance:{" "}
              <div>
                {getDynamicNumber("income") - getDynamicNumber("expenses")}
              </div>
            </div>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="income">
          <DoubleTab
            transactionsData={transactionsData}
            type={"income"}
            dynamicNumber={getDynamicNumber("income")}
            theme={theme}
          />
        </TabsContent>
        <TabsContent value="expenses">
          <DoubleTab
            transactionsData={transactionsData}
            type={"expenses"}
            dynamicNumber={getDynamicNumber("expenses")}
            theme={theme}
          />
        </TabsContent>
        <TabsContent value="balance">
          <TransationComponent
            transactionSummary={transactionSummary}
            uid={currentUser.uid}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MainComponent;
