import React, { Fragment, useRef, useState } from 'react'
import { Box, Button, Divider, Grid, IconButton, InputAdornment, Modal, Stack, Typography, styled, useMediaQuery } from '@mui/material'

import { Heading, ModalStack, elevation } from '../../../theme/styles';

import UploadIcon from '@mui/icons-material/Upload';

import useImageInput from '../../../hooks/useImageInput';
import { useNavigate } from 'react-router-dom';
import { useFormikContext } from 'formik';
import ReactCrop, {
    centerCrop,
    makeAspectCrop,
    Crop,
    PixelCrop,
    convertToPixelCrop,
} from 'react-image-crop'

function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
    return centerCrop(
        makeAspectCrop(
            {
                unit: '%',
                width: 100,
            },
            aspect,
            mediaWidth,
            mediaHeight,
        ),
        mediaWidth,
        mediaHeight,
    )
}

const ImageUploader = styled(Stack)(({ theme, isImage, error }) => ({
    position: isImage ? 'relative' : 'static',
    backgroundColor: error ? theme.palette.error.light : isImage ? theme.palette.background.paper : theme.palette.action.active,
    borderRadius: '16px',
    border: isImage ? 0 : 2,
    borderColor: error ? theme.palette.error.main : theme.palette.primary.main,
    boxShadow: elevation(),
    minWidth: '250px',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    overflow: 'auto'
}))

const PageImage = styled(Box)(({ theme }) => ({
    component: 'img',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 'calc(100% - 16px)',
    maxHeight: 'calc(100% - 16px)',
    objectFit: 'contain',
    border: 1,
    borderColor: 'divider',
}))

export default function PageImageUpload() {

    const navigate = useNavigate()
    const { values, errors, setFieldValue } = useFormikContext()
    const error = errors.image

    const { onClick: imageUploadHandler, inputProps } = useImageInput({
        options: {
            multiple: false,
            accept: 'image/*'
        },
        onSelect: (file) => {
            if (file) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setFieldValue('image', reader.result);
                };
                reader.readAsDataURL(file);
            }
        }
    })

    const imageContainerClickHandler = () => {
        if (values.image) {
            navigate('edit')
        }
        else {
            imageUploadHandler()
        }
    }

    return (
        <ImageUploader
            onClick={imageContainerClickHandler}
            isImage={!!values.image}
            error={error}
            sx={{
                width: { xs: '100%', md: '35%' },
                height: { xs: '46vh', md: '100%' },
            }}
        >
            <input style={{ display: 'none' }} {...inputProps} />
            {values.image &&
                <PageImage
                    component={'img'}
                    src={values.image}
                />}
            {!values.image && <Fragment>
                <UploadIcon sx={{ fontSize: '5rem', color: 'white' }} />
                <Typography sx={{ color: 'white' }}>{error || 'Upload Page'}</Typography>
                {/* {error ?? <Typography sx={{ color: 'white' }}>{error}</Typography>} */}
            </Fragment>}
        </ImageUploader>
    )
}
