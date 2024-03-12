"use client";
import React, { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { updateDoc, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import IconComponent from "@/components/IconComponent";
import { format, parseISO } from "date-fns";
import { MdOutlineCalendarMonth } from "react-icons/md";
import enUS from "date-fns/locale/en-US"; // Import the locale you want to use
import { navigate } from "../../components/actions";
import { MdArrowBack } from "react-icons/md";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
export default function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const uid = searchParams.get("uid");
  const title0 = searchParams.get("title");
  const type0 = searchParams.get("type");
  const amount0 = searchParams.get("amount");
  const date0 = searchParams.get("date");

  const expensesCategories = [
    { title: "Restaurants", type: "expenses" },
    { title: "Rent", type: "expenses" },
    { title: "Grocery", type: "expenses" },
    { title: "Transport", type: "expenses" },
    { title: "Spa", type: "expenses" },
    { title: "Taxi", type: "expenses" },
    { title: "Chemicals", type: "expenses" },
    { title: "Phone", type: "expenses" },
    { title: "Beauty", type: "expenses" },
    { title: "Cloth", type: "expenses" },
    { title: "Delivery", type: "expenses" },
  ];

  const incomeCategories = [
    { title: "Salary", type: "income" },
    { title: "Freelancing", type: "income" },
    { title: "Investments", type: "income" },
    { title: "Gifts", type: "income" },
  ];

  const categories = "expenses" ? expensesCategories : incomeCategories;
  const [title, setTitle] = useState(title0);

  const [amount, setAmount] = useState(amount0);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [date, setDate] = useState(new Date(date0));
  const [type, setType] = useState(type0);
  const updateTransaction = async (title, amount, date, type) => {
    try {
      await updateDoc(doc(db, "users", uid, "transactions", id), {
        title: title,
        amount: amount,
        date: date, // Ensure date is in ISO string format
        type: type,
        memo: title,
      });
      navigate();
    } catch (error) {
      console.error("Error updating transaction: ", error);
    }
  };
  const buttonGroups = [
    ["7", "8", "9", ""],
    ["4", "5", "6", "+"],
    ["1", "2", "3", "-"],
    [".", "0", "C", amount?.includes("+") || amount?.includes("-") ? "=" : "✓"],
  ];
  const handleDayClick = (day) => {
    setDate(new Date(day));
    setCalendarOpen(false);
  };
  return (
    <Suspense>
      <div className="flex justify-between p-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/">
            <MdArrowBack />
          </Link>
        </Button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(40px, 1fr))",
          gridTemplateRows: "repeat(auto-fill, minmax(40px, 1fr))",
          alignItems: "center",
          justifyItems: "center",
          gap: "12px",
          paddingBlock: "8px",
          paddingInline: "16px",
        }}
      >
        {categories.map((category, index) => (
          <div
            className="flex flex-col items-center justify-center"
            onClick={() => setTitle(category.title)}
            key={index}
          >
            <IconComponent title={category.title} type={category.type} />

            {category.title}
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 w-full border-t">
        <div className="flex gap-2 p-2 m-2 items-center">
          <Suspense>
            <IconComponent title={title} type={type} />
            <Input type="text" placeholder={title} />
            <div className="text-left flex items-center">{amount || "0"}</div>
          </Suspense>
        </div>

        <div className="border-t">
          {buttonGroups.map((group, index) => (
            <div
              key={index}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
              }}
              className="divide-x"
            >
              {group.map((btn, btnIndex) =>
                btn === "✓" ? (
                  <button
                    key={btnIndex}
                    onClick={() => updateTransaction(title, amount, date, type)}
                    className={`p-4 ${btnIndex !== 3 ? "border-r" : ""} ${
                      index !== 3 ? "border-b" : ""
                    }`}
                  >
                    {btn}
                  </button>
                ) : btn ? (
                  <button
                    key={btnIndex}
                    onClick={
                      btn === "C"
                        ? () => setAmount(amount.slice(0, -1))
                        : btn === "="
                        ? () => setAmount(eval(amount).toString())
                        : () => setAmount(amount + btn)
                    }
                    className={`p-4 ${btnIndex !== 3 ? "border-r" : ""} ${
                      index !== 3 ? "border-b" : ""
                    }`}
                  >
                    {btn}
                  </button>
                ) : (
                  <Dialog open={calendarOpen} onOpenChange={setCalendarOpen}>
                    <DialogTrigger asChild>
                      <button
                        key={btnIndex}
                        className={cn(
                          "w-full flex flex-col items-center justify-start m-0 p-3 border-b",
                          !date && "text-muted-foreground"
                        )}
                      >
                        <MdOutlineCalendarMonth className="h-4 w-4" />
                        <span className="text-sm">{format(date, "MM/dd")}</span>
                      </button>
                    </DialogTrigger>
                    <DialogContent>
                      <Calendar
                        mode="single"
                        selected={date}
                        onDayClick={handleDayClick}
                      />
                    </DialogContent>
                  </Dialog>
                )
              )}
            </div>
          ))}
        </div>
      </div>
    </Suspense>
  );
}
