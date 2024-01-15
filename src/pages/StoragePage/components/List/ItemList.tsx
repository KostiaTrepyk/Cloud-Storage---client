import { useState } from "react";
import { useContextMenuContext } from "contexts/ContextMenuContext";
import { useFoldersHistoryContext } from "contexts/FoldersHistoryContext";
import {
	type FolderData,
	type FileData,
	FileDataWithSharedWith,
} from "services/types";

import FileContextMenu from "components/ContextMenus/FileContextMenu";
import FolderContextMenu from "components/ContextMenus/FolderContextMenu";
import ItemsListContextMenu from "components/ContextMenus/ItemsListContextMenu";
import AddItem from "components/Lists/ItemsList/AddItem";
import FileListItem from "components/Lists/ItemsList/FileLisetItem/FileListItem";
import FolderListItem from "components/Lists/ItemsList/FolderListItem/FolderListItem";
import ItemsList from "components/Lists/ItemsList/ItemsList";
import Fade from "components/UI/Animations/Fade/Fade";

import EmptyList from "./Empty";

interface ItemListProps {
	isLoading: boolean;

	currentStorageId: number;
	currentFolderId: number;

	checkedItems: (FileData | FolderData)[];
	folders: FolderData[];
	files: FileDataWithSharedWith[];

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
			<ItemsList className="w-full">
				{folders.length === 0 && files.length === 0 && !isLoading && (
					<EmptyList
						createFolder={() => createFolder("New Folder")}
						uploadFile={uploadFile}
					/>
				)}

				{folders.map((folder) => (
					<Fade key={folder.id}>
						<FolderListItem
							currentStorageId={currentStorageId}
							item={folder}
							showCheckIndicator={Boolean(checkedItems.length)}
							onDoubleClick={() =>
								folderDoubleClickHandler(folder.id)
							}
							checked={checkedItems.includes(folder)}
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
							showCheckIndicator={Boolean(checkedItems.length)}
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

				{Boolean(folders.length + files.length) && (
					<AddItem
						createFolder={() => createFolder("New Folder")}
						uploadFile={uploadFile}
					/>
				)}
			</ItemsList>
		</div>
	);
};

export default ItemList;
