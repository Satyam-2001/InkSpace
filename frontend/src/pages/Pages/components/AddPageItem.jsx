import React from 'react'
import PageItemContainer from './PageItemContainer'
import { Stack, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { Link, useNavigate } from 'react-router-dom';


export default function AddPageItem() {
    const navigate = useNavigate()
    return (
        <PageItemContainer
            onClick={() => navigate('create')}
            sx={{
                bgcolor: 'action.active',
                border: 2,
                borderColor: 'primary.main',
                '&::after': {
                    background: 'none'
                }
            }}
        >
            <Stack
                sx={{
                    position: 'absolute',
                    flex: 1,
                    height: '100%',
                    width: '100%',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <AddIcon sx={{ fontSize: '5rem', color: 'white' }} />
                <Typography sx={{ color: 'white' }} >Add Page</Typography>
            </Stack>
        </PageItemContainer>
    )
}
