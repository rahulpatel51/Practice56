import { Activity, Clock, User, Users } from "lucide-react"

interface AnalyticsCardProps {
  title: string
  value: string
  change: string
  icon: "users" | "user" | "activity" | "clock"
  iconColor: string
  changeType?: "positive" | "negative"
}

export function AnalyticsCard({ title, value, change, icon, iconColor, changeType = "positive" }: AnalyticsCardProps) {
  const getIcon = () => {
    switch (icon) {
      case "users":
        return <Users className="h-6 w-6 text-white" />
      case "user":
        return <User className="h-6 w-6 text-white" />
      case "activity":
        return <Activity className="h-6 w-6 text-white" />
      case "clock":
        return <Clock className="h-6 w-6 text-white" />
    }
  }

  return (
    <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-800">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
          <p className="text-2xl font-bold mt-1">{value}</p>
          <p className={`text-sm mt-1 ${changeType === "positive" ? "text-green-500" : "text-red-500"}`}>{change}</p>
        </div>
        <div className={`${iconColor} p-3 rounded-full`}>{getIcon()}</div>
      </div>
    </div>
  )
}

