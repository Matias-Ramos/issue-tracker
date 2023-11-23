import Link from "next/link";
import { FaBug } from "react-icons/fa";

const NavBar = () => {
  const pages = [
    { name: "Dashboard", link: "/" },
    { name: "Issues", link: "/issues" },
  ];

  return (
    <div className="flex space-x-6 mb-3 items-center px-4 h-14 border-b-2 border-zinc-200 ">
      <Link href="/">
        <FaBug />
      </Link>
      <ol className="flex space-x-6">
        {pages.map((page, index) => (
          <li key={index}>
            <Link href={page.link} className="text-zinc-500 hover:text-zinc-900 transition-colors">{page.name}</Link>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default NavBar;
