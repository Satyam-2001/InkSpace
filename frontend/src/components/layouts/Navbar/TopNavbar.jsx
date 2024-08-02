import { Stack, Typography } from '@mui/material'
import React from 'react'
import navigation from '../../../data/navigation'
import { NavLink } from 'react-router-dom'
import { elevation } from '../../../theme/styles'

function NavigationItem({ name, to, Icon }) {
    return (
        <NavLink to={to} style={{ textDecoration: 'none' }} >
            {({ isActive }) => (
                <Stack
                    direction='row'
                    sx={{
                        py: 1,
                        px: 1.4,
                        gap: 1,
                        borderRadius: '24px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        bgcolor: isActive ? 'primary.main' : null,
                        boxShadow: elevation(isActive ? -1 : 1),
                        minWidth: '80px',
                    }}
                >
                    <Icon sx={{ color: isActive ? 'white' : 'text.primary' }} />
                    <Typography
                        variant='body1'
                        sx={{
                            fontSize: '16px',
                            fontWeight: 500,
                            color: isActive ? 'white' : 'text.primary',
                        }}
                    >
                        {name}
                    </Typography>
                </Stack>
            )}
        </NavLink>
    )
}

export default function TopNavbar() {
    return (
        <Stack
            direction='row'
            sx={{
                px: 3,
                gap: 2,
                display: { xs: 'none', md: 'flex' }
            }}
        >
            {navigation.map((props) => <NavigationItem key={props.name} {...props} />)}
        </Stack>
    )
}
