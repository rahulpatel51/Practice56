"use client"

import { useState } from "react"
import { Bell, Check, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Notification {
  id: string
  title: string
  message: string
  time: string
  type: "order" | "system" | "payment" | "alert"
  read: boolean
}

const notifications: Notification[] = [
  {
    id: "notif-001",
    title: "New Order Received",
    message: "You have received a new order #ORD-12345 from John Doe.",
    time: "10 minutes ago",
    type: "order",
    read: false,
  },
  {
    id: "notif-002",
    title: "Payment Successful",
    message: "Payment of ₹12,500 has been received for order #ORD-12345.",
    time: "25 minutes ago",
    type: "payment",
    read: false,
  },
  {
    id: "notif-003",
    title: "System Update",
    message: "The system will undergo maintenance on July 25, 2023 at 2:00 AM IST.",
    time: "1 hour ago",
    type: "system",
    read: false,
  },
  {
    id: "notif-004",
    title: "Low Stock Alert",
    message: "Product 'Stainless Steel Water Bottle' is running low on stock (8 remaining).",
    time: "3 hours ago",
    type: "alert",
    read: true,
  },
  {
    id: "notif-005",
    title: "New Order Received",
    message: "You have received a new order #ORD-12346 from Jane Smith.",
    time: "5 hours ago",
    type: "order",
    read: true,
  },
  {
    id: "notif-006",
    title: "Payment Failed",
    message: "Payment for order #ORD-12347 has failed. Please contact the customer.",
    time: "Yesterday",
    type: "payment",
    read: true,
  },
  {
    id: "notif-007",
    title: "System Update Completed",
    message: "The system update has been completed successfully.",
    time: "2 days ago",
    type: "system",
    read: true,
  },
]

export default function NotificationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeNotifications, setActiveNotifications] = useState(notifications)

  const markAllAsRead = () => {
    setActiveNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })))
  }

  const getTypeIcon = (type: Notification["type"]) => {
    switch (type) {
      case "order":
        return (
          <div className="bg-blue-500 p-2 rounded-full">
            <Bell className="h-5 w-5 text-white" />
          </div>
        )
      case "payment":
        return (
          <div className="bg-green-500 p-2 rounded-full">
            <Bell className="h-5 w-5 text-white" />
          </div>
        )
      case "system":
        return (
          <div className="bg-purple-500 p-2 rounded-full">
            <Bell className="h-5 w-5 text-white" />
          </div>
        )
      case "alert":
        return (
          <div className="bg-amber-500 p-2 rounded-full">
            <Bell className="h-5 w-5 text-white" />
          </div>
        )
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-gray-400">Stay updated with your store activities</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="border-gray-700 bg-[#1e293b] text-white hover:bg-gray-800"
            onClick={markAllAsRead}
          >
            <Check className="mr-2 h-4 w-4" />
            Mark All as Read
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search notifications..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-[#1e293b] border-gray-700 text-white w-full"
          />
        </div>
        <Button variant="outline" className="border-gray-700 bg-[#1e293b] text-white hover:bg-gray-800">
          <Filter className="mr-2 h-4 w-4" />
          All Types
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

      {/* Notifications Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="bg-[#1e293b] border border-gray-800">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="unread">Unread</TabsTrigger>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="system">System</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6">
          <div className="bg-[#1e293b] rounded-lg border border-gray-800 divide-y divide-gray-800">
            {activeNotifications.map((notification) => (
              <div key={notification.id} className={`p-4 flex gap-4 ${notification.read ? "opacity-70" : ""}`}>
                <div className="flex-shrink-0 mt-1">{getTypeIcon(notification.type)}</div>
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold text-base">
                      {notification.title}
                      {!notification.read && (
                        <span className="ml-2 inline-block w-2 h-2 bg-[#2dd4bf] rounded-full"></span>
                      )}
                    </h3>
                    <span className="text-xs text-gray-400">{notification.time}</span>
                  </div>
                  <p className="text-gray-300 text-sm mt-1">{notification.message}</p>
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="unread" className="mt-6">
          <div className="bg-[#1e293b] rounded-lg border border-gray-800 divide-y divide-gray-800">
            {activeNotifications
              .filter((n) => !n.read)
              .map((notification) => (
                <div key={notification.id} className="p-4 flex gap-4">
                  <div className="flex-shrink-0 mt-1">{getTypeIcon(notification.type)}</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-semibold text-base">
                        {notification.title}
                        <span className="ml-2 inline-block w-2 h-2 bg-[#2dd4bf] rounded-full"></span>
                      </h3>
                      <span className="text-xs text-gray-400">{notification.time}</span>
                    </div>
                    <p className="text-gray-300 text-sm mt-1">{notification.message}</p>
                  </div>
                </div>
              ))}
          </div>
        </TabsContent>

        {/* Other tab contents would be similar */}
      </Tabs>
    </div>
  )
}

