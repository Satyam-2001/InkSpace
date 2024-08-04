import React, { Fragment, useContext } from 'react'
import { AppBar, Avatar, Box, IconButton, Stack, styled, useTheme } from '@mui/material'
import { APP_BAR_HEIGHT, Heading, elevation } from '../../theme/styles'

import logo from '../../assets/logo.png'
import { ColorModeContext } from '../../theme'

import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined';
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import TopNavbar from './Navbar/TopNavbar'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom'
import chroma from 'chroma-js'

export const HeaderIconButton = styled(IconButton)(({ theme }) => ({
    boxShadow: elevation(), borderRadius: '16px', p: 1.2
}))

function ThemeButton() {
    const { toggleMode, mode } = useContext(ColorModeContext)

    return (
        <HeaderIconButton onClick={toggleMode}>
            {mode === 'dark' ? <LightModeOutlinedIcon /> : <DarkModeOutlinedIcon />}
        </HeaderIconButton>
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
                gap: 1,
                flexDirection: 'row',
                py: 1,
                px: { xs: 2, md: 4 },
                ...sx
            }}
        >
            {children}
        </AppBar>
    )
}

export function HeaderContent({ goBack = false, title = '', sx_heading = {}, endChildren }) {
    const navigate = useNavigate()

    const goBackHandler = () => {
        if (typeof goBack === 'function') {
            return goBack()
        }
        navigate(-1)
    }

    const startComponent = (
        <Stack direction='row' sx={{ gap: { xs: 1, md: 2 }, alignItems: 'center' }}>
            {goBack && <IconButton
                onClick={goBackHandler}
            >
                <ArrowBackIcon sx={{ fontSize: '36px', ...sx_heading }} />
            </IconButton>}
            {!title && <Logo />}
            {title && <Heading sx={sx_heading}>{title}</Heading>}
        </Stack>
    )
    const endComponent = (
        <Stack direction='row' sx={{ gap: 2, alignItems: 'center' }}>
            {!title && <ThemeButton />}
            {endChildren}
        </Stack>
    )

    return (
        <Fragment>
            {startComponent}
            {endComponent}
        </Fragment>
    )
}

export default function Header(props) {

    return (
        <HeaderContainer>
            <HeaderContent {...props} />
        </HeaderContainer>
    )
}
