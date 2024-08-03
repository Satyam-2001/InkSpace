import React, { Fragment, useState } from 'react'
import { Box, Button, Divider, Grid, IconButton, InputAdornment, Modal, Stack, Typography, useMediaQuery } from '@mui/material'

import { Heading, ModalStack, elevation } from '../../../theme/styles';

import UploadIcon from '@mui/icons-material/Upload';

import useImageInput from '../../../hooks/useImageInput';
import ImageEditorModal from '../../../components/ImageEditor';
import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import { useFormikContext } from 'formik';

export default function PageImageUpload() {

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
                position: values.image ? 'relative' : 'static',
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
                overflow: 'auto'
            }}
        >
            <input style={{ display: 'none' }} {...inputProps} />
            {values.image && <>
                <Box
                    component={'img'}
                    src={values.image}
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        maxWidth: 'calc(100% - 16px)',
                        maxHeight: 'calc(100% - 16px)',
                        objectFit: 'contain',
                        border: 1,
                        borderColor: 'divider',
                        // boxShadow: elevation()
                    }}
                />
            </>}
            {!values.image && <Fragment>
                <UploadIcon sx={{ fontSize: '5rem', color: 'white' }} />
                <Typography sx={{ color: 'white' }}>Upload Page</Typography>
            </Fragment>}
        </Stack>
    )
}
