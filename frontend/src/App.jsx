import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Navbar from './components/Navbar'
import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import AddBlog from './pages/admin/AddBlog'
import ListBlog from './pages/admin/ListBlog'
import Comments from './pages/admin/Comments'
import Login from './pages/admin/Login'
import 'quill/dist/quill.snow.css'
import {Toaster} from 'react-hot-toast'
function App() {
  const location = useLocation();

  // Routes aan Navbar ka muuqan doonin
  const hideNavbarRoutes = ["/login", "/admin", "/admin/dashboard", "/admin/add-blog", "/admin/list-blog", "/admin/comments"];
  const shouldHideNavbar = hideNavbarRoutes.some(route =>
    location.pathname.startsWith(route)
  );

  return (
    <div>
      <Toaster/>
      {/* Navbar muuji kaliya marka aanu ku jirin login/admin */}
      {!shouldHideNavbar && <Navbar />}

      <Routes>
        {/* Public routes */}
        <Route path='/' element={<Home />} />
        <Route path='/blog/:id' element={<Blog />} />

        {/* Login page */}
        <Route path='/login' element={<Login />} />

        {/* Admin Dashboard */}
        <Route path='/admin/*' element={<Layout />}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='add-blog' element={<AddBlog />} />
          <Route path='list-blog' element={<ListBlog />} />
          <Route path='comments' element={<Comments />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
