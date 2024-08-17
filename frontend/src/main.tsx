import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import Search from "./pages/search";
import SearchHistory from "./pages/history";
import Trending from "./pages/trending";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
    },
    {
        path: '/search',
        element: <Search />,
    },
    {
        path: '/history',
        element: <SearchHistory />,
    },
    {
        path: '/trending',
        element: <Trending />,
    },

]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <App /> */}
    <RouterProvider router={router}/>
  </StrictMode>,
)
