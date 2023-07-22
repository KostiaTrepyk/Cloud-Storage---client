import { Link } from "react-router-dom";
import { HOMEROUTE } from "../../../../../core/Router/types/routes";

// Icons
import Logo from "../../../../../assets/Logo.webp";

const Header = () => {
    return (
        <header className="h-14 flex items-center">
            <Link to={HOMEROUTE.path!} className="flex items-center gap-2">
                <img src={Logo} alt="Logo" className="h-12 w-12 rounded-full"/>
                <b className="text-2xl">Cloud Storage</b>
            </Link>
        </header>
    );
};

export default Header;
