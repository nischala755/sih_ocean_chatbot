"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
} from "recharts"
import { TrendingUp, Download, Filter, Calendar } from "lucide-react"

// Sample data for oceanographic visualizations
const temperatureProfileData = [
  { depth: 0, temperature: 28.5, salinity: 35.2 },
  { depth: 50, temperature: 26.8, salinity: 35.4 },
  { depth: 100, temperature: 22.1, salinity: 35.8 },
  { depth: 200, temperature: 18.3, salinity: 36.1 },
  { depth: 500, temperature: 12.7, salinity: 36.3 },
  { depth: 1000, temperature: 8.2, salinity: 36.0 },
  { depth: 1500, temperature: 5.1, salinity: 35.8 },
  { depth: 2000, temperature: 3.2, salinity: 35.6 },
]

const timeSeriesData = [
  { date: "2024-01", temperature: 24.2, salinity: 35.1 },
  { date: "2024-02", temperature: 23.8, salinity: 35.3 },
  { date: "2024-03", temperature: 25.1, salinity: 35.0 },
  { date: "2024-04", temperature: 26.3, salinity: 34.9 },
  { date: "2024-05", temperature: 27.8, salinity: 34.8 },
  { date: "2024-06", temperature: 28.9, salinity: 34.7 },
  { date: "2024-07", temperature: 29.2, salinity: 34.6 },
  { date: "2024-08", temperature: 28.7, salinity: 34.8 },
]

const floatDistributionData = [
  { region: "North Atlantic", count: 847, active: 782 },
  { region: "South Atlantic", count: 623, active: 591 },
  { region: "North Pacific", count: 1205, active: 1134 },
  { region: "South Pacific", count: 892, active: 834 },
  { region: "Indian Ocean", count: 456, active: 421 },
  { region: "Arctic Ocean", count: 124, active: 85 },
]

const bgcParametersData = [
  { parameter: "Chlorophyll-a", value: 0.45, unit: "mg/m³", trend: "up" },
  { parameter: "Dissolved Oxygen", value: 6.2, unit: "ml/L", trend: "stable" },
  { parameter: "Nitrate", value: 12.8, unit: "μmol/kg", trend: "down" },
  { parameter: "pH", value: 8.1, unit: "", trend: "down" },
  { parameter: "Backscatter", value: 0.0012, unit: "m⁻¹", trend: "up" },
]

export function TemperatureSalinityProfile() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Temperature & Salinity Profile</CardTitle>
            <CardDescription>Depth profile from ARGO Float #2901234</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary">Live Data</Badge>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={temperatureProfileData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="temperature"
                type="number"
                domain={["dataMin - 2", "dataMax + 2"]}
                label={{ value: "Temperature (°C)", position: "insideBottom", offset: -10 }}
                className="text-muted-foreground"
              />
              <YAxis
                dataKey="depth"
                type="number"
                reversed
                domain={["dataMin", "dataMax"]}
                label={{ value: "Depth (m)", angle: -90, position: "insideLeft" }}
                className="text-muted-foreground"
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
                        <p className="text-sm font-medium">{`Depth: ${payload[0]?.payload?.depth}m`}</p>
                        <p className="text-sm text-chart-1">{`Temperature: ${label}°C`}</p>
                        <p className="text-sm text-chart-2">{`Salinity: ${payload[0]?.payload?.salinity} PSU`}</p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Line
                type="monotone"
                dataKey="temperature"
                stroke="hsl(var(--chart-1))"
                strokeWidth={2}
                dot={{ fill: "hsl(var(--chart-1))", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export function TimeSeriesChart() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Surface Temperature Trends</CardTitle>
            <CardDescription>Monthly averages from Arabian Sea region</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="h-4 w-4 mr-2" />
              Range
            </Button>
            <Button variant="outline" size="sm">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={timeSeriesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="temperatureGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis dataKey="date" className="text-muted-foreground" tick={{ fontSize: 12 }} />
              <YAxis
                className="text-muted-foreground"
                tick={{ fontSize: 12 }}
                label={{ value: "Temperature (°C)", angle: -90, position: "insideLeft" }}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
                        <p className="text-sm font-medium">{`Month: ${label}`}</p>
                        <p className="text-sm text-chart-1">{`Temperature: ${payload[0]?.value}°C`}</p>
                        <p className="text-sm text-chart-2">{`Salinity: ${payload[0]?.payload?.salinity} PSU`}</p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Area
                type="monotone"
                dataKey="temperature"
                stroke="hsl(var(--chart-1))"
                fillOpacity={1}
                fill="url(#temperatureGradient)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export function FloatDistributionChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Float Distribution by Region</CardTitle>
        <CardDescription>Active vs total floats across ocean basins</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={floatDistributionData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
              <XAxis
                dataKey="region"
                className="text-muted-foreground"
                tick={{ fontSize: 11 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis
                className="text-muted-foreground"
                tick={{ fontSize: 12 }}
                label={{ value: "Number of Floats", angle: -90, position: "insideLeft" }}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
                        <p className="text-sm font-medium">{label}</p>
                        <p className="text-sm text-chart-1">{`Total: ${payload[0]?.value} floats`}</p>
                        <p className="text-sm text-chart-2">{`Active: ${payload[1]?.value} floats`}</p>
                      </div>
                    )
                  }
                  return null
                }}
              />
              <Bar dataKey="count" fill="hsl(var(--chart-1))" name="Total" />
              <Bar dataKey="active" fill="hsl(var(--chart-2))" name="Active" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

export function BGCParametersCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">BGC Parameters</CardTitle>
        <CardDescription>Latest biogeochemical measurements</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {bgcParametersData.map((param, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm">{param.parameter}</span>
                  <Badge
                    variant={param.trend === "up" ? "default" : param.trend === "down" ? "destructive" : "secondary"}
                    className="text-xs"
                  >
                    {param.trend === "up" && <TrendingUp className="h-3 w-3 mr-1" />}
                    {param.trend}
                  </Badge>
                </div>
                <div className="text-lg font-semibold text-foreground">
                  {param.value} {param.unit}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
