import { createBrowserRouter, Outlet } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Container from "../components/layouts/Container";
import Error from "../pages/Error";
import Pages from "../pages/Pages";
import CreatePage from "../pages/Pages/CreatePage";
import EditImage from "../pages/Pages/CreatePage/EditImage";

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
                        element: <CreatePage />,
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
                path: '*',
                element: <Error />
            }
        ]
    }
])

export default router