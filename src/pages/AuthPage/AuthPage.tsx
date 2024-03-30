import { FormEvent, useState } from "react";
import { useLocation } from "react-router-dom";
import { SIGNUPROUTE } from "core/Router/routes";
import { useAppSelector } from "hooks/useAppSelector";
import { useAppDispatch } from "hooks/useAppDispatch";
import { SearchParamsEnum } from "types/searchParamsEnum";
import { SignInArg, signIn } from "store/authSlice/reducers/signIn";
import { SignUpArg, signUp } from "store/authSlice/reducers/signUp";
import { searchParamsToObj } from "helpers/searchParamsToObj";

import SignInForm from "components/Forms/AuthForms/SignInForm";
import SignUpForm from "components/Forms/AuthForms/SignUpForm";
import PageConfig from "../Wrappers/PageConfig";
import LoadIcon from "components/SvgIcons/LoadIcon";

const AuthPage = () => {
	const dispatch = useAppDispatch();
	const location = useLocation();

	const [isSubmited, setIsSubmited] = useState<boolean>(false);
	const isAuth = useAppSelector((state) => state.auth.isAuth);
	const status = useAppSelector((state) => state.auth.status);
	const searchParams = searchParamsToObj(location.search);

	const isRedericting = Boolean(isSubmited && status === "fulfilled");
	const isImmediatelyRedirect = Boolean(
		searchParams[SearchParamsEnum.IMMEDIATELY] &&
			!isSubmited &&
			status === "pending"
	);

	async function signUpHandler(
		formData: SignUpArg,
		e: FormEvent<HTMLFormElement>
	) {
		e.preventDefault();
		setIsSubmited(true);
		await dispatch(signUp(formData));
	}

	async function signInHandler(
		formData: SignInArg,
		e: FormEvent<HTMLFormElement>
	) {
		e.preventDefault();
		setIsSubmited(true);
		await dispatch(signIn(formData));
	}

	return (
		<PageConfig
			redirect={{ when: isRedericting, immediately: { when: isAuth } }}
		>
			<main className="flex grow items-center px-3 pb-[7vh] max-[340px]:px-2">
				{isImmediatelyRedirect ? (
					<div className="flex aspect-square h-12 w-full justify-center text-rose-600">
						<LoadIcon spin />
					</div>
				) : (
					<>
						{location.pathname === SIGNUPROUTE.path ? (
							<SignUpForm onSubmit={signUpHandler} />
						) : (
							<SignInForm onSubmit={signInHandler} />
						)}
					</>
				)}
			</main>
		</PageConfig>
	);
};

export default AuthPage;
