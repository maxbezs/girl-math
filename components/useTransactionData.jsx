"use client";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase/firebase";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { format, parseISO } from "date-fns";

const useTransactionData = (currentUser) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [transactionsData, setTransactionsData] = useState([]);
  const [transactionSummary, setTransactionSummary] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTransactions = async () => {
      if (!currentUser) return;

      setLoading(true);
      const transactionsRef = collection(
        db,
        "users",
        currentUser.uid,
        "transactions"
      );
      const startDate = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth(),
        1
      );
      const endDate = new Date(
        selectedDate.getFullYear(),
        selectedDate.getMonth() + 1,
        0
      );

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
        transactions.push({ id: doc.id, ...data });
      });

      setTransactionsData(formatFirestoreTimestamps(transactions));
      setLoading(false);
    };

    fetchTransactions();
  }, [selectedDate, currentUser]);

  const formatFirestoreTimestamps = (data) => {
    return data.map((item) => {
      const date = new Date(
        item.date.seconds * 1000 + item.date.nanoseconds / 1e6
      );
      const isoString = date.toISOString();
      return { ...item, date: isoString };
    });
  };

  useEffect(() => {
    setTransactionSummary(summarizeTransactions(transactionsData));
  }, [transactionsData]);

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

  const changeMonth = (month) => {
    setSelectedDate(new Date(selectedDate.getFullYear(), month));
  };

  const changeYear = (year) => {
    setSelectedDate(new Date(year, selectedDate.getMonth()));
  };

  return {
    selectedDate,
    transactionsData,
    transactionSummary,
    loading,
    changeMonth,
    changeYear,
  };
};
