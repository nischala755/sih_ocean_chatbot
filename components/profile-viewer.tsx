"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
} from "recharts"
import { Waves, Download, Calendar, MapPin, Thermometer, Droplets } from "lucide-react"

// Extended sample data for detailed profile visualization
const profileData = [
  { depth: 0, temperature: 28.5, salinity: 35.2, pressure: 0, density: 1023.1, oxygen: 4.8 },
  { depth: 10, temperature: 28.3, salinity: 35.3, pressure: 1.0, density: 1023.2, oxygen: 4.7 },
  { depth: 20, temperature: 28.0, salinity: 35.4, pressure: 2.0, density: 1023.4, oxygen: 4.6 },
  { depth: 50, temperature: 26.8, salinity: 35.4, pressure: 5.0, density: 1024.1, oxygen: 4.2 },
  { depth: 75, temperature: 25.1, salinity: 35.6, pressure: 7.5, density: 1024.8, oxygen: 3.9 },
  { depth: 100, temperature: 22.1, salinity: 35.8, pressure: 10.0, density: 1025.6, oxygen: 3.5 },
  { depth: 150, temperature: 19.8, salinity: 36.0, pressure: 15.0, density: 1026.2, oxygen: 3.1 },
  { depth: 200, temperature: 18.3, salinity: 36.1, pressure: 20.0, density: 1026.5, oxygen: 2.8 },
  { depth: 300, temperature: 15.7, salinity: 36.2, pressure: 30.0, density: 1027.1, oxygen: 2.4 },
  { depth: 400, temperature: 13.9, salinity: 36.3, pressure: 40.0, density: 1027.5, oxygen: 2.1 },
  { depth: 500, temperature: 12.7, salinity: 36.3, pressure: 50.0, density: 1027.8, oxygen: 1.9 },
  { depth: 750, temperature: 9.8, salinity: 36.1, pressure: 75.0, density: 1028.2, oxygen: 1.6 },
  { depth: 1000, temperature: 8.2, salinity: 36.0, pressure: 100.0, density: 1028.5, oxygen: 1.4 },
  { depth: 1500, temperature: 5.1, salinity: 35.8, pressure: 150.0, density: 1028.9, oxygen: 1.2 },
  { depth: 2000, temperature: 3.2, salinity: 35.6, pressure: 200.0, density: 1029.1, oxygen: 1.1 },
]

const floatMetadata = {
  id: "WMO_2901234",
  position: { lat: 25.5, lon: 65.2 },
  profileDate: "2024-01-15T14:30:00Z",
  cycleNumber: 127,
  maxDepth: 2000,
  dataMode: "Real-time",
  qcFlag: "Good",
}

export function ProfileViewer() {
  const [selectedParameter, setSelectedParameter] = useState("temperature")
  const [comparisonMode, setComparisonMode] = useState(false)
  const [selectedDepthRange, setSelectedDepthRange] = useState("all")

  const getParameterConfig = (param: string) => {
    const configs = {
      temperature: {
        label: "Temperature (°C)",
        color: "hsl(var(--chart-1))",
        icon: Thermometer,
        unit: "°C",
      },
      salinity: {
        label: "Salinity (PSU)",
        color: "hsl(var(--chart-2))",
        icon: Droplets,
        unit: "PSU",
      },
      density: {
        label: "Density (kg/m³)",
        color: "hsl(var(--chart-3))",
        icon: Waves,
        unit: "kg/m³",
      },
      oxygen: {
        label: "Dissolved Oxygen (ml/L)",
        color: "hsl(var(--chart-4))",
        icon: Waves,
        unit: "ml/L",
      },
    }
    return configs[param as keyof typeof configs] || configs.temperature
  }

  const filteredData =
    selectedDepthRange === "surface"
      ? profileData.filter((d) => d.depth <= 200)
      : selectedDepthRange === "deep"
        ? profileData.filter((d) => d.depth >= 200)
        : profileData

  const config = getParameterConfig(selectedParameter)

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Waves className="h-5 w-5" />
                ARGO Profile Viewer
              </CardTitle>
              <CardDescription>Detailed oceanographic profile analysis for Float {floatMetadata.id}</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary">
                <Calendar className="h-3 w-3 mr-1" />
                Cycle {floatMetadata.cycleNumber}
              </Badge>
              <Badge variant="outline">{floatMetadata.qcFlag} Quality</Badge>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Position</p>
              <p className="font-medium flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {floatMetadata.position.lat.toFixed(2)}°N, {floatMetadata.position.lon.toFixed(2)}°E
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Profile Date</p>
              <p className="font-medium">{new Date(floatMetadata.profileDate).toLocaleDateString()}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Max Depth</p>
              <p className="font-medium">{floatMetadata.maxDepth}m</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Data Mode</p>
              <p className="font-medium">{floatMetadata.dataMode}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Controls */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Parameter:</label>
              <Select value={selectedParameter} onValueChange={setSelectedParameter}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="temperature">Temperature</SelectItem>
                  <SelectItem value="salinity">Salinity</SelectItem>
                  <SelectItem value="density">Density</SelectItem>
                  <SelectItem value="oxygen">Dissolved Oxygen</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Depth Range:</label>
              <Select value={selectedDepthRange} onValueChange={setSelectedDepthRange}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Depths</SelectItem>
                  <SelectItem value="surface">Surface (0-200m)</SelectItem>
                  <SelectItem value="deep">Deep (200m+)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Profile
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Profile Visualization */}
      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList>
          <TabsTrigger value="profile">Depth Profile</TabsTrigger>
          <TabsTrigger value="scatter">T-S Diagram</TabsTrigger>
          <TabsTrigger value="data">Raw Data</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <config.icon className="h-5 w-5" />
                {config.label} vs Depth
              </CardTitle>
              <CardDescription>Vertical profile showing {selectedParameter} variation with depth</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={filteredData} margin={{ top: 5, right: 30, left: 40, bottom: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis
                      dataKey={selectedParameter}
                      type="number"
                      domain={["dataMin - 1", "dataMax + 1"]}
                      label={{
                        value: config.label,
                        position: "insideBottom",
                        offset: -10,
                        style: { textAnchor: "middle" },
                      }}
                      className="text-muted-foreground"
                    />
                    <YAxis
                      dataKey="depth"
                      type="number"
                      reversed
                      domain={["dataMin", "dataMax"]}
                      label={{
                        value: "Depth (m)",
                        angle: -90,
                        position: "insideLeft",
                        style: { textAnchor: "middle" },
                      }}
                      className="text-muted-foreground"
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload
                          return (
                            <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
                              <p className="text-sm font-medium">{`Depth: ${data.depth}m`}</p>
                              <p className="text-sm" style={{ color: config.color }}>
                                {`${config.label.split(" ")[0]}: ${data[selectedParameter]} ${config.unit}`}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">{`Pressure: ${data.pressure} dbar`}</p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey={selectedParameter}
                      stroke={config.color}
                      strokeWidth={2}
                      dot={{ fill: config.color, strokeWidth: 2, r: 3 }}
                      activeDot={{ r: 5, stroke: config.color, strokeWidth: 2 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scatter">
          <Card>
            <CardHeader>
              <CardTitle>Temperature-Salinity Diagram</CardTitle>
              <CardDescription>T-S diagram showing water mass characteristics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart data={filteredData} margin={{ top: 20, right: 20, bottom: 40, left: 40 }}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                    <XAxis
                      dataKey="salinity"
                      type="number"
                      domain={["dataMin - 0.1", "dataMax + 0.1"]}
                      label={{
                        value: "Salinity (PSU)",
                        position: "insideBottom",
                        offset: -10,
                      }}
                      className="text-muted-foreground"
                    />
                    <YAxis
                      dataKey="temperature"
                      type="number"
                      domain={["dataMin - 1", "dataMax + 1"]}
                      label={{
                        value: "Temperature (°C)",
                        angle: -90,
                        position: "insideLeft",
                      }}
                      className="text-muted-foreground"
                    />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const data = payload[0].payload
                          return (
                            <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
                              <p className="text-sm font-medium">{`Depth: ${data.depth}m`}</p>
                              <p className="text-sm text-chart-1">{`Temperature: ${data.temperature}°C`}</p>
                              <p className="text-sm text-chart-2">{`Salinity: ${data.salinity} PSU`}</p>
                              <p className="text-sm text-chart-3">{`Density: ${data.density} kg/m³`}</p>
                            </div>
                          )
                        }
                        return null
                      }}
                    />
                    <Scatter
                      dataKey="temperature"
                      fill="hsl(var(--chart-1))"
                      stroke="hsl(var(--chart-1))"
                      strokeWidth={1}
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="data">
          <Card>
            <CardHeader>
              <CardTitle>Raw Profile Data</CardTitle>
              <CardDescription>
                Complete dataset for Float {floatMetadata.id} - Cycle {floatMetadata.cycleNumber}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-2">Depth (m)</th>
                      <th className="text-left p-2">Temperature (°C)</th>
                      <th className="text-left p-2">Salinity (PSU)</th>
                      <th className="text-left p-2">Pressure (dbar)</th>
                      <th className="text-left p-2">Density (kg/m³)</th>
                      <th className="text-left p-2">Oxygen (ml/L)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.map((row, index) => (
                      <tr key={index} className="border-b border-border/50 hover:bg-muted/50">
                        <td className="p-2 font-mono">{row.depth}</td>
                        <td className="p-2 font-mono">{row.temperature}</td>
                        <td className="p-2 font-mono">{row.salinity}</td>
                        <td className="p-2 font-mono">{row.pressure}</td>
                        <td className="p-2 font-mono">{row.density}</td>
                        <td className="p-2 font-mono">{row.oxygen}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
