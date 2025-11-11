import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Root from './Components/Root/Root.jsx'
import Login from './Components/Login/Login.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { CartProvider } from './Components/Context/CartContext.jsx'
import Signup from './Components/Signup/Signup.jsx'
import Categorywiseproduct from './Components/Categorywiseproduct/Categorywiseproduct.jsx'
import Cart from './Components/Cart/Cart.jsx'
import Payment from './Components/Payment/Payment.jsx'
import Admin from './Components/Admin/Admin.jsx'
import Track from './Components/Track/Track.jsx'
import Search from './Components/Search/Search.jsx'
import Productdetails from './Components/Productdetails/Productdetails.jsx'
import Become_a_seller from './Components/Become_a_seller/Become_a_seller.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children:[
      {
        path: '/',
        element: <Root/>
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/signup',
        element: <Signup />
      }
    ]
  },
  {
    path: '/becomeaseller',
    element:<Become_a_seller />
  },
  {
    path: '/products/:id',
    element:<Productdetails />
  },
  {
    path: '/products/category/:id',
    element:<Categorywiseproduct />
  },
  {
    path: '/:user/cart',
    element:<Cart/>
  },
  {
    path: '/:admin',
    element:<Admin />
  },
  {
    path: '/:user/track',
    element:<Track/>
  },
  {
    path: '/:user/search/:srch',
    element: <Search />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <RouterProvider router={router} />
    </CartProvider>
  </StrictMode>,
)
