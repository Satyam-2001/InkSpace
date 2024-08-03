import { Grid, Stack, Typography, styled, useMediaQuery } from '@mui/material'
import React from 'react'
import Container from '../../components/layouts/Container'
import { Heading, SECONDARY_FONT_FAMILY, elevation } from '../../theme/styles'
import PageItem from './PageItem';
import AddPageItem from './AddPageItem';
import { HeaderContainer } from '../../components/layouts/Header';
import DynamicContainer from '../../components/layouts/DynamicContainer';

const images = [
    {
        _id: 1,
        name: 'Line Page',
        url: 'https://img.freepik.com/premium-photo/notebook-paper-background-blank-pages-notebook_322958-3807.jpg',
    },
    {
        _id: 2,
        name: 'Blank Page',
        url: 'https://us.123rf.com/450wm/leck/leck1904/leck190400015/leck190400015.jpg?ver=6',
    },
    {
        _id: 3,
        name: 'Spiral Page',
        url: 'https://as2.ftcdn.net/v2/jpg/00/72/36/55/1000_F_72365504_vJfkft7NJcZNwnHBYzxqlUDwQQjKQPEC.jpg',
    },
    {
        _id: 4,
        name: 'Note Page',
        url: 'https://images.template.net/wp-content/uploads/2017/01/13144244/Blank-Lined-Paper-Template.jpg',
    },
    {
        _id: 5,
        name: 'Math Book Page',
        url: 'https://st.depositphotos.com/2458127/4990/i/450/depositphotos_49903441-notebook-paper-background.jpg',
    },
]

function PageHeader({ sx = {} }) {
    return (
        <Heading sx={{ px: 2, ...sx }}>
            {`Pages  (${images.length})`}
        </Heading>
    )
}

export default function Pages() {
    const shortScreen = useMediaQuery(theme => theme.breakpoints.down('md'))

    const header = {
        title: `Pages  (${images.length})`,
    }

    return (
        <DynamicContainer header={header}>
            <Grid container spacing={{ xs: 1, sm: 1.5 }} sx={{ p: { xs: 0.5, sm: 1 } }} >
                <AddPageItem />
                {images.map((props) => <PageItem key={props.name} {...props} />)}
            </Grid>
        </DynamicContainer>
    )
}
