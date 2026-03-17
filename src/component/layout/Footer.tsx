import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/ThemeContext";

function Footer() {
  const { theme } = useTheme();
  const isDarkMode = theme === "dark";

  return (
    <footer
      className={`transition-colors duration-300 border-t ${isDarkMode ? "bg-zinc-950 border-zinc-800" : "bg-neutral-50 border-zinc-200"}`}
    >
      <div className="flex justify-between p-5 md:justify-evenly shadow-[0_0_10px_rgba(0,0,0,0.05)]">
        <div>
          <h2 className="text-2xl font-bold bg-linear-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent drop-shadow-sm">
            Fast CV
          </h2>
          <p className={isDarkMode ? "text-zinc-400" : "text-zinc-500"}>
            Build your CV in minutes
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h2
            className={`font-bold text-center ${isDarkMode ? "text-neutral-50" : "text-zinc-900"}`}
          >
            Menu
          </h2>
          <div className="flex flex-col gap-2 text-center">
            <Link to="/" className="group relative py-1 inline-block">
              <span
                className={`transition-colors duration-300 ${isDarkMode ? "text-zinc-400 group-hover:text-violet-400" : "text-zinc-600 group-hover:text-violet-500"}`}
              >
                Home
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-violet-500 to-cyan-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </Link>
            <Link to="/builder" className="group relative py-1 inline-block">
              <span
                className={`transition-colors duration-300 ${isDarkMode ? "text-zinc-400 group-hover:text-violet-400" : "text-zinc-600 group-hover:text-violet-500"}`}
              >
                Builder
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-violet-500 to-cyan-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </Link>
            <Link to="/templates" className="group relative py-1 inline-block">
              <span
                className={`transition-colors duration-300 ${isDarkMode ? "text-zinc-400 group-hover:text-violet-400" : "text-zinc-600 group-hover:text-violet-500"}`}
              >
                Templates
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-violet-500 to-cyan-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h2
            className={`font-bold text-center ${isDarkMode ? "text-neutral-50" : "text-zinc-900"}`}
          >
            Donate
          </h2>
          <div className="flex flex-col gap-2 text-center">
            <Link to="/" className="group relative py-1 inline-block">
              <span
                className={`transition-colors duration-300 ${isDarkMode ? "text-zinc-400 group-hover:text-cyan-400" : "text-zinc-600 group-hover:text-cyan-500"}`}
              >
                Buy me a coffee
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-cyan-500 to-violet-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </Link>
            <Link to="/" className="group relative py-1 inline-block">
              <span
                className={`transition-colors duration-300 ${isDarkMode ? "text-zinc-400 group-hover:text-cyan-400" : "text-zinc-600 group-hover:text-cyan-500"}`}
              >
                Trakteer
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-cyan-500 to-violet-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </Link>
            <Link to="/" className="group relative py-1 inline-block">
              <span
                className={`transition-colors duration-300 ${isDarkMode ? "text-zinc-400 group-hover:text-cyan-400" : "text-zinc-600 group-hover:text-cyan-500"}`}
              >
                Saweria
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-cyan-500 to-violet-500 transition-all duration-300 group-hover:w-full rounded-full"></span>
            </Link>
          </div>
        </div>
      </div>
      <div
        className={`mt-10 h-20 flex items-center justify-center border-t transition-colors ${isDarkMode ? "bg-zinc-900/60 backdrop-blur-lg border-zinc-800 text-zinc-400" : "bg-white/70 backdrop-blur-md border-zinc-200 text-zinc-500"}`}
      >
        <p>© {new Date().getFullYear()} Fast CV. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
