import React, { useEffect, useState } from "react";
import axiosJWT from "../../utils/axiosService";
import { USER_API } from "../../constants";
import showToast from "../../utils/toaster";
import { format } from "date-fns";

interface Transaction {
    _id: string;
    walletId: string;
    userId: string;
    amount: number;
    type: "Credit" | "Debit";
    description: string;
    createdAt: string;
    updatedAt: string;
  }


const TransactionPage: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axiosJWT.get(`${USER_API}/transactions`);
        console.log(response,"popopo")
        setTransactions(response.data.transaction);
      } catch (error) {
        showToast("Oops! Something went wrong", "error");
      }
    };

    fetchTransactions();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-8 mt-10">Wallet Transactions</h1>
      <table className="min-w-full bg-white shadow-md rounded mb-10">
        <thead>
          <tr>
            <th className="py-2 px-4 bg-gray-200 text-left">Date</th>
            <th className="py-2 px-4 bg-gray-200 text-left">Type</th>
            <th className="py-2 px-4 bg-gray-200 text-left">Amount</th>
            <th className="py-2 px-4 bg-gray-200 text-left">Description</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction, index) => (
            <tr key={index} className="border-b">
              <td className="py-2 px-4 text-left">{format(new Date(transaction.createdAt), "yyyy-MM-dd")}</td>
              <td
                className={`py-2 px-4 text-left ${
                  transaction.type === "Credit"
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {transaction.type.charAt(0).toUpperCase() +
                  transaction.type.slice(1)}
              </td>
              <td className="py-2 px-4 text-left">{transaction.amount}</td>
              <td className="py-2 px-4 text-left">
                {transaction.type === "Credit"
                  ? "Refund Amount"
                  : "Wallet Payment"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionPage;
