import Link from "next/link"
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeftLong }  from "@fortawesome/free-solid-svg-icons"
import { Icountry } from "../../lib/countries"
import styles from "./grid-country.module.css"
import utils from "../../styles/utils.module.css"

interface IgridCountryProps {
    country: Icountry
}

export default function GridCountry({ country }: IgridCountryProps) {
    
    const nativeName = (obj: any): string => {
        return obj[Object.keys(obj)[0]].common as string
    }
    const currencies = (obj: any): string => {
        return obj[Object.keys(obj)[0]].name as string
    }
    const languages = (obj: any): string => {
        let languages = Object.keys(obj)
        languages = languages.map(language => obj[language])
        return languages.toString().replace(",", ", ")
    }

    return (
        <div className={styles.container}>
            <Link className={styles.btn_back + " " + utils.btn} href={"/"}>
                <FontAwesomeIcon className={styles.btn_icon} icon={faArrowLeftLong} />
                Back
            </Link>
            <div className={styles.layout_country}>
                <Image className={styles.flag} width={320} height={160} alt="" src={country.flags} />
                <div className={styles.about_country}>
                    <h1 className={styles.country_name}>{ country.name }</h1>
                    <div className={styles.country_infos}>
                        <div className={styles.info_group}>
                            <div className={styles.info}>
                                <span className={styles.name}>Native Name:</span>
                                <span className={styles.value}>{ nativeName(country.nameNative) }</span>
                            </div>
                            <div className={styles.info}>
                                <span className={styles.name}>Population:</span>
                                <span className={styles.value}>{country.population}</span>
                            </div>
                            <div className={styles.info}>
                                <span className={styles.name}>Region:</span>
                                <span className={styles.value}>{ country.region }</span>
                            </div>
                            <div className={styles.info}>
                                <span className={styles.name}>Sub Region:</span>
                                <span className={styles.value}>{ country.subRegion }</span>
                            </div>
                            <div className={styles.info}>
                                <span className={styles.name}>Capital:</span>
                                <span className={styles.value}>{ country.capital }</span>
                            </div>
                        </div>
                        <div className={styles.info_group}>
                            <div className={styles.info}>
                                <span className={styles.name}>Top Level Domain:</span>
                                <span className={styles.value}>{ country.tld[0] }</span>
                            </div>
                            <div className={styles.info}>
                                <span className={styles.name}>Currencies:</span>
                                <span className={styles.value}>{ currencies(country.currencies) }</span>
                            </div>
                            <div className={styles.info}>
                                <span className={styles.name}>Languages:</span>
                                <span className={styles.value}>{ languages(country.languages) }</span>
                            </div>
                        </div>
                    </div>
                    <div className={styles.layout_borders}>
                        <span className={styles.name}>Borders countries:</span>
                        <div className={styles.borders_countries}>
                            {country.borders.map((borderCountry, key) => {
                                if (borderCountry === "Not found") {
                                    return (
                                        <Link key={key} href={"/"} className={styles.btn_border + " " + utils.btn}>{"???"}</Link>
                                    )
                                } else {
                                    return (
                                        <Link key={key} href={`/country/${borderCountry.toLowerCase()}`} className={styles.btn_border + " " + utils.btn}>{borderCountry}</Link>
                                    )
                                }
                            })}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}