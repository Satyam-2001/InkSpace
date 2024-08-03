import { Stack, useMediaQuery } from '@mui/material'
import React from 'react'
import Container, { Root } from './Container'
import Header, { HeaderContainer, HeaderContent } from './Header'
import BottomNavbar from './Navbar/BottomNavbar'
import { APP_BAR_HEIGHT } from '../../theme/styles'
import SideNavbar from './Navbar/SideNavbar'


export default function DynamicContainer({ children, header = {}, hideHeader, hideBottomNavbar, hideSideNavbar, sx = {}, ...props }) {
    const shortScreen = useMediaQuery(theme => theme.breakpoints.down('md'))

    const { goBack, title } = header
    const isCustomHeader = !title || shortScreen
    const headerContent = <HeaderContent goBack={goBack} title={title} />
    const isBottomNavbar = shortScreen && !hideBottomNavbar
    const isSideNavbar = !hideSideNavbar && !shortScreen

    if (shortScreen) {
        return (
            <Root
                sx={{
                    pt: APP_BAR_HEIGHT,
                    pb: isBottomNavbar ? APP_BAR_HEIGHT : 0,
                }}
            >
                <Header {...header} />
                <Stack {...props} sx={{ flex: 1, overflow: 'auto', p: 0.5, ...sx }}>
                    {children}
                </Stack>
                {isBottomNavbar && <BottomNavbar />}
            </Root>
        )
    }

    return (
        <Root>
            <Header />
            <Stack
                direction='row'
                sx={{
                    p: 1.6,
                    gap: 1.6,
                    flex: 1,
                    overflow: 'hidden',
                }}
            >
                {isSideNavbar && <Stack pt={APP_BAR_HEIGHT}><SideNavbar /></Stack>}
                <Stack {...props} sx={{ flex: 1, overflow: 'auto', gap: 1, pt: APP_BAR_HEIGHT, ...sx }}>
                    {title && <Stack px={1}><HeaderContent goBack={goBack} title={title} /></Stack>}
                    {children}
                </Stack>
            </Stack>
        </Root>
    )
}
