import { LandingFooter } from "@/components/landing/Footer"
import { LandingHeader } from "@/components/landing/Header"

export default function LandingLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className="min-h-screen ">
        <LandingHeader />
        <main className="flex-1">{children}</main>
        <LandingFooter />
      </div>
    )
  }