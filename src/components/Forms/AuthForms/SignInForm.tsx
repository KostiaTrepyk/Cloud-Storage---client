import { FC, FormEvent, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { SIGNUPROUTE } from "core/Router/routes";
import { SignInArg } from "store/authSlice/reducers/signIn";

import Input from "components/UI/Input/Input";
import Button from "components/UI/Buttons/Button/Button";
import LoadIcon from "components/SvgIcons/LoadIcon";

interface Props {
	status?: "uninitialized" | "pending" | "fulfilled" | "rejected" | undefined;
	onSubmit: (formData: SignInArg, e: FormEvent<HTMLFormElement>) => void;
}

const SignInForm: FC<Props> = ({ status, onSubmit }) => {
	const location = useLocation();

	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const isDisabled = status === "pending";

	return (
		<form
			className="relative mx-auto flex w-full max-w-md flex-col gap-2 rounded p-6 shadow-[1px_2px_4px_0px_#bbb]"
			onSubmit={(e) => {
				e.preventDefault();
				onSubmit({ email, password }, e);
			}}
		>
			<div className="mb-2 flex justify-center gap-4 text-center text-3xl font-bold max-sm:text-2xl">
				Sign in
			</div>

			<Input
				label={{ text: "Email" }}
				input={{
					value: email,
					onChange: (e) => setEmail(e.target.value),
					type: "email",
					disabled: isDisabled,
					autoComplete: "email",
					required: true,
				}}
				fullWidth
			/>

			<Input
				label={{ text: "Password" }}
				input={{
					value: password,
					type: "password",
					onChange: (e) => setPassword(e.target.value),
					disabled: isDisabled,
					pattern: "(?=.*d)(?=.*[a-z])(?=.*[A-Z]).{8,}",
					title: "Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters",
					autoComplete: "current-password",
					required: true,
				}}
				fullWidth
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
					disabled={isDisabled}
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
	);
};

export default SignInForm;
