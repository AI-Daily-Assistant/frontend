export interface DropdownItem {
  title: string;
  href: string;
}

export interface MenuItem {
  title: string;
  href: string;
  dropdownItems?: DropdownItem[];
}
