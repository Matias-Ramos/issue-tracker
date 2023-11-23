"use client";

import Link from "next/link";
import { FaBug } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { pages, containerStyle, olStyle, getLinkClasses } from './utils';

const NavBar = () => {
  const currentPath = usePathname();

  return (
    <div className={containerStyle}>
      <Link href="/">
        <FaBug />
      </Link>
      <ol className={olStyle}>
        {pages.map((page, index) => (
          <li key={index}>
            <Link href={page.link} className={getLinkClasses(page.link, currentPath)}>
              {page.name}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default NavBar;
