import { useState } from "react";
import { getCookieValue } from "../../helpers/cookie";
import { cloudStorageApi } from "../../services/CloudStorageApi";
import { FileType } from "../../types/fileData";
import { cookieKeys } from "../../types/cookie";

import Private from "../Wrappers/Private";
import FilesList from "../../components/Lists/FilesList/FilesList";
import ToolsBar from "./components/ToolsBar";

const StoragePage = () => {
	const [filesType, setFilesType] =
		useState<Exclude<FileType, "trash">>("all");
	const [checkedFiles, setCheckedFiles] = useState<number[]>([]);

	const { data: files, isLoading } = cloudStorageApi.useGetAllFilesQuery({
		type: filesType,
		token: getCookieValue(cookieKeys.TOKEN),
	});

	function changeFilesType(newType: Exclude<FileType, "trash">) {
		setFilesType(newType);
	}

	function clearCheckedFiles() {
		setCheckedFiles([]);
	}

	return (
		<main className="relative grow bg-inherit px-2 pb-2">
			<ToolsBar
				checkedFiles={checkedFiles}
				filesType={filesType}
				changeFilesType={changeFilesType}
				clearCheckedFiles={clearCheckedFiles}
			/>

			{isLoading && <div>Fetching</div>}
			{files && (
				<FilesList
					files={files}
					onChange={(files) => setCheckedFiles(files)}
				/>
			)}
		</main>
	);
};

const PrivateStoragePage = () => (
	<Private>
		<StoragePage />
	</Private>
);

export default PrivateStoragePage;
