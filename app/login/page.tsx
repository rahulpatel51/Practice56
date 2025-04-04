"use client"
import { LoginForm } from "@/components/auth/login-form"
import { Github, Twitter, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#0f172a] to-gray-900 text-white">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-10"></div>
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 rounded-full bg-[#00e0ff]/20 blur-3xl animate-float"></div>
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 rounded-full bg-[#00a3ff]/20 blur-3xl animate-float-delay"></div>
      </div>

      {/* Header */}
      <header className="relative z-10 container mx-auto px-6 py-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-gradient-to-br from-[#00e0ff] to-[#00a3ff] p-2 rounded-lg shadow-lg group-hover:shadow-[0_0_20px_-5px_rgba(0,224,255,0.5)] transition-all duration-500">
              <svg className="w-6 h-6 text-black" viewBox="0 0 24 24" fill="currentColor">
                <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
              </svg>
            </div>
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00e0ff] to-[#00a3ff]">
              AdminHub
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="#" className="p-2 rounded-full hover:bg-gray-800/50 transition-all duration-300">
              <Github className="w-5 h-5 hover:text-[#00e0ff] transition-colors" />
            </Link>
            <Link href="#" className="p-2 rounded-full hover:bg-gray-800/50 transition-all duration-300">
              <Twitter className="w-5 h-5 hover:text-[#00e0ff] transition-colors" />
            </Link>
            <Link href="#" className="flex items-center gap-1 px-4 py-2 rounded-lg border border-gray-700 hover:border-[#00e0ff]/50 hover:bg-[#00e0ff]/10 hover:text-[#00e0ff] transition-all duration-300">
              Contact Us
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-6 py-12 flex flex-col lg:flex-row items-center justify-between gap-16">
        {/* Left Column */}
        <div className="lg:w-1/2 space-y-8 animate-fade-in">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Elevate Your <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#00e0ff] to-[#00a3ff]">Business</span> Intelligence
            </h1>
            <p className="text-lg text-gray-300 max-w-lg">
              Powerful analytics dashboard to track sales, manage inventory, and grow your business with real-time insights.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              "Real-time analytics",
              "Inventory management",
              "Customer insights",
              "Sales forecasting",
              "Custom reports",
              "Multi-platform"
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/30 hover:bg-gray-800/50 transition-all duration-300">
                <div className="p-1.5 rounded-full bg-gradient-to-br from-[#00e0ff] to-[#00a3ff]">
                  <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span>{feature}</span>
              </div>
            ))}
          </div>

          {/* Dashboard Preview */}
          <div className="relative group mt-8">
            <div className="absolute -inset-2 bg-gradient-to-r from-[#00e0ff] to-[#00a3ff] rounded-2xl blur-lg opacity-20 group-hover:opacity-30 transition-all duration-500"></div>
            <div className="relative rounded-xl overflow-hidden border border-gray-700/50 bg-gradient-to-br from-gray-900 to-gray-800">
              <Image
                src="/dashboard-preview.png"
                alt="Dashboard Preview"
                width={800}
                height={500}
                className="w-full h-auto group-hover:scale-[1.02] transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                <h3 className="font-semibold text-lg">Interactive Dashboard</h3>
                <p className="text-sm text-gray-400">Monitor all your business metrics in one place</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Login Form */}
        <div className="lg:w-1/2 flex justify-center animate-slide-up">
          <LoginForm />
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