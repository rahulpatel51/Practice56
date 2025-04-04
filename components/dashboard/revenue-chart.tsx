"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

export function RevenueChart() {
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

    // Create gradient for each dataset
    const revenueGradient = ctx.createLinearGradient(0, 0, 0, 400)
    revenueGradient.addColorStop(0, "rgba(0, 224, 255, 0.3)")
    revenueGradient.addColorStop(1, "rgba(0, 224, 255, 0)")

    const profitGradient = ctx.createLinearGradient(0, 0, 0, 400)
    profitGradient.addColorStop(0, "rgba(0, 163, 255, 0.3)")
    profitGradient.addColorStop(1, "rgba(0, 163, 255, 0)")

    // Sample data - you might want to fetch this from an API in a real app
    const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const revenueData = [400000, 200000, 500000, 400000, 600000, 550000, 700000, 750000, 800000, 850000, 900000, 950000]
    const profitData = [200000, 150000, 300000, 280000, 400000, 380000, 450000, 500000, 550000, 600000, 650000, 700000]

    // Create chart
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "Revenue",
            data: revenueData,
            borderColor: "#00e0ff",
            backgroundColor: revenueGradient,
            fill: true,
            tension: 0.4,
            borderWidth: 2,
            pointBackgroundColor: "#00e0ff",
            pointRadius: 4,
            pointHoverRadius: 6,
            pointBorderColor: "#ffffff",
            pointBorderWidth: 2,
          },
          {
            label: "Profit",
            data: profitData,
            borderColor: "#00a3ff",
            backgroundColor: profitGradient,
            fill: true,
            tension: 0.4,
            borderWidth: 2,
            pointBackgroundColor: "#00a3ff",
            pointRadius: 4,
            pointHoverRadius: 6,
            pointBorderColor: "#ffffff",
            pointBorderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "bottom",
            labels: {
              color: "#94a3b8",
              usePointStyle: true,
              padding: 20,
              font: {
                size: 12,
                weight: "500",
              },
            },
          },
          tooltip: {
            mode: "index",
            intersect: false,
            backgroundColor: "rgba(15, 23, 42, 0.95)",
            titleColor: "#ffffff",
            bodyColor: "#e2e8f0",
            borderColor: "#334155",
            borderWidth: 1,
            padding: 12,
            displayColors: true,
            boxWidth: 10,
            boxHeight: 10,
            boxPadding: 3,
            usePointStyle: true,
            callbacks: {
              labelPointStyle: () => ({
                pointStyle: "circle",
                rotation: 0,
              }),
              label: (context) => {
                let label = context.dataset.label || ""
                if (label) {
                  label += ": "
                }
                if (context.parsed.y !== null) {
                  label += new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                    maximumFractionDigits: 0,
                  }).format(context.parsed.y)
                }
                return label
              },
            },
          },
          title: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: false,
            grid: {
              color: "rgba(148, 163, 184, 0.1)",
              drawBorder: false,
            },
            ticks: {
              color: "#94a3b8",
              padding: 10,
              callback: (value) => {
                return new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                  notation: "compact",
                  maximumFractionDigits: 1,
                }).format(Number(value))
              },
            },
          },
          x: {
            grid: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              color: "#94a3b8",
              padding: 10,
            },
          },
        },
        interaction: {
          intersect: false,
          mode: "nearest",
        },
        animation: {
          duration: 1000,
          easing: "easeOutQuart",
        },
        elements: {
          line: {
            cubicInterpolationMode: "monotone",
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
    <div className="bg-[#1e293b] rounded-xl p-6 border border-gray-800 shadow-lg card-hover transition-all duration-300 hover:shadow-xl">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-white">Revenue Overview</h3>
        <p className="text-gray-400 text-sm">Monthly revenue and profit for 2023</p>
      </div>
      <div className="h-80 relative">
        <canvas ref={chartRef}></canvas>
        <div className="absolute top-4 right-4 flex space-x-2">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#00e0ff] mr-1"></div>
            <span className="text-xs text-gray-300">Revenue</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#00a3ff] mr-1"></div>
            <span className="text-xs text-gray-300">Profit</span>
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-between text-sm text-gray-400">
        <span>Last updated: {new Date().toLocaleDateString()}</span>
        <span className="text-blue-400">View full report →</span>
      </div>
    </div>
  )
}

