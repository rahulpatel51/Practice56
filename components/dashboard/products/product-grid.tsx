"use client"

import { Eye, MoreVertical, Pencil } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Product {
  id: string
  name: string
  category: string
  price: string
  stock: number
  status: "In Stock" | "Low Stock" | "Out of Stock"
  image: string
}

const products: Product[] = [
  {
    id: "ELEC-WH-001",
    name: "Premium Wireless Headphones",
    category: "Electronics",
    price: "₹8,999",
    stock: 45,
    status: "In Stock",
    image: "https://placehold.co/300x300/e2e8f0/1e293b?text=Headphones",
  },
  {
    id: "CLTH-TS-002",
    name: "Organic Cotton T-Shirt",
    category: "Clothing",
    price: "₹1,299",
    stock: 120,
    status: "In Stock",
    image: "https://placehold.co/300x300/e2e8f0/1e293b?text=T-Shirt",
  },
  {
    id: "HOME-WB-003",
    name: "Stainless Steel Water Bottle",
    category: "Home & Kitchen",
    price: "₹899",
    stock: 8,
    status: "Low Stock",
    image: "https://placehold.co/300x300/e2e8f0/1e293b?text=Bottle",
  },
  {
    id: "ACCS-LW-004",
    name: "Leather Wallet",
    category: "Accessories",
    price: "₹1,499",
    stock: 35,
    status: "In Stock",
    image: "https://placehold.co/300x300/e2e8f0/1e293b?text=Wallet",
  },
  {
    id: "ELEC-SP-005",
    name: "Smart Watch",
    category: "Electronics",
    price: "₹12,999",
    stock: 18,
    status: "In Stock",
    image: "https://placehold.co/300x300/e2e8f0/1e293b?text=Watch",
  },
  {
    id: "BOOK-FN-006",
    name: "Business Finance Book",
    category: "Books",
    price: "₹599",
    stock: 0,
    status: "Out of Stock",
    image: "https://placehold.co/300x300/e2e8f0/1e293b?text=Book",
  },
  {
    id: "SPRT-YM-007",
    name: "Yoga Mat",
    category: "Sports",
    price: "₹1,299",
    stock: 25,
    status: "In Stock",
    image: "https://placehold.co/300x300/e2e8f0/1e293b?text=Yoga+Mat",
  },
  {
    id: "FOOD-OO-008",
    name: "Organic Olive Oil",
    category: "Food",
    price: "₹799",
    stock: 42,
    status: "In Stock",
    image: "https://placehold.co/300x300/e2e8f0/1e293b?text=Olive+Oil",
  },
]

export function ProductGrid() {
  const getStatusColor = (status: Product["status"]) => {
    switch (status) {
      case "In Stock":
        return "bg-green-500/10 text-green-500 border-green-500/20"
      case "Low Stock":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20"
      case "Out of Stock":
        return "bg-red-500/10 text-red-500 border-red-500/20"
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product.id} className="bg-[#1e293b] rounded-lg border border-gray-800 overflow-hidden">
          <div className="relative">
            <img
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              className="w-full aspect-square object-cover"
            />
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8 rounded-full bg-gray-900/50 text-white hover:bg-gray-900/70"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>

          <div className="p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-gray-400">{product.id}</span>
              <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(product.status)}`}>
                {product.status}
              </span>
            </div>

            <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
            <p className="text-gray-400 text-sm mb-2">{product.category}</p>

            <div className="flex justify-between items-center mt-4">
              <div>
                <p className="text-xl font-bold">{product.price}</p>
                <p className="text-sm text-gray-400">Stock: {product.stock}</p>
              </div>

              <div className="flex gap-2">
                <Button variant="secondary" size="sm" className="bg-gray-800 hover:bg-gray-700">
                  <Eye className="h-4 w-4" />
                  <span className="ml-1">View</span>
                </Button>
                <Button variant="secondary" size="sm" className="bg-gray-800 hover:bg-gray-700">
                  <Pencil className="h-4 w-4" />
                  <span className="ml-1">Edit</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

