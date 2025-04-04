"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

export function VisitorChart() {
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
    const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const newVisitorsData = [2800, 1800, 3200, 2400, 3500, 3800, 4200, 3700, 4500, 4200, 4800, 5200]
    const returningVisitorsData = [1800, 1200, 2200, 1600, 2500, 2700, 2800, 2600, 3100, 3000, 3300, 3800]

    // Create chart
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: {
        labels,
        datasets: [
          {
            label: "New Visitors",
            data: newVisitorsData,
            borderColor: "#2dd4bf",
            backgroundColor: "rgba(45, 212, 191, 0.1)",
            fill: true,
            tension: 0.4,
          },
          {
            label: "Returning Visitors",
            data: returningVisitorsData,
            borderColor: "#3b82f6",
            backgroundColor: "rgba(59, 130, 246, 0.1)",
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: "top",
            labels: {
              color: "#94a3b8",
              usePointStyle: true,
              padding: 20,
            },
          },
          tooltip: {
            mode: "index",
            intersect: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: "rgba(148, 163, 184, 0.1)",
            },
            ticks: {
              color: "#94a3b8",
            },
          },
          x: {
            grid: {
              display: false,
            },
            ticks: {
              color: "#94a3b8",
            },
          },
        },
        interaction: {
          intersect: false,
          mode: "nearest",
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
        <h3 className="text-xl font-semibold">Visitor Statistics</h3>
        <p className="text-gray-400 text-sm">New vs returning visitors over time</p>
      </div>
      <div className="h-64">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  )
}

