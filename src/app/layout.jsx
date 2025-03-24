import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/globals/navbar/Navbar'
import Footer from '@/components/globals/footer/Footer'
import { ThemeContextProvider } from '@/context/ThemeContext'
import ThemeProvider from '@/providers/ThemeProvider'
import AuthProvider from '@/providers/AuthProvider'
import UpArrow from '@/components/globals/upArrow/UpArrow'
// import Head from 'next/head'

const inter = Inter({ subsets: ['latin'], weight: ['200', '300', '400', '600', '700' ] })

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
  metadataBase: new URL(process.env.BASE_URL),
  alternates: {
    canonical: './',
  },

}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* <head>
        <Head>
          <link rel="canonical" href={process.env.BASE_URL} />
        </Head>
      </head> */}
      <body 
        className={inter.className}
      >
        <AuthProvider>
          <ThemeContextProvider>
            <ThemeProvider>
              <div className="container">
                <Navbar/>
                <div className="wrapper">
                  {children}     
                  <UpArrow/>
                </div>
                <Footer/>
              </div>
            </ThemeProvider>
          </ThemeContextProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
