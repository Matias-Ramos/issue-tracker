import Link from "next/link";
import { FaBug } from "react-icons/fa";

const NavBar = () => {
  const pages = [
    { name: "Dashboard", link: "/" },
    { name: "Issues", link: "/issues" },
  ];
  const containerStyle =
    "flex space-x-6 mb-3 items-center px-4 h-14 border-b-2 border-zinc-200";
  const olStyle = "flex space-x-6";
  const linkStyle = "text-zinc-500 hover:text-zinc-900 transition-colors";

  return (
    <div className={containerStyle}>
      <Link href="/">
        <FaBug />
      </Link>
      <ol className={olStyle}>
        {pages.map((page, index) => (
          <li key={index}>
            <Link href={page.link} className={linkStyle}>
              {page.name}
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default NavBar;
