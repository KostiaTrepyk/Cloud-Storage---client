import { useState } from "react";
import { QueryStatus } from "@reduxjs/toolkit/dist/query";

import BackIcon from "components/SvgIcons/BackIcon";
import RenameIcon from "components/SvgIcons/RenameIcon";
import IconButton from "components/UI/Buttons/IconButton/IconButton";

interface RenameFormProps {
	name: string;
	back: () => void;
	rename: (newName: string) => void;
	status: keyof typeof QueryStatus;
}

const RenameForm: React.FC<RenameFormProps> = ({
	name,
	back,
	rename,
	status,
}) => {
	const [inp, setInp] = useState<string>(name);

	return (
		<form className="flex">
			<IconButton
				className="h-8 w-8 rounded-none rounded-l border border-r-0"
				variant="contained"
				color="neutral"
				type="button"
				onClick={back}
			>
				<BackIcon />
			</IconButton>

			<input
				className="h-8 w-32 rounded-none border-x-0 border-y bg-neutral-500 px-2 text-white hover:bg-neutral-500 focus:bg-neutral-500"
				type="text"
				value={inp}
				onChange={(e) => setInp(e.target.value)}
			/>

			<IconButton
				className="h-8 w-8 rounded-none rounded-r border border-l-0 hover:bg-yellow-600"
				variant="contained"
				color="neutral"
				type="submit"
				onClick={() => rename(inp)}
				status={status}
			>
				<RenameIcon />
			</IconButton>
		</form>
	);
};

export default RenameForm;