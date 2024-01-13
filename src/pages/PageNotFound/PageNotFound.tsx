import { Link } from "react-router-dom";
import { HOMEROUTE } from "core/Router/types/routes";

const PageNotFound = () => {
	return (
		<main className="flex grow items-center justify-center pb-[7vh] text-center">
			<div className="flex flex-col gap-1 sm:gap-2">
				<h1 className="text-xl font-bold sm:text-3xl">
					Page not found.
				</h1>
				<span className="text-xl sm:text-3xl">
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
