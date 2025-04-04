"use client"

import { useState, useRef, ChangeEvent } from "react"
import { Download, Filter, Plus, Search, ChevronDown, X, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ProductGrid } from "@/components/dashboard/products/product-grid"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

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
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [newProduct, setNewProduct] = useState({
    name: "",
    category: "",
    price: "",
    stock: 0,
    image: "",
    description: "",
    imageFile: null as File | null
  })
  const [imagePreview, setImagePreview] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Sample categories from products
  const categories = ["Electronics", "Clothing", "Home & Kitchen", "Accessories", "Books", "Sports", "Food"]
  const statuses = ["In Stock", "Low Stock", "Out of Stock"]

  const handleExport = (type: "pdf" | "excel") => {
    console.log(`Exporting ${type} with filters - Search: ${searchQuery}, Category: ${categoryFilter}, Status: ${statusFilter}`)
    const link = document.createElement('a')
    link.href = `/sample-export.${type}`
    link.download = `products-${new Date().toISOString().split('T')[0]}.${type}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleAddProduct = () => {
    // In a real app, you would send this to your API
    console.log("Adding new product:", newProduct)
    
    // Generate a random ID for the new product
    const newId = `PROD-${Math.floor(1000 + Math.random() * 9000)}`
    
    // Create the new product object
    const productToAdd = {
      id: newId,
      name: newProduct.name,
      category: newProduct.category,
      price: `₹${newProduct.price}`,
      stock: Number(newProduct.stock),
      status: getStatusFromStock(Number(newProduct.stock)),
      image: newProduct.image || imagePreview || "https://placehold.co/300x300/e2e8f0/1e293b?text=Product",
      description: newProduct.description
    }
    
    // Reset the form and close the dialog
    setNewProduct({
      name: "",
      category: "",
      price: "",
      stock: 0,
      image: "",
      description: "",
      imageFile: null
    })
    setImagePreview("")
    setIsAddProductOpen(false)
    
    // In a real app, you would update the state after successful API call
    console.log("Product would be added:", productToAdd)
  }

  const getStatusFromStock = (stock: number) => {
    if (stock === 0) return "Out of Stock"
    if (stock < 10) return "Low Stock"
    return "In Stock"
  }

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setNewProduct({...newProduct, imageFile: file, image: ""})
      
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const removeImage = () => {
    setNewProduct({...newProduct, image: "", imageFile: null})
    setImagePreview("")
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
          <Button 
            className="bg-gradient-to-r from-[#2dd4bf] to-[#00a3ff] hover:from-[#2dd4bf]/90 hover:to-[#00a3ff]/90 text-black shadow-lg hover:shadow-[#2dd4bf]/20"
            onClick={() => setIsAddProductOpen(true)}
          >
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
            <DropdownMenuItem
              className="hover:bg-gray-800 focus:bg-gray-800 text-white"
              onClick={() => setCategoryFilter("All")}
            >
              All
            </DropdownMenuItem>
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
            <DropdownMenuItem
              className="hover:bg-gray-800 focus:bg-gray-800 text-white"
              onClick={() => setStatusFilter("All")}
            >
              All
            </DropdownMenuItem>
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

      {/* Add Product Dialog */}
      <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
        <DialogContent className="sm:max-w-2xl bg-[#1e293b] border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-xl">Add New Product</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="new-name">Product Name *</Label>
                <Input
                  id="new-name"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({...newProduct, name: e.target.value})}
                  className="bg-[#0f172a] border-gray-700"
                  placeholder="Enter product name"
                  required
                />
              </div>
              <div>
                <Label htmlFor="new-category">Category *</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="w-full bg-[#0f172a] border-gray-700 justify-between"
                    >
                      {newProduct.category || "Select category"}
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[300px] bg-[#1e293b] border-gray-700">
                    {categories.map((category) => (
                      <DropdownMenuItem
                        key={category}
                        className="hover:bg-gray-800 focus:bg-gray-800 text-white"
                        onClick={() => setNewProduct({...newProduct, category})}
                      >
                        {category}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div>
                <Label htmlFor="new-price">Price (₹) *</Label>
                <Input
                  id="new-price"
                  type="number"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({...newProduct, price: e.target.value})}
                  className="bg-[#0f172a] border-gray-700"
                  placeholder="Enter price"
                  required
                />
              </div>
              <div>
                <Label htmlFor="new-stock">Initial Stock *</Label>
                <Input
                  id="new-stock"
                  type="number"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({...newProduct, stock: Number(e.target.value)})}
                  className="bg-[#0f172a] border-gray-700"
                  placeholder="Enter stock quantity"
                  required
                />
              </div>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="new-image">Product Image</Label>
                <div className="flex gap-2 mb-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="bg-[#0f172a] border-gray-700"
                    onClick={triggerFileInput}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Image
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="bg-[#0f172a] border-gray-700"
                    onClick={removeImage}
                    disabled={!newProduct.imageFile && !newProduct.image}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Clear
                  </Button>
                </div>
                <Input
                  id="new-image"
                  value={newProduct.image}
                  onChange={(e) => {
                    setNewProduct({...newProduct, image: e.target.value, imageFile: null})
                    setImagePreview("")
                  }}
                  className="bg-[#0f172a] border-gray-700"
                  placeholder="Or enter image URL"
                />
                {(imagePreview || newProduct.image) && (
                  <div className="mt-4 relative">
                    <img
                      src={imagePreview || newProduct.image}
                      alt="Product preview"
                      className="rounded-md border border-gray-700 w-full h-40 object-contain"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8 rounded-full bg-gray-900/50 text-white hover:bg-gray-900/70"
                      onClick={removeImage}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
              <div>
                <Label htmlFor="new-description">Description</Label>
                <textarea
                  id="new-description"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({...newProduct, description: e.target.value})}
                  className="w-full bg-[#0f172a] border border-gray-700 rounded-md p-2 text-sm min-h-24"
                  placeholder="Enter product description"
                  rows={4}
                />
              </div>
              <div className="flex justify-end gap-2 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setIsAddProductOpen(false)}
                  className="border-gray-700"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleAddProduct}
                  className="bg-gradient-to-r from-[#00e0ff] to-[#00a3ff] text-black"
                  disabled={!newProduct.name || !newProduct.category || !newProduct.price || isNaN(Number(newProduct.stock))}
                >
                  Add Product
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}