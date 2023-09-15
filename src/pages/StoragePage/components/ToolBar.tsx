import { FC, useState } from "react";
import { cloudStorageApi } from "../../../services/CloudStorageApi";
import { getCookieValue } from "../../../helpers/cookie";
import { cookieKeys } from "../../../types/cookie";
import { SortValue, FileType, FileData } from "../../../types/fileData";


import DefaultActions from "./BarsActions/DefaultActions";
import UploadButton from "../../../components/UI/Buttons/UploadButton";
import IconButton from "../../../components/UI/Buttons/IconButton";
import FileActions from "./BarsActions/FileActions";
import SearchActions from "./BarsActions/SearchActions";

import MenuIcon from "../../../components/SvgIcons/MenuIcon";

type ToolBarType = "file" | "search" | "default";

interface Props {
	search: string;
	setSearch: React.Dispatch<React.SetStateAction<string>>;
	sort: SortValue;
	setSort: React.Dispatch<React.SetStateAction<SortValue>>;
	filesType: Exclude<FileType, "trash">;
	changeFilesType: (newType: Exclude<FileType, "trash">) => void;
	checkedFiles: FileData[];
	clearCheckedFiles: () => void;
}

const ToolBar: FC<Props> = ({
	search,
	setSearch,
	sort,
	setSort,
	filesType,
	changeFilesType,
	checkedFiles,
	clearCheckedFiles,
}) => {
	const [isSearching, setIsSearching] = useState<boolean>(false);
	const [uploadFile, uploadStatus] = cloudStorageApi.useUploadFileMutation();
	const currentToolBar: ToolBarType = Boolean(checkedFiles.length)
		? "file"
		: isSearching
		? "search"
		: "default";

	const { data } = cloudStorageApi.useGetAllFilesQuery({
		filesType,
		token: getCookieValue(cookieKeys.TOKEN),
	});

	function uploadFileHandler(e: React.ChangeEvent<HTMLInputElement>) {
		if (!e.target.files) return;
		const file = e.target.files[0];
		if (!file) return;

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
			className="sticky top-0 z-50 mb-2 flex h-16 w-full items-center gap-2 overflow-x-auto bg-inherit bg-white py-3 sm:gap-3"
			onSubmit={formSubmitHandler}
		>
			<IconButton
				className="rounded-md"
				color="rose"
				title="menu"
			>
				<MenuIcon />
			</IconButton>

			<UploadButton
				className="sm:mr-2"
				isLoading={uploadStatus.isLoading}
				onUpload={uploadFileHandler}
			/>

			{currentToolBar === "file" && (
				<FileActions
					files={data?.files}
					checkedFiles={checkedFiles}
					clearCheckedFiles={clearCheckedFiles}
				/>
			)}
			{currentToolBar === "search" && (
				<SearchActions
					search={search}
					setSearch={setSearch}
					setIsSearching={setIsSearching}
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
				/>
			)}
		</form>
	);
};

export default ToolBar;
