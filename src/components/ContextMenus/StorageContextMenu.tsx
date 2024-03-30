import { useState } from "react";
import { storagesApi } from "services/storagesApi";
import { useContextMenuContext } from "contexts/ContextMenuContext";
import { StorageData } from "services/types";

import Button from "components/UI/Buttons/Button/Button";

import ContextMenuContainer from "./ContextMenuContainer";
import OpenFolderIcon from "components/SvgIcons/OpenFolder";
import IconButton from "components/UI/Buttons/IconButton/IconButton";
import RenameIcon from "components/SvgIcons/RenameIcon";
import TrashIcon from "components/SvgIcons/TrashIcon";
import BackIcon from "components/SvgIcons/BackIcon";
import LoadIcon from "components/SvgIcons/LoadIcon";

interface StorageContextMenuProps {
	item: StorageData;
	changeStorage: (id: number) => void;
	refetchStorages: () => void;
}

const StorageContextMenu: React.FC<StorageContextMenuProps> = ({
	item,
	changeStorage,
	refetchStorages,
}) => {
	const [mode, setMode] = useState<"default" | "rename">("default");
	const [itemName, setItemName] = useState<string>(item.name);
	const { close } = useContextMenuContext();

	const [updateStorage, updateStorageResponse] =
		storagesApi.useUpdateStorageMutation();
	const [deleteStorage, deleteStorageResponse] =
		storagesApi.useDeleteStorageMutation();

	return (
		<ContextMenuContainer>
			<li className="h-8">
				<Button
					color="neutral"
					variant="contained"
					className="flex h-full w-full items-center gap-2"
					onClick={() => {
						changeStorage(item.id);
						close();
					}}
				>
					<OpenFolderIcon className="h-5 w-5" />

					<div>Open</div>
				</Button>
			</li>

			<li className="h-8">
				<Button
					color="neutral"
					variant="contained"
					className="flex h-full w-full items-center gap-2"
					onClick={() => {
						refetchStorages();
						close();
					}}
				>
					<LoadIcon className="h-5 w-5 text-inherit" />

					<div>Refresh</div>
				</Button>
			</li>

			<li className="h-8">
				{mode === "rename" ? (
					<form className="flex">
						<IconButton
							className="h-8 w-8 rounded-none rounded-l border border-r-0"
							variant="contained"
							color="neutral"
							type="button"
							onClick={() => {
								setItemName(item.name);
								setMode("default");
							}}
						>
							<BackIcon />
						</IconButton>

						<input
							className="h-8 w-32 rounded-none border-x-0 border-y bg-neutral-500 px-2 text-white hover:bg-neutral-500 focus:bg-neutral-500"
							type="text"
							value={itemName}
							onChange={(e) => setItemName(e.target.value)}
						/>

						<IconButton
							className="h-8 w-8 rounded-none rounded-r border border-l-0"
							variant="contained"
							color="neutral"
							type="submit"
							onClick={() => {
								if (itemName !== item.name)
									updateStorage({
										newName: itemName,
										storageId: item.id,
									});
								close();
							}}
						>
							<RenameIcon />
						</IconButton>
					</form>
				) : (
					<Button
						color="neutral"
						variant="contained"
						className="flex h-full w-full items-center gap-2"
						onClick={() => setMode("rename")}
					>
						<RenameIcon className="h-5 w-5" />

						<div>Rename</div>
					</Button>
				)}
			</li>

			<li className="h-8">
				<Button
					color="neutral"
					variant="contained"
					className="flex h-full w-full items-center gap-2"
					onClick={() => {
						deleteStorage({ storageId: item.id });
						close();
					}}
				>
					<TrashIcon className="h-5 w-5" />

					<div>Delete</div>
				</Button>
			</li>
		</ContextMenuContainer>
	);
};

export default StorageContextMenu;
