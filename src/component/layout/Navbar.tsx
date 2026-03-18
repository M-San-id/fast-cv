import { ChevronRight, Menu, Moon, Sun, X, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTheme } from "../../hooks/ThemeContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isDarkMode = theme === "dark";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Templates", href: "/templates" },
    { name: "AI Review", href: "/ai-review" },
  ];

  return (
    <div
      className={`transition-colors duration-500 ${theme === "dark" ? "bg-zinc-950 text-neutral-50" : "bg-neutral-50 text-zinc-950"}`}
    >
      {/* Background Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div
          className={`absolute top-[-10%] left-[-10%] w-[40%] h-[40%] blur-[120px] rounded-full transition-opacity duration-1000 ${isDarkMode ? "bg-violet-500/20 opacity-100" : "bg-violet-500/10 opacity-50"}`}
        ></div>
        <div
          className={`absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] blur-[120px] rounded-full transition-opacity duration-1000 ${isDarkMode ? "bg-cyan-500/10 opacity-100" : "bg-cyan-500/5 opacity-50"}`}
        ></div>
      </div>

      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${
          scrolled
            ? isDarkMode
              ? "bg-zinc-900/60 backdrop-blur-lg border-zinc-800 py-3"
              : "bg-white/70 backdrop-blur-md border-zinc-200 py-3"
            : "bg-transparent border-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          {/* Logo Brand: FASTCV */}
          <Link
            to="/"
            className="flex items-center gap-2 group cursor-pointer no-underline"
          >
            <div className="p-2 bg-violet-500 rounded-lg group-hover:shadow-[0_0_15px_rgba(139,92,246,0.6)] transition-all">
              <Zap size={24} className="text-white fill-white" />
            </div>
            <span
              className={`text-xl font-bold tracking-tighter ${isDarkMode ? "text-white" : "text-zinc-900"}`}
            >
              FAST<span className="text-violet-500">CV</span>
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className={`relative text-sm font-medium transition-colors group ${isDarkMode ? "text-zinc-400 hover:text-white" : "text-zinc-500 hover:text-zinc-900"}`}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}

            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-colors ${isDarkMode ? "hover:bg-zinc-800 text-zinc-400" : "hover:bg-zinc-200 text-zinc-600"}`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <a href="https://trakteer.id/sans26/tip" target="_blank">
              <button className="px-5 py-2 rounded-full bg-violet-500 hover:bg-violet-600 text-white text-sm font-semibold transition-all hover:shadow-[0_0_20px_rgba(139,92,246,0.4)] active:scale-95">
                Trakteer
              </button>
            </a>
          </div>

          {/* Mobile Actions */}
          <div className="lg:hidden flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full ${isDarkMode ? "text-zinc-400" : "text-zinc-600"}`}
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`${isDarkMode ? "text-zinc-400" : "text-zinc-600"} hover:text-violet-500 p-2 transition-colors`}
            >
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 top-[64px] z-40 lg:hidden bg-neutral-50/70 dark:bg-zinc-950/70 backdrop-blur-md transition-all duration-500 ease-in-out overflow-y-auto min-h-[calc(100vh-64px)] ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <div className="flex flex-col p-8 gap-6">
          {navLinks.map((link, index) => (
            <Link
              key={link.name}
              to={link.href}
              style={{ transitionDelay: `${index * 50}ms` }}
              className={`flex justify-between items-center text-sm font-semibold border-b pb-4 transition-all no-underline ${
                isOpen
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-10 opacity-0"
              } ${isDarkMode ? "border-zinc-800 text-neutral-50" : "border-zinc-200 text-zinc-900"}`}
              onClick={() => setIsOpen(false)}
            >
              <span className="hover:text-violet-500 transition-colors">
                {link.name}
              </span>
              <ChevronRight
                className={isDarkMode ? "text-zinc-600" : "text-zinc-300"}
              />
            </Link>
          ))}
          <a href="https://trakteer.id/sans26/tip">
            <button className="mt-4 w-full py-4 rounded-2xl bg-linear-to-r from-violet-600 to-cyan-600 text-white font-bold text-lg shadow-lg">
              Trakteer
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
