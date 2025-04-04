"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Camera, Mail, MapPin, Phone } from "lucide-react"

export default function ProfilePage() {
  const [profileData, setProfileData] = useState({
    fullName: "Admin User",
    email: "admin@adminhub.com",
    phone: "+91 98765 43210",
    location: "Mumbai, India",
    bio: "Experienced e-commerce administrator with 5+ years of experience managing online stores and optimizing sales processes.",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProfileData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Save profile data
    alert("Profile updated successfully!")
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-gray-400">Manage your account settings and preferences</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="bg-[#1e293b] border border-gray-800">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Profile Photo */}
            <div className="bg-[#1e293b] rounded-lg border border-gray-800 p-6 flex flex-col items-center">
              <div className="relative">
                <div className="w-32 h-32 rounded-full bg-gray-700 overflow-hidden mb-4">
                  <img
                    src="https://ui-avatars.com/api/?name=Admin+User&background=0D8ABC&color=fff&size=128"
                    alt="Admin User"
                    className="w-full h-full object-cover"
                  />
                </div>
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute bottom-4 right-0 rounded-full bg-[#2dd4bf] hover:bg-[#2dd4bf]/90 text-black"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <h3 className="font-semibold text-lg mt-2">Admin User</h3>
              <p className="text-gray-400 text-sm">Administrator</p>

              <div className="w-full mt-6 space-y-4">
                <div className="flex items-center text-sm">
                  <Mail className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-300">{profileData.email}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Phone className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-300">{profileData.phone}</span>
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-300">{profileData.location}</span>
                </div>
              </div>
            </div>

            {/* Profile Form */}
            <div className="bg-[#1e293b] rounded-lg border border-gray-800 p-6 md:col-span-2">
              <h3 className="font-semibold text-lg mb-4">Personal Information</h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <label htmlFor="fullName" className="block text-sm">
                    Full Name
                  </label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={profileData.fullName}
                    onChange={handleChange}
                    className="bg-[#0f172a] border-gray-700 text-white"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={profileData.email}
                      onChange={handleChange}
                      className="bg-[#0f172a] border-gray-700 text-white"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="phone" className="block text-sm">
                      Phone
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      value={profileData.phone}
                      onChange={handleChange}
                      className="bg-[#0f172a] border-gray-700 text-white"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="location" className="block text-sm">
                    Location
                  </label>
                  <Input
                    id="location"
                    name="location"
                    value={profileData.location}
                    onChange={handleChange}
                    className="bg-[#0f172a] border-gray-700 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="bio" className="block text-sm">
                    Bio
                  </label>
                  <Textarea
                    id="bio"
                    name="bio"
                    value={profileData.bio}
                    onChange={handleChange}
                    rows={4}
                    className="bg-[#0f172a] border-gray-700 text-white resize-none"
                  />
                </div>

                <div className="flex justify-end">
                  <Button type="submit" className="bg-[#2dd4bf] hover:bg-[#2dd4bf]/90 text-black">
                    Save Changes
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="security" className="mt-6">
          <div className="bg-[#1e293b] rounded-lg border border-gray-800 p-6">
            <h3 className="font-semibold text-lg mb-4">Security Settings</h3>
            <p className="text-gray-400 mb-6">Manage your password and security preferences</p>

            {/* Password Change Form */}
            <form className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="currentPassword" className="block text-sm">
                  Current Password
                </label>
                <Input id="currentPassword" type="password" className="bg-[#0f172a] border-gray-700 text-white" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="newPassword" className="block text-sm">
                    New Password
                  </label>
                  <Input id="newPassword" type="password" className="bg-[#0f172a] border-gray-700 text-white" />
                </div>

                <div className="space-y-2">
                  <label htmlFor="confirmPassword" className="block text-sm">
                    Confirm New Password
                  </label>
                  <Input id="confirmPassword" type="password" className="bg-[#0f172a] border-gray-700 text-white" />
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" className="bg-[#2dd4bf] hover:bg-[#2dd4bf]/90 text-black">
                  Update Password
                </Button>
              </div>
            </form>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <div className="bg-[#1e293b] rounded-lg border border-gray-800 p-6">
            <h3 className="font-semibold text-lg mb-4">Notification Preferences</h3>
            <p className="text-gray-400 mb-6">Manage how you receive notifications</p>

            {/* Notification settings would go here */}
            <p className="text-center text-gray-400 py-8">Notification settings coming soon</p>
          </div>
        </TabsContent>

        <TabsContent value="billing" className="mt-6">
          <div className="bg-[#1e293b] rounded-lg border border-gray-800 p-6">
            <h3 className="font-semibold text-lg mb-4">Billing Information</h3>
            <p className="text-gray-400 mb-6">Manage your billing details and payment methods</p>

            {/* Billing settings would go here */}
            <p className="text-center text-gray-400 py-8">Billing settings coming soon</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

