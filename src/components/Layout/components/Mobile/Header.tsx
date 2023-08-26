import { Link } from "react-router-dom";
import { HOMEROUTE } from "../../../../core/Router/types/routes";

// Icons
import Logo from "../../../../assets/Logo.webp";

const Header = () => {
	return (
		<header className="sticky left-0 top-0 z-50 flex h-12 w-full items-center bg-white px-3">
			<Link
				to={HOMEROUTE.path!}
				className="flex items-center gap-1"
			>
				<img
					src={Logo}
					alt="Logo"
					className="aspect-square h-8 rounded-full"
				/>
				<span className="text-lg font-bold text-neutral-900">
					FileVault
				</span>
			</Link>
		</header>
	);
};

export default Header;
