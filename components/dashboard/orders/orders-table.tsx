"use client"

import { Eye, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Order {
  id: string
  customer: {
    name: string
    email: string
  }
  date: string
  items: number
  total: string
  status: "Completed" | "Processing" | "On Hold" | "Cancelled"
}

const orders: Order[] = [
  {
    id: "#ORD-12345",
    customer: {
      name: "John Doe",
      email: "john@example.com",
    },
    date: "2023-07-15",
    items: 3,
    total: "₹12,500",
    status: "Completed",
  },
  {
    id: "#ORD-12346",
    customer: {
      name: "Jane Smith",
      email: "jane@example.com",
    },
    date: "2023-07-14",
    items: 2,
    total: "₹8,750",
    status: "Processing",
  },
  {
    id: "#ORD-12347",
    customer: {
      name: "Robert Johnson",
      email: "robert@example.com",
    },
    date: "2023-07-14",
    items: 1,
    total: "₹5,200",
    status: "On Hold",
  },
  {
    id: "#ORD-12348",
    customer: {
      name: "Emily Davis",
      email: "emily@example.com",
    },
    date: "2023-07-13",
    items: 4,
    total: "₹15,800",
    status: "Completed",
  },
  {
    id: "#ORD-12349",
    customer: {
      name: "Michael Wilson",
      email: "michael@example.com",
    },
    date: "2023-07-12",
    items: 1,
    total: "₹3,600",
    status: "Cancelled",
  },
  {
    id: "#ORD-12350",
    customer: {
      name: "Sarah Brown",
      email: "sarah@example.com",
    },
    date: "2023-07-12",
    items: 2,
    total: "₹9,300",
    status: "Processing",
  },
  {
    id: "#ORD-12351",
    customer: {
      name: "David Miller",
      email: "david@example.com",
    },
    date: "2023-07-11",
    items: 3,
    total: "₹7,450",
    status: "Completed",
  },
]

export function OrdersTable() {
  const getStatusColor = (status: Order["status"]) => {
    switch (status) {
      case "Completed":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "Processing":
        return "bg-blue-500/10 text-blue-500 border-blue-500/20"
      case "On Hold":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20"
      case "Cancelled":
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
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Items</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-[#1a2234]">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{order.id}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium">{order.customer.name}</div>
                  <div className="text-sm text-gray-400">{order.customer.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">{order.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {order.items} {order.items === 1 ? "item" : "items"}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{order.total}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusColor(order.status)}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex justify-end gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-white">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

