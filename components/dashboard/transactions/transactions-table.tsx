"use client"

interface Transaction {
  id: string
  date: string
  description: string
  amount: string
  type: "Credit" | "Debit"
  status: "Completed" | "Pending" | "Failed"
  account: string
}

const transactions: Transaction[] = [
  {
    id: "TXN-12345",
    date: "2023-07-15",
    description: "Payment from John Doe",
    amount: "₹12,500",
    type: "Credit",
    status: "Completed",
    account: "HDFC Bank ****1234",
  },
  {
    id: "TXN-12346",
    date: "2023-07-14",
    description: "Supplier Payment",
    amount: "₹8,750",
    type: "Debit",
    status: "Completed",
    account: "ICICI Bank ****5678",
  },
  {
    id: "TXN-12347",
    date: "2023-07-14",
    description: "Subscription Renewal",
    amount: "₹5,200",
    type: "Debit",
    status: "Completed",
    account: "HDFC Bank ****1234",
  },
  {
    id: "TXN-12348",
    date: "2023-07-13",
    description: "Payment from Emily Davis",
    amount: "₹15,800",
    type: "Credit",
    status: "Completed",
    account: "HDFC Bank ****1234",
  },
  {
    id: "TXN-12349",
    date: "2023-07-12",
    description: "Office Supplies",
    amount: "₹3,600",
    type: "Debit",
    status: "Completed",
    account: "ICICI Bank ****5678",
  },
  {
    id: "TXN-12350",
    date: "2023-07-12",
    description: "Payment from Sarah Brown",
    amount: "₹9,300",
    type: "Credit",
    status: "Pending",
    account: "HDFC Bank ****1234",
  },
  {
    id: "TXN-12351",
    date: "2023-07-11",
    description: "Utility Bill",
    amount: "₹7,450",
    type: "Debit",
    status: "Completed",
    account: "HDFC Bank ****1234",
  },
]

export function TransactionsTable() {
  const getStatusColor = (status: Transaction["status"]) => {
    switch (status) {
      case "Completed":
        return "text-green-500"
      case "Pending":
        return "text-amber-500"
      case "Failed":
        return "text-red-500"
    }
  }

  const getTypeColor = (type: Transaction["type"]) => {
    switch (type) {
      case "Credit":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "Debit":
        return "bg-red-500/10 text-red-500 border-red-500/20"
    }
  }

  return (
    <div className="bg-[#1e293b] rounded-lg border border-gray-800 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#0f172a] border-b border-gray-800">
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Transaction ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Account
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-[#1a2234]">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{transaction.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{transaction.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{transaction.description}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{transaction.amount}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getTypeColor(transaction.type)}`}
                  >
                    {transaction.type === "Credit" ? "↑ Credit" : "↓ Debit"}
                  </span>
                </td>
                <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${getStatusColor(transaction.status)}`}>
                  {transaction.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{transaction.account}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

