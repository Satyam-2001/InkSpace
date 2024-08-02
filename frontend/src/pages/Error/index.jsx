import { Stack, Typography } from '@mui/material'
import React from 'react'
import Container from '../../components/layouts/Container'
import DynamicContainer from '../../components/layouts/DynamicContainer'

export default function Error() {
    return (
        <DynamicContainer>
            <Stack
                sx={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    flex: 1,
                }}
            >
                <Typography variant='h1' sx={{ fontWeight: 600 }}>
                    404 Not Found
                </Typography>
            </Stack>
        </DynamicContainer>
    )
}
