"use client"

import { useState, useRef, ChangeEvent, useEffect } from "react"
import { ImagePlus, Upload, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useToast } from "@/components/ui/use-toast"
import { categoryApi } from "@/service/categoryApi"

interface CategoryItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string | File | null | undefined
  description: string
}

export default function CategoryPage() {
  const { toast } = useToast()
  const [categories, setCategories] = useState<CategoryItem[]>([])
  const [loading, setLoading] = useState({
    page: true,
    form: false
  })
  const [error, setError] = useState<string | null>(null)
  const [isEditing, setIsEditing] = useState<string | null>(null)
  const [newCategory, setNewCategory] = useState<Omit<CategoryItem, "id">>({ 
    name: "", 
    price: 0, 
    quantity: 0, 
    image: undefined,
    description: "" 
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Fetch categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryApi.getAllCategories()
        setCategories(response.map(category => ({
          ...category,
          image: category.image || null, // Ensure 'image' is always defined
          description: category.description || "", // Ensure 'description' is always a string
        })))
      } catch (err) {
        const error = err as Error
        setError(error.message || 'Failed to fetch categories')
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive"
        })
      } finally {
        setLoading(prev => ({...prev, page: false}))
      }
    }
    
    fetchCategories()
  }, [toast])

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setNewCategory({...newCategory, image: file})
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

  const resetForm = () => {
    setNewCategory({ 
      name: "", 
      price: 0, 
      quantity: 0, 
      image: undefined, 
      description: "" 
    })
    setImagePreview(null)
    setIsEditing(null)
  }

  // Add new category
  const addCategory = async () => {
    if (!newCategory.name || newCategory.price <= 0) {
      toast({
        title: "Validation Error",
        description: "Name and price are required",
        variant: "destructive"
      })
      return
    }
    
    try {
      setLoading(prev => ({...prev, form: true}))
      const response = await categoryApi.createCategory({
        ...newCategory,
        image: newCategory.image || undefined, // Convert null to undefined
      })
      if (response && typeof response === 'object') {
        setCategories([...categories, response as CategoryItem])
        toast({
          title: "Success",
          description: "Category added successfully",
        })
      } else {
        toast({
          title: "Error",
          description: "Failed to add category",
          variant: "destructive"
        })
      }
      resetForm()
      toast({
        title: "Success",
        description: "Category added successfully",
      })
    } catch (err) {
      const error = err as Error
      setError(error.message || 'Failed to create category')
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      })
    } finally {
      setLoading(prev => ({...prev, form: false}))
    }
  }

  // Update category
  const updateCategory = async () => {
    if (!isEditing || !newCategory.name || newCategory.price <= 0) {
      toast({
        title: "Validation Error",
        description: "Name and price are required",
        variant: "destructive"
      })
      return
    }
    
    try {
      setLoading(prev => ({...prev, form: true}))
      const response = await categoryApi.updateCategory(isEditing, {
        ...newCategory,
        image: newCategory.image || undefined, // Ensure 'null' is converted to 'undefined'
      })
      setCategories(categories.map(item => 
        item.id === isEditing && response ? response as CategoryItem : item
      ))
      resetForm()
      toast({
        title: "Success",
        description: "Category updated successfully",
      })
    } catch (err) {
      const error = err as Error
      setError(error.message || 'Failed to update category')
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      })
    } finally {
      setLoading(prev => ({...prev, form: false}))
    }
  }

  const editCategory = (id: string) => {
    const categoryToEdit = categories.find(item => item.id === id)
    if (categoryToEdit) {
      setNewCategory({
        name: categoryToEdit.name,
        price: categoryToEdit.price,
        quantity: categoryToEdit.quantity,
        image: categoryToEdit.image,
        description: categoryToEdit.description
      })
      
      if (typeof categoryToEdit.image === 'string') {
        setImagePreview(categoryToEdit.image)
      }
      
      setIsEditing(id)
    }
  }

  // Delete category
  const deleteCategory = async (id: string) => {
    try {
      setLoading(prev => ({...prev, form: true}))
      await categoryApi.deleteCategory(id)
      setCategories(categories.filter(item => item.id !== id))
      toast({
        title: "Success",
        description: "Category deleted successfully",
      })
    } catch (err) {
      const error = err as Error
      setError(error.message || 'Failed to delete category')
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive"
      })
    } finally {
      setLoading(prev => ({...prev, form: false}))
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price)
  }

  const getImageUrl = (image: string | File | null | undefined) => {
      if (!image) return "/placeholder-product.png"
      if (typeof image === 'string') return image
      return URL.createObjectURL(image)
    }

  if (loading.page) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <div className="text-center p-4 max-w-md">
          <h2 className="text-xl font-bold mb-2">Error Loading Categories</h2>
          <p>{error}</p>
          <Button 
            className="mt-4" 
            onClick={() => window.location.reload()}
          >
            Retry
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold gradient-text">Category Management</h1>
          <p className="text-gray-400">Manage your product categories</p>
        </div>
        {categories.length > 0 && (
          <Button 
            onClick={() => setIsEditing(null)}
            variant="outline"
            disabled={loading.form}
          >
            Add New Category
          </Button>
        )}
      </div>

      {/* Add/Edit Form */}
      <div className="bg-[#1e293b] rounded-lg border border-gray-800 p-6 shadow-md card-hover">
        <h2 className="text-xl font-medium mb-4 gradient-text">
          {isEditing ? "Edit Category" : "Add New Category"}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Name *</label>
              <input
                type="text"
                className="w-full bg-[#0f172a] border border-gray-700 rounded-md px-3 py-2 text-white focus:border-[#00e0ff] focus:outline-none"
                value={newCategory.name}
                onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                placeholder="Product name"
                required
                disabled={loading.form}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Price *</label>
              <input
                type="number"
                className="w-full bg-[#0f172a] border border-gray-700 rounded-md px-3 py-2 text-white focus:border-[#00e0ff] focus:outline-none"
                value={newCategory.price || ''}
                onChange={(e) => setNewCategory({...newCategory, price: Number(e.target.value)})}
                placeholder="Price"
                min="0"
                required
                disabled={loading.form}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Quantity</label>
              <input
                type="number"
                className="w-full bg-[#0f172a] border border-gray-700 rounded-md px-3 py-2 text-white focus:border-[#00e0ff] focus:outline-none"
                value={newCategory.quantity || ''}
                onChange={(e) => setNewCategory({...newCategory, quantity: Number(e.target.value)})}
                placeholder="Quantity"
                min="0"
                disabled={loading.form}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Description</label>
              <textarea
                className="w-full bg-[#0f172a] border border-gray-700 rounded-md px-3 py-2 text-white focus:border-[#00e0ff] focus:outline-none"
                value={newCategory.description}
                onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                placeholder="Product description"
                rows={3}
                disabled={loading.form}
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Image</label>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
                disabled={loading.form}
              />
              
              <div 
                className="w-full h-48 bg-[#0f172a] border-2 border-dashed border-gray-700 rounded-md flex flex-col items-center justify-center cursor-pointer hover:border-[#00e0ff] transition-colors"
                onClick={triggerFileInput}
              >
                {imagePreview ? (
                  <div className="relative w-full h-full">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      style={{ objectFit: 'contain' }}
                      className="rounded-md"
                    />
                  </div>
                ) : (
                  <>
                    <Upload className="h-10 w-10 text-gray-500 mb-2" />
                    <p className="text-gray-400">Click to upload image</p>
                    <p className="text-sm text-gray-500">or drag and drop</p>
                  </>
                )}
              </div>
              
              <div className="flex justify-between mt-2">
                <Button 
                  variant="outline" 
                  onClick={triggerFileInput}
                  className="flex items-center gap-2"
                  disabled={loading.form}
                >
                  <ImagePlus className="h-4 w-4" />
                  {imagePreview ? "Change Image" : "Upload Image"}
                </Button>
                
                {imagePreview && (
                  <Button 
                    variant="destructive" 
                    onClick={() => {
                      setImagePreview(null)
                      setNewCategory({...newCategory, image: undefined})
                    }}
                    className="flex items-center gap-2"
                    disabled={loading.form}
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove
                  </Button>
                )}
              </div>
            </div>
            
            <div className="flex gap-2 pt-4">
              {isEditing ? (
                <>
                  <Button 
                    className="btn-primary flex-1"
                    onClick={updateCategory}
                    disabled={loading.form}
                  >
                    {loading.form ? "Updating..." : "Update Category"}
                  </Button>
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={resetForm}
                    disabled={loading.form}
                  >
                    Cancel
                  </Button>
                </>
              ) : (
                <Button 
                  className="btn-primary flex-1"
                  onClick={addCategory}
                  disabled={loading.form}
                >
                  {loading.form ? "Adding..." : "Add Category"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Categories List */}
      <div className="space-y-4">
        <h2 className="text-xl font-medium gradient-text">Product Categories</h2>
        
        {categories.length === 0 ? (
          <div className="bg-[#1e293b] rounded-lg border border-gray-800 p-12 text-center shadow-md">
            <div className="flex justify-center mb-4">
              <ImagePlus className="h-16 w-16 text-gray-500" />
            </div>
            <h3 className="text-xl font-medium mb-2 gradient-text">No categories found</h3>
            <p className="text-gray-400 mb-6">Add your first product category to get started</p>
            <Button 
              onClick={() => setIsEditing(null)}
              className="btn-primary"
              disabled={loading.form}
            >
              Add Category
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <div
                key={category.id}
                className="bg-[#1e293b] rounded-lg border border-gray-800 p-4 hover:border-[#00e0ff]/30 transition-colors duration-200 shadow-md card-hover"
              >
                <div className="w-full h-48 bg-[#0f172a] rounded-md overflow-hidden mb-4 relative">
                  <Image
                    src={getImageUrl(category.image)}
                    alt={category.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    className="w-full h-full"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium text-lg gradient-text">{category.name}</h3>
                  <p className="text-gray-400 text-sm line-clamp-2">{category.description}</p>
                  
                  <div className="flex justify-between items-center pt-2">
                    <div>
                      <p className="font-medium gradient-text">{formatPrice(category.price)}</p>
                      <p className="text-sm text-gray-400">Stock: {category.quantity}</p>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => editCategory(category.id)}
                        disabled={loading.form}
                      >
                        Edit
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => deleteCategory(category.id)}
                        disabled={loading.form}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}