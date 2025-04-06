"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner" // Assuming you're using Sonner for toast notifications

export function LoginForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [isLoading, setIsLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; password?: string; general?: string }>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData(prev => ({
      ...prev,
      [id]: value
    }))
    // Clear error when user types
    if (errors[id as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [id]: undefined }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrors({})

    // Basic validation
    if (!formData.email) {
      setErrors(prev => ({ ...prev, email: "Email is required" }))
      setIsLoading(false)
      return
    }

    if (!formData.password) {
      setErrors(prev => ({ ...prev, password: "Password is required" }))
      setIsLoading(false)
      return
    }

    // try {
    //   const response = await authService.login({
    //     email: formData.email,
    //     password: formData.password
    //   })

      // // Define the expected response type
      // type LoginResponse = { token: string }

      // // Cast response.data to the expected type
      // const data = response.data as LoginResponse

      // // Store token based on remember me choice
      // if (rememberMe) {
      //   localStorage.setItem('authToken', data.token)
      // } else {
      //   sessionStorage.setItem('authToken', data.token)
      // }
      
    //   toast.success("Login successful!")
    //   router.push("/dashboard")
    // } catch (error: any) {
    //   console.error("Login error:", error)
      
    //   if (error.response) {
    //     // Backend validation errors
    //     if (error.response.data?.errors) {
    //       const backendErrors = error.response.data.errors
    //       const newErrors: typeof errors = {}
          
    //       if (backendErrors.email) newErrors.email = backendErrors.email
    //       if (backendErrors.password) newErrors.password = backendErrors.password
          
    //       setErrors(newErrors)
    //     } else if (error.response.data?.message) {
    //       setErrors({ general: error.response.data.message })
    //     } else {
    //       setErrors({ general: "Login failed. Please try again." })
    //     }
    //   } else {
    //     setErrors({ general: "Network error. Please check your connection." })
    //   }
    // } finally {
    //   setIsLoading(false)
    // }
  }

  return (
    <div className="w-full max-w-md bg-gradient-to-br from-gray-900 to-gray-800/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 shadow-2xl">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00e0ff] to-[#00a3ff] mb-2">
          Welcome Back
        </h2>
        <p className="text-gray-400">Sign in to access your dashboard</p>
      </div>

      {/* Error Message */}
      {errors.general && (
        <div className="mb-4 p-3 bg-red-900/50 border border-red-700/50 rounded-lg text-red-300 text-sm">
          {errors.general}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email Field */}
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">
            Email Address
          </label>
          <div className="relative">
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
              className={`w-full bg-gray-900/50 ${errors.email ? 'border-red-500' : 'border-gray-700'} focus:border-[#00e0ff] focus:ring-1 focus:ring-[#00e0ff]/50 text-white transition-all duration-300 pl-10`}
              required
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
          </div>
          {errors.email && <p className="text-red-400 text-xs">{errors.email}</p>}
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">
              Password
            </label>
            <Link href="/forgot-password" className="text-xs text-[#00e0ff] hover:text-[#00a3ff] transition-colors">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              className={`w-full bg-gray-900/50 ${errors.password ? 'border-red-500' : 'border-gray-700'} focus:border-[#00e0ff] focus:ring-1 focus:ring-[#00e0ff]/50 text-white transition-all duration-300 pl-10`}
              required
              minLength={6}
            />
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
            </div>
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {errors.password && <p className="text-red-400 text-xs">{errors.password}</p>}
        </div>

        {/* Remember Me */}
        <div className="flex items-center">
          <Checkbox
            id="remember"
            checked={rememberMe}
            onCheckedChange={(checked) => setRememberMe(!!checked)}
            className="border-gray-600 data-[state=checked]:bg-gradient-to-br data-[state=checked]:from-[#00e0ff] data-[state=checked]:to-[#00a3ff]"
          />
          <label htmlFor="remember" className="ml-2 text-sm text-gray-300 cursor-pointer">
            Remember me
          </label>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-[#00e0ff] to-[#00a3ff] hover:from-[#00e0ff]/90 hover:to-[#00a3ff]/90 text-black font-medium rounded-lg transition-all duration-300 shadow-lg hover:shadow-[0_5px_20px_-5px_rgba(0,224,255,0.3)]"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              Sign In
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      {/* Divider */}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-700/50"></div>
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="px-2 bg-gray-900 text-gray-400">OR CONTINUE WITH</span>
        </div>
      </div>

      {/* Social Login Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          className="bg-gray-900/50 border-gray-700 hover:bg-gray-800/70 hover:border-gray-600 transition-all"
          disabled={isLoading}
        >
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
          Google
        </Button>
        <Button
          variant="outline"
          className="bg-gray-900/50 border-gray-700 hover:bg-gray-800/70 hover:border-gray-600 transition-all"
          disabled={isLoading}
        >
          <svg className="mr-2 h-4 w-4 text-[#1877F2]" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          Facebook
        </Button>
      </div>

      {/* Sign Up Link */}
      <div className="text-center text-sm text-gray-400 mt-6">
        Don't have an account?{" "}
        <Link href="/signup" className="text-[#00e0ff] hover:text-[#00a3ff] font-medium transition-colors">
          Sign up now
        </Link>
      </div>
    </div>
  )
}