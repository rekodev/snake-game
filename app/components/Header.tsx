'use client';

import { Button } from '@nextui-org/button';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from '@nextui-org/navbar';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AcmeLogo } from './AcmeLogo';

const navLinks = [
  {
    href: '/',
    text: 'Home',
  },
  {
    href: '/scores',
    text: 'Scores',
  },
] as const;

const isActive = (pathname: string, href: string) => {
  if (href === '/') return pathname === href;

  return pathname.startsWith(href);
};

const Header = () => {
  const pathname = usePathname();

  return (
    <Navbar className='border'>
      <NavbarBrand>
        <AcmeLogo />
        <p className='font-bold text-inherit'>ACME</p>
      </NavbarBrand>
      <NavbarContent className='hidden sm:flex gap-4' justify='center'>
        {navLinks.map(({ href, text }) => (
          <NavbarItem key={href} isActive={isActive(href, pathname)}>
            <Link href={href}>{text}</Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify='end'>
        <NavbarItem className='hidden lg:flex'>
          <Link href='#'>Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color='primary' href='#' variant='flat'>
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
