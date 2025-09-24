import React from 'react'
import Navbar from '../components/Navbar'
import Header from '../components/Header'
import BlogList from '../components/BlogList'
import BlogCard from '../components/BlogCard'
import Newslatter from '../components/Newslatter'
import Footer from '../components/Footer'

function Home() {
  return (
    <>
        <Navbar/>
        <Header/>
        <BlogList/>
        <Newslatter/>
        <Footer/>
        
    </>
  )
}

export default Home