import { Link } from "react-router-dom";
import { HOMEROUTE } from "../../../../core/Router/types/routes";

// Icons
import Logo from "../../../../assets/Logo.webp";
import Image from "../../../UI/Image";

const Header = () => {
	return (
		<header className="flex h-12 items-center bg-white px-3">
			<Link
				to={HOMEROUTE.path!}
				className="flex h-8 items-center gap-1"
			>
				<Image
					imgAttrs={{
						src: Logo,
						alt: "Logo",
						className: "rounded-md",
					}}
				/>
				<span className="text-lg font-bold text-neutral-900">
					FileVault
				</span>
			</Link>
		</header>
	);
};

export default Header;
