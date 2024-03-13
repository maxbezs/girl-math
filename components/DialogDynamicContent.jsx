"use client";
import React from "react";
import { MdAttachMoney } from "react-icons/md";
import { format, parseISO } from "date-fns";
import { db } from "@/lib/firebase/firebase";
import { doc, deleteDoc } from "firebase/firestore";
import { DialogClose } from "./ui/dialog";
import IconComponent from "./IconComponent";
import Link from "next/link";
export default function DialogDynamicContent({ transaction, uid }) {
  const formatDate = (dateString) => {
    try {
      const formattedDate = parseISO(dateString);
      return format(formattedDate, "dd.MM.yyyy");
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Invalid Date";
    }
  };
  const handleDelete = async (transactionId) => {
    try {
      await deleteDoc(doc(db, "users", uid, "transactions", transactionId));
      console.log("Transaction deleted successfully");
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center mb-4 gap-4">
        <IconComponent title={transaction.title} type={transaction.type} />
        <div>
          <div className="text-lg font-bold">{transaction.title}</div>
          <div className="text-sm text-gray-600">{transaction.type}</div>
        </div>
      </div>
      <div className="mb-4">
        <div className="text-sm font-semibold">Amount</div>
        <div className="text-lg">{transaction.amount}</div>{" "}
      </div>
      <div className="mb-4">
        <div className="text-sm font-semibold">Date</div>
        <div className="text-lg">{formatDate(transaction.date)}</div>{" "}
      </div>
      <div className="mb-4">
        <div className="text-sm font-semibold">Memo</div>
        <div className="text-lg">{transaction.title}</div>
      </div>
      <div className="flex justify-end gap-2">
        <DialogClose>
          <Link
            className="px-4 py-2 bg-blue-500 text-white rounded"
            href={`/add-edit-transaction?id=${transaction.id}&uid=${uid}&title=${transaction.title}&type=${transaction.type}&amount=${transaction.amount}&date=${transaction.date}`}
          >
            Edit
          </Link>
        </DialogClose>
        <DialogClose>
          <button
            className="px-4 py-2 bg-red-500 text-white rounded"
            onClick={() => handleDelete(transaction.id)}
          >
            Delete
          </button>
        </DialogClose>
      </div>
    </div>
  );
}
