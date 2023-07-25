import { Link, useLocation } from "react-router-dom";
import { HOMEROUTE } from "../../core/Router/types/routes";

const PageNotFound = () => {
	const { pathname } = useLocation();

	return (
		<main className="flex grow items-center justify-center pb-[7vh] text-center">
			<div className="flex flex-col gap-1">
				<h1 className="text-3xl max-sm:text-2xl">
					<b>Page</b> {pathname} <b>not found.</b>
				</h1>
				<span className="text-2xl max-sm:text-lg">
					Get back to{" "}
					<Link
						to={HOMEROUTE.path!}
						className="font-semibold text-rose-700 underline"
					>
						home page
					</Link>
					!
				</span>
			</div>
		</main>
	);
};

export default PageNotFound;
