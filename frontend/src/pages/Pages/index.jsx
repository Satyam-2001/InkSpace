import { CircularProgress, Grid, Stack, Typography, styled, useMediaQuery } from '@mui/material'
import React from 'react'
import Container from '../../components/layouts/Container'
import { Heading, SECONDARY_FONT_FAMILY, elevation } from '../../theme/styles'
import PageItem from './components/PageItem';
import AddPageItem from './components/AddPageItem';
import { HeaderContainer } from '../../components/layouts/Header';
import DynamicContainer from '../../components/layouts/DynamicContainer';
import { getAllPages } from '../../services/indexDB';
import { useQuery } from '@tanstack/react-query';
import default_pages from '../../data/pages';

export default function Pages() {

    const { data: pages = [], isPending } = useQuery({
        queryKey: ['pages'],
        queryFn: getAllPages
    })

    const header = {
        title: `Pages  (${pages?.length || 0})`,
    }

    return (
        <DynamicContainer header={header}>
            {isPending && <CircularProgress />}
            {!isPending && <Grid container spacing={{ xs: 1, sm: 1.5 }} sx={{ p: { xs: 0.5, sm: 1 } }} >
                <AddPageItem />
                {pages.map((props) => <PageItem key={props.name} {...props} />)}
            </Grid>}
        </DynamicContainer>
    )
}
