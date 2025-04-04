"use client"

import { useState } from "react"
import { Download, Filter, Plus, Search, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ProductGrid } from "@/components/dashboard/products/product-grid"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface ProductsPageProps {
  initialSearchQuery?: string
  initialCategoryFilter?: string
  initialStatusFilter?: string
}

export default function ProductsPage({
  initialSearchQuery = "",
  initialCategoryFilter = "All",
  initialStatusFilter = "All",
}: ProductsPageProps) {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery)
  const [categoryFilter, setCategoryFilter] = useState(initialCategoryFilter)
  const [statusFilter, setStatusFilter] = useState(initialStatusFilter)

  // Sample categories from products
  const categories = ["All", "Electronics", "Clothing", "Home & Kitchen", "Accessories", "Books", "Sports", "Food"]
  const statuses = ["All", "In Stock", "Low Stock", "Out of Stock"]

  const handleExport = (type: "pdf" | "excel") => {
    console.log(`Exporting ${type} with filters - Search: ${searchQuery}, Category: ${categoryFilter}, Status: ${statusFilter}`)
    // Actual implementation would export filtered data
    const link = document.createElement('a')
    link.href = `/sample-export.${type}`
    link.download = `products-${new Date().toISOString().split('T')[0]}.${type}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-6">
      {/* Header with Add Product and Export buttons */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Product Inventory</h1>
          <p className="text-gray-400">Manage your product catalog and stock</p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-gradient-to-r from-[#2dd4bf] to-[#00a3ff] hover:from-[#2dd4bf]/90 hover:to-[#00a3ff]/90 text-black shadow-lg hover:shadow-[#2dd4bf]/20">
            <Plus className="mr-2 h-4 w-4" />
            Add Product
          </Button>
          
          {/* Export Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="border-gray-700 bg-[#1e293b] text-white hover:bg-gray-800">
                <Download className="mr-2 h-4 w-4" />
                Export
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 bg-[#1e293b] border-gray-700">
              <DropdownMenuItem 
                className="hover:bg-gray-800 focus:bg-gray-800 text-white"
                onClick={() => handleExport("pdf")}
              >
                PDF Report
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="hover:bg-gray-800 focus:bg-gray-800 text-white"
                onClick={() => handleExport("excel")}
              >
                Excel Sheet
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="text"
            placeholder="Search products by name, SKU or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-[#1e293b] border-gray-700 text-white w-full focus:border-[#00e0ff] focus:ring-1 focus:ring-[#00e0ff]/50"
          />
        </div>

        {/* Category Filter Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="border-gray-700 bg-[#1e293b] text-white hover:bg-gray-800">
              <Filter className="mr-2 h-4 w-4" />
              {categoryFilter}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-[#1e293b] border-gray-700">
            {categories.map((category) => (
              <DropdownMenuItem
                key={category}
                className="hover:bg-gray-800 focus:bg-gray-800 text-white"
                onClick={() => setCategoryFilter(category)}
              >
                {category}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Status Filter Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="border-gray-700 bg-[#1e293b] text-white hover:bg-gray-800">
              <Filter className="mr-2 h-4 w-4" />
              {statusFilter}
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-[#1e293b] border-gray-700">
            {statuses.map((status) => (
              <DropdownMenuItem
                key={status}
                className="hover:bg-gray-800 focus:bg-gray-800 text-white"
                onClick={() => setStatusFilter(status)}
              >
                {status}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Products Grid */}
      <ProductGrid 
        searchQuery={searchQuery}
        categoryFilter={categoryFilter === "All" ? "" : categoryFilter}
        statusFilter={statusFilter === "All" ? "" : statusFilter}
      />
    </div>
  )
}