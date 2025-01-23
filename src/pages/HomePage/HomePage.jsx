import React from 'react'
import Navbar from '../../components/Navbar/Navbar'
import Hero from '../../components/Hero/Hero'
import './HomePageStyles.css'
import Footer from '../../components/Footer/Footer'

const HomePage = () => {
  return (
    <div className='home'>
      <Navbar/>
      <Hero/>
      <Footer/>
    </div>
  )
}

export default HomePage