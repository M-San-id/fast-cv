import { Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { navLinks } from "./Navbar";
import { useTheme } from "../../hooks/ThemeContext";

const supportLinks = [
  {
    name: "Buy me a coffee",
    href: "/",
  },
  {
    name: "Trakteer",
    href: "https://trakteer.id/sans26/tip",
  },
  {
    name: "Saweria",
    href: "/",
  },
];

function Footer() {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";
  return (
    <footer className="bg-neutral-50 dark:bg-zinc-950 text-zinc-800 dark:text-neutral-50 transition-colors duration-500">
      <div className="flex flex-col md:flex-row justify-evenly py-10 md:py-20 gap-10">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="bg-violet-600 rounded-lg p-2">
              <Zap size={24} className="text-white fill-white" />
            </div>
            <h2 className="text-3xl font-bold">
              Fast <span className="text-violet-600">CV</span>
            </h2>
          </div>
          <p>Build your CV in minutes</p>
        </div>
        <div className="flex flex-col gap-3 md:text-center">
          <h3 className="text-2xl font-bold">Menu</h3>
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`relative text-sm font-medium transition-colors group ${isDarkMode ? "text-zinc-400 hover:text-white no-underline" : "text-zinc-500 hover:text-zinc-900 no-underline"}`}
            >
              {link.name}
              <span className="hidden md:block absolute -bottom-1 left-0 w-0 h-0.5 bg-violet-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>
        <div className="flex flex-col gap-3 md:text-center">
          <h3 className="text-2xl font-bold">Support Us</h3>
          {supportLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className={`relative text-sm font-medium transition-colors group ${isDarkMode ? "text-zinc-400 hover:text-white no-underline" : "text-zinc-500 hover:text-zinc-900 no-underline"}`}
            >
              {link.name}
              <span className="hidden md:block absolute -bottom-1 left-0 w-0 h-0.5 bg-violet-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </div>
      </div>
      <div className="bg-neutral-300 dark:bg-zinc-900 text-zinc-900 dark:text-neutral-50 h-30 flex items-center justify-center">
        <div className="flex items-center gap-2">
          © {new Date().getFullYear()}{" "}
          <div className="bg-violet-600 rounded-lg p-1">
            <Zap size={16} className="text-white fill-white" />
          </div>
          <p>
            Fast
            <span className="text-blue-600 dark:text-violet-600">CV</span> All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
