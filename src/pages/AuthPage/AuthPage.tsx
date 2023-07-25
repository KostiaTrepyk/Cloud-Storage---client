import { useAppSelector } from "../../hooks/useAppSelector";
import { usePathname } from "../../hooks/usePathname";
import { SIGNUPROUTE } from "../../core/Router/types/routes";

import Redirect from "../Components/Redirect";
import SignInForm from "../../components/Forms/AuthForms/SignInForm";
import SignUpForm from "../../components/Forms/AuthForms/SignUpForm";

const AuthPage = () => {
	const { current } = usePathname();

	const isAuth = useAppSelector((state) => state.auth.isAuth);

	if (isAuth) return <Redirect />;

	return (
		<main className="flex grow items-center pb-[7vh]">
			{current.pathname === SIGNUPROUTE.path ? (
				<SignUpForm />
			) : (
				<SignInForm />
			)}
		</main>
	);
};

export default AuthPage;
