import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Waves, MapPin, BarChart3, MessageSquare, Settings, Search } from "lucide-react"
import Link from "next/link"

export default function ArgoDataDashboard() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Waves className="h-5 w-5" />
            </div>
            <div>
              <h1 className="text-xl font-semibold text-foreground">ARGO Data Explorer</h1>
              <p className="text-sm text-muted-foreground">AI-Powered Oceanographic Analysis</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Search className="h-4 w-4 mr-2" />
              Search Data
            </Button>
            <Button variant="ghost" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Navigation */}
        <aside className="w-64 border-r border-sidebar-border bg-sidebar p-4">
          <nav className="space-y-2">
            <div className="mb-4">
              <h2 className="text-sm font-medium text-sidebar-foreground mb-2">Data Views</h2>
            </div>

            <Button variant="ghost" className="w-full justify-start bg-sidebar-accent text-sidebar-accent-foreground">
              <BarChart3 className="h-4 w-4 mr-3" />
              Overview Dashboard
            </Button>

            <Link href="/map">
              <Button
                variant="ghost"
                className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <MapPin className="h-4 w-4 mr-3" />
                Geospatial Map
              </Button>
            </Link>

            <Link href="/profiles">
              <Button
                variant="ghost"
                className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <Waves className="h-4 w-4 mr-3" />
                Depth Profiles
              </Button>
            </Link>

            <Link href="/visualizations">
              <Button
                variant="ghost"
                className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              >
                <BarChart3 className="h-4 w-4 mr-3" />
                Time Series
              </Button>
            </Link>

            <div className="mt-6 pt-4 border-t border-sidebar-border">
              <h2 className="text-sm font-medium text-sidebar-foreground mb-2">AI Assistant</h2>
              <Link href="/chat">
                <Button
                  variant="ghost"
                  className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                >
                  <MessageSquare className="h-4 w-4 mr-3" />
                  Chat Interface
                </Button>
              </Link>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Status Bar */}
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="bg-chart-1/10 text-chart-1 border-chart-1/20">
                <div className="h-2 w-2 rounded-full bg-chart-1 mr-2" />
                Live Data Connected
              </Badge>
              <span className="text-sm text-muted-foreground">Last updated: 2 minutes ago</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Active Floats:</span>
              <span className="text-lg font-semibold text-foreground">3,847</span>
            </div>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Quick Stats */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Global Coverage</CardTitle>
                <CardDescription>Active ARGO floats worldwide</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground mb-1">3,847</div>
                <div className="text-sm text-muted-foreground">
                  <span className="text-chart-2">+127</span> new this month
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Data Points</CardTitle>
                <CardDescription>Total measurements collected</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground mb-1">2.4M</div>
                <div className="text-sm text-muted-foreground">
                  <span className="text-chart-2">+15.2K</span> today
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Ocean Regions</CardTitle>
                <CardDescription>Areas with active monitoring</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground mb-1">12</div>
                <div className="text-sm text-muted-foreground">Major ocean basins covered</div>
              </CardContent>
            </Card>
          </div>

          {/* Main Visualization Area */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Map Placeholder */}
            <Card className="xl:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Global ARGO Float Distribution
                </CardTitle>
                <CardDescription>Interactive map showing current float positions and recent profiles</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/map">
                  <div className="h-96 bg-muted rounded-lg flex items-center justify-center cursor-pointer hover:bg-muted/80 transition-colors">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-3" />
                      <p className="text-muted-foreground">Click to view interactive map</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        Showing float positions, trajectories, and data collection points
                      </p>
                    </div>
                  </div>
                </Link>
              </CardContent>
            </Card>

            {/* Recent Profiles */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Waves className="h-5 w-5" />
                  Recent Profiles
                </CardTitle>
                <CardDescription>Latest temperature and salinity measurements</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/profiles">
                  <div className="h-64 bg-muted rounded-lg flex items-center justify-center cursor-pointer hover:bg-muted/80 transition-colors">
                    <div className="text-center">
                      <BarChart3 className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Click to view profile analysis</p>
                    </div>
                  </div>
                </Link>
              </CardContent>
            </Card>

            {/* AI Chat Preview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  AI Assistant
                </CardTitle>
                <CardDescription>Ask questions about the oceanographic data</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Try asking:</p>
                    <ul className="text-sm text-foreground mt-2 space-y-1">
                      <li>• "Show salinity profiles near the equator"</li>
                      <li>• "Compare BGC data in the Arabian Sea"</li>
                      <li>• "Find nearest floats to coordinates"</li>
                    </ul>
                  </div>
                  <Link href="/chat">
                    <Button className="w-full bg-transparent" variant="outline">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Start Conversation
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  )
}
