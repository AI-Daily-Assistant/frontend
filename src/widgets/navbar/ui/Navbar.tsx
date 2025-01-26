'use client';

import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import MenuItems from './MenuItems';
import MobileMenuItems from './MobileMenuItems';
import { menuItems } from '../data/menuitems';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className='fixed left-0 right-0 top-0 z-50 h-[80px] w-full bg-white shadow-md'>
      <div className='flex h-full w-full items-center justify-between px-6'>
        <Link
          href='/'
          className='transform text-xl font-bold duration-200 hover:scale-110'
        >
          LOGO
        </Link>

        <div className='hidden items-center space-x-10 pr-10 lg:flex'>
          {menuItems.map((item, idx) => (
            <MenuItems key={idx} item={item} />
          ))}
        </div>

        {/* 모바일 메뉴 버튼 */}
        <div className='lg:hidden'>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className='rounded-md p-2 text-gray-700 hover:text-blue-600 focus:outline-none'
          >
            {isMobileMenuOpen ? (
              <X className='h-6 w-6' />
            ) : (
              <Menu className='h-6 w-6' />
            )}
          </button>
        </div>
      </div>

      {/* 모바일 메뉴 */}
      {isMobileMenuOpen && (
        <div className='bg-white py-4 shadow-md lg:hidden'>
          {menuItems.map((item, idx) => (
            <React.Fragment key={idx}>
              <MobileMenuItems item={item} />
              {idx !== menuItems.length - 1 && (
                <hr className='my-2 border-t border-gray-300' />
              )}
            </React.Fragment>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
