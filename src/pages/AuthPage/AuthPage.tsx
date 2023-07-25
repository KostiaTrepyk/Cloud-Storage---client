import { FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { SignInArg, signIn } from "../../store/authSlice/reducers/signIn";
import { SignUpArg, signUp } from "../../store/authSlice/reducers/signUp";
import { searchParamsToObj } from "../../helpers/searchParamsToObj";
import { useAppSelector } from "../../hooks/useAppSelector";
import { HOMEROUTE, SIGNUPROUTE } from "../../core/Router/types/routes";
import { SearchParamsEnum } from "../../types/searchParamsEnum";

import Redirect from "../Components/Redirect";
import SignInForm from "../../components/Forms/AuthForms/SignInForm";
import SignUpForm from "../../components/Forms/AuthForms/SignUpForm";

const AuthPage = () => {
	const dispatch = useAppDispatch();
	const location = useLocation();
	const navigate = useNavigate();

	const searchParams = searchParamsToObj(location.search);

	const isAuth = useAppSelector((state) => state.auth.isAuth);

	async function signUpHandler(
		formData: SignUpArg,
		e: FormEvent<HTMLFormElement>
	) {
		e.preventDefault();
		await dispatch(signUp(formData));
		!searchParams[SearchParamsEnum.REDIRECT] && navigate(HOMEROUTE.path!);
	}

	async function signInHandler(
		formData: SignInArg,
		e: FormEvent<HTMLFormElement>
	) {
		e.preventDefault();
		await dispatch(signIn(formData));
		!searchParams[SearchParamsEnum.REDIRECT] && navigate(HOMEROUTE.path!);
	}

	if (isAuth && searchParams[SearchParamsEnum.REDIRECT]) return <Redirect />;

	return (
		<main className="flex grow items-center pb-[7vh]">
			{location.pathname === SIGNUPROUTE.path ? (
				<SignUpForm onSubmit={signUpHandler} />
			) : (
				<SignInForm onSubmit={signInHandler} />
			)}
		</main>
	);
};

export default AuthPage;
