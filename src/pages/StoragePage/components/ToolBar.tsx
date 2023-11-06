import { FC, useState } from "react";
import { twMerge } from "tailwind-merge";
import { cloudStorageApi } from "../../../services/CloudStorageApi";
import { getCookieValue } from "../../../helpers/cookie";
import { cookieKeys } from "../../../types/cookie";
import {
	SortValue,
	FileType,
	FileData,
	FileDataWithSharedWith,
} from "../../../types/fileData";

import DefaultActions from "./BarsActions/DefaultActions";
import UploadButton from "../../../components/UI/Buttons/UploadButton";
import IconButton from "../../../components/UI/Buttons/IconButton";
import FileActions from "./BarsActions/FileActions";
import SearchActions from "./BarsActions/SearchActions";

import MenuIcon from "../../../components/SvgIcons/MenuIcon";

type ToolBarType = "file" | "search" | "default";

interface Props {
	className?: string;
	search: string;
	setSearch: React.Dispatch<React.SetStateAction<string>>;
	sort: SortValue;
	setSort: React.Dispatch<React.SetStateAction<SortValue>>;
	filesType: Exclude<FileType, "trash">;
	changeFilesType: (newType: Exclude<FileType, "trash">) => void;
	checkedFiles: FileData[];
	clearCheckedFiles: () => void;
	files: FileDataWithSharedWith[];

	disabled?: boolean;
}

const ToolBar: FC<Props> = ({
	className,
	search,
	setSearch,
	sort,
	setSort,
	filesType,
	changeFilesType,
	checkedFiles,
	clearCheckedFiles,
	files,

	disabled,
}) => {
	const [isSearching, setIsSearching] = useState<boolean>(false);
	const [uploadFile, uploadStatus] = cloudStorageApi.useUploadFileMutation({
		fixedCacheKey: "1",
	});
	const currentToolBar: ToolBarType = Boolean(checkedFiles.length)
		? "file"
		: isSearching
		? "search"
		: "default";

	function uploadFileHandler(e: React.ChangeEvent<HTMLInputElement>) {
		if (!e.target.files) return;
		const file = e.target.files[0];
		if (!file || file.size > 5242880) return; /* 5MB */

		const formData = new FormData();
		formData.append("file", file);

		uploadFile({ file: formData, token: getCookieValue(cookieKeys.TOKEN) });
	}

	function toggleSort() {
		if (sort === "ASC") setSort("DESC");
		else if (sort === "DESC") setSort("NO");
		else setSort("ASC");
	}

	function formSubmitHandler(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault();

		if (currentToolBar === "search") {
			isSearching && setIsSearching(() => false);
		}
	}

	return (
		<form
			className={twMerge(
				"sticky top-0 z-50 flex h-16 w-full items-center gap-2 overflow-x-auto bg-inherit bg-white py-3 sm:gap-3",
				className
			)}
			onSubmit={formSubmitHandler}
		>
			<IconButton
				className="rounded-md"
				color="rose"
				title="menu"
				disabled={disabled}
			>
				<MenuIcon />
			</IconButton>

			<UploadButton
				className="sm:mr-2"
				isLoading={uploadStatus.isLoading}
				onUpload={uploadFileHandler}
				disabled={disabled}
			/>

			{currentToolBar === "file" && (
				<FileActions
					files={files}
					checkedFiles={checkedFiles}
					clearCheckedFiles={clearCheckedFiles}
					disabled={disabled}
				/>
			)}
			{currentToolBar === "search" && (
				<SearchActions
					search={search}
					setSearch={setSearch}
					setIsSearching={setIsSearching}
					disabled={disabled}
				/>
			)}
			{currentToolBar === "default" && (
				<DefaultActions
					search={search}
					setIsSearching={setIsSearching}
					sort={sort}
					toggleSort={toggleSort}
					filesType={filesType}
					changeFilesType={changeFilesType}
					disabled={disabled}
				/>
			)}
		</form>
	);
};

export default ToolBar;
