import React from 'react'
import NavBar from './Components/NavBar'
import Hero from './Components/Hero'
import About from './Components/About'
import Skills from './Components/Skills'
import Projects from './Components/Projects'
import Contact from './Components/Contact'

const App = () => {
  return (
    <div>
      <NavBar />
      <Hero />
      <hr className='text-white w-[90%] mx-auto mb-10' />
      <About />
      <hr className='text-white w-[90%] mx-auto mb-10' />
      <Skills />
      <hr className='text-white w-[90%] mx-auto mb-10' />
      <Projects />
      <hr className='text-white mx-auto' />
      <Contact />
    </div>
  )
}

export default App
