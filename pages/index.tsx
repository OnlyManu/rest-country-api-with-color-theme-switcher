import Head from 'next/head'
import { useReducer } from 'react'
import { useTheme } from '../lib/themecontext'
import styles from '../styles/Home.module.css'

import { getCountries, CountriesType } from '../lib/countries'

import Navbar from '../components/navbar/navbar'
import InputSearch from '../components/input-search/input-search'
import SelectRegion from '../components/select-region/select-region'
import GridCountries from "../components/grid-countries/grid-countries"

type ActionType = { type: "filter_by_name", payload: string } | { type: "filter_by_region", payload: string }

let initialListCountries: any = [];
let initialState = {
  name_filter: "",
  region_filter: "",
  countries: []
};
  
(async function () {
  const response = await getCountries();
  
  if (response.status == "sucess") {
    initialListCountries = response.data
    initialState = {
      name_filter: "",
      region_filter: "",
      countries: initialListCountries 
    }
  } else {
    console.log(response.message)  
  }
})()



function reducer(state: typeof initialState, action: ActionType) {
  switch (action.type) {
    case "filter_by_name": {
      const name_filter = action.payload
      const countries = state.countries.filter((country: any) => {
        const reg = new RegExp(`${name_filter}`, "i")
        return reg.test(country.name)
      })

      return {...state, name_filter, countries}
    }
    case "filter_by_region": {
      const region_filter = action.payload
      if (state.region_filter === region_filter) {
        return state
      }

      let countries
      if (region_filter === "") {
        countries = initialListCountries
      } else {
        countries = state.countries.filter((country: any) => {
          const reg = new RegExp(`${region_filter}`, "i")
          return reg.test(country.region)
        })
      }

      return {...state, region_filter, countries}
    }
    default: {
      throw new Error()
    }
  }
}

export default function Home() {
  const { theme } = useTheme()
  const [state, dispatch] = useReducer(reducer, initialState)
  
  const fiterByRegion = (region: string): void => {
    dispatch({ type: "filter_by_region", payload: region })
    if (state.name_filter !== "") {
      filterByName(state.name_filter)
    }
  }

  const filterByName = (name: string): void => {
    if (name === "") {
      dispatch({ type: "filter_by_region", payload: state.region_filter })
    } else {
      dispatch({ type: "filter_by_name", payload: name })
    }
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
          <InputSearch />
          <SelectRegion />
        </section>
        <section className={styles.list_countries}>
          <GridCountries countries={state.countries as CountriesType} />
        </section>
      </main>
    </div>
  )
}

