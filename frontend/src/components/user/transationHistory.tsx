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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage] = useState<number>(10);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axiosJWT.get(`${USER_API}/transactions`);
        setTransactions(response.data.transaction);
      } catch (error) {
        showToast("Oops! Something went wrong", "error");
      }
    };

    fetchTransactions();
  }, []);

  // Logic to paginate transactions
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

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
          {currentTransactions.map((transaction, index) => (
            <tr key={index} className="border-b">
              <td className="py-2 px-4 text-left">
                {format(new Date(transaction.createdAt), "yyyy-MM-dd")}
              </td>
              <td
                className={`py-2 px-4 text-left ${
                  transaction.type === "Credit" ? "text-green-500" : "text-red-500"
                }`}
              >
                {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
              </td>
              <td className="py-2 px-4 text-left">{transaction.amount}</td>
              <td className="py-2 px-4 text-left">
                {transaction.type === "Credit" ? "Refund Amount" : "Wallet Payment"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-center">
        <ul className="flex pl-0 list-none rounded my-2">
          {Array.from({ length: Math.ceil(transactions.length / itemsPerPage) }, (_, index) => (
            <li key={index}>
              <button
                className={`${
                  currentPage === index + 1 ? "bg-blue-900 text-white" : "text-blue-900 hover:text-blue-700"
                } cursor-pointer px-3 py-2`}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TransactionPage;
