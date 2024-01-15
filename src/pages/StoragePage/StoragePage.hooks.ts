import { useState, useMemo, useEffect } from "react";
import { getCookieValue } from "helpers/cookie";
import { uploadFile as uploadFileHelper } from "helpers/uploadFile";
import { useCheckedItems } from "hooks/useCheckedItems";
import { useContextMenuContext } from "contexts/ContextMenuContext";
import { useFoldersHistoryContext } from "contexts/FoldersHistoryContext";
import { filesApi } from "services/filesApi";
import { foldersApi } from "services/foldersApi";
import { storagesApi } from "services/storagesApi";
import {
	FileDataWithSharedWith,
	type FileData,
	type FolderData,
} from "services/types";
import { cookieKeys } from "types/cookie";

export const useStoragePageHooks = () => {
	const [currentStorageId, setCurrentStorageId] = useState<number>(0);
	const { currentFolderId, historyNext, clearHistory } =
		useFoldersHistoryContext();
	const { handleContextMenu } = useContextMenuContext();

	const getStoragesResponse = storagesApi.useGetStoragesQuery(
		{ token: getCookieValue(cookieKeys.TOKEN) },
		{ pollingInterval: 30_000 }
	);
	const getFolderResponse = foldersApi.useGetFolderQuery(
		{
			storageId: currentStorageId,
			folderId: currentFolderId,
			token: getCookieValue(cookieKeys.TOKEN),
		},
		{ skip: currentStorageId === 0 }
	);

	const [createFolderMutation, createFolderResponse] =
		foldersApi.useCreateFolderMutation();
	const [uploadFileMutation, uploadFileResponse] =
		filesApi.useUploadFileMutation();
	const [updateFolderMutation, updateFolderResponse] =
		foldersApi.useUpdateFolderMutation();
	const [updateFileMutation, updateFileResponse] =
		filesApi.useUpdateFileMutation();

	const isLoading: boolean = useMemo(() => {
		return (
			getStoragesResponse.isFetching ||
			getFolderResponse.isFetching ||
			createFolderResponse.isLoading ||
			uploadFileResponse.isLoading ||
			updateFolderResponse.isLoading ||
			updateFileResponse.isLoading
		);
	}, [
		getStoragesResponse,
		getFolderResponse,
		createFolderResponse,
		uploadFileResponse,
		updateFolderResponse,
		updateFileResponse,
	]);
	/** Folders + files */
	const items: (FolderData | FileDataWithSharedWith)[] = useMemo(() => {
		const result = [
			...(getFolderResponse.data?.files ?? []),
			...(getFolderResponse.data?.folders ?? []),
		];
		return result;
	}, [getFolderResponse.data]);
	const storages = useMemo(
		() => getStoragesResponse.data ?? [],
		[getStoragesResponse.data]
	);
	const folders = useMemo(
		() => getFolderResponse.data?.folders ?? [],
		[getFolderResponse.data?.folders]
	);
	const files = useMemo(
		() => getFolderResponse.data?.files ?? [],
		[getFolderResponse.data?.files]
	);

	const {
		checkedItems,
		addItemToChecked,
		removeItemFromChecked,
		clearCheckedItems,
	} = useCheckedItems<FileData | FolderData>(items);

	useEffect(() => {
		if (currentStorageId === 0 && getStoragesResponse.data) {
			setCurrentStorageId(getStoragesResponse.data[0].id);
		}
	}, [currentStorageId, getStoragesResponse]);

	function folderDoubleClickHandler(folderId: number): void {
		historyNext(folderId);
	}

	function changeStorage(newStorageId: number): void {
		setCurrentStorageId(newStorageId);
	}

	function uploadFile(): void {
		uploadFileHelper({
			folderId: currentFolderId,
			storageId: currentStorageId,
			uploadFile: uploadFileMutation,
		});
	}

	function createFolder(folderName?: string): void {
		createFolderMutation({
			storageId: currentStorageId,
			parentFolderId: currentFolderId,
			folderName: folderName ?? "New Folder",
			token: getCookieValue(cookieKeys.TOKEN),
		});
	}

	function updateFolder({
		id,
		newName,
		newParentFolderId,
	}: {
		id: number;
		newName?: string;
		newParentFolderId?: number;
	}): void {
		updateFolderMutation({
			token: getCookieValue(cookieKeys.TOKEN),
			newFolderName: newName,
			newParentFolderId,
			folderId: id,
		});
	}

	function updateFile({
		id,
		newFolderId,
		newName,
	}: {
		id: number;
		newName?: string;
		newFolderId?: number;
	}): void {
		updateFileMutation({
			id,
			newFolderId,
			token: getCookieValue(cookieKeys.TOKEN),
			newOriginalName: newName,
		});
	}

	function refreshStorages() {
		getStoragesResponse.refetch();
	}

	return {
		changeStorage,
		folderDoubleClickHandler,
		checkedItems,
		addItemToChecked,
		removeItemFromChecked,
		clearCheckedItems,
		isLoading,
		currentStorageId,
		setCurrentStorageId,
		currentFolderId,
		historyNext,
		clearHistory,
		handleContextMenu,
		uploadFile,
		createFolder,
		updateFile,
		updateFolder,

		refreshStorages,

		storages,
		folders,
		files,
	};
};