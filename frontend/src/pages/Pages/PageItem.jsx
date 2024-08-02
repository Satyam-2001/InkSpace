import { Typography } from "@mui/material";
import PageItemContainer from "./components/PageItemContainer";


export default function PageItem({ url, name }) {
    return (
        <PageItemContainer url={url}>
            <Typography
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    color: '#fff',
                    fontSize: {xs: '13px', md: '18px'},
                    textAlign: 'center',
                    padding: '10px',
                    textShadow: '0px 1px 0 #000',
                    zIndex: 2, // Make sure text is above the gradient
                }}>
                {name}
            </Typography>
        </PageItemContainer >
    )
}