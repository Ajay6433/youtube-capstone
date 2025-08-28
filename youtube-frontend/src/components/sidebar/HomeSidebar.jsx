import { mainMenu } from "./SidebarMenu";
import Logo from "../header/Logo";
import { Link, useLocation } from "react-router-dom";

export default function HomeSidebar() {
	const location = useLocation();
	// Only show on homepage
	if (location.pathname !== "/") return null;

	return (
		
				<div className="hidden md:flex fixed top-16 left-0 h-full w-20 flex flex-col items-center p-4 z-40">
                    {mainMenu.map((item) => (
					<Link
						to={item.name === "Home" ? "/" : `/${item.name.toLowerCase()}`}
						key={item.name}
						className="flex flex-col items-center text-xs rounded-lg py-2 w-full transition"
					>
						<span className="mb-1">{item.svg}</span>
						<span>{item.name}</span>
					</Link>
				))}
                </div>
	);
}
