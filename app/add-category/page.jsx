"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { MdDone, MdArrowBack, MdOutlineGridView } from "react-icons/md";
import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import IconComponent from "../../components/IconComponent";
import { Suspense } from "react";

const Page = () => {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
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
  return (
    <Suspense>
      <div className="flex min-h-screen flex-col p-4 w-full">
        <div className="flex justify-between items-center">
          <Button variant="outline" size="icon" asChild>
            <Link href="/add-transaction">
              <MdArrowBack />
            </Link>
          </Button>{" "}
          <Suspense>Add {type} category </Suspense>
          <Button size="icon" asChild>
            <Link href="/">
              <MdDone />
            </Link>
          </Button>
        </div>
        <div className="flex gap-2   items-center py-4">
          <div
            className="rounded-full h-8 w-8  bg-primary text-primary-foreground shadow"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              aspectRatio: "1",
              margin: "0px",
              padding: "0px",
            }}
          >
            <MdOutlineGridView size="24" />
          </div>
          <Input type="text" placeholder="Category Name" />
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
              onClick={() => setCategory(category.title)}
              key={index}
            >
              <IconComponent title={category.title} type={category.type} />

              {category.title}
            </div>
          ))}
        </div>
      </div>
    </Suspense>
  );
};
export default Page;
