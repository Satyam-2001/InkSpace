import { Stack, styled, useMediaQuery } from '@mui/material'
import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import BottomNavbar from './Navbar/BottomNavbar'
import { APP_BAR_HEIGHT } from '../../theme/styles'
import SideNavbar from './Navbar/SideNavbar'

export const Root = styled(Stack)(({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
}))

export default function Container({ hideHeader, hideBottomNavbar, hideSideNavbar, children }) {
    const shortScreen = useMediaQuery(theme => theme.breakpoints.down('md'))
    const isBottomNavbar = shortScreen && !hideBottomNavbar
    const component = shortScreen || hideSideNavbar ?
        (
            <Stack
                sx={{
                    overflow: 'hidden',
                    flex:1,
                }}
            >
                {children}
            </Stack>
        )
        :
        (
            <Stack
                direction='row'
                sx={{
                    gap: 1.5,
                    flex: 1,
                    p: 1.5,
                    overflow: 'hidden',
                }}
            >
                <SideNavbar />
                {children}
            </Stack>
        )
    return (
        <Root
            sx={{
                pb: { xs: isBottomNavbar ? APP_BAR_HEIGHT : 0, md: 0 },
            }}
        >
            {!hideHeader && <Header />}
            {component}
            {isBottomNavbar && <BottomNavbar />}
        </Root>
    )
}
