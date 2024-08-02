import React, { Fragment, useState } from 'react'
import Container, { Root } from '../../../components/layouts/Container'
import { HeaderContainer } from '../../../components/layouts/Header'
import { Box, Grid, IconButton, Stack, Typography, useMediaQuery } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Heading, elevation } from '../../../theme/styles';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import UploadIcon from '@mui/icons-material/Upload';

import DynamicContainer from '../../../components/layouts/DynamicContainer';
import useImageInput from '../../../hooks/useImageInput';
import InputField from '../../../components/InputField';

const initialState = {
    url: '',
    name: '',
    left_margin: 0,
    right_margin: 0,
    top_margin: 0,
    bottom_margin: 0,
    size_type: '',
    height: 0,
    width: 0,
}

function PageImageUpload({ imageUrl, uploadImage }) {
    console.log(imageUrl)
    const { onClick, inputProps } = useImageInput({
        options: {
            multiple: false,
            accept: 'image/*'
        },
        onSelect: (file) => {
            console.log(file)
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    uploadImage(reader.result);
                };
                reader.readAsDataURL(file);
            }
        }
    })
    return (
        <Stack
            onClick={onClick}
            sx={{
                position: imageUrl ? 'relative' : 'static',
                bgcolor: imageUrl ? 'background.paper' : 'action.active',
                width: { xs: '100%', md: '35%' },
                height: { xs: '60vh', md: '100%' },
                borderRadius: '16px',
                border: imageUrl ? 0 : 2,
                borderColor: 'primary.main',
                boxShadow: elevation(),
                minWidth: '250px',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                overflow: 'auto'
            }}
        >
            <input style={{ display: 'none' }} {...inputProps} />
            {imageUrl && <>
                <Box
                    component={'img'}
                    src={imageUrl}
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        maxWidth: 'calc(100% - 24px)',
                        maxHeight: 'calc(100% - 24px)',
                        objectFit: 'contain',
                        border: 1,
                        borderColor: 'divider',
                        // boxShadow: elevation()
                    }}
                />
            </>}
            {!imageUrl && <Fragment>
                <UploadIcon sx={{ fontSize: '5rem', color: 'primary.main' }} />
            </Fragment>}
        </Stack>
    )
}

function PageCongiguration() {
    return (
        <Stack sx={{ gap: 2, overflow: 'auto', flex: 1, pb: 1 }}>
            <Heading sx={{ fontSize: { xs: '1.5rem' } }}>Page Configuration</Heading>
            <Grid container spacing={1.5} px={1}>
                <Grid item xs={12} md={6}>
                    <InputField label='Top Margin' />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputField label='Bottom Margin' />
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputField label='Left Margin' /> {/* Adjusted label */}
                </Grid>
                <Grid item xs={12} md={6}>
                    <InputField label='Right Margin' /> {/* Adjusted label */}
                </Grid>
            </Grid>
        </Stack>
    )
}


export default function CreatePage() {

    const shortScreen = useMediaQuery(theme => theme.breakpoints.down('md'))
    const [page, setPage] = useState(initialState)

    const header = {
        title: `Create Page`,
        goBack: true
    }

    function uploadImage(image) {
        setPage(prop => ({ ...prop, url: image }))
    }

    let component;

    if (shortScreen) {
        component = (
            <Stack
                overflow='auto'
                sx={{
                    pt: 0.5,
                    px: 1,
                    gap: { xs: 1.5, md: 3 },
                }}
            >
                <PageImageUpload imageUrl={page.url} uploadImage={uploadImage} />
                <PageCongiguration />
            </Stack>
        )
    }
    else {
        component = (
            <>
                <PageImageUpload imageUrl={page.url} uploadImage={uploadImage} />
                <PageCongiguration />
            </>
        )
    }

    return (
        <DynamicContainer header={header} hideBottomNavbar>
            <Stack
                direction={{ md: 'row' }}
                sx={{ flex: 1, gap: 3, px: { md: 1 }, py: { md: 1 } }}
            >
                {component}
            </Stack>
        </DynamicContainer>
    )
}
