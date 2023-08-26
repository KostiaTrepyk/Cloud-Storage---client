import { FC } from "react";
import { motion } from "framer-motion";
import { buttonVariants, inputVariants } from "./animations";

import IconButton from "../../../../components/UI/Buttons/IconButton";
import Input from "../../../../components/UI/Input";

import CloseIcon from "../../../../components/SvgIcons/CloseIcon";

/* Framer components */
const MIconButton = motion(IconButton);
const MInput = motion(Input);

interface Props {
	setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchActions: FC<Props> = ({ setIsSearching }) => {
	return (
		<>
			<MIconButton
				initial="initial"
				animate="reveal"
				variants={buttonVariants}
				custom={0}
				title="Close"
				onClick={() => setIsSearching(() => false)}
			>
				<CloseIcon />
			</MIconButton>

			<MInput
				initial="initial"
				animate="reveal"
				variants={inputVariants}
				custom={1}
				labelClassName="max-w-xl h-full sm:max-w-[15rem]"
				placeholder="Search..."
			/>
		</>
	);
};

export default SearchActions;
