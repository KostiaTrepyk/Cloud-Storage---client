import { Link } from "react-router-dom";
import { HOMEROUTE } from "../../../../../core/Router/types/routes";

// Icons
import Logo from "../../../../../assets/Logo.webp";

const Header = () => {
	return (
		<header className="fixed top-0 z-50 flex h-14 w-full items-center from-slate-50 to-slate-50 bg-gradient-to-r via-white px-4 py-1">
			<Link
				to={HOMEROUTE.path!}
				className="flex items-center gap-1"
				>
				<img
					src={Logo}
					alt="Logo"
					className="h-9 aspect-square rounded-full"
					/>
				<span className="text-lg font-bold text-neutral-900">
					Cloud Storage
				</span>
			</Link>
		</header>
	);
};

export default Header;
