"use client";
import React, { useState } from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MdAdd } from "react-icons/md";

const TransitionType = () => {
  const [type, setType] = useState("expenses");

  return (
    <>
      <TabsList className=" w-fit grid-cols-2">
        <TabsTrigger value="expenses" onClick={() => setType("expenses")}>
          Expenses
        </TabsTrigger>
        <TabsTrigger value="income" onClick={() => setType("income")}>
          Income
        </TabsTrigger>
      </TabsList>
      <Button variant="outline" size="icon" asChild>
        <Link href={`/add-category?type=${type}`}>
          <MdAdd />
        </Link>
      </Button>
    </>
  );
};

export default TransitionType;
