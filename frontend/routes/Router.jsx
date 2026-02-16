import { createBrowserRouter } from "react-router";
import RootLayout from "../src/layout/RootLayout/RootLayout";
import Home from "../src/pages/Home/Home";
import AuthLayout from "../src/layout/AuthLayout/AuthLayout";
import Register from "../src/pages/Register/Register";


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
            
    },
    {
        path:"/",
        Component:AuthLayout,
        children:[
            {
              path:"register", 
              Component:Register 
            }
        ]
        

    }
])
export default router;