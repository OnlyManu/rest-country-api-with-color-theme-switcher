import Head from 'next/head';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useTheme } from '../../lib/themecontext'
import styles from '../../styles/Home.module.css'
import utils from '../../styles/utils.module.css'

import { getCountry, Icountry } from '../../lib/countries';

import Navbar from '../../components/navbar/navbar';
import GridCountry from '../../components/grid-country/grid-country';



export default function Country({themeSelected, country}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { theme } = useTheme()

  return(
    <div className={styles.container + " " + theme}>
      <Head>
        <title>Frontend Mentor | Rest Countries API</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png"></link>
      </Head>

      <header className={styles.header}>
        <Navbar />
      </header>
      <main className={styles.main}>
        {
          country.status === "sucess" ? (
            <GridCountry country={country.data as Icountry} />    
          ) : (
            <span className={utils.error}>A problem Occured or this country doesn&apos;t exist</span>      
          )
        }
        
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let theme: string | undefined = "light"
  if (Object.hasOwn(context.req.cookies, "theme")) {
    theme = context.req.cookies.theme
  }

  let country: any = {}
  if (context.params) {
    const countryName: string | string[] | undefined = context.params.name  
    country = await getCountry(countryName as string)
  }
  
  return {
    props: {
      themeSelected: theme,
      country
    }
  }
}
