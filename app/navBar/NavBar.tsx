"use client";

import Link from "next/link";
import { FaBug } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { pages, containerStyle, olStyle, getLinkClasses } from "./utils";
import { useSession } from "next-auth/react";
import {
  Avatar,
  Box,
  Container,
  DropdownMenu,
  Flex,
  Text,
} from "@radix-ui/themes";

const NavBar = () => {

  return (
    <nav className={containerStyle}>
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <FaBug />
            </Link>
            <NavLinks />
          </Flex>
          <AuthStatus />
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;

const NavLinks = () => {
  const currentPath = usePathname();

  return (
    <ol className={olStyle}>
    {pages.map((page, index) => (
      <li key={index}>
        <Link
          href={page.link}
          className={getLinkClasses(page.link, currentPath)}
        >
          {page.name}
        </Link>
      </li>
    ))}
  </ol>
  )
}

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return <span>Loading...</span>;

  if (status === "unauthenticated")
    return <Link className="nav-link" href="/api/auth/signin"> Login </Link>;

  return (
    <Box>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session!.user!.image!}
            fallback="?"
            size="2"
            radius="full"
            className="cursor-pointer"
            referrerPolicy="no-referrer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text size="2">{session!.user!.email}</Text>
          </DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href="/api/auth/signout"> Log Out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Box>
  );
};
