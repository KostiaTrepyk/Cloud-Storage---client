import { FC, FormEvent, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { SIGNINROUTE } from "core/Router/types/routes";
import { useAppSelector } from "hooks/useAppSelector";
import { SignUpArg } from "store/authSlice/reducers/signUp";

import Input from "components/UI/Input";
import Button from "components/UI/Buttons/Button";
import LoadIcon from "components/SvgIcons/LoadIcon";

interface Props {
	onSubmit: (formData: SignUpArg, e: FormEvent<HTMLFormElement>) => void;
}

const SignUpForm: FC<Props> = ({ onSubmit }) => {
	const location = useLocation();

	const [fullName, setFullName] = useState<string>("");
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const status = useAppSelector((state) => state.auth.status);

	return (
		<form
			className="relative mx-auto flex w-full max-w-md flex-col gap-2 rounded p-6 shadow-[1px_2px_4px_0px_#bbb]"
			onSubmit={(e) => {
				onSubmit({ fullName, email, password }, e);
			}}
		>
			<div className="mb-2 flex justify-center gap-4 text-center text-3xl font-bold max-sm:text-2xl">
				Sign up
			</div>

			<Input
				label="Full name"
				value={fullName}
				onChange={(e) => setFullName(e.target.value)}
				type="text"
				disabled={status === "pending"}
				pattern="^([A-Z][a-z]+)\s(\w+)$"
				autoComplete="name"
				required
			/>

			<Input
				label="Email"
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				type="email"
				autoComplete="email"
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
				autoComplete="new-password"
				required
			/>

			<div className="mt-4 flex items-center justify-between">
				<Link
					className="rounded bg-opacity-50 p-2 font-semibold text-rose-600 underline underline-offset-2 transition hover:bg-rose-50 hover:text-rose-700 max-sm:text-sm"
					to={SIGNINROUTE.path! + location.search}
				>
					Already registered?
				</Link>

				<Button
					type="submit"
					disabled={status === "pending"}
					title="Sign up"
					color="rose"
				>
					Sign up
				</Button>
			</div>

			{status === "pending" && (
				<div className="absolute left-1/2 top-1/2 h-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white bg-opacity-50 p-1">
					<LoadIcon spin />
				</div>
			)}
		</form>
	);
};

export default SignUpForm;
