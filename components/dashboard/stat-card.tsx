import { DollarSign, ShoppingCart, Package, Users } from "lucide-react"

interface StatCardProps {
  title: string
  value: string
  change: string
  icon: "dollar" | "cart" | "box" | "users"
  iconColor: string
}

export function StatCard({ title, value, change, icon, iconColor }: StatCardProps) {
  const getIcon = () => {
    switch (icon) {
      case "dollar":
        return <DollarSign className="h-6 w-6 text-white" />
      case "cart":
        return <ShoppingCart className="h-6 w-6 text-white" />
      case "box":
        return <Package className="h-6 w-6 text-white" />
      case "users":
        return <Users className="h-6 w-6 text-white" />
    }
  }

  return (
    <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-800 card-hover shadow-md">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-gray-400 text-sm font-medium">{title}</h3>
          <p className="text-2xl font-bold mt-1 gradient-text">{value}</p>
          <p className="text-green-500 text-sm mt-1 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path
                fillRule="evenodd"
                d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z"
                clipRule="evenodd"
              />
            </svg>
            {change} from last month
          </p>
        </div>
        <div className={`${iconColor} p-3 rounded-full shadow-lg`}>{getIcon()}</div>
      </div>
    </div>
  )
}

