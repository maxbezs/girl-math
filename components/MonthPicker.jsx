"use client";
import React, { useState } from "react";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdKeyboardArrowDown,
} from "react-icons/md";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";

const MonthPicker = ({ onMonthChange }) => {
  const [selectedMonthData, setSelectedMonthData] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  const changeYear = (newYear) => {
    setSelectedMonthData((prev) => ({ ...prev, year: newYear }));
  };

  const changeMonth = (newMonth) => {
    setSelectedMonthData((prev) => ({
      ...prev,
      month: newMonth + 1,
    }));
    onMonthChange(new Date(selectedMonthData.year, newMonth));
  };

  const getMonthNames = (locale = "en", format = "short") => {
    return Array.from({ length: 12 }, (_, i) =>
      new Date(0, i).toLocaleString(locale, { month: format })
    );
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            {selectedMonthData.monthName ??
              new Date(
                selectedMonthData.year,
                selectedMonthData.month - 1
              ).toLocaleString("en", { month: "long" })}{" "}
            {selectedMonthData.year}
            <MdKeyboardArrowDown size="16" style={{ marginLeft: "4px" }} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="flex justify-between items-center">
            <Button
              variant="outline"
              size="icon"
              onClick={() => changeYear(selectedMonthData.year - 1)}
              aria-label="Previous Year"
            >
              <MdKeyboardArrowLeft />
            </Button>
            <span>{selectedMonthData.year}</span>
            <Button
              variant="outline"
              size="icon"
              onClick={() => changeYear(selectedMonthData.year + 1)}
              aria-label="Next Year"
            >
              <MdKeyboardArrowRight />
            </Button>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(6, auto)",
              gridTemplateRows: "repeat(2, auto)",
            }}
          >
            {getMonthNames().map((monthName, index) => (
              <DropdownMenuItem className="w-fit p-1" key={index}>
                <Button
                  className="p-2 w-full"
                  variant="secondary"
                  onClick={(e) => changeMonth(index)}
                >
                  {monthName}
                </Button>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default MonthPicker;
