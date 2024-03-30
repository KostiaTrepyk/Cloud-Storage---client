import Private from "pages/Wrappers/Private";

import { useStoragePageHooks } from "./StoragePage.hooks";

import ToolBar from "components/ToolBar/ToolBar";
import StorageList from "components/Lists/StorageList/StorageList";
import StorageListItem from "components/Lists/StorageList/StorageListItem";
import StorageContextMenu from "components/ContextMenus/StorageContextMenu";
import StorageListContextMenu from "components/ContextMenus/StorageListContextMenu";
import Loader from "./components/Loader";
import ItemList from "./components/List/ItemList";

const StoragePage = () => {
	const {
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
	} = useStoragePageHooks();

	return (
		<main className="relative flex grow flex-col px-2">
			<ToolBar
				currentStorageId={currentStorageId}
				checkedItems={checkedItems}
				clearCheckedItems={clearCheckedItems}
			/>

			<div className="flex grow flex-col sm:flex-row">
				<StorageList
					className="w-fit min-w-[10rem] flex-row flex-wrap overflow-hidden sm:flex-col"
					onContextMenu={(e) => {
						handleContextMenu(e, <StorageListContextMenu />);
					}}
				>
					{storages.map((storage) => (
						<StorageListItem
							key={storage.id}
							className="select-none hover:cursor-pointer"
							active={storage.id === currentStorageId}
							item={storage}
							onDoubleClick={() => {
								setCurrentStorageId(storage.id);
								clearHistory();
							}}
							onContextMenu={(e) => {
								handleContextMenu(
									e,
									<StorageContextMenu
										refetchStorages={refetchStorages}
										item={storage}
										changeStorage={changeStorage}
									/>
								);
							}}
						>
							{storage.name} {storage.size}
						</StorageListItem>
					))}
				</StorageList>

				<ItemList
					isLoading={isLoading}
					currentStorageId={currentStorageId}
					currentFolderId={currentFolderId}
					checkedItems={checkedItems}
					folders={folders}
					files={files}
					changeFolderId={historyNext}
					addItemToChecked={addItemToChecked}
					removeItemFromChecked={removeItemFromChecked}
					folderDoubleClickHandler={folderDoubleClickHandler}
					createFolder={createFolder}
					uploadFile={uploadFile}
					updateFolder={updateFolder}
					updateFile={updateFile}
				/>
			</div>

			{isLoading && <Loader />}
		</main>
	);
};

const PrivateStoragePage = () => (
	<Private>
		<StoragePage />
	</Private>
);

export default PrivateStoragePage;
