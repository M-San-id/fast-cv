import { Menu, X } from "lucide-react"
import { Link } from "react-router-dom"
import { useState } from "react"

const Navbar = () => {
    const [open, setOpen] = useState(false)     
    return (
    <div className="flex justify-between px-5 py-3">
        <h2 className="text-xl font-bold">Fast CV</h2>

        <div className="md:hidden">
            <button onClick={() => setOpen(!open)}>
                <span className="text-black">{!open ? <Menu /> : <X />} </span>
                <div className={`absolute top-12 right-0 bg-white p-5 shadow-2xl flex flex-col z-50 w-64 h-screen transition-all duration-300 ease-in-out ${open ? "translate-x-0 opacity-100" : "translate-x-full opacity-0 pointer-events-none"}`}>
                    <Link to="/" className="block py-2 hover:bg-gray-100">Home</Link>
                    <Link to="/builder" className="block py-2 hover:bg-gray-100">Builder</Link>
                    <Link to="/templates" className="block py-2 hover:bg-gray-100">Templates</Link>
                </div>
            </button>
        </div>
        <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="group relative py-1">
                <span className="text-black group-hover:text-black transition-colors duration-300">Home</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/builder" className="group relative py-1">
                <span className="text-black group-hover:text-black transition-colors duration-300">Builder</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
            </Link>
            <Link to="/templates" className="group relative py-1">
                <span className="text-black group-hover:text-black transition-colors duration-300">Templates</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full"></span>
            </Link>
        </div>
    </div>
  )
}

export default Navbar