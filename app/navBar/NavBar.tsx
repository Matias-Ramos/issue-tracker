"use client";

import Link from "next/link";
import { FaBug } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { pages, containerStyle, olStyle, getLinkClasses } from './utils';
import { useSession } from "next-auth/react";
import { Box, Container, Flex } from "@radix-ui/themes";

const NavBar = () => {
  const currentPath = usePathname();
  const { status, data: session } = useSession();

  return (
    <nav className={containerStyle}>
      <Container>
        <Flex justify="between">
          <Flex align="center" gap="3">
            <Link href="/">
              <FaBug />
            </Link>
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
          </Flex>
          <Box>
            {status === "authenticated" && (
              <Link href="/api/auth/signout"> Log Out</Link>
            )}
            {status === "loading" && <span>Loading...</span>}
            {status === "unauthenticated" && (
              <Link href="/api/auth/signin"> Login </Link>
            )}
          </Box>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
