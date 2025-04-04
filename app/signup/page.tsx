import Image from "next/image"
import Link from "next/link"
import { SignupForm } from "@/components/auth/signup-form"
import { Github, Twitter } from "lucide-react"

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-[#0f172a] text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-gray-800">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-gradient-to-r from-[#00e0ff] to-[#00a3ff] p-1.5 rounded-md shadow-lg group-hover:shadow-[#00e0ff]/20 transition-all duration-300">
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
        <div className="flex items-center gap-4">
          <Link href="#" className="hover:text-gray-300 transition-colors duration-200">
            <Github className="w-5 h-5" />
          </Link>
          <Link href="#" className="hover:text-gray-300 transition-colors duration-200">
            <Twitter className="w-5 h-5" />
          </Link>
          <Link href="#" className="btn-outline px-4 py-2">
            Contact Us
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 flex flex-col md:flex-row gap-12 items-center">
        {/* Left Column - Hero */}
        <div className="md:w-1/2 space-y-4 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold">
            Join Our E-commerce <br />
            <span className="gradient-text">Management Platform</span>
          </h1>
          <p className="text-gray-400 max-w-md">
            Create an account to access powerful tools for tracking sales, managing inventory, and growing your online
            store with advanced analytics.
          </p>

          {/* Dashboard Preview */}
          <div className="mt-8 rounded-lg overflow-hidden shadow-xl shadow-[#00e0ff]/5 group hover:shadow-[#00e0ff]/10 transition-all duration-300">
            <div className="relative">
              <Image
                src="https://placehold.co/1200x800/1e293b/ffffff?text=Dashboard+Preview"
                alt="Dashboard Preview"
                width={600}
                height={400}
                className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
            </div>
            <div className="bg-black bg-opacity-70 p-4 glass-effect">
              <h3 className="font-semibold">Comprehensive analytics dashboard</h3>
              <p className="text-sm text-gray-400">Track your business performance in real-time</p>
            </div>
          </div>
        </div>

        {/* Right Column - Signup Form */}
        <div className="md:w-1/2 max-w-md w-full animate-slide-up">
          <SignupForm />
        </div>
      </main>
    </div>
  )
}

