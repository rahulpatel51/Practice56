"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

export function TrafficSourceChart() {
  const chartRef = useRef<HTMLCanvasElement>(null)
  const chartInstance = useRef<Chart | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // Destroy existing chart
    if (chartInstance.current) {
      chartInstance.current.destroy()
    }

    const ctx = chartRef.current.getContext("2d")
    if (!ctx) return

    // Sample data
    const data = {
      labels: ["Direct", "Organic Search", "Referral", "Social Media", "Email", "Paid Ads"],
      datasets: [
        {
          data: [35, 25, 15, 12, 8, 5],
          backgroundColor: ["#2dd4bf", "#3b82f6", "#a855f7", "#f97316", "#ec4899", "#eab308"],
          borderWidth: 0,
          borderRadius: 5,
        },
      ],
    }

    // Create chart
    chartInstance.current = new Chart(ctx, {
      type: "doughnut",
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: "70%",
        plugins: {
          legend: {
            position: "right",
            labels: {
              color: "#94a3b8",
              padding: 20,
              usePointStyle: true,
              pointStyle: "rectRounded",
            },
          },
          tooltip: {
            callbacks: {
              label: (context) => {
                const label = context.label || ""
                const value = context.raw as number
                return `${label}: ${value}%`
              },
            },
          },
        },
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  return (
    <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-800">
      <div className="mb-4">
        <h3 className="text-xl font-semibold">Traffic Sources</h3>
        <p className="text-gray-400 text-sm">Where your visitors are coming from</p>
      </div>
      <div className="h-64">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  )
}

