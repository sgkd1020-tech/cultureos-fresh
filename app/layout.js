import './globals.css'

export const metadata = {
  title: 'CultureOS',
  description: 'Cultural Impact Simulation Engine',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
