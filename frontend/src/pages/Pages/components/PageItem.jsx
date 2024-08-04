import { Typography } from "@mui/material";
import PageItemContainer from "./PageItemContainer";
import { useNavigate } from "react-router-dom";


export default function PageItem({ id, image }) {
    const navigate = useNavigate()

    return (
        <PageItemContainer
            onClick={() => navigate(`${id}`)}
            url={image}
        >
            {/* <Typography
                sx={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    color: '#fff',
                    fontSize: { xs: '13px', md: '18px' },
                    textAlign: 'center',
                    padding: '10px',
                    textShadow: '0px 1px 0 #000',
                    zIndex: 2, // Make sure text is above the gradient
                }}>
                {name}
            </Typography> */}
        </PageItemContainer >
    )
}