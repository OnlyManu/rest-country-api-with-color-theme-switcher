import { useEffect, useState } from "react"
import { CountriesType, Icountry } from "../../lib/countries"
import styles from "./grid-countries.module.css"
import CardCountry from "../card-country/card-country"

interface GridCountriesProps {
    countries : CountriesType
}

export default function GridCountries({ countries }: GridCountriesProps) {
    const [countriesData, setCountriesData] = useState<JSX.Element | Array<JSX.Element>>(<div></div>)

    useEffect(() => {
        const countriesList = countries ? countries.map((country: Icountry, key: any) => (
            <CardCountry key={key} country={country} />
        )) : (
            <></>
        )
        setCountriesData(countriesList)
    }, [])
    

    return (
        <div className={styles.container}>
            {
                countriesData
            }
        </div>
    )
}
