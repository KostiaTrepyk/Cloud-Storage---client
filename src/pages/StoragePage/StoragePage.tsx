import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { getCookieValue } from "helpers/cookie";
import { useCheckedItems } from "hooks/useCheckedItems";
import { useFoldersHistoryContext } from "contexts/FoldersHistoryContext";
import { useContextMenuContext } from "contexts/ContextMenuContext";
import { uploadFile as uploadFileHelper } from "helpers/uploadFile";
import { foldersApi } from "services/foldersApi";
import { filesApi } from "services/filesApi";
import { Folder, FileDataWithSharedWith, FileData } from "services/types";
import { cookieKeys } from "types/cookie";

import Private from "pages/Wrappers/Private";

import ToolBar from "components/ToolBar/ToolBar";
import ItemsList from "components/Lists/ItemsList/ItemsList";
import FolderListItem from "components/Lists/ItemsList/FolderListItem/FolderListItem";
import FileListItem from "components/Lists/ItemsList/FileLisetItem/FileListItem";
import ItemsListContextMenu from "components/ContextMenus/ItemsListContextMenu";
import FolderContextMenu from "components/ContextMenus/FolderContextMenu";
import FileContextMenu from "components/ContextMenus/FileContextMenu";
import Button from "components/UI/Buttons/Button";
import Fade from "components/UI/Animations/Fade";
import LoadIcon from "components/SvgIcons/LoadIcon";
import IconButton from "components/UI/Buttons/IconButton";
import CraeteFolderIcon from "components/SvgIcons/CreateFolderIcon";
import AddFileIcon from "components/SvgIcons/AddFileIcon";
import AddItem from "components/Lists/ItemsList/AddItem";

const StoragePage = () => {
	const [draggingElement, setDraggingElement] = useState<{
		type: "folder" | "file";
		item: Folder | FileData;
	}>();

	const { currentFolderId, historyNext } = useFoldersHistoryContext();
	const { handleContextMenu } = useContextMenuContext();

	const getFolderResponse = foldersApi.useGetFolderQuery({
		folderId: currentFolderId,
		token: getCookieValue(cookieKeys.TOKEN),
	});

	const [createFolder, createFolderResponse] =
		foldersApi.useCreateFolderMutation();
	const [uploadFile, uploadFileResponse] = filesApi.useUploadFileMutation();
	const [updateFolder, updateFolderResponse] =
		foldersApi.useUpdateFolderMutation();
	const [updateFile, updateFileResponse] = filesApi.useUpdateFileMutation();

	const items: (Folder | FileDataWithSharedWith)[] = useMemo(() => {
		const result = [
			...(getFolderResponse.data?.files ?? []),
			...(getFolderResponse.data?.folders ?? []),
		];
		return result;
	}, [getFolderResponse.data]);

	const isLoading: boolean = useMemo(() => {
		return (
			getFolderResponse.isFetching ||
			createFolderResponse.isLoading ||
			uploadFileResponse.isLoading ||
			updateFolderResponse.isLoading ||
			updateFileResponse.isLoading
		);
	}, [
		getFolderResponse,
		createFolderResponse,
		updateFolderResponse,
		updateFileResponse,
	]);

	const {
		checkedItems,
		addItemToChecked,
		removeItemFromChecked,
		clearCheckedItems,
	} = useCheckedItems<FileData | Folder>(items);

	function folderDoubleClickHandler(folderId: number) {
		historyNext(folderId);
	}

	return (
		<main className="relative grow px-2">
			<ToolBar
				checkedItems={checkedItems}
				clearCheckedItems={clearCheckedItems}
			/>

			<div
				className="h-full w-full pt-4 sm:pt-16"
				onContextMenu={(e) => {
					handleContextMenu(
						e,
						<ItemsListContextMenu
							currentFolderId={currentFolderId}
						/>
					);
				}}
			>
				<ItemsList
					className="w-full"
					currentFolderId={currentFolderId}
				>
					{getFolderResponse.data?.folders.length === 0 &&
						getFolderResponse.data.files.length === 0 && (
							<div className="flex w-full flex-col items-center gap-6 p-2">
								<span className="text-2xl font-semibold text-rose-600">
									Empty
								</span>

								<Button
									className="w-fit"
									variant="contained"
									color="rose"
									onClick={() => {
										createFolder({
											parrentFolderId: currentFolderId,
											folderName: "New Folder",
											token: getCookieValue(
												cookieKeys.TOKEN
											),
										});
									}}
								>
									Create new folder
								</Button>
							</div>
						)}

					{getFolderResponse.data?.folders.map((folder) => (
						<Fade key={folder.id}>
							<FolderListItem
								item={folder}
								showCheckIndicator={Boolean(
									checkedItems.length
								)}
								onDoubleClick={() =>
									folderDoubleClickHandler(folder.id)
								}
								checked={checkedItems.includes(folder)}
								addItemToChecked={() =>
									addItemToChecked(folder)
								}
								removeItemfromChecked={() =>
									removeItemFromChecked(folder)
								}
								draggable
								onDragStart={() =>
									setDraggingElement({
										item: folder,
										type: "folder",
									})
								}
								onDragOver={(e) => e.preventDefault()}
								onDrop={() => {
									if (!draggingElement) return;

									if (
										draggingElement.type === "folder" &&
										draggingElement.item.id !== folder.id
									) {
										updateFolder({
											token: getCookieValue(
												cookieKeys.TOKEN
											),
											folderId: draggingElement.item.id,
											newParrentFolderId: folder.id,
										});
										return;
									}

									if (draggingElement.type === "file") {
										updateFile({
											token: getCookieValue(
												cookieKeys.TOKEN
											),
											id: draggingElement.item.id,
											newFolderId: folder.id,
										});
										return;
									}
								}}
								onContextMenu={(e) =>
									handleContextMenu(
										e,
										<FolderContextMenu
											key={folder.id}
											item={folder}
											changeFolderId={historyNext}
										/>
									)
								}
							/>
						</Fade>
					))}

					{getFolderResponse.data?.files.map((file) => (
						<Fade key={file.id}>
							<FileListItem
								file={file}
								showCheckIndicator={Boolean(
									checkedItems.length
								)}
								checked={checkedItems.includes(file)}
								addFileToChecked={() => addItemToChecked(file)}
								removeFilefromChecked={() =>
									removeItemFromChecked(file)
								}
								draggable
								onDragStart={() =>
									setDraggingElement({
										type: "file",
										item: file,
									})
								}
								onContextMenu={(e) =>
									handleContextMenu(
										e,
										<FileContextMenu item={file} />
									)
								}
							/>
						</Fade>
					))}

					{Boolean(items.length) && (
						<AddItem
							createFolder={createFolder}
							uploadFile={uploadFile}
							folderId={currentFolderId}
						/>
					)}
				</ItemsList>
			</div>

			{/* Loader */}
			{isLoading && (
				<motion.div
					className="absolute left-[50%] top-16 z-10 aspect-square h-10 -translate-x-1/2 rounded-full bg-white p-1.5"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
				>
					<LoadIcon
						className="h-full"
						spin
					/>
				</motion.div>
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
