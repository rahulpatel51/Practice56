"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart2,
  Box,
  HelpCircle,
  Home,
  LogOut,
  Settings,
  ShoppingCart,
  Users,
  Bell,
  User,
  FileText,
  ShoppingBag,
} from "lucide-react"

export function Sidebar() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <div className="w-64 h-screen bg-[#0f172a] border-r border-gray-800 flex flex-col fixed left-0 top-0 z-20">
      {/* Logo */}
      <div className="p-4 border-b border-gray-800">
        <Link href="/dashboard" className="flex items-center gap-2 group">
          <div className="bg-[#00e0ff] p-1.5 rounded-md shadow-lg group-hover:shadow-[#00e0ff]/20 transition-all duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-5 h-5 text-black"
            >
              <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
              <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
            </svg>
          </div>
          <span className="font-bold text-xl gradient-text">AdminHub</span>
        </Link>
      </div>

      {/* User Info */}
      <div className="p-4 border-b border-gray-800 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#00e0ff] p-0.5 shadow-lg">
          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="Admin User"
            className="w-full h-full object-cover rounded-full"
          />
        </div>
        <div>
          <h3 className="font-medium text-white">Admin User</h3>
          <p className="text-sm text-gray-300">admin@adminhub.com</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-4 overflow-y-auto no-scrollbar">
        {/* MAIN SECTION */}
        <div className="mb-6">
          <h3 className="px-4 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Main
          </h3>
          <nav className="space-y-1 px-3">
            <NavItem
              href="/dashboard"
              icon={<Home size={16} />}
              label="Dashboard"
              isActive={isActive("/dashboard")}
            />
            <NavItem
              href="/dashboard/analytics"
              icon={<BarChart2 size={16} />}
              label="Analytics"
              isActive={isActive("/dashboard/analytics")}
            />
          </nav>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mx-4 my-4"></div>

        {/* INVENTORY SECTION */}
        <div className="mb-6">
          <h3 className="px-4 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Inventory
          </h3>
          <nav className="space-y-1 px-3">
            <NavItem
              href="/dashboard/orders"
              icon={<ShoppingCart size={16} />}
              label="Orders"
              isActive={isActive("/dashboard/orders")}
              badge={12}
            />
             <NavItem
              href="/dashboard/category"
              icon={<ShoppingCart size={16} />}
              label="Category"
              isActive={isActive("/dashboard/category")}
            />
            <NavItem
              href="/dashboard/products"
              icon={<Box size={16} />}
              label="Products"
              isActive={isActive("/dashboard/products")}
            />
          </nav>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mx-4 my-4"></div>

        {/* MANAGEMENT SECTION */}
        <div className="mb-6">
          <h3 className="px-4 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Management
          </h3>
          <nav className="space-y-1 px-3">
            <NavItem
              href="/dashboard/employees"
              icon={<Users size={16} />}
              label="Employees"
              isActive={isActive("/dashboard/employees")}
            />
            <NavItem
              href="/dashboard/transactions"
              icon={<FileText size={16} />}
              label="Transactions"
              isActive={isActive("/dashboard/transactions")}
            />
          </nav>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 mx-4 my-4"></div>

        {/* ACCOUNT SECTION */}
        <div className="mb-6">
          <h3 className="px-4 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Account
          </h3>
          <nav className="space-y-1 px-3">
            <NavItem
              href="/dashboard/profile"
              icon={<User size={16} />}
              label="Profile"
              isActive={isActive("/dashboard/profile")}
            />
            <NavItem
              href="/dashboard/notifications"
              icon={<Bell size={16} />}
              label="Notifications"
              isActive={isActive("/dashboard/notifications")}
              badge={3}
            />
            <NavItem
              href="/dashboard/settings"
              icon={<Settings size={16} />}
              label="Settings"
              isActive={isActive("/dashboard/settings")}
            />
          </nav>
        </div>
      </div>

      {/* Logout */}
      <div className="p-3 border-t border-gray-800">
        <button className="flex items-center gap-2 text-gray-300 hover:text-white w-full transition-colors duration-200 group p-2 rounded-md hover:bg-red-500/10">
          <div className="p-1.5 rounded-md bg-gray-800 group-hover:bg-red-500/20 transition-colors duration-200">
            <LogOut size={16} className="group-hover:text-red-500 transition-colors duration-200" />
          </div>
          <span className="group-hover:text-red-500 transition-colors duration-200">Logout</span>
        </button>
      </div>
    </div>
  )
}

interface NavItemProps {
  href: string
  icon: React.ReactNode
  label: string
  isActive: boolean
  badge?: number
}

function NavItem({ href, icon, label, isActive, badge }: NavItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all duration-200 text-sm ${
        isActive
          ? "bg-[#1e293b] text-white shadow-sm border-l-2 border-[#00e0ff]"
          : "text-gray-300 hover:text-white hover:bg-[#1e293b]/50"
      }`}
    >
      <div
        className={`p-1.5 rounded-md ${
          isActive ? "bg-[#00e0ff]/20" : "bg-gray-800 group-hover:bg-[#00e0ff]/10"
        } transition-colors duration-200`}
      >
        {icon}
      </div>
      <span className="truncate">{label}</span>
      {badge && (
        <span className="ml-auto bg-[#00e0ff] text-black text-xs font-medium rounded-full w-5 h-5 flex items-center justify-center shadow-sm">
          {badge}
        </span>
      )}
    </Link>
  )
}

