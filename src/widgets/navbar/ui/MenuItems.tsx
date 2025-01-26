import Link from 'next/link';
import { MenuItem } from './MenuItems.types';

export default function MenuItems({ item }: { item: MenuItem }) {
  return (
    <div key={item.title} className='group relative'>
      <Link
        href={item.href}
        className='px-3 py-2 text-gray-700 transition-colors duration-200 hover:text-blue-600'
      >
        {item.title}
      </Link>
      <div className='invisible absolute left-0 mt-0 w-40 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100'>
        <div className='pt-2'>
          <div className='rounded-lg border bg-white shadow-lg'>
            {item.dropdownItems?.map((dropdownItem) => (
              <Link
                key={dropdownItem.title}
                href={dropdownItem.href}
                className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-blue-600'
              >
                {dropdownItem.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
