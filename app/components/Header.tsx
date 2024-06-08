"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import SnakeLogo from "./SnakeLogo";
import { ThemeSwitcher } from "./ThemeSwitcher";

const navLinks = [
  {
    href: "/",
    text: "Home",
  },
  {
    href: "/scores",
    text: "Scores",
  },
] as const;

const isActive = (pathname: string, href: string) => {
  if (href === "/") return pathname === href;

  return pathname.startsWith(href);
};

const Header = () => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <Navbar isBordered>
      <NavbarBrand
        className="cursor-pointer gap-2"
        onClick={() => router.push("/")}
      >
        <SnakeLogo />
        <p className="font-bold text-inherit">Snake Game</p>
      </NavbarBrand>
      <NavbarContent className="hidden gap-4 sm:flex" justify="center">
        {navLinks.map(({ href, text }) => (
          <NavbarItem key={href} isActive={isActive(href, pathname)}>
            <Link href={href}>{text}</Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <ThemeSwitcher />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default Header;
