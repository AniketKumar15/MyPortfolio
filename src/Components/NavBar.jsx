import React, { useState } from 'react'
import './component.css'
import logo from '../assets/logo.png'

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white text-black boxShadow89 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className='flex justify-center items-center gap-1.5 cursor-default'>
          <img src={logo} alt="logo" className='w-10' />
          <h1 className="text-2xl font-bold">Aniket Kumar</h1>
        </div>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex space-x-3">
          {["Home", "About", "Projects", "Skills", "Contact"].map((item) => (
            <li key={item}>
              <a href={`#${item.toLowerCase()}`} className="hover:text-blue-400 transition hoverShadow py-[3px] px-[8px]">
                {item}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {/* Simple Hamburger Menu Icon */}
          <div className="w-6 h-0.5 bg-black mb-1"></div>
          <div className="w-6 h-0.5 bg-black mb-1"></div>
          <div className="w-6 h-0.5 bg-black"></div>
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <ul className="md:hidden bg-white p-4 space-y-4 text-center">
          {["Home", "About", "Projects", "Skills", "Contact"].map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="block py-2 hover:text-blue-400 transition"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}

export default NavBar
