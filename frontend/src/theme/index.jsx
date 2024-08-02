import { createContext, useState, useMemo, useEffect } from "react";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";
import chroma from 'chroma-js'

const fontFamily = ["Lexend", "sans-serif"].join(",")

export const themeSettings = (mode) => {
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
    const active = chroma(main).alpha(0.5).hex()

    const components = {
        MuiSvgIcon: {
            styleOverrides: {
                root: {
                    color, // Set default color here
                },
            },
        },
    }

    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main,
            },
            background: {
                // default: 'rgb(32,35,41)',
                // paper: 'rgb(30,32,39)',
                default: 'rgb(18,18,18)',
                paper: 'rgb(23,23,23)',
            },
            action: {
                active,
                hover: 'rgba(100, 100, 100, 0.12)'
            },
            grey: {
                A100: '#1f1f1f'
            }
        },
        typography,
        components,
    })

    const lightTheme = createTheme({
        palette: {
            mode,
            primary: {
                main,
            },
            background: {
                default: 'rgb(232,236,241)',
                paper: 'rgb(245,250,255)',
                // paper: 'rgb(235,240,243)',
            },
            action: {
                active,
                hover: 'rgba(100, 100, 100, 0.12)'
            },
            grey: {
                A100: '#f6f6f6'
            }
        },
        typography,
        components,
    })

    return mode === 'dark' ? darkTheme : lightTheme;
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