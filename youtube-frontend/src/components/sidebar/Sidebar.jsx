import { useEffect } from "react";
import Logo from "../header/Logo";
import { mainMenu, youMenu, exploreMenu, miscellaneousMenu } from "./SidebarMenu";


const Sidebar = ({ isOpen, onClose }) => {
    // Prevent body scroll when sidebar is open
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
                {/* Sidebar header */}
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

                <div className="h-[calc(100vh-4rem)] overflow-y-auto">
                    {/* Sidebar content */}
                    {
                        // Main menu items
                        mainMenu.map((menu, idx) => {
                            return (
                                <nav className="p-4 space-y-4" key={menu.name || idx}>
                                    <p className="flex items-center space-x-4">{menu.svg} <span className="font-semibold text-base">{menu.name}</span></p>
                                </nav>
                            )
                        })
                    }
                    <div className="border-t my-2"></div>
                    <div className="text-lg text-reguler px-4">You</div>
                    {
                        // You menu items
                        youMenu.map((menu, idx) => {
                            return (
                                <nav className="p-4 space-y-4" key={menu.name || idx}>
                                    <p className="flex items-center space-x-4">{menu.svg} <span className="font-semibold text-base">{menu.name}</span></p>
                                </nav>
                            )
                        })
                    }
                    <div className="border-t my-2"></div>
                    <div className="text-xs text-gray-500 px-4">Explore</div>
                    {
                        // Explore menu items
                        exploreMenu.map((menu, idx) => {
                            return (
                                <nav className="p-4 space-y-4" key={menu.name || idx}>
                                    <p className="flex items-center space-x-4">{menu.svg} <span className="font-semibold text-base">{menu.name}</span></p>
                                </nav>
                            )
                        })
                    }
                </div>

            </div>
        </div>
    );
};

export default Sidebar;
