import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons"
import styles from "./input-search.module.css"
import utils from "../../styles/utils.module.css"

export default function InputSearch() {
    return (
        <div className={styles.container+" "+utils.layout}>
            <FontAwesomeIcon className={styles.input_icon} icon={ faMagnifyingGlass } />
            <input className={styles.input} type="search" placeholder="Search for a country..." />
        </div>
    )
}