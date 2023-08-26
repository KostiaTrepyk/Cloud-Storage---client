import { FC, useState } from "react";
import { cloudStorageApi } from "../../../services/CloudStorageApi";
import { getCookieValue } from "../../../helpers/cookie";
import { cookieKeys } from "../../../types/cookie";
import { FileType } from "../../../types/fileData";

import UploadButton from "../../../components/UI/Buttons/UploadButton";
import IconButton from "../../../components/UI/Buttons/IconButton";
import FileActions from "./BarsActions/FileActions";
import SearchActions from "./BarsActions/SearchActions";

import MenuIcon from "../../../components/SvgIcons/MenuIcon";
import DefaultActions from "./BarsActions/DefaultActions";

export type SortValue = "asc" | "desc" | "no";

interface Props {
	checkedFiles: number[];
	filesType: Exclude<FileType, "trash">;
	changeFilesType: (newType: Exclude<FileType, "trash">) => void;
	clearCheckedFiles: () => void;
}

const ToolsBar: FC<Props> = ({
	checkedFiles,
	filesType,
	changeFilesType,
	clearCheckedFiles,
}) => {
	const [sort, setSort] = useState<SortValue>("no");
	const [isSearching, setIsSearching] = useState<boolean>(false);
	const [uploadFile, uploadStatus] = cloudStorageApi.useUploadFileMutation();

	const { data: files } = cloudStorageApi.useGetAllFilesQuery({
		type: filesType,
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
		if (sort === "asc") setSort("desc");
		else if (sort === "desc") setSort("no");
		else setSort("asc");
	}

	return (
		<div className="sticky top-0 z-50 mb-2 flex h-16 w-full items-center gap-2 overflow-x-auto bg-inherit bg-white py-3 sm:gap-3">
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

			{checkedFiles.length ? (
				<FileActions
					files={files}
					checkedFiles={checkedFiles}
					clearCheckedFiles={clearCheckedFiles}
				/>
			) : isSearching ? (
				<SearchActions setIsSearching={setIsSearching} />
			) : (
				<DefaultActions
					filesType={filesType}
					sort={sort}
					setIsSearching={setIsSearching}
					toggleSort={toggleSort}
					changeFilesType={changeFilesType}
				/>
			)}
		</div>
	);
};

export default ToolsBar;
