import "./globals.css"

export const metadata = {
  title: "AI GitHub Issue Search",
  description: "Search GitHub issues with AI-powered insights",
  icons: {
    icon: "/icon.svg"
  }
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <main className="flex-grow">{children}</main>
        <footer className="bg-gray-100 py-4 text-center text-sm text-gray-600">
          <div className="container mx-auto">
            <a href="#" className="mx-2 hover:underline">
              Privacy Policy
            </a>
            <a href="#" className="mx-2 hover:underline">
              Terms of Service
            </a>
            <a href="#" className="mx-2 hover:underline">
              About
            </a>
          </div>
        </footer>
      </body>
    </html>
  )
}

