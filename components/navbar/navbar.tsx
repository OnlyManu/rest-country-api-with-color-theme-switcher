import { useTheme } from "../../lib/themecontext"
import { setThemePreference } from "../../lib/preferences"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faMoon as dark }  from "@fortawesome/free-solid-svg-icons"
import { faMoon as light} from "@fortawesome/free-regular-svg-icons"
import styles from "./navbar.module.css"


export default function Navbar() {
    const { theme, setTheme } = useTheme()
    const toggleTheme = (): void => {
        setTheme(theme === "light" ? "dark" : "light")
        setThemePreference(theme === "light" ? "dark" : "light")
    }

    return (
        <div className={styles.container}>
            <strong className={styles.title_app}>Where in the world?</strong>
            <button className={styles.btn_theme} onClick={toggleTheme}>
                <FontAwesomeIcon className={styles.btn_theme_icon} icon={theme === "light" ? light : dark} />
                <span className={styles.btn_theme_text}>Dark Mode</span>
            </button>
        </div>
    )
}