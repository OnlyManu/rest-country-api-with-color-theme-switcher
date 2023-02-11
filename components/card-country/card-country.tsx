import Image from "next/image";
import { Icountry } from "../../lib/countries";
import styles from "./card-country.module.css"
import utils from "../../styles/utils.module.css"

interface CardCountryProps {
    country: Icountry
}

export default function CardCountry({ country }: CardCountryProps) {
    return (
        <div className={styles.container + " " + utils.layout}>
            <div className={styles.flag_wrapper}>
                <Image
                    className={styles.flag}
                    src={country.flags}
                    width={320}
                    height={160}
                    alt={country.name}
                />
            </div>
            <div className={styles.about}>
                <strong className={styles.country}>{country.name}</strong>
                <div className={styles.infos}>
                    <div className={styles.info}>
                        <span className={styles.name}>Population:</span>
                        <span className={styles.value}>{country.population}</span>
                    </div>
                    <div className={styles.info}>
                        <span className={styles.name}>Region:</span>
                        <span className={styles.value}>{country.region}</span>
                    </div>
                    <div className={styles.info}>
                        <span className={styles.name}>Capital:</span>
                        <span className={styles.value}>{country.capital}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}