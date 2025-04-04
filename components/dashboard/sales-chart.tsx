"use client"

import { useEffect, useRef } from "react"
import { Chart, registerables } from "chart.js"

Chart.register(...registerables)

export function SalesChart() {
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
    const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    const salesData = [120, 190, 150, 170, 240, 295, 200]

    // Create chart
    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels,
        datasets: [
          {
            label: "Sales",
            data: salesData,
            backgroundColor: [
              "rgba(0, 224, 255, 0.7)",
              "rgba(0, 204, 255, 0.7)",
              "rgba(0, 184, 255, 0.7)",
              "rgba(0, 163, 255, 0.7)",
              "rgba(0, 143, 255, 0.7)",
              "rgba(0, 122, 255, 0.7)",
              "rgba(0, 102, 255, 0.7)",
            ],
            borderRadius: 6,
            borderWidth: 0,
            hoverBackgroundColor: [
              "rgba(0, 224, 255, 0.9)",
              "rgba(0, 204, 255, 0.9)",
              "rgba(0, 184, 255, 0.9)",
              "rgba(0, 163, 255, 0.9)",
              "rgba(0, 143, 255, 0.9)",
              "rgba(0, 122, 255, 0.9)",
              "rgba(0, 102, 255, 0.9)",
            ],
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
            },
          },
          tooltip: {
            mode: "index",
            intersect: false,
            backgroundColor: "rgba(15, 23, 42, 0.9)",
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
      },
    })

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy()
      }
    }
  }, [])

  return (
    <div className="bg-[#1e293b] rounded-lg p-6 border border-gray-800 shadow-md card-hover">
      <div className="mb-4">
        <h3 className="text-xl font-semibold gradient-text">Sales Statistics</h3>
        <p className="text-gray-400 text-sm">Daily sales for the current week</p>
      </div>
      <div className="h-64">
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  )
}

