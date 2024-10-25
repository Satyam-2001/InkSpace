import { Grid, Stack, styled } from "@mui/material";
import { elevation } from "../../../theme/styles";

const PageStack = styled(Stack)(({ theme }) => ({
    position: 'relative',
    height: '0',
    paddingBottom: '141.4%', // This maintains the A4 aspect ratio (297/210 ≈ 1.414)
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    borderRadius: '12px',
    cursor: 'pointer',
    boxShadow: elevation(),
    transition: 'transform ease 0.2s',
    '&:hover': {
        transform: 'scale(1.05)'
    },
    '&::after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: '30%', // Adjust the height as needed for the gradient area
        background: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.5) 90%)',
        zIndex: 1,
        borderRadius: '12px',
    },
    '& img': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        zIndex: 0,
        borderRadius: '12px',
    },
}));

export default function PageItemContainer({ children, url, sx, ...props }) {
    return (
        <Grid
            item
            xs={4}
            sm={4}
            md={2.4}
        >
            <PageStack
                component="div"
                sx={{
                    backgroundImage: url && `url(${url})`, // Set the background image
                    height: 'auto', // Remove height to make the aspect ratio work correctly
                    ...sx
                }}
                {...props}
            >
                {children}
            </PageStack>
        </Grid>
    )
}