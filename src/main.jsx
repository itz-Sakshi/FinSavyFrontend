import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { RouterProvider, createBrowserRouter } from 'react-router-dom'

import Home from './pages/Home.jsx'
import PlayGame from "./pages/PlayGame.jsx"
import PlayGameLayout from "./pages/PlayGameLayout.jsx"



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "", // Default route for "/"
        element: <Home />,
      },
      {
        path: "play-game", // Relative path for "/play-game"
        element: <PlayGameLayout />,
        children: [
          {
            index: true, // Default route under "/play-game"
            element: <PlayGame />,
          },
        ],
      },
    ],
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)