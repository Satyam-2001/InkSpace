import { createBrowserRouter, Outlet } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Container from "../components/layouts/Container";
import Error from "../pages/Error";
import Pages from "../pages/Pages";
import CreatePage from "../pages/Pages/Page";
import EditImage from "../pages/Pages/Page/EditImage";
import AddPage from "../pages/Pages/AddPage";
import EditPage from "../pages/Pages/EditPage";
import Fonts from "../pages/Fonts";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Outlet />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'pages',
                element: <Outlet />,
                children: [
                    {
                        index: true,
                        element: <Pages />,
                    },
                    {
                        path: 'create',
                        element: <AddPage />,
                        children: [
                            {
                                path: 'edit',
                                element: <EditImage />
                            }
                        ]
                    },
                    {
                        path: ':pageId',
                        element: <EditPage />,
                        children: [
                            {
                                path: 'edit',
                                element: <EditImage />
                            }
                        ]
                    }
                ]
            },
            {
                path: 'fonts',
                element: <Fonts />
            },
            {
                path: '*',
                element: <Error />
            }
        ]
    }
])

export default router