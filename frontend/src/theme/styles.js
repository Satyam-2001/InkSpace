// export const elevation = {
//     up: (value = 0) => '0px 0px 3px 0px rgba(0, 0, 0, 0.2), inset 6px 6px 14px -5px rgba(255,255,255,0.06), 6px 6px 10px -5px rgba(0, 0, 0, 0.7)',
//     down: (value = 0) => 'inset -6px -6px 14px -5px rgba(255,255,255,0.06), inset 6px 6px 14px -5px rgba(0, 0, 0, 0.85)'
// }

import { Stack, Typography, styled } from "@mui/material"

export const APP_BAR_HEIGHT = '58px'
export const SECONDARY_FONT_FAMILY = ["'Exo 2'", "sans-serif"].join(",")

export const Heading = styled(Typography)(({ theme }) => ({
    fontWeight: 550,
    opacity: 0.8,
    fontFamily: SECONDARY_FONT_FAMILY,
    [theme.breakpoints.down('md')]: {
        fontSize: '1.4rem',
    },
    [theme.breakpoints.up('md')]: {
        fontSize: '1.8rem',
    },
}))

export const ModalStack = styled(Stack)(({ theme }) => ({
    position: 'absolute',
    boxShadow: 24,
    overflow: 'hidden',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
}))

export function elevation(value = 0) {
    if (value >= 0) {
        return '0px 0px 3px 0px rgba(0, 0, 0, 0.2), inset 6px 6px 14px -5px rgba(255,255,255,0.06), 4px 4px 8px -5px rgba(0, 0, 0, 0.7)'
    }
    return 'inset -6px -6px 14px -5px rgba(255,255,255,0.06), inset 6px 6px 14px -5px rgba(0, 0, 0, 0.85)'
}