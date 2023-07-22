import { Link } from "react-router-dom";
import { HOMEROUTE } from "../../../../../core/Router/types/routes";

// Icons
import Logo from "../../../../../assets/Logo.webp";

const Header = () => {
    return (
        <div className="sticky top-0 bg-white pb-3">
            <header className="h-14 flex items-center">
                <Link to={HOMEROUTE.path!} className="flex items-center gap-2">
                    <img src={Logo} alt="Logo" className="h-12 w-12 rounded-full" />
                    <b className="text-2xl">Cloud Storage</b>
                </Link>
            </header>

            {/* Divider */}
            <div className="w-3/4 mx-auto border-rose-900 border-t-2" />
        </div>
    );
};

export default Header;
