import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-neutral-50 dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800 transition-colors duration-300">
      <div className="flex justify-between p-5 md:justify-evenly">
        <div>
          <h2 className="text-2xl font-bold bg-linear-to-r from-violet-500 to-cyan-500 bg-clip-text text-transparent">
            Fast CV
          </h2>
          <p className="text-zinc-500 dark:text-zinc-400">
            Build your CV in minutes
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-center text-zinc-900 dark:text-neutral-50">
            Menu
          </h2>
          <div className="flex flex-col gap-2 text-center">
            <Link to="/" className="group relative py-1">
              <span className="text-zinc-600 dark:text-zinc-400 group-hover:text-violet-500 dark:group-hover:text-violet-400 transition-colors duration-300">
                Home
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-violet-500 to-cyan-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/builder" className="group relative py-1">
              <span className="text-zinc-600 dark:text-zinc-400 group-hover:text-violet-500 dark:group-hover:text-violet-400 transition-colors duration-300">
                Builder
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-violet-500 to-cyan-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/templates" className="group relative py-1">
              <span className="text-zinc-600 dark:text-zinc-400 group-hover:text-violet-500 dark:group-hover:text-violet-400 transition-colors duration-300">
                Templates
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-violet-500 to-cyan-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-center text-zinc-900 dark:text-neutral-50">
            Donate
          </h2>
          <div className="flex flex-col gap-2 text-center">
            <Link to="/" className="group relative py-1">
              <span className="text-zinc-600 dark:text-zinc-400 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors duration-300">
                Buy me a coffee
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-cyan-500 to-violet-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/" className="group relative py-1">
              <span className="text-zinc-600 dark:text-zinc-400 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors duration-300">
                Trakteer
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-cyan-500 to-violet-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/" className="group relative py-1">
              <span className="text-zinc-600 dark:text-zinc-400 group-hover:text-cyan-500 dark:group-hover:text-cyan-400 transition-colors duration-300">
                Saweria
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-linear-to-r from-cyan-500 to-violet-500 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>
        </div>
      </div>
      <div className="mt-10 bg-white/70 backdrop-blur-md dark:bg-zinc-900/60 dark:backdrop-blur-lg border-t border-zinc-200 dark:border-zinc-800 h-20 flex items-center justify-center">
        <p className="text-zinc-500 dark:text-zinc-400">
          © {new Date().getFullYear()} Fast CV. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
