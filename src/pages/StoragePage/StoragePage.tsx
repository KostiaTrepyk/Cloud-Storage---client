import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useThrottle } from "../../hooks/useThrottle";
import { getCookieValue } from "../../helpers/cookie";
import { cloudStorageApi } from "../../services/CloudStorageApi";
import { FileData, FileType } from "../../types/fileData";
import { cookieKeys } from "../../types/cookie";

import Private from "../Wrappers/Private";
import FilesList from "../../components/Lists/FilesList/FilesList";
import ToolBar from "./components/ToolBar";
import LoadIcon from "../../components/SvgIcons/LoadIcon";

export type SortValue = "asc" | "desc" | "no";

const StoragePage = () => {
	const [search, setSearch] = useState<string>("");
	const throttledSearch = useThrottle<string>(search, 800);
	const [sort, setSort] = useState<SortValue>("no");
	const [filesType, setFilesType] =
		useState<Exclude<FileType, "trash">>("all");
	const [checkedFiles, setCheckedFiles] = useState<FileData[]>([]);

	const {
		data: files = [],
		isLoading,
		isError,
	} = cloudStorageApi.useGetAllFilesQuery({
		type: filesType,
		token: getCookieValue(cookieKeys.TOKEN),
	});

	useEffect(() => {
		checkedFiles.length && setCheckedFiles([]);
		// eslint-disable-next-line
	}, [files]);

	function changeFilesType(newType: Exclude<FileType, "trash">) {
		setFilesType(newType);
	}

	function clearCheckedFiles() {
		setCheckedFiles([]);
	}

	return (
		<main className="relative grow bg-inherit px-2 pb-2">
			<ToolBar
				search={search}
				setSearch={setSearch}
				sort={sort}
				setSort={setSort}
				checkedFiles={checkedFiles}
				filesType={filesType}
				changeFilesType={changeFilesType}
				clearCheckedFiles={clearCheckedFiles}
			/>

			{isLoading && (
				<motion.div
					className="mx-auto my-4 aspect-square h-10 text-rose-600"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
				>
					<LoadIcon spin />
				</motion.div>
			)}

			{files && !isLoading && !isError && (
				<FilesList
					files={files.filter((file) =>
						file.originalname
							.toUpperCase()
							.includes(throttledSearch.toUpperCase())
					)}
					onChange={(files) => setCheckedFiles(files)}
					checkedFiles={checkedFiles}
				/>
			)}

			{isError && (
				<span className="my-4 block text-center text-2xl font-semibold text-red-600">
					Error
				</span>
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