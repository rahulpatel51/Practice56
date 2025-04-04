"use client"

import { RefreshCcw } from "lucide-react"
import { StatCard } from "@/components/dashboard/stat-card"
import { RevenueChart } from "@/components/dashboard/revenue-chart"
import { SalesChart } from "@/components/dashboard/sales-chart"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function DashboardPage() {
  const [isRefreshing, setIsRefreshing] = useState(false)

  const handleRefresh = () => {
    setIsRefreshing(true)
    // Simulate data refresh (replace with actual data fetching)
    setTimeout(() => {
      setIsRefreshing(false)
    }, 1500) // 1.5 seconds delay to simulate loading
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold gradient-text">Dashboard Overview</h1>
        <Button 
          className="btn-primary"
          onClick={handleRefresh}
          disabled={isRefreshing}
        >
          {isRefreshing ? (
            <RefreshCcw className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <RefreshCcw className="mr-2 h-4 w-4" />
          )}
          {isRefreshing ? "Refreshing..." : "Refresh Data"}
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          title="Total Revenue" 
          value="₹24,78,000" 
          change="+12.5%" 
          icon="dollar" 
          iconColor="bg-[#00e0ff]" 
          isLoading={isRefreshing}
        />
        <StatCard 
          title="Total Orders" 
          value="1,245" 
          change="+8.2%" 
          icon="cart" 
          iconColor="bg-[#00a3ff]" 
          isLoading={isRefreshing}
        />
        <StatCard 
          title="Total Products" 
          value="450" 
          change="+5.3%" 
          icon="box" 
          iconColor="bg-[#00e0ff]" 
          isLoading={isRefreshing}
        />
        <StatCard 
          title="Total Customers" 
          value="2,456" 
          change="+6.7%" 
          icon="users" 
          iconColor="bg-[#00a3ff]" 
          isLoading={isRefreshing}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueChart isLoading={isRefreshing} />
        <SalesChart isLoading={isRefreshing} />
      </div>
    </div>
  )
}

