"use client"
import { Bars3Icon, MegaphoneIcon, XMarkIcon } from '@heroicons/react/16/solid'
import Link from 'next/link'
import { useState } from 'react'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="bg-gray-900 px-8 md:px-10 py-6 font-catamaran">
      <div className=" flex items-center justify-between">
        {/* Logo */}
        <div className="text-[#f1b722] text-2xl font-bold">
          <Link href="/">
            MovieApp
          </Link>
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

