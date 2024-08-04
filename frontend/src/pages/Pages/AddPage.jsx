import React from 'react'
import Page from './Page'
import { createPage } from '../../services/indexDB'

export default function AddPage() {
    return (
        <Page
            title='Add Page'
            saveHandler={createPage}
        />
    )
}
