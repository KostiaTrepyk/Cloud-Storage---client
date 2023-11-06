import { FC, FormEvent, useState } from "react";
import { SIGNUPROUTE } from "../../../core/Router/types/routes";
import { Link, useLocation } from "react-router-dom";
import { useAppSelector } from "../../../hooks/useAppSelector";
import { SignInArg } from "../../../store/authSlice/reducers/signIn";

import Input from "../../UI/Input";
import Button from "../../UI/Buttons/Button";
import LoadIcon from "../../SvgIcons/LoadIcon";

interface Props {
	onSubmit: (formData: SignInArg, e: FormEvent<HTMLFormElement>) => void;
}

const SignInForm: FC<Props> = ({ onSubmit }) => {
	const location = useLocation();

	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const status = useAppSelector((state) => state.auth.status);

	return (
		<div className="flex w-full flex-col items-center">
			<form
				className="relative flex w-full max-w-md flex-col gap-2 rounded p-6 shadow-[1px_2px_4px_0px_#bbb]"
				onSubmit={(e) => {
					onSubmit({ email, password }, e);
				}}
			
			>
				<div className="mb-2 flex justify-center gap-4 text-center text-3xl font-bold max-sm:text-2xl">
					Sign in
				</div>

				<Input
					label="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					disabled={status === "pending"}
					pattern="[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,}$"
					autoComplete="email"
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
					autoComplete="current-password"
					required
				/>

				<div className="mt-4 flex h-10 items-center justify-between">
					<Link
						className="rounded bg-opacity-50 p-2 font-semibold text-rose-600 underline underline-offset-2 transition hover:bg-rose-50 hover:text-rose-700 max-sm:text-sm"
						to={SIGNUPROUTE.path! + location.search}
					>
						Create account
					</Link>

					<Button
						type="submit"
						disabled={status === "pending"}
						title="Sign in"
						color="rose"
					>
						Sign in
					</Button>
				</div>

				{status === "pending" && (
					<div className="absolute left-1/2 top-1/2 h-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white bg-opacity-50 p-1">
						<LoadIcon spin />
					</div>
				)}
			</form>
		</div>
	);
};

export default SignInForm;
