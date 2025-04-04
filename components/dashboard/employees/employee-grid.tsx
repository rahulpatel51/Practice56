"use client"

import { Mail, MessageSquare, MoreVertical, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

interface Employee {
  id: string
  name: string
  position: string
  department: string
  email: string
  phone: string
  image: string
}

const employees: Employee[] = [
  {
    id: "EMP-001",
    name: "Rahul Sharma",
    position: "Senior Developer",
    department: "Engineering",
    email: "rahul@adminhub.com",
    phone: "+91 98765 43210",
    image: "https://ui-avatars.com/api/?name=Rahul+Sharma&background=0D8ABC&color=fff",
  },
  {
    id: "EMP-002",
    name: "Priya Patel",
    position: "UI/UX Designer",
    department: "Design",
    email: "priya@adminhub.com",
    phone: "+91 87654 32109",
    image: "https://ui-avatars.com/api/?name=Priya+Patel&background=7C3AED&color=fff",
  },
  {
    id: "EMP-003",
    name: "Amit Kumar",
    position: "Product Manager",
    department: "Product",
    email: "amit@adminhub.com",
    phone: "+91 76543 21098",
    image: "https://ui-avatars.com/api/?name=Amit+Kumar&background=059669&color=fff",
  },
  {
    id: "EMP-004",
    name: "Neha Gupta",
    position: "Marketing Specialist",
    department: "Marketing",
    email: "neha@adminhub.com",
    phone: "+91 65432 10987",
    image: "https://ui-avatars.com/api/?name=Neha+Gupta&background=DB2777&color=fff",
  },
  {
    id: "EMP-005",
    name: "Vikram Singh",
    position: "Sales Manager",
    department: "Sales",
    email: "vikram@adminhub.com",
    phone: "+91 54321 09876",
    image: "https://ui-avatars.com/api/?name=Vikram+Singh&background=D97706&color=fff",
  },
  {
    id: "EMP-006",
    name: "Ananya Desai",
    position: "Customer Support",
    department: "Support",
    email: "ananya@adminhub.com",
    phone: "+91 43210 98765",
    image: "https://ui-avatars.com/api/?name=Ananya+Desai&background=E11D48&color=fff",
  },
  {
    id: "EMP-007",
    name: "Rajesh Verma",
    position: "Finance Analyst",
    department: "Finance",
    email: "rajesh@adminhub.com",
    phone: "+91 32109 87654",
    image: "https://ui-avatars.com/api/?name=Rajesh+Verma&background=4F46E5&color=fff",
  },
  {
    id: "EMP-008",
    name: "Meera Joshi",
    position: "HR Manager",
    department: "HR",
    email: "meera@adminhub.com",
    phone: "+91 21098 76543",
    image: "https://ui-avatars.com/api/?name=Meera+Joshi&background=0EA5E9&color=fff",
  },
]

export function EmployeeGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {employees.map((employee) => (
        <div key={employee.id} className="bg-[#1e293b] rounded-lg border border-gray-800 overflow-hidden">
          <div className="relative p-4">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-8 w-8 rounded-full text-gray-400 hover:bg-gray-800 hover:text-white"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>

            <div className="flex flex-col items-center">
              <div className="w-24 h-24 rounded-full bg-gray-700 overflow-hidden mb-4">
                <img
                  src={employee.image || "/placeholder.svg"}
                  alt={employee.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <h3 className="font-semibold text-lg text-center">{employee.name}</h3>
              <p className="text-gray-400 text-sm text-center mb-2">{employee.position}</p>

              <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-800 text-gray-300 mb-4">
                {employee.department}
              </span>
            </div>

            <div className="space-y-3 mt-2">
              <div className="flex items-center text-sm">
                <Mail className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-gray-300">{employee.email}</span>
              </div>

              <div className="flex items-center text-sm">
                <Phone className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-gray-300">{employee.phone}</span>
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <Button variant="outline" className="flex-1 border-[#2dd4bf] text-[#2dd4bf] hover:bg-[#2dd4bf]/10">
                View Profile
              </Button>
              <Button variant="outline" className="flex-1 border-gray-700 text-white hover:bg-gray-800">
                <MessageSquare className="h-4 w-4 mr-1" />
                Message
              </Button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

