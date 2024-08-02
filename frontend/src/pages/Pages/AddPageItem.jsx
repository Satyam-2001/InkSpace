import React from 'react'
import PageItemContainer from './components/PageItemContainer'
import { Stack } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';


export default function AddPageItem() {
    return (
        <PageItemContainer
            sx={{
                bgcolor: 'action.active',
                border: 2,
                borderColor: 'primary.main',
                '&::after': {
                    background: 'none'
                }
            }}
        >
            <Link to='create'>
                <Stack
                    sx={{
                        position: 'absolute',
                        flex: 1,
                        height: '100%',
                        width: '100%',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1,
                    }}
                >
                    <AddIcon sx={{ fontSize: '5rem', color: 'primary.main' }} />
                    {/* <Typography sx={{fontSize: '1.2rem', color: 'primary.main'}}>Add Page</Typography> */}
                </Stack>
            </Link>
        </PageItemContainer>
    )
}
