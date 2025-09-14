import {
  TemperatureSalinityProfile,
  TimeSeriesChart,
  FloatDistributionChart,
  BGCParametersCard,
} from "@/components/data-charts"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function VisualizationsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b border-border bg-card">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <Link href="/">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Data Visualizations</h1>
              <p className="text-sm text-muted-foreground">Interactive charts and analysis tools</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <div className="xl:col-span-2">
            <TemperatureSalinityProfile />
          </div>

          <TimeSeriesChart />
          <BGCParametersCard />

          <div className="xl:col-span-2">
            <FloatDistributionChart />
          </div>
        </div>
      </div>
    </div>
  )
}
