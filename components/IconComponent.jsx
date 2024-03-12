import React from "react";
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
const getCategoryIcon = (title, type) => {
  const categories =
    type === "expenses" ? expensesCategories : incomeCategories;
  const category = categories.find((category) => category.title === title);
  return category ? category.icon : null;
};

const IconComponent = ({ title, type }) => {
  const icon = getCategoryIcon(title, type);

  return (
    <div
      className="rounded-full h-8 w-8 bg-primary text-primary-foreground shadow"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        aspectRatio: "1",
        margin: "0px",
        padding: "0px",
        width: "36px",
        height: "36px",
      }}
    >
      {icon}
    </div>
  );
};

const expensesCategories = [
  { title: "Restaurants", icon: <MdRestaurantMenu size="24" /> },
  { title: "Rent", icon: <MdHome size="24" /> },
  { title: "Grocery", icon: <MdLocalGroceryStore size="24" /> },
  { title: "Transport", icon: <MdDirectionsBus size="24" /> },
  { title: "Spa", icon: <MdSpa size="24" /> },
  { title: "Taxi", icon: <MdLocalTaxi size="24" /> },
  { title: "Chemicals", icon: <MdCleanHands size="24" /> },
  { title: "Phone", icon: <MdLocalPhone size="24" /> },
  { title: "Beauty", icon: <MdFaceRetouchingNatural size="24" /> },
  { title: "Cloth", icon: <IoMdShirt size="24" /> },
  { title: "Delivery", icon: <MdFoodBank size="24" /> },
];

const incomeCategories = [
  { title: "Salary", icon: <BsCash size="24" /> },
  { title: "Freelancing", icon: <MdWork size="24" /> },
  { title: "Investments", icon: <FaBitcoin size="24" /> },
  { title: "Gifts", icon: <IoGiftSharp size="24" /> },
];

export default IconComponent;
