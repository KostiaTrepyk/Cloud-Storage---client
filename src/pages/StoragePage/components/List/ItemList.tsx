import { useState } from "react";
import { useContextMenuContext } from "contexts/ContextMenuContext";
import { useFoldersHistoryContext } from "contexts/FoldersHistoryContext";
import { isFile } from "helpers/isFile";
import { type FolderData, type FileData } from "services/types";

import FileContextMenu from "components/ContextMenus/FileContextMenu";
import FolderContextMenu from "components/ContextMenus/FolderContextMenu";
import ItemsListContextMenu from "components/ContextMenus/ItemsListContextMenu";
import AddItem from "components/Lists/ItemsList/AddItem";
import FileListItem from "components/Lists/ItemsList/FileLisetItem/FileListItem";
import FolderListItem from "components/Lists/ItemsList/FolderListItem/FolderListItem";
import Fade from "components/UI/Animations/Fade/Fade";

import EmptyList from "./EmptyList";

interface ItemListProps {
	isLoading: boolean;

	currentStorageId: number;
	currentFolderId: number;

	checkedItems: (FileData | FolderData)[];
	folders: FolderData[];
	files: FileData[];

	changeFolderId: (id: number) => void;
	addItemToChecked: (item: FileData | FolderData) => void;
	removeItemFromChecked: (item: FileData | FolderData) => void;
	folderDoubleClickHandler: (id: number) => void;
	createFolder: (name?: string) => void;
	uploadFile: () => void;
	updateFolder: (data: {
		id: number;
		newName?: string;
		newParentFolderId?: number;
	}) => void;
	updateFile: (data: {
		id: number;
		newName?: string;
		newFolderId?: number;
	}) => void;
}

const ItemList: React.FC<ItemListProps> = ({
	isLoading,
	currentStorageId,
	currentFolderId,
	checkedItems,
	folders,
	files,
	changeFolderId,
	addItemToChecked,
	removeItemFromChecked,
	folderDoubleClickHandler,
	createFolder,
	uploadFile,
	updateFolder,
	updateFile,
}) => {
	const [draggingElement, setDraggingElement] = useState<{
		type: "folder" | "file";
		item: FolderData | FileData;
	}>();

	const { historyBack, history } = useFoldersHistoryContext();

	const { handleContextMenu } = useContextMenuContext();

	const isEmpty = folders.length === 0 && files.length === 0 && !isLoading;

	if (isEmpty) {
		return (
			<EmptyList
				createFolder={() => createFolder("New Folder")}
				uploadFile={uploadFile}
			/>
		);
	}

	return (
		<div
			className="grow"
			onContextMenu={(e) => {
				handleContextMenu(
					e,
					<ItemsListContextMenu
						currentStoreId={currentStorageId}
						currentFolderId={currentFolderId}
						disableBack={history.length === 0}
						historyBack={historyBack}
					/>
				);
			}}
		>
			<div className="flex w-full flex-wrap gap-2 p-2">
				{folders.map((folder) => (
					<Fade key={folder.id}>
						<FolderListItem
							currentStorageId={currentStorageId}
							item={folder}
							showCheckIndicator={checkedItems.length > 0}
							onDoubleClick={() =>
								folderDoubleClickHandler(folder.id)
							}
							checked={checkedItems.some(
								(f) => !isFile(f) && f.id === folder.id
							)}
							addItemToChecked={() => addItemToChecked(folder)}
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
										id: draggingElement.item.id,
										newParentFolderId: folder.id,
									});
									return;
								}

								if (draggingElement.type === "file") {
									updateFile({
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
										currentStorageId={currentStorageId}
										item={folder}
										changeFolderId={changeFolderId}
									/>
								)
							}
						/>
					</Fade>
				))}

				{files.map((file) => (
					<Fade key={file.id}>
						<FileListItem
							file={file}
							showCheckIndicator={checkedItems.length > 0}
							checked={checkedItems.some(
								(f) => isFile(f) && f.id === file.id
							)}
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
									<FileContextMenu file={file} />
								)
							}
						/>
					</Fade>
				))}

				{Boolean(folders.length + files.length) && (
					<AddItem
						createFolder={() => createFolder("New Folder")}
						uploadFile={uploadFile}
					/>
				)}
			</div>
		</div>
	);
};

export default ItemList;
