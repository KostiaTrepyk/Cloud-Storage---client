import { useState } from "react";
import { useStatus } from "hooks/useStatus";
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
import ConfirmModal from "components/Modals/ConfirmModal/ConfirmModal";

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
	const [isConfirmDeletingOpened, setConfirmDeletingOpened] = useState(false);

	const [refetchStatus, setRefetchStatus] = useStatus("uninitialized");
	const [updateStatus, setUpdateStatus] = useStatus("uninitialized");
	const [deleteStatus, setDeleteStatus] = useStatus("uninitialized");

	const { close } = useContextMenuContext();

	const [updateStorage] = storagesApi.useUpdateStorageMutation();
	const [deleteStorage] = storagesApi.useDeleteStorageMutation();

	function changeHandler() {
		changeStorage(storage.id);
		close();
	}

	async function refetchHandler() {
		setRefetchStatus("pending");
		await refetchStorages()
			.then(() => {
				setRefetchStatus("fulfilled");
				close();
			})
			.catch(() => setRefetchStatus("rejected"));
	}

	async function renameHandler(newName: string) {
		if (newName === storage.name) {
			close();
			return;
		}

		setUpdateStatus("pending");

		await updateStorage({
			storageId: storage.id,
			newName,
		})
			.then(() => {
				setUpdateStatus("fulfilled");
				close();
			})
			.catch(() => setUpdateStatus("rejected"));
	}

	async function deleteHandler() {
		setDeleteStatus("pending");
		await deleteStorage({ storageId: storage.id })
			.then(() => {
				setDeleteStatus("fulfilled");
				close();
			})
			.catch(() => setDeleteStatus("rejected"));
	}

	return (
		<ContextMenuContainer>
			<li>
				<Button
					color="neutral"
					variant="contained"
					className="w-full justify-start"
					onClick={changeHandler}
					startIcon={<OpenFolderIcon />}
					size="small"
				>
					Open
				</Button>
			</li>

			<li>
				<Button
					color="neutral"
					variant="contained"
					className="w-full justify-start hover:bg-cyan-600"
					onClick={refetchHandler}
					startIcon={<LoadIcon className="text-inherit" />}
					size="small"
					status={refetchStatus}
					disabled={refetchStatus === "pending"}
				>
					Refresh
				</Button>
			</li>

			<li>
				{mode === "rename" ? (
					<RenameForm
						name={storage.name}
						back={() => setMode("default")}
						onSubmit={(newName) => renameHandler(newName)}
						status={updateStatus}
					/>
				) : (
					<Button
						color="neutral"
						variant="contained"
						className="w-full justify-start hover:bg-yellow-600"
						onClick={() => setMode("rename")}
						startIcon={<RenameIcon />}
						size="small"
						status={updateStatus}
						disabled={updateStatus === "pending"}
					>
						Rename
					</Button>
				)}
			</li>

			<li>
				<Button
					color="neutral"
					variant="contained"
					className="w-full justify-start hover:bg-red-600"
					onClick={() => setConfirmDeletingOpened(true)}
					startIcon={<TrashIcon />}
					status={deleteStatus}
					size="small"
					disabled={deleteStatus === "pending"}
				>
					Delete
				</Button>
			</li>

			<ConfirmModal
				open={isConfirmDeletingOpened}
				onConfirm={deleteHandler}
				onClose={() => setConfirmDeletingOpened(false)}
				alertProps={{
					text: "If you delete this storage, you will lose all the data stored in it.",
					type: "danger",
				}}
			/>
		</ContextMenuContainer>
	);
};

export default StorageContextMenu;
