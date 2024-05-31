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
  