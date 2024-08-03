import React, { useState } from 'react'
import { Stack, useMediaQuery } from '@mui/material'

import DynamicContainer from '../../../components/layouts/DynamicContainer';
import PageCongiguration from './PageConfiguration';
import PageImageUpload from './PageImageUpload';

import { FormikProvider, useFormik } from 'formik'
import { Outlet } from 'react-router-dom';

const initialValues = {
    image: '',
    name: '',
    left_margin: 0,
    right_margin: 0,
    top_margin: 0,
    bottom_margin: 0,
    size_type: '',
    height: 0,
    width: 0,
}


export default function CreatePage() {

    const shortScreen = useMediaQuery(theme => theme.breakpoints.down('md'))

    const formik = useFormik({
        initialValues,
        onSubmit: () => {

        }
    })


    const header = {
        title: `Add Page`,
        goBack: true
    }

    let component;

    if (shortScreen) {
        component = (
            <Stack
                overflow='auto'
                sx={{
                    px: 0.5,
                    pt: 0.5,
                    gap: { xs: 1.5, md: 3 },
                }}
            >
                <PageImageUpload />
                <PageCongiguration />
            </Stack>
        )
    }
    else {
        component = (
            <>
                <PageImageUpload />
                <PageCongiguration />
            </>
        )
    }

    return (
        <DynamicContainer header={header} hideBottomNavbar>
            <FormikProvider value={formik}>
                <Outlet />
                <Stack
                    direction={{ md: 'row' }}
                    sx={{ flex: 1, gap: 3, px: { md: 1 }, py: { md: 1 }, pb: { xs: 0.5, md: 0 } }}
                >
                    {component}
                </Stack>
            </FormikProvider>
        </DynamicContainer>
    )
}
