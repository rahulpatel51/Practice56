"use client"

import { useState } from "react"
import { Eye, MoreVertical, Pencil, Trash2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Product {
  id: string
  name: string
  category: string
  price: string
  stock: number
  status: "In Stock" | "Low Stock" | "Out of Stock"
  image: string
  description?: string
}

interface ProductGridProps {
  searchQuery: string
  categoryFilter: string
  statusFilter: string
}

const initialProducts: Product[] = [
  {
    id: "ELEC-WH-001",
    name: "Premium Wireless Headphones",
    category: "Electronics",
    price: "₹8,999",
    stock: 45,
    status: "In Stock",
    image: "https://placehold.co/300x300/e2e8f0/1e293b?text=Headphones",
    description: "Noise cancelling wireless headphones with 30hr battery life and premium sound quality."
  },
  {
    id: "CLTH-TS-002",
    name: "Organic Cotton T-Shirt",
    category: "Clothing",
    price: "₹1,299",
    stock: 120,
    status: "In Stock",
    image: "https://placehold.co/300x300/e2e8f0/1e293b?text=T-Shirt",
    description: "100% organic cotton t-shirt with comfortable fit and sustainable production."
  },
  {
    id: "HOME-WB-003",
    name: "Stainless Steel Water Bottle",
    category: "Home & Kitchen",
    price: "₹899",
    stock: 8,
    status: "Low Stock",
    image: "https://placehold.co/300x300/e2e8f0/1e293b?text=Bottle",
    description: "Insulated stainless steel water bottle keeps drinks cold for 24hrs or hot for 12hrs."
  },
  {
    id: "ACCS-LW-004",
    name: "Leather Wallet",
    category: "Accessories",
    price: "₹1,499",
    stock: 35,
    status: "In Stock",
    image: "https://placehold.co/300x300/e2e8f0/1e293b?text=Wallet",
    description: "Genuine leather wallet with RFID protection and multiple card slots."
  },
  {
    id: "ELEC-SP-005",
    name: "Smart Watch Pro",
    category: "Electronics",
    price: "₹12,999",
    stock: 18,
    status: "In Stock",
    image: "https://placehold.co/300x300/e2e8f0/1e293b?text=Smart+Watch",
    description: "Fitness tracking, heart rate monitoring, and smartphone notifications on your wrist."
  },
  {
    id: "BOOK-FN-006",
    name: "Business Finance Guide",
    category: "Books",
    price: "₹599",
    stock: 0,
    status: "Out of Stock",
    image: "https://placehold.co/300x300/e2e8f0/1e293b?text=Book",
    description: "Comprehensive guide to business finance and investment strategies."
  },
  {
    id: "SPRT-YM-007",
    name: "Premium Yoga Mat",
    category: "Sports",
    price: "₹1,299",
    stock: 25,
    status: "In Stock",
    image: "https://placehold.co/300x300/e2e8f0/1e293b?text=Yoga+Mat",
    description: "Non-slip yoga mat with cushioning for joints and alignment markers."
  },
  {
    id: "FOOD-OO-008",
    name: "Organic Olive Oil",
    category: "Food",
    price: "₹799",
    stock: 42,
    status: "In Stock",
    image: "https://placehold.co/300x300/e2e8f0/1e293b?text=Olive+Oil",
    description: "Cold-pressed extra virgin olive oil from organic farms in Italy."
  }
]

export function ProductGrid({ searchQuery, categoryFilter, statusFilter }: ProductGridProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [editForm, setEditForm] = useState<Partial<Product>>({})

  // Filter products based on search and filters
  const filteredProducts = products.filter(product => {
    const matchesSearch = searchQuery === "" || 
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      product.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = categoryFilter === "" || 
      product.category.toLowerCase() === categoryFilter.toLowerCase()
      
    const matchesStatus = statusFilter === "" || 
      product.status.toLowerCase() === statusFilter.toLowerCase()
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStatusColor = (status: Product["status"]) => {
    switch (status) {
      case "In Stock": return "bg-green-500/10 text-green-500 border-green-500/20"
      case "Low Stock": return "bg-amber-500/10 text-amber-500 border-amber-500/20"
      case "Out of Stock": return "bg-red-500/10 text-red-500 border-red-500/20"
    }
  }

  const handleView = (product: Product) => {
    setSelectedProduct(product)
    setIsViewOpen(true)
  }

  const handleEdit = (product: Product) => {
    setSelectedProduct(product)
    setEditForm({...product})
    setIsEditOpen(true)
  }

  const handleDelete = (id: string) => {
    setProducts(products.filter(product => product.id !== id))
  }

  const handleUpdate = () => {
    setProducts(products.map(product => 
      product.id === selectedProduct?.id ? {...product, ...editForm} : product
    ))
    setIsEditOpen(false)
  }

  const updateStockStatus = (stock: number) => {
    if (stock === 0) return "Out of Stock"
    if (stock < 10) return "Low Stock"
    return "In Stock"
  }

  return (
    <>
      {/* Product Grid */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-[#1e293b] rounded-lg border border-gray-800 overflow-hidden hover:border-gray-700 transition-all hover:shadow-lg hover:shadow-[#00e0ff]/10">
              <div className="relative group">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full aspect-square object-cover"
                />
                
                {/* Three-dot menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8 rounded-full bg-gray-900/50 text-white hover:bg-gray-900/70"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-40 bg-[#1e293b] border-gray-700">
                    <DropdownMenuItem 
                      className="hover:bg-gray-800 focus:bg-gray-800 text-white"
                      onClick={() => handleView(product)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="hover:bg-gray-800 focus:bg-gray-800 text-white"
                      onClick={() => handleEdit(product)}
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="hover:bg-red-500/10 focus:bg-red-500/10 text-red-500"
                      onClick={() => handleDelete(product.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="bg-gray-800 hover:bg-gray-700"
                      onClick={() => handleView(product)}
                    >
                      <Eye className="h-4 w-4" />
                      <span className="ml-1">View</span>
                    </Button>
                    <Button 
                      variant="secondary" 
                      size="sm" 
                      className="bg-gray-800 hover:bg-gray-700"
                      onClick={() => handleEdit(product)}
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="ml-1">Edit</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-4">
            <svg 
              className="w-12 h-12 text-gray-500" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-medium mb-2">No products found</h3>
          <p className="text-gray-400 max-w-md">
            {searchQuery 
              ? `No products match your search for "${searchQuery}"`
              : "No products match your current filters"}
          </p>
          <Button 
            variant="outline" 
            className="mt-4 border-gray-700"
            onClick={() => {
              searchQuery = "All"
              categoryFilter = "All"
              statusFilter = "All"
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}

      {/* View Product Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="sm:max-w-2xl bg-[#1e293b] border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-xl">Product Details</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-lg overflow-hidden bg-gray-900/50 flex items-center justify-center">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-auto max-h-80 object-contain"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold">{selectedProduct.name}</h3>
                  <p className="text-gray-400">{selectedProduct.category}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-xl font-bold">{selectedProduct.price}</span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(selectedProduct.status)}`}>
                    {selectedProduct.status}
                  </span>
                </div>
                <div>
                  <h4 className="font-medium mb-2">Description</h4>
                  <p className="text-gray-400">
                    {selectedProduct.description || "No description available"}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400">Product ID</p>
                    <p>{selectedProduct.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Stock Available</p>
                    <p>{selectedProduct.stock} units</p>
                  </div>
                </div>
                <div className="flex gap-2 pt-4">
                  <Button 
                    variant="outline" 
                    className="border-gray-700"
                    onClick={() => setIsViewOpen(false)}
                  >
                    Close
                  </Button>
                  <Button 
                    className="bg-gradient-to-r from-[#00e0ff] to-[#00a3ff] text-black"
                    onClick={() => {
                      setIsViewOpen(false)
                      handleEdit(selectedProduct)
                    }}
                  >
                    Edit Product
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-2xl bg-[#1e293b] border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-xl">Edit Product</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    value={editForm.name || ""}
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                    className="bg-[#0f172a] border-gray-700"
                  />
                </div>
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    value={editForm.category || ""}
                    onChange={(e) => setEditForm({...editForm, category: e.target.value})}
                    className="bg-[#0f172a] border-gray-700"
                  />
                </div>
                <div>
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    value={editForm.price || ""}
                    onChange={(e) => setEditForm({...editForm, price: e.target.value})}
                    className="bg-[#0f172a] border-gray-700"
                  />
                </div>
                <div>
                  <Label htmlFor="stock">Stock</Label>
                  <Input
                    id="stock"
                    type="number"
                    value={editForm.stock || ""}
                    onChange={(e) => {
                      const stock = parseInt(e.target.value)
                      setEditForm({
                        ...editForm, 
                        stock: isNaN(stock) ? 0 : stock,
                        status: updateStockStatus(stock)
                      })
                    }}
                    className="bg-[#0f172a] border-gray-700"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="image">Image URL</Label>
                  <Input
                    id="image"
                    value={editForm.image || ""}
                    onChange={(e) => setEditForm({...editForm, image: e.target.value})}
                    className="bg-[#0f172a] border-gray-700"
                  />
                  {editForm.image && (
                    <img
                      src={editForm.image}
                      alt="Product preview"
                      className="mt-2 rounded-md border border-gray-700 w-full h-40 object-contain"
                    />
                  )}
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <textarea
                    id="description"
                    value={editForm.description || ""}
                    onChange={(e) => setEditForm({...editForm, description: e.target.value})}
                    className="w-full bg-[#0f172a] border border-gray-700 rounded-md p-2 text-sm min-h-24"
                    rows={4}
                  />
                </div>
                <div className="flex justify-end gap-2 pt-4">
                  <Button 
                    variant="outline" 
                    onClick={() => setIsEditOpen(false)}
                    className="border-gray-700"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleUpdate}
                    className="bg-gradient-to-r from-[#00e0ff] to-[#00a3ff] text-black"
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}