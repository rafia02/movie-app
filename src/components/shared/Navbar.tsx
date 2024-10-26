"use client"
import useDarkModeStore from '@/store/DarkMoodStore'
import { Bars3Icon, MegaphoneIcon, MoonIcon, SunIcon, XMarkIcon } from '@heroicons/react/16/solid'
import Link from 'next/link'
import { useEffect, useState } from 'react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }





  const { isDarkMode, toggleDarkMode, setDarkMode } = useDarkModeStore();

  // Set dark mode based on localStorage on component mount
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedMode);
    document.documentElement.classList.toggle('dark', savedMode);
  }, [setDarkMode]);

  // Toggle dark mode on HTML element when isDarkMode changes
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  

  return (
    <nav className="bg-[#081b27] px-8 md:px-10 py-8 font-catamaran">
      <div className=" flex items-center justify-between">
        {/* Logo */}
        <div className="text-[#f1b722] flex items-center gap-5 text-2xl font-bold">
          <Link href="/">
            MovieApp
          </Link>


          <button
           onClick={toggleDarkMode}
            className="flex items-center justify-center w-10 h-8 bg-gray-200 dark:bg-gray-700 rounded-full shadow-md transition-colors duration-300"
            aria-label="Toggle Dark Mode"
          >
            {isDarkMode ? (
              <SunIcon className="w-6 h-6 text-yellow-600" />
            ) : (
              <MoonIcon className="w-6 h-6 text-gray-900" />
            )}
          </button>


        </div>

        {/* Menu Items */}
        <div className="md:flex gap-6 hidden ">
          <Link href="/" className="text-gray-300 hover:text-white">
            Home
          </Link>
          <Link href="/watchlist" className="text-gray-300 hover:text-white">
            Watchlist
          </Link>
          <Link href="/about" className="text-gray-300 hover:text-white">
            About
          </Link>
          <Link href="/contact" className="text-gray-300 hover:text-white">
            Contact
          </Link>
        </div>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden">
          <button onClick={toggleMenu}>
            {!isOpen ? (
              <Bars3Icon className="h-6 w-6 text-white" />
            ) : (
              <XMarkIcon className="h-6 w-6 text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="flex flex-col gap-5 mt-4">
            <Link href="/" className="text-gray-300 hover:text-white" onClick={toggleMenu}>
              Home
            </Link>
            <Link href="/watchlist" className="text-gray-300 hover:text-white" onClick={toggleMenu}>
              Watchlist
            </Link>
            <Link href="/about" className="text-gray-300 hover:text-white" onClick={toggleMenu}>
              About
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-white" onClick={toggleMenu}>
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar

