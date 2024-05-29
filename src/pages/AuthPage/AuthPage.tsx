import { FormEvent } from "react";
import { useLocation } from "react-router-dom";
import { SIGNINROUTE, SIGNUPROUTE } from "core/Router/routes";
import { LoginParams, RegistrationParams, authApi } from "services/authApi";
import { searchParamsToObj } from "helpers/searchParamsToObj";
import { SearchParamsEnum } from "types/searchParamsEnum";

import PageConfig from "../Wrappers/PageConfig";
import SignInForm from "components/Forms/AuthForms/SignInForm";
import SignUpForm from "components/Forms/AuthForms/SignUpForm";
import LoadIcon from "components/SvgIcons/LoadIcon";
import { getCookieValue } from "helpers/cookie";
import { cookieKeys } from "types/cookie";

const AuthPage = () => {
	const location = useLocation();

	const searchParams = searchParamsToObj(location.search);
	const token = getCookieValue(cookieKeys.TOKEN)

	const [login, loginData] = authApi.useLoginMutation();
	const [registration, registrationData] = authApi.useRegistrationMutation();
	const getMeData = authApi.useGetMeQuery({}, {skip: !token});

	let isFormSubmited: boolean =
		!loginData.isUninitialized || !registrationData.isUninitialized;

	const isRedericting = Boolean(isFormSubmited && getMeData.isSuccess);

	const showOnlyLoader = Boolean(
		searchParams[SearchParamsEnum.IMMEDIATELY] &&
			!isFormSubmited &&
			getMeData.isLoading &&
			loginData.isLoading &&
			registrationData.isLoading
	);

	const isLoading =
		loginData.isLoading ||
		registrationData.isLoading ||
		getMeData.isFetching;

	async function signUpHandler(
		formData: RegistrationParams,
		e: FormEvent<HTMLFormElement>
	) {
		e.preventDefault();
		await registration(formData);
	}

	async function signInHandler(
		formData: LoginParams,
		e: FormEvent<HTMLFormElement>
	) {
		e.preventDefault();
		await login(formData);
	}

	return (
		<PageConfig
			redirect={{
				when: isRedericting,
				immediately: { when: getMeData.isSuccess },
			}}
		>
			<main className="flex grow items-center px-3 pb-[7vh] max-[340px]:px-2">
				{showOnlyLoader ? (
					<div className="flex aspect-square h-12 w-full justify-center text-rose-600">
						<LoadIcon spin />
					</div>
				) : (
					<>
						{location.pathname === SIGNUPROUTE.path ? (
							<SignUpForm
								onSubmit={signUpHandler}
								status={isLoading ? "pending" : "uninitialized"}
							/>
						) : location.pathname === SIGNINROUTE.path ? (
							<SignInForm
								onSubmit={signInHandler}
								status={isLoading ? "pending" : "uninitialized"}
							/>
						) : (
							<SignInForm
								onSubmit={signInHandler}
								status={isLoading ? "pending" : "uninitialized"}
							/>
						)}
					</>
				)}
			</main>
		</PageConfig>
	);
};

export default AuthPage;
