"use client"

import Image from "next/image"
import Link from "next/link"
import { SignupForm } from "@/components/auth/signup-form"
import { Github, Twitter } from "lucide-react"

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] to-[#1e293b] text-white">
      {/* Header */}
      <header className="flex items-center justify-between p-6 border-b border-gray-800">
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
          <span className="font-bold text-xl bg-gradient-to-r from-[#00e0ff] to-[#00a3ff] bg-clip-text text-transparent">
            AdminHub
          </span>
        </Link>
        <div className="flex items-center gap-4">
          <Link
            href="#"
            className="text-gray-400 hover:text-[#00e0ff] transition-colors duration-200"
            aria-label="GitHub"
          >
            <Github className="w-5 h-5" />
          </Link>
          <Link
            href="#"
            className="text-gray-400 hover:text-[#00e0ff] transition-colors duration-200"
            aria-label="Twitter"
          >
            <Twitter className="w-5 h-5" />
          </Link>
          <Link
            href="#"
            className="px-4 py-2 rounded-md border border-[#00e0ff] text-[#00e0ff] hover:bg-[#00e0ff]/10 transition-colors duration-200"
          >
            Contact Us
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12 items-center justify-center min-h-[calc(100vh-80px)]">
        {/* Left Column - Hero */}
        <div className="lg:w-1/2 space-y-6 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Join Our E-commerce <br />
            <span className="bg-gradient-to-r from-[#00e0ff] to-[#00a3ff] bg-clip-text text-transparent">
              Management Platform
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-lg">
            Create an account to access powerful tools for tracking sales, managing inventory, and growing your online
            store with advanced analytics.
          </p>

          {/* Dashboard Preview */}
          <div className="mt-8 rounded-xl overflow-hidden shadow-2xl shadow-[#00e0ff]/10 group hover:shadow-[#00e0ff]/20 transition-all duration-500">
            <div className="relative aspect-video">
              <Image
                src="/dashboard-preview.png"
                alt="Dashboard Preview"
                width={800}
                height={500}
                className="w-full h-auto group-hover:scale-[1.02] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            </div>
            <div className="bg-gradient-to-r from-[#00e0ff]/10 to-[#00a3ff]/10 p-4 backdrop-blur-sm">
              <h3 className="font-semibold text-white">Comprehensive analytics dashboard</h3>
              <p className="text-sm text-gray-300">Track your business performance in real-time</p>
            </div>
          </div>
        </div>

        {/* Right Column - Signup Form */}
        <div className="w-full max-w-md">
          <SignupForm />
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 container mx-auto px-6 py-8 border-t border-gray-800/50">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© {new Date().getFullYear()} AdminHub. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
              Terms of Service
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white transition-colors duration-300 text-sm">
              Contact Support
            </Link>
          </div>
        </div>
      </footer>

      {/* Animation Styles */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-float-delay { animation: float 8s ease-in-out infinite 2s; }
        .animate-fade-in { animation: fadeIn 1s ease-out; }
        .animate-slide-up { animation: slideUp 1s ease-out; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}</style>
    </div>
  )
}