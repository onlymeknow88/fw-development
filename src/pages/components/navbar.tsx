"use client"

import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/react"
import { ChevronDown, Code, Database, Globe, Mail, Menu, Palette, Phone, ShoppingCart, Smartphone, X } from 'lucide-react'

import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"

interface NavbarProps {
  cartItemCount?: number
}

export default function ResponsiveNavbar({ cartItemCount = 0 }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  const menuItems = [
    {
      label: "Home",
      href: "/",
    //   icon: <Globe className="h-4 w-4" />,
    },
    // {
    //   label: "Services",
    //   href: "/services",
    //   icon: <Code className="h-4 w-4" />,
    //   hasDropdown: true,
    //   dropdownItems: [
    //     { label: "Frontend Development", href: "/checkout?service=frontend", icon: <Code className="h-4 w-4" /> },
    //     { label: "Full Stack Development", href: "/checkout?service=fullstack", icon: <Database className="h-4 w-4" /> },
    //     { label: "Mobile App Development", href: "/checkout?service=mobile", icon: <Smartphone className="h-4 w-4" /> },
    //     { label: "UI/UX Design", href: "/checkout?service=uiux", icon: <Palette className="h-4 w-4" /> },
    //   ],
    // },
    {
      label: "Contact",
      href: "/contact",
    //   icon: <Phone className="h-4 w-4" />,
    },
  ]

  const isActive = (href: string) => {
    if (href === "/" && router.pathname === "/") return true
    if (href !== "/" && router.pathname.startsWith(href)) return true
    return false
  }

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      className="bg-[#0A192F] border-b border-gray-800"
      maxWidth="xl"
      position="sticky"
    >
      {/* Brand */}
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden text-[#CCD6F6]"
        />
        <NavbarBrand>
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/logo.png" alt="FW Development" width={32} height={32} className="rounded-lg" />
            <div className="flex flex-col">
              <p className="font-bold text-[#CCD6F6] text-lg">FW Development</p>
              {/* <p className="text-xs text-[#6C7994] hidden sm:block">Professional Development Services</p> */}
            </div>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Desktop Navigation */}
      <NavbarContent className="hidden sm:flex gap-10" justify="center">
        {menuItems.map((item) => (
          <NavbarItem key={item.label}>
            <Link
                href={item.href}
                className={`flex items-center gap-2 ${
                  isActive(item.href) ? "text-[#59E2C5]" : "text-[#CCD6F6]"
                } hover:text-[#59E2C5] transition-colors`}
              >
                {/* {item.icon} */}
                {item.label}
              </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      {/* Desktop Actions */}
      {/* <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="mailto:fadjri.w@gmail.com" className="text-[#6C7994] hover:text-[#59E2C5] transition-colors">
            <Mail className="h-4 w-4" />
          </Link>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">
          <Link href="tel:+6285391000900" className="text-[#6C7994] hover:text-[#59E2C5] transition-colors">
            <Phone className="h-4 w-4" />
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            href="/checkout"
            className="bg-[#59E2C5] text-white hover:bg-[#4BC7AA] transition-colors"
            variant="flat"
            size="sm"
            startContent={
              <Badge content={cartItemCount > 0 ? cartItemCount : ""} color="danger" size="sm" isInvisible={cartItemCount === 0}>
                <ShoppingCart className="h-4 w-4" />
              </Badge>
            }
          >
            <span className="hidden sm:inline">Order Now</span>
          </Button>
        </NavbarItem>
      </NavbarContent> */}

      {/* Mobile Menu */}
      <NavbarMenu className="bg-[#0A192F] border-t border-gray-800 pt-6">
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item.label}-${index}`}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 w-full ${
                  isActive(item.href) ? "text-[#59E2C5]" : "text-[#CCD6F6]"
                } hover:text-[#59E2C5] transition-colors font-medium`}
                size="lg"
                onPress={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
          </NavbarMenuItem>
        ))}
        
        {/* Mobile Contact Actions */}
        <NavbarMenuItem>
          <div className="flex flex-col space-y-3 pt-4 border-t border-gray-800">
            <Link
              href="mailto:fadjri.w@gmail.com"
              className="flex items-center gap-3 text-[#6C7994] hover:text-[#59E2C5] transition-colors"
            >
              <Mail className="h-4 w-4" />
              <span className="text-sm">fadjri.w@gmail.com</span>
            </Link>
            <Link
              href="tel:+6285391000900"
              className="flex items-center gap-3 text-[#6C7994] hover:text-[#59E2C5] transition-colors"
            >
              <Phone className="h-4 w-4" />
              <span className="text-sm">+62 853-91000-900</span>
            </Link>
          </div>
        </NavbarMenuItem>

        {/* Mobile CTA */}
        <NavbarMenuItem>
          <Button
            as={Link}
            href="/checkout"
            className="w-full bg-[#59E2C5] text-white hover:bg-[#4BC7AA] transition-colors mt-4"
            size="lg"
            startContent={
              <Badge content={cartItemCount > 0 ? cartItemCount : ""} color="danger" size="sm" isInvisible={cartItemCount === 0}>
                <ShoppingCart className="h-4 w-4" />
              </Badge>
            }
            onPress={() => setIsMenuOpen(false)}
          >
            Start Your Project
          </Button>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  )
}
