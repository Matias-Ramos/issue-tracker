import classNames from "classnames";

/******** */
// Pages content
export const pages = [
  { name: "Dashboard", link: "/" },
  { name: "Issues", link: "/issues/list" },
];

/******** */
// Styling
export const containerStyle =
  "mb-3 px-4 py-3 border-b-2 border-zinc-200";
export const olStyle = "flex space-x-6";
export const getLinkClasses = (pageLink: string, currentPath: string) => {
  return classNames("text-zinc-500 hover:text-zinc-800 transition-colors", {
    "text-zinc-900": pageLink === currentPath,
  });
};
