import React from 'react'
import InputField from './InputField'
import VerticalAlignTopIcon from '@mui/icons-material/VerticalAlignTop';
import { InputAdornment, Typography } from '@mui/material';

export default function MarginInputField(props) {
    return (
        <InputField
            type='number'
            InputProps={{
                endAdornment: <InputAdornment position="end"><Typography>px</Typography></InputAdornment>,
                startAdornment: <InputAdornment position="start"><VerticalAlignTopIcon sx={{ transform: `rotate(${props.rotate}deg)` }} /></InputAdornment>,
            }}
            {...props}
        />
    )
}
