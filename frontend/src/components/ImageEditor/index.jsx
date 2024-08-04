import { Button, Grid, IconButton, Modal, Stack, Typography } from '@mui/material'
import React, { createContext, useRef, useState } from 'react'
import { APP_BAR_HEIGHT, ModalStack, elevation } from '../../theme/styles'
import DynamicContainer from '../layouts/DynamicContainer'
import ReactCrop, {
    centerCrop,
    makeAspectCrop,
    Crop,
    PixelCrop,
    convertToPixelCrop,
} from 'react-image-crop'

import CropIcon from '@mui/icons-material/Crop';
import Rotate90DegreesCcwIcon from '@mui/icons-material/Rotate90DegreesCcw';
import Rotate90DegreesCwOutlinedIcon from '@mui/icons-material/Rotate90DegreesCwOutlined';

import 'react-image-crop/dist/ReactCrop.css'
import { canvasPreview } from './canvasPreview'
import { HeaderContainer, HeaderContent } from '../layouts/Header'

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

function ToolButton({ name, Icon, ...props }) {
    return (
        <>
            <Button
                fullWidth
                size='large'
                sx={{ boxShadow: elevation(), color: 'white', display: { xs: 'none', md: 'flex' } }}
                startIcon={<Icon sx={{ fontSize: '24px', color: 'white' }} />}
                {...props}
            >
                {name}
            </Button>
            <IconButton sx={{ display: { md: 'none' } }} {...props}>
                <Icon sx={{ fontSize: '24px', color: 'white', }} />
            </IconButton>
        </>
    )
}

function EditTools({ setRotate, setCrop, saveHandler }) {
    return (
        <Stack
            direction='row'
            sx={{
                pb: 1,
                pt: 1,
                px: 1,
                gap: 2,
                // width: { md: '40%' },
                alignItems: 'center',
                justifyContent: 'space-evenly',
            }}
        >
            <ToolButton name='Crop' Icon={CropIcon} onClick={setCrop} />
            <ToolButton name='Rotate Cw' Icon={Rotate90DegreesCwOutlinedIcon} onClick={() => setRotate(prop => prop + 90)} />
            <ToolButton name='Rotate CCW' Icon={Rotate90DegreesCcwIcon} onClick={() => setRotate(prop => prop + -90)} />
            {/* <Button fullWidth size='large' sx={{ boxShadow: elevation() }}>
                Cancel
            </Button> */}
            <Button fullWidth variant='contained' onClick={saveHandler} sx={{ boxShadow: elevation(), maxWidth: '30%' }}>
                Done
            </Button>
        </Stack>
    )
}


export default function ImageEditor({ open, image, onSave = () => { }, onClose = () => { } }) {
    const previewCanvasRef = useRef(null)
    const imgRef = useRef(null)
    const hiddenAnchorRef = useRef(null)
    const blobUrlRef = useRef('')
    const [crop, setCrop] = useState()
    const [completedCrop, setCompletedCrop] = useState()
    const [scale, setScale] = useState(1)
    const [rotate, setRotate] = useState(0)
    const [aspect, setAspect] = useState()

    function onImageLoad(e) {
        const { width, height } = e.currentTarget
        const newCrop = centerAspectCrop(width, height, width / height)
        setCrop(newCrop)
        // setCompletedCrop(convertToPixelCrop(newCrop, width, height))
    }

    function handleToggleAspectClick() {

        if (imgRef.current) {
            const { width, height } = imgRef.current
            const newCrop = centerAspectCrop(width, height, 16 / 9)
            setCrop(newCrop)
            setCompletedCrop(convertToPixelCrop(newCrop, width, height))
        }
    }

    async function saveHandler() {

        let croppedImage = completedCrop

        if (!croppedImage) {
            const { width, height } = imgRef.current
            const newCrop = centerAspectCrop(width, height, width / height)
            croppedImage = convertToPixelCrop(newCrop, width, height)
        }

        canvasPreview(
            imgRef.current,
            previewCanvasRef.current,
            croppedImage,
            scale,
            rotate,
        )

        const image = imgRef.current
        const previewCanvas = previewCanvasRef.current

        if (!image || !previewCanvas) {
            throw new Error('Crop canvas does not exist')
        }

        // This will size relative to the uploaded image
        // size. If you want to size according to what they
        // are looking at on screen, remove scaleX + scaleY
        const scaleX = image.naturalWidth / image.width
        const scaleY = image.naturalHeight / image.height

        const offscreen = new OffscreenCanvas(
            croppedImage.width * scaleX,
            croppedImage.height * scaleY,
        )
        const ctx = offscreen.getContext('2d')
        if (!ctx) {
            throw new Error('No 2d context')
        }

        ctx.drawImage(
            previewCanvas,
            0,
            0,
            previewCanvas.width,
            previewCanvas.height,
            0,
            0,
            offscreen.width,
            offscreen.height,
        )
        // You might want { type: "image/jpeg", quality: <0 to 1> } to
        // reduce image size

        const blob = await offscreen.convertToBlob({
            type: 'image/png',
        })

        const reader = new FileReader();
        reader.onloadend = function () {
            console.log(blob, reader.result)
            onSave(reader.result)
        }
        reader.readAsDataURL(blob);
    }

    // const rotateHandler = (value) => {
    //     console.log(crop, completedCrop)
    //     const { width, height } = crop
    //     const newCrop = centerAspectCrop(height, width, height / width)
    //     setCrop(newCrop)
    //     // setCompletedCrop(convertToPixelCrop(newCrop, height, width))
    //     setCompletedCrop((prop) => ({
    //         width: prop.height,
    //         height: prop.width,
    //         ...prop
    //     }))
    //     setRotate(prop => prop + value)
    //     // setCrop(newCrop)
    // }

    return (
        <Modal open={open} onClose={onClose}>
            <ModalStack sx={{ height: '100%', width: '100%', bgcolor: 'rgba(0, 0, 0, 0.8)', pt: APP_BAR_HEIGHT }}>
                <HeaderContainer sx={{ bgcolor: 'transparent', backdropFilter: 'none' }}>
                    <HeaderContent goBack={onClose} title='Edit Image' sx_heading={{ color: 'white' }} />
                </HeaderContainer>
                {/* <DynamicContainer
                    hideBottomNavbar
                    header={{
                        title: 'Edit Image',
                        goBack: onClose
                    }}
                > */}
                <Stack
                    // direction={{ md: 'row' }}
                    sx={{
                        flex: 1,
                        gap: { md: 3 },
                    }}
                >
                    <Stack
                        sx={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: { xs: 'center', md: undefined },
                            px: 1,
                        }}
                    >
                        <Stack
                            component={ReactCrop}
                            crop={crop}
                            onChange={(_, percentCrop) => setCrop(percentCrop)}
                            onComplete={(c) => setCompletedCrop(c)}
                            aspect={aspect}
                            // minWidth={400}
                            minHeight={100}
                            sx={{
                                maxHeight: { xs: '80vh', md: '75vh' },
                                maxWidth: '100vw',
                                border: 1,
                                borderColor: 'divider',
                                boxShadow: elevation(),
                                // transform: `scale(${scale}) rotate(${rotate}deg)`
                            }}
                        // circularCrop
                        >
                            <img
                                ref={imgRef}
                                alt="Crop me"
                                src={image}
                                style={{ transform: `scale(${scale}) rotate(${rotate}deg)` }}
                                onLoad={onImageLoad}
                            />
                        </Stack>
                    </Stack>
                    <canvas
                        ref={previewCanvasRef}
                        style={{
                            display: 'none',
                            border: '1px solid black',
                            objectFit: 'contain',
                            width: completedCrop?.width || 0,
                            height: completedCrop?.height || 0,
                        }}
                    />
                    <EditTools setCrop={handleToggleAspectClick} setRotate={setRotate} saveHandler={saveHandler} />
                </Stack>
                {/* </DynamicContainer> */}

            </ModalStack>

        </Modal >
    )
}
