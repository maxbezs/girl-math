"use client";
import {
  MdHome,
  MdLocalGroceryStore,
  MdRestaurantMenu,
  MdDirectionsBus,
  MdSpa,
  MdLocalTaxi,
  MdCleanHands,
  MdLocalPhone,
  MdFaceRetouchingNatural,
  MdFoodBank,
  MdWork,
} from "react-icons/md";
import { IoGiftSharp } from "react-icons/io5";
import { IoMdShirt } from "react-icons/io";
import { BsCash } from "react-icons/bs";
import { FaBitcoin } from "react-icons/fa";
import IconComponent from "./IconComponent";
import { format } from "date-fns";
import { MdOutlineCalendarMonth } from "react-icons/md";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase/firebase";
import { navigate } from "./actions.js";
import DrawerButtonCategory from "../components/DrawerButtonCategory";
import { useState } from "react";
const CategoryGrid = ({ type, uid }) => {
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

  const categories =
    type === "expenses" ? expensesCategories : incomeCategories;
  const [category, setCategory] = useState(
    type === "expenses" ? "Restaurants" : "Salary"
  );

  const [input, setInput] = useState("");
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [date, setDate] = useState(new Date());

  const addTransaction = async (title, input, date) => {
    try {
      const docRef = await addDoc(
        collection(db, "users", uid, "transactions"),
        {
          title: title,
          amount: input,
          date: date,
          type: type,
          memo: title,
        }
      );
      console.log("Document written with ID: ", docRef.id);
      setInput("");
      navigate();
    } catch (error) {
      console.error("Error adding transaction: ", error);
    }
  };

  const buttonGroups = [
    ["7", "8", "9", ""],
    ["4", "5", "6", "+"],
    ["1", "2", "3", "-"],
    [".", "0", "C", input.includes("+") || input.includes("-") ? "=" : "✓"],
  ];

  const handleDayClick = (day) => {
    setDate(day);
    setCalendarOpen(false);
  };
  return (
    <>
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
            onClick={() => setCategory(category.title)}
            key={index}
          >
            <IconComponent title={category.title} type={category.type} />

            {category.title}
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 w-full border-t">
        <div className="flex gap-2 p-2 m-2 items-center">
          <IconComponent title={category} type={type} />
          <Input type="text" placeholder={category} />
          <div className="text-left flex items-center">{input || "0"}</div>
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
                    onClick={() => addTransaction(category, input, date)}
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
                        ? () => setInput(input.slice(0, -1))
                        : btn === "="
                        ? () => setInput(eval(input).toString())
                        : () => setInput(input + btn)
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
    </>
  );
};

export default CategoryGrid;
