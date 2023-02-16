import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass, faXmark } from "@fortawesome/free-solid-svg-icons"
import { FormEvent, useState } from "react"
import styles from "./input-search.module.css"
import utils from "../../styles/utils.module.css"

interface InputSearchProps {
    onChange: (param: string) => void,
    initialValue: string
}

export default function InputSearch({onChange, initialValue}: InputSearchProps) {
    const [search, setSearch] = useState<string>(initialValue)
    const handleChange = (event: FormEvent<HTMLInputElement>): void => {
        const value: string = event.currentTarget.value;
        setSearch(value)
        onChange(value)
    }
    const clearSearch = (): void => {
        setSearch("")
        onChange("")
    }

    return (
        <div className={styles.container+" "+utils.layout}>
            <FontAwesomeIcon className={styles.input_icon} icon={ faMagnifyingGlass } />
            <input className={styles.input} type="text" placeholder="Search for a country..." value={search} onChange={handleChange} />
            {search !== "" && (
                <div className={styles.icon_clear} onClick={clearSearch}>
                    <FontAwesomeIcon className={styles.input_icon} icon={faXmark} />
                </div>
            )}
        </div>
    )
}