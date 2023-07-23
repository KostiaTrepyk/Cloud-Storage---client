import { Link } from "react-router-dom";
import { HOMEROUTE } from "../../../../core/Router/types/routes";

// Icons
import Logo from "../../../../assets/Logo.webp";

const Header = () => {
    return (
        <div className="h-14 w-full px-3 flex items-center sticky top-0 left-0 bg-white shadow-md">
            <Link to={HOMEROUTE.path!} className="flex items-center gap-1">
                <img src={Logo} alt="Logo" className="h-12 w-12 rounded-full" />
                <b className="text-2xl">Cloud Storage</b>
            </Link>
        </div>
    );
};

export default Header;
