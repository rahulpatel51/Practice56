"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function SettingsPage() {
  const [generalSettings, setGeneralSettings] = useState({
    storeName: "AdminHub Store",
    storeEmail: "store@adminhub.com",
    storePhone: "+91 98765 43210",
    currency: "INR",
    timezone: "Asia/Kolkata",
    dateFormat: "DD/MM/YYYY",
  })

  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setGeneralSettings((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setGeneralSettings((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-gray-400">Manage your store settings and preferences</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="bg-[#1e293b] border border-gray-800">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-6">
          <div className="bg-[#1e293b] rounded-lg border border-gray-800 p-6">
            <h3 className="font-semibold text-lg mb-4">General Settings</h3>
            <p className="text-gray-400 mb-6">Configure your store's basic information</p>

            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="storeName">Store Name</Label>
                  <Input
                    id="storeName"
                    name="storeName"
                    value={generalSettings.storeName}
                    onChange={handleGeneralChange}
                    className="bg-[#0f172a] border-gray-700 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="storeEmail">Store Email</Label>
                  <Input
                    id="storeEmail"
                    name="storeEmail"
                    type="email"
                    value={generalSettings.storeEmail}
                    onChange={handleGeneralChange}
                    className="bg-[#0f172a] border-gray-700 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="storePhone">Store Phone</Label>
                  <Input
                    id="storePhone"
                    name="storePhone"
                    value={generalSettings.storePhone}
                    onChange={handleGeneralChange}
                    className="bg-[#0f172a] border-gray-700 text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="currency">Currency</Label>
                  <Select
                    value={generalSettings.currency}
                    onValueChange={(value) => handleSelectChange("currency", value)}
                  >
                    <SelectTrigger className="bg-[#0f172a] border-gray-700 text-white">
                      <SelectValue placeholder="Select currency" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1e293b] border-gray-700 text-white">
                      <SelectItem value="INR">Indian Rupee (₹)</SelectItem>
                      <SelectItem value="USD">US Dollar ($)</SelectItem>
                      <SelectItem value="EUR">Euro (€)</SelectItem>
                      <SelectItem value="GBP">British Pound (£)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select
                    value={generalSettings.timezone}
                    onValueChange={(value) => handleSelectChange("timezone", value)}
                  >
                    <SelectTrigger className="bg-[#0f172a] border-gray-700 text-white">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1e293b] border-gray-700 text-white">
                      <SelectItem value="Asia/Kolkata">India (GMT+5:30)</SelectItem>
                      <SelectItem value="America/New_York">New York (GMT-4)</SelectItem>
                      <SelectItem value="Europe/London">London (GMT+1)</SelectItem>
                      <SelectItem value="Asia/Tokyo">Tokyo (GMT+9)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dateFormat">Date Format</Label>
                  <Select
                    value={generalSettings.dateFormat}
                    onValueChange={(value) => handleSelectChange("dateFormat", value)}
                  >
                    <SelectTrigger className="bg-[#0f172a] border-gray-700 text-white">
                      <SelectValue placeholder="Select date format" />
                    </SelectTrigger>
                    <SelectContent className="bg-[#1e293b] border-gray-700 text-white">
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end">
                <Button type="submit" className="bg-[#2dd4bf] hover:bg-[#2dd4bf]/90 text-black">
                  Save Changes
                </Button>
              </div>
            </form>
          </div>
        </TabsContent>

        <TabsContent value="appearance" className="mt-6">
          <div className="bg-[#1e293b] rounded-lg border border-gray-800 p-6">
            <h3 className="font-semibold text-lg mb-4">Appearance Settings</h3>
            <p className="text-gray-400 mb-6">Customize how your dashboard looks</p>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Dark Mode</h4>
                  <p className="text-sm text-gray-400">Enable dark mode for the dashboard</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Compact View</h4>
                  <p className="text-sm text-gray-400">Use compact spacing for UI elements</p>
                </div>
                <Switch />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Show Help Tips</h4>
                  <p className="text-sm text-gray-400">Display helpful tooltips throughout the interface</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="notifications" className="mt-6">
          <div className="bg-[#1e293b] rounded-lg border border-gray-800 p-6">
            <h3 className="font-semibold text-lg mb-4">Notification Settings</h3>
            <p className="text-gray-400 mb-6">Configure how you receive notifications</p>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Email Notifications</h4>
                  <p className="text-sm text-gray-400">Receive notifications via email</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Browser Notifications</h4>
                  <p className="text-sm text-gray-400">Receive notifications in your browser</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Order Alerts</h4>
                  <p className="text-sm text-gray-400">Get notified about new orders</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Low Stock Alerts</h4>
                  <p className="text-sm text-gray-400">Get notified when products are running low</p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="integrations" className="mt-6">
          <div className="bg-[#1e293b] rounded-lg border border-gray-800 p-6">
            <h3 className="font-semibold text-lg mb-4">Integrations</h3>
            <p className="text-gray-400 mb-6">Connect with third-party services</p>

            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500 p-2 rounded">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Payment Gateway</h4>
                    <p className="text-sm text-gray-400">Connect your payment processor</p>
                  </div>
                </div>
                <Button variant="outline" className="border-gray-700 hover:bg-gray-800">
                  Configure
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-green-500 p-2 rounded">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white"
                    >
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Email Marketing</h4>
                    <p className="text-sm text-gray-400">Connect your email marketing platform</p>
                  </div>
                </div>
                <Button variant="outline" className="border-gray-700 hover:bg-gray-800">
                  Configure
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-purple-500 p-2 rounded">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white"
                    >
                      <path d="M12 2H2v10h10V2Z" />
                      <path d="M22 12H12v10h10V12Z" />
                      <path d="M22 2h-5v5h5V2Z" />
                      <path d="M7 12H2v5h5v-5Z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Analytics</h4>
                    <p className="text-sm text-gray-400">Connect your analytics platform</p>
                  </div>
                </div>
                <Button variant="outline" className="border-gray-700 hover:bg-gray-800">
                  Configure
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

