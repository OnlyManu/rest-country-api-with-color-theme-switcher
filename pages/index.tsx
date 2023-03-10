import Head from 'next/head'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useReducer, useState } from 'react'
import { useTheme } from '../lib/themecontext'
import styles from '../styles/Home.module.css'

import { getCountries, CountriesType, RegionType, Icountry } from '../lib/countries'

import Navbar from '../components/navbar/navbar'
import InputSearch from '../components/input-search/input-search'
import SelectRegion from '../components/select-region/select-region'
import GridCountries from '../components/grid-countries/grid-countries'

type ActionType = { type: "filter_by_name", payload: string } | { type: "filter_by_region", payload: string }


export default function Home({ themeSelected, initialCountries }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  function reducer(state: typeof initialState, action: ActionType) {
    switch (action.type) {
      case "filter_by_name": {
        const name_filter: string = action.payload
        const region_filter: RegionType = state.region_filter as RegionType
        
        const countries = initialCountries.filter((country: any) => {
          const regName = new RegExp(`${name_filter}`, "i")
        
          if (region_filter !== "") {
            const regRegion = new RegExp(`${region_filter}`, "i")
            return regRegion.test(country.region) && regName.test(country.name) 
          }
          
          return regName.test(country.name)
        })

        return {...state, name_filter, countries}
      }
        
      case "filter_by_region": {
        const region_filter: RegionType = action.payload as RegionType
        const name_filter: string = state.name_filter

        let countries
        if (region_filter === "") {
          countries = [...initialCountries]
          if (name_filter !== "") {
            countries = countries.filter((country: any) => {
              const regName = new RegExp(`${name_filter}`, "i")
              return regName.test(country.name)
            })
          }
        } else {
          countries = initialCountries.filter((country: any) => {
            const regRegion = new RegExp(`${region_filter}`, "i")
            if (name_filter !== "") {
              const regName = new RegExp(`${name_filter}`, "i")
              return regRegion.test(country.region) && regName.test(country.name) 
            }
            return regRegion.test(country.region)
          })
        }

        return {...state, region_filter, countries}
      }
        
      default: {
        throw new Error()
      }
    }
  }

  let initialState = {
    name_filter: "",
    region_filter: "",
    countries: initialCountries
  };

  const { theme } = useTheme()
  const [state, dispatch] = useReducer(reducer, initialState)
  const [loadingState, setLoaddingState] = useState<boolean>(true)
  
  const filterByRegion = (region: RegionType): void => {
    dispatch({ type: "filter_by_region", payload: region })
  }

  const filterByName = (name: string): void => {
    setLoaddingState(true)
    dispatch({ type: "filter_by_name", payload: name })
  }

  const loadingComplete = (): void => {
    setLoaddingState(false)
  }
  
  return (
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
        <section className={styles.searchbar}>
          <InputSearch onChange={filterByName} initialValue={state.name_filter as string} />
          <SelectRegion onClick={filterByRegion} initialValue={state.region_filter as RegionType} />
        </section>
        <section className={styles.list_countries}>
          <GridCountries countries={state.countries as CountriesType} isLoading={loadingState} loadingComplete={loadingComplete} />
        </section>
      </main>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  let theme: string | undefined = "light"
  if (Object.hasOwn(context.req.cookies, "theme")) {
    theme = context.req.cookies.theme
  }

  let initialCountries: any = []
  const response = await getCountries()
  if (response.status === "sucess") {
    initialCountries = response.data
  }

  return {
    props: {
      themeSelected: theme,
      initialCountries
    }
  }
}