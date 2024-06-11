"use client";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@nextui-org/navbar";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

import { ThemeSwitcher } from "./ThemeSwitcher";

const navLinks = [
  {
    href: "/",
    text: "Game",
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

  const [isMenuOpen] = useState(false);

  return (
    <Navbar isBordered>
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand
          className="cursor-pointer gap-2"
          onClick={() => router.push("/")}
        >
          <Image
            src="/images/snake_logo.png"
            alt="Snake Logo"
            width={50}
            height={50}
          />
          <p className="font-bold text-inherit">Snake Game</p>
        </NavbarBrand>
      </NavbarContent>

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

      <NavbarMenu>
        {navLinks.map((item, index) => (
          <NavbarMenuItem
            key={`${item.text}-${index}`}
            isActive={isActive(item.href, pathname)}
          >
            <Link className="w-full text-xl" href={item.href}>
              {item.text}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;
