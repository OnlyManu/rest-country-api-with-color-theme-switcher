import { MouseEvent, useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
import { RegionType } from "../../lib/countries"
import styles from "./select-region.module.css"
import utils from "../../styles/utils.module.css"

interface IselectRegionProps {
    onClick: (param: RegionType) => void,
    initialValue: RegionType
}
interface Iregion {
    name: RegionType,
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
    if (word.length > 1) {
        return word[0].toUpperCase()+word.substring(1)    
    }
    return word
}

export default function SelectRegion({onClick, initialValue}: IselectRegionProps) {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [selectedRegion, setSelectedRegion] = useState<RegionType>(initialValue)

    const openClose = (): void => {
        setIsOpen(!isOpen)
    }
    const selectDeselectOption = (event: MouseEvent<HTMLOptionElement>): void => {
        let optionValue: RegionType = event.currentTarget.value as RegionType
        if (optionValue === selectedRegion) {
            optionValue = ""
        }
        setSelectedRegion(optionValue)
        onClick(optionValue)
    }

    return (
        <div className={styles.container+" "+utils.layout} onClick={openClose}>
            <input type="text" className={styles.input} placeholder="Filter by Region" name="countries" value={selectedRegion} autoComplete="off" role="combobox" list="" readOnly />
            <FontAwesomeIcon className={styles.input_icon} icon={faChevronDown} />
            <datalist className={isOpen ? utils.layout + " " + styles.list_regions + " " + styles.open : utils.layout + " " + styles.list_regions} role="listbox">
                {
                    regions.map((region, key) => (
                        <option onClick={selectDeselectOption} key={key} className={selectedRegion === capitalise(region.name) ? styles.region+" "+styles.selected : styles.region} value={capitalise(region.name)}>
                            {capitalise(region.name)}
                        </option>
                    ))
                }
            </datalist>
        </div>
    )
}