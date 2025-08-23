import { useEffect } from "react";
import Logo from "../header/Logo";

const Sidebar = ({ isOpen, onClose }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }
        return () => { document.body.style.overflow = "auto"; };
    }, [isOpen]);

    return (
        <div
            className={`fixed inset-0 z-50 transition-opacity ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
        >

            {/* Sidebar drawer */}
            <div
                className={`absolute top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
            >
                <div className="flex h-16 items-center px-4 p-4 border-b">
                    <button
                        onClick={onClose}
                        className="btn btn-circle mr-2 drawer-button p-2 cursor-pointer"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            height="24"
                            viewBox="0 0 24 24"
                            width="24"
                            focusable="false"
                            aria-hidden="true"
                        >
                            <path d="M21 6H3V5h18v1zm0 5H3v1h18v-1zm0 6H3v1h18v-1z"></path>
                        </svg>
                    </button>
                    <Logo />
                </div>

                <nav className="p-4 space-y-4">
                    <a href="/" className="block">Home</a>
                    <a href="/explore" className="block">Explore</a>
                    <a href="/subscriptions" className="block">Subscriptions</a>
                    <a href="/library" className="block">Library</a>
                </nav>
            </div>
        </div>
    );
};

export default Sidebar;
