import { FormEvent, useState } from "react";
import { useAppDispatch } from "../../../hooks/useAppDispatch";
import { SIGNUPROUTE } from "../../../core/Router/types/routes";
import { Link, useLocation } from "react-router-dom";
import { signIn } from "../../../store/authSlice/reducers/signIn";
import { useAppSelector } from "../../../hooks/useAppSelector";
import Input from "../../UI/Input";

const SignInForm = () => {
	const dispatch = useAppDispatch();
	const location = useLocation();

	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const status = useAppSelector((state) => state.auth.status);

	function FormSubmitHandler(e: FormEvent<HTMLFormElement>) {
		e.preventDefault();
		if (email && password) dispatch(signIn({ email, password }));
	}

	return (
		<div className="flex w-full flex-col items-center">
			<form
				className="flex w-full max-w-md flex-col gap-2 rounded p-6 shadow-[2px_2px_4px_0px_#bbb]"
				onSubmit={FormSubmitHandler}
			>
				<div className="mb-2 flex justify-center gap-4 text-center text-3xl font-bold max-sm:text-2xl">
					{status === "idle" && "Sign in"}
					{status === "pending" && "Wait a second please"}
					{status === "rejected" && "Try again"}
					{status === "fulfilled" && "OK :)"}
				</div>

				<Input
					label="Email"
					value={email}
					type="email"
					onChange={(e) => setEmail(e.target.value)}
					disabled={status === "pending"}
					pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
					required
				/>

				<Input
					label="Password"
					value={password}
					type="password"
					onChange={(e) => setPassword(e.target.value)}
					disabled={status === "pending"}
					pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
					title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
					required
				/>

				<div className="mt-4 flex items-center justify-between">
					<Link
						className="rounded bg-opacity-50 p-2 font-semibold text-rose-600 underline underline-offset-2 transition hover:bg-rose-50 hover:text-rose-700 max-sm:text-sm"
						to={SIGNUPROUTE.path! + location.search}
					>
						Create account
					</Link>

					<button
						className="w-20 min-w-fit rounded bg-rose-600 p-2 font-semibold text-white transition hover:bg-rose-700 active:bg-rose-800 disabled:bg-neutral-600"
						type="submit"
						disabled={status === "pending"}
					>
						Sign in
					</button>
				</div>
			</form>
		</div>
	);
};

export default SignInForm;
