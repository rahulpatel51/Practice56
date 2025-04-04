"use client"

import { useState } from "react"
import Link from "next/link"
import { Bell, Search } from "lucide-react"

export function DashboardHeader() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <header className="h-16 border-b border-gray-800 bg-[#0f172a] px-6 flex items-center justify-between fixed top-0 right-0 left-64 z-10">
      <div>
        <h1 className="text-xl font-bold gradient-text">Welcome back, Admin!</h1>
        <p className="text-sm text-gray-400">Here's what's happening today</p>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-[#1e293b] border border-gray-700 rounded-md py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-[#00e0ff] focus:ring-1 focus:ring-[#00e0ff] w-64 transition-all duration-200"
          />
        </div>

        <div className="relative">
          <Link href="/dashboard/notifications">
            <div className="relative p-2 rounded-full bg-[#1e293b] hover:bg-[#1e293b]/70 transition-colors duration-200">
              <Bell className="h-5 w-5 text-gray-400 hover:text-white transition-colors duration-200" />
              <span className="absolute -top-1 -right-1 bg-[#00e0ff] text-black text-xs rounded-full w-5 h-5 flex items-center justify-center shadow-lg">
                3
              </span>
            </div>
          </Link>
        </div>

        <Link href="/dashboard/profile">
          <div className="w-8 h-8 rounded-full bg-[#00e0ff] p-0.5 hover:shadow-lg hover:shadow-[#00e0ff]/20 transition-all duration-300">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Admin User"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </Link>
      </div>
    </header>
  )
}

