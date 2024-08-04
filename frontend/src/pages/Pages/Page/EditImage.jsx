import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useFormikContext } from 'formik'
import ImageEditor from '../../../components/ImageEditor'

export default function EditImage() {
    const { values, setFieldValue } = useFormikContext()
    const navigate = useNavigate()

    const closeHandler = () => {
        navigate(-1)
    }

    const saveHandler = (image) => {
        setFieldValue('image', image)
        closeHandler()
    }

    return (
        <ImageEditor
            open={true}
            image={values.image}
            onClose={closeHandler}
            onSave={saveHandler}
        />
    )
}
