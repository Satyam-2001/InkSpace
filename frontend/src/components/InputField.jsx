import { InputAdornment, InputBase, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { elevation } from '../theme/styles'
import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop';

export default function InputField({ label, ...props }) {
    return (
        <TextField
            fullWidth
            label={label}
            sx={{
                boxShadow: elevation(),
                borderRadius: '10px',
                '& .MuiOutlinedInput-root': {
                    borderRadius: '10px', // Apply border radius to the root element
                    '& fieldset': {
                        borderRadius: '10px', // Ensure the border radius is applied to the fieldset
                    },
                },
                '& .MuiInputLabel-root': {
                    // Optionally adjust the label position if needed
                },
            }}
            InputProps={{
                endAdornment: <InputAdornment position="end">px</InputAdornment>,
                startAdornment: <InputAdornment position="start"><VerticalAlignTopIcon sx={{tranform: 'rotate()'}} /></InputAdornment>,
            }}
        />
    )
    return (
        <Stack
            direction='row'
            sx={{
                boxShadow: elevation(),
                bgcolor: 'background.paper',
                borderRadius: '20px',
                p: 1,
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
                type='number'
                size='small'
                variant="standard"
                sx={{
                    fontSize: '1rem',
                    boxShadow: elevation(-1),
                    flex: 1,
                    py: 0.5,
                    px: 1,
                    borderRadius: '10px',
                    alignItems: 'center',
                    '&::-webkit-inner-spin-button': {
                        WebkitAppearance: 'none',
                        margin: 0,
                    },
                    '&::-webkit-outer-spin-button': {
                        WebkitAppearance: 'none',
                        margin: 0,
                    },
                    '& input[type=number]': {
                        MozAppearance: 'textfield', // Hide spinners in Firefox
                    },
                }}
                autoComplete="off"
                endAdornment={' px'}
            />
        </Stack>
    )
}
