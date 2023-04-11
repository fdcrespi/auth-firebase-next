import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useEffect } from 'react'
import { useAuth } from '../../context/AuthContext'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const { user } = useAuth();

  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  });


  return (
    <>
      <Head>
        <title>CELTA - Sucursal Virtual</title>
        <meta name="description" content="Sucursal virtual de CELTA Tres Arroyos" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1> 
          Bienvenido a la sucursal virtual de CELTA
        </h1>

      </main>
    </>
  )
}
