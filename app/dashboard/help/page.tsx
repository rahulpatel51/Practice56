"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, ChevronDown, MessageSquare, FileText, HelpCircle, ExternalLink } from "lucide-react"

interface FAQ {
  question: string
  answer: string
  category: string
}

const faqs: FAQ[] = [
  {
    question: "How do I add a new product?",
    answer:
      "To add a new product, go to the Products page and click on the 'Add Product' button. Fill in the product details in the form and click 'Save'.",
    category: "products",
  },
  {
    question: "How do I process an order?",
    answer:
      "To process an order, go to the Orders page, find the order you want to process, and click on the 'View' button. From there, you can update the order status and manage the fulfillment process.",
    category: "orders",
  },
  {
    question: "How do I generate sales reports?",
    answer:
      "To generate sales reports, go to the Analytics page and select the date range for your report. You can then export the data in various formats using the 'Export' button.",
    category: "analytics",
  },
  {
    question: "How do I add a new employee account?",
    answer:
      "To add a new employee, go to the Employees page and click on the 'Add Employee' button. Fill in the employee details and set their access permissions, then click 'Save'.",
    category: "employees",
  },
  {
    question: "How do I update my store information?",
    answer:
      "To update your store information, go to the Settings page and select the 'General' tab. From there, you can edit your store name, contact information, and other details.",
    category: "settings",
  },
  {
    question: "How do I connect a payment gateway?",
    answer:
      "To connect a payment gateway, go to the Settings page and select the 'Integrations' tab. Find the payment gateway you want to connect and click 'Configure'. Follow the instructions to complete the integration.",
    category: "settings",
  },
  {
    question: "How do I customize email notifications?",
    answer:
      "To customize email notifications, go to the Settings page and select the 'Notifications' tab. From there, you can enable/disable different types of notifications and customize their content.",
    category: "settings",
  },
]

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null)

  const toggleFAQ = (question: string) => {
    if (expandedFAQ === question) {
      setExpandedFAQ(null)
    } else {
      setExpandedFAQ(question)
    }
  }

  const filteredFAQs = searchQuery
    ? faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : faqs

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Help & Support</h1>
        <p className="text-gray-400">Find answers to common questions or contact our support team</p>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          type="text"
          placeholder="Search for help..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 bg-[#1e293b] border-gray-700 text-white w-full"
        />
      </div>

      <Tabs defaultValue="faq" className="w-full">
        <TabsList className="bg-[#1e293b] border border-gray-800">
          <TabsTrigger value="faq">FAQs</TabsTrigger>
          <TabsTrigger value="guides">Guides</TabsTrigger>
          <TabsTrigger value="contact">Contact Support</TabsTrigger>
        </TabsList>

        <TabsContent value="faq" className="mt-6">
          <div className="bg-[#1e293b] rounded-lg border border-gray-800 p-6">
            <h3 className="font-semibold text-lg mb-4">Frequently Asked Questions</h3>

            <div className="space-y-4">
              {filteredFAQs.length > 0 ? (
                filteredFAQs.map((faq) => (
                  <div key={faq.question} className="border border-gray-800 rounded-lg overflow-hidden">
                    <button
                      className="flex justify-between items-center w-full p-4 text-left hover:bg-[#1a2234] transition-colors"
                      onClick={() => toggleFAQ(faq.question)}
                    >
                      <span className="font-medium">{faq.question}</span>
                      <ChevronDown
                        className={`h-5 w-5 transition-transform ${expandedFAQ === faq.question ? "rotate-180" : ""}`}
                      />
                    </button>

                    {expandedFAQ === faq.question && (
                      <div className="p-4 bg-[#0f172a] border-t border-gray-800">
                        <p className="text-gray-300">{faq.answer}</p>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <HelpCircle className="mx-auto h-12 w-12 text-gray-500 mb-3" />
                  <h3 className="text-lg font-medium">No results found</h3>
                  <p className="text-gray-400 mt-1">Try a different search term or browse the guides</p>
                </div>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="guides" className="mt-6">
          <div className="bg-[#1e293b] rounded-lg border border-gray-800 p-6">
            <h3 className="font-semibold text-lg mb-4">Help Guides</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="border border-gray-800 rounded-lg p-4 hover:bg-[#1a2234] transition-colors">
                <FileText className="h-8 w-8 text-[#2dd4bf] mb-3" />
                <h4 className="font-medium text-lg mb-1">Getting Started Guide</h4>
                <p className="text-gray-400 text-sm mb-3">Learn the basics of using the AdminHub dashboard</p>
                <Button variant="link" className="text-[#2dd4bf] p-0 h-auto">
                  Read Guide <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </div>

              <div className="border border-gray-800 rounded-lg p-4 hover:bg-[#1a2234] transition-colors">
                <FileText className="h-8 w-8 text-[#2dd4bf] mb-3" />
                <h4 className="font-medium text-lg mb-1">Product Management</h4>
                <p className="text-gray-400 text-sm mb-3">Learn how to add and manage your products</p>
                <Button variant="link" className="text-[#2dd4bf] p-0 h-auto">
                  Read Guide <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </div>

              <div className="border border-gray-800 rounded-lg p-4 hover:bg-[#1a2234] transition-colors">
                <FileText className="h-8 w-8 text-[#2dd4bf] mb-3" />
                <h4 className="font-medium text-lg mb-1">Order Processing</h4>
                <p className="text-gray-400 text-sm mb-3">Learn how to manage and fulfill orders</p>
                <Button variant="link" className="text-[#2dd4bf] p-0 h-auto">
                  Read Guide <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </div>

              <div className="border border-gray-800 rounded-lg p-4 hover:bg-[#1a2234] transition-colors">
                <FileText className="h-8 w-8 text-[#2dd4bf] mb-3" />
                <h4 className="font-medium text-lg mb-1">Analytics & Reporting</h4>
                <p className="text-gray-400 text-sm mb-3">Learn how to use analytics to grow your business</p>
                <Button variant="link" className="text-[#2dd4bf] p-0 h-auto">
                  Read Guide <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </div>

              <div className="border border-gray-800 rounded-lg p-4 hover:bg-[#1a2234] transition-colors">
                <FileText className="h-8 w-8 text-[#2dd4bf] mb-3" />
                <h4 className="font-medium text-lg mb-1">User Management</h4>
                <p className="text-gray-400 text-sm mb-3">Learn how to manage employees and permissions</p>
                <Button variant="link" className="text-[#2dd4bf] p-0 h-auto">
                  Read Guide <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </div>

              <div className="border border-gray-800 rounded-lg p-4 hover:bg-[#1a2234] transition-colors">
                <FileText className="h-8 w-8 text-[#2dd4bf] mb-3" />
                <h4 className="font-medium text-lg mb-1">Settings & Configuration</h4>
                <p className="text-gray-400 text-sm mb-3">Learn how to configure your store settings</p>
                <Button variant="link" className="text-[#2dd4bf] p-0 h-auto">
                  Read Guide <ExternalLink className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="contact" className="mt-6">
          <div className="bg-[#1e293b] rounded-lg border border-gray-800 p-6">
            <h3 className="font-semibold text-lg mb-4">Contact Support</h3>
            <p className="text-gray-400 mb-6">Need help? Our support team is here to assist you</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border border-gray-800 rounded-lg p-6 flex flex-col items-center text-center">
                <MessageSquare className="h-12 w-12 text-[#2dd4bf] mb-4" />
                <h4 className="font-medium text-lg mb-2">Live Chat Support</h4>
                <p className="text-gray-400 mb-4">Chat with our support team in real-time</p>
                <Button className="bg-[#2dd4bf] hover:bg-[#2dd4bf]/90 text-black">Start Chat</Button>
                <p className="text-sm text-gray-400 mt-3">Available Monday-Friday, 9AM-6PM IST</p>
              </div>

              <div className="border border-gray-800 rounded-lg p-6">
                <h4 className="font-medium text-lg mb-4">Send a Message</h4>

                <form className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="block text-sm">
                      Your Name
                    </label>
                    <Input id="name" className="bg-[#0f172a] border-gray-700 text-white" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="block text-sm">
                      Your Email
                    </label>
                    <Input id="email" type="email" className="bg-[#0f172a] border-gray-700 text-white" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="block text-sm">
                      Subject
                    </label>
                    <Input id="subject" className="bg-[#0f172a] border-gray-700 text-white" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm">
                      Message
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full rounded-md bg-[#0f172a] border border-gray-700 text-white p-3 focus:outline-none focus:ring-2 focus:ring-[#2dd4bf] focus:border-transparent"
                    ></textarea>
                  </div>

                  <Button type="submit" className="bg-[#2dd4bf] hover:bg-[#2dd4bf]/90 text-black">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

