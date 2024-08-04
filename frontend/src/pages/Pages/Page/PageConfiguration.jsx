import React, { Fragment, useState } from 'react'
import { Box, Button, Divider, Grid, IconButton, InputAdornment, Stack, Typography, useMediaQuery } from '@mui/material'

import { Heading, elevation } from '../../../theme/styles';
import { useNavigate } from 'react-router-dom';

import MarginInputField from '../components/MarginInputField';
import InputField from '../components/InputField';
import HeightIcon from '@mui/icons-material/Height';
import { useFormikContext } from 'formik';

const marginItem = [
    {
        label: 'Top Margin',
        rotate: '0',
    },
    {
        label: 'Bottom Margin',
        rotate: '180',
    },
    {
        label: 'Left Margin',
        rotate: '270',
    },
    {
        label: 'Right Margin',
        rotate: '90',
    }
]

function AddPageActionButtons() {
    const { handleSubmit, isSubmitting } = useFormikContext()
    const navigate = useNavigate()

    const closeHandler = () => {
        navigate(-1)
    }

    const saveHandler = async () => {
        handleSubmit()
        closeHandler()
    }

    return (
        <Stack
            direction={'row'}
            sx={{ gap: 2, flex: { xs: 1, md: 0 }, alignItems: 'flex-end' }}
        >
            <Button
                fullWidth
                size='large'
                onClick={closeHandler}
                sx={{ boxShadow: elevation(-1) }}
            >
                Cancel
            </Button >
            <Button
                fullWidth
                size='large'
                variant='contained'
                sx={{ boxShadow: elevation() }}
                type='submit'
                onClick={saveHandler}
                disabled={isSubmitting}
            >
                {isSubmitting ? 'Saving...' : 'Save'}
            </Button>
        </Stack>
    )
}

export default function PageCongiguration() {
    return (
        <Stack sx={{ gap: { xs: 2.5, md: 3.5 }, overflow: 'auto', flex: 1 }}>
            <Heading sx={{ fontSize: { xs: '1.3rem' }, px: 0.5 }}>Page Configuration</Heading>
            <Grid container rowSpacing={2} columnSpacing={1.5} px={0.4}>
                {marginItem.map((prop) => (
                    <Grid key={prop.label} item xs={6} md={6}>
                        <MarginInputField {...prop} />
                    </Grid>
                ))}
                <Grid item xs={12} md={12}>
                    <InputField
                        type='number'
                        label='Line Height'
                        InputProps={{
                            endAdornment: <InputAdornment position="end"><Typography>px</Typography></InputAdornment>,
                            startAdornment: <InputAdornment position="start"><HeightIcon /></InputAdornment>,
                        }}
                    />
                </Grid>
            </Grid>
            <AddPageActionButtons />
        </Stack>
    )
}