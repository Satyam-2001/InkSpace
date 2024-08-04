import React, { Fragment } from 'react'
import Page from './Page'
import { createPage, deletePage, getPage, updatePage } from '../../services/indexDB'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { HeaderIconButton } from '../../components/layouts/Header'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Button, Stack, Typography } from '@mui/material'
import { elevation } from '../../theme/styles'

export default function EditPage() {

    const navigate = useNavigate()
    const { pageId } = useParams()

    const { data, isPending } = useQuery({
        queryKey: ['pages', pageId],
        queryFn: () => getPage(pageId)
    })

    const { mutate } = useMutation({
        mutationFn: () => deletePage(pageId)
    })

    const deleteHandler = () => {
        mutate()
        navigate(-1)
    }

    return (
        <Page
            title='Edit Page'
            values={data}
            saveHandler={(data) => updatePage(pageId, data)}
            endHeader={
                data && !data.sample ?
                    <>
                        <HeaderIconButton
                            sx={{ display: { md: 'none' } }}
                            onClick={deleteHandler}
                        >
                            <DeleteOutlineIcon />
                        </HeaderIconButton>
                        <Button
                            size='large'
                            variant='outlined'
                            startIcon={<DeleteOutlineIcon sx={{ color: 'primary.main' }} />}
                            sx={{ display: { xs: 'none', md: 'flex' } }}
                            onClick={deleteHandler}
                        >
                            Delete
                        </Button>
                    </> :
                    <>
                    <Stack sx={{boxShadow: elevation(-1), py: 1, px: 1.5, borderRadius: '16px'}}>
                        <Typography sx={{fontSize: '16px', color: 'primary.main'}}>
                            Sample Page
                        </Typography>
                    </Stack>
                    </>
            }
        />
    )
}
