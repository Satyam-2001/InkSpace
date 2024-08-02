import { InputAdornment, InputBase, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import { elevation } from '../../../theme/styles'

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
            {...props}
        />
    )
}
