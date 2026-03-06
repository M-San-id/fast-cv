import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-100 ">
      <div className="flex justify-between p-5">
        <div>
          <h2 className="text-2xl font-bold">Fast CV</h2>
          <p className="text-gray-700">Build your CV in minutes</p>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-center">Menu</h2>
          <div className="flex flex-col gap-2 text-center">
            <Link to="/" className="group relative py-1">
              <span className="text-black group-hover:text-black transition-colors duration-300">
                Home
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/builder" className="group relative py-1">
              <span className="text-black group-hover:text-black transition-colors duration-300">
                Builder
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/templates" className="group relative py-1">
              <span className="text-black group-hover:text-black transition-colors duration-300">
                Templates
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="font-bold text-center">Donate</h2>
          <div className="flex flex-col gap-2 text-center">
            <Link to="/" className="group relative py-1">
              <span className="text-black group-hover:text-black transition-colors duration-300">
                Buy me a coffee
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/" className="group relative py-1">
              <span className="text-black group-hover:text-black transition-colors duration-300">
                Trakteer
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/" className="group relative py-1">
              <span className="text-black group-hover:text-black transition-colors duration-300">
                Saweria
              </span>
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>
        </div>
      </div>
      <p className="text-center text-gray-700 mt-10 bg-gray-300 h-20 flex items-center justify-center">
        © {new Date().getFullYear()} Fast CV. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
