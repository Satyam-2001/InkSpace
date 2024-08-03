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
                        p: 1,
                        borderRadius: '10px', // Ensure the border radius is applied to the fieldset
                    },
                    '& .MuiInputBase-input': {
                        py: 1.5,
                        fontSize: '16px', // Change the font size here (example: 1.25rem, adjust as needed)
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
