import { useState, useEffect, useMemo } from "react";
import { AnimatePresence, Variants, motion } from "framer-motion";
import { useThrottle } from "../../hooks/useThrottle";
import { useCheckedItems } from "../../hooks/useCheckedItems";
import { cloudStorageApi } from "../../services/CloudStorageApi";
import {
	SortValue,
	FileType,
	FileDataWithSharedWith,
} from "../../types/fileData";
import { getCookieValue } from "../../helpers/cookie";
import { cookieKeys } from "../../types/cookie";
import { getDevice } from "../../helpers/getDevice";

import Private from "../Wrappers/Private";
import ToolBar from "./components/ToolBar";
import FileListItem from "../../components/Lists/FilesList/FileLisetItem/FileListItem";
import FlexList from "../../components/UI/List/FlexList";
import IconButton from "../../components/UI/Buttons/IconButton";

import LoadIcon from "../../components/SvgIcons/LoadIcon";
import BackIcon from "../../components/SvgIcons/BackIcon";
import Select from "../../components/UI/Select";

const MLoadIcon = motion(LoadIcon);

/** FIX */
let limitFromLocalStorage = JSON.parse(localStorage.getItem("limit") || "");

const StoragePage = () => {
	const [limit, setLimit] = useState<number>(
		limitFromLocalStorage
			? limitFromLocalStorage
			: getDevice() === "mobile"
			? 25
			: 50
	);
	const [page, setPage] = useState<number>(1);
	const [search, setSearch] = useState<string>("");
	const throttledSearch = useThrottle<string>(search, 800);
	const [sort, setSort] = useState<SortValue>("NO");
	const [filesType, setFilesType] =
		useState<Exclude<FileType, "trash">>("all");

	const queryData = useMemo(
		() => ({
			filesType,
			search: throttledSearch || undefined,
			sort,
		}),
		[filesType, throttledSearch, sort, limit]
	);

	const fetchFilesStatus = cloudStorageApi.useGetAllFilesQuery({
		...queryData,
		limit,
		page,
		token: getCookieValue(cookieKeys.TOKEN),
	});

	const files = useMemo(
		() => fetchFilesStatus.data?.files || [],
		[fetchFilesStatus.data]
	);

	const {
		checkedItems: checkedFiles,
		clearChecked,
		removeFromChecked,
		addToChecked,
	} = useCheckedItems<FileDataWithSharedWith>(files || []);

	const [, uploadFileStatus] = cloudStorageApi.useUploadFileMutation({
		fixedCacheKey: "1",
	});
	const [, deleteFilesStatus] = cloudStorageApi.useDeleteFileMutation({
		fixedCacheKey: "1",
	});

	useEffect(() => {
		localStorage.setItem("limit", JSON.stringify(limit));
	}, [limit]);

	useEffect(() => {
		setPage(1);
	}, [queryData, limit]);

	/* Upload handler */
	useEffect(() => {
		if (uploadFileStatus.fulfilledTimeStamp) fetchFilesStatus.refetch();
	}, [uploadFileStatus.fulfilledTimeStamp]);

	/* Delete handler */
	useEffect(() => {
		if (deleteFilesStatus.fulfilledTimeStamp) fetchFilesStatus.refetch();
	}, [deleteFilesStatus.fulfilledTimeStamp]);

	function changeFilesType(newType: Exclude<FileType, "trash">) {
		setFilesType(newType);
	}

	if (fetchFilesStatus.isError) {
		return (
			<main className="relative grow bg-inherit px-2 pb-2">
				<span className="my-4 block text-center text-2xl font-semibold text-red-600">
					Error
				</span>
			</main>
		);
	}

	return (
		<main className="relative flex grow flex-col bg-inherit px-2 pb-2">
			<ToolBar
				search={search}
				setSearch={setSearch}
				sort={sort}
				setSort={setSort}
				checkedFiles={checkedFiles}
				filesType={filesType}
				changeFilesType={changeFilesType}
				clearCheckedFiles={clearChecked}
				files={files || []}
				disabled={fetchFilesStatus.isFetching}
			/>

			<div
				className={`sticky top-16 z-50 mx-auto aspect-square h-12 rounded-b-full bg-white bg-opacity-75 transition-opacity duration-500 ${
					fetchFilesStatus.isFetching
						? "visible opacity-100"
						: "invisible opacity-0"
				}`}
			>
				{fetchFilesStatus.isFetching && (
					<div className="mx-auto aspect-square h-full p-2 font-semibold text-rose-600">
						<MLoadIcon
							initial={{ opacity: 0, scale: 0.5 }}
							animate={{ opacity: 1, scale: 1 }}
							spin
						/>
					</div>
				)}
			</div>

			{files.length > 0 && (
				<>
					<FlexList
						gap={3}
						wrap
					>
						{files.map((file) => (
							<FileListItem
								key={file.id}
								file={file}
								addFileToChecked={addToChecked}
								removeFilefromChecked={removeFromChecked}
								showCheckIndicator={checkedFiles.length > 0}
								checked={checkedFiles.includes(file)}
							/>
						))}
					</FlexList>

					{/* Pagination */}
					<motion.div
						className="p-4 text-center"
						layout="position"
					>
						<div>
							<span className="text-lg">
								{`Items: ${(page - 1) * limit + 1} - ${
									fetchFilesStatus.data?.count! > page * limit
										? page * limit
										: fetchFilesStatus.data?.count
								}. Limit: `}
								<Select
									options={[
										{ id: 0, label: "10", value: "10" },
										{ id: 1, label: "25", value: "25" },
										{ id: 2, label: "50", value: "50" },
										{ id: 3, label: "75", value: "75" },
										{ id: 4, label: "100", value: "100" },
									]}
									value={limit}
									onChange={(option) => {
										option &&
											setLimit(Number(option.value));
									}}
								></Select>
							</span>
						</div>

						<div className="mx-auto mt-1 flex h-10 w-fit gap-2">
							<IconButton
								onClick={() => setPage((prev) => prev - 1)}
								disabled={
									fetchFilesStatus.isFetching || page === 1
								}
							>
								<BackIcon className="relative right-0.5" />
							</IconButton>

							<IconButton
								onClick={() => setPage((prev) => prev + 1)}
								disabled={
									fetchFilesStatus.isFetching ||
									fetchFilesStatus.data?.isLastPage
								}
							>
								<BackIcon className="relative left-0.5 rotate-180" />
							</IconButton>
						</div>
					</motion.div>
				</>
			)}

			{fetchFilesStatus.isSuccess && files.length === 0 && (
				<span className="my-4 block text-center text-2xl font-semibold text-red-600">
					Files not found
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
