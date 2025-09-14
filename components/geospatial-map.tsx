"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Download, ZoomIn, ZoomOut, RotateCcw } from "lucide-react"

// Sample ARGO float data
const argoFloats = [
  {
    id: "WMO_2901234",
    lat: 25.5,
    lon: 65.2,
    status: "active",
    lastProfile: "2024-01-15",
    temperature: 28.3,
    salinity: 35.1,
  },
  {
    id: "WMO_2901235",
    lat: 15.8,
    lon: 68.7,
    status: "active",
    lastProfile: "2024-01-14",
    temperature: 29.1,
    salinity: 34.9,
  },
  {
    id: "WMO_2901236",
    lat: 20.3,
    lon: 70.1,
    status: "inactive",
    lastProfile: "2024-01-10",
    temperature: 27.8,
    salinity: 35.3,
  },
  {
    id: "WMO_2901237",
    lat: 18.9,
    lon: 72.4,
    status: "active",
    lastProfile: "2024-01-15",
    temperature: 28.7,
    salinity: 35.0,
  },
  {
    id: "WMO_2901238",
    lat: 22.1,
    lon: 66.8,
    status: "active",
    lastProfile: "2024-01-15",
    temperature: 27.9,
    salinity: 35.2,
  },
  {
    id: "WMO_2901239",
    lat: 12.4,
    lon: 75.3,
    status: "active",
    lastProfile: "2024-01-14",
    temperature: 30.2,
    salinity: 34.7,
  },
]

export function GeospatialMap() {
  const [selectedFloat, setSelectedFloat] = useState<(typeof argoFloats)[0] | null>(null)
  const [mapLayer, setMapLayer] = useState("temperature")
  const [zoomLevel, setZoomLevel] = useState(6)

  const handleFloatClick = (float: (typeof argoFloats)[0]) => {
    setSelectedFloat(float)
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              ARGO Float Distribution
            </CardTitle>
            <CardDescription>Interactive map showing float positions and data</CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Select value={mapLayer} onValueChange={setMapLayer}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="temperature">Temperature</SelectItem>
                <SelectItem value="salinity">Salinity</SelectItem>
                <SelectItem value="depth">Max Depth</SelectItem>
                <SelectItem value="age">Data Age</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0">
        <div className="relative">
          {/* Map Controls */}
          <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
            <Button variant="outline" size="sm" onClick={() => setZoomLevel((prev) => Math.min(prev + 1, 10))}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm" onClick={() => setZoomLevel((prev) => Math.max(prev - 1, 1))}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>

          {/* Legend */}
          <div className="absolute top-4 left-4 z-10 bg-card border border-border rounded-lg p-3 shadow-lg">
            <h4 className="text-sm font-medium mb-2">Float Status</h4>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-chart-2" />
                <span className="text-xs">Active</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-muted-foreground" />
                <span className="text-xs">Inactive</span>
              </div>
            </div>
          </div>

          {/* Simulated Map Area */}
          <div className="h-96 bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900 relative overflow-hidden rounded-b-lg">
            {/* Ocean background pattern */}
            <div className="absolute inset-0 opacity-10">
              <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="waves" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M0 20 Q10 10 20 20 T40 20" stroke="currentColor" fill="none" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#waves)" />
              </svg>
            </div>

            {/* Float markers */}
            {argoFloats.map((float, index) => {
              const x = ((float.lon - 60) / 20) * 100 // Normalize longitude to percentage
              const y = ((30 - float.lat) / 20) * 100 // Normalize latitude to percentage (inverted)

              return (
                <div
                  key={float.id}
                  className={`absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 transition-all hover:scale-125 ${
                    selectedFloat?.id === float.id ? "scale-150 z-20" : "z-10"
                  }`}
                  style={{ left: `${x}%`, top: `${y}%` }}
                  onClick={() => handleFloatClick(float)}
                >
                  <div
                    className={`h-4 w-4 rounded-full border-2 border-white shadow-lg ${
                      float.status === "active" ? "bg-chart-2" : "bg-muted-foreground"
                    }`}
                  />

                  {/* Float label */}
                  <div className="absolute top-5 left-1/2 transform -translate-x-1/2 bg-card border border-border rounded px-2 py-1 text-xs whitespace-nowrap shadow-lg">
                    {float.id.split("_")[1]}
                  </div>
                </div>
              )
            })}

            {/* Coordinate grid */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Latitude lines */}
              {[0, 25, 50, 75, 100].map((y) => (
                <div key={y} className="absolute w-full border-t border-muted-foreground/20" style={{ top: `${y}%` }} />
              ))}
              {/* Longitude lines */}
              {[0, 25, 50, 75, 100].map((x) => (
                <div
                  key={x}
                  className="absolute h-full border-l border-muted-foreground/20"
                  style={{ left: `${x}%` }}
                />
              ))}
            </div>

            {/* Coordinate labels */}
            <div className="absolute bottom-2 left-2 text-xs text-muted-foreground">60°E</div>
            <div className="absolute bottom-2 right-2 text-xs text-muted-foreground">80°E</div>
            <div className="absolute top-2 left-2 text-xs text-muted-foreground">30°N</div>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-xs text-muted-foreground">
              Arabian Sea
            </div>
          </div>

          {/* Float Details Panel */}
          {selectedFloat && (
            <div className="absolute bottom-4 right-4 z-20 bg-card border border-border rounded-lg p-4 shadow-lg min-w-64">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium">{selectedFloat.id}</h4>
                <Badge variant={selectedFloat.status === "active" ? "default" : "secondary"}>
                  {selectedFloat.status}
                </Badge>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Position:</span>
                  <span>
                    {selectedFloat.lat.toFixed(2)}°N, {selectedFloat.lon.toFixed(2)}°E
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Temperature:</span>
                  <span className="text-chart-1">{selectedFloat.temperature}°C</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Salinity:</span>
                  <span className="text-chart-2">{selectedFloat.salinity} PSU</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Last Profile:</span>
                  <span>{selectedFloat.lastProfile}</span>
                </div>
              </div>

              <div className="flex gap-2 mt-3">
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  View Profile
                </Button>
                <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                  Download Data
                </Button>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
