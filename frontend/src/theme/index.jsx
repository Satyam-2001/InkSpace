import { createContext, useState, useMemo, useEffect } from "react";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";
import chroma from 'chroma-js'

const fontFamily = ["Lexend", "sans-serif"].join(",")

export const themeSettings = (mode) => {
    const isLight = mode === 'light'
    const color = (mode === 'light' ? 'black' : 'white')
    const typography = {
        allVariants: {
            color,
        },
        fontFamily,
        fontSize: 12,
        h1: {
            fontFamily,
            fontSize: '2.5rem',
        },
        h2: {
            fontFamily,
            fontSize: '2rem',
        },
        h3: {
            fontFamily,
            fontSize: '1.5rem',
        },
        h4: {
            fontFamily,
            fontSize: '1.25rem'
        },
        h5: {
            fontFamily,
            fontSize: '1rem',
        },
        h6: {
            fontFamily,
            fontSize: '0.9rem',
        },
        overline: {
            color: 'linear-gradient(135deg, #C52062 2.34%, #FE880C 100.78%)'
        }
    }

    // const main = '#DF275D'
    // const main = '#f285e9' //girl
    const main = '#0a6efa' //boy

    const components = {
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    color, // Set default color here
                },
            },
        },
    }


    const theme = createTheme({
        palette: {
            mode,
            primary: {
                main,
            },
            secondary: {
                main: 'rgb(112, 27, 247)',
            },
            action: {
                active: chroma(main).alpha(0.5).hex(),
                hover: 'rgba(100, 100, 100, 0.12)'
            },
            background: {
                default: isLight ? 'rgb(240,246,251)' : 'rgb(18,18,18)',
                paper: isLight ? 'rgb(245,250,255)' : 'rgb(23,23,23)',
            },
            grey: {
                A100: '#1f1f1f'
            }
        },
        typography,
        components,
    })

    return theme
};



export const ColorModeContext = createContext({ mode: 'dark', toggleMode: () => { } });

export const ColorModeProvider = ({ children }) => {
    const [mode, setMode] = useState('dark')

    useEffect(() => {
        const storedMode = localStorage.getItem('mode');
        if (storedMode) {
            setMode(storedMode)
        }
    }, [])

    const toggleMode = () => {
        setMode(prop => {
            const new_mode = prop === 'light' ? 'dark' : 'light'
            localStorage.setItem('mode', new_mode)
            return new_mode
        })
    }

    const theme = themeSettings(mode);
    return (
        <ColorModeContext.Provider value={{ mode, toggleMode }}>
            <ThemeProvider theme={theme}>
                {children}
            </ThemeProvider>
        </ColorModeContext.Provider>)
}