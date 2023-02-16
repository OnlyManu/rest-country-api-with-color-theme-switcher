import { ThemeType } from "./themecontext";
import { getCookie, setCookie } from "cookies-next";

export const getThemePreference = (): ThemeType | undefined => {
    if (getCookie('theme')) {
        const theme: ThemeType = getCookie('theme') as ThemeType
        return theme
    }
    return undefined
}

export const setThemePreference = (preference: ThemeType): void => {
    setCookie('theme', preference)
}
