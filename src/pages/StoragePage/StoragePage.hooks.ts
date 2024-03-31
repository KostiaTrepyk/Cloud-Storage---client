import { useState, useMemo, useEffect } from "react";
import { getCookieValue } from "helpers/cookie";
import { uploadFile as uploadFileHelper } from "helpers/uploadFile";
import { useCheckedItems } from "hooks/useCheckedItems";
import { useContextMenuContext } from "contexts/ContextMenuContext";
import { useFoldersHistoryContext } from "contexts/FoldersHistoryContext";
import { filesApi } from "services/filesApi";
import { foldersApi } from "services/foldersApi";
import { storagesApi } from "services/storagesApi";
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

	/** Folders + files */
	const items = useMemo(() => {
		const result = [...files, ...folders];
		return result;
	}, [folders, files]);

	const {
		checkedItems,
		addItemToChecked,
		removeItemFromChecked,
		clearCheckedItems,
	} = useCheckedItems(items);

	useEffect(() => {
		if (
			getStoragesResponse.data?.length &&
			currentStorageId === 0 &&
			getStoragesResponse.data
		) {
			setCurrentStorageId(getStoragesResponse.data[0]?.id);
		}
	}, [getStoragesResponse.data, currentStorageId, getStoragesResponse]);

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
			newOriginalName: newName,
		});
	}

	async function refetchStorages() {
		await getStoragesResponse.refetch();
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

		refetchStorages,

		storages,
		folders,
		files,
	};
};