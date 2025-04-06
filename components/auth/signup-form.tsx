"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, ArrowRight, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner" // Assuming you're using Sonner for toast notifications


export function SignupForm() {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [termsAccepted, setTermsAccepted] = useState(false)

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = "Full name is required"
    }
    
    if (!formData.email.includes("@")) {
      newErrors.email = "Valid email is required"
    }
    
    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters"
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }
    
    if (!termsAccepted) {
      newErrors.terms = "You must accept the terms and conditions"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsLoading(true)

    try {
      // const response = await signup({
      //   name: formData.name,
      //   email: formData.email,
      //   password: formData.password
      // })
      
      // Define the expected response type
      // type LoginResponse = { token: string }

      // Cast response.data to the expected type
      // const data = response.data as LoginResponse

      // sessionStorage.setItem('authToken', data.token)
         
      // toast.success("Account created successfully!")
      // router.push("/dashboard")
    } catch (error: any) {
      console.error("Signup error:", error)
      
      if (error.response) {
        // Backend validation errors
        if (error.response.data?.errors) {
          const backendErrors = error.response.data.errors
          const newErrors: typeof errors = {}
          
          if (backendErrors.name) newErrors.name = backendErrors.name
          if (backendErrors.email) newErrors.email = backendErrors.email
          if (backendErrors.password) newErrors.password = backendErrors.password
          
          setErrors(newErrors)
        } else if (error.response.data?.message) {
          toast.error(error.response.data.message)
        } else {
          toast.error("Signup failed. Please try again.")
        }
      } else {
        toast.error("Network error. Please check your connection.")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="w-full space-y-6 bg-[#1e293b]/90 backdrop-blur-sm p-8 rounded-xl border border-gray-700 shadow-2xl">
      <div className="text-center">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-[#00e0ff] to-[#00a3ff] bg-clip-text text-transparent">
          Create Account
        </h2>
        <p className="text-gray-400 mt-2">Join our platform to get started</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-300">
            Full Name
          </label>
          <Input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            className={`bg-[#0f172a] border-gray-700 focus:border-[#00e0ff] focus:ring-1 focus:ring-[#00e0ff]/30 text-white ${
              errors.name ? "border-red-500 focus:border-red-500 focus:ring-red-500/30" : ""
            }`}
          />
          {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">
            Email
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            className={`bg-[#0f172a] border-gray-700 focus:border-[#00e0ff] focus:ring-1 focus:ring-[#00e0ff]/30 text-white ${
              errors.email ? "border-red-500 focus:border-red-500 focus:ring-red-500/30" : ""
            }`}
          />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email}</p>}
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-300">
            Password
          </label>
          <div className="relative">
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              className={`bg-[#0f172a] border-gray-700 focus:border-[#00e0ff] focus:ring-1 focus:ring-[#00e0ff]/30 text-white pr-10 ${
                errors.password ? "border-red-500 focus:border-red-500 focus:ring-red-500/30" : ""
              }`}
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#00e0ff] transition-colors duration-200"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {errors.password ? (
            <p className="text-red-400 text-xs mt-1">{errors.password}</p>
          ) : (
            <p className="text-xs text-gray-500 mt-1">Minimum 8 characters</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300">
            Confirm Password
          </label>
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type="password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`bg-[#0f172a] border-gray-700 focus:border-[#00e0ff] focus:ring-1 focus:ring-[#00e0ff]/30 text-white ${
              errors.confirmPassword ? "border-red-500 focus:border-red-500 focus:ring-red-500/30" : ""
            }`}
          />
          {errors.confirmPassword && <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>}
        </div>

        <div className="flex items-start space-x-2 pt-2">
          <Checkbox
            id="terms"
            checked={termsAccepted}
            onCheckedChange={(checked) => setTermsAccepted(!!checked)}
            className="border-gray-600 data-[state=checked]:bg-[#00e0ff] data-[state=checked]:border-[#00e0ff] mt-0.5"
          />
          <label htmlFor="terms" className="text-sm text-gray-300 leading-snug">
            I agree to the{" "}
            <Link href="#" className="text-[#00e0ff] hover:underline transition-colors duration-200">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link href="#" className="text-[#00e0ff] hover:underline transition-colors duration-200">
              Privacy Policy
            </Link>
          </label>
        </div>
        {errors.terms && <p className="text-red-400 text-xs -mt-2">{errors.terms}</p>}

        <Button
          type="submit"
          className="w-full mt-2 bg-gradient-to-r from-[#00e0ff] to-[#00a3ff] hover:from-[#00a3ff] hover:to-[#00e0ff] text-black font-medium shadow-lg hover:shadow-[#00e0ff]/20 transition-all duration-300"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Creating account...
            </>
          ) : (
            <>
              Sign Up <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      </form>

      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-700" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-[#1e293b] px-2 text-gray-400">Or continue with</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button 
          variant="outline" 
          className="bg-[#0f172a] border-gray-700 hover:bg-gray-800"
          disabled={isLoading}
        >
          <GoogleIcon className="mr-2 h-4 w-4" />
          Google
        </Button>
        <Button 
          variant="outline" 
          className="bg-[#0f172a] border-gray-700 hover:bg-gray-800"
          disabled={isLoading}
        >
          <FacebookIcon className="mr-2 h-4 w-4 text-blue-500" />
          Facebook
        </Button>
      </div>

      <p className="text-center text-sm text-gray-400 pt-4">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-[#00e0ff] hover:text-[#00a3ff] hover:underline transition-colors duration-200"
        >
          Sign in
        </Link>
      </p>
    </div>
  )
}

function GoogleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  )
}

function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  )
}