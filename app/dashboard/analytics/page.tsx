"use client"

import { useState } from "react"
import { Calendar, Download, Filter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnalyticsCard } from "@/components/dashboard/analytics/analytics-card"
import { VisitorChart } from "@/components/dashboard/analytics/visitor-chart"
import { TrafficSourceChart } from "@/components/dashboard/analytics/traffic-source-chart"

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("Last 30 days")

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold">Analytics</h1>
          <p className="text-gray-400">Detailed insights about your store performance</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="border-gray-700 bg-[#1e293b] text-white hover:bg-gray-800">
            <Calendar className="mr-2 h-4 w-4" />
            {dateRange}
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
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <Button className="bg-[#2dd4bf] hover:bg-[#2dd4bf]/90 text-black">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <AnalyticsCard
          title="Total Visits"
          value="128,450"
          change="+12.5% from last month"
          icon="users"
          iconColor="bg-[#2dd4bf]"
        />
        <AnalyticsCard
          title="Unique Visitors"
          value="96,345"
          change="+8.2% from last month"
          icon="user"
          iconColor="bg-blue-500"
        />
        <AnalyticsCard
          title="Bounce Rate"
          value="32.8%"
          change="+2.4% from last month"
          icon="activity"
          iconColor="bg-amber-500"
          changeType="negative"
        />
        <AnalyticsCard
          title="Avg. Session"
          value="3m 42s"
          change="+12.5% from last month"
          icon="clock"
          iconColor="bg-purple-500"
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <VisitorChart />
        <TrafficSourceChart />
      </div>
    </div>
  )
}

