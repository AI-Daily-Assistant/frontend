import Link from 'next/link';
import { MenuItem } from './MenuItems.types';

export default function MobileMenuItems({ item }: { item: MenuItem }) {
  return (
    <div key={item.title} className='space-y-2'>
      <Link
        href={item.href}
        className='block px-4 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600'
      >
        {item.title}
      </Link>
      <div className='space-y-1 pl-6'>
        {item.dropdownItems?.map((dropdownItem) => (
          <Link
            key={dropdownItem.title}
            href={dropdownItem.href}
            className='block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-blue-600'
          >
            {dropdownItem.title}
          </Link>
        ))}
      </div>
    </div>
  );
}
