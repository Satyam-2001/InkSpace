import React, { useEffect, useState } from 'react'
import { Stack, useMediaQuery } from '@mui/material'

import DynamicContainer from '../../../components/layouts/DynamicContainer';
import PageCongiguration from './PageConfiguration';
import PageImageUpload from './PageImageUpload';
import * as Yup from 'yup'

import { FormikProvider, useFormik } from 'formik'
import { Outlet } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { queryClient } from '../../../services/react-query';

const initialValues = {
    image: '',
    left_margin: 0,
    right_margin: 0,
    top_margin: 0,
    bottom_margin: 0,
    line_height: 0,
}

const validationSchema = Yup.object({
    image: Yup.string().required('Page is missing!'),
    left_margin: Yup.number().default(0),
    right_margin: Yup.number().default(0),
    top_margin: Yup.number().default(0),
    bottom_margin: Yup.number().default(0),
    line_height: Yup.number().default(0),
})


export default function Page({ title, values, saveHandler, endHeader }) {

    const shortScreen = useMediaQuery(theme => theme.breakpoints.down('md'))

    const { mutateAsync } = useMutation({
        mutationFn: saveHandler,
        onSettled: () => {
            queryClient.invalidateQueries('pages')
        }
    })

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: async (values) => {
            await mutateAsync(values)
        }
    })

    useEffect(() => {
        if (!values) return
        formik.setValues(values)
    }, [values])

    const header = {
        title,
        goBack: true
    }

    let component;

    if (shortScreen) {
        component = (
            <Stack
                overflow='auto'
                sx={{
                    flex: 1,
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
        <DynamicContainer
            header={{ ...header, endChildren: endHeader }}
            hideBottomNavbar
            sx={{ overflow: { xs: 'auto', md: 'hidden' } }}
        >
            <FormikProvider value={formik}>
                <Outlet />
                <Stack
                    direction={{ md: 'row' }}
                    sx={{
                        flex: 1,
                        gap: 3,
                        px: { md: 1 },
                        pt: { md: 1 },
                        pb: { xs: 0.5, md: 1 },
                        overflow: { md: 'hidden' }
                    }}
                >
                    {component}
                </Stack>
            </FormikProvider>
        </DynamicContainer>
    )
}
