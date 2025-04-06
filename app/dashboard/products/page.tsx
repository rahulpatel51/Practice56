"use client"

import { useState, useRef, ChangeEvent, useEffect } from "react"
import { Download, Eye, Filter, MoreVertical, Plus, Search, ChevronDown, X, Upload, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { productApi } from "@/service/productService"

interface Product {
  id: string
  name: string
  category: string
  price: number
  discountPrice: number
  discountPercentage: number
  rating: number
  totalReviews: number
  stock: number
  image: string
  isNew: boolean
  inStock: boolean
}

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
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery)
  const [categoryFilter, setCategoryFilter] = useState(initialCategoryFilter)
  const [statusFilter, setStatusFilter] = useState(initialStatusFilter)
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const [isEditProductOpen, setIsEditProductOpen] = useState(false)
  const [isViewOpen, setIsViewOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [productToDelete, setProductToDelete] = useState<string | null>(null)
  const [loading, setLoading] = useState({
    export: false,
    addProduct: false,
    editProduct: false,
    deleteProduct: false,
    fetchCategories: false
  })
  
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([])
  const [products, setProducts] = useState<Product[]>([])
  
  const [newProduct, setNewProduct] = useState<Omit<Product, "id"> & { imageFile: File | null }>({
    name: "",
    category: "",
    price: 0,
    discountPrice: 0,
    discountPercentage: 0,
    rating: 0,
    totalReviews: 0,
    stock: 0,
    image: "",
    isNew: false,
    inStock: true,
    imageFile: null
  })
  
  const [editProduct, setEditProduct] = useState<Product & { imageFile: File | null }>({
    id: "",
    name: "",
    category: "",
    price: 0,
    discountPrice: 0,
    discountPercentage: 0,
    rating: 0,
    totalReviews: 0,
    stock: 0,
    image: "",
    isNew: false,
    inStock: true,
    imageFile: null
  })
  
  const [imagePreview, setImagePreview] = useState("")
  const [editImagePreview, setEditImagePreview] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const editFileInputRef = useRef<HTMLInputElement>(null)

  const statuses = ["In Stock", "Out of Stock"]

  // Fetch initial data
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(prev => ({...prev, fetchCategories: true}))
        const categoriesResponse = await productApi.getCategories() as { data: { id: string; name: string }[] }
        setCategories(categoriesResponse.data)
        
        const productsResponse = await productApi.getProducts({
          search: searchQuery,
          category: categoryFilter === "All" ? "" : categoryFilter,
          status: statusFilter === "All" ? "" : statusFilter
        }) as { data: Product[] }
        setProducts(productsResponse.data)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch initial data",
          variant: "destructive"
        })
      } finally {
        setLoading(prev => ({...prev, fetchCategories: false}))
      }
    }
    
    fetchInitialData()
  }, [])

  const handleExport = async (type: "pdf" | "excel") => {
    try {
      setLoading(prev => ({...prev, export: true}))
      
      const response = await productApi.exportProducts({
        searchQuery,
        category: categoryFilter === "All" ? "" : categoryFilter,
        status: statusFilter === "All" ? "" : statusFilter,
        type
      }) as { data: { url: string } }
      
      // Create download link
      const link = document.createElement('a')
      link.href = response.data.url
      link.download = `products-${new Date().toISOString().split('T')[0]}.${type}`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      toast({
        title: "Export Successful",
        description: `Your ${type.toUpperCase()} export has been downloaded`,
      })
    } catch (error) {
      toast({
        title: "Export Failed",
        description: "Failed to generate export file",
        variant: "destructive"
      })
    } finally {
      setLoading(prev => ({...prev, export: false}))
    }
  }

  const handleAddProduct = async () => {
    try {
      setLoading(prev => ({...prev, addProduct: true}))
      
      const formData = new FormData()
      formData.append('name', newProduct.name)
      formData.append('category', newProduct.category)
      formData.append('price', newProduct.price.toString())
      formData.append('discountPrice', newProduct.discountPrice.toString())
      formData.append('stock', newProduct.stock.toString())
      formData.append('isNew', newProduct.isNew.toString())
      formData.append('inStock', newProduct.inStock.toString())
      
      if (newProduct.rating) formData.append('rating', newProduct.rating.toString())
      if (newProduct.totalReviews) formData.append('totalReviews', newProduct.totalReviews.toString())
      if (newProduct.imageFile) formData.append('image', newProduct.imageFile)
      if (newProduct.image) formData.append('imageUrl', newProduct.image)

      const response = await productApi.createProduct(formData)
      
      // Reset form
      setNewProduct({
        name: "",
        category: "",
        price: 0,
        discountPrice: 0,
        discountPercentage: 0,
        rating: 0,
        totalReviews: 0,
        stock: 0,
        image: "",
        isNew: false,
        inStock: true,
        imageFile: null
      })
      setImagePreview("")
      setIsAddProductOpen(false)
      
      // Refresh products
      fetchProducts()
      
      toast({
        title: "Success",
        description: "Product added successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add product",
        variant: "destructive"
      })
    } finally {
      setLoading(prev => ({...prev, addProduct: false}))
    }
  }

  const handleEditProduct = (product: Product) => {
    setEditProduct({
      ...product,
      imageFile: null
    })
    setEditImagePreview(product.image || "")
    setIsEditProductOpen(true)
  }

  const handleUpdateProduct = async () => {
    try {
      setLoading(prev => ({...prev, editProduct: true}))
      
      const formData = new FormData()
      formData.append('id', editProduct.id)
      formData.append('name', editProduct.name)
      formData.append('category', editProduct.category)
      formData.append('price', editProduct.price.toString())
      formData.append('discountPrice', editProduct.discountPrice.toString())
      formData.append('stock', editProduct.stock.toString())
      formData.append('isNew', editProduct.isNew.toString())
      formData.append('inStock', editProduct.inStock.toString())
      
      if (editProduct.rating) formData.append('rating', editProduct.rating.toString())
      if (editProduct.totalReviews) formData.append('totalReviews', editProduct.totalReviews.toString())
      if (editProduct.imageFile) formData.append('image', editProduct.imageFile)
      if (editProduct.image) formData.append('imageUrl', editProduct.image)

      const response = await productApi.updateProduct(editProduct.id, Object.fromEntries(formData.entries()) as Partial<ProductData>)
      
      setIsEditProductOpen(false)
      
      // Refresh products
      fetchProducts()
      
      toast({
        title: "Success",
        description: "Product updated successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update product",
        variant: "destructive"
      })
    } finally {
      setLoading(prev => ({...prev, editProduct: false}))
    }
  }

  const handleView = (product: Product) => {
    setSelectedProduct(product)
    setIsViewOpen(true)
  }

  const handleDeleteClick = (productId: string) => {
    setProductToDelete(productId)
    setIsDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!productToDelete) return
    
    try {
      setLoading(prev => ({...prev, deleteProduct: true}))
      
      await productApi.deleteProduct(productToDelete)
      
      // Refresh products
      fetchProducts()
      
      toast({
        title: "Success",
        description: "Product deleted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete product",
        variant: "destructive"
      })
    } finally {
      setLoading(prev => ({...prev, deleteProduct: false}))
      setIsDeleteDialogOpen(false)
      setProductToDelete(null)
    }
  }

  const fetchProducts = async () => {
    try {
      const response = await productApi.getProducts({
        search: searchQuery,
        category: categoryFilter === "All" ? "" : categoryFilter,
        status: statusFilter === "All" ? "" : statusFilter
      }) as { data: Product[] }
      setProducts(response.data)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch products",
        variant: "destructive"
      })
    }
  }

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>, isEdit = false) => {
    const file = e.target.files?.[0]
    if (file) {
      if (isEdit) {
        setEditProduct({...editProduct, imageFile: file, image: ""})
      } else {
        setNewProduct({...newProduct, imageFile: file, image: ""})
      }
      
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        if (isEdit) {
          setEditImagePreview(reader.result as string)
        } else {
          setImagePreview(reader.result as string)
        }
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = (isEdit = false) => {
    if (isEdit) {
      editFileInputRef.current?.click()
    } else {
      fileInputRef.current?.click()
    }
  }

  const removeImage = (isEdit = false) => {
    if (isEdit) {
      setEditProduct({...editProduct, image: "", imageFile: null})
      setEditImagePreview("")
    } else {
      setNewProduct({...newProduct, image: "", imageFile: null})
      setImagePreview("")
    }
  }

  const calculateDiscountPercentage = (price: number, discountPrice: number) => {
    if (discountPrice > 0 && price > 0) {
      return Math.round(((price - discountPrice) / price) * 100)
    }
    return 0
  }

  const getStatusColor = (inStock: boolean) => {
    return inStock 
      ? "bg-green-500/10 text-green-500 border-green-500/20" 
      : "bg-red-500/10 text-red-500 border-red-500/20"
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(price)
  }

  // Fetch products when filters change
  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchProducts()
    }, 500)
    
    return () => clearTimeout(debounceTimer)
  }, [searchQuery, categoryFilter, statusFilter])

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
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="outline" 
                className="border-gray-700 bg-[#1e293b] text-white hover:bg-gray-800"
                disabled={loading.export}
              >
                <Download className="mr-2 h-4 w-4" />
                Export
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 bg-[#1e293b] border-gray-700">
              <DropdownMenuItem 
                className="hover:bg-gray-800 focus:bg-gray-800 text-white"
                onClick={() => handleExport("pdf")}
                disabled={loading.export}
              >
                {loading.export ? "Exporting..." : "PDF Report"}
              </DropdownMenuItem>
              <DropdownMenuItem 
                className="hover:bg-gray-800 focus:bg-gray-800 text-white"
                onClick={() => handleExport("excel")}
                disabled={loading.export}
              >
                {loading.export ? "Exporting..." : "Excel Sheet"}
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
                key={category.id}
                className="hover:bg-gray-800 focus:bg-gray-800 text-white"
                onClick={() => setCategoryFilter(category.name)}
              >
                {category.name}
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
      {loading.fetchCategories ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-[#1e293b] rounded-lg border border-gray-800 overflow-hidden animate-pulse">
              <div className="w-full aspect-square bg-gray-800"></div>
              <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-800 rounded w-3/4"></div>
                <div className="h-4 bg-gray-800 rounded w-1/2"></div>
                <div className="h-6 bg-gray-800 rounded w-1/3"></div>
              </div>
            </div>
          ))}
        </div>
      ) : products && products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product.id} className="bg-[#1e293b] rounded-lg border border-gray-800 overflow-hidden hover:border-gray-700 transition-all hover:shadow-lg hover:shadow-[#00e0ff]/10">
              <div className="relative group">
                <img
                  src={product.image || "https://placehold.co/300x300/e2e8f0/1e293b?text=Product"}
                  alt={product.name}
                  className="w-full aspect-square object-cover"
                />
                
                {/* Badges */}
                <div className="absolute top-2 left-2 flex gap-2">
                  {product.isNew && (
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20">
                      New
                    </span>
                  )}
                  {product.discountPrice > 0 && (
                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-500/10 text-purple-500 border border-purple-500/20">
                      {product.discountPercentage}% OFF
                    </span>
                  )}
                </div>
                
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
                      className="hover:bg-gray-800 focus:bg-gray-800 text-white cursor-pointer"
                      onClick={() => handleView(product)}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="hover:bg-gray-800 focus:bg-gray-800 text-white cursor-pointer"
                      onClick={() => handleEditProduct(product)}
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className="hover:bg-red-500/10 focus:bg-red-500/10 text-red-500 cursor-pointer"
                      onClick={() => handleDeleteClick(product.id)}
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400">{product.category}</span>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(product.inStock)}`}>
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>

                <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-600 fill-current'}`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-xs text-gray-400 ml-1">({product.totalReviews})</span>
                </div>

                <div className="flex items-center gap-2 mt-3">
                  {product.discountPrice > 0 ? (
                    <>
                      <p className="text-xl font-bold">{formatPrice(product.discountPrice)}</p>
                      <p className="text-sm text-gray-400 line-through">{formatPrice(product.price)}</p>
                    </>
                  ) : (
                    <p className="text-xl font-bold">{formatPrice(product.price)}</p>
                  )}
                </div>

                <div className="mt-2">
                  <p className="text-sm text-gray-400">Stock: <span className="text-white">{product.stock} units</span></p>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="bg-gray-800 hover:bg-gray-700 flex-1"
                    onClick={() => handleView(product)}
                  >
                    <Eye className="h-4 w-4" />
                    <span className="ml-1">View</span>
                  </Button>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="bg-gray-800 hover:bg-gray-700 flex-1"
                    onClick={() => handleEditProduct(product)}
                  >
                    <Pencil className="h-4 w-4" />
                    <span className="ml-1">Edit</span>
                  </Button>
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
            Try adjusting your search or filters to find what you're looking for
          </p>
        </div>
      )}

      {/* Add Product Dialog */}
      <Dialog open={isAddProductOpen} onOpenChange={setIsAddProductOpen}>
        <DialogContent className="sm:max-w-3xl bg-[#1e293b] border-gray-700">
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
                      key={category.id}
                        className="hover:bg-gray-800 focus:bg-gray-800 text-white"
                        onClick={() => setNewProduct({...newProduct,  category: category.id})}
                      >
                        {category.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="new-price">Price (₹) *</Label>
                  <Input
                    id="new-price"
                    type="number"
                    value={newProduct.price || ""}
                    onChange={(e) => {
                      const price = Number(e.target.value)
                      setNewProduct({
                        ...newProduct, 
                        price,
                        discountPercentage: calculateDiscountPercentage(price, newProduct.discountPrice)
                      })
                    }}
                    className="bg-[#0f172a] border-gray-700"
                    placeholder="Enter price"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="new-discount-price">Discount Price (₹)</Label>
                  <Input
                    id="new-discount-price"
                    type="number"
                    value={newProduct.discountPrice || ""}
                    onChange={(e) => {
                      const discountPrice = Number(e.target.value)
                      setNewProduct({
                        ...newProduct, 
                        discountPrice,
                        discountPercentage: calculateDiscountPercentage(newProduct.price, discountPrice)
                      })
                    }}
                    className="bg-[#0f172a] border-gray-700"
                    placeholder="Enter discount price"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="new-stock">Stock Quantity *</Label>
                  <Input
                    id="new-stock"
                    type="number"
                    value={newProduct.stock || ""}
                    onChange={(e) => setNewProduct({
                      ...newProduct, 
                      stock: Number(e.target.value),
                      inStock: Number(e.target.value) > 0
                    })}
                    className="bg-[#0f172a] border-gray-700"
                    placeholder="Enter stock quantity"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="new-rating">Rating (0-5)</Label>
                  <Input
                    id="new-rating"
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={newProduct.rating || ""}
                    onChange={(e) => setNewProduct({...newProduct, rating: Number(e.target.value)})}
                    className="bg-[#0f172a] border-gray-700"
                    placeholder="Enter rating"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="new-total-reviews">Total Reviews</Label>
                <Input
                  id="new-total-reviews"
                  type="number"
                  value={newProduct.totalReviews || ""}
                  onChange={(e) => setNewProduct({...newProduct, totalReviews: Number(e.target.value)})}
                  className="bg-[#0f172a] border-gray-700"
                  placeholder="Enter total reviews"
                />
              </div>
              
              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="new-isNew"
                    checked={newProduct.isNew}
                    onChange={(e) => setNewProduct({...newProduct, isNew: e.target.checked})}
                    className="h-4 w-4 rounded border-gray-700 bg-[#0f172a] text-[#00e0ff] focus:ring-[#00e0ff]"
                  />
                  <Label htmlFor="new-isNew">Mark as New Arrival</Label>
                </div>
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
                    onClick={() => triggerFileInput(false)}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Image
                  </Button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => handleImageUpload(e, false)}
                    accept="image/*"
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="bg-[#0f172a] border-gray-700"
                    onClick={() => removeImage(false)}
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
                      onClick={() => removeImage(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setIsAddProductOpen(false)}
                  className="border-gray-700"
                  disabled={loading.addProduct}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleAddProduct}
                  className="bg-gradient-to-r from-[#00e0ff] to-[#00a3ff] text-black"
                  disabled={
                    !newProduct.name || 
                    !newProduct.category || 
                    newProduct.price <= 0 || 
                    isNaN(newProduct.stock) ||
                    loading.addProduct
                  }
                >
                  {loading.addProduct ? "Adding..." : "Add Product"}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={isEditProductOpen} onOpenChange={setIsEditProductOpen}>
        <DialogContent className="sm:max-w-3xl bg-[#1e293b] border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-xl">Edit Product</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-name">Product Name *</Label>
                <Input
                  id="edit-name"
                  value={editProduct.name}
                  onChange={(e) => setEditProduct({...editProduct, name: e.target.value})}
                  className="bg-[#0f172a] border-gray-700"
                  placeholder="Enter product name"
                  required
                />
              </div>
              
              <div>
                <Label htmlFor="edit-category">Category *</Label>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="w-full bg-[#0f172a] border-gray-700 justify-between"
                    >
                      {editProduct.category || "Select category"}
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-[300px] bg-[#1e293b] border-gray-700">
                    {categories.map((category) => (
                      <DropdownMenuItem
                        key={category.id}
                        className="hover:bg-gray-800 focus:bg-gray-800 text-white"
                        onClick={() => setEditProduct({...editProduct, category: category.id})}
                      >
                        {category.name}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-price">Price (₹) *</Label>
                  <Input
                    id="edit-price"
                    type="number"
                    value={editProduct.price || ""}
                    onChange={(e) => {
                      const price = Number(e.target.value)
                      setEditProduct({
                        ...editProduct, 
                        price,
                        discountPercentage: calculateDiscountPercentage(price, editProduct.discountPrice)
                      })
                    }}
                    className="bg-[#0f172a] border-gray-700"
                    placeholder="Enter price"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="edit-discount-price">Discount Price (₹)</Label>
                  <Input
                    id="edit-discount-price"
                    type="number"
                    value={editProduct.discountPrice || ""}
                    onChange={(e) => {
                      const discountPrice = Number(e.target.value)
                      setEditProduct({
                        ...editProduct, 
                        discountPrice,
                        discountPercentage: calculateDiscountPercentage(editProduct.price, discountPrice)
                      })
                    }}
                    className="bg-[#0f172a] border-gray-700"
                    placeholder="Enter discount price"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="edit-stock">Stock Quantity *</Label>
                  <Input
                    id="edit-stock"
                    type="number"
                    value={editProduct.stock || ""}
                    onChange={(e) => setEditProduct({
                      ...editProduct, 
                      stock: Number(e.target.value),
                      inStock: Number(e.target.value) > 0
                    })}
                    className="bg-[#0f172a] border-gray-700"
                    placeholder="Enter stock quantity"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="edit-rating">Rating (0-5)</Label>
                  <Input
                    id="edit-rating"
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={editProduct.rating || ""}
                    onChange={(e) => setEditProduct({...editProduct, rating: Number(e.target.value)})}
                    className="bg-[#0f172a] border-gray-700"
                    placeholder="Enter rating"
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="edit-total-reviews">Total Reviews</Label>
                <Input
                  id="edit-total-reviews"
                  type="number"
                  value={editProduct.totalReviews || ""}
                  onChange={(e) => setEditProduct({...editProduct, totalReviews: Number(e.target.value)})}
                  className="bg-[#0f172a] border-gray-700"
                  placeholder="Enter total reviews"
                />
              </div>
              
              <div className="flex items-center gap-4 pt-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="edit-isNew"
                    checked={editProduct.isNew}
                    onChange={(e) => setEditProduct({...editProduct, isNew: e.target.checked})}
                    className="h-4 w-4 rounded border-gray-700 bg-[#0f172a] text-[#00e0ff] focus:ring-[#00e0ff]"
                  />
                  <Label htmlFor="edit-isNew">Mark as New Arrival</Label>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-image">Product Image</Label>
                <div className="flex gap-2 mb-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="bg-[#0f172a] border-gray-700"
                    onClick={() => triggerFileInput(true)}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Image
                  </Button>
                  <input
                    type="file"
                    ref={editFileInputRef}
                    onChange={(e) => handleImageUpload(e, true)}
                    accept="image/*"
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="bg-[#0f172a] border-gray-700"
                    onClick={() => removeImage(true)}
                    disabled={!editProduct.imageFile && !editProduct.image}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Clear
                  </Button>
                </div>
                <Input
                  id="edit-image"
                  value={editProduct.image}
                  onChange={(e) => {
                    setEditProduct({...editProduct, image: e.target.value, imageFile: null})
                    setEditImagePreview("")
                  }}
                  className="bg-[#0f172a] border-gray-700"
                  placeholder="Or enter image URL"
                />
                {(editImagePreview || editProduct.image) && (
                  <div className="mt-4 relative">
                    <img
                      src={editImagePreview || editProduct.image}
                      alt="Product preview"
                      className="rounded-md border border-gray-700 w-full h-40 object-contain"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 h-8 w-8 rounded-full bg-gray-900/50 text-white hover:bg-gray-900/70"
                      onClick={() => removeImage(true)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="flex justify-end gap-2 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditProductOpen(false)}
                  className="border-gray-700"
                  disabled={loading.editProduct}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleUpdateProduct}
                  className="bg-gradient-to-r from-[#00e0ff] to-[#00a3ff] text-black"
                  disabled={
                    !editProduct.name || 
                    !editProduct.category || 
                    editProduct.price <= 0 || 
                    isNaN(editProduct.stock) ||
                    loading.editProduct
                  }
                >
                  {loading.editProduct ? "Updating..." : "Update Product"}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

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
                  src={selectedProduct.image || "https://placehold.co/300x300/e2e8f0/1e293b?text=Product"}
                  alt={selectedProduct.name}
                  className="w-full h-auto max-h-80 object-contain"
                />
              </div>
              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold">{selectedProduct.name}</h3>
                  <p className="text-gray-400">{selectedProduct.category}</p>
                </div>
                
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(selectedProduct.rating) ? 'text-yellow-400 fill-current' : 'text-gray-600 fill-current'}`}
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-sm text-gray-400">({selectedProduct.totalReviews} reviews)</span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-4">
                    {selectedProduct.discountPrice > 0 ? (
                      <>
                        <span className="text-2xl font-bold">{formatPrice(selectedProduct.discountPrice)}</span>
                        <span className="text-lg text-gray-400 line-through">{formatPrice(selectedProduct.price)}</span>
                        <span className="text-sm bg-purple-500/10 text-purple-500 px-2 py-1 rounded-full">
                          {selectedProduct.discountPercentage}% OFF
                        </span>
                      </>
                    ) : (
                      <span className="text-2xl font-bold">{formatPrice(selectedProduct.price)}</span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(selectedProduct.inStock)}`}>
                      {selectedProduct.inStock ? "In Stock" : "Out of Stock"}
                    </span>
                    {selectedProduct.isNew && (
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/20">
                        New Arrival
                      </span>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div>
                    <p className="text-sm text-gray-400">Product ID</p>
                    <p className="text-xs font-mono">{selectedProduct.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Category</p>
                    <p>{selectedProduct.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Original Price</p>
                    <p>{formatPrice(selectedProduct.price)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Discounted Price</p>
                    <p>{selectedProduct.discountPrice > 0 ? formatPrice(selectedProduct.discountPrice) : "-"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Stock Quantity</p>
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
                      handleEditProduct(selectedProduct)
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

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-md bg-[#1e293b] border-gray-700">
          <DialogHeader>
            <DialogTitle className="text-xl">Delete Product</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p>Are you sure you want to delete this product? This action cannot be undone.</p>
            <div className="flex justify-end gap-2 pt-4">
              <Button 
                variant="outline" 
                className="border-gray-700"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                variant="destructive"
                onClick={handleDeleteConfirm}
              >
                Delete
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}