import { Link } from "react-router-dom";
import { HOMEROUTE } from "../../../../../core/Router/types/routes";

// Icons
import Logo from "../../../../../assets/Logo.webp";

const Header = () => {
	return (
		<header className="sticky top-0 flex h-14 items-center bg-white px-6 py-1 shadow">
			<Link
				to={HOMEROUTE.path!}
				className="flex items-center gap-2"
			>
				<img
					src={Logo}
					alt="Logo"
					className="h-12 w-12 rounded-full"
				/>
				<span className="text-2xl font-bold text-neutral-900">
					Cloud Storage
				</span>
			</Link>
		</header>
	);
};

export default Header;
