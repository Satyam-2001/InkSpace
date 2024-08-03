import { IconButton, Stack, Typography } from '@mui/material'
import React, { useLayoutEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import navigation from '../../../data/navigation'
import { APP_BAR_HEIGHT, elevation } from '../../../theme/styles'
import MenuOpenOutlinedIcon from '@mui/icons-material/MenuOpenOutlined';
import { WEBSITE_NAME } from '../../../data/constant'

const transition = 'width 0.4s ease, transform 0.4s ease'

function SideNavbarHeader({ expand, toggleExpandHandler }) {
    return (
        <Stack
            direction='row'
            sx={{
                px: expand ? 1 : 0,
                pb: 1,
                alignItems: 'center',
                justifyContent: 'space-between',
                transition,
                maxWidth: '100%',
                // overflow: 'hidden',
                bgcolor: 'transparent'
            }}
        >
            {expand && <Typography
                sx={{
                    fontSize: '24px',
                    textOverflow: 'ellipsis',
                    fontWeight: 500,
                }}
            >
                {WEBSITE_NAME}
            </Typography>}
            <IconButton
                onClick={toggleExpandHandler}
                sx={{
                    boxShadow: elevation(),
                    borderRadius: '16px',
                    width: !expand ? '100%' : null,
                }}
            >
                <MenuOpenOutlinedIcon
                    sx={{
                        color: 'text.primary',
                        fontSize: '30px',
                        transform: !expand && 'rotate(180deg)',
                        transition,
                    }}
                />
            </IconButton>
        </Stack >
    )
}

function NavigationItem({ name, to, Icon, expand }) {
    return (
        <NavLink to={to} style={{ textDecoration: 'none' }} >
            {({ isActive }) => (
                <Stack
                    direction='row'
                    sx={{
                        py: 1,
                        px: 1.4,
                        gap: 1,
                        borderRadius: '14px',
                        justifyContent: 'center',
                        alignItems: 'center',
                        bgcolor: isActive ? 'action.active' : null,
                        boxShadow: elevation(isActive ? -1 : 1),
                        transition,
                        height: '40px'
                    }}
                >
                    {!expand && <Icon
                        sx={{
                            fontSize: '25px',
                            color: isActive ? 'white' : 'text.primary',
                        }}
                    />}
                    {expand && <Typography
                        variant='body1'
                        sx={{
                            fontSize: '1rem',
                            color: isActive ? 'white' : 'text.primary',
                        }}
                    >
                        {name}
                    </Typography>}
                </Stack>
            )}
        </NavLink>
    )
}

export default function SideNavbar() {
    const [expand, setExpand] = useState(localStorage.getItem('sidebar_expand') === 'true')
    const toggleExpandHandler = () => {
        setExpand(prop => {
            localStorage.setItem('sidebar_expand', !prop)
            return !prop
        })
    }
    useLayoutEffect(() => {
        const sidebar_expand = localStorage.getItem('sidebar_expand') === 'true'
        setExpand(sidebar_expand)
    }, [])

    return (
        <Stack
            sx={{
                height: '100%',
                p: 1.25,
                gap: 1.8,
                boxShadow: elevation(),
                bgcolor: 'background.paper',
                borderRadius: '12px',
                width: expand ? '280px' : '80px',
                transition,
                overflow: 'hidden',
            }}
        >
            <SideNavbarHeader expand={expand} toggleExpandHandler={toggleExpandHandler} />
            {navigation.map((props) => <NavigationItem key={props.name} expand={expand} {...props} />)}
        </Stack>
    )
}
