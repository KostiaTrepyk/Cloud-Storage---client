import { FC } from "react";
import { motion } from "framer-motion";
import { buttonVariants, inputVariants } from "./animations";

import IconButton from "../../../../components/UI/Buttons/IconButton";
import Input from "../../../../components/UI/Input";

import BackIcon from "../../../../components/SvgIcons/BackIcon";

/* Framer components */
const MIconButton = motion(IconButton);
const MInput = motion(Input);

interface Props {
	search: string;
	setSearch: React.Dispatch<React.SetStateAction<string>>;
	setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;

	disabled?: boolean;
}

const SearchActions: FC<Props> = ({
	search,
	setSearch,
	setIsSearching,
	disabled,
}) => {
	return (
		<>
			<MIconButton
				initial="initial"
				animate="reveal"
				variants={buttonVariants}
				custom={0}
				title="Back"
				onClick={() => setIsSearching(() => false)}
				disabled={disabled}
			>
				<BackIcon />
			</MIconButton>

			<MInput
				initial="initial"
				animate="reveal"
				variants={inputVariants}
				custom={2}
				labelClassName="max-w-xl h-full sm:max-w-[15rem] min-w-[9rem]"
				placeholder="Search..."
				type="search"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				autoFocus
			/>
		</>
	);
};

export default SearchActions;
