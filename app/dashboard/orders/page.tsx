"use client"

import { useState } from "react"
import { Download, Filter, Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { OrdersTable } from "@/components/dashboard/orders/orders-table"

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Orders</h1>
          <p className="text-gray-400">Manage and track your customer orders</p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-[#2dd4bf] hover:bg-[#2dd4bf]/90 text-black">
            <Plus className="mr-2 h-4 w-4" />
            New Order
          </Button>
          <Button variant="outline" className="border-gray-700 bg-[#1e293b] text-white hover:bg-gray-800">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-[#1e293b] border-gray-700 text-white w-full"
          />
        </div>
        <Button variant="outline" className="border-gray-700 bg-[#1e293b] text-white hover:bg-gray-800">
          <Filter className="mr-2 h-4 w-4" />
          All Statuses
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ml-2 h-4 w-4"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </Button>
        <Button variant="outline" className="border-gray-700 bg-[#1e293b] text-white hover:bg-gray-800">
          More Filters
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="ml-2 h-4 w-4"
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </Button>
      </div>

      {/* Orders Table */}
      <OrdersTable />
    </div>
  )
}

