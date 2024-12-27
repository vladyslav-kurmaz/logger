import { Providers } from './providers'
import { Navigation } from './components/Navigation'
import './globals.css'
import { Logger } from '@/lib/logger/logger'


export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {

  return (
    <html lang='en'>
      <body>
        <Providers>
          <Navigation />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  )
}
