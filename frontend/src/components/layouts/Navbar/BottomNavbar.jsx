import React from 'react'
import { APP_BAR_HEIGHT, elevation } from '../../../theme/styles'
import { Stack, Typography } from '@mui/material'
import navigation from '../../../data/navigation'
import { Link, NavLink } from 'react-router-dom'

function NavigationItem({ to, Icon, name }) {
    return (
        <NavLink to={to} style={{ textDecoration: 'none', flex: 1 }} >
            {({ isActive }) => (
                <Stack
                    sx={{
                        p: 0.6,
                        borderRadius: '16px',
                        justifyContent: 'center', 
                        alignItems: 'center',
                        bgcolor: isActive ? 'action.active' : null,
                        boxShadow: elevation(isActive ? -1 : 1),
                    }}
                >
                    <Icon sx={{ fontSize: '1.5rem', color: isActive ? 'white' : 'text.primary' }} />
                    <Typography sx={{ color: isActive ? 'white' : 'text.primary', fontSize: '0.58rem' }}>{name}</Typography>
                </Stack>
            )}
        </NavLink>
    )
}

export default function BottomNavbar() {
    return (
        <Stack
            direction='row'
            sx={{
                position: 'fixed',
                bottom: 0,
                gap: 1,
                px: 1,
                py: 1,
                height: APP_BAR_HEIGHT,
                width: '100vw',
                boxShadow: elevation(),
                bgcolor: 'background.paper',
                alignItems: 'center',
                justifyContent: 'space-evenly',
            }}
        >
            {navigation.map((props) => (
                <NavigationItem key={props.name} {...props} />
            ))}
        </Stack>
    )
}
