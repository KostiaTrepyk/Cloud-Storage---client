import { Link } from "react-router-dom";
import { HOMEROUTE } from "../../../../core/Router/types/routes";

// Icons
import Logo from "../../../../assets/Logo.webp";

const Header = () => {
	return (
		<div className="sticky left-0 top-0 flex h-14 w-full items-center bg-white px-3 shadow-md">
			<Link
				to={HOMEROUTE.path!}
				className="flex items-center gap-1"
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
		</div>
	);
};

export default Header;
