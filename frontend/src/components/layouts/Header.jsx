import React, { Fragment, useContext } from 'react'
import { AppBar, Avatar, Box, IconButton, Stack, useTheme } from '@mui/material'
import { APP_BAR_HEIGHT, Heading, elevation } from '../../theme/styles'

import logo from '../../assets/logo.png'
import { ColorModeContext } from '../../theme'

import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import TopNavbar from './Navbar/TopNavbar'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom'
import chroma from 'chroma-js'


function ThemeButton() {
    const { toggleMode, mode } = useContext(ColorModeContext)

    return (
        <IconButton onClick={toggleMode} sx={{ boxShadow: elevation(), borderRadius: '16px', p: 1.2 }}>
            {mode === 'dark' ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
        </IconButton>
    )
}

function Logo() {
    const { mode } = useContext(ColorModeContext)

    return (
        <Box
            component="img"
            src={logo}
            alt="Logo"
            sx={{
                width: 48,
                height: 48,
                filter: mode === 'dark' ? 'invert(1) sepia(1) saturate(5) hue-rotate(180deg)' : '',
            }}
        />
    )
}

export function HeaderContainer({ children, sx = {} }) {
    const theme = useTheme()
    return (
        <AppBar
            sx={{
                position: 'fixed',
                top: 0,
                height: APP_BAR_HEIGHT,
                boxShadow: elevation(),
                bgcolor: 'background.paper',
                // backgroundColor: chroma(theme.palette.background.paper).alpha(0.3).hex(),
                backdropFilter: 'blur(8px)',
                backgroundImage: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
                gap: 1,
                py: 1,
                px: { xs: 2, md: 4 },
                ...sx
            }}
        >
            {children}
        </AppBar>
    )
}

export function HeaderContent({ goBack = false, title = '' }) {
    const navigate = useNavigate()

    const startComponent = (
        <Stack direction='row' sx={{ gap: 2, alignItems: 'center' }}>
            {goBack && <IconButton
                onClick={() => navigate(-1)}
            >
                <ArrowBackIcon sx={{ fontSize: '36px' }} />
            </IconButton>}
            {!title && <Logo />}
            {title && <Heading>{title}</Heading>}
        </Stack>
    )
    const endComponent = (
        <Stack direction='row' sx={{ gap: 2, alignItems: 'center' }}>
            {!title && <ThemeButton />}
        </Stack>
    )

    return (
        <Fragment>
            {startComponent}
            {endComponent}
        </Fragment>
    )
}

export default function Header({ title, goBack }) {
    const navigate = useNavigate()

    const startComponent = (
        <Stack direction='row' sx={{ gap: 2, alignItems: 'center' }}>
            {goBack && <IconButton
                onClick={() => navigate(-1)}
            >
                <ArrowBackIcon sx={{ fontSize: '36px' }} />
            </IconButton>}
            {!title && <Logo />}
            {title && <Heading>{title}</Heading>}
        </Stack>
    )
    const endComponent = (
        <Stack direction='row' sx={{ gap: 2, alignItems: 'center' }}>
            {!title && <ThemeButton />}
        </Stack>
    )

    return (
        <HeaderContainer>
            {startComponent}
            {/* <TopNavbar /> */}
            {endComponent}
        </HeaderContainer>
    )
}
