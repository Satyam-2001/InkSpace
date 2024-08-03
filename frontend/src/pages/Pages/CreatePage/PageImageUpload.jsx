import React, { Fragment, useRef, useState } from 'react'
import { Box, Button, Divider, Grid, IconButton, InputAdornment, Modal, Stack, Typography, useMediaQuery } from '@mui/material'

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

export default function PageImageUpload() {

    const imgRef = useRef()
    const [crop, setCrop] = useState()
    const [completedCrop, setCompletedCrop] = useState()

    function onImageLoad(e) {
        const { width, height } = e.currentTarget
        const newCrop = centerAspectCrop(width, height, width / height)
        setCrop(newCrop)
        // setCompletedCrop(convertToPixelCrop(newCrop, width, height))
    }



    const navigate = useNavigate()
    const { values, setFieldValue } = useFormikContext()
    const [openImageEditor, setOpenImageEditor] = useState(false)
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

    const closeImageEditorHandler = () => {
        setOpenImageEditor(false)
    }

    return (
        <Stack
            onClick={imageContainerClickHandler}
            sx={{
                // position: values.image ? 'static' : 'static',
                bgcolor: values.image ? 'background.paper' : 'action.active',
                width: { xs: '100%', md: '35%' },
                height: { xs: '46vh', md: '100%' },
                borderRadius: '16px',
                border: values.image ? 0 : 2,
                borderColor: 'primary.main',
                boxShadow: elevation(),
                minWidth: '250px',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                p: 1,
                overflow: 'hidden',
            }}
        >
            <input style={{ display: 'none' }} {...inputProps} />
            {values.image && <>
                <Stack
                    component={'img'}
                    src={values.image}
                    sx={{
                        maxHeight: '100%',
                        maxWidth: '100%',
                        flex: 1,
                        border: 1,
                        borderColor: 'divider',
                        // transform: `scale(${scale}) rotate(${rotate}deg)`
                    }}
                // circularCrop
                />
            </>}
            {
                !values.image && <Fragment>
                    <UploadIcon sx={{ fontSize: '5rem', color: 'white' }} />
                    <Typography sx={{ color: 'white' }}>Upload Page</Typography>
                </Fragment>
            }
        </Stack >
    )
}
