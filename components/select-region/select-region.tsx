import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import styles from "./select-region.module.css"
import utils from "../../styles/utils.module.css"

interface Iregion {
    name: string,
    selected: boolean
}

const regions: Iregion[] = [
    { name: "africa", selected: false },
    { name: "america", selected: false },
    { name: "asia", selected: false },
    { name: "europe", selected: false },
    { name: "oceania", selected: false },
]

const capitalise = (word: string): string => {
    return word[0].toUpperCase()+word.substring(1)
}

export default function SelectRegion() {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const openClose = (): void => {
        setIsOpen(!isOpen)
    }

    return (
        <div className={styles.container+" "+utils.layout} onClick={openClose}>
            <input type="text" className={styles.input} placeholder="Filter by Region" name="countries" autoComplete="off" role="combobox" list="" readOnly />
            <FontAwesomeIcon className={styles.input_icon} icon={faChevronDown} />
            <datalist className={isOpen ? utils.layout + " " + styles.list_regions + " " + styles.open : utils.layout + " " + styles.list_regions} role="listbox">
                {
                    regions.map((region, key) => (
                        <option key={key} className={styles.region} value={region.name}>{capitalise(region.name)}</option>
                    ))
                }
            </datalist>
        </div>
    )
}