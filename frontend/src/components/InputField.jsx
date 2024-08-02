import { InputAdornment, InputBase, Stack, Typography } from '@mui/material'
import React from 'react'
import { elevation } from '../theme/styles'

export default function InputField({ label, ...props }) {
    return (
        <Stack
            direction='row'
            sx={{
                boxShadow: elevation(),
                bgcolor: 'background.paper',
                borderRadius: '20px',
                p: 1.5,
                gap: 1,
                width: '100%',
                alignItems: 'center'
            }}
        >
            <Typography sx={{ width: '40%', fontSize: '1rem', textAlign: 'center' }}>
                {label}
            </Typography>
            <InputBase
                {...props}
                size='small'
                variant="standard"
                sx={{ fontSize: '1rem', boxShadow: elevation(-1), flex: 1, py: 0.5, px: 1, borderRadius: '10px' }}
                autoComplete="false"
            />
        </Stack>
    )
}
