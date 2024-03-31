import { useState } from "react";
import { storagesApi } from "services/storagesApi";
import { useContextMenuContext } from "contexts/ContextMenuContext";
import { StorageData } from "services/types";

import Button from "components/UI/Buttons/Button/Button";

import ContextMenuContainer from "./components/ContextMenuContainer";
import RenameForm from "./components/RenameForm";

import OpenFolderIcon from "components/SvgIcons/OpenFolder";
import RenameIcon from "components/SvgIcons/RenameIcon";
import TrashIcon from "components/SvgIcons/TrashIcon";
import LoadIcon from "components/SvgIcons/LoadIcon";

interface StorageContextMenuProps {
	storage: StorageData;
	changeStorage: (id: number) => void;
	refetchStorages: () => Promise<void>;
}

const StorageContextMenu: React.FC<StorageContextMenuProps> = ({
	storage,
	changeStorage,
	refetchStorages,
}) => {
	const [mode, setMode] = useState<"default" | "rename">("default");
	const { close } = useContextMenuContext();

	const [updateStorage, updateStorageResponse] =
		storagesApi.useUpdateStorageMutation();
	const [deleteStorage, deleteStorageResponse] =
		storagesApi.useDeleteStorageMutation();

	function changeHandler() {
		changeStorage(storage.id);
		close();
	}

	async function refetchHandler() {
		await refetchStorages();
		close();
	}

	async function renameHandler(newName: string) {
		await updateStorage({
			storageId: storage.id,
			newName,
		});
		close();
	}

	async function deleteHandler() {
		await deleteStorage({ storageId: storage.id });
		close();
	}

	return (
		<ContextMenuContainer>
			<li className="h-8">
				<Button
					color="neutral"
					variant="contained"
					className="w-full justify-start"
					onClick={changeHandler}
					startIcon={<OpenFolderIcon />}
				>
					Open
				</Button>
			</li>

			<li className="h-8">
				<Button
					color="neutral"
					variant="contained"
					className="w-full justify-start"
					onClick={refetchHandler}
					startIcon={<LoadIcon className="text-inherit" />}
				>
					Refresh
				</Button>
			</li>

			<li className="h-8">
				{mode === "rename" ? (
					<RenameForm
						name={storage.name}
						back={() => setMode("default")}
						rename={(newName) => renameHandler(newName)}
						status={updateStorageResponse.status}
					/>
				) : (
					<Button
						color="neutral"
						variant="contained"
						className="w-full justify-start"
						onClick={() => setMode("rename")}
						startIcon={<RenameIcon />}
					>
						Rename
					</Button>
				)}
			</li>

			<li className="h-8">
				<Button
					color="neutral"
					variant="contained"
					className="w-full justify-start"
					onClick={deleteHandler}
					startIcon={<TrashIcon />}
					status={deleteStorageResponse.status}
				>
					Delete
				</Button>
			</li>
		</ContextMenuContainer>
	);
};

export default StorageContextMenu;
