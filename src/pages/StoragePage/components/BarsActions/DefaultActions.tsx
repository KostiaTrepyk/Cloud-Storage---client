import { FC } from "react";
import { motion } from "framer-motion";
import { Option } from "../../../../components/UI/Select";
import { FileType } from "../../../../types/fileData";
import { buttonVariants, inputVariants } from "./animations";
import { SortValue } from "../../StoragePage";

import Select from "../../../../components/UI/Select";
import IconButton from "../../../../components/UI/Buttons/IconButton";

import SearchIcon from "../../../../components/SvgIcons/SearchIcon";
import NoSortIcon from "../../../../components/SvgIcons/Sort/NoSortIcon";
import SortAscIcon from "../../../../components/SvgIcons/Sort/SortAscIcon";
import SortDescIcon from "../../../../components/SvgIcons/Sort/SortDescIcon";
import TrashIcon from "../../../../components/SvgIcons/TrashIcon";

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
}

const DefaultActions: FC<Props> = ({
	search,
	filesType,
	sort,
	toggleSort,
	setIsSearching,
	changeFilesType,
}) => {
	return (
		<>
			<MIconButton
				initial="initial"
				animate="reveal"
				variants={buttonVariants}
				custom={0}
				title="Search"
				color={search ? "amber" : "default"}
				onClick={() => setIsSearching(() => true)}
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
			>
				{sort === "asc" && <SortAscIcon />}
				{sort === "desc" && <SortDescIcon />}
				{sort === "no" && <NoSortIcon />}
			</MIconButton>

			<MIconButton
				title="Trash"
				initial="initial"
				animate="reveal"
				variants={buttonVariants}
				custom={2}
			>
				<TrashIcon />
			</MIconButton>

			<MSelect
				className="h-full text-black"
				title="Trash"
				initial="initial"
				animate="reveal"
				variants={inputVariants}
				custom={3}
				options={FilesTypeOptions}
				value={filesType}
				onChange={(option) =>
					changeFilesType((option?.value as any) || filesType)
				}
			/>
		</>
	);
};

export default DefaultActions;
