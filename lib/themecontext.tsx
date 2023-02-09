import React, {Dispatch, SetStateAction, useContext, useState} from 'react'

export type ThemeType = "light" | "dark";
export type DispatchThemeType = Dispatch<SetStateAction<ThemeType>>

interface IthemeContext {
    theme: ThemeType,
    setTheme: DispatchThemeType
}

interface Iprops {
    children: React.ReactNode
} 

export const ThemeContext = React.createContext<IthemeContext>({
    theme: "light",
    setTheme: () => {}
})

export const useTheme = ():IthemeContext => useContext(ThemeContext)

export const ThemeProvider= ({ children }:Iprops) => {
    const [theme, setTheme] = useState<ThemeType>("light")
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

