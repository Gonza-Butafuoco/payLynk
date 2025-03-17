import "@/styles/globals.css"; // Importación ABSOLUTAMENTE necesaria

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="min-h-screen max-w-[100vw]">{children}</body>
    </html>
  )
}