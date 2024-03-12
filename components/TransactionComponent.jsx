import { Dialog, DialogTrigger, DialogContent } from "../components/ui/dialog";
import { FaUtensils } from "react-icons/fa";
import { MdAttachMoney } from "react-icons/md";
import DialogDynamicContent from "./DialogDynamicContent";
import IconComponent from "./IconComponent";
const TransactionComponent = ({ transactionSummary, uid }) => {
  return (
    <div className="transaction-list">
      {Object.entries(transactionSummary).map(([date, summary]) => (
        <div key={date} className="rounded-md border border-rose-100 mb-2">
          <div className="flex justify-between w-full text-xs bg-rose-100 p-2">
            <h2>{date}</h2>
            <div className="transaction-summary-label">
              Income: {summary.totalIncome} Expenses:
              {summary.totalExpenses}
            </div>
          </div>
          {summary.transactions.map((transaction, index) => (
            <Dialog key={transaction.id}>
              <DialogTrigger asChild>
                <div
                  key={transaction.id}
                  className={`flex justify-between items-center p-2 ${
                    index < transaction.length - 1
                      ? "border-b border-rose-100"
                      : ""
                  }`}
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
              </DialogTrigger>
              <DialogContent>
                <DialogDynamicContent transaction={transaction} uid={uid} />
              </DialogContent>
            </Dialog>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TransactionComponent;
