import React, {Dispatch, SetStateAction, useContext, useState} from 'react'

export type ThemeType = "light" | "dark";
export type DispatchThemeType = Dispatch<SetStateAction<ThemeType>>

interface IthemeContext {
    theme: ThemeType,
    setTheme: DispatchThemeType
}

interface IthemeProviderProps {
    children: React.ReactNode,
    initialTheme: ThemeType
} 

export const ThemeContext = React.createContext<IthemeContext>({
    theme: "light",
    setTheme: () => {}
})

export const useTheme = ():IthemeContext => useContext(ThemeContext)

export const ThemeProvider= ({ children, initialTheme }: IthemeProviderProps) => {
    const [theme, setTheme] = useState<ThemeType>(initialTheme)
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
