"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const items = [
    { name: "Hackathons", href: "/map" },
    { name: "Ideas", href: "/myIdeas" },
    { name: "Generate new Idea", href: "/dashboard" }
  ];

  return (
    <div className='p-4 w-full z-10 top-0 left-0 fixed h-20 bg-primary shadow-md'>
      <nav className='flex items-center justify-between max-w-6xl mx-auto'>
        <Image
          className='rounded-full'
          src={'/logo.webp'}
          width={50}
          height={50}
          alt='logo'
        />
        
        <div className='hidden md:flex space-x-6'>
          {items.map((item) => (
            <Link key={item.href} href={item.href} className='text-purple-500 hover:text-purple-300'>
              {item.name}
            </Link>
          ))}
        </div>

        <button className='md:hidden text-purple-500' onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className='md:hidden flex flex-col items-center absolute top-20 left-0 w-full bg-black shadow-md py-4'>
          {items.map((item) => (
            <Link key={item.href} href={item.href} className='text-purple-500 hover:text-purple-300 py-2' onClick={() => setIsOpen(false)}>
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navbar;