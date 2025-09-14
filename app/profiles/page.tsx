import { ProfileViewer } from "@/components/profile-viewer"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function ProfilesPage() {
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
              <h1 className="text-xl font-semibold text-foreground">Profile Analysis</h1>
              <p className="text-sm text-muted-foreground">Detailed oceanographic profile visualization</p>
            </div>
          </div>
        </div>
      </div>

      <div className="p-6">
        <ProfileViewer />
      </div>
    </div>
  )
}
