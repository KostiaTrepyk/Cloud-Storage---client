import { FC } from "react";
import { motion } from "framer-motion";
import Select, { Option } from "../../../../components/UI/Select";
import { buttonVariants, inputVariants } from "./animations";

import IconButton from "../../../../components/UI/Buttons/IconButton";

import SearchIcon from "../../../../components/SvgIcons/SearchIcon";
import NoSortIcon from "../../../../components/SvgIcons/Sort/NoSortIcon";
import SortAscIcon from "../../../../components/SvgIcons/Sort/SortAscIcon";
import SortDescIcon from "../../../../components/SvgIcons/Sort/SortDescIcon";
import TrashIcon from "../../../../components/SvgIcons/TrashIcon";
import { FileType, SortValue } from "../../../../types/fileData";

/* Framer components */
const MIconButton = motion(IconButton);
const MSelect = motion(Select);

const FilesTypeOptions: Option<Exclude<FileType, "trash">>[] = [
	{
		id: 0,
		value: "all",
		label: "All",
	},
	{
		id: 1,
		value: "photos",
		label: "Photos",
	},
	{
		id: 2,
		value: "applications",
		label: "Applications",
	},
];

interface Props {
	search: string;
	filesType: Exclude<FileType, "trash">;
	sort: SortValue;
	toggleSort: () => void;
	setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
	changeFilesType: (newType: Exclude<FileType, "trash">) => void;

	disabled?: boolean
}

const DefaultActions: FC<Props> = ({
	search,
	filesType,
	sort,
	toggleSort,
	setIsSearching,
	changeFilesType,

	disabled
}) => {
	return (
		<>
			<MIconButton
				color={search ? "amber" : "default"}
				initial="initial"
				animate="reveal"
				variants={buttonVariants}
				custom={0}
				title="Search"
				onClick={() => setIsSearching(() => true)}
				disabled={disabled}
			>
				<SearchIcon />
			</MIconButton>

			<MIconButton
				initial="initial"
				animate="reveal"
				variants={buttonVariants}
				custom={1}
				title="Sort"
				onClick={toggleSort}
				disabled={disabled}
			>
				{sort === "ASC" && <SortAscIcon />}
				{sort === "DESC" && <SortDescIcon />}
				{sort === "NO" && <NoSortIcon />}
			</MIconButton>

			<MIconButton
				initial="initial"
				animate="reveal"
				variants={buttonVariants}
				custom={2}
				title="Trash"
				disabled={disabled}
			>
				<TrashIcon />
			</MIconButton>

			<MSelect
				className="h-full text-black"
				initial="initial"
				animate="reveal"
				variants={inputVariants}
				custom={3}
				title="File type"
				options={FilesTypeOptions}
				value={filesType}
				onChange={(option) =>
					changeFilesType((option?.value as any) || filesType)
				}
				disabled={disabled}
			/>
		</>
	);
};

export default DefaultActions;
