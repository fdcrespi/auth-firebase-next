import '@/styles/globals.css'
import { AuthContextProvider } from '../../context/AuthContext'
import Navbar from '../../components/navbar'

export default function App({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <Navbar>
        <Component {...pageProps} />
      </Navbar>
    </AuthContextProvider>
  )
}
