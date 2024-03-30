import { useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteAllCookies } from "helpers/cookie";
import { HOMEROUTE } from "core/Router/routes";

const ErrorPage = () => {
	useEffect(() => {
		deleteAllCookies();
		localStorage.clear();
	}, []);

	return (
		<main className="flex h-screen items-center justify-center pb-[7vh] text-center">
			<div className="flex flex-col gap-2">
				<h1 className="text-3xl max-sm:text-2xl">
					<b>Oops! Something went wrong...</b>
				</h1>
				<span className="text-2xl max-sm:text-lg">
					Get back to{" "}
					<Link
						to={HOMEROUTE.path!}
						className="font-semibold text-rose-700 underline"
					>
						home
					</Link>
					!
				</span>
			</div>
		</main>
	);
};

export default ErrorPage;
