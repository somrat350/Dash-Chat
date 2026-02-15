import { createBrowserRouter } from "react-router";
import RootLayout from "../src/layout/RootLayout/RootLayout";
import Home from "../src/pages/Home/Home";

const router = createBrowserRouter([ 
    { 
        path: "/",
        Component: RootLayout,
        children: [ 
            { 
                index: true,
                Component: Home
            }
        ]
            
    }
])
export default router;