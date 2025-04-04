"use client"

import { useState } from "react"
import { Minus, Plus, ShoppingCart, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Premium Wireless Headphones",
      price: 8999,
      quantity: 1,
      image: "https://placehold.co/300x300/1e293b/ffffff?text=Headphones",
    },
    {
      id: "2",
      name: "Organic Cotton T-Shirt",
      price: 1299,
      quantity: 2,
      image: "https://placehold.co/300x300/1e293b/ffffff?text=T-Shirt",
    },
    {
      id: "3",
      name: "Stainless Steel Water Bottle",
      price: 899,
      quantity: 1,
      image: "https://placehold.co/300x300/1e293b/ffffff?text=Bottle",
    },
  ])

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return

    setCartItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold gradient-text">Shopping Cart</h1>
          <p className="text-gray-400">Manage your cart items before checkout</p>
        </div>
        <Button className="btn-primary">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Proceed to Checkout
        </Button>
      </div>

      {cartItems.length === 0 ? (
        <div className="bg-[#1e293b] rounded-lg border border-gray-800 p-12 text-center shadow-md">
          <div className="flex justify-center mb-4">
            <ShoppingCart className="h-16 w-16 text-gray-500" />
          </div>
          <h3 className="text-xl font-medium mb-2 gradient-text">Your cart is empty</h3>
          <p className="text-gray-400 mb-6">Looks like you haven't added any products to your cart yet.</p>
          <Button className="btn-primary">Continue Shopping</Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-[#1e293b] rounded-lg border border-gray-800 p-4 flex flex-col sm:flex-row gap-4 hover:border-[#00e0ff]/30 transition-colors duration-200 shadow-md card-hover"
              >
                <div className="w-full sm:w-24 h-24 bg-[#0f172a] rounded-md overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    width={96}
                    height={96}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1">
                  <div className="flex justify-between">
                    <h3 className="font-medium gradient-text">{item.name}</h3>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors duration-200"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                  <p className="text-gray-400 text-sm mb-4">ID: {item.id}</p>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1 rounded-md bg-[#0f172a] hover:bg-gray-800 text-gray-400 transition-colors duration-200 border border-gray-700 hover:border-[#00e0ff]/30"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1 rounded-md bg-[#0f172a] hover:bg-gray-800 text-gray-400 transition-colors duration-200 border border-gray-700 hover:border-[#00e0ff]/30"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="text-right">
                      <p className="font-medium text-lg gradient-text">{formatPrice(item.price)}</p>
                      <p className="text-sm text-gray-400">{item.quantity > 1 && `${formatPrice(item.price)} each`}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <button
              onClick={() => setCartItems([])}
              className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors duration-200 p-2"
            >
              <Trash2 className="h-4 w-4" />
              <span>Clear Cart</span>
            </button>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-[#1e293b] rounded-lg border border-gray-800 p-6 sticky top-24 shadow-md card-hover">
              <h3 className="text-lg font-medium mb-4 gradient-text">Order Summary</h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal</span>
                  <span>{formatPrice(calculateSubtotal())}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Shipping</span>
                  <span>{formatPrice(99)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Tax</span>
                  <span>{formatPrice(calculateSubtotal() * 0.18)}</span>
                </div>
                <div className="border-t border-gray-800 pt-3 flex justify-between font-medium">
                  <span>Total</span>
                  <span className="text-xl gradient-text">
                    {formatPrice(calculateSubtotal() + 99 + calculateSubtotal() * 0.18)}
                  </span>
                </div>
              </div>

              <Button className="btn-primary w-full">Proceed to Checkout</Button>

              <div className="mt-4">
                <p className="text-xs text-gray-400 text-center">
                  By proceeding to checkout, you agree to our{" "}
                  <a href="#" className="text-[#00e0ff] hover:text-[#00a3ff] transition-colors duration-200">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="#" className="text-[#00e0ff] hover:text-[#00a3ff] transition-colors duration-200">
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

