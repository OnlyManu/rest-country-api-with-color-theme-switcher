import useIsomorphicLayoutEffect from "../../lib/useIsomorphicLayout"
import { useState } from "react"
import { CountriesType, Icountry } from "../../lib/countries"
import styles from "./grid-countries.module.css"
import utils from "../../styles/utils.module.css"
import CardCountry from "../card-country/card-country"

interface GridCountriesProps {
    countries: CountriesType,
    isLoading: boolean,
    loadingComplete: () => void
}

export default function GridCountries({ countries, isLoading, loadingComplete }: GridCountriesProps) {
    const [countriesData, setCountriesData] = useState<JSX.Element | Array<JSX.Element>>(<div></div>)

    useIsomorphicLayoutEffect(() => {
        const countriesList = countries && countries.length >= 1 ? countries.map((country: Icountry, key: any) => (
            <CardCountry key={key} country={country} />
        )) : (
            <span className={utils.error}>No country was found</span>
        )
        setCountriesData(countriesList)
        loadingComplete()
    }, [countries])
    
    if (isLoading) {
        return (
            <div className={styles.loading}>
                <span className={styles.spinner}></span>
            </div>
        )
    } else {
        return (
            <div className={styles.container}>
                {
                    countriesData
                }
            </div>
        )
    }  
}
