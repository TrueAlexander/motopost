import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/navbar/Navbar'
import Footer from '@/components/footer/Footer'
import { ThemeContextProvider } from '@/context/ThemeContext'
import ThemeProvider from '@/providers/ThemeProvider'
import AuthProvider from '@/providers/AuthProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'MotoPost | Espaço de motociclistas',
  description: 'Espaço de motociclistas | Viagens | Notícias | Oficína | Dicas | Estilo',
  // themeColor: '#2b2737',
  openGraph: {
    title: 'MotoPost | Espaço de motociclistas',
    description: 'Espaço de motociclistas | Viagens | Notícias | Oficína | Dicas | Estilo',
    // url: 'https://russolinguo.com/',
    siteName: 'MotoPost',
    // images: 'https://i.ibb.co/Y33yVng/img-OGextra-Big.png',
    type: 'website',
  }, 

}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ThemeContextProvider>
            <ThemeProvider>
              <div className="container">
                <div className="wrapper">
                  <Navbar/>
                  {children}
                  <Footer/>
                </div>
              </div>
            </ThemeProvider>
          </ThemeContextProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
