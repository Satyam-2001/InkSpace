import { createContext } from "react";

export const ImageEditorContext = createContext({
    rotate: 0,
    aspect: undefined,
    crop: undefined,
    scale: 1,
    onSave: () => { }
})


export default function ImageEditorProvider({ children }) {
    return (
        <ImageEditorContext.Provider>
            {children}
        </ImageEditorContext.Provider>
    )
}